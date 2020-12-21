'use strict'

const myKey = 'WdKimUWcQMSXrPYdk1gLJctPdAfe0MJuLJictOvl';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
         $('#results-list').append(`<li>Name: ${responseJson.data[i].fullName} <br><br> Website: ${responseJson.data[i].url} <br><br> Description: ${responseJson.data[i].description}</li>`)
         $('.results').removeClass('hidden');
    }
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params) 
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function findParkResults(searchTerm, stateSearch, maxResults) {
    const params = {
        api_key: myKey,
        limit: maxResults,
        stateCode: stateSearch,
        q: searchTerm
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })       
        .then((responseJson) => {
            console.log('my results', responseJson);
            displayResults(responseJson);
          })
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`)
        });
}

function formSearch() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const stateSearch = $('#js-state-search').val();
        let maxResults = $('#js-max-results').val();
        if (!maxResults) {
            maxResults = 10;
        }
        findParkResults(searchTerm, stateSearch, maxResults);
    });
}

$(formSearch);