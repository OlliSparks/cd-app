// =====================================================
// CD-APP - PRODUKTIONSDATEN (Demo/PoC)
// Präzisionsoptik-Fertigung
// =====================================================

const ProductionData = {

    // Arbeitsbereiche mit zugehörigen Arbeitsplätzen
    areas: [
        { id: 'sawing', name: 'Sägen & Trennen', icon: '⚙️', color: '#e74c3c' },
        { id: 'grinding', name: 'Schleifen', icon: '🔧', color: '#3498db' },
        { id: 'cnc', name: 'CNC-Bearbeitung', icon: '🏭', color: '#9b59b6' },
        { id: 'polishing', name: 'Polieren', icon: '✨', color: '#2ecc71' },
        { id: 'centering', name: 'Zentrieren', icon: '🎯', color: '#f39c12' },
        { id: 'coating', name: 'Beschichtung', icon: '🔬', color: '#1abc9c' },
        { id: 'cementing', name: 'Verkittung', icon: '🔗', color: '#e67e22' },
        { id: 'qc', name: 'Qualitätsprüfung', icon: '✓', color: '#34495e' }
    ],

    // 40 Arbeitsplätze
    workstations: [
        // Sägen (3)
        { id: 'SAW-01', name: 'Säge 1', area: 'sawing', type: 'Diamantsäge' },
        { id: 'SAW-02', name: 'Säge 2', area: 'sawing', type: 'Diamantsäge' },
        { id: 'SAW-03', name: 'Säge 3', area: 'sawing', type: 'Drahtsäge' },

        // Schleifen (8)
        { id: 'RND-01', name: 'Rundschleifer 1', area: 'grinding', type: 'CNC-Rundschleifer' },
        { id: 'RND-02', name: 'Rundschleifer 2', area: 'grinding', type: 'CNC-Rundschleifer' },
        { id: 'RND-03', name: 'Rundschleifer 3', area: 'grinding', type: 'Manuell' },
        { id: 'RND-04', name: 'Rundschleifer 4', area: 'grinding', type: 'CNC-Rundschleifer' },
        { id: 'PLN-01', name: 'Planschleifer 1', area: 'grinding', type: 'Doppelseiten' },
        { id: 'PLN-02', name: 'Planschleifer 2', area: 'grinding', type: 'Doppelseiten' },
        { id: 'PLN-03', name: 'Planschleifer 3', area: 'grinding', type: 'Einseiten' },
        { id: 'PLN-04', name: 'Planschleifer 4', area: 'grinding', type: 'Einseiten' },

        // CNC (6)
        { id: 'CNC-01', name: 'CNC 1', area: 'cnc', type: 'Satisloh' },
        { id: 'CNC-02', name: 'CNC 2', area: 'cnc', type: 'Satisloh' },
        { id: 'CNC-03', name: 'CNC 3', area: 'cnc', type: 'Optotech' },
        { id: 'CNC-04', name: 'CNC 4', area: 'cnc', type: 'Optotech' },
        { id: 'CNC-05', name: 'CNC 5', area: 'cnc', type: 'Schneider' },
        { id: 'CNC-06', name: 'CNC 6', area: 'cnc', type: 'Schneider' },

        // Polieren (8)
        { id: 'POL-01', name: 'Poliermaschine 1', area: 'polishing', type: 'SpinPol' },
        { id: 'POL-02', name: 'Poliermaschine 2', area: 'polishing', type: 'SpinPol' },
        { id: 'POL-03', name: 'Poliermaschine 3', area: 'polishing', type: 'SpinPol' },
        { id: 'POL-04', name: 'Poliermaschine 4', area: 'polishing', type: 'CCP' },
        { id: 'POL-05', name: 'Poliermaschine 5', area: 'polishing', type: 'CCP' },
        { id: 'POL-06', name: 'Poliermaschine 6', area: 'polishing', type: 'MRF' },
        { id: 'POL-07', name: 'Poliermaschine 7', area: 'polishing', type: 'MRF' },
        { id: 'POL-08', name: 'Poliermaschine 8', area: 'polishing', type: 'Handpolitur' },

        // Zentrieren (4)
        { id: 'ZEN-01', name: 'Zentriermaschine 1', area: 'centering', type: 'Automatik' },
        { id: 'ZEN-02', name: 'Zentriermaschine 2', area: 'centering', type: 'Automatik' },
        { id: 'ZEN-03', name: 'Zentriermaschine 3', area: 'centering', type: 'Manuell' },
        { id: 'ZEN-04', name: 'Zentriermaschine 4', area: 'centering', type: 'Manuell' },

        // Beschichtung (5)
        { id: 'COA-01', name: 'Bedampfung 1', area: 'coating', type: 'E-Beam' },
        { id: 'COA-02', name: 'Bedampfung 2', area: 'coating', type: 'E-Beam' },
        { id: 'COA-03', name: 'Bedampfung 3', area: 'coating', type: 'Thermisch' },
        { id: 'SPU-01', name: 'Sputtern 1', area: 'coating', type: 'Magnetron' },
        { id: 'SPU-02', name: 'Sputtern 2', area: 'coating', type: 'IBS' },

        // Verkittung (3)
        { id: 'KIT-01', name: 'Kittplatz 1', area: 'cementing', type: 'UV-Kleber' },
        { id: 'KIT-02', name: 'Kittplatz 2', area: 'cementing', type: 'Optikkitt' },
        { id: 'KIT-03', name: 'Kittplatz 3', area: 'cementing', type: 'UV-Kleber' },

        // Qualitätsprüfung (3)
        { id: 'QC-01', name: 'Messplatz 1', area: 'qc', type: 'Interferometer' },
        { id: 'QC-02', name: 'Messplatz 2', area: 'qc', type: 'Spektrometer' },
        { id: 'QC-03', name: 'Messplatz 3', area: 'qc', type: 'Koordinatenmessgerät' }
    ],

    // Kunden
    customers: [
        { id: 'ZEISS', name: 'Carl Zeiss AG' },
        { id: 'TRUMPF', name: 'TRUMPF GmbH' },
        { id: 'BOSCH', name: 'Robert Bosch GmbH' },
        { id: 'LEICA', name: 'Leica Microsystems' },
        { id: 'JENOPT', name: 'Jenoptik AG' },
        { id: 'SICK', name: 'SICK AG' },
        { id: 'IFM', name: 'ifm electronic' },
        { id: 'BASLER', name: 'Basler AG' }
    ],

    // Produkte
    products: [
        { id: 'LENS-PCX-25', name: 'Plankonvexlinse Ø25mm', material: 'N-BK7', difficulty: 'standard' },
        { id: 'LENS-PCX-50', name: 'Plankonvexlinse Ø50mm', material: 'N-BK7', difficulty: 'standard' },
        { id: 'LENS-DCX-30', name: 'Bikonvexlinse Ø30mm', material: 'N-SF11', difficulty: 'mittel' },
        { id: 'LENS-ASP-40', name: 'Asphäre Ø40mm', material: 'N-BK7', difficulty: 'hoch' },
        { id: 'PRISM-RA-25', name: 'Rechtwinkel-Prisma 25mm', material: 'N-BK7', difficulty: 'standard' },
        { id: 'PRISM-PENTA', name: 'Pentaprisma 30mm', material: 'N-BK7', difficulty: 'hoch' },
        { id: 'MIRROR-FL-50', name: 'Planspiegel Ø50mm', material: 'Fused Silica', difficulty: 'mittel' },
        { id: 'MIRROR-SPH-75', name: 'Sphärischer Spiegel Ø75mm', material: 'Zerodur', difficulty: 'hoch' },
        { id: 'WINDOW-AR-40', name: 'AR-Fenster Ø40mm', material: 'N-BK7', difficulty: 'standard' },
        { id: 'FILTER-BP-25', name: 'Bandpassfilter Ø25mm', material: 'Fused Silica', difficulty: 'hoch' },
        { id: 'DOUBLET-AC-30', name: 'Achromat Ø30mm', material: 'N-BK7/N-SF5', difficulty: 'hoch' },
        { id: 'WEDGE-15', name: 'Keilplatte 15°', material: 'N-BK7', difficulty: 'mittel' }
    ],

    // Status-Definitionen
    status: {
        running: { id: 'running', label: 'In Bearbeitung', color: '#27ae60', icon: '▶' },
        setup: { id: 'setup', label: 'Rüsten', color: '#f39c12', icon: '⚙' },
        idle: { id: 'idle', label: 'Frei', color: '#95a5a6', icon: '○' },
        fault: { id: 'fault', label: 'Störung', color: '#e74c3c', icon: '✕' },
        maintenance: { id: 'maintenance', label: 'Wartung', color: '#9b59b6', icon: '🔧' }
    },

    // Prioritäten
    priorities: {
        critical: { id: 'critical', label: 'Kritisch', color: '#e74c3c', icon: '🔴' },
        high: { id: 'high', label: 'Hoch', color: '#e67e22', icon: '🟠' },
        normal: { id: 'normal', label: 'Normal', color: '#3498db', icon: '🔵' },
        low: { id: 'low', label: 'Niedrig', color: '#95a5a6', icon: '⚪' }
    },

    // Demo-Aufträge generieren
    generateOrders() {
        const orders = [];
        const now = new Date();

        const orderData = [
            { id: 'AU-2024-0847', customer: 'ZEISS', product: 'LENS-ASP-40', qty: 50, priority: 'critical', daysUntilDue: 2 },
            { id: 'AU-2024-0812', customer: 'TRUMPF', product: 'PRISM-PENTA', qty: 25, priority: 'high', daysUntilDue: 5 },
            { id: 'AU-2024-0850', customer: 'BOSCH', product: 'LENS-PCX-50', qty: 200, priority: 'normal', daysUntilDue: 10 },
            { id: 'AU-2024-0833', customer: 'LEICA', product: 'DOUBLET-AC-30', qty: 30, priority: 'high', daysUntilDue: 4 },
            { id: 'AU-2024-0861', customer: 'JENOPT', product: 'MIRROR-SPH-75', qty: 15, priority: 'critical', daysUntilDue: 3 },
            { id: 'AU-2024-0829', customer: 'SICK', product: 'WINDOW-AR-40', qty: 500, priority: 'normal', daysUntilDue: 14 },
            { id: 'AU-2024-0844', customer: 'IFM', product: 'LENS-PCX-25', qty: 1000, priority: 'low', daysUntilDue: 21 },
            { id: 'AU-2024-0855', customer: 'BASLER', product: 'FILTER-BP-25', qty: 100, priority: 'high', daysUntilDue: 7 },
            { id: 'AU-2024-0839', customer: 'ZEISS', product: 'PRISM-RA-25', qty: 80, priority: 'normal', daysUntilDue: 12 },
            { id: 'AU-2024-0867', customer: 'TRUMPF', product: 'MIRROR-FL-50', qty: 60, priority: 'normal', daysUntilDue: 9 },
            { id: 'AU-2024-0871', customer: 'BOSCH', product: 'LENS-DCX-30', qty: 150, priority: 'high', daysUntilDue: 6 },
            { id: 'AU-2024-0858', customer: 'LEICA', product: 'WEDGE-15', qty: 40, priority: 'normal', daysUntilDue: 11 },
            { id: 'AU-2024-0875', customer: 'JENOPT', product: 'LENS-ASP-40', qty: 20, priority: 'critical', daysUntilDue: 1 },
            { id: 'AU-2024-0863', customer: 'SICK', product: 'LENS-PCX-25', qty: 300, priority: 'normal', daysUntilDue: 15 },
            { id: 'AU-2024-0879', customer: 'IFM', product: 'WINDOW-AR-40', qty: 200, priority: 'low', daysUntilDue: 18 }
        ];

        orderData.forEach(o => {
            const customer = this.customers.find(c => c.id === o.customer);
            const product = this.products.find(p => p.id === o.product);
            const dueDate = new Date(now.getTime() + o.daysUntilDue * 24 * 60 * 60 * 1000);

            orders.push({
                id: o.id,
                customer: customer,
                product: product,
                quantity: o.qty,
                priority: this.priorities[o.priority],
                dueDate: dueDate,
                createdAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)
            });
        });

        return orders;
    },

    // Aktuellen Produktionsstatus generieren
    generateProductionState() {
        const orders = this.generateOrders();
        const state = {};
        const now = new Date();
        const activeOrders = [...orders];

        this.workstations.forEach((ws, index) => {
            const rand = Math.random();

            if (rand < 0.6 && activeOrders.length > 0) {
                const orderIndex = Math.floor(Math.random() * Math.min(3, activeOrders.length));
                const order = activeOrders[orderIndex];
                const totalMinutes = 30 + Math.floor(Math.random() * 180);
                const elapsedMinutes = Math.floor(Math.random() * totalMinutes);
                const progress = Math.round((elapsedMinutes / totalMinutes) * 100);

                state[ws.id] = {
                    workstation: ws,
                    status: this.status.running,
                    currentOrder: order,
                    progress: progress,
                    totalMinutes: totalMinutes,
                    remainingMinutes: totalMinutes - elapsedMinutes,
                    startTime: new Date(now.getTime() - elapsedMinutes * 60 * 1000),
                    queue: this.generateQueue(activeOrders, order)
                };
            } else if (rand < 0.75) {
                const order = activeOrders[Math.floor(Math.random() * activeOrders.length)] || orders[0];
                state[ws.id] = {
                    workstation: ws,
                    status: this.status.setup,
                    currentOrder: order,
                    progress: 0,
                    remainingMinutes: 5 + Math.floor(Math.random() * 20),
                    queue: this.generateQueue(activeOrders, order)
                };
            } else if (rand < 0.9) {
                state[ws.id] = {
                    workstation: ws,
                    status: this.status.idle,
                    currentOrder: null,
                    progress: 0,
                    queue: this.generateQueue(activeOrders, null)
                };
            } else if (rand < 0.95) {
                state[ws.id] = {
                    workstation: ws,
                    status: this.status.fault,
                    currentOrder: null,
                    progress: 0,
                    faultMessage: this.getRandomFault(),
                    faultSince: new Date(now.getTime() - Math.random() * 60 * 60 * 1000),
                    queue: []
                };
            } else {
                state[ws.id] = {
                    workstation: ws,
                    status: this.status.maintenance,
                    currentOrder: null,
                    progress: 0,
                    maintenanceEnd: new Date(now.getTime() + Math.random() * 4 * 60 * 60 * 1000),
                    queue: []
                };
            }
        });

        return { state, orders, timestamp: now };
    },

    generateQueue(orders, excludeOrder) {
        const queue = [];
        const available = orders.filter(o => !excludeOrder || o.id !== excludeOrder.id);
        const count = Math.floor(Math.random() * 4);

        for (let i = 0; i < count && i < available.length; i++) {
            const order = available[Math.floor(Math.random() * available.length)];
            if (!queue.find(q => q.order.id === order.id)) {
                queue.push({
                    order: order,
                    estimatedStart: new Date(Date.now() + (i + 1) * (20 + Math.random() * 60) * 60 * 1000),
                    estimatedDuration: 30 + Math.floor(Math.random() * 120)
                });
            }
        }

        return queue.sort((a, b) => a.estimatedStart - b.estimatedStart);
    },

    getRandomFault() {
        const faults = [
            'Spindeltemperatur zu hoch',
            'Kühlmitteldruck niedrig',
            'Werkzeugbruch erkannt',
            'Positionierungsfehler',
            'Notaus ausgelöst',
            'Kommunikationsfehler SPS',
            'Vakuum nicht erreicht',
            'Schleifscheibe verschlissen'
        ];
        return faults[Math.floor(Math.random() * faults.length)];
    },

    generateAlerts(productionState) {
        const alerts = [];
        const now = new Date();

        productionState.orders.forEach(order => {
            const daysUntilDue = (order.dueDate - now) / (24 * 60 * 60 * 1000);
            if (daysUntilDue < 0) {
                alerts.push({
                    type: 'overdue',
                    severity: 'critical',
                    title: 'Liefertermin überschritten',
                    message: order.id + ' - ' + order.customer.name,
                    order: order,
                    timestamp: now
                });
            } else if (daysUntilDue < 2 && order.priority.id !== 'low') {
                alerts.push({
                    type: 'deadline',
                    severity: 'warning',
                    title: 'Liefertermin naht',
                    message: order.id + ' fällig in ' + Math.ceil(daysUntilDue) + ' Tag(en)',
                    order: order,
                    timestamp: now
                });
            }
        });

        Object.values(productionState.state).forEach(ws => {
            if (ws.status.id === 'fault') {
                const downtime = (now - ws.faultSince) / (60 * 1000);
                alerts.push({
                    type: 'fault',
                    severity: 'critical',
                    title: 'Störung: ' + ws.workstation.name,
                    message: ws.faultMessage,
                    workstation: ws.workstation,
                    downtime: Math.round(downtime),
                    timestamp: ws.faultSince
                });
            }
        });

        const areaLoad = {};
        Object.values(productionState.state).forEach(ws => {
            const area = ws.workstation.area;
            if (!areaLoad[area]) areaLoad[area] = { running: 0, queue: 0, total: 0 };
            areaLoad[area].total++;
            if (ws.status.id === 'running') areaLoad[area].running++;
            areaLoad[area].queue += ws.queue ? ws.queue.length : 0;
        });

        Object.entries(areaLoad).forEach(([areaId, load]) => {
            const utilization = load.running / load.total;
            if (utilization > 0.8 && load.queue > load.total) {
                const area = this.areas.find(a => a.id === areaId);
                alerts.push({
                    type: 'bottleneck',
                    severity: 'warning',
                    title: 'Engpass: ' + area.name,
                    message: Math.round(utilization * 100) + '% Auslastung, ' + load.queue + ' Aufträge warten',
                    area: area,
                    timestamp: now
                });
            }
        });

        return alerts.sort((a, b) => {
            const severityOrder = { critical: 0, warning: 1, info: 2 };
            return severityOrder[a.severity] - severityOrder[b.severity];
        });
    }
};
