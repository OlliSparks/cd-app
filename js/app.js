// CD-App Main JavaScript

const app = {
    currentView: 'collection',

    init() {
        this.bindNavigation();
        this.showView('collection');
        console.log('CD-App initialized');
    },

    bindNavigation() {
        // Mobile bottom nav
        document.querySelectorAll('#bottom-nav button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showView(btn.dataset.view);
            });
        });

        // Desktop main nav
        document.querySelectorAll('.main-nav a[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showView(link.dataset.view);
            });
        });
    },

    showView(view) {
        this.currentView = view;

        // Update mobile nav buttons
        document.querySelectorAll('#bottom-nav button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Update desktop nav
        document.querySelectorAll('.main-nav a[data-view]').forEach(link => {
            link.classList.toggle('active', link.dataset.view === view);
        });

        // Update main content
        const main = document.querySelector('main');
        switch(view) {
            case 'collection':
                main.innerHTML = '<h2>Übersicht</h2><p>Willkommen zur CD-App!</p>';
                break;
            case 'add':
                main.innerHTML = '<h2>Hinzufügen</h2><p>Hier kannst du neue Einträge erfassen.</p>';
                break;
            case 'settings':
                main.innerHTML = '<h2>Einstellungen</h2><p>App-Einstellungen</p>';
                break;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
