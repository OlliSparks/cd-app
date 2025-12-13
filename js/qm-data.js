// =====================================================
// CD-APP - QM-MANAGEMENT MODUL
// Qualitätsmanagement: Durchlaufzeit, Ausfallzeiten,
// Fehlerraten, Nacharbeit
// =====================================================

const QMData = {

    currentPeriod: 'week',

    // ===== MOCK-DATEN =====

    // Durchlaufzeiten nach Bereich (in Tagen)
    throughputByArea: {
        week: {
            'Schleifen': 2.3,
            'Polieren': 3.1,
            'Beschichtung': 1.8,
            'Zentrieren': 0.9,
            'Verkittung': 1.2,
            'QS': 0.5
        },
        month: {
            'Schleifen': 2.5,
            'Polieren': 3.4,
            'Beschichtung': 2.0,
            'Zentrieren': 1.0,
            'Verkittung': 1.4,
            'QS': 0.6
        },
        quarter: {
            'Schleifen': 2.4,
            'Polieren': 3.2,
            'Beschichtung': 1.9,
            'Zentrieren': 0.95,
            'Verkittung': 1.3,
            'QS': 0.55
        }
    },

    // Ausfallzeiten nach Ursache (in Stunden)
    downtimeByReason: {
        week: [
            { reason: 'Wartung (geplant)', hours: 12, color: '#3498db' },
            { reason: 'Maschinenstörung', hours: 8, color: '#e74c3c' },
            { reason: 'Materialengpass', hours: 4, color: '#f39c12' },
            { reason: 'Werkzeugwechsel', hours: 6, color: '#9b59b6' },
            { reason: 'Sonstiges', hours: 2, color: '#95a5a6' }
        ],
        month: [
            { reason: 'Wartung (geplant)', hours: 48, color: '#3498db' },
            { reason: 'Maschinenstörung', hours: 35, color: '#e74c3c' },
            { reason: 'Materialengpass', hours: 18, color: '#f39c12' },
            { reason: 'Werkzeugwechsel', hours: 24, color: '#9b59b6' },
            { reason: 'Sonstiges', hours: 10, color: '#95a5a6' }
        ],
        quarter: [
            { reason: 'Wartung (geplant)', hours: 144, color: '#3498db' },
            { reason: 'Maschinenstörung', hours: 98, color: '#e74c3c' },
            { reason: 'Materialengpass', hours: 52, color: '#f39c12' },
            { reason: 'Werkzeugwechsel', hours: 68, color: '#9b59b6' },
            { reason: 'Sonstiges', hours: 28, color: '#95a5a6' }
        ]
    },

    // Fehlerarten (Top 5)
    errorTypes: {
        week: [
            { type: 'Oberflächenfehler', count: 23, percentage: 35 },
            { type: 'Maßabweichung', count: 18, percentage: 27 },
            { type: 'Beschichtungsfehler', count: 12, percentage: 18 },
            { type: 'Kantenausbruch', count: 8, percentage: 12 },
            { type: 'Verunreinigung', count: 5, percentage: 8 }
        ],
        month: [
            { type: 'Oberflächenfehler', count: 89, percentage: 32 },
            { type: 'Maßabweichung', count: 72, percentage: 26 },
            { type: 'Beschichtungsfehler', count: 58, percentage: 21 },
            { type: 'Kantenausbruch', count: 35, percentage: 13 },
            { type: 'Verunreinigung', count: 22, percentage: 8 }
        ],
        quarter: [
            { type: 'Oberflächenfehler', count: 267, percentage: 33 },
            { type: 'Maßabweichung', count: 218, percentage: 27 },
            { type: 'Beschichtungsfehler', count: 162, percentage: 20 },
            { type: 'Kantenausbruch', count: 97, percentage: 12 },
            { type: 'Verunreinigung', count: 65, percentage: 8 }
        ]
    },

    // Nacharbeit nach Produkt
    reworkByProduct: {
        week: [
            { product: 'Asphäre Ø40mm', orders: 12, reworked: 3, rate: 25 },
            { product: 'Pentaprisma 30mm', orders: 8, reworked: 2, rate: 25 },
            { product: 'Sphär. Spiegel Ø75mm', orders: 5, reworked: 1, rate: 20 },
            { product: 'Bandpassfilter Ø25mm', orders: 15, reworked: 2, rate: 13 },
            { product: 'Achromat Ø30mm', orders: 10, reworked: 1, rate: 10 }
        ],
        month: [
            { product: 'Asphäre Ø40mm', orders: 48, reworked: 11, rate: 23 },
            { product: 'Pentaprisma 30mm', orders: 32, reworked: 7, rate: 22 },
            { product: 'Sphär. Spiegel Ø75mm', orders: 20, reworked: 4, rate: 20 },
            { product: 'Bandpassfilter Ø25mm', orders: 60, reworked: 9, rate: 15 },
            { product: 'Achromat Ø30mm', orders: 40, reworked: 5, rate: 12 }
        ],
        quarter: [
            { product: 'Asphäre Ø40mm', orders: 144, reworked: 32, rate: 22 },
            { product: 'Pentaprisma 30mm', orders: 96, reworked: 19, rate: 20 },
            { product: 'Sphär. Spiegel Ø75mm', orders: 60, reworked: 11, rate: 18 },
            { product: 'Bandpassfilter Ø25mm', orders: 180, reworked: 25, rate: 14 },
            { product: 'Achromat Ø30mm', orders: 120, reworked: 14, rate: 12 }
        ]
    },

    // KPI Zusammenfassung
    kpiSummary: {
        week: {
            throughput: 4.2,
            throughputTrend: -12,
            downtime: 32,
            downtimeTrend: 8,
            defectRate: 2.8,
            defectTrend: -5,
            reworkRate: 8.5,
            reworkTrend: 0
        },
        month: {
            throughput: 4.5,
            throughputTrend: -8,
            downtime: 135,
            downtimeTrend: 5,
            defectRate: 3.1,
            defectTrend: -3,
            reworkRate: 9.2,
            reworkTrend: 2
        },
        quarter: {
            throughput: 4.3,
            throughputTrend: -10,
            downtime: 390,
            downtimeTrend: 3,
            defectRate: 2.9,
            defectTrend: -8,
            reworkRate: 8.8,
            reworkTrend: -1
        }
    },

    // Trend-Daten (letzte 12 Einheiten je nach Periode)
    trendData: {
        week: {
            labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
            throughput: [4.5, 4.3, 4.1, 4.4, 4.2, 4.0, 4.2],
            defectRate: [3.2, 2.9, 2.8, 3.0, 2.7, 2.5, 2.8],
            reworkRate: [9.0, 8.8, 8.5, 9.1, 8.3, 8.0, 8.5]
        },
        month: {
            labels: ['KW45', 'KW46', 'KW47', 'KW48'],
            throughput: [4.8, 4.6, 4.4, 4.5],
            defectRate: [3.5, 3.2, 3.0, 3.1],
            reworkRate: [10.0, 9.5, 9.0, 9.2]
        },
        quarter: {
            labels: ['Okt', 'Nov', 'Dez'],
            throughput: [4.6, 4.4, 4.3],
            defectRate: [3.3, 3.0, 2.9],
            reworkRate: [9.5, 9.0, 8.8]
        }
    },

    // ===== METHODEN =====

    getData(period) {
        return {
            kpi: this.kpiSummary[period],
            throughputByArea: this.throughputByArea[period],
            downtimeByReason: this.downtimeByReason[period],
            errorTypes: this.errorTypes[period],
            reworkByProduct: this.reworkByProduct[period],
            trend: this.trendData[period]
        };
    }
};

// =====================================================
// QM-MANAGEMENT RENDERING
// =====================================================

const QMManager = {

    currentPeriod: 'week',

    init() {
        this.setupPeriodSelector();
        this.render();
    },

    setupPeriodSelector() {
        var self = this;
        document.querySelectorAll('.qm-period').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.qm-period').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                self.currentPeriod = btn.dataset.period;
                self.render();
            });
        });
    },

    render() {
        var data = QMData.getData(this.currentPeriod);
        this.renderKPIs(data.kpi);
        this.renderThroughputChart(data.throughputByArea);
        this.renderDowntimeChart(data.downtimeByReason);
        this.renderErrorList(data.errorTypes);
        this.renderReworkList(data.reworkByProduct);
        this.renderTrendChart(data.trend);
    },

    renderKPIs(kpi) {
        // Durchlaufzeit
        document.getElementById('qm-throughput').textContent = kpi.throughput.toFixed(1);
        this.updateTrend('qm-throughput-trend', kpi.throughputTrend, true);

        // Ausfallzeiten
        document.getElementById('qm-downtime').textContent = kpi.downtime;
        this.updateTrend('qm-downtime-trend', kpi.downtimeTrend, false);

        // Fehlerrate
        document.getElementById('qm-defect-rate').textContent = kpi.defectRate.toFixed(1);
        this.updateTrend('qm-defect-trend', kpi.defectTrend, true);

        // Nacharbeit
        document.getElementById('qm-rework').textContent = kpi.reworkRate.toFixed(1);
        this.updateTrend('qm-rework-trend', kpi.reworkTrend, true);
    },

    updateTrend(elementId, value, lowerIsBetter) {
        var el = document.getElementById(elementId);
        if (!el) return;

        var isPositive = lowerIsBetter ? value < 0 : value > 0;
        var isNeutral = value === 0;

        el.className = 'qm-kpi-trend ' + (isNeutral ? 'neutral' : (isPositive ? 'positive' : 'negative'));

        var arrow = value < 0 ? '↓' : (value > 0 ? '↑' : '→');
        el.innerHTML = '<span class="trend-arrow">' + arrow + '</span>' +
            '<span class="trend-value">' + Math.abs(value) + '%</span>' +
            '<span class="trend-label">vs. Vorperiode</span>';
    },

    renderThroughputChart(data) {
        var container = document.getElementById('qm-throughput-chart');
        if (!container) return;

        var maxValue = Math.max.apply(null, Object.values(data));
        var html = '';

        Object.keys(data).forEach(function(area) {
            var value = data[area];
            var percentage = (value / maxValue) * 100;
            html += '<div class="qm-bar-item">' +
                '<div class="qm-bar-label">' + area + '</div>' +
                '<div class="qm-bar-container">' +
                '<div class="qm-bar-fill" style="width: ' + percentage + '%"></div>' +
                '</div>' +
                '<div class="qm-bar-value">' + value.toFixed(1) + ' Tage</div>' +
                '</div>';
        });

        container.innerHTML = html;
    },

    renderDowntimeChart(data) {
        var container = document.getElementById('qm-downtime-chart');
        var legend = document.getElementById('qm-downtime-legend');
        if (!container || !legend) return;

        var total = data.reduce(function(sum, item) { return sum + item.hours; }, 0);

        // Donut Chart mit CSS
        var gradientParts = [];
        var currentAngle = 0;

        data.forEach(function(item) {
            var percentage = (item.hours / total) * 100;
            var nextAngle = currentAngle + (percentage * 3.6);
            gradientParts.push(item.color + ' ' + currentAngle + 'deg ' + nextAngle + 'deg');
            currentAngle = nextAngle;
        });

        container.innerHTML = '<div class="donut" style="background: conic-gradient(' + gradientParts.join(', ') + ');">' +
            '<div class="donut-hole"><span class="donut-total">' + total + '</span><span class="donut-label">Stunden</span></div>' +
            '</div>';

        // Legende
        var legendHtml = '';
        data.forEach(function(item) {
            var percentage = ((item.hours / total) * 100).toFixed(0);
            legendHtml += '<div class="qm-legend-item">' +
                '<span class="qm-legend-color" style="background: ' + item.color + '"></span>' +
                '<span class="qm-legend-text">' + item.reason + '</span>' +
                '<span class="qm-legend-value">' + item.hours + 'h (' + percentage + '%)</span>' +
                '</div>';
        });
        legend.innerHTML = legendHtml;
    },

    renderErrorList(data) {
        var container = document.getElementById('qm-error-list');
        if (!container) return;

        var html = '';
        data.forEach(function(item, index) {
            var barClass = index === 0 ? 'critical' : (index === 1 ? 'high' : 'normal');
            html += '<div class="qm-error-item">' +
                '<div class="qm-error-rank">#' + (index + 1) + '</div>' +
                '<div class="qm-error-info">' +
                '<div class="qm-error-type">' + item.type + '</div>' +
                '<div class="qm-error-bar-container">' +
                '<div class="qm-error-bar ' + barClass + '" style="width: ' + item.percentage + '%"></div>' +
                '</div>' +
                '</div>' +
                '<div class="qm-error-stats">' +
                '<div class="qm-error-count">' + item.count + '</div>' +
                '<div class="qm-error-percent">' + item.percentage + '%</div>' +
                '</div>' +
                '</div>';
        });

        container.innerHTML = html;
    },

    renderReworkList(data) {
        var container = document.getElementById('qm-rework-list');
        if (!container) return;

        var html = '';
        data.forEach(function(item) {
            var rateClass = item.rate >= 20 ? 'critical' : (item.rate >= 15 ? 'high' : 'normal');
            html += '<div class="qm-rework-item">' +
                '<div class="qm-rework-product">' + item.product + '</div>' +
                '<div class="qm-rework-stats">' +
                '<span class="qm-rework-orders">' + item.orders + ' Aufträge</span>' +
                '<span class="qm-rework-count">' + item.reworked + ' Nacharbeit</span>' +
                '<span class="qm-rework-rate ' + rateClass + '">' + item.rate + '%</span>' +
                '</div>' +
                '<div class="qm-rework-bar-container">' +
                '<div class="qm-rework-bar ' + rateClass + '" style="width: ' + item.rate + '%"></div>' +
                '</div>' +
                '</div>';
        });

        container.innerHTML = html;
    },

    renderTrendChart(data) {
        var container = document.getElementById('qm-trend-chart');
        if (!container) return;

        var html = '<div class="trend-chart-inner">';

        // X-Achsen Labels
        html += '<div class="trend-x-axis">';
        data.labels.forEach(function(label) {
            html += '<span class="trend-x-label">' + label + '</span>';
        });
        html += '</div>';

        // Chart Lines (vereinfacht als Balken-Trend)
        html += '<div class="trend-lines">';

        // Durchlaufzeit Linie
        var maxThroughput = Math.max.apply(null, data.throughput);
        html += '<div class="trend-line throughput">';
        data.throughput.forEach(function(val) {
            var height = (val / maxThroughput) * 100;
            html += '<div class="trend-point" style="height: ' + height + '%" title="' + val.toFixed(1) + ' Tage"></div>';
        });
        html += '</div>';

        // Fehlerrate Linie
        var maxDefect = Math.max.apply(null, data.defectRate);
        html += '<div class="trend-line defect">';
        data.defectRate.forEach(function(val) {
            var height = (val / maxDefect) * 100;
            html += '<div class="trend-point" style="height: ' + height + '%" title="' + val.toFixed(1) + '%"></div>';
        });
        html += '</div>';

        // Nacharbeit Linie
        var maxRework = Math.max.apply(null, data.reworkRate);
        html += '<div class="trend-line rework">';
        data.reworkRate.forEach(function(val) {
            var height = (val / maxRework) * 100;
            html += '<div class="trend-point" style="height: ' + height + '%" title="' + val.toFixed(1) + '%"></div>';
        });
        html += '</div>';

        html += '</div></div>';
        container.innerHTML = html;
    }
};

// Initialisierung wenn QM-View aktiv wird
document.addEventListener('DOMContentLoaded', function() {
    // QM init when view becomes visible
    document.querySelectorAll('[data-view="qm"]').forEach(function(el) {
        el.addEventListener('click', function() {
            setTimeout(function() {
                QMManager.init();
            }, 100);
        });
    });
});
