package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class SearchStepDefs {

    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @Given("I signup and login for search with username {string}")
    public void iSignupAndLoginForSearchWithUsername(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();
    }

    @Then("I should see {string} on the webpage for search")
    public void iShouldSeeOnTheWebpageForSearch(String arg0) throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div/div/div[6]/ul")));

        assertTrue(driver.getPageSource().contains(arg0));
    }

    @Then("I should see {string} on da page")
    public void seeOnSite(String arg0) throws InterruptedException {
        Thread.sleep(7000);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @Then("I shouldn't see {string} on the page")
    public void dontSeeString(String arg0) throws InterruptedException {
        Thread.sleep(7000);
        assertFalse(driver.getPageSource().contains(arg0));
    }

    @When("I enter the term {string} to search by")
    public void iEnterTheTermToSearchBy(String arg0) throws InterruptedException {
//        WebDriverWait wait = new WebDriverWait(driver,Duration.ofMinutes(2));
//        wait.until(ExpectedConditions.visibilityOfElementLocated(
//                By.xpath("/html/body/div[1]/div/div/div/div/div[6]/ul")));

        Thread.sleep(1500);
        driver.findElement(By.id("nameSelector")).click();
        Thread.sleep(500);
        driver.findElement(By.id("nameSelection")).sendKeys(arg0);
    }
//
    @And("I press enter to search")
    public void iPressEnterToSearch() throws InterruptedException {
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).sendKeys(Keys.RETURN);
    }

    @And("I search by state with the term {string}")
    public void iSearchByStateWithTheTerm(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        WebElement topicSelectorButton = driver.findElement(By.id("stateSelector"));
        topicSelectorButton.click();

        Thread.sleep(500);

        Select topicDropdown = new Select(driver.findElement(By.id("stateSelection")));
        topicDropdown.selectByVisibleText(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();

    }
//
    @And("I search by topic with the term {string}")
    public void iSearchByTopicWithTheTerm(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        WebElement topicSelectorButton = driver.findElement(By.id("topicSelector"));
        topicSelectorButton.click();

        Thread.sleep(500);

        Select topicDropdown = new Select(driver.findElement(By.id("topicSelection")));
        topicDropdown.selectByVisibleText(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();
    }

    @And("I search by activity with the term {string}")
    public void iSearchByActivityWithTheTerm(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        WebElement topicSelectorButton = driver.findElement(By.id("activitySelector"));
        topicSelectorButton.click();

        Thread.sleep(500);

        Select topicDropdown = new Select(driver.findElement(By.id("activitySelection")));
        topicDropdown.selectByVisibleText(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();

    }

    @And("I search by amenity with the term {string}")
    public void iSearchByAmenityWithTheTerm(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        WebElement topicSelectorButton = driver.findElement(By.id("amenitySelector"));
        topicSelectorButton.click();

        Thread.sleep(500);

        Select topicDropdown = new Select(driver.findElement(By.id("amenitySelection")));
        topicDropdown.selectByVisibleText(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();
    }

    @After
    public void after(){
        driver.quit();
    }

    @Given("I login for search with username {string}")
    public void iLoginForSearchWithUsername(String arg0) throws InterruptedException {
        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();
    }

    @And("I wait for search results to load")
    public void iWaitForSearchResultsToLoad() throws InterruptedException {
        Thread.sleep(5000);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("parks-list")));
    }

    @And("I wait")
    public void waitForTime() throws InterruptedException {
        Thread.sleep(5000);
    }

    @Then("I should see {int} search results")
    public void iShouldSeeSearchResults(int arg0) {
        List<WebElement> elements = driver.findElements(By.cssSelector("li.my-5"));
        assertEquals(arg0, elements.size());
    }

    @And("I press on load more button")
    public void iPressOnLoadMoreButton() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("load-more-button")).click();
    }
}
