const allureReporter = require('@wdio/allure-reporter').default;

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        allureReporter.startStep(' - Navigate to '+path);
        browser.url(path)
        allureReporter.endStep('passed');
    }


}
