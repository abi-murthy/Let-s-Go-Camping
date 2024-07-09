package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class httpsStepDefs {
    private static final String ROOT_URL = "https://localhost:8080/";
    private static final String ROOT_URL_HTTP = "http://localhost:8080/";

    private static final ChromeOptions chromeOptions;



    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }

    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @Given("I navigate to the website from http")
    public void navigateToHttp(){
        driver.get(ROOT_URL_HTTP);
    }

    @Given("I navigate to the website from https")
    public void navigateToHttps(){
        driver.get(ROOT_URL);
    }

    @Then("I should see {string}")
    public void iShouldSee(String arg0) throws InterruptedException {
        Thread.sleep(100);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @After
    public void after() {
        driver.quit();
    }



}
