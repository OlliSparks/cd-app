# OPT'O'MIZE YOURSELF - Testdaten-Vorlage

Diese Datei enthält alle anpassbaren Testdaten. Einfach die Werte ändern und mir zurückschicken!

---

## 1. ARBEITSBEREICHE (areas)

Datei: `js/data.js` - Zeile 9-18

```javascript
areas: [
    { id: 'sawing',     name: 'Sägen & Trennen',    icon: '⚙️', color: '#e74c3c' },
    { id: 'grinding',   name: 'Schleifen',          icon: '🔧', color: '#3498db' },
    { id: 'cnc',        name: 'CNC-Bearbeitung',    icon: '🏭', color: '#9b59b6' },
    { id: 'polishing',  name: 'Polieren',           icon: '✨', color: '#2ecc71' },
    { id: 'centering',  name: 'Zentrieren',         icon: '🎯', color: '#f39c12' },
    { id: 'coating',    name: 'Beschichtung',       icon: '🔬', color: '#1abc9c' },
    { id: 'cementing',  name: 'Verkittung',         icon: '🔗', color: '#e67e22' },
    { id: 'qc',         name: 'Qualitätsprüfung',   icon: '✓',  color: '#34495e' }
]
```

---

## 2. ARBEITSPLÄTZE (workstations)

Datei: `js/data.js` - Zeile 21-77

Format: `{ id: 'KÜRZEL', name: 'Anzeigename', area: 'bereichs-id', type: 'Maschinentyp' }`

```javascript
workstations: [
    // === SÄGEN (3 Stück) ===
    { id: 'SAW-01', name: 'Säge 1', area: 'sawing', type: 'Diamantsäge' },
    { id: 'SAW-02', name: 'Säge 2', area: 'sawing', type: 'Diamantsäge' },
    { id: 'SAW-03', name: 'Säge 3', area: 'sawing', type: 'Drahtsäge' },

    // === SCHLEIFEN (8 Stück) ===
    { id: 'RND-01', name: 'Rundschleifer 1', area: 'grinding', type: 'CNC-Rundschleifer' },
    { id: 'RND-02', name: 'Rundschleifer 2', area: 'grinding', type: 'CNC-Rundschleifer' },
    { id: 'RND-03', name: 'Rundschleifer 3', area: 'grinding', type: 'Manuell' },
    { id: 'RND-04', name: 'Rundschleifer 4', area: 'grinding', type: 'CNC-Rundschleifer' },
    { id: 'PLN-01', name: 'Planschleifer 1', area: 'grinding', type: 'Doppelseiten' },
    { id: 'PLN-02', name: 'Planschleifer 2', area: 'grinding', type: 'Doppelseiten' },
    { id: 'PLN-03', name: 'Planschleifer 3', area: 'grinding', type: 'Einseiten' },
    { id: 'PLN-04', name: 'Planschleifer 4', area: 'grinding', type: 'Einseiten' },

    // === CNC (6 Stück) ===
    { id: 'CNC-01', name: 'CNC 1', area: 'cnc', type: 'Satisloh' },
    { id: 'CNC-02', name: 'CNC 2', area: 'cnc', type: 'Satisloh' },
    { id: 'CNC-03', name: 'CNC 3', area: 'cnc', type: 'Optotech' },
    { id: 'CNC-04', name: 'CNC 4', area: 'cnc', type: 'Optotech' },
    { id: 'CNC-05', name: 'CNC 5', area: 'cnc', type: 'Schneider' },
    { id: 'CNC-06', name: 'CNC 6', area: 'cnc', type: 'Schneider' },

    // === POLIEREN (8 Stück) ===
    { id: 'POL-01', name: 'Poliermaschine 1', area: 'polishing', type: 'SpinPol' },
    { id: 'POL-02', name: 'Poliermaschine 2', area: 'polishing', type: 'SpinPol' },
    { id: 'POL-03', name: 'Poliermaschine 3', area: 'polishing', type: 'SpinPol' },
    { id: 'POL-04', name: 'Poliermaschine 4', area: 'polishing', type: 'CCP' },
    { id: 'POL-05', name: 'Poliermaschine 5', area: 'polishing', type: 'CCP' },
    { id: 'POL-06', name: 'Poliermaschine 6', area: 'polishing', type: 'MRF' },
    { id: 'POL-07', name: 'Poliermaschine 7', area: 'polishing', type: 'MRF' },
    { id: 'POL-08', name: 'Poliermaschine 8', area: 'polishing', type: 'Handpolitur' },

    // === ZENTRIEREN (4 Stück) ===
    { id: 'ZEN-01', name: 'Zentriermaschine 1', area: 'centering', type: 'Automatik' },
    { id: 'ZEN-02', name: 'Zentriermaschine 2', area: 'centering', type: 'Automatik' },
    { id: 'ZEN-03', name: 'Zentriermaschine 3', area: 'centering', type: 'Manuell' },
    { id: 'ZEN-04', name: 'Zentriermaschine 4', area: 'centering', type: 'Manuell' },

    // === BESCHICHTUNG (5 Stück) ===
    { id: 'COA-01', name: 'Bedampfung 1', area: 'coating', type: 'E-Beam' },
    { id: 'COA-02', name: 'Bedampfung 2', area: 'coating', type: 'E-Beam' },
    { id: 'COA-03', name: 'Bedampfung 3', area: 'coating', type: 'Thermisch' },
    { id: 'SPU-01', name: 'Sputtern 1', area: 'coating', type: 'Magnetron' },
    { id: 'SPU-02', name: 'Sputtern 2', area: 'coating', type: 'IBS' },

    // === VERKITTUNG (3 Stück) ===
    { id: 'KIT-01', name: 'Kittplatz 1', area: 'cementing', type: 'UV-Kleber' },
    { id: 'KIT-02', name: 'Kittplatz 2', area: 'cementing', type: 'Optikkitt' },
    { id: 'KIT-03', name: 'Kittplatz 3', area: 'cementing', type: 'UV-Kleber' },

    // === QUALITÄTSPRÜFUNG (3 Stück) ===
    { id: 'QC-01', name: 'Messplatz 1', area: 'qc', type: 'Interferometer' },
    { id: 'QC-02', name: 'Messplatz 2', area: 'qc', type: 'Spektrometer' },
    { id: 'QC-03', name: 'Messplatz 3', area: 'qc', type: 'Koordinatenmessgerät' }
]
```

---

## 3. KUNDEN (customers)

Datei: `js/data.js` - Zeile 79-89

```javascript
customers: [
    { id: 'ZEISS',   name: 'Carl Zeiss AG' },
    { id: 'TRUMPF',  name: 'TRUMPF GmbH' },
    { id: 'BOSCH',   name: 'Robert Bosch GmbH' },
    { id: 'LEICA',   name: 'Leica Microsystems' },
    { id: 'JENOPT',  name: 'Jenoptik AG' },
    { id: 'SICK',    name: 'SICK AG' },
    { id: 'IFM',     name: 'ifm electronic' },
    { id: 'BASLER',  name: 'Basler AG' }
]
```

---

## 4. PRODUKTE (products)

Datei: `js/data.js` - Zeile 91-105

```javascript
products: [
    { id: 'LENS-PCX-25',  name: 'Plankonvexlinse Ø25mm',      material: 'N-BK7',       difficulty: 'standard' },
    { id: 'LENS-PCX-50',  name: 'Plankonvexlinse Ø50mm',      material: 'N-BK7',       difficulty: 'standard' },
    { id: 'LENS-DCX-30',  name: 'Bikonvexlinse Ø30mm',        material: 'N-SF11',      difficulty: 'mittel' },
    { id: 'LENS-ASP-40',  name: 'Asphäre Ø40mm',              material: 'N-BK7',       difficulty: 'hoch' },
    { id: 'PRISM-RA-25',  name: 'Rechtwinkel-Prisma 25mm',    material: 'N-BK7',       difficulty: 'standard' },
    { id: 'PRISM-PENTA',  name: 'Pentaprisma 30mm',           material: 'N-BK7',       difficulty: 'hoch' },
    { id: 'MIRROR-FL-50', name: 'Planspiegel Ø50mm',          material: 'Fused Silica',difficulty: 'mittel' },
    { id: 'MIRROR-SPH-75',name: 'Sphärischer Spiegel Ø75mm',  material: 'Zerodur',     difficulty: 'hoch' },
    { id: 'WINDOW-AR-40', name: 'AR-Fenster Ø40mm',           material: 'N-BK7',       difficulty: 'standard' },
    { id: 'FILTER-BP-25', name: 'Bandpassfilter Ø25mm',       material: 'Fused Silica',difficulty: 'hoch' },
    { id: 'DOUBLET-AC-30',name: 'Achromat Ø30mm',             material: 'N-BK7/N-SF5', difficulty: 'hoch' },
    { id: 'WEDGE-15',     name: 'Keilplatte 15°',             material: 'N-BK7',       difficulty: 'mittel' }
]
```

---

## 5. AUFTRÄGE (orders)

Datei: `js/data.js` - Zeile 129-145

Format: Auftragsnummer, Kunde (id von oben), Produkt (id von oben), Menge, Priorität, Tage bis Fällig

```javascript
orderData: [
    { id: 'AU-2024-0847', customer: 'ZEISS',   product: 'LENS-ASP-40',   qty: 50,   priority: 'critical', daysUntilDue: 2 },
    { id: 'AU-2024-0812', customer: 'TRUMPF',  product: 'PRISM-PENTA',   qty: 25,   priority: 'high',     daysUntilDue: 5 },
    { id: 'AU-2024-0850', customer: 'BOSCH',   product: 'LENS-PCX-50',   qty: 200,  priority: 'normal',   daysUntilDue: 10 },
    { id: 'AU-2024-0833', customer: 'LEICA',   product: 'DOUBLET-AC-30', qty: 30,   priority: 'high',     daysUntilDue: 4 },
    { id: 'AU-2024-0861', customer: 'JENOPT',  product: 'MIRROR-SPH-75', qty: 15,   priority: 'critical', daysUntilDue: 3 },
    { id: 'AU-2024-0829', customer: 'SICK',    product: 'WINDOW-AR-40',  qty: 500,  priority: 'normal',   daysUntilDue: 14 },
    { id: 'AU-2024-0844', customer: 'IFM',     product: 'LENS-PCX-25',   qty: 1000, priority: 'low',      daysUntilDue: 21 },
    { id: 'AU-2024-0855', customer: 'BASLER',  product: 'FILTER-BP-25',  qty: 100,  priority: 'high',     daysUntilDue: 7 },
    { id: 'AU-2024-0839', customer: 'ZEISS',   product: 'PRISM-RA-25',   qty: 80,   priority: 'normal',   daysUntilDue: 12 },
    { id: 'AU-2024-0867', customer: 'TRUMPF',  product: 'MIRROR-FL-50',  qty: 60,   priority: 'normal',   daysUntilDue: 9 },
    { id: 'AU-2024-0871', customer: 'BOSCH',   product: 'LENS-DCX-30',   qty: 150,  priority: 'high',     daysUntilDue: 6 },
    { id: 'AU-2024-0858', customer: 'LEICA',   product: 'WEDGE-15',      qty: 40,   priority: 'normal',   daysUntilDue: 11 },
    { id: 'AU-2024-0875', customer: 'JENOPT',  product: 'LENS-ASP-40',   qty: 20,   priority: 'critical', daysUntilDue: 1 },
    { id: 'AU-2024-0863', customer: 'SICK',    product: 'LENS-PCX-25',   qty: 300,  priority: 'normal',   daysUntilDue: 15 },
    { id: 'AU-2024-0879', customer: 'IFM',     product: 'WINDOW-AR-40',  qty: 200,  priority: 'low',      daysUntilDue: 18 }
]
```

**Prioritäten:** `critical`, `high`, `normal`, `low`

---

## 6. STÖRMELDUNGEN (faults)

Datei: `js/data.js` - Zeile 256-265

```javascript
faults: [
    'Spindeltemperatur zu hoch',
    'Kühlmitteldruck niedrig',
    'Werkzeugbruch erkannt',
    'Positionierungsfehler',
    'Notaus ausgelöst',
    'Kommunikationsfehler SPS',
    'Vakuum nicht erreicht',
    'Schleifscheibe verschlissen'
]
```

---

## 7. MATERIALIEN (materials)

Datei: `js/material-data.js` - Zeile 9-42

```javascript
materials: [
    // === OPTISCHE GLÄSER ===
    { id: 'MAT-BK7-R50',    name: 'N-BK7 Rohling Ø50mm',       category: 'glass',      unit: 'Stk', minStock: 100, leadTime: 14 },
    { id: 'MAT-BK7-R25',    name: 'N-BK7 Rohling Ø25mm',       category: 'glass',      unit: 'Stk', minStock: 200, leadTime: 14 },
    { id: 'MAT-BK7-R75',    name: 'N-BK7 Rohling Ø75mm',       category: 'glass',      unit: 'Stk', minStock: 50,  leadTime: 21 },
    { id: 'MAT-SF11-R30',   name: 'N-SF11 Rohling Ø30mm',      category: 'glass',      unit: 'Stk', minStock: 80,  leadTime: 21 },
    { id: 'MAT-SF5-R30',    name: 'N-SF5 Rohling Ø30mm',       category: 'glass',      unit: 'Stk', minStock: 60,  leadTime: 21 },
    { id: 'MAT-FS-R40',     name: 'Fused Silica Rohling Ø40mm',category: 'glass',      unit: 'Stk', minStock: 40,  leadTime: 28 },
    { id: 'MAT-FS-R25',     name: 'Fused Silica Rohling Ø25mm',category: 'glass',      unit: 'Stk', minStock: 60,  leadTime: 28 },
    { id: 'MAT-ZER-R75',    name: 'Zerodur Rohling Ø75mm',     category: 'glass',      unit: 'Stk', minStock: 20,  leadTime: 42 },

    // === BESCHICHTUNGSMATERIALIEN ===
    { id: 'MAT-MGF2',       name: 'Magnesiumfluorid (MgF2)',   category: 'coating',    unit: 'g',   minStock: 500,  leadTime: 14 },
    { id: 'MAT-SIO2',       name: 'Siliziumdioxid (SiO2)',     category: 'coating',    unit: 'g',   minStock: 1000, leadTime: 7 },
    { id: 'MAT-TIO2',       name: 'Titandioxid (TiO2)',        category: 'coating',    unit: 'g',   minStock: 300,  leadTime: 14 },
    { id: 'MAT-AL2O3',      name: 'Aluminiumoxid (Al2O3)',     category: 'coating',    unit: 'g',   minStock: 400,  leadTime: 14 },
    { id: 'MAT-TA2O5',      name: 'Tantaloxid (Ta2O5)',        category: 'coating',    unit: 'g',   minStock: 200,  leadTime: 21 },
    { id: 'MAT-AG',         name: 'Silber Target',             category: 'coating',    unit: 'Stk', minStock: 5,    leadTime: 14 },
    { id: 'MAT-AL',         name: 'Aluminium Target',          category: 'coating',    unit: 'Stk', minStock: 10,   leadTime: 7 },

    // === VERBRAUCHSMATERIALIEN ===
    { id: 'MAT-POLIT-CER',  name: 'Poliermittel Ceroxid',      category: 'consumable', unit: 'kg', minStock: 20,  leadTime: 7 },
    { id: 'MAT-POLIT-DIA',  name: 'Diamantsuspension 3µm',     category: 'consumable', unit: 'l',  minStock: 10,  leadTime: 14 },
    { id: 'MAT-SCHLEIF-D64',name: 'Diamantschleifscheibe D64', category: 'consumable', unit: 'Stk',minStock: 15,  leadTime: 21 },
    { id: 'MAT-SCHLEIF-D46',name: 'Diamantschleifscheibe D46', category: 'consumable', unit: 'Stk',minStock: 15,  leadTime: 21 },
    { id: 'MAT-KITT-UV',    name: 'UV-Kleber NOA61',           category: 'consumable', unit: 'ml', minStock: 500, leadTime: 14 },
    { id: 'MAT-KITT-OPT',   name: 'Optischer Kitt',            category: 'consumable', unit: 'g',  minStock: 200, leadTime: 21 },

    // === VERPACKUNG ===
    { id: 'MAT-BOX-S',      name: 'Optikbox klein',            category: 'packaging',  unit: 'Stk', minStock: 500,  leadTime: 7 },
    { id: 'MAT-BOX-M',      name: 'Optikbox mittel',           category: 'packaging',  unit: 'Stk', minStock: 300,  leadTime: 7 },
    { id: 'MAT-BOX-L',      name: 'Optikbox groß',             category: 'packaging',  unit: 'Stk', minStock: 200,  leadTime: 7 },
    { id: 'MAT-FOAM',       name: 'Schaumstoffeinlage',        category: 'packaging',  unit: 'Stk', minStock: 1000, leadTime: 5 }
]
```

**Kategorien:** `glass`, `coating`, `consumable`, `packaging`
**leadTime:** Lieferzeit in Tagen

---

## 8. LIEFERANTEN (suppliers)

Datei: `js/material-data.js` - Zeile 132-140

```javascript
suppliers: [
    { id: 'SUP-SCHOTT',   name: 'SCHOTT AG',        category: 'glass',      reliability: 0.95 },
    { id: 'SUP-OHARA',    name: 'Ohara GmbH',       category: 'glass',      reliability: 0.92 },
    { id: 'SUP-HERAEUS',  name: 'Heraeus',          category: 'glass',      reliability: 0.90 },
    { id: 'SUP-UMICORE',  name: 'Umicore',          category: 'coating',    reliability: 0.88 },
    { id: 'SUP-MERCK',    name: 'Merck KGaA',       category: 'coating',    reliability: 0.93 },
    { id: 'SUP-3M',       name: '3M Deutschland',   category: 'consumable', reliability: 0.97 },
    { id: 'SUP-TYROLIT',  name: 'Tyrolit',          category: 'consumable', reliability: 0.91 }
]
```

**reliability:** Liefertreue (0.0 - 1.0)

---

## 9. WATCHLIST - BEOBACHTETE ARTIKEL

Datei: `js/watchlist.js` - Zeile 75-105

**WICHTIG:** `materialId` muss einer ID aus den Materialien (Abschnitt 7) entsprechen!

```javascript
articles: [
    {
        id: 'wl-1',
        materialId: 'MAT-BK7-R50',
        threshold: 80,                              // Alarm wenn Bestand unter diesen Wert fällt
        note: 'Hauptmaterial für Zeiss-Aufträge'
    },
    {
        id: 'wl-2',
        materialId: 'MAT-SF11-R30',
        threshold: 30,
        note: 'Kritisch für BMW HUD Projekt'
    },
    {
        id: 'wl-3',
        materialId: 'MAT-MGF2',                     // Geändert auf gültige Material-ID
        threshold: 100,
        note: 'Lange Lieferzeit - immer im Blick behalten'
    },
    {
        id: 'wl-4',
        materialId: 'MAT-FS-R40',                   // Geändert auf gültige Material-ID
        threshold: 25,
        note: ''
    }
]
```

---

## 10. WATCHLIST - GETRACKTE BESTELLUNGEN

Datei: `js/watchlist.js` - Zeile 108-149

```javascript
orders: [
    {
        id: 'wo-1',
        orderNumber: 'PO-450127',
        materialId: 'MAT-BK7-R50',
        quantity: 200,
        supplier: 'Schott AG',
        daysUntilDelivery: 5,                       // Lieferung in X Tagen
        status: 'confirmed'                         // confirmed, delayed
    },
    {
        id: 'wo-2',
        orderNumber: 'PO-450089',
        materialId: 'MAT-SF11-R30',
        quantity: 50,
        supplier: 'Ohara GmbH',
        daysUntilDelivery: 12,
        originalDaysUntilDelivery: 7,               // Ursprünglich geplant (wenn verzögert)
        status: 'delayed'
    },
    {
        id: 'wo-3',
        orderNumber: 'PO-450156',
        materialId: 'MAT-MGF2',
        quantity: 500,
        supplier: 'Merck KGaA',
        daysUntilDelivery: 21,
        status: 'confirmed'
    }
]
```

**Status:** `confirmed` (bestätigt), `delayed` (verzögert)

---

## KURZÜBERSICHT - WAS KANN ANGEPASST WERDEN?

| Bereich | Anzahl | Datei |
|---------|--------|-------|
| Arbeitsbereiche | 8 | data.js |
| Arbeitsplätze | 40 | data.js |
| Kunden | 8 | data.js |
| Produkte | 12 | data.js |
| Aufträge | 15 | data.js |
| Störmeldungen | 8 | data.js |
| Materialien | 26 | material-data.js |
| Lieferanten | 7 | material-data.js |
| Watchlist Artikel | 4 | watchlist.js |
| Watchlist Bestellungen | 3 | watchlist.js |

---

## HINWEISE

1. **IDs konsistent halten:** Wenn du eine Kunden-ID änderst, muss sie auch in den Aufträgen geändert werden
2. **Material-IDs:** Die Watchlist-Artikel müssen gültige Material-IDs verwenden
3. **Anzahl flexibel:** Du kannst Einträge hinzufügen oder entfernen
4. **Farben:** Hex-Codes wie `#e74c3c` für Rot
5. **Icons:** Emojis oder Zeichen wie `✓`, `⚙️`, etc.

Schick mir die geänderte Version und ich baue sie ein!
