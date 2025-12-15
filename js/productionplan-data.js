// =====================================================
// CD-APP - PRODUKTIONSPLANUNG DATEN (Demo/PoC)
// SAP Normalarbeitsplan - Routing-Daten
// =====================================================

const ProductionPlanData = {

    // Normalarbeitspläne (SAP Routing) pro Produkttyp
    // Definiert die Arbeitsfolge durch verschiedene Stationen
    routings: {
        // Plankonvexlinse - Standard-Routing
        'LENS-PCX-25': {
            id: 'RT-LENS-PCX-25',
            name: 'Plankonvexlinse Ø25mm',
            totalDuration: 285, // Minuten
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 15, setupTime: 5 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer', 'Manuell'], duration: 30, setupTime: 10 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten', 'Einseiten'], duration: 45, setupTime: 15 },
                { step: 40, operation: 'CNC-Bearbeitung', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 60, setupTime: 20 },
                { step: 50, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol', 'CCP'], duration: 90, setupTime: 15 },
                { step: 60, operation: 'Qualitätsprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 20, setupTime: 5 }
            ]
        },
        'LENS-PCX-50': {
            id: 'RT-LENS-PCX-50',
            name: 'Plankonvexlinse Ø50mm',
            totalDuration: 350,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge', 'Drahtsäge'], duration: 20, setupTime: 8 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 40, setupTime: 12 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 55, setupTime: 18 },
                { step: 40, operation: 'CNC-Bearbeitung', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech', 'Schneider'], duration: 75, setupTime: 25 },
                { step: 50, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol', 'CCP', 'MRF'], duration: 110, setupTime: 20 },
                { step: 60, operation: 'Qualitätsprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 25, setupTime: 5 }
            ]
        },
        // Bikonvexlinse - komplexeres Routing
        'LENS-DCX-30': {
            id: 'RT-LENS-DCX-30',
            name: 'Bikonvexlinse Ø30mm',
            totalDuration: 420,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 18, setupTime: 6 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 35, setupTime: 10 },
                { step: 30, operation: 'Planschleifen Seite 1', area: 'grinding', workstationTypes: ['Einseiten'], duration: 40, setupTime: 15 },
                { step: 40, operation: 'CNC Seite 1', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 50, setupTime: 20 },
                { step: 50, operation: 'Polieren Seite 1', area: 'polishing', workstationTypes: ['SpinPol'], duration: 70, setupTime: 15 },
                { step: 60, operation: 'CNC Seite 2', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 50, setupTime: 20 },
                { step: 70, operation: 'Polieren Seite 2', area: 'polishing', workstationTypes: ['SpinPol'], duration: 70, setupTime: 15 },
                { step: 80, operation: 'Qualitätsprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 25, setupTime: 5 }
            ]
        },
        // Asphäre - höchste Komplexität
        'LENS-ASP-40': {
            id: 'RT-LENS-ASP-40',
            name: 'Asphäre Ø40mm',
            totalDuration: 580,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 22, setupTime: 8 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 45, setupTime: 15 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 50, setupTime: 18 },
                { step: 40, operation: 'CNC Grobbearbeitung', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 80, setupTime: 30 },
                { step: 50, operation: 'CNC Feinbearbeitung', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 100, setupTime: 25 },
                { step: 60, operation: 'Vorpolieren', area: 'polishing', workstationTypes: ['CCP'], duration: 60, setupTime: 20 },
                { step: 70, operation: 'MRF-Politur', area: 'polishing', workstationTypes: ['MRF'], duration: 120, setupTime: 30 },
                { step: 80, operation: 'Zwischenmessung', area: 'qc', workstationTypes: ['Interferometer'], duration: 20, setupTime: 5 },
                { step: 90, operation: 'Korrekturopolitur', area: 'polishing', workstationTypes: ['MRF'], duration: 40, setupTime: 10 },
                { step: 100, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer', 'Koordinatenmessgerät'], duration: 35, setupTime: 8 }
            ]
        },
        // Prisma - Standard
        'PRISM-RA-25': {
            id: 'RT-PRISM-RA-25',
            name: 'Rechtwinkel-Prisma 25mm',
            totalDuration: 340,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge', 'Drahtsäge'], duration: 25, setupTime: 10 },
                { step: 20, operation: 'Planschleifen Fläche 1', area: 'grinding', workstationTypes: ['Einseiten'], duration: 35, setupTime: 12 },
                { step: 30, operation: 'Planschleifen Fläche 2', area: 'grinding', workstationTypes: ['Einseiten'], duration: 35, setupTime: 12 },
                { step: 40, operation: 'Planschleifen Hypotenuse', area: 'grinding', workstationTypes: ['Einseiten'], duration: 40, setupTime: 15 },
                { step: 50, operation: 'Polieren Flächen', area: 'polishing', workstationTypes: ['SpinPol', 'Handpolitur'], duration: 100, setupTime: 20 },
                { step: 60, operation: 'Winkelprüfung', area: 'qc', workstationTypes: ['Koordinatenmessgerät'], duration: 30, setupTime: 8 }
            ]
        },
        // Pentaprisma - komplex
        'PRISM-PENTA': {
            id: 'RT-PRISM-PENTA',
            name: 'Pentaprisma 30mm',
            totalDuration: 520,
            steps: [
                { step: 10, operation: 'Sägen Rohling', area: 'sawing', workstationTypes: ['Drahtsäge'], duration: 35, setupTime: 15 },
                { step: 20, operation: 'Planschleifen 5 Flächen', area: 'grinding', workstationTypes: ['Einseiten'], duration: 120, setupTime: 25 },
                { step: 30, operation: 'Winkelschleifen', area: 'grinding', workstationTypes: ['Manuell'], duration: 80, setupTime: 20 },
                { step: 40, operation: 'Polieren optische Flächen', area: 'polishing', workstationTypes: ['SpinPol', 'Handpolitur'], duration: 140, setupTime: 25 },
                { step: 50, operation: 'Beschichtung Reflexion', area: 'coating', workstationTypes: ['E-Beam'], duration: 60, setupTime: 30 },
                { step: 60, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer', 'Koordinatenmessgerät'], duration: 40, setupTime: 10 }
            ]
        },
        // Planspiegel
        'MIRROR-FL-50': {
            id: 'RT-MIRROR-FL-50',
            name: 'Planspiegel Ø50mm',
            totalDuration: 380,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 18, setupTime: 6 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 30, setupTime: 10 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 45, setupTime: 15 },
                { step: 40, operation: 'CNC Planfläche', area: 'cnc', workstationTypes: ['Satisloh'], duration: 50, setupTime: 18 },
                { step: 50, operation: 'Hochglanzpolitur', area: 'polishing', workstationTypes: ['CCP', 'MRF'], duration: 100, setupTime: 20 },
                { step: 60, operation: 'Spiegelbeschichtung', area: 'coating', workstationTypes: ['E-Beam', 'Thermisch'], duration: 45, setupTime: 25 },
                { step: 70, operation: 'Planheitsprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 30, setupTime: 8 }
            ]
        },
        // Sphärischer Spiegel
        'MIRROR-SPH-75': {
            id: 'RT-MIRROR-SPH-75',
            name: 'Sphärischer Spiegel Ø75mm',
            totalDuration: 620,
            steps: [
                { step: 10, operation: 'Sägen Rohling', area: 'sawing', workstationTypes: ['Drahtsäge'], duration: 30, setupTime: 12 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 50, setupTime: 15 },
                { step: 30, operation: 'Sphärisches Schleifen', area: 'grinding', workstationTypes: ['Manuell'], duration: 80, setupTime: 25 },
                { step: 40, operation: 'CNC Grobkontur', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 90, setupTime: 30 },
                { step: 50, operation: 'CNC Feinkontur', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 70, setupTime: 25 },
                { step: 60, operation: 'Vorpolitur', area: 'polishing', workstationTypes: ['CCP'], duration: 80, setupTime: 20 },
                { step: 70, operation: 'Präzisionspolitur', area: 'polishing', workstationTypes: ['MRF'], duration: 100, setupTime: 25 },
                { step: 80, operation: 'Spiegelbeschichtung', area: 'coating', workstationTypes: ['IBS'], duration: 60, setupTime: 35 },
                { step: 90, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer', 'Koordinatenmessgerät'], duration: 45, setupTime: 10 }
            ]
        },
        // AR-Fenster
        'WINDOW-AR-40': {
            id: 'RT-WINDOW-AR-40',
            name: 'AR-Fenster Ø40mm',
            totalDuration: 310,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 15, setupTime: 5 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 25, setupTime: 8 },
                { step: 30, operation: 'Planschleifen beidseitig', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 40, setupTime: 12 },
                { step: 40, operation: 'Polieren beidseitig', area: 'polishing', workstationTypes: ['SpinPol'], duration: 80, setupTime: 15 },
                { step: 50, operation: 'AR-Beschichtung', area: 'coating', workstationTypes: ['E-Beam', 'Magnetron'], duration: 70, setupTime: 30 },
                { step: 60, operation: 'Transmissionsprüfung', area: 'qc', workstationTypes: ['Spektrometer'], duration: 25, setupTime: 8 }
            ]
        },
        // Bandpassfilter
        'FILTER-BP-25': {
            id: 'RT-FILTER-BP-25',
            name: 'Bandpassfilter Ø25mm',
            totalDuration: 450,
            steps: [
                { step: 10, operation: 'Sägen Substrat', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 12, setupTime: 5 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 20, setupTime: 8 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 35, setupTime: 12 },
                { step: 40, operation: 'Substratpolitur', area: 'polishing', workstationTypes: ['SpinPol', 'CCP'], duration: 70, setupTime: 15 },
                { step: 50, operation: 'Filterbeschichtung 1', area: 'coating', workstationTypes: ['IBS'], duration: 90, setupTime: 40 },
                { step: 60, operation: 'Filterbeschichtung 2', area: 'coating', workstationTypes: ['IBS'], duration: 90, setupTime: 40 },
                { step: 70, operation: 'Spektralanalyse', area: 'qc', workstationTypes: ['Spektrometer'], duration: 40, setupTime: 10 }
            ]
        },
        // Achromat - Verkittung
        'DOUBLET-AC-30': {
            id: 'RT-DOUBLET-AC-30',
            name: 'Achromat Ø30mm',
            totalDuration: 680,
            steps: [
                { step: 10, operation: 'Sägen Linse 1', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 15, setupTime: 5 },
                { step: 20, operation: 'Sägen Linse 2', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 15, setupTime: 5 },
                { step: 30, operation: 'Rundschleifen beide', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 50, setupTime: 15 },
                { step: 40, operation: 'CNC Linse 1', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 60, setupTime: 20 },
                { step: 50, operation: 'CNC Linse 2', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 60, setupTime: 20 },
                { step: 60, operation: 'Polieren Linse 1', area: 'polishing', workstationTypes: ['SpinPol'], duration: 80, setupTime: 15 },
                { step: 70, operation: 'Polieren Linse 2', area: 'polishing', workstationTypes: ['SpinPol'], duration: 80, setupTime: 15 },
                { step: 80, operation: 'Verkittung', area: 'cementing', workstationTypes: ['UV-Kleber', 'Optikkitt'], duration: 90, setupTime: 30 },
                { step: 90, operation: 'Zentrieren', area: 'centering', workstationTypes: ['Automatik', 'Manuell'], duration: 45, setupTime: 15 },
                { step: 100, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 35, setupTime: 10 }
            ]
        },
        // Keilplatte
        'WEDGE-15': {
            id: 'RT-WEDGE-15',
            name: 'Keilplatte 15°',
            totalDuration: 320,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 18, setupTime: 6 },
                { step: 20, operation: 'Planschleifen Seite 1', area: 'grinding', workstationTypes: ['Einseiten'], duration: 35, setupTime: 12 },
                { step: 30, operation: 'Winkelschleifen Seite 2', area: 'grinding', workstationTypes: ['Einseiten', 'Manuell'], duration: 50, setupTime: 18 },
                { step: 40, operation: 'Polieren beidseitig', area: 'polishing', workstationTypes: ['SpinPol'], duration: 90, setupTime: 20 },
                { step: 50, operation: 'AR-Beschichtung', area: 'coating', workstationTypes: ['E-Beam'], duration: 50, setupTime: 25 },
                { step: 60, operation: 'Winkel- und Qualitätsprüfung', area: 'qc', workstationTypes: ['Koordinatenmessgerät', 'Interferometer'], duration: 35, setupTime: 10 }
            ]
        }
    },

    // Bereichsfarben für die Visualisierung
    areaColors: {
        'sawing': '#e74c3c',
        'grinding': '#3498db',
        'cnc': '#9b59b6',
        'polishing': '#2ecc71',
        'centering': '#f39c12',
        'coating': '#1abc9c',
        'cementing': '#e67e22',
        'qc': '#34495e'
    },

    // Status der Arbeitsschritte
    stepStatus: {
        completed: { id: 'completed', label: 'Abgeschlossen', color: '#27ae60' },
        inProgress: { id: 'inProgress', label: 'In Bearbeitung', color: '#3498db' },
        waiting: { id: 'waiting', label: 'Wartend', color: '#95a5a6' },
        scheduled: { id: 'scheduled', label: 'Geplant', color: '#bdc3c7' },
        delayed: { id: 'delayed', label: 'Verzögert', color: '#e74c3c' }
    },

    // Produktionsplan für Aufträge generieren
    generateProductionPlan(orders, productionState) {
        var self = this;
        var now = new Date();
        var plans = [];

        orders.forEach(function(order) {
            var routing = self.routings[order.product.id];
            if (!routing) {
                // Fallback-Routing für unbekannte Produkte
                routing = self.routings['LENS-PCX-25'];
            }

            var plan = {
                order: order,
                routing: routing,
                steps: [],
                currentStep: null,
                progress: 0,
                startTime: new Date(now.getTime() - Math.random() * 2 * 24 * 60 * 60 * 1000), // Start in den letzten 2 Tagen
                estimatedEnd: null
            };

            // Finde ob dieser Auftrag gerade irgendwo bearbeitet wird
            var currentWorkstation = null;
            Object.values(productionState.state).forEach(function(ws) {
                if (ws.currentOrder && ws.currentOrder.id === order.id) {
                    currentWorkstation = ws;
                }
            });

            // Zufälligen Fortschritt generieren
            var totalSteps = routing.steps.length;
            var completedSteps = Math.floor(Math.random() * totalSteps);
            var currentStepIndex = completedSteps;

            // Wenn der Auftrag gerade bearbeitet wird
            if (currentWorkstation) {
                currentStepIndex = Math.max(0, Math.min(completedSteps, totalSteps - 1));
            }

            var cumulativeTime = 0;
            routing.steps.forEach(function(routingStep, index) {
                var stepStartTime = new Date(plan.startTime.getTime() + cumulativeTime * 60 * 1000);
                var stepEndTime = new Date(stepStartTime.getTime() + (routingStep.duration + routingStep.setupTime) * 60 * 1000);

                var stepStatus;
                var assignedWorkstation = null;
                var actualProgress = 0;

                if (index < completedSteps) {
                    stepStatus = 'completed';
                    actualProgress = 100;
                    // Zufällige vergangene Workstation zuweisen
                    var possibleWs = ProductionData.workstations.filter(function(ws) {
                        return ws.area === routingStep.area &&
                               routingStep.workstationTypes.indexOf(ws.type) !== -1;
                    });
                    if (possibleWs.length > 0) {
                        assignedWorkstation = possibleWs[Math.floor(Math.random() * possibleWs.length)];
                    }
                } else if (index === currentStepIndex) {
                    if (currentWorkstation && currentWorkstation.workstation.area === routingStep.area) {
                        stepStatus = 'inProgress';
                        assignedWorkstation = currentWorkstation.workstation;
                        actualProgress = currentWorkstation.progress || Math.floor(Math.random() * 80) + 10;
                    } else if (currentWorkstation) {
                        stepStatus = 'waiting';
                        actualProgress = 0;
                    } else {
                        stepStatus = 'inProgress';
                        actualProgress = Math.floor(Math.random() * 80) + 10;
                        // Zufällige aktuelle Workstation
                        var possibleWs = ProductionData.workstations.filter(function(ws) {
                            return ws.area === routingStep.area &&
                                   routingStep.workstationTypes.indexOf(ws.type) !== -1;
                        });
                        if (possibleWs.length > 0) {
                            assignedWorkstation = possibleWs[Math.floor(Math.random() * possibleWs.length)];
                        }
                    }
                    plan.currentStep = index;
                } else {
                    stepStatus = 'scheduled';
                    actualProgress = 0;
                }

                // Verzögerung simulieren für einige Aufträge
                if (order.priority.id === 'critical' && index === currentStepIndex && Math.random() < 0.3) {
                    stepStatus = 'delayed';
                }

                plan.steps.push({
                    stepNumber: routingStep.step,
                    operation: routingStep.operation,
                    area: routingStep.area,
                    areaName: ProductionData.areas.find(function(a) { return a.id === routingStep.area; }).name,
                    duration: routingStep.duration,
                    setupTime: routingStep.setupTime,
                    totalTime: routingStep.duration + routingStep.setupTime,
                    workstationTypes: routingStep.workstationTypes,
                    assignedWorkstation: assignedWorkstation,
                    status: stepStatus,
                    progress: actualProgress,
                    plannedStart: stepStartTime,
                    plannedEnd: stepEndTime
                });

                cumulativeTime += routingStep.duration + routingStep.setupTime;
            });

            // Gesamtfortschritt berechnen
            var completedTime = 0;
            plan.steps.forEach(function(step) {
                if (step.status === 'completed') {
                    completedTime += step.totalTime;
                } else if (step.status === 'inProgress') {
                    completedTime += step.totalTime * (step.progress / 100);
                }
            });
            plan.progress = Math.round((completedTime / routing.totalDuration) * 100);
            plan.estimatedEnd = new Date(plan.startTime.getTime() + routing.totalDuration * 60 * 1000);

            plans.push(plan);
        });

        // Nach Priorität und Fortschritt sortieren
        plans.sort(function(a, b) {
            var priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
            var priorityDiff = priorityOrder[a.order.priority.id] - priorityOrder[b.order.priority.id];
            if (priorityDiff !== 0) return priorityDiff;
            return b.progress - a.progress;
        });

        return plans;
    },

    // Zusammenfassung der Produktionsplanung
    generatePlanSummary(plans) {
        var summary = {
            total: plans.length,
            active: 0,
            waiting: 0,
            completed: 0,
            delayed: 0
        };

        plans.forEach(function(plan) {
            if (plan.progress >= 100) {
                summary.completed++;
            } else if (plan.currentStep !== null) {
                var currentStepData = plan.steps[plan.currentStep];
                if (currentStepData && currentStepData.status === 'delayed') {
                    summary.delayed++;
                } else if (currentStepData && currentStepData.status === 'inProgress') {
                    summary.active++;
                } else {
                    summary.waiting++;
                }
            } else {
                summary.waiting++;
            }
        });

        return summary;
    }
};
