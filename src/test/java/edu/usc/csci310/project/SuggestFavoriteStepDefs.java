package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class SuggestFavoriteStepDefs {
    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @Given("{string} logs in for suggest favorites")
    public void logsIntoTheWebpageForCompareFavorites(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();

        driver.get(ROOT_URL+"loginPage");

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);
    }


    @When("the current user adds {string} and {string}")
    public void theCurrentUserAddsAnd(String arg0, String arg1) throws InterruptedException {
        Thread.sleep(4000);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("add-favorite-"+arg0)));
        Thread.sleep(500);
        driver.findElement(By.id("add-favorite-"+arg0)).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("add-favorite-"+arg1)).click();
        driver.findElement(By.id("confirm-add-favorite")).click();

    }

    @And("the current user makes their list public")
    public void theCurrentUserMakesTheirListPublic() throws InterruptedException {
        driver.get(ROOT_URL+ "favoritesPage");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("privacy-status-button")));
        driver.findElement(By.id("privacy-status-button")).click();
        Thread.sleep(1000);
    }

    @And("the current user goes to the public compare page")
    public void theCurrentUserGoesToThePublicComparePage() throws InterruptedException {
        driver.get(ROOT_URL+"publicUserListPage");
        Thread.sleep(1000);
    }

    @And("the current user adds {string} for comparision")
    public void theCurrentUserAddsForComparision(String arg0) throws InterruptedException {
        Thread.sleep(300);
        driver.findElement(By.id("searchbar")).sendKeys(arg0);
        Thread.sleep(300);
        driver.findElement(By.id("search-enter")).click();
        Thread.sleep(1000);
    }

    @And("they click the suggest button")
    public void theyClickTheSuggestButton() throws InterruptedException {
        Thread.sleep(6000);
        driver.findElement(By.id("suggest-button")).click();
        Thread.sleep(6000);
    }


    @Then("they should see {string}")
    public void theyShouldSee(String arg0) throws InterruptedException {
        Thread.sleep(6000);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @After
    public void teardown(){
        driver.quit();
    }

    @And("The user clicks on the park name in the comparison")
    public void theCurrentUserClicksOnTheParkNameInTheSuggestion() throws InterruptedException {
        Thread.sleep(5000);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("title-abli")));
        driver.findElement(By.id("title-abli")).click();
        Thread.sleep(500);
    }
}
