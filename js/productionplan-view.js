// =====================================================
// CD-APP - PRODUKTIONSPLANUNG VIEW
// Timeline-basierte Darstellung mit Auftragsverfolgung
// =====================================================

// Erweitere App-Objekt um Produktionsplanung-Methoden
(function() {

    // Neue Properties
    App.currentHighlightedOrder = null;
    App.ppBarPositions = [];

    // Setup überschreiben
    var originalSetupProductionPlan = App.setupProductionPlan;
    App.setupProductionPlan = function() {
        var self = this;

        // Zeit-Range Handler
        var timeRange = document.getElementById('pp-timerange');
        if (timeRange) {
            timeRange.addEventListener('change', function() {
                self.renderProductionPlan();
            });
        }

        // Bereichs-Filter Handler
        var areaFilter = document.getElementById('pp-area-filter');
        if (areaFilter) {
            areaFilter.addEventListener('change', function() {
                self.renderProductionPlan();
            });
        }
    };

    // Render überschreiben
    App.renderProductionPlan = function() {
        var self = this;
        var container = document.getElementById('pp-timeline-container');
        var legendContainer = document.getElementById('pp-legend-areas');
        var areaFilterEl = document.getElementById('pp-area-filter');
        var svgOverlay = document.getElementById('pp-arrows-svg');

        if (!container || typeof ProductionPlanData === 'undefined') return;

        var rangeEl = document.getElementById('pp-timerange');
        var hours = rangeEl ? parseInt(rangeEl.value) : 8;
        var now = new Date();
        var pixelsPerHour = 100;
        var areaFilter = areaFilterEl ? areaFilterEl.value : 'all';

        // Produktionspläne generieren
        this.productionPlans = ProductionPlanData.generateProductionPlan(
            this.productionState.orders,
            this.productionState
        );

        // Bereichs-Filter Options aktualisieren
        if (areaFilterEl && areaFilterEl.options.length <= 1) {
            ProductionData.areas.forEach(function(area) {
                areaFilterEl.add(new Option(area.name, area.id));
            });
        }

        // Legende für Bereiche
        if (legendContainer) {
            var legendHtml = '';
            ProductionData.areas.forEach(function(area) {
                var color = ProductionPlanData.areaColors[area.id] || '#95a5a6';
                legendHtml += '<div class="pp-legend-item">' +
                    '<span class="pp-legend-color" style="background: ' + color + '"></span>' +
                    '<span>' + area.name + '</span>' +
                    '</div>';
            });
            legendContainer.innerHTML = legendHtml;
        }

        // Zeit-Achse
        var timeAxisHtml = '<div class="pp-time-axis">';
        for (var i = 0; i <= hours; i++) {
            var time = new Date(now.getTime() + i * 60 * 60 * 1000);
            timeAxisHtml += '<div class="pp-time-mark">' + time.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'}) + '</div>';
        }
        timeAxisHtml += '</div>';

        // Sammle alle Auftrags-Schritte nach Arbeitsplatz
        var workstationSteps = {};
        this.productionPlans.forEach(function(plan) {
            plan.steps.forEach(function(step, stepIndex) {
                if (step.assignedWorkstation) {
                    var wsId = step.assignedWorkstation.id;
                    if (!workstationSteps[wsId]) {
                        workstationSteps[wsId] = [];
                    }
                    workstationSteps[wsId].push({
                        plan: plan,
                        step: step,
                        stepIndex: stepIndex
                    });
                }
            });
        });

        // Auch geplante Schritte ohne Workstation auf mögliche Workstations verteilen
        this.productionPlans.forEach(function(plan) {
            plan.steps.forEach(function(step, stepIndex) {
                if (!step.assignedWorkstation && (step.status === 'scheduled' || step.status === 'waiting')) {
                    var possibleWs = ProductionData.workstations.filter(function(ws) {
                        return ws.area === step.area && step.workstationTypes.indexOf(ws.type) !== -1;
                    });
                    if (possibleWs.length > 0) {
                        var ws = possibleWs[0];
                        if (!workstationSteps[ws.id]) {
                            workstationSteps[ws.id] = [];
                        }
                        var exists = workstationSteps[ws.id].some(function(item) {
                            return item.plan.order.id === plan.order.id && item.stepIndex === stepIndex;
                        });
                        if (!exists) {
                            step.assignedWorkstation = ws;
                            workstationSteps[ws.id].push({
                                plan: plan,
                                step: step,
                                stepIndex: stepIndex
                            });
                        }
                    }
                }
            });
        });

        // Timeline-Zeilen nach Bereich gruppiert
        var rowsHtml = '';
        var currentArea = '';
        var rowIndex = 0;
        var barPositions = [];

        ProductionData.workstations.forEach(function(ws) {
            if (areaFilter !== 'all' && ws.area !== areaFilter) return;

            var area = ProductionData.areas.find(function(a) { return a.id === ws.area; });
            var areaColor = ProductionPlanData.areaColors[ws.area] || '#95a5a6';

            // Bereichs-Trenner
            if (ws.area !== currentArea) {
                currentArea = ws.area;
                rowsHtml += '<div class="pp-area-separator">' +
                    '<span class="pp-area-separator-color" style="background: ' + areaColor + '"></span>' +
                    area.name +
                    '</div>';
            }

            var barsHtml = '';
            var steps = workstationSteps[ws.id] || [];

            steps.forEach(function(item) {
                var plan = item.plan;
                var step = item.step;
                var order = plan.order;

                var startOffset = 0;
                if (step.plannedStart) {
                    startOffset = (step.plannedStart - now) / (60 * 60 * 1000);
                }

                if (startOffset >= hours || startOffset + (step.totalTime / 60) < 0) return;

                var left = Math.max(0, startOffset * pixelsPerHour);
                var width = Math.min((step.totalTime / 60) * pixelsPerHour, (hours - Math.max(0, startOffset)) * pixelsPerHour);
                if (width < 30) width = 50;

                var statusClass = step.status === 'completed' ? 'running' :
                                  step.status === 'inProgress' ? 'running' :
                                  step.status === 'waiting' ? 'setup' :
                                  'scheduled';

                var barId = 'bar-' + order.id.replace(/[^a-zA-Z0-9]/g, '') + '-' + item.stepIndex;

                barsHtml += '<div class="pp-order-bar ' + statusClass + '" ' +
                    'id="' + barId + '" ' +
                    'data-order-id="' + order.id + '" ' +
                    'data-step-index="' + item.stepIndex + '" ' +
                    'data-ws-id="' + ws.id + '" ' +
                    'style="left: ' + left + 'px; width: ' + width + 'px;">' +
                    '<span class="pp-priority-indicator ' + order.priority.id + '"></span>' +
                    '<span class="pp-order-label">' + order.id + '</span>' +
                    '<span class="pp-step-badge">' + step.stepNumber + '</span>' +
                    '</div>';

                barPositions.push({
                    barId: barId,
                    orderId: order.id,
                    stepIndex: item.stepIndex,
                    wsId: ws.id,
                    rowIndex: rowIndex,
                    left: left + 160,
                    width: width,
                    top: 0
                });
            });

            rowsHtml += '<div class="pp-timeline-row" data-ws-id="' + ws.id + '" data-row-index="' + rowIndex + '">' +
                '<div class="pp-ws-label">' +
                '<div class="pp-ws-name"><span class="pp-ws-area-dot" style="background: ' + areaColor + '"></span>' + ws.name + '</div>' +
                '<div class="pp-ws-type">' + ws.type + '</div>' +
                '</div>' +
                '<div class="pp-timeline-bars" style="width: ' + (hours * pixelsPerHour) + 'px;">' + barsHtml + '</div>' +
                '</div>';

            rowIndex++;
        });

        container.innerHTML = timeAxisHtml + rowsHtml;

        this.ppBarPositions = barPositions;

        // Event-Handler nach kurzer Verzögerung (DOM muss fertig sein)
        setTimeout(function() {
            self.updateBarPositions();

            container.querySelectorAll('.pp-order-bar').forEach(function(bar) {
                bar.addEventListener('mouseenter', function() {
                    self.highlightOrderPath(bar.dataset.orderId);
                });
                bar.addEventListener('mouseleave', function() {
                    self.clearOrderHighlight();
                });
                bar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    self.showOrderDetail(bar.dataset.orderId);
                });
            });
        }, 50);
    };

    App.updateBarPositions = function() {
        var self = this;
        if (!this.ppBarPositions) return;

        var wrapper = document.querySelector('.pp-timeline-wrapper');
        if (!wrapper) return;
        var wrapperRect = wrapper.getBoundingClientRect();

        this.ppBarPositions.forEach(function(pos) {
            var bar = document.getElementById(pos.barId);
            if (bar) {
                var barRect = bar.getBoundingClientRect();
                pos.top = barRect.top - wrapperRect.top + barRect.height / 2;
                pos.left = barRect.left - wrapperRect.left + barRect.width;
                pos.leftStart = barRect.left - wrapperRect.left;
            }
        });
    };

    App.highlightOrderPath = function(orderId) {
        var self = this;
        this.currentHighlightedOrder = orderId;

        document.querySelectorAll('.pp-order-bar').forEach(function(bar) {
            if (bar.dataset.orderId === orderId) {
                bar.classList.add('highlighted');
                bar.classList.remove('dimmed');
            } else {
                bar.classList.add('dimmed');
                bar.classList.remove('highlighted');
            }
        });

        this.drawOrderArrows(orderId);
    };

    App.clearOrderHighlight = function() {
        this.currentHighlightedOrder = null;

        document.querySelectorAll('.pp-order-bar').forEach(function(bar) {
            bar.classList.remove('highlighted', 'dimmed');
        });

        var svg = document.getElementById('pp-arrows-svg');
        if (svg) {
            svg.innerHTML = '';
        }
    };

    App.drawOrderArrows = function(orderId) {
        var self = this;
        var svg = document.getElementById('pp-arrows-svg');
        if (!svg || !this.ppBarPositions) return;

        this.updateBarPositions();

        var orderBars = this.ppBarPositions.filter(function(pos) {
            return pos.orderId === orderId;
        }).sort(function(a, b) {
            return a.stepIndex - b.stepIndex;
        });

        if (orderBars.length < 2) {
            svg.innerHTML = '';
            return;
        }

        var plan = this.productionPlans.find(function(p) { return p.order.id === orderId; });
        var orderColor = '#3498db';
        if (plan && plan.steps.length > 0) {
            orderColor = ProductionPlanData.areaColors[plan.steps[0].area] || '#3498db';
        }

        var pathsHtml = '<defs>' +
            '<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">' +
            '<polygon points="0 0, 10 3.5, 0 7" fill="' + orderColor + '" />' +
            '</marker>' +
            '</defs>';

        for (var i = 0; i < orderBars.length - 1; i++) {
            var from = orderBars[i];
            var to = orderBars[i + 1];

            var x1 = from.left;
            var y1 = from.top;
            var x2 = to.leftStart;
            var y2 = to.top;

            // Bezier-Kurve
            var midX = (x1 + x2) / 2;
            pathsHtml += '<path d="M' + x1 + ',' + y1 + ' C' + midX + ',' + y1 + ' ' + midX + ',' + y2 + ' ' + x2 + ',' + y2 + '" ' +
                'stroke="' + orderColor + '" stroke-width="2" fill="none" ' +
                'marker-end="url(#arrowhead)" />';
        }

        svg.innerHTML = pathsHtml;
    };

    App.showOrderDetail = function(orderId) {
        var self = this;
        var plan = this.productionPlans.find(function(p) { return p.order.id === orderId; });
        if (!plan) return;

        var order = plan.order;

        var existingModal = document.getElementById('pp-detail-modal');
        if (existingModal) existingModal.remove();

        var modalHtml = '<div class="pp-detail-modal open" id="pp-detail-modal">' +
            '<div class="pp-detail-backdrop"></div>' +
            '<div class="pp-detail-content">' +
            '<div class="pp-detail-header">' +
            '<h3><span class="pp-priority-indicator ' + order.priority.id + '"></span>' + order.id + '</h3>' +
            '<div class="pp-detail-subtitle">' + order.product.name + ' | ' + order.customer.name + '</div>' +
            '<button class="pp-detail-close">&times;</button>' +
            '</div>' +
            '<div class="pp-detail-body">';

        // Info Grid
        modalHtml += '<div class="pp-order-info-grid">' +
            '<div class="pp-order-info-item"><div class="pp-order-info-label">Gesamtmenge</div><div class="pp-order-info-value">' + order.quantity + ' Stk.</div></div>' +
            '<div class="pp-order-info-item"><div class="pp-order-info-label">Liefertermin</div><div class="pp-order-info-value">' + order.dueDate.toLocaleDateString('de-DE') + '</div></div>' +
            '<div class="pp-order-info-item"><div class="pp-order-info-label">Fortschritt</div><div class="pp-order-info-value">' + plan.progress + '%</div></div>' +
            '<div class="pp-order-info-item"><div class="pp-order-info-label">Gesamtdauer</div><div class="pp-order-info-value">' + plan.routing.totalDuration + ' min</div></div>' +
            '</div>';

        // Routing Table
        modalHtml += '<table class="pp-routing-table">' +
            '<thead><tr>' +
            '<th>Schritt</th>' +
            '<th>Arbeitsgang</th>' +
            '<th>Arbeitsplatz</th>' +
            '<th>Dauer</th>' +
            '<th>Produzierte Menge</th>' +
            '<th>Status</th>' +
            '</tr></thead><tbody>';

        plan.steps.forEach(function(step, index) {
            var isCurrentStep = plan.currentStep === index;
            var isCompleted = step.status === 'completed';
            var rowClass = isCurrentStep ? 'current-step' : (isCompleted ? 'completed-step' : '');

            var producedQty = isCompleted ? order.quantity :
                              (step.status === 'inProgress' ? Math.round(order.quantity * step.progress / 100) : 0);
            var qtyPercent = Math.round((producedQty / order.quantity) * 100);

            var areaColor = ProductionPlanData.areaColors[step.area] || '#95a5a6';
            var wsName = step.assignedWorkstation ? step.assignedWorkstation.name : '<em>Noch zuzuweisen</em>';

            var statusLabel = step.status === 'completed' ? 'Abgeschlossen' :
                              step.status === 'inProgress' ? 'In Bearbeitung' :
                              step.status === 'waiting' ? 'Wartend' : 'Geplant';

            modalHtml += '<tr class="' + rowClass + '">' +
                '<td><span style="display:inline-block;width:8px;height:8px;background:' + areaColor + ';border-radius:50%;margin-right:8px;"></span>' + step.stepNumber + '</td>' +
                '<td>' + step.operation + '</td>' +
                '<td>' + wsName + '</td>' +
                '<td>' + step.totalTime + ' min</td>' +
                '<td class="pp-qty-cell">' +
                '<div class="pp-qty-produced">' + producedQty + '</div>' +
                '<div class="pp-qty-total">von ' + order.quantity + ' Stk.</div>' +
                '<div class="pp-qty-bar"><div class="pp-qty-bar-fill" style="width:' + qtyPercent + '%"></div></div>' +
                '</td>' +
                '<td><span class="pp-step-status ' + step.status + '">' + statusLabel + '</span></td>' +
                '</tr>';
        });

        modalHtml += '</tbody></table></div></div></div>';

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        var modal = document.getElementById('pp-detail-modal');
        modal.querySelector('.pp-detail-backdrop').addEventListener('click', function() {
            modal.remove();
        });
        modal.querySelector('.pp-detail-close').addEventListener('click', function() {
            modal.remove();
        });
    };

})();
