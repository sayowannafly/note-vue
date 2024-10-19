const App = {
    data() {
        return {
            placeholderString: 'Введите название',
            title: 'Список заметок',
            comp: 'Выполнено',
            inputValue: '',
            notes: this.loadNotes(),
            res: this.loadCompletedCount(),
            deleted: 'Удалено',
            resd: this.loadDeletedCount(),
        }
    },
    methods: {
        inputChangeHandler(event) {
            this.inputValue = event.target.value;
        },
        addNewNote() {
            if (this.inputValue.trim() !== '') {
                this.notes.push(this.inputValue.trim());
                this.saveNotes();
                this.inputValue = '';
            }
        },
        removeNote(idx) {
            this.notes.splice(idx, 1);
            this.resd++;
            this.saveNotes();
            this.saveDeletedCount();
        },
        completeNote(idx) {
            this.notes.splice(idx, 1);
            this.res++;
            this.saveNotes();
            this.saveCompletedCount();
        },
        deleteAllNotes() {
            this.resd += this.notes.length;
            this.notes = [];
            this.saveNotes();
            this.saveDeletedCount();
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        loadNotes() {
            const savedNotes = localStorage.getItem('notes');
            return savedNotes ? JSON.parse(savedNotes) : [];
        },
        saveCompletedCount() {
            localStorage.setItem('completedCount', this.res);
        },
        loadCompletedCount() {
            const savedCount = localStorage.getItem('completedCount');
            return savedCount ? parseInt(savedCount) : 0;
        },
        saveDeletedCount() {
            localStorage.setItem('deletedCount', this.resd);
        },
        loadDeletedCount() {
            const savedCount = localStorage.getItem('deletedCount');
            return savedCount ? parseInt(savedCount) : 0;
        }
    }
}

Vue.createApp(App).mount('#app');
