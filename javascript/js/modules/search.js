class Search {
    // 1. describe and create/iniate our object
    constructor() {
        this.searchResults = document.querySelector('.search-overlay__results');
        this.searchButton = document.querySelector('.search-button');
        this.closeButton = document.querySelector('.search-overlay__close');
        this.searchOverlay = document.querySelector('.search-overlay');
        this.searchField = document.querySelector('.search-term');
        this.events();
        this.isOverlayOpen = false;
        this.hasSpinner = false;
        this.previousValue,
            this.typingTimer;
    }

    // 2. events
    events() {
        this.searchButton.addEventListener('click', this.openOverlay.bind(this));
        this.closeButton.addEventListener('click', this.closeOverlay.bind(this));
        window.addEventListener("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
    }


    // 3. methods (function, action) 

    typingLogic() {

        if (this.searchField.value != this.previousValue) {
            clearTimeout(this.typingTimer);

            if (this.searchField.value) {
                if (!this.hasSpinner) {
                    this.searchResults.innerHTML = "searching...";
                    this.hasSpinner = true;
                    this.typingTimer = setTimeout(this.getResults.bind(this), 1);
                }
            } else {
                this.searchResults.innerHTML = "";
                this.hasSpinner = false;
            }

        }


        this.previousValue = this.searchField.value;
    }

    getResults() {
        this.searchResults.innerHTML = "search results here";
        //    this.hasSpinner = false;       

        const searchField = this.searchField.value;
        const url = `http://localhost:3000/assets/${searchField}`
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                let hallo = "";
                myJson.Durak.Athletes.forEach(athlete => {
                    hallo +=  `<li>${athlete.Name}</li>`;
                })
                this.searchResults.innerHTML = hallo;
            }); 

    }

    keyPressDispatcher(event) {
        const key = event.keyCode;

        if (key === 83 && !this.isOverlayOpen && document.querySelector('input', 'textarea') != document.activeElement) {
            this.openOverlay();
        }

        if (key === 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }

    }

    openOverlay() {
        this.searchOverlay.classList.add('x--active');
        document.body.classList.add('x--no-scroll');
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.classList.remove('x--active');
        document.body.classList.remove('x--no-scroll');
        this.isOverlayOpen = false;
    }

}

export default Search;