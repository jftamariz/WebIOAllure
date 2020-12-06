const { expect } = require('chai');
const Home = require('../pageobjects/home');
const Search = require('../pageobjects/search');
const allureReporter = require('@wdio/allure-reporter').default;
const urlYouTube = 'http://www.youtube.com';

describe('YouTube home page ', () => {
    it.skip('displays UI default state', () => {
        allureReporter.addDescription(' - Verify UI elements state when user lands on http://wwww.youtube.com')
        
        Home.open(urlYouTube);

        expect(Home.videosTrending.length).to.be.greaterThan(0);
        expect(Home.promoBanner.isDisplayed()).to.equals(true);
        expect(Home.TopNav.btnSignIn.isDisplayed()).to.equals(true);
        browser.pause(9000);
        Home.TopNav.clickHistory();        
        
    });

    it.skip('should succesfuly display video search result', () => {
        allureReporter.addDescription(' - Verify video search result.');
        
        Home.open(urlYouTube);
        Home.TopNav.search('jockertt');
        
        const videos = Search.getVideoSearchList();
        const firstVideo = videos[1]
        const videoTitle = Search.getVideoTitle(firstVideo);
        const videoChannelName = Search.getVideoChannelName(firstVideo);
        const videoViewCount = Search.getVideoCount(firstVideo);
        const videoPostDate = Search.getVideoPostDate(firstVideo);
        const videoDescription = Search.getVideoDescription(firstVideo);

        expect(videos.length).to.be.greaterThan(0);
        expect(Search.btnSearchFilter.isDisplayed()).to.equals(true);
        expect(videoTitle).not.equal('');
        expect(videoChannelName).not.equal('');
        expect(videoViewCount).not.equal('');
        expect(videoPostDate).not.equal('');
        expect(videoDescription).to.equals(null);
    });

    it.skip('should display No Results Found', () => {
        allureReporter.addDescription('- Verify video search results in No matches');
        Home.open(urlYouTube);
        Home.TopNav.search('070houh');

        expect(Search.strNoResultsMsg.getText()).equal('No results found\nTry different keywords or remove search filters');
        expect(Search.strNoResultsMsg.isDisplayed()).to.equal(true);
    });

    it('should filter video search results', () => {
        allureReporter.addDescription(' - Verify videos are correctly filtered when enabled');
        Home.open(urlYouTube);
        Home.TopNav.search('WebDriverIO');
        
        expect(Search.getFilterSortBySelected()).equals("Relevance");        
        expect(Search.getFilterTypes().length).equals(5);

    });
});


