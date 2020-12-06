const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');
const Home = require('../pageobjects/home');
const Search = require('../pageobjects/search');
const Video = require('../pageobjects/video');
const { expect } = require('chai');
const Filters = require('../pageobjects/Filters');
const allureReporter = require('@wdio/allure-reporter').default;

const urlYouTube = 'http://www.youtube.com';

describe('YouTube Video page ', () => {
 
    it.skip('should successfuly stop and play a video', () => {
        allureReporter.addDescription(' - Verify user is able to play/pause video found.')

        const searchWord = 'WebDriverIO';

        Home.open(urlYouTube);
        Home.TopNav.search(searchWord);
        const firstVideo = Search.getVideoSearchList()[0];
        const videoTitle = Search.getVideoTitle(firstVideo);

        firstVideo.click();

        Video.dialogNoThanks();
        Video.pauseVideo();
        browser.pause(4000);
        Video.playVideo();

        expect(videoTitle).contains(Video.getVideoTitle());
        expect(Video.inputSearch.getValue()).equals(searchWord);

    });

});