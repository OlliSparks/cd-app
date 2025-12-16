/* =====================================================
   TESTLABOR FAHRZEUGBELEUCHTUNG - DATA & LOGIC
   Testplaetze und QM-Management fuer Leuchtenfreigabe
   ===================================================== */

// Testplaetze im Labor
const testStations = [
    {
        id: 'TP-001',
        name: 'Photometrie-Messplatz 1',
        type: 'photometry',
        status: 'testing', // idle, testing, maintenance, offline
        currentTest: 'PRF-2024-0847',
        qmRequirements: ['ECE R48', 'ECE R7', 'Lichttechnische Messung'],
        specs: {
            messbereich: '0.1 - 200.000 cd',
            winkelbereich: '+/- 90 Grad',
            temperatur: '23 +/- 2 C'
        },
        testsToday: 12,
        passRate: 94.2
    },
    {
        id: 'TP-002',
        name: 'Photometrie-Messplatz 2',
        type: 'photometry',
        status: 'idle',
        currentTest: null,
        qmRequirements: ['ECE R48', 'ECE R7', 'SAE J583'],
        specs: {
            messbereich: '0.1 - 200.000 cd',
            winkelbereich: '+/- 90 Grad',
            temperatur: '23 +/- 2 C'
        },
        testsToday: 8,
        passRate: 91.5
    },
    {
        id: 'TP-003',
        name: 'Goniophotometer',
        type: 'gonio',
        status: 'testing',
        currentTest: 'PRF-2024-0851',
        qmRequirements: ['ECE R112', 'ECE R119', 'Lichtverteilung'],
        specs: {
            drehbereich: '360 Grad',
            aufloesung: '0.01 Grad',
            maxGewicht: '50 kg'
        },
        testsToday: 4,
        passRate: 87.5
    },
    {
        id: 'TP-004',
        name: 'Klimakammer 1',
        type: 'climate',
        status: 'testing',
        currentTest: 'PRF-2024-0849',
        qmRequirements: ['Temperaturzyklus', 'Feuchtebestaendigkeit', 'Kondensatpruefung'],
        specs: {
            tempBereich: '-40 C bis +85 C',
            feuchte: '10% - 98% rH',
            volumen: '1000 L'
        },
        testsToday: 2,
        passRate: 96.0
    },
    {
        id: 'TP-005',
        name: 'Klimakammer 2',
        type: 'climate',
        status: 'idle',
        currentTest: null,
        qmRequirements: ['Waermealterung', 'Kaeltepruefung', 'Schnellwechsel'],
        specs: {
            tempBereich: '-70 C bis +180 C',
            aenderungsrate: '15 K/min',
            volumen: '500 L'
        },
        testsToday: 3,
        passRate: 100.0
    },
    {
        id: 'TP-006',
        name: 'Vibrationspruefstand',
        type: 'vibration',
        status: 'maintenance',
        currentTest: null,
        qmRequirements: ['Schwingfestigkeit', 'Resonanzanalyse', 'Dauerlauf'],
        specs: {
            frequenz: '5 - 2000 Hz',
            kraft: '50 kN',
            beschleunigung: '100 g'
        },
        testsToday: 0,
        passRate: 88.3
    },
    {
        id: 'TP-007',
        name: 'EMV-Pruefkammer',
        type: 'emv',
        status: 'testing',
        currentTest: 'PRF-2024-0852',
        qmRequirements: ['ECE R10', 'CISPR 25', 'ISO 11452'],
        specs: {
            frequenz: '150 kHz - 2.5 GHz',
            feldstaerke: '200 V/m',
            abschirmung: '> 100 dB'
        },
        testsToday: 5,
        passRate: 92.0
    },
    {
        id: 'TP-008',
        name: 'Salzspruehkammer',
        type: 'corrosion',
        status: 'idle',
        currentTest: null,
        qmRequirements: ['DIN EN ISO 9227', 'Korrosionsbestaendigkeit', 'Lackpruefung'],
        specs: {
            salzkonz: '50 g/L NaCl',
            temperatur: '35 C',
            volumen: '800 L'
        },
        testsToday: 1,
        passRate: 95.0
    },
    {
        id: 'TP-009',
        name: 'Staub-/Wasserdichtheit',
        type: 'ip',
        status: 'testing',
        currentTest: 'PRF-2024-0853',
        qmRequirements: ['IP67', 'IP69K', 'Druckwasserpruefung'],
        specs: {
            staubschutz: 'IP6X komplett',
            wasserdruck: 'bis 100 bar',
            temperatur: '-20 C bis +80 C'
        },
        testsToday: 7,
        passRate: 89.7
    },
    {
        id: 'TP-010',
        name: 'Optische Inspektion',
        type: 'visual',
        status: 'idle',
        currentTest: null,
        qmRequirements: ['Oberflaeche', 'Farbabgleich', 'Masshaltigkeit'],
        specs: {
            vergroesserung: '10x - 100x',
            beleuchtung: 'LED Ringlicht',
            kamera: '20 MP'
        },
        testsToday: 15,
        passRate: 97.5
    }
];

// Aktuelle Pruefungen
const activeTests = [
    {
        id: 'PRF-2024-0847',
        lampType: 'LED Scheinwerfer Links',
        manufacturer: 'HELLA GmbH',
        station: 'TP-001',
        testType: 'Photometrie',
        startTime: '2024-12-16T08:30:00',
        status: 'testing',
        progress: 65,
        estimatedEnd: '2024-12-16T14:00:00'
    },
    {
        id: 'PRF-2024-0849',
        lampType: 'Rueckleuchte Kombi',
        manufacturer: 'Valeo SA',
        station: 'TP-004',
        testType: 'Klimazyklus',
        startTime: '2024-12-15T22:00:00',
        status: 'testing',
        progress: 78,
        estimatedEnd: '2024-12-16T16:00:00'
    },
    {
        id: 'PRF-2024-0850',
        lampType: 'Blinker Seitenspiegel',
        manufacturer: 'Magna International',
        station: 'TP-002',
        testType: 'Photometrie',
        startTime: '2024-12-16T10:00:00',
        status: 'pending',
        progress: 0,
        estimatedEnd: '2024-12-16T12:00:00'
    },
    {
        id: 'PRF-2024-0851',
        lampType: 'Nebelscheinwerfer',
        manufacturer: 'Osram GmbH',
        station: 'TP-003',
        testType: 'Lichtverteilung',
        startTime: '2024-12-16T07:00:00',
        status: 'testing',
        progress: 82,
        estimatedEnd: '2024-12-16T11:30:00'
    },
    {
        id: 'PRF-2024-0852',
        lampType: 'LED Tagfahrlicht',
        manufacturer: 'ZKW Group',
        station: 'TP-007',
        testType: 'EMV-Pruefung',
        startTime: '2024-12-16T09:00:00',
        status: 'testing',
        progress: 45,
        estimatedEnd: '2024-12-16T15:00:00'
    },
    {
        id: 'PRF-2024-0853',
        lampType: 'Kennzeichenleuchte',
        manufacturer: 'Automotive Lighting',
        station: 'TP-009',
        testType: 'IP69K Pruefung',
        startTime: '2024-12-16T08:00:00',
        status: 'testing',
        progress: 55,
        estimatedEnd: '2024-12-16T13:00:00'
    },
    {
        id: 'PRF-2024-0844',
        lampType: 'Matrix LED Modul',
        manufacturer: 'HELLA GmbH',
        station: 'TP-001',
        testType: 'Photometrie',
        startTime: '2024-12-15T14:00:00',
        status: 'passed',
        progress: 100,
        result: 'Freigabe erteilt',
        completedAt: '2024-12-15T18:30:00'
    },
    {
        id: 'PRF-2024-0843',
        lampType: 'Bremsleuchte High-Mount',
        manufacturer: 'Valeo SA',
        station: 'TP-003',
        testType: 'Lichtverteilung',
        startTime: '2024-12-15T09:00:00',
        status: 'failed',
        progress: 100,
        result: 'Lichtstaerke unter Grenzwert',
        completedAt: '2024-12-15T13:00:00'
    }
];

// QM-Pruefarten und Normen
const qmTestTypes = {
    photometry: {
        name: 'Photometrische Pruefung',
        norms: ['ECE R48', 'ECE R7', 'ECE R112', 'SAE J583'],
        duration: '2-6 Stunden',
        description: 'Messung von Lichtstaerke, Lichtverteilung und Farbort'
    },
    climate: {
        name: 'Klimapruefung',
        norms: ['IEC 60068', 'DIN EN 60068', 'LV 124'],
        duration: '24-168 Stunden',
        description: 'Temperatur-, Feuchte- und Kondensatbestaendigkeit'
    },
    vibration: {
        name: 'Vibrationspruefung',
        norms: ['ISO 16750-3', 'LV 123', 'GMW 3172'],
        duration: '8-48 Stunden',
        description: 'Mechanische Belastbarkeit und Resonanzverhalten'
    },
    emv: {
        name: 'EMV-Pruefung',
        norms: ['ECE R10', 'CISPR 25', 'ISO 11452', 'ISO 7637'],
        duration: '4-8 Stunden',
        description: 'Elektromagnetische Vertraeglichkeit und Stoerfestigkeit'
    },
    ip: {
        name: 'Schutzartpruefung',
        norms: ['IEC 60529', 'DIN EN 60529', 'ISO 20653'],
        duration: '1-4 Stunden',
        description: 'Staub- und Wasserdichtheit nach IP-Klassifizierung'
    },
    corrosion: {
        name: 'Korrosionspruefung',
        norms: ['DIN EN ISO 9227', 'DIN EN ISO 6270', 'GMW 14872'],
        duration: '96-1000 Stunden',
        description: 'Salzspruehnebel und Korrosionsbestaendigkeit'
    }
};

// Testlabor View Initialisierung
function initTestlaborView() {
    renderTestStations();
    renderTestsTable();
    updateTestlaborStats();
    populateStationFilter();
}

// Testplaetze rendern
function renderTestStations() {
    const grid = document.getElementById('tl-stations-grid');
    if (!grid) return;

    grid.innerHTML = testStations.map(station => {
        const statusClass = `status-${station.status}`;
        const statusLabels = {
            idle: 'Frei',
            testing: 'In Betrieb',
            maintenance: 'Wartung',
            offline: 'Offline'
        };

        const currentTestHtml = station.currentTest ? `
            <div class="tl-station-current">
                <div class="tl-station-current-label">Aktueller Test</div>
                <div class="tl-station-current-test">${station.currentTest}</div>
            </div>
        ` : '';

        const qmBadges = station.qmRequirements.map(req =>
            `<span class="tl-qm-badge">${req}</span>`
        ).join('');

        return `
            <div class="tl-station-card ${statusClass}" data-station="${station.id}">
                <div class="tl-station-header">
                    <div>
                        <div class="tl-station-name">${station.name}</div>
                        <div class="tl-station-id">${station.id}</div>
                    </div>
                    <span class="tl-station-status ${station.status}">${statusLabels[station.status]}</span>
                </div>
                <div class="tl-station-info">
                    <div class="tl-station-info-row">
                        <span class="tl-station-info-label">Tests heute:</span>
                        <span class="tl-station-info-value">${station.testsToday}</span>
                    </div>
                    <div class="tl-station-info-row">
                        <span class="tl-station-info-label">Freigaberate:</span>
                        <span class="tl-station-info-value">${station.passRate.toFixed(1)}%</span>
                    </div>
                </div>
                ${currentTestHtml}
                <div class="tl-station-qm">
                    <div class="tl-station-qm-title">QM-Anforderungen</div>
                    <div class="tl-station-qm-list">${qmBadges}</div>
                </div>
            </div>
        `;
    }).join('');

    // Click Handler fuer Stationskarten
    grid.querySelectorAll('.tl-station-card').forEach(card => {
        card.addEventListener('click', () => {
            const stationId = card.dataset.station;
            showStationDetails(stationId);
        });
    });
}

// Tests-Tabelle rendern
function renderTestsTable() {
    const tbody = document.querySelector('#tl-tests-table tbody');
    if (!tbody) return;

    const filterStation = document.getElementById('tl-filter-station')?.value || 'all';
    const filterStatus = document.getElementById('tl-filter-status')?.value || 'all';

    let filteredTests = activeTests;

    if (filterStation !== 'all') {
        filteredTests = filteredTests.filter(t => t.station === filterStation);
    }
    if (filterStatus !== 'all') {
        filteredTests = filteredTests.filter(t => t.status === filterStatus);
    }

    const statusLabels = {
        testing: 'In Pruefung',
        pending: 'Wartend',
        passed: 'Freigegeben',
        failed: 'Abgelehnt'
    };

    tbody.innerHTML = filteredTests.map(test => {
        const startDate = new Date(test.startTime);
        const startFormatted = startDate.toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        const actionButtons = test.status === 'testing' ? `
            <button class="tl-test-action-btn" onclick="pauseTest('${test.id}')">Pause</button>
            <button class="tl-test-action-btn primary" onclick="completeTest('${test.id}')">Abschliessen</button>
        ` : test.status === 'pending' ? `
            <button class="tl-test-action-btn primary" onclick="startTest('${test.id}')">Starten</button>
        ` : `
            <button class="tl-test-action-btn" onclick="showTestReport('${test.id}')">Bericht</button>
        `;

        return `
            <tr data-test="${test.id}">
                <td><strong>${test.id}</strong></td>
                <td>${test.lampType}</td>
                <td>${test.manufacturer}</td>
                <td>${test.station}</td>
                <td>${test.testType}</td>
                <td>${startFormatted}</td>
                <td><span class="tl-test-status ${test.status}">${statusLabels[test.status]}</span></td>
                <td class="tl-test-actions">${actionButtons}</td>
            </tr>
        `;
    }).join('');
}

// Statistiken aktualisieren
function updateTestlaborStats() {
    const activeCount = activeTests.filter(t => t.status === 'testing').length;
    const pendingCount = activeTests.filter(t => t.status === 'pending').length;
    const passedCount = activeTests.filter(t => t.status === 'passed').length;
    const failedCount = activeTests.filter(t => t.status === 'failed').length;

    const statActive = document.getElementById('tl-stat-active');
    const statPending = document.getElementById('tl-stat-pending');
    const statPassed = document.getElementById('tl-stat-passed');
    const statFailed = document.getElementById('tl-stat-failed');

    if (statActive) statActive.textContent = activeCount;
    if (statPending) statPending.textContent = pendingCount;
    if (statPassed) statPassed.textContent = passedCount;
    if (statFailed) statFailed.textContent = failedCount;
}

// Filter-Dropdown befuellen
function populateStationFilter() {
    const select = document.getElementById('tl-filter-station');
    if (!select) return;

    testStations.forEach(station => {
        const option = document.createElement('option');
        option.value = station.id;
        option.textContent = `${station.id} - ${station.name}`;
        select.appendChild(option);
    });
}

// Station Details Modal
function showStationDetails(stationId) {
    const station = testStations.find(s => s.id === stationId);
    if (!station) return;

    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.textContent = station.name;

    const specsHtml = Object.entries(station.specs).map(([key, value]) => `
        <div class="tl-station-info-row">
            <span class="tl-station-info-label">${key}:</span>
            <span class="tl-station-info-value">${value}</span>
        </div>
    `).join('');

    const qmList = station.qmRequirements.map(req => `<li>${req}</li>`).join('');

    body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <strong>Station ID:</strong> ${station.id}<br>
                <strong>Typ:</strong> ${qmTestTypes[station.type]?.name || station.type}<br>
                <strong>Status:</strong> ${station.status}
            </div>
            <div>
                <h4 style="margin: 0 0 10px 0;">Technische Spezifikationen</h4>
                ${specsHtml}
            </div>
            <div>
                <h4 style="margin: 0 0 10px 0;">QM-Anforderungen</h4>
                <ul style="margin: 0; padding-left: 20px;">${qmList}</ul>
            </div>
            <div>
                <h4 style="margin: 0 0 10px 0;">Statistik</h4>
                <div class="tl-station-info-row">
                    <span class="tl-station-info-label">Tests heute:</span>
                    <span class="tl-station-info-value">${station.testsToday}</span>
                </div>
                <div class="tl-station-info-row">
                    <span class="tl-station-info-label">Freigaberate:</span>
                    <span class="tl-station-info-value">${station.passRate.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Test-Aktionen (Platzhalter)
function startTest(testId) {
    console.log('Test starten:', testId);
    alert(`Test ${testId} wird gestartet...`);
}

function pauseTest(testId) {
    console.log('Test pausieren:', testId);
    alert(`Test ${testId} wird pausiert...`);
}

function completeTest(testId) {
    console.log('Test abschliessen:', testId);
    alert(`Test ${testId} wird abgeschlossen. Bitte Ergebnis eingeben.`);
}

function showTestReport(testId) {
    const test = activeTests.find(t => t.id === testId);
    if (!test) return;

    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.textContent = `Pruefbericht ${test.id}`;
    body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <div><strong>Leuchtentyp:</strong> ${test.lampType}</div>
            <div><strong>Hersteller:</strong> ${test.manufacturer}</div>
            <div><strong>Pruefart:</strong> ${test.testType}</div>
            <div><strong>Testplatz:</strong> ${test.station}</div>
            <div><strong>Status:</strong> <span class="tl-test-status ${test.status}">${test.status === 'passed' ? 'Freigegeben' : 'Abgelehnt'}</span></div>
            <div><strong>Ergebnis:</strong> ${test.result || '-'}</div>
            <div><strong>Abgeschlossen:</strong> ${test.completedAt ? new Date(test.completedAt).toLocaleString('de-DE') : '-'}</div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Filter Event Listener
document.addEventListener('DOMContentLoaded', function() {
    const filterStation = document.getElementById('tl-filter-station');
    const filterStatus = document.getElementById('tl-filter-status');

    if (filterStation) {
        filterStation.addEventListener('change', renderTestsTable);
    }
    if (filterStatus) {
        filterStatus.addEventListener('change', renderTestsTable);
    }
});
