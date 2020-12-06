const Page = require('./page');
const { expect } = require("chai");
const Filters = require('./Filters');
const waitForElement = require('../util').waitElement;
const allureReporter = require('@wdio/allure-reporter').default;

class TopNav extends Page {

    get inputSearch(){ return $('input[id="search"]')}
    get btnSearch() { return $('button[id="search-icon-legacy"]')}
    get containerVideos() { return $('ytd-section-list-renderer[class="style-scope ytd-two-column-search-results-renderer"]')}

    get btnSignIn() { return $('[aria-label="Sign in"]') }
    get inputEmail(){ return $('input[id="identifierId"]')}
    get inputPassword(){ return $('input[type="password"]')}
    get btnNext(){ return $('div[id="identifierNext"]')}

    get btnGuide() {  return $('button[aria-label="Guide"]')}
    get btnSignIn() { return $('[aria-label="Sign in"]') }
    
    get btnSettings() { return $('button[aria-label="Settings"]')}
    get btnApps() { return $('button[aria-label="YouTube apps"]')}
    get btnCreate() { return $('button[aria-label="Create"]')}

    get btnHistory() { return $('a[href="/feed/history"]')}


    search(searchText){

        allureReporter.startStep(' - YouTube search for: '+ searchText);
        this.inputSearch.clearValue();
        this.inputSearch.setValue(searchText);
        this.btnSearch.click();

        // Wait for Search page to load
        waitForElement(this.containerVideos, 25000);
        allureReporter.endStep('passed');
        
    }
    
    signIn(email, password){
        console.log(' Email: ${email}');
        this.btnSignIn.click();
        this.inputEmail.setValue(email);
        this.btnNext.click();
    }


    expandGuide(){
        if(this.btnGuide.getAttribute('aria-pressed') === 'false'){
            this.btnGuide.click();
        }
    }

    collapseGuide(){
        if(this.btnGuide.getAttribute('aria-pressed') === 'true'){
            this.btnGuide.click();
        }
    }

    clickHistory(){
        allureReporter.addStep(' - View History of videos previously watched');
        this.expandGuide();
        this.btnHistory.click();
        this.collapseGuide();
    }
    /*
    expandYouTubeApps(){

    }

    expandSettings(){

    }*/

}
module.exports = new TopNav();