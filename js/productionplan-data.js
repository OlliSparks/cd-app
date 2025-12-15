// =====================================================
// CD-APP - PRODUKTIONSPLANUNG DATEN (Demo/PoC)
// SAP Normalarbeitsplan - Routing-Daten
// =====================================================

const ProductionPlanData = {

    // Normalarbeitspläne (SAP Routing) pro Produkttyp
    routings: {
        'LENS-PCX-25': {
            id: 'RT-LENS-PCX-25',
            name: 'Plankonvexlinse Ø25mm',
            totalDuration: 285,
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
        'LENS-DCX-30': {
            id: 'RT-LENS-DCX-30',
            name: 'Bikonvexlinse Ø30mm',
            totalDuration: 420,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 18, setupTime: 6 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 35, setupTime: 10 },
                { step: 30, operation: 'CNC Seite 1', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 50, setupTime: 20 },
                { step: 40, operation: 'Polieren Seite 1', area: 'polishing', workstationTypes: ['SpinPol'], duration: 70, setupTime: 15 },
                { step: 50, operation: 'CNC Seite 2', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 50, setupTime: 20 },
                { step: 60, operation: 'Polieren Seite 2', area: 'polishing', workstationTypes: ['SpinPol'], duration: 70, setupTime: 15 },
                { step: 70, operation: 'Qualitätsprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 25, setupTime: 5 }
            ]
        },
        'LENS-ASP-40': {
            id: 'RT-LENS-ASP-40',
            name: 'Asphäre Ø40mm',
            totalDuration: 480,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 22, setupTime: 8 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 45, setupTime: 15 },
                { step: 30, operation: 'CNC Grobbearbeitung', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 80, setupTime: 30 },
                { step: 40, operation: 'CNC Feinbearbeitung', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 100, setupTime: 25 },
                { step: 50, operation: 'MRF-Politur', area: 'polishing', workstationTypes: ['MRF'], duration: 120, setupTime: 30 },
                { step: 60, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer', 'Koordinatenmessgerät'], duration: 35, setupTime: 8 }
            ]
        },
        'PRISM-RA-25': {
            id: 'RT-PRISM-RA-25',
            name: 'Rechtwinkel-Prisma 25mm',
            totalDuration: 300,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge', 'Drahtsäge'], duration: 25, setupTime: 10 },
                { step: 20, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Einseiten'], duration: 60, setupTime: 15 },
                { step: 30, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol', 'Handpolitur'], duration: 100, setupTime: 20 },
                { step: 40, operation: 'Winkelprüfung', area: 'qc', workstationTypes: ['Koordinatenmessgerät'], duration: 30, setupTime: 8 }
            ]
        },
        'PRISM-PENTA': {
            id: 'RT-PRISM-PENTA',
            name: 'Pentaprisma 30mm',
            totalDuration: 450,
            steps: [
                { step: 10, operation: 'Sägen Rohling', area: 'sawing', workstationTypes: ['Drahtsäge'], duration: 35, setupTime: 15 },
                { step: 20, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Einseiten'], duration: 80, setupTime: 20 },
                { step: 30, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol', 'Handpolitur'], duration: 120, setupTime: 25 },
                { step: 40, operation: 'Beschichtung', area: 'coating', workstationTypes: ['E-Beam'], duration: 60, setupTime: 30 },
                { step: 50, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer', 'Koordinatenmessgerät'], duration: 40, setupTime: 10 }
            ]
        },
        'MIRROR-FL-50': {
            id: 'RT-MIRROR-FL-50',
            name: 'Planspiegel Ø50mm',
            totalDuration: 320,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 18, setupTime: 6 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 30, setupTime: 10 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 45, setupTime: 15 },
                { step: 40, operation: 'Hochglanzpolitur', area: 'polishing', workstationTypes: ['CCP', 'MRF'], duration: 100, setupTime: 20 },
                { step: 50, operation: 'Spiegelbeschichtung', area: 'coating', workstationTypes: ['E-Beam', 'Thermisch'], duration: 45, setupTime: 25 },
                { step: 60, operation: 'Planheitsprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 30, setupTime: 8 }
            ]
        },
        'MIRROR-SPH-75': {
            id: 'RT-MIRROR-SPH-75',
            name: 'Sphärischer Spiegel Ø75mm',
            totalDuration: 500,
            steps: [
                { step: 10, operation: 'Sägen Rohling', area: 'sawing', workstationTypes: ['Drahtsäge'], duration: 30, setupTime: 12 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 50, setupTime: 15 },
                { step: 30, operation: 'CNC Kontur', area: 'cnc', workstationTypes: ['Optotech', 'Schneider'], duration: 90, setupTime: 30 },
                { step: 40, operation: 'Präzisionspolitur', area: 'polishing', workstationTypes: ['MRF'], duration: 100, setupTime: 25 },
                { step: 50, operation: 'Spiegelbeschichtung', area: 'coating', workstationTypes: ['IBS'], duration: 60, setupTime: 35 },
                { step: 60, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer', 'Koordinatenmessgerät'], duration: 45, setupTime: 10 }
            ]
        },
        'WINDOW-AR-40': {
            id: 'RT-WINDOW-AR-40',
            name: 'AR-Fenster Ø40mm',
            totalDuration: 280,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 15, setupTime: 5 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 25, setupTime: 8 },
                { step: 30, operation: 'Planschleifen', area: 'grinding', workstationTypes: ['Doppelseiten'], duration: 40, setupTime: 12 },
                { step: 40, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol'], duration: 80, setupTime: 15 },
                { step: 50, operation: 'AR-Beschichtung', area: 'coating', workstationTypes: ['E-Beam', 'Magnetron'], duration: 70, setupTime: 30 },
                { step: 60, operation: 'Transmissionsprüfung', area: 'qc', workstationTypes: ['Spektrometer'], duration: 25, setupTime: 8 }
            ]
        },
        'FILTER-BP-25': {
            id: 'RT-FILTER-BP-25',
            name: 'Bandpassfilter Ø25mm',
            totalDuration: 380,
            steps: [
                { step: 10, operation: 'Sägen Substrat', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 12, setupTime: 5 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 20, setupTime: 8 },
                { step: 30, operation: 'Substratpolitur', area: 'polishing', workstationTypes: ['SpinPol', 'CCP'], duration: 70, setupTime: 15 },
                { step: 40, operation: 'Filterbeschichtung', area: 'coating', workstationTypes: ['IBS'], duration: 120, setupTime: 40 },
                { step: 50, operation: 'Spektralanalyse', area: 'qc', workstationTypes: ['Spektrometer'], duration: 40, setupTime: 10 }
            ]
        },
        'DOUBLET-AC-30': {
            id: 'RT-DOUBLET-AC-30',
            name: 'Achromat Ø30mm',
            totalDuration: 550,
            steps: [
                { step: 10, operation: 'Sägen Linsen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 25, setupTime: 8 },
                { step: 20, operation: 'Rundschleifen', area: 'grinding', workstationTypes: ['CNC-Rundschleifer'], duration: 50, setupTime: 15 },
                { step: 30, operation: 'CNC Linsen', area: 'cnc', workstationTypes: ['Satisloh', 'Optotech'], duration: 100, setupTime: 30 },
                { step: 40, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol'], duration: 120, setupTime: 20 },
                { step: 50, operation: 'Verkittung', area: 'cementing', workstationTypes: ['UV-Kleber', 'Optikkitt'], duration: 90, setupTime: 30 },
                { step: 60, operation: 'Zentrieren', area: 'centering', workstationTypes: ['Automatik', 'Manuell'], duration: 45, setupTime: 15 },
                { step: 70, operation: 'Endprüfung', area: 'qc', workstationTypes: ['Interferometer'], duration: 35, setupTime: 10 }
            ]
        },
        'WEDGE-15': {
            id: 'RT-WEDGE-15',
            name: 'Keilplatte 15°',
            totalDuration: 290,
            steps: [
                { step: 10, operation: 'Sägen', area: 'sawing', workstationTypes: ['Diamantsäge'], duration: 18, setupTime: 6 },
                { step: 20, operation: 'Winkelschleifen', area: 'grinding', workstationTypes: ['Einseiten', 'Manuell'], duration: 60, setupTime: 18 },
                { step: 30, operation: 'Polieren', area: 'polishing', workstationTypes: ['SpinPol'], duration: 90, setupTime: 20 },
                { step: 40, operation: 'AR-Beschichtung', area: 'coating', workstationTypes: ['E-Beam'], duration: 50, setupTime: 25 },
                { step: 50, operation: 'Qualitätsprüfung', area: 'qc', workstationTypes: ['Koordinatenmessgerät', 'Interferometer'], duration: 35, setupTime: 10 }
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

    // Produktionsplan für Aufträge generieren - VERBESSERT für Timeline-Sichtbarkeit
    generateProductionPlan(orders, productionState) {
        var self = this;
        var now = new Date();
        var plans = [];

        // Verteile Aufträge über die Zeit für bessere Sichtbarkeit
        orders.forEach(function(order, orderIndex) {
            var routing = self.routings[order.product.id];
            if (!routing) {
                routing = self.routings['LENS-PCX-25'];
            }

            // Startzeit so berechnen, dass aktueller Schritt im sichtbaren Bereich liegt
            // Verschiebe jeden Auftrag leicht, um Überlappungen zu reduzieren
            var timeOffset = (orderIndex % 8) * 30; // 0, 30, 60, 90, ... Minuten versetzt
            var hoursBack = Math.floor(orderIndex / 3) * 0.5; // Staffelung in der Zeit

            // Berechne wo wir im Prozess sind (basierend auf Auftragsindex für Variation)
            var progressFactor = (orderIndex * 17 + 7) % 100 / 100; // Pseudo-Zufall basierend auf Index
            var totalSteps = routing.steps.length;
            var currentStepIndex = Math.floor(progressFactor * totalSteps);
            currentStepIndex = Math.min(currentStepIndex, totalSteps - 1);

            // Berechne die Zeit bis zum aktuellen Schritt
            var timeToCurrentStep = 0;
            for (var i = 0; i < currentStepIndex; i++) {
                timeToCurrentStep += routing.steps[i].duration + routing.steps[i].setupTime;
            }

            // Startzeit so setzen, dass der aktuelle Schritt JETZT + offset ist
            var planStartTime = new Date(now.getTime() - timeToCurrentStep * 60 * 1000 + timeOffset * 60 * 1000 - hoursBack * 60 * 60 * 1000);

            var plan = {
                order: order,
                routing: routing,
                steps: [],
                currentStep: currentStepIndex,
                progress: 0,
                startTime: planStartTime,
                estimatedEnd: null
            };

            var cumulativeTime = 0;
            routing.steps.forEach(function(routingStep, index) {
                var stepStartTime = new Date(planStartTime.getTime() + cumulativeTime * 60 * 1000);
                var stepEndTime = new Date(stepStartTime.getTime() + (routingStep.duration + routingStep.setupTime) * 60 * 1000);

                var stepStatus;
                var assignedWorkstation = null;
                var actualProgress = 0;

                // Finde passende Workstation
                var possibleWs = ProductionData.workstations.filter(function(ws) {
                    return ws.area === routingStep.area &&
                           routingStep.workstationTypes.indexOf(ws.type) !== -1;
                });

                if (index < currentStepIndex) {
                    // Abgeschlossene Schritte
                    stepStatus = 'completed';
                    actualProgress = 100;
                    if (possibleWs.length > 0) {
                        assignedWorkstation = possibleWs[(orderIndex + index) % possibleWs.length];
                    }
                } else if (index === currentStepIndex) {
                    // Aktueller Schritt
                    stepStatus = 'inProgress';
                    actualProgress = Math.floor(((orderIndex * 13 + 23) % 80) + 10); // 10-90%

                    // Verzögerung bei kritischen Aufträgen
                    if (order.priority.id === 'critical' && orderIndex % 3 === 0) {
                        stepStatus = 'delayed';
                    }

                    if (possibleWs.length > 0) {
                        assignedWorkstation = possibleWs[(orderIndex + index) % possibleWs.length];
                    }
                } else {
                    // Zukünftige Schritte
                    stepStatus = 'scheduled';
                    actualProgress = 0;

                    // Weise auch zukünftigen Schritten Workstations zu für die Pfeil-Darstellung
                    if (possibleWs.length > 0) {
                        assignedWorkstation = possibleWs[(orderIndex + index) % possibleWs.length];
                    }
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
                } else if (step.status === 'inProgress' || step.status === 'delayed') {
                    completedTime += step.totalTime * (step.progress / 100);
                }
            });
            plan.progress = Math.round((completedTime / routing.totalDuration) * 100);
            plan.estimatedEnd = new Date(planStartTime.getTime() + routing.totalDuration * 60 * 1000);

            plans.push(plan);
        });

        // Nach Priorität sortieren
        plans.sort(function(a, b) {
            var priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
            return priorityOrder[a.order.priority.id] - priorityOrder[b.order.priority.id];
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
            } else {
                var hasDelayed = plan.steps.some(function(s) { return s.status === 'delayed'; });
                var hasInProgress = plan.steps.some(function(s) { return s.status === 'inProgress'; });

                if (hasDelayed) {
                    summary.delayed++;
                } else if (hasInProgress) {
                    summary.active++;
                } else {
                    summary.waiting++;
                }
            }
        });

        return summary;
    }
};
