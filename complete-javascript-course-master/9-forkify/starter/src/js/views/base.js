export const elements = {
    searchResList: document.querySelector('.results__list'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"A></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}