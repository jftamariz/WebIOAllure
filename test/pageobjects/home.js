const Page = require('./page');
const { expect } = require("chai");
const waitForElement = require('../util').waitElement;
const TopNav = require('./topnav');
const allureReporter = require('@wdio/allure-reporter').default;

class Home extends Page {

    get strSubtitle(){ return $('div[id="headingSubtext"]')}
    get videosTrending(){ return $$('#contents > ytd-rich-item-renderer')}
    get promoBanner() {return $('[class="ytd-banner-promo-renderer-content style-scope ytd-banner-promo-renderer"]')}
    get containerVideos() { return $('ytd-item-section-renderer[class="style-scope ytd-section-list-renderer"]')}
    get TopNav() {return TopNav}

    open (path) {
        super.open(path);
    }



    getTrendingVideos(){
        console.log(' videos: '+ this.videosTrending.length);
       
        this.videosTrending[1].click();
        const videoTitle = this.videosTrending[1].$('yt-formatted-string[id="video-title"]').getText();
        console.log('\n\n video title: '+ videoTitle+'\n\n');
      
    }

}


module.exports = new Home();