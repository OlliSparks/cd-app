// =====================================================
// CD-APP - PRODUKTIONS-DASHBOARD
// Main Application Logic
// =====================================================

const App = {
    productionState: null,
    alerts: [],
    currentView: 'dashboard',
    currentArea: 'all',
    updateInterval: null,

    init() {
        console.log('CD-App Dashboard initializing...');
        this.refreshData();
        this.setupNavigation();
        this.setupAreaTabs();
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
        this.renderDashboard();
        this.renderTimeline();
        this.renderOrders();
        this.renderAlerts();
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
    }
};

document.addEventListener('DOMContentLoaded', function() { App.init(); });
