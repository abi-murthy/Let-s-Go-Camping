package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.awt.*;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class inactivityStepDefs {
    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }

    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @Given("I login with {string} and {string}")
    public void loginWithUserAndPass(String arg0, String arg1) throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys(arg1);
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys(arg1);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);

        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg1);
        driver.findElement(By.id("submit-button")).click();
    }

    @And("I am inactive for at least 60 seconds")
    public void wait60Seconds() throws InterruptedException {
        Thread.sleep(61*1000);
    }


    @And("I click search after 30 seconds")
    public void iClickSearch() throws InterruptedException, AWTException {
        Thread.sleep(30*1000);
        WebElement link = driver.findElement(By.id("search-link"));  // Replace "yourLinkId" with the actual ID of the link
        link.click();
    }

    @And("I am inactive for another 30 seconds")
    public void iAmInactiveForAnotherSeconds() throws InterruptedException {
        Thread.sleep(30*1000);
    }

    @After()
    public void afterTest(){
        driver.quit();
    }

    @Then("I see {string} on the webpage")
    public void iSeeOnTheWebpage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }
}