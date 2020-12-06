const Page = require('./page');
const { expect } = require("chai");
const waitForElement = require('../util').waitElement;
const allureReporter = require('@wdio/allure-reporter').default;

class Video extends Page{

    get btnVideoPlayPause() {  return $('button[class="ytp-play-button ytp-button"]')}
    get videoTitle() {  return $('h1 yt-formatted-string[class="style-scope ytd-video-primary-info-renderer"]')}
    get noThanks() {  return $('paper-button[class="style-scope ytd-button-renderer style-text size-default"]')}
    get dialog()  { return $('ytd-mealbar-promo-renderer[class="style-scope ytd-popup-container"]')}

    get inputSearch(){ return $('input[id="search"]')}
    get btnSearch() { return $('button[id="search-icon-legacy"]')}

    dialogNoThanks(){
        // Dismiss Dialog
        if(waitForElement(this.dialog, 8000)){
            allureReporter.addStep(' - Dismiss Dialog. click on No Thanks');
            this.noThanks.click();
        }
    }

    getVideoTitle(){
        return this.videoTitle.getText();
    }

    pauseVideo(){   
        if(this.btnVideoPlayPause.getAttribute('aria-label').includes('Pause')){
            allureReporter.addStep(' - Pause Video');
            this.btnVideoPlayPause.click();
        }
    }

    playVideo(){
        this.btnVideoPlayPause.waitForDisplayed({timeout : 6000});
        if(this.btnVideoPlayPause.getAttribute('aria-label').includes('Play')){
            allureReporter.addStep(' - Play Video');
            this.btnVideoPlayPause.click();
        }
    }

}
module.exports = new Video();