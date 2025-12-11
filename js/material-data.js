// =====================================================
// CD-APP - MATERIAL-DATEN (Demo/PoC)
// Frühwarnsystem für Materialverfügbarkeit
// =====================================================

const MaterialData = {

    // ===== ROHSTOFFE & KOMPONENTEN =====
    materials: [
        // Optische Gläser
        { id: 'MAT-BK7-R50', name: 'N-BK7 Rohling Ø50mm', category: 'glass', unit: 'Stk', minStock: 100, leadTime: 14 },
        { id: 'MAT-BK7-R25', name: 'N-BK7 Rohling Ø25mm', category: 'glass', unit: 'Stk', minStock: 200, leadTime: 14 },
        { id: 'MAT-BK7-R75', name: 'N-BK7 Rohling Ø75mm', category: 'glass', unit: 'Stk', minStock: 50, leadTime: 21 },
        { id: 'MAT-SF11-R30', name: 'N-SF11 Rohling Ø30mm', category: 'glass', unit: 'Stk', minStock: 80, leadTime: 21 },
        { id: 'MAT-SF5-R30', name: 'N-SF5 Rohling Ø30mm', category: 'glass', unit: 'Stk', minStock: 60, leadTime: 21 },
        { id: 'MAT-FS-R40', name: 'Fused Silica Rohling Ø40mm', category: 'glass', unit: 'Stk', minStock: 40, leadTime: 28 },
        { id: 'MAT-FS-R25', name: 'Fused Silica Rohling Ø25mm', category: 'glass', unit: 'Stk', minStock: 60, leadTime: 28 },
        { id: 'MAT-ZER-R75', name: 'Zerodur Rohling Ø75mm', category: 'glass', unit: 'Stk', minStock: 20, leadTime: 42 },

        // Beschichtungsmaterialien
        { id: 'MAT-MGF2', name: 'Magnesiumfluorid (MgF2)', category: 'coating', unit: 'g', minStock: 500, leadTime: 14 },
        { id: 'MAT-SIO2', name: 'Siliziumdioxid (SiO2)', category: 'coating', unit: 'g', minStock: 1000, leadTime: 7 },
        { id: 'MAT-TIO2', name: 'Titandioxid (TiO2)', category: 'coating', unit: 'g', minStock: 300, leadTime: 14 },
        { id: 'MAT-AL2O3', name: 'Aluminiumoxid (Al2O3)', category: 'coating', unit: 'g', minStock: 400, leadTime: 14 },
        { id: 'MAT-TA2O5', name: 'Tantaloxid (Ta2O5)', category: 'coating', unit: 'g', minStock: 200, leadTime: 21 },
        { id: 'MAT-AG', name: 'Silber Target', category: 'coating', unit: 'Stk', minStock: 5, leadTime: 14 },
        { id: 'MAT-AL', name: 'Aluminium Target', category: 'coating', unit: 'Stk', minStock: 10, leadTime: 7 },

        // Verbrauchsmaterialien
        { id: 'MAT-POLIT-CER', name: 'Poliermittel Ceroxid', category: 'consumable', unit: 'kg', minStock: 20, leadTime: 7 },
        { id: 'MAT-POLIT-DIA', name: 'Diamantsuspension 3µm', category: 'consumable', unit: 'l', minStock: 10, leadTime: 14 },
        { id: 'MAT-SCHLEIF-D64', name: 'Diamantschleifscheibe D64', category: 'consumable', unit: 'Stk', minStock: 15, leadTime: 21 },
        { id: 'MAT-SCHLEIF-D46', name: 'Diamantschleifscheibe D46', category: 'consumable', unit: 'Stk', minStock: 15, leadTime: 21 },
        { id: 'MAT-KITT-UV', name: 'UV-Kleber NOA61', category: 'consumable', unit: 'ml', minStock: 500, leadTime: 14 },
        { id: 'MAT-KITT-OPT', name: 'Optischer Kitt', category: 'consumable', unit: 'g', minStock: 200, leadTime: 21 },

        // Verpackung
        { id: 'MAT-BOX-S', name: 'Optikbox klein', category: 'packaging', unit: 'Stk', minStock: 500, leadTime: 7 },
        { id: 'MAT-BOX-M', name: 'Optikbox mittel', category: 'packaging', unit: 'Stk', minStock: 300, leadTime: 7 },
        { id: 'MAT-BOX-L', name: 'Optikbox groß', category: 'packaging', unit: 'Stk', minStock: 200, leadTime: 7 },
        { id: 'MAT-FOAM', name: 'Schaumstoffeinlage', category: 'packaging', unit: 'Stk', minStock: 1000, leadTime: 5 }
    ],

    // ===== STÜCKLISTEN (BOM) =====
    // Verknüpfung Produkt -> benötigte Materialien
    billOfMaterials: {
        'LENS-PCX-25': [
            { materialId: 'MAT-BK7-R25', quantity: 1.1 },  // 10% Ausschuss einkalkuliert
            { materialId: 'MAT-POLIT-CER', quantity: 0.02 },
            { materialId: 'MAT-MGF2', quantity: 0.5 },
            { materialId: 'MAT-BOX-S', quantity: 1 }
        ],
        'LENS-PCX-50': [
            { materialId: 'MAT-BK7-R50', quantity: 1.1 },
            { materialId: 'MAT-POLIT-CER', quantity: 0.05 },
            { materialId: 'MAT-MGF2', quantity: 1.0 },
            { materialId: 'MAT-BOX-M', quantity: 1 }
        ],
        'LENS-DCX-30': [
            { materialId: 'MAT-SF11-R30', quantity: 1.15 },
            { materialId: 'MAT-POLIT-CER', quantity: 0.03 },
            { materialId: 'MAT-POLIT-DIA', quantity: 0.01 },
            { materialId: 'MAT-MGF2', quantity: 0.8 },
            { materialId: 'MAT-BOX-S', quantity: 1 }
        ],
        'LENS-ASP-40': [
            { materialId: 'MAT-BK7-R50', quantity: 1.2 },  // Höherer Ausschuss bei Asphären
            { materialId: 'MAT-POLIT-DIA', quantity: 0.05 },
            { materialId: 'MAT-MGF2', quantity: 1.2 },
            { materialId: 'MAT-SIO2', quantity: 0.8 },
            { materialId: 'MAT-BOX-M', quantity: 1 }
        ],
        'PRISM-RA-25': [
            { materialId: 'MAT-BK7-R50', quantity: 1.3 },  // Größerer Rohling für Prisma
            { materialId: 'MAT-POLIT-CER', quantity: 0.04 },
            { materialId: 'MAT-AL', quantity: 0.1 },
            { materialId: 'MAT-BOX-S', quantity: 1 }
        ],
        'PRISM-PENTA': [
            { materialId: 'MAT-BK7-R75', quantity: 1.4 },
            { materialId: 'MAT-POLIT-CER', quantity: 0.08 },
            { materialId: 'MAT-POLIT-DIA', quantity: 0.02 },
            { materialId: 'MAT-AL', quantity: 0.2 },
            { materialId: 'MAT-BOX-M', quantity: 1 }
        ],
        'MIRROR-FL-50': [
            { materialId: 'MAT-FS-R40', quantity: 1.1 },
            { materialId: 'MAT-POLIT-DIA', quantity: 0.03 },
            { materialId: 'MAT-AG', quantity: 0.05 },
            { materialId: 'MAT-SIO2', quantity: 0.5 },
            { materialId: 'MAT-BOX-M', quantity: 1 }
        ],
        'MIRROR-SPH-75': [
            { materialId: 'MAT-ZER-R75', quantity: 1.15 },
            { materialId: 'MAT-POLIT-DIA', quantity: 0.08 },
            { materialId: 'MAT-AG', quantity: 0.1 },
            { materialId: 'MAT-SIO2', quantity: 1.0 },
            { materialId: 'MAT-BOX-L', quantity: 1 }
        ],
        'WINDOW-AR-40': [
            { materialId: 'MAT-BK7-R50', quantity: 1.05 },
            { materialId: 'MAT-POLIT-CER', quantity: 0.02 },
            { materialId: 'MAT-MGF2', quantity: 0.6 },
            { materialId: 'MAT-SIO2', quantity: 0.4 },
            { materialId: 'MAT-BOX-S', quantity: 1 }
        ],
        'FILTER-BP-25': [
            { materialId: 'MAT-FS-R25', quantity: 1.1 },
            { materialId: 'MAT-POLIT-DIA', quantity: 0.02 },
            { materialId: 'MAT-TIO2', quantity: 2.0 },
            { materialId: 'MAT-SIO2', quantity: 2.0 },
            { materialId: 'MAT-TA2O5', quantity: 1.0 },
            { materialId: 'MAT-BOX-S', quantity: 1 }
        ],
        'DOUBLET-AC-30': [
            { materialId: 'MAT-BK7-R50', quantity: 1.1 },
            { materialId: 'MAT-SF5-R30', quantity: 1.1 },
            { materialId: 'MAT-POLIT-CER', quantity: 0.04 },
            { materialId: 'MAT-KITT-UV', quantity: 2.0 },
            { materialId: 'MAT-MGF2', quantity: 0.8 },
            { materialId: 'MAT-BOX-M', quantity: 1 }
        ],
        'WEDGE-15': [
            { materialId: 'MAT-BK7-R50', quantity: 1.2 },
            { materialId: 'MAT-POLIT-CER', quantity: 0.03 },
            { materialId: 'MAT-MGF2', quantity: 0.6 },
            { materialId: 'MAT-BOX-S', quantity: 1 }
        ]
    },

    // ===== LIEFERANTEN =====
    suppliers: [
        { id: 'SUP-SCHOTT', name: 'SCHOTT AG', category: 'glass', reliability: 0.95 },
        { id: 'SUP-OHARA', name: 'Ohara GmbH', category: 'glass', reliability: 0.92 },
        { id: 'SUP-HERAEUS', name: 'Heraeus', category: 'glass', reliability: 0.90 },
        { id: 'SUP-UMICORE', name: 'Umicore', category: 'coating', reliability: 0.88 },
        { id: 'SUP-MERCK', name: 'Merck KGaA', category: 'coating', reliability: 0.93 },
        { id: 'SUP-3M', name: '3M Deutschland', category: 'consumable', reliability: 0.97 },
        { id: 'SUP-TYROLIT', name: 'Tyrolit', category: 'consumable', reliability: 0.91 }
    ],

    // Materialien den Kategorien zuordnen
    categories: [
        { id: 'glass', name: 'Optische Gläser', icon: '🔮', color: '#3498db' },
        { id: 'coating', name: 'Beschichtungsmaterial', icon: '✨', color: '#9b59b6' },
        { id: 'consumable', name: 'Verbrauchsmaterial', icon: '⚙️', color: '#e67e22' },
        { id: 'packaging', name: 'Verpackung', icon: '📦', color: '#27ae60' }
    ],

    // ===== LAGERBESTAND GENERIEREN =====
    generateInventory() {
        var inventory = {};
        var self = this;

        this.materials.forEach(function(mat) {
            // Zufälliger Lagerbestand (50% - 150% des Mindestbestands)
            var stockFactor = 0.5 + Math.random() * 1.0;
            var stock = Math.round(mat.minStock * stockFactor);

            // Reservierte Menge (0-30% des Bestands)
            var reserved = Math.round(stock * Math.random() * 0.3);

            inventory[mat.id] = {
                material: mat,
                stockQuantity: stock,
                reservedQuantity: reserved,
                availableQuantity: stock - reserved,
                lastUpdated: new Date(),
                location: self.getRandomLocation()
            };
        });

        return inventory;
    },

    getRandomLocation() {
        var locations = ['Lager A1', 'Lager A2', 'Lager B1', 'Lager B2', 'Lager C1', 'Hochregal H1', 'Hochregal H2'];
        return locations[Math.floor(Math.random() * locations.length)];
    },

    // ===== SAP-BESTELLUNGEN GENERIEREN =====
    generatePurchaseOrders() {
        var orders = [];
        var now = new Date();
        var self = this;

        // Für kritische Materialien Bestellungen erzeugen
        var criticalMaterials = ['MAT-BK7-R50', 'MAT-BK7-R25', 'MAT-SF11-R30', 'MAT-FS-R40', 'MAT-ZER-R75',
                                  'MAT-MGF2', 'MAT-TIO2', 'MAT-POLIT-DIA', 'MAT-SCHLEIF-D64'];

        criticalMaterials.forEach(function(matId, index) {
            var mat = self.materials.find(function(m) { return m.id === matId; });
            if (!mat) return;

            // 1-3 Bestellungen pro Material
            var orderCount = 1 + Math.floor(Math.random() * 3);

            for (var i = 0; i < orderCount; i++) {
                var supplier = self.suppliers.find(function(s) { return s.category === mat.category; }) || self.suppliers[0];
                var orderQty = Math.round(mat.minStock * (0.5 + Math.random() * 1.0));

                // Liefertermin: -5 bis +30 Tage
                var deliveryOffset = -5 + Math.floor(Math.random() * 35);
                var deliveryDate = new Date(now.getTime() + deliveryOffset * 24 * 60 * 60 * 1000);

                // Status basierend auf Liefertermin
                var status = 'confirmed';
                var risk = 'low';

                if (deliveryOffset < 0) {
                    // Überfällig
                    status = Math.random() > 0.5 ? 'delayed' : 'partial';
                    risk = 'critical';
                } else if (deliveryOffset < 7) {
                    // Bald fällig
                    status = Math.random() > 0.7 ? 'delayed' : 'confirmed';
                    risk = status === 'delayed' ? 'high' : 'medium';
                } else if (Math.random() > 0.85) {
                    // Zufällige Verzögerung
                    status = 'delayed';
                    deliveryDate = new Date(deliveryDate.getTime() + (7 + Math.random() * 14) * 24 * 60 * 60 * 1000);
                    risk = 'high';
                }

                var poNumber = 'PO-' + (450000 + index * 10 + i);

                orders.push({
                    id: poNumber,
                    materialId: matId,
                    material: mat,
                    supplier: supplier,
                    quantity: orderQty,
                    deliveredQuantity: status === 'partial' ? Math.round(orderQty * 0.4) : 0,
                    unit: mat.unit,
                    orderDate: new Date(now.getTime() - (mat.leadTime + 5) * 24 * 60 * 60 * 1000),
                    expectedDelivery: deliveryDate,
                    originalDelivery: status === 'delayed' ? new Date(deliveryDate.getTime() - 10 * 24 * 60 * 60 * 1000) : deliveryDate,
                    status: status,
                    risk: risk
                });
            }
        });

        return orders.sort(function(a, b) { return a.expectedDelivery - b.expectedDelivery; });
    },

    // ===== PRODUKTIONSPLAN (nächste 2 Wochen) =====
    generateProductionPlan(orders) {
        var plan = [];
        var now = new Date();

        // Aus den Produktionsaufträgen den Materialbedarf ableiten
        orders.forEach(function(order) {
            var daysUntilDue = (order.dueDate - now) / (24 * 60 * 60 * 1000);

            // Nur Aufträge der nächsten 14 Tage
            if (daysUntilDue <= 14 && daysUntilDue >= -2) {
                // Produktionsstart ca. 3-5 Tage vor Liefertermin
                var productionStart = new Date(order.dueDate.getTime() - (3 + Math.random() * 2) * 24 * 60 * 60 * 1000);

                plan.push({
                    orderId: order.id,
                    productId: order.product.id,
                    product: order.product,
                    quantity: order.quantity,
                    customer: order.customer,
                    productionStart: productionStart,
                    dueDate: order.dueDate,
                    priority: order.priority
                });
            }
        });

        return plan.sort(function(a, b) { return a.productionStart - b.productionStart; });
    },

    // ===== BEDARFSERMITTLUNG =====
    calculateMaterialRequirements(productionPlan) {
        var requirements = {};
        var self = this;

        productionPlan.forEach(function(planItem) {
            var bom = self.billOfMaterials[planItem.productId];
            if (!bom) return;

            bom.forEach(function(bomItem) {
                var matId = bomItem.materialId;
                var needed = bomItem.quantity * planItem.quantity;

                if (!requirements[matId]) {
                    var mat = self.materials.find(function(m) { return m.id === matId; });
                    requirements[matId] = {
                        material: mat,
                        totalRequired: 0,
                        byOrder: [],
                        byWeek: { week1: 0, week2: 0 }
                    };
                }

                requirements[matId].totalRequired += needed;
                requirements[matId].byOrder.push({
                    orderId: planItem.orderId,
                    productId: planItem.productId,
                    quantity: needed,
                    neededBy: planItem.productionStart,
                    priority: planItem.priority
                });

                // Nach Woche aufteilen
                var now = new Date();
                var daysUntil = (planItem.productionStart - now) / (24 * 60 * 60 * 1000);
                if (daysUntil <= 7) {
                    requirements[matId].byWeek.week1 += needed;
                } else {
                    requirements[matId].byWeek.week2 += needed;
                }
            });
        });

        return requirements;
    },

    // ===== VERFÜGBARKEITSPRÜFUNG =====
    checkAvailability(requirements, inventory, purchaseOrders) {
        var results = [];
        var now = new Date();

        Object.keys(requirements).forEach(function(matId) {
            var req = requirements[matId];
            var inv = inventory[matId];
            var mat = req.material;

            // Relevante Bestellungen finden
            var relevantPOs = purchaseOrders.filter(function(po) {
                return po.materialId === matId;
            });

            // Erwartete Eingänge in Woche 1 und 2
            var incomingWeek1 = 0;
            var incomingWeek2 = 0;
            var delayedOrders = [];

            relevantPOs.forEach(function(po) {
                var daysUntil = (po.expectedDelivery - now) / (24 * 60 * 60 * 1000);
                var qty = po.quantity - po.deliveredQuantity;

                if (po.status === 'delayed') {
                    delayedOrders.push(po);
                }

                if (daysUntil <= 7 && daysUntil >= 0 && po.status !== 'delayed') {
                    incomingWeek1 += qty;
                } else if (daysUntil <= 14 && daysUntil > 7 && po.status !== 'delayed') {
                    incomingWeek2 += qty;
                }
            });

            // Verfügbarkeit berechnen
            var currentAvailable = inv ? inv.availableQuantity : 0;

            // Woche 1
            var availableWeek1 = currentAvailable + incomingWeek1;
            var shortfallWeek1 = Math.max(0, req.byWeek.week1 - availableWeek1);
            var remainingAfterWeek1 = Math.max(0, availableWeek1 - req.byWeek.week1);

            // Woche 2
            var availableWeek2 = remainingAfterWeek1 + incomingWeek2;
            var shortfallWeek2 = Math.max(0, req.byWeek.week2 - availableWeek2);

            // Risiko-Bewertung
            var risk = 'ok';
            var riskScore = 0;

            if (shortfallWeek1 > 0) {
                risk = 'critical';
                riskScore = 100;
            } else if (shortfallWeek2 > 0) {
                risk = 'high';
                riskScore = 75;
            } else if (delayedOrders.length > 0) {
                risk = 'medium';
                riskScore = 50;
            } else if (availableWeek1 < req.byWeek.week1 * 1.2) {
                risk = 'low';
                riskScore = 25;
            }

            // Betroffene Aufträge bei Engpass
            var affectedOrders = [];
            if (risk === 'critical' || risk === 'high') {
                affectedOrders = req.byOrder.filter(function(o) {
                    return o.priority.id === 'critical' || o.priority.id === 'high';
                });
            }

            results.push({
                materialId: matId,
                material: mat,
                category: mat.category,
                requirement: {
                    total: Math.round(req.totalRequired * 100) / 100,
                    week1: Math.round(req.byWeek.week1 * 100) / 100,
                    week2: Math.round(req.byWeek.week2 * 100) / 100
                },
                inventory: {
                    stock: inv ? inv.stockQuantity : 0,
                    reserved: inv ? inv.reservedQuantity : 0,
                    available: currentAvailable
                },
                incoming: {
                    week1: incomingWeek1,
                    week2: incomingWeek2,
                    total: incomingWeek1 + incomingWeek2
                },
                coverage: {
                    week1: availableWeek1,
                    week2: availableWeek2,
                    shortfallWeek1: shortfallWeek1,
                    shortfallWeek2: shortfallWeek2
                },
                purchaseOrders: relevantPOs,
                delayedOrders: delayedOrders,
                risk: risk,
                riskScore: riskScore,
                affectedOrders: affectedOrders,
                unit: mat.unit
            });
        });

        // Nach Risiko sortieren
        return results.sort(function(a, b) { return b.riskScore - a.riskScore; });
    },

    // ===== GESAMTANALYSE =====
    generateMaterialAnalysis(productionOrders) {
        var inventory = this.generateInventory();
        var purchaseOrders = this.generatePurchaseOrders();
        var productionPlan = this.generateProductionPlan(productionOrders);
        var requirements = this.calculateMaterialRequirements(productionPlan);
        var availability = this.checkAvailability(requirements, inventory, purchaseOrders);

        // Zusammenfassung
        var summary = {
            totalMaterials: Object.keys(requirements).length,
            critical: availability.filter(function(a) { return a.risk === 'critical'; }).length,
            high: availability.filter(function(a) { return a.risk === 'high'; }).length,
            medium: availability.filter(function(a) { return a.risk === 'medium'; }).length,
            ok: availability.filter(function(a) { return a.risk === 'ok' || a.risk === 'low'; }).length,
            delayedPOs: purchaseOrders.filter(function(po) { return po.status === 'delayed'; }).length,
            totalPOs: purchaseOrders.length
        };

        return {
            timestamp: new Date(),
            summary: summary,
            availability: availability,
            inventory: inventory,
            purchaseOrders: purchaseOrders,
            productionPlan: productionPlan,
            requirements: requirements
        };
    }
};
