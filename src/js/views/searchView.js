class SearchView {
    _parentElement = document.querySelector('.search');

    getQuery() {
        return this._parentElement.querySelector('.search__field').value;
    }
}

export default new SearchView();