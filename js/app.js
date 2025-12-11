// CD-App Main JavaScript

const app = {
    currentView: 'collection',
    
    init() {
        this.bindNavigation();
        this.showView('collection');
        console.log('CD-App initialized');
    },
    
    bindNavigation() {
        document.querySelectorAll('#bottom-nav button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showView(btn.dataset.view);
            });
        });
    },
    
    showView(view) {
        this.currentView = view;
        
        // Update nav buttons
        document.querySelectorAll('#bottom-nav button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update main content
        const main = document.querySelector('main');
        switch(view) {
            case 'collection':
                main.innerHTML = '<h2>Meine Sammlung</h2><p>Noch keine CDs vorhanden.</p>';
                break;
            case 'add':
                main.innerHTML = '<h2>CD hinzufügen</h2><p>Hier kannst du neue CDs erfassen.</p>';
                break;
            case 'settings':
                main.innerHTML = '<h2>Einstellungen</h2><p>App-Einstellungen</p>';
                break;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
