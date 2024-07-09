package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class MyStepdefs {

    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);


    @Given("I am on the search page")
    public void iAmOnTheSearchPage() {
        driver.get(ROOT_URL + "SearchPage");
    }


    @When("I type {string} in the search box")
    public void iTypeInTheSearchBox(String arg0) throws InterruptedException {
        WebElement topicSelectorButton = driver.findElement(By.id("nameSelector"));
        topicSelectorButton.click();
        Thread.sleep(1000);
        driver.findElement(By.id("nameSelection")).sendKeys(arg0);
    }


    @And("I click the submit button")
    public void iClickTheSubmitButton() throws InterruptedException {
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(10000);
    }


    @Then("I should see {string} results")
    public void iShouldSeeResults(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }


    @When("I select {string} state")
    public void iSelectState(String arg0) {
        WebElement stateDropdown = driver.findElement(By.id("stateSelection"));
        Select select = new Select(stateDropdown);
        select.selectByValue(arg0);
    }


    @When("I select {string} topic")
    public void iSelectTopic(String arg0) throws InterruptedException {
        WebElement topicSelectorButton = driver.findElement(By.id("topicSelector"));
        topicSelectorButton.click();

        Thread.sleep(1000);

        Select topicDropdown = new Select(driver.findElement(By.id("topicSelection")));
        topicDropdown.selectByVisibleText(arg0);
    }

    @When("I select {string} activity")
    public void iSelectActivity(String arg0) throws InterruptedException {
        WebElement activitySelectorButton = driver.findElement(By.id("activitySelector"));
        activitySelectorButton.click();

        Thread.sleep(1000);

        WebElement activityDropdown = driver.findElement(By.id("activitySelection"));
        Select select = new Select(activityDropdown);
        select.selectByVisibleText(arg0);
    }

    @After
    public void after() {
        driver.quit();
    }
}

