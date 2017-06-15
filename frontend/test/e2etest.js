require('chai').should();

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until
    username = "kkuo42"
    accessKey = "c03f2778-8165-49a9-9274-bb27dc98e284";

var test = require('selenium-webdriver/testing');
var assert = require('assert');

// can't run end2end tests on something that isn't deployed yet
/*if(process.env.TRAVIS_BRANCH !== 'develop') {
    console.log("E2E testing skipped, develop CI");
    return;
}*/

const mochaTimeOut = 30000;

var driver;
var site;

test.before(function() {
    this.timeout(mochaTimeOut);
    if(process.env.TRAVIS_BRANCH === 'master') {
        console.log("E2E testing on staging branch, master CI");
        driver = new webdriver.Builder().
            withCapabilities({
                'browserName': 'chrome',
                'platform': 'Windows XP',
                'version': '43.0',
                'username': username,
                'accessKey': accessKey
            }).
            usingServer("http://" + username + ":" + accessKey +
                        "@ondemand.saucelabs.com:80/wd/hub").
            build();
        site = 'https://cse112-1-staging.herokuapp.com/';
    }
    else {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        site = 'http://localhost:3000/';
    }
})

test.describe("Landing Page", function() {
   test.it("Checks landing home", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
           .then(() => driver.getCurrentUrl())
           .then(URL => URL.should.equal(site))
   });
});

test.describe("Log In", function() {
    test.it("Log in popup", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Log in')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div/div/input")).sendKeys('email1001@gmail.com'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[2]/div/div/input")).sendKeys('admin'))
    });
});

test.describe(("Pricing"), function() {
    test.it("Pricing popup", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Pricing')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div/p")))
    });
});

test.describe(("Features"), function() {
    test.it("Pricing popup", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Features')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div/div[2]/button")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/button")).click())
    });
});

test.describe(("Register Page"), function() {
    test.it("Register form", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Sign up')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[1]/div/div/input")).sendKeys('email00@gmail.com'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[2]/div/div/input")).sendKeys('UCSD'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[3]/div/div/input")).sendKeys('9999999999'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[6]/div/button/div/div/span")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[1]/div/div/input")).sendKeys('email001@gmail.com'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[2]/div/div/input")).sendKeys('John'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[3]/div/div/input")).sendKeys('Doe'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[5]/div/div/input")).sendKeys('0000000000'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div[6]/div/div/input")).sendKeys('admin'))
    });
});


test.afterEach(function() {
    driver.manage().deleteAllCookies();
});

test.after(function() {
    driver.quit();
});