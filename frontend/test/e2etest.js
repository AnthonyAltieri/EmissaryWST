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
        site = 'http://localhost:3000/'; // Was 4941

    }
})

test.describe("Landing Page", function() {
    test.it("Checks landing home", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
        // Check if title of website is correct
            .then(() => driver.getTitle())
            .then(title => title.should.equal('Emissary'))
            .then(() => driver.getCurrentUrl())
            .then(URL => URL.should.equal(site))

            // Check if buttons exist with correct labels
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Features')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Pricing')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Log in')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Sign up')]")))
    });
    test.it("Checks if features menu button displays correct content", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)

        // Check if content is correct
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Features')]")).click())
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Automated Check-in')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Minimize the work of" +
                " your receptionist or completely replace them')]")))
            // Check if next button works
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Next')]")).click())
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Customizable')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Change the look, feel, and" +
                " content of your forms through our Form Builder')]")))

            // Check if previous button works
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Previous')]")).click())
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Automated Check-in')]")))
    });
    test.it("Checks if pricing menu button displays correct content", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)

        // Check if Pricing Box is displayed
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Pricing')]")).click())

            // Check if Subscription Box is displayed
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Subscription')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Unlimited visitors and employees')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Sync employees with Slack')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Form Builder - Customizable check-in forms')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), '$20')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'month')]")))

            // Check if the Free Trial Box is displayed
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Free Trial')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Try Emissary for two weeks')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Easy sign up process, be ready in no time')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Free')]")))
    });
});

test.describe("Log In Page", function() {
    test.it("Log in page loads", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Log in')]")).click())
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'No Account?')]")))
    });
});

test.describe("Register Page", function() {
    test.it("Checks Register Page Loads", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Sign up')]")).click())
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Create Business Account')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Already have a Business Account?')]")))
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Already created an account?')]")))
    });
});

test.describe("Landing Page 2", function() {
   test.it("Checks landing home", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
           .then(() => driver.getCurrentUrl())
           .then(URL => URL.should.equal(site))
   });
});

test.describe("Log In 2", function() {
    test.it("Log in popup", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Log in')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div/div/input")).sendKeys('email1001@gmail.com'))
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[2]/div/div/input")).sendKeys('admin'))
    });
});

test.describe(("Pricing 2"), function() {
    test.it("Pricing popup", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Pricing')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[1]/div/p")))
    });

});

test.describe(("Features 2"), function() {
    test.it("Pricing popup", function() {
        this.timeout(mochaTimeOut);
        driver.get(site)
            .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Features')]")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/div/div[2]/button")).click())
            .then(() => driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div/button")).click())
    });
});

test.describe(("Register Page 2"), function() {
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
