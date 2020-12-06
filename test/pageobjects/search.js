const Page = require('./page');
const { expect } = require("chai");
const Filters = require('./Filters');
const TopNav = require('./topnav');
const allureReporter = require('@wdio/allure-reporter').default;

class Search extends Page {

    get btnSearchFilter() { return $('paper-button[aria-label="Search filters"]')}
    get containerVideos() { return $('ytd-section-list-renderer[class="style-scope ytd-two-column-search-results-renderer"]')}
    get strNoResultsMsg() { return $('div[class="style-scope ytd-two-column-search-results-renderer"] ytd-item-section-renderer[class="style-scope ytd-section-list-renderer"]  div[class="promo-message style-scope ytd-background-promo-renderer"]')}
    get containerFilters() {  return $('#collapse-content')}
    get TopNav() {return TopNav}


    getVideoSearchList(){
        const listVideoFound = this.containerVideos.$$('ytd-video-renderer[class="style-scope ytd-item-section-renderer"]');
        allureReporter.addStep(' - List all the videos found.  Found '+ listVideoFound.length +' videos beind displayed.');
        console.log(' videos found:  '+listVideoFound.length );
        return listVideoFound;
    }

    getVideoTitle(elementVideo){
        const videoTitle = elementVideo.$('yt-formatted-string').getText();
        allureReporter.addStep(' - Read video title: '+videoTitle);
        return videoTitle;
    }

    getVideoChannelName(elementVideo){
        const videoChannel = elementVideo.$('ytd-channel-name yt-formatted-string[class="style-scope ytd-channel-name"]').getText();
        allureReporter.addStep(' - Read video Channel name: '+videoChannel);
        return videoChannel;
    }

    getVideoDescription(elementVideo){
        const description = elementVideo.$('#description-text span');

        if(description.isExisting() === false){
            return null;
        }else{
            allureReporter.addStep(' - Read video Description: '+description.getText());
            return description.getText();
        }
    }

    getVideoCount(elementVideo){
        const count = elementVideo.$('#metadata-line').$$('span')[0].getText();
        allureReporter.addStep(' - Read video count of views: '+count);
        return count;
    }

    getVideoPostDate(elementVideo){
        const postDate = elementVideo.$('#metadata-line').$$('span')[1].getText();
        allureReporter.addStep(' - Read video Post Date: '+postDate);
        return postDate
    }

    getSearchResultVideos(){
        const listVideos = this.getVideoSearchList();

        var arrayVideos = [];

        for(var i = 0; i <  5; i++){
            var data = {};
            data.title = listVideos[i].$('yt-formatted-string').getText();
            data.author = listVideos[i].$('ytd-channel-name yt-formatted-string[class="style-scope ytd-channel-name"]').getText();
            data.description = listVideos[i].$('#description-text span').getText();
            data.viewCount = listVideos[i].$('#metadata-line').$$('span')[0].getText();
            data.postDate = listVideos[i].$('#metadata-line').$$('span')[1].getText();

            arrayVideos[i] = data;
        }

        return arrayVideos;
    }

    
    getFilterTypes(){
        return this.containerFilters.$$('#filter-group-name yt-formatted-string');
    }

    getFilterSortBySelected(){
        this.btnSearchFilter.click();
       
        // All Filter types
        const columnFilters =  this.containerFilters.$$('ytd-search-filter-group-renderer');
       
        // Find column index for 
        const groupFilterIndex = this.getFilterTypes().findIndex((element, index) => {
            return element.getText() === Filters.FilterGroup.SortBy;
        });

        const typeSortFilter = columnFilters[groupFilterIndex].$$('ytd-search-filter-renderer');

        const selectedSortFilter = typeSortFilter.find((elementFilter) => {
            return elementFilter.$('#endpoint').getAttribute('aria-selected') === 'true';
        });

        this.btnSearchFilter.click();

        return selectedSortFilter.$('yt-formatted-string').getText();
    }

    selectFilterUploadDate(nameFilter){
        this.btnSearchFilter.click();
       
        // All Filter types
        const columnFilters =  this.containerFilters.$$('ytd-search-filter-group-renderer');
       
        // Find column index for 
        const groupFilterIndex = this._getFilterTypes().findIndex((element, index) => {
            return element.getText() === Filters.FilterGroup.SortBy;
        });

        const typeSortFilter = columnFilters[groupFilterIndex].$$('ytd-search-filter-renderer');

        const selectedSortFilter = typeSortFilter.find((elementFilter) => {
            return elementFilter.$('#endpoint').getAttribute('aria-selected') === 'true';
        });

        this.btnSearchFilter.click();

        return selectedSortFilter.$('yt-formatted-string').getText();

    }
}

module.exports = new Search();