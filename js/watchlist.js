// =====================================================
// CD-APP - WATCHLIST MODUL
// Persönliche Überwachung kritischer Artikel & Bestellungen
// =====================================================

const Watchlist = {
    articles: [],
    orders: [],
    alerts: [],
    currentTab: 'articles',

    // ===== INITIALISIERUNG =====
    init() {
        console.log('Watchlist initializing...');
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupModeTabs();
        this.checkForChanges();
        this.renderWatchlist();
        console.log('Watchlist ready:', this.articles.length, 'articles,', this.orders.length, 'orders');
    },

    // ===== LOCALSTORAGE =====
    loadFromStorage() {
        try {
            var savedArticles = localStorage.getItem('watchlist_articles');
            var savedOrders = localStorage.getItem('watchlist_orders');
            var savedAlerts = localStorage.getItem('watchlist_alerts');

            // Check if data exists and is valid
            var parsedArticles = null;
            var parsedOrders = null;

            if (savedArticles && savedArticles !== 'null' && savedArticles !== '[]') {
                parsedArticles = JSON.parse(savedArticles);
            }
            if (savedOrders && savedOrders !== 'null' && savedOrders !== '[]') {
                parsedOrders = JSON.parse(savedOrders);
            }

            // Use defaults if no saved data or empty arrays
            this.articles = (parsedArticles && parsedArticles.length > 0) ? parsedArticles : this.getDefaultArticles();
            this.orders = (parsedOrders && parsedOrders.length > 0) ? parsedOrders : this.getDefaultOrders();
            this.alerts = savedAlerts ? JSON.parse(savedAlerts) : [];

            // Parse dates
            this.orders.forEach(function(order) {
                order.expectedDate = new Date(order.expectedDate);
                order.originalDate = new Date(order.originalDate);
                if (order.lastChecked) order.lastChecked = new Date(order.lastChecked);
            });

            // Save defaults if they were used
            this.saveToStorage();
        } catch (e) {
            console.error('Error loading watchlist:', e);
            this.articles = this.getDefaultArticles();
            this.orders = this.getDefaultOrders();
            this.alerts = [];
            this.saveToStorage();
        }
    },

    saveToStorage() {
        try {
            localStorage.setItem('watchlist_articles', JSON.stringify(this.articles));
            localStorage.setItem('watchlist_orders', JSON.stringify(this.orders));
            localStorage.setItem('watchlist_alerts', JSON.stringify(this.alerts));
        } catch (e) {
            console.error('Error saving watchlist:', e);
        }
    },

    // ===== MOCK-DATEN =====
    getDefaultArticles() {
        return [
            {
                id: 'wl-1',
                materialId: 'MAT-BK7-R50',
                threshold: 80,
                note: 'Hauptmaterial für Zeiss-Aufträge',
                addedAt: new Date().toISOString()
            },
            {
                id: 'wl-2',
                materialId: 'MAT-SF11-R30',
                threshold: 30,
                note: 'Kritisch für BMW HUD Projekt',
                addedAt: new Date().toISOString()
            },
            {
                id: 'wl-3',
                materialId: 'MAT-COAT-AR',
                threshold: 5,
                note: 'Lange Lieferzeit - immer im Blick behalten',
                addedAt: new Date().toISOString()
            },
            {
                id: 'wl-4',
                materialId: 'MAT-FUSED-R75',
                threshold: 25,
                note: '',
                addedAt: new Date().toISOString()
            }
        ];
    },

    getDefaultOrders() {
        var now = new Date();
        return [
            {
                id: 'wo-1',
                orderNumber: 'PO-450127',
                materialId: 'MAT-BK7-R50',
                quantity: 200,
                supplier: 'Schott AG',
                expectedDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
                originalDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
                status: 'confirmed',
                lastChecked: now,
                changes: []
            },
            {
                id: 'wo-2',
                orderNumber: 'PO-450089',
                materialId: 'MAT-SF11-R30',
                quantity: 50,
                supplier: 'Ohara GmbH',
                expectedDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
                originalDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
                status: 'delayed',
                lastChecked: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
                changes: [
                    { date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), type: 'date', oldValue: '2024-12-18', newValue: '2024-12-23', read: false }
                ]
            },
            {
                id: 'wo-3',
                orderNumber: 'PO-450156',
                materialId: 'MAT-COAT-AR',
                quantity: 10,
                supplier: 'Laseroptik GmbH',
                expectedDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
                originalDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
                status: 'confirmed',
                lastChecked: now,
                changes: []
            }
        ];
    },

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        var self = this;

        // Add Article Button
        var btnAddArticle = document.getElementById('btn-add-article');
        if (btnAddArticle) {
            btnAddArticle.onclick = function() { self.openArticleModal(); };
        }

        // Add Order Button
        var btnAddOrder = document.getElementById('btn-add-order');
        if (btnAddOrder) {
            btnAddOrder.onclick = function() { self.openOrderModal(); };
        }

        // Article Modal
        var btnSaveArticle = document.getElementById('btn-save-article');
        var btnCancelArticle = document.getElementById('btn-cancel-article');
        if (btnSaveArticle) btnSaveArticle.onclick = function() { self.saveArticle(); };
        if (btnCancelArticle) btnCancelArticle.onclick = function() { self.closeModal('add-article-modal'); };

        // Order Modal
        var btnSaveOrder = document.getElementById('btn-save-order');
        var btnCancelOrder = document.getElementById('btn-cancel-order');
        if (btnSaveOrder) btnSaveOrder.onclick = function() { self.saveOrder(); };
        if (btnCancelOrder) btnCancelOrder.onclick = function() { self.closeModal('add-order-modal'); };

        // Modal close buttons
        document.querySelectorAll('#add-article-modal .modal-close, #add-order-modal .modal-close').forEach(function(btn) {
            btn.onclick = function() {
                self.closeModal('add-article-modal');
                self.closeModal('add-order-modal');
            };
        });

        // Modal backdrops
        document.querySelectorAll('#add-article-modal .modal-backdrop, #add-order-modal .modal-backdrop').forEach(function(backdrop) {
            backdrop.onclick = function() {
                self.closeModal('add-article-modal');
                self.closeModal('add-order-modal');
            };
        });

        // Watchlist tabs
        document.querySelectorAll('.watchlist-tabs .wl-tab').forEach(function(tab) {
            tab.onclick = function() {
                document.querySelectorAll('.watchlist-tabs .wl-tab').forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
                self.currentTab = tab.dataset.wltab;
                self.renderWatchlist();
            };
        });
    },

    setupModeTabs() {
        var self = this;
        document.querySelectorAll('.material-mode-tabs .mode-tab').forEach(function(tab) {
            tab.onclick = function() {
                document.querySelectorAll('.material-mode-tabs .mode-tab').forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');

                var mode = tab.dataset.mode;
                document.querySelectorAll('.material-mode').forEach(function(m) {
                    m.classList.remove('active');
                });
                document.getElementById('material-' + mode).classList.add('active');

                if (mode === 'watchlist') {
                    self.renderWatchlist();
                }
            };
        });
    },

    // ===== MODALS =====
    openArticleModal() {
        var select = document.getElementById('wl-article-select');
        select.innerHTML = '<option value="">-- Artikel wählen --</option>';

        var existingIds = this.articles.map(function(a) { return a.materialId; });

        MaterialData.materials.forEach(function(mat) {
            if (existingIds.indexOf(mat.id) === -1) {
                var option = document.createElement('option');
                option.value = mat.id;
                option.textContent = mat.name + ' (' + mat.id + ')';
                select.appendChild(option);
            }
        });

        document.getElementById('wl-article-threshold').value = '';
        document.getElementById('wl-article-note').value = '';
        document.getElementById('add-article-modal').classList.remove('hidden');
    },

    openOrderModal() {
        var select = document.getElementById('wl-order-article');
        select.innerHTML = '<option value="">-- Artikel wählen --</option>';

        MaterialData.materials.forEach(function(mat) {
            var option = document.createElement('option');
            option.value = mat.id;
            option.textContent = mat.name + ' (' + mat.id + ')';
            select.appendChild(option);
        });

        document.getElementById('wl-order-number').value = '';
        document.getElementById('wl-order-quantity').value = '';
        document.getElementById('wl-order-date').value = '';
        document.getElementById('wl-order-supplier').value = '';
        document.getElementById('add-order-modal').classList.remove('hidden');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    },

    // ===== CRUD OPERATIONS =====
    saveArticle() {
        var materialId = document.getElementById('wl-article-select').value;
        var threshold = parseInt(document.getElementById('wl-article-threshold').value) || 0;
        var note = document.getElementById('wl-article-note').value;

        if (!materialId) {
            alert('Bitte einen Artikel auswählen');
            return;
        }

        this.articles.push({
            id: 'wl-' + Date.now(),
            materialId: materialId,
            threshold: threshold,
            note: note,
            addedAt: new Date().toISOString()
        });

        this.saveToStorage();
        this.closeModal('add-article-modal');
        this.renderWatchlist();
    },

    saveOrder() {
        var orderNumber = document.getElementById('wl-order-number').value.trim();
        var materialId = document.getElementById('wl-order-article').value;
        var quantity = parseInt(document.getElementById('wl-order-quantity').value) || 0;
        var dateStr = document.getElementById('wl-order-date').value;
        var supplier = document.getElementById('wl-order-supplier').value.trim();

        if (!orderNumber || !materialId || !dateStr) {
            alert('Bitte Bestellnummer, Artikel und Liefertermin angeben');
            return;
        }

        var expectedDate = new Date(dateStr);

        this.orders.push({
            id: 'wo-' + Date.now(),
            orderNumber: orderNumber,
            materialId: materialId,
            quantity: quantity,
            supplier: supplier,
            expectedDate: expectedDate,
            originalDate: expectedDate,
            status: 'confirmed',
            lastChecked: new Date(),
            changes: []
        });

        this.saveToStorage();
        this.closeModal('add-order-modal');
        this.currentTab = 'orders';
        document.querySelectorAll('.watchlist-tabs .wl-tab').forEach(function(t) {
            t.classList.toggle('active', t.dataset.wltab === 'orders');
        });
        this.renderWatchlist();
    },

    removeArticle(id) {
        if (confirm('Artikel aus Watchlist entfernen?')) {
            this.articles = this.articles.filter(function(a) { return a.id !== id; });
            this.saveToStorage();
            this.renderWatchlist();
        }
    },

    removeOrder(id) {
        if (confirm('Bestellung aus Tracking entfernen?')) {
            this.orders = this.orders.filter(function(o) { return o.id !== id; });
            this.saveToStorage();
            this.renderWatchlist();
        }
    },

    // ===== ÄNDERUNGSERKENNUNG (Mock) =====
    checkForChanges() {
        var self = this;
        var newAlerts = [];

        // Simuliere Änderungen bei Bestellungen
        this.orders.forEach(function(order) {
            // 20% Chance für simulierte Änderung
            if (Math.random() < 0.2 && order.status !== 'delivered') {
                var changeType = Math.random() < 0.7 ? 'date' : 'status';

                if (changeType === 'date') {
                    var delayDays = Math.floor(Math.random() * 7) + 1;
                    var oldDate = new Date(order.expectedDate);
                    var newDate = new Date(oldDate.getTime() + delayDays * 24 * 60 * 60 * 1000);

                    // Check if this change was already recorded
                    var alreadyRecorded = order.changes.some(function(c) {
                        return c.newValue === newDate.toISOString().split('T')[0];
                    });

                    if (!alreadyRecorded && newDate > oldDate) {
                        order.changes.push({
                            date: new Date().toISOString(),
                            type: 'date',
                            oldValue: oldDate.toLocaleDateString('de-DE'),
                            newValue: newDate.toLocaleDateString('de-DE'),
                            read: false
                        });
                        order.expectedDate = newDate;
                        order.status = 'delayed';

                        newAlerts.push({
                            id: 'alert-' + Date.now() + '-' + order.id,
                            type: 'date_change',
                            orderId: order.id,
                            orderNumber: order.orderNumber,
                            message: 'Liefertermin verschoben: ' + oldDate.toLocaleDateString('de-DE') + ' → ' + newDate.toLocaleDateString('de-DE'),
                            timestamp: new Date(),
                            read: false
                        });
                    }
                }
            }
        });

        if (newAlerts.length > 0) {
            this.alerts = newAlerts.concat(this.alerts).slice(0, 20);
            this.saveToStorage();
        }
    },

    markAlertRead(alertId) {
        this.alerts.forEach(function(alert) {
            if (alert.id === alertId) alert.read = true;
        });
        this.saveToStorage();
        this.renderWatchlist();
    },

    clearAllAlerts() {
        this.alerts = [];
        this.orders.forEach(function(order) {
            order.changes.forEach(function(c) { c.read = true; });
        });
        this.saveToStorage();
        this.renderWatchlist();
    },

    // ===== RENDERING =====
    renderWatchlist() {
        this.renderStats();
        this.renderAlerts();

        if (this.currentTab === 'articles') {
            document.getElementById('watchlist-articles').style.display = 'block';
            document.getElementById('watchlist-orders').style.display = 'none';
            this.renderArticles();
        } else {
            document.getElementById('watchlist-articles').style.display = 'none';
            document.getElementById('watchlist-orders').style.display = 'block';
            this.renderOrders();
        }
    },

    renderStats() {
        var self = this;
        var criticalCount = 0;
        var okCount = 0;

        // Generate mock inventory - always use this for demo
        var inventory = {};
        try {
            if (typeof MaterialData !== 'undefined' && MaterialData.materials) {
                MaterialData.materials.forEach(function(mat) {
                    // Generate semi-random but consistent stock based on material id
                    var seed = mat.id.charCodeAt(4) || 50;
                    inventory[mat.id] = seed + Math.floor(Math.random() * 80);
                });
            }
        } catch (e) {
            console.warn('Could not generate inventory:', e);
        }

        // Count critical vs ok articles
        if (this.articles && this.articles.length > 0) {
            this.articles.forEach(function(article) {
                var stock = inventory[article.materialId] || 50;
                if (stock < article.threshold) {
                    criticalCount++;
                } else {
                    okCount++;
                }
            });
        }

        var unreadAlerts = this.alerts ? this.alerts.filter(function(a) { return !a.read; }).length : 0;

        var elCritical = document.getElementById('wl-stat-critical');
        var elOk = document.getElementById('wl-stat-ok');
        var elOrders = document.getElementById('wl-stat-orders');
        var elAlerts = document.getElementById('wl-stat-alerts');

        if (elCritical) elCritical.textContent = criticalCount;
        if (elOk) elOk.textContent = okCount;
        if (elOrders) elOrders.textContent = this.orders ? this.orders.length : 0;
        if (elAlerts) elAlerts.textContent = unreadAlerts;
    },

    renderAlerts() {
        var self = this;
        var container = document.getElementById('watchlist-alerts');
        var unreadAlerts = this.alerts.filter(function(a) { return !a.read; });

        if (unreadAlerts.length === 0) {
            container.innerHTML = '';
            return;
        }

        var html = '<div class="wl-alerts-header"><span>' + unreadAlerts.length + ' neue Meldung(en)</span><button class="wl-clear-alerts" onclick="Watchlist.clearAllAlerts()">Alle gelesen</button></div>';

        unreadAlerts.slice(0, 5).forEach(function(alert) {
            html += '<div class="wl-alert-item">' +
                '<div class="wl-alert-icon">!</div>' +
                '<div class="wl-alert-content">' +
                '<div class="wl-alert-title">' + alert.orderNumber + '</div>' +
                '<div class="wl-alert-message">' + alert.message + '</div>' +
                '</div>' +
                '<button class="wl-alert-dismiss" onclick="Watchlist.markAlertRead(\'' + alert.id + '\')">×</button>' +
                '</div>';
        });

        container.innerHTML = html;
    },

    renderArticles() {
        var self = this;
        var container = document.getElementById('watchlist-articles');

        if (this.articles.length === 0) {
            container.innerHTML = '<div class="wl-empty"><div class="wl-empty-icon">📋</div><div>Keine Artikel in der Watchlist</div><div class="wl-empty-hint">Klicke "+ Artikel" um einen Artikel hinzuzufügen</div></div>';
            return;
        }

        // Generate mock inventory for demo
        var inventory = {};
        try {
            if (typeof MaterialData !== 'undefined' && MaterialData.materials) {
                MaterialData.materials.forEach(function(mat) {
                    var seed = mat.id.charCodeAt(4) || 50;
                    inventory[mat.id] = seed + Math.floor(Math.random() * 80);
                });
            }
        } catch (e) {
            console.warn('Could not generate inventory:', e);
        }

        var html = '';
        this.articles.forEach(function(article) {
            var material = null;
            try {
                material = MaterialData.materials.find(function(m) { return m.id === article.materialId; });
            } catch (e) {}
            if (!material) return;

            var stock = inventory[article.materialId] || 50;
            var isCritical = stock < article.threshold;
            var statusClass = isCritical ? 'critical' : 'ok';
            var percentage = article.threshold > 0 ? Math.round((stock / article.threshold) * 100) : 100;

            html += '<div class="wl-article-card ' + statusClass + '">' +
                '<div class="wl-article-header">' +
                '<div class="wl-article-info">' +
                '<div class="wl-article-name">' + material.name + '</div>' +
                '<div class="wl-article-id">' + material.id + '</div>' +
                '</div>' +
                '<div class="wl-article-status">' +
                '<span class="wl-status-badge ' + statusClass + '">' + (isCritical ? 'KRITISCH' : 'OK') + '</span>' +
                '<button class="wl-remove-btn" onclick="Watchlist.removeArticle(\'' + article.id + '\')">×</button>' +
                '</div>' +
                '</div>' +
                '<div class="wl-article-body">' +
                '<div class="wl-article-stats">' +
                '<div class="wl-article-stat">' +
                '<div class="wl-stat-label">Aktueller Bestand</div>' +
                '<div class="wl-stat-value ' + statusClass + '">' + stock + ' ' + material.unit + '</div>' +
                '</div>' +
                '<div class="wl-article-stat">' +
                '<div class="wl-stat-label">Grenzwert</div>' +
                '<div class="wl-stat-value">' + article.threshold + ' ' + material.unit + '</div>' +
                '</div>' +
                '<div class="wl-article-stat">' +
                '<div class="wl-stat-label">Status</div>' +
                '<div class="wl-stat-value">' + percentage + '%</div>' +
                '</div>' +
                '</div>' +
                '<div class="wl-progress-bar">' +
                '<div class="wl-progress-fill ' + statusClass + '" style="width: ' + Math.min(percentage, 100) + '%"></div>' +
                '<div class="wl-progress-threshold" style="left: ' + Math.min(100, (article.threshold / (stock > article.threshold ? stock : article.threshold * 1.5)) * 100) + '%"></div>' +
                '</div>' +
                (article.note ? '<div class="wl-article-note">' + article.note + '</div>' : '') +
                '</div>' +
                '</div>';
        });

        container.innerHTML = html;
    },

    renderOrders() {
        var self = this;
        var container = document.getElementById('watchlist-orders');

        if (this.orders.length === 0) {
            container.innerHTML = '<div class="wl-empty"><div class="wl-empty-icon">📦</div><div>Keine Bestellungen im Tracking</div><div class="wl-empty-hint">Klicke "+ Bestellung" um eine SAP-Bestellung zu tracken</div></div>';
            return;
        }

        var html = '';
        this.orders.forEach(function(order) {
            var material = MaterialData.materials.find(function(m) { return m.id === order.materialId; });
            var materialName = material ? material.name : order.materialId;
            var unit = material ? material.unit : 'Stk';

            var now = new Date();
            var daysUntil = Math.ceil((order.expectedDate - now) / (24 * 60 * 60 * 1000));
            var isDelayed = order.status === 'delayed';
            var isOverdue = daysUntil < 0;
            var statusClass = isOverdue ? 'overdue' : (isDelayed ? 'delayed' : 'confirmed');

            var unreadChanges = order.changes.filter(function(c) { return !c.read; }).length;

            html += '<div class="wl-order-card ' + statusClass + '">' +
                '<div class="wl-order-header">' +
                '<div class="wl-order-info">' +
                '<div class="wl-order-number">' + order.orderNumber + (unreadChanges > 0 ? ' <span class="wl-change-badge">' + unreadChanges + '</span>' : '') + '</div>' +
                '<div class="wl-order-material">' + materialName + '</div>' +
                '</div>' +
                '<div class="wl-order-status">' +
                '<span class="wl-status-badge ' + statusClass + '">' + (isOverdue ? 'ÜBERFÄLLIG' : (isDelayed ? 'VERZÖGERT' : 'BESTÄTIGT')) + '</span>' +
                '<button class="wl-remove-btn" onclick="Watchlist.removeOrder(\'' + order.id + '\')">×</button>' +
                '</div>' +
                '</div>' +
                '<div class="wl-order-body">' +
                '<div class="wl-order-details">' +
                '<div class="wl-order-detail"><span class="wl-detail-label">Menge:</span> ' + order.quantity + ' ' + unit + '</div>' +
                '<div class="wl-order-detail"><span class="wl-detail-label">Lieferant:</span> ' + (order.supplier || '-') + '</div>' +
                '<div class="wl-order-detail"><span class="wl-detail-label">Liefertermin:</span> <strong>' + order.expectedDate.toLocaleDateString('de-DE') + '</strong> (' + (daysUntil >= 0 ? 'in ' + daysUntil + ' Tagen' : Math.abs(daysUntil) + ' Tage überfällig') + ')</div>' +
                (isDelayed ? '<div class="wl-order-detail wl-original-date"><span class="wl-detail-label">Ursprünglich:</span> ' + order.originalDate.toLocaleDateString('de-DE') + '</div>' : '') +
                '</div>';

            if (order.changes.length > 0) {
                html += '<div class="wl-order-changes"><div class="wl-changes-title">Änderungsverlauf</div>';
                order.changes.slice(0, 3).forEach(function(change) {
                    var changeDate = new Date(change.date);
                    html += '<div class="wl-change-item ' + (change.read ? '' : 'unread') + '">' +
                        '<span class="wl-change-date">' + changeDate.toLocaleDateString('de-DE') + '</span>' +
                        '<span class="wl-change-text">Liefertermin: ' + change.oldValue + ' → ' + change.newValue + '</span>' +
                        '</div>';
                });
                html += '</div>';
            }

            html += '</div></div>';
        });

        container.innerHTML = html;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for App to be initialized
    setTimeout(function() {
        Watchlist.init();
    }, 500);
});
