import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//     module.hot.accept();
// }

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();
        //1. Loading recipe
        await model.loadRecipe(id);

        //2. Rendering the recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function() {
    try {
        resultsView.renderSpinner();

        //1. Get search query
        const query = searchView.getQuery();
        if (!query) return;

        //2. Load search results
        await model.loadSearchResults(query);

        //3. Render Results
        // console.log(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        //4. Render Inital Pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function(goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
    //Update reciepe servings(in state)
    model.updateServings(newServings);
    //Update the recipe view
    recipeView.render(model.state.recipe);
};
const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};

init();