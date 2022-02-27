const puppeteer = require("puppeteer")
const codeObj = require("./codes")
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "yivola7560@submic.com";
const password = "Jainul@123"

let page
const browseropen = puppeteer.launch({
    headless: false,

    args: ['--start-maximized'],

    defaultViewport: null
});

browseropen
    .then(function(browserObj) {
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;
    })
    .then(function(newTab) {
        page = newTab
        let hackerRankOpenPromise = newTab.goto(loginLink);
        return hackerRankOpenPromise;
    })
    .then(function() {
        let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 });
        return emailIsEntered;
    })
    .then(function() {
        let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 });
        return passwordIsEntered;
    })
    .then(function() {
        let loginButtonClicked = page.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled', { delay: 50 });
        return loginButtonClicked;
    })
    .then(function() {
        let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
        return clickOnAlgoPromise
    })
    .then(function() {
        let getToWarmUp = waitAndClick('input[value="warmup"]', page);
        return getToWarmUp;
    }).then(function() {
        let waitfor3seconds = page.waitFor(3000);
        return waitfor3seconds;
    }).then(function() {
        let ChallengesPromise = waitAndClick('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled', page);
        return ChallengesPromise;
    })
    .then(function() {
        console.log("made");
        let questionWillBeSolved = questionSolver(page, codeObj.answers);
        return questionWillBeSolved;
    })


function waitAndClick(selector, cPage) {
    return new Promise(function(resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function() {
            let clickModel = cPage.click(selector);
            return clickModel;
        }).then(function() {
            resolve();
        }).catch(function(err) {
            reject();
        })
    })
}

function questionSolver(cpage, answer) {
    console.log("enter");
    return new Promise(function(resolve, reject) {
        console.log("in");
        let EditorPromise = waitAndClick('.monaco-editor.no-user-select.vs', cpage);
        EditorPromise.then(function() {
                console.log("inside");
                return waitAndClick('input[type="checkbox"]', cpage);
            })
            .then(function() {
                return cpage.waitForSelector('.input.text-area.custominput.auto-width', cpage)
            }).then(function() {
                return cpage.type('.input.text-area.custominput.auto-width', answer, { delay: 1000 })
            }).then(function() {
                let ctrlIsPressed = cpage.keyboard.down("Control");
                return ctrlIsPressed
            }).then(function() {
                let AisPressed = cpage.keyboard.press("A", { delay: 100 })
                return AisPressed;
            }).then(function() {
                let XisPressed = cpage.keyboard.press("X", { delay: 100 });
                return XisPressed
            }).then(function() {
                let ctrlIsUnpressed = cpage.keyboard.up("Control");
                return ctrlIsUnpressed
            }).then(function() {
                let mainEditor = waitAndClick('.monaco-editor.no-user-select.vs', cpage);
                return mainEditor;
            }).then(function() {
                let ctrlIsPressed = cpage.keyboard.down("Control");
                return ctrlIsPressed
            }).then(function() {
                let AisPressed = cpage.keyboard.press("A", { delay: 100 })
                return AisPressed;
            }).then(function() {
                let VisPressed = cpage.keyboard.press("V", { delay: 100 })
                return VisPressed;
            }).then(function() {
                let ctrlIsUnpressed = cpage.keyboard.up("Control");
                return ctrlIsUnpressed
            }).then(function() {
                console.log("submit");
                let submit = cpage.click('.hr-monaco-submit', { delay: 100 });
                return submit;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                console.log(err);
                reject();
            })
    })
}