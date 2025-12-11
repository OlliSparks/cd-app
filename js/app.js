// =====================================================
// CD-APP - PRODUKTIONS-DASHBOARD
// Main Application Logic
// =====================================================

const App = {
    productionState: null,
    materialAnalysis: null,
    alerts: [],
    currentView: 'dashboard',
    currentArea: 'all',
    currentMaterialCategory: 'all',
    updateInterval: null,

    init() {
        console.log('CD-App Dashboard initializing...');
        this.refreshData();
        this.setupNavigation();
        this.setupAreaTabs();
        this.setupMaterialTabs();
        this.setupSearch();
        this.setupModal();
        this.setupFilters();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        this.updateInterval = setInterval(() => this.refreshData(), 30000);
        console.log('CD-App Dashboard ready!');
    },

    refreshData() {
        this.productionState = ProductionData.generateProductionState();
        this.alerts = ProductionData.generateAlerts(this.productionState);
        this.materialAnalysis = MaterialData.generateMaterialAnalysis(this.productionState.orders);
        this.renderDashboard();
        this.renderTimeline();
        this.renderOrders();
        this.renderAlerts();
        this.renderMaterial();
        this.updateStats();
        this.updateAlertBar();
        this.updateLastUpdate();
    },

    updateClock() {
        var now = new Date();
        var timeStr = now.toLocaleTimeString('de-DE');
        var el = document.getElementById('current-time');
        if (el) el.textContent = timeStr;
    },

    updateLastUpdate() {
        var now = new Date();
        var timeStr = now.toLocaleTimeString('de-DE');
        var el = document.getElementById('last-update');
        if (el) el.textContent = 'Letztes Update: ' + timeStr;
    },

    setupNavigation() {
        var self = this;
        document.querySelectorAll('.main-nav a[data-view]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                self.showView(link.dataset.view);
            });
        });
        document.querySelectorAll('#bottom-nav button[data-view]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.showView(btn.dataset.view);
            });
        });
    },

    showView(view) {
        this.currentView = view;
        document.querySelectorAll('.main-nav a[data-view]').forEach(function(link) {
            link.classList.toggle('active', link.dataset.view === view);
        });
        document.querySelectorAll('#bottom-nav button[data-view]').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        document.querySelectorAll('.view').forEach(function(v) {
            v.classList.toggle('active', v.id === 'view-' + view);
        });
    },

    setupAreaTabs() {
        var self = this;
        var tabsContainer = document.getElementById('area-tabs');
        if (!tabsContainer) return;

        var html = '<button class="area-tab active" data-area="all">Alle (40)</button>';
        ProductionData.areas.forEach(function(area) {
            var count = ProductionData.workstations.filter(function(ws) { return ws.area === area.id; }).length;
            html += '<button class="area-tab" data-area="' + area.id + '">' + area.name + ' (' + count + ')</button>';
        });
        tabsContainer.innerHTML = html;

        tabsContainer.querySelectorAll('.area-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                self.filterByArea(tab.dataset.area);
                tabsContainer.querySelectorAll('.area-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
            });
        });
    },

    filterByArea(areaId) {
        this.currentArea = areaId;
        this.renderDashboard();
    },

    renderDashboard() {
        var self = this;
        var grid = document.getElementById('workstation-grid');
        if (!grid) return;

        var html = '';
        var state = this.productionState.state;

        Object.values(state).forEach(function(ws) {
            if (self.currentArea !== 'all' && ws.workstation.area !== self.currentArea) return;
            html += self.renderWorkstationCard(ws);
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.ws-card').forEach(function(card) {
            card.addEventListener('click', function() {
                var wsId = card.dataset.wsId;
                self.showWorkstationDetail(wsId);
            });
        });
    },

    renderWorkstationCard(ws) {
        var statusClass = 'status-' + ws.status.id;
        var bodyContent = '';

        if (ws.status.id === 'running' || ws.status.id === 'setup') {
            var order = ws.currentOrder;
            bodyContent = '<div class="ws-order">' +
                '<span class="ws-priority ' + order.priority.id + '"></span>' +
                '<span class="ws-order-id">' + order.id + '</span>' +
                '<div class="ws-order-product">' + order.product.name + '</div>' +
                '</div>' +
                '<div class="ws-progress">' +
                '<div class="ws-progress-bar">' +
                '<div class="ws-progress-fill" style="width: ' + ws.progress + '%"></div>' +
                '</div>' +
                '<div class="ws-progress-text">' +
                '<span>' + ws.progress + '%</span>' +
                '<span>noch ' + ws.remainingMinutes + ' min</span>' +
                '</div>' +
                '</div>';
        } else if (ws.status.id === 'fault') {
            bodyContent = '<div class="ws-fault-msg">' + ws.faultMessage + '</div>';
        } else if (ws.status.id === 'idle') {
            bodyContent = '<div class="ws-empty">Kein aktiver Auftrag</div>';
        } else if (ws.status.id === 'maintenance') {
            var endTime = ws.maintenanceEnd ? ws.maintenanceEnd.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'}) : '--:--';
            bodyContent = '<div class="ws-empty">Wartung bis ' + endTime + '</div>';
        }

        var queueHtml = '';
        if (ws.queue && ws.queue.length > 0) {
            queueHtml = '<div class="ws-queue"><div class="ws-queue-title">Warteschlange</div>';
            ws.queue.slice(0, 2).forEach(function(q) {
                var time = q.estimatedStart.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
                queueHtml += '<div class="ws-queue-item"><span class="ws-priority ' + q.order.priority.id + '"></span>' + q.order.id + ' <span class="queue-time">ab ' + time + '</span></div>';
            });
            queueHtml += '</div>';
        }

        return '<div class="ws-card ' + statusClass + '" data-ws-id="' + ws.workstation.id + '">' +
            '<div class="ws-card-header">' +
            '<div>' +
            '<div class="ws-name">' + ws.workstation.name + '</div>' +
            '<div class="ws-type">' + ws.workstation.type + '</div>' +
            '</div>' +
            '<span class="ws-status-badge ' + ws.status.id + '">' + ws.status.label + '</span>' +
            '</div>' +
            '<div class="ws-card-body">' +
            bodyContent +
            queueHtml +
            '</div>' +
            '</div>';
    },

    updateStats() {
        var state = this.productionState.state;
        var counts = { running: 0, idle: 0, setup: 0, fault: 0, maintenance: 0 };

        Object.values(state).forEach(function(ws) {
            counts[ws.status.id]++;
        });

        document.getElementById('stat-running').textContent = counts.running;
        document.getElementById('stat-idle').textContent = counts.idle;
        document.getElementById('stat-setup').textContent = counts.setup;
        document.getElementById('stat-fault').textContent = counts.fault + counts.maintenance;
        document.getElementById('stat-orders').textContent = this.productionState.orders.length;
    },

    updateAlertBar() {
        var alertBar = document.getElementById('alert-bar');
        if (!alertBar) return;

        var criticalAlerts = this.alerts.filter(function(a) { return a.severity === 'critical'; });

        if (criticalAlerts.length > 0) {
            alertBar.classList.remove('hidden');
            alertBar.querySelector('.alert-message').textContent = criticalAlerts[0].title + ': ' + criticalAlerts[0].message;
            alertBar.querySelector('.alert-count').textContent = criticalAlerts.length > 1 ? '+' + (criticalAlerts.length - 1) + ' weitere' : '';
            alertBar.querySelector('.alert-close').onclick = function() {
                alertBar.classList.add('hidden');
            };
        } else {
            alertBar.classList.add('hidden');
        }
    },

    renderTimeline() {
        var container = document.getElementById('timeline-container');
        if (!container) return;

        var rangeEl = document.getElementById('timeline-range');
        var hours = rangeEl ? parseInt(rangeEl.value) : 8;
        var now = new Date();
        var state = this.productionState.state;
        var self = this;

        var timeAxisHtml = '<div class="timeline-time-axis">';
        for (var i = 0; i <= hours; i++) {
            var time = new Date(now.getTime() + i * 60 * 60 * 1000);
            timeAxisHtml += '<div class="timeline-time-mark">' + time.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'}) + '</div>';
        }
        timeAxisHtml += '</div>';

        var rowsHtml = '';
        Object.values(state).forEach(function(ws) {
            if (ws.status.id === 'fault' || ws.status.id === 'maintenance') return;

            var barsHtml = '';
            var pixelsPerHour = 100;

            if (ws.currentOrder && ws.remainingMinutes) {
                var width = Math.min((ws.remainingMinutes / 60) * pixelsPerHour, hours * pixelsPerHour);
                barsHtml += '<div class="timeline-bar ' + ws.status.id + '" style="left: 0; width: ' + width + 'px;">' + ws.currentOrder.id + '</div>';
            }

            if (ws.queue) {
                ws.queue.forEach(function(q) {
                    var startOffset = (q.estimatedStart - now) / (60 * 60 * 1000);
                    if (startOffset < hours && startOffset >= 0) {
                        var left = startOffset * pixelsPerHour;
                        var w = Math.min((q.estimatedDuration / 60) * pixelsPerHour, (hours - startOffset) * pixelsPerHour);
                        barsHtml += '<div class="timeline-bar queued" style="left: ' + left + 'px; width: ' + w + 'px;">' + q.order.id + '</div>';
                    }
                });
            }

            rowsHtml += '<div class="timeline-row">' +
                '<div class="timeline-label">' + ws.workstation.name + '</div>' +
                '<div class="timeline-bars" style="width: ' + (hours * pixelsPerHour) + 'px;">' + barsHtml + '</div>' +
                '</div>';
        });

        container.innerHTML = timeAxisHtml + rowsHtml;

        if (rangeEl && !rangeEl.hasAttribute('data-bound')) {
            rangeEl.setAttribute('data-bound', 'true');
            rangeEl.addEventListener('change', function() { self.renderTimeline(); });
        }
    },

    renderOrders() {
        var self = this;
        var tbody = document.querySelector('#orders-table tbody');
        if (!tbody) return;

        var orders = this.productionState.orders;
        var now = new Date();

        var customerFilter = document.getElementById('filter-customer');
        if (customerFilter && customerFilter.options.length <= 1) {
            ProductionData.customers.forEach(function(c) {
                customerFilter.add(new Option(c.name, c.id));
            });
        }

        var html = '';
        orders.forEach(function(order) {
            var daysUntilDue = (order.dueDate - now) / (24 * 60 * 60 * 1000);
            var dueDateClass = '';
            if (daysUntilDue < 0) dueDateClass = 'overdue';
            else if (daysUntilDue < 3) dueDateClass = 'soon';

            var statusText = 'Wartend';
            Object.values(self.productionState.state).forEach(function(ws) {
                if (ws.currentOrder && ws.currentOrder.id === order.id) {
                    statusText = 'Auf ' + ws.workstation.name;
                }
            });

            html += '<tr>' +
                '<td class="order-id">' + order.id + '</td>' +
                '<td>' + order.customer.name + '</td>' +
                '<td>' + order.product.name + '</td>' +
                '<td>' + order.quantity + '</td>' +
                '<td><span class="priority-badge ' + order.priority.id + '">' + order.priority.label + '</span></td>' +
                '<td class="due-date ' + dueDateClass + '">' + order.dueDate.toLocaleDateString('de-DE') + '</td>' +
                '<td>' + statusText + '</td>' +
                '</tr>';
        });

        tbody.innerHTML = html;
    },

    setupFilters() {
        var self = this;
        var priorityFilter = document.getElementById('filter-priority');
        var customerFilter = document.getElementById('filter-customer');

        if (priorityFilter) {
            priorityFilter.addEventListener('change', function() { self.applyOrderFilters(); });
        }
        if (customerFilter) {
            customerFilter.addEventListener('change', function() { self.applyOrderFilters(); });
        }
    },

    applyOrderFilters() {
        var priorityEl = document.getElementById('filter-priority');
        var customerEl = document.getElementById('filter-customer');
        var priority = priorityEl ? priorityEl.value : 'all';
        var customer = customerEl ? customerEl.value : 'all';

        var rows = document.querySelectorAll('#orders-table tbody tr');
        rows.forEach(function(row) {
            var show = true;

            if (priority !== 'all') {
                var badge = row.querySelector('.priority-badge');
                if (badge && !badge.classList.contains(priority)) show = false;
            }

            if (customer !== 'all') {
                var customerCell = row.cells[1];
                var customerData = ProductionData.customers.find(function(c) { return c.id === customer; });
                if (customerCell && customerData && customerCell.textContent !== customerData.name) show = false;
            }

            row.style.display = show ? '' : 'none';
        });
    },

    renderAlerts() {
        var self = this;
        var container = document.getElementById('alerts-list');
        if (!container) return;

        if (this.alerts.length === 0) {
            container.innerHTML = '<div class="no-alerts"><div class="no-alerts-icon">OK</div><div>Keine aktiven Meldungen</div></div>';
            return;
        }

        var html = '';
        this.alerts.forEach(function(alert) {
            var icon = alert.severity === 'critical' ? '!' : '?';
            var timeAgo = self.formatTimeAgo(alert.timestamp);

            html += '<div class="alert-item ' + alert.severity + '">' +
                '<div class="alert-item-icon">' + icon + '</div>' +
                '<div class="alert-item-content">' +
                '<div class="alert-item-title">' + alert.title + '</div>' +
                '<div class="alert-item-message">' + alert.message + '</div>' +
                '<div class="alert-item-time">' + timeAgo + '</div>' +
                '</div>' +
                '</div>';
        });

        container.innerHTML = html;
    },

    formatTimeAgo(date) {
        var now = new Date();
        var diff = (now - date) / 1000 / 60;

        if (diff < 1) return 'Gerade eben';
        if (diff < 60) return 'Vor ' + Math.floor(diff) + ' Minuten';
        if (diff < 1440) return 'Vor ' + Math.floor(diff / 60) + ' Stunden';
        return 'Vor ' + Math.floor(diff / 1440) + ' Tagen';
    },

    setupSearch() {
        var self = this;
        var searchInput = document.getElementById('search-input');
        var searchBtn = document.getElementById('search-btn');

        if (searchBtn) {
            searchBtn.addEventListener('click', function() { self.performSearch(); });
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') self.performSearch();
            });
        }
    },

    performSearch() {
        var self = this;
        var inputEl = document.getElementById('search-input');
        var query = inputEl ? inputEl.value.trim().toUpperCase() : '';
        if (!query) return;

        var order = this.productionState.orders.find(function(o) {
            return o.id.toUpperCase().indexOf(query) !== -1;
        });

        if (order) {
            var foundWs = null;
            Object.values(this.productionState.state).forEach(function(ws) {
                if (ws.currentOrder && ws.currentOrder.id === order.id) {
                    foundWs = ws;
                }
                if (ws.queue) {
                    ws.queue.forEach(function(q) {
                        if (q.order.id === order.id) foundWs = ws;
                    });
                }
            });

            if (foundWs) {
                this.showWorkstationDetail(foundWs.workstation.id);
            } else {
                alert('Auftrag ' + order.id + ' gefunden, aber aktuell keinem Arbeitsplatz zugeordnet.');
            }
        } else {
            alert('Kein Auftrag mit "' + query + '" gefunden.');
        }
    },

    setupModal() {
        var self = this;
        var modal = document.getElementById('detail-modal');
        if (!modal) return;

        modal.querySelector('.modal-backdrop').addEventListener('click', function() { self.closeModal(); });
        modal.querySelector('.modal-close').addEventListener('click', function() { self.closeModal(); });
    },

    showWorkstationDetail(wsId) {
        var ws = this.productionState.state[wsId];
        if (!ws) return;

        var modal = document.getElementById('detail-modal');
        var title = document.getElementById('modal-title');
        var body = document.getElementById('modal-body');

        title.textContent = ws.workstation.name;

        var html = '';

        html += '<div class="modal-section">' +
            '<div class="modal-section-title">Status</div>' +
            '<div class="modal-info-grid">' +
            '<div class="modal-info-item">' +
            '<div class="modal-info-label">Aktueller Status</div>' +
            '<div class="modal-info-value"><span class="ws-status-badge ' + ws.status.id + '">' + ws.status.label + '</span></div>' +
            '</div>' +
            '<div class="modal-info-item">' +
            '<div class="modal-info-label">Maschinentyp</div>' +
            '<div class="modal-info-value">' + ws.workstation.type + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        if (ws.currentOrder) {
            var order = ws.currentOrder;
            html += '<div class="modal-section">' +
                '<div class="modal-section-title">Aktueller Auftrag</div>' +
                '<div class="modal-info-grid">' +
                '<div class="modal-info-item">' +
                '<div class="modal-info-label">Auftragsnummer</div>' +
                '<div class="modal-info-value">' + order.id + '</div>' +
                '</div>' +
                '<div class="modal-info-item">' +
                '<div class="modal-info-label">Kunde</div>' +
                '<div class="modal-info-value">' + order.customer.name + '</div>' +
                '</div>' +
                '<div class="modal-info-item">' +
                '<div class="modal-info-label">Produkt</div>' +
                '<div class="modal-info-value">' + order.product.name + '</div>' +
                '</div>' +
                '<div class="modal-info-item">' +
                '<div class="modal-info-label">Menge</div>' +
                '<div class="modal-info-value">' + order.quantity + ' Stk.</div>' +
                '</div>' +
                '<div class="modal-info-item">' +
                '<div class="modal-info-label">Fortschritt</div>' +
                '<div class="modal-info-value">' + ws.progress + '%</div>' +
                '</div>' +
                '<div class="modal-info-item">' +
                '<div class="modal-info-label">Restzeit</div>' +
                '<div class="modal-info-value">' + ws.remainingMinutes + ' min</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        if (ws.status.id === 'fault') {
            html += '<div class="modal-section">' +
                '<div class="modal-section-title">Stoerungsmeldung</div>' +
                '<div class="ws-fault-msg">' + ws.faultMessage + '</div>' +
                '</div>';
        }

        if (ws.queue && ws.queue.length > 0) {
            html += '<div class="modal-section"><div class="modal-section-title">Warteschlange (' + ws.queue.length + ')</div><ul class="modal-queue-list">';
            ws.queue.forEach(function(q) {
                var time = q.estimatedStart.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
                html += '<li class="modal-queue-item">' +
                    '<span><span class="ws-priority ' + q.order.priority.id + '"></span>' + q.order.id + ' - ' + q.order.product.name + '</span>' +
                    '<span>ab ' + time + ' (' + q.estimatedDuration + ' min)</span>' +
                    '</li>';
            });
            html += '</ul></div>';
        }

        body.innerHTML = html;
        modal.classList.remove('hidden');
    },

    closeModal() {
        var modal = document.getElementById('detail-modal');
        if (modal) modal.classList.add('hidden');
    },

    // ===== MATERIAL DASHBOARD =====

    setupMaterialTabs() {
        var self = this;
        var tabsContainer = document.querySelector('.material-tabs');
        if (!tabsContainer) return;

        tabsContainer.addEventListener('click', function(e) {
            var tab = e.target.closest('.mat-tab');
            if (!tab) return;

            tabsContainer.querySelectorAll('.mat-tab').forEach(function(t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');

            self.currentMaterialCategory = tab.dataset.category;
            self.renderMaterial();
        });
    },

    renderMaterial() {
        var self = this;
        var listContainer = document.getElementById('material-list');
        var tabsContainer = document.querySelector('.material-tabs');
        if (!listContainer || !this.materialAnalysis) return;

        var analysis = this.materialAnalysis;

        // Update stats
        var statCritical = document.getElementById('mat-stat-critical');
        var statHigh = document.getElementById('mat-stat-high');
        var statMedium = document.getElementById('mat-stat-medium');
        var statOk = document.getElementById('mat-stat-ok');

        if (statCritical) statCritical.textContent = analysis.summary.critical;
        if (statHigh) statHigh.textContent = analysis.summary.high;
        if (statMedium) statMedium.textContent = analysis.summary.medium;
        if (statOk) statOk.textContent = analysis.summary.ok + analysis.summary.low;

        // Update category tabs with counts
        if (tabsContainer) {
            var categoryCounts = { all: analysis.items.length };
            MaterialData.categories.forEach(function(cat) {
                categoryCounts[cat.id] = analysis.items.filter(function(item) {
                    return item.material.category === cat.id;
                }).length;
            });

            var tabsHtml = '<button class="mat-tab' + (self.currentMaterialCategory === 'all' ? ' active' : '') + '" data-category="all">Alle <span class="mat-tab-count">' + categoryCounts.all + '</span></button>';
            MaterialData.categories.forEach(function(cat) {
                var isActive = self.currentMaterialCategory === cat.id;
                tabsHtml += '<button class="mat-tab' + (isActive ? ' active' : '') + '" data-category="' + cat.id + '">' + cat.name + ' <span class="mat-tab-count">' + categoryCounts[cat.id] + '</span></button>';
            });
            tabsContainer.innerHTML = tabsHtml;
        }

        // Filter items by category
        var filteredItems = analysis.items;
        if (this.currentMaterialCategory !== 'all') {
            filteredItems = analysis.items.filter(function(item) {
                return item.material.category === self.currentMaterialCategory;
            });
        }

        // Sort by risk level (critical first)
        var riskOrder = { critical: 0, high: 1, medium: 2, low: 3, ok: 4 };
        filteredItems.sort(function(a, b) {
            return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        });

        // Render material cards
        if (filteredItems.length === 0) {
            listContainer.innerHTML = '<div class="no-alerts"><div class="no-alerts-icon">OK</div><div>Keine Materialien in dieser Kategorie</div></div>';
            return;
        }

        var html = '';
        filteredItems.forEach(function(item, index) {
            html += self.renderMaterialCard(item, index);
        });

        listContainer.innerHTML = html;

        // Setup toggle functionality
        listContainer.querySelectorAll('.mat-card-header').forEach(function(header) {
            header.addEventListener('click', function() {
                var card = header.closest('.material-card');
                var body = card.querySelector('.mat-card-body');
                var toggle = card.querySelector('.mat-card-toggle');

                body.classList.toggle('open');
                toggle.classList.toggle('open');
            });
        });
    },

    renderMaterialCard(item, index) {
        var self = this;
        var riskLabel = this.getRiskLabel(item.riskLevel);

        // Coverage bar calculation
        var total = item.totalRequired;
        var stockPercent = total > 0 ? Math.min(100, Math.round((item.currentStock / total) * 100)) : 0;
        var incomingPercent = total > 0 ? Math.min(100 - stockPercent, Math.round((item.incoming / total) * 100)) : 0;
        var shortfallPercent = item.shortfall > 0 ? Math.round((item.shortfall / total) * 100) : 0;

        // Purchase orders HTML
        var poHtml = '';
        if (item.purchaseOrders && item.purchaseOrders.length > 0) {
            poHtml = '<div class="mat-po-section"><div class="mat-po-title">Offene Bestellungen (' + item.purchaseOrders.length + ')</div><div class="mat-po-list">';
            item.purchaseOrders.forEach(function(po) {
                var statusClass = po.status === 'confirmed' ? 'confirmed' : (po.status === 'delayed' ? 'delayed' : 'partial');
                var statusLabel = po.status === 'confirmed' ? 'Bestätigt' : (po.status === 'delayed' ? 'Verzögert' : 'Teillieferung');
                poHtml += '<div class="mat-po-item">' +
                    '<span class="mat-po-id">' + po.poNumber + '</span>' +
                    '<span class="mat-po-qty">' + po.quantity + ' ' + item.material.unit + '</span>' +
                    '<span class="mat-po-date">' + po.expectedDate.toLocaleDateString('de-DE') + '</span>' +
                    '<span class="mat-po-status ' + statusClass + '">' + statusLabel + '</span>' +
                    '</div>';
            });
            poHtml += '</div></div>';
        }

        // Affected orders HTML
        var affectedHtml = '';
        if (item.affectedOrders && item.affectedOrders.length > 0) {
            affectedHtml = '<div class="mat-affected"><div class="mat-affected-title">Betroffene Aufträge (' + item.affectedOrders.length + ')</div><div class="mat-affected-list">';
            item.affectedOrders.slice(0, 5).forEach(function(order) {
                var priorityClass = order.priority.id;
                affectedHtml += '<div class="mat-affected-item"><span class="priority-dot ' + priorityClass + '"></span>' + order.id + '</div>';
            });
            if (item.affectedOrders.length > 5) {
                affectedHtml += '<div class="mat-affected-item">+' + (item.affectedOrders.length - 5) + ' weitere</div>';
            }
            affectedHtml += '</div></div>';
        }

        // Coverage days status
        var coverageClass = item.coverageDays < 3 ? 'negative' : (item.coverageDays < 7 ? 'warning' : 'positive');
        var shortfallClass = item.shortfall > 0 ? 'negative' : 'positive';

        return '<div class="material-card risk-' + item.riskLevel + '">' +
            '<div class="mat-card-header">' +
            '<div class="mat-card-title">' +
            '<div class="mat-card-name">' + item.material.name + '</div>' +
            '<div class="mat-card-id">' + item.material.id + '</div>' +
            '</div>' +
            '<div class="mat-card-status">' +
            '<span class="mat-risk-badge ' + item.riskLevel + '">' + riskLabel + '</span>' +
            '<button class="mat-card-toggle">▼</button>' +
            '</div>' +
            '</div>' +
            '<div class="mat-card-body">' +
            '<div class="mat-info-grid">' +
            '<div class="mat-info-box">' +
            '<div class="mat-info-label">Lagerbestand</div>' +
            '<div class="mat-info-value">' + item.currentStock + '</div>' +
            '<div class="mat-info-unit">' + item.material.unit + '</div>' +
            '</div>' +
            '<div class="mat-info-box">' +
            '<div class="mat-info-label">Bedarf (2 Wo.)</div>' +
            '<div class="mat-info-value">' + item.totalRequired + '</div>' +
            '<div class="mat-info-unit">' + item.material.unit + '</div>' +
            '</div>' +
            '<div class="mat-info-box">' +
            '<div class="mat-info-label">Fehlmenge</div>' +
            '<div class="mat-info-value ' + shortfallClass + '">' + (item.shortfall > 0 ? '-' + item.shortfall : '0') + '</div>' +
            '<div class="mat-info-unit">' + item.material.unit + '</div>' +
            '</div>' +
            '<div class="mat-info-box">' +
            '<div class="mat-info-label">Reichweite</div>' +
            '<div class="mat-info-value ' + coverageClass + '">' + item.coverageDays + '</div>' +
            '<div class="mat-info-unit">Tage</div>' +
            '</div>' +
            '</div>' +
            '<div class="mat-coverage">' +
            '<div class="mat-coverage-title">Bedarfsdeckung</div>' +
            '<div class="mat-coverage-bar">' +
            (stockPercent > 0 ? '<div class="mat-coverage-segment stock" style="width: ' + stockPercent + '%">' + stockPercent + '%</div>' : '') +
            (incomingPercent > 0 ? '<div class="mat-coverage-segment incoming" style="width: ' + incomingPercent + '%">' + incomingPercent + '%</div>' : '') +
            (shortfallPercent > 0 ? '<div class="mat-coverage-segment shortfall" style="width: ' + shortfallPercent + '%">' + shortfallPercent + '%</div>' : '') +
            '</div>' +
            '<div class="mat-coverage-legend">' +
            '<div class="mat-legend-item"><span class="mat-legend-dot stock"></span>Lager</div>' +
            '<div class="mat-legend-item"><span class="mat-legend-dot incoming"></span>Eingehend</div>' +
            '<div class="mat-legend-item"><span class="mat-legend-dot shortfall"></span>Fehlmenge</div>' +
            '</div>' +
            '</div>' +
            poHtml +
            affectedHtml +
            '</div>' +
            '</div>';
    },

    getRiskLabel(risk) {
        var labels = {
            critical: 'Kritisch',
            high: 'Hoch',
            medium: 'Mittel',
            low: 'Niedrig',
            ok: 'OK'
        };
        return labels[risk] || risk;
    }
};

document.addEventListener('DOMContentLoaded', function() { App.init(); });
