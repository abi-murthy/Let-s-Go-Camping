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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ParkCardStepDefs {

    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }

    //private final WebDriver driver = new ChromeDriver(chromeOptions);
    private final WebDriver driver = new ChromeDriver(chromeOptions);
    //"I sign up and login using the username {string}"
    @Given("I sign up and login using the username {string}")
    public void iSignUpAndLoginUsingTheUsername(String arg0) throws InterruptedException {
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

    @When("I wait for the results to show on the search page")
    public void iWaitForTheResultsToShowOnTheSearchPage() throws InterruptedException {
        Thread.sleep(5000);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("parks-list")));
        
    }

    @And("I click the see more button for the first result")
    public void iClickTheSeeMoreButtonForTheFirstResult() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("abli-see-more-button")).click();
        
    }

    @And("I navigate through activities, amenities, location, and fees")
    public void iNavigateThroughActivitiesAmenitiesLocationAndFees() throws InterruptedException {
        WebElement parkCard = driver.findElement(By.id("abli-park-card"));
        WebElement activitySection = parkCard.findElement(By.id(":r0:-tab-0"));
        WebElement amenitiesSection = parkCard.findElement(By.id(":r0:-tab-1"));
        WebElement locationSection = parkCard.findElement(By.id(":r0:-tab-2"));
        WebElement feeSection = parkCard.findElement(By.id(":r0:-tab-3"));

        Thread.sleep(2000);
        activitySection.click();
        Thread.sleep(2000);
        amenitiesSection.click();
        Thread.sleep(2000);
        locationSection.click();
        Thread.sleep(2000);
        feeSection.click();
    }

    @Then("I should see more information about the park")
    public void iShouldSeeMoreInformationAboutThePark() throws InterruptedException {
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains("Activities"));
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains("Amenities"));
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains("Location"));
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains("Entrance Fee"));
    }

    @Given("I login using the username {string}")
    public void iLoginUsingTheUsername(String arg0) throws InterruptedException{
        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();
    }

    @And("I click on the name for the first result to expand park")
    public void iClickOnTheNameForTheFirstResultToExpandPark() throws InterruptedException{
        Thread.sleep(500);
        driver.findElement(By.id("name-for-abli")).click();
    }

    @And("I click on the name for the first result to close park")
    public void iClickOnTheNameForTheFirstResultToClosePark() throws InterruptedException{
        Thread.sleep(500);
        driver.findElement(By.id("name-for-abli")).click();
    }

    @And("I click on the park link displayed for the first result")
    public void iClickOnTheParkLinkDisplayedForTheFirstResult() throws InterruptedException {
        Thread.sleep(500);
        driver.findElement(By.id("abli-park-url")).click();
    }

    @Then("I should see {string} on the new web page")
    public void iShouldSeeOnTheNewWebPage(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @And("I click on the activity button")
    public void iClickOnTheActivityButton() throws InterruptedException {
        Thread.sleep(1000);
        WebElement parkCard = driver.findElement(By.id("abli-park-card"));
        WebElement activitySection = parkCard.findElement(By.id(":r0:-tab-0"));
        Thread.sleep(1000);
        activitySection.click();
    }

    @And("I click on the first activity listed to search")
    public void iClickOnTheFirstActivityListedToSearch() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("abli-Astronomy")).click();
    }

    @Then("I should see {string} on the web page")
    public void iShouldSeeOnTheWebPage(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @And("I click on the amenity button")
    public void iClickOnTheAmenityButton() throws InterruptedException {
        Thread.sleep(1000);
        WebElement parkCard = driver.findElement(By.id("abli-park-card"));
        WebElement activitySection = parkCard.findElement(By.id(":r0:-tab-1"));
        Thread.sleep(1000);
        activitySection.click();
    }

    @And("I click on the first amenity listed to search")
    public void iClickOnTheFirstAmenityListedToSearch() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("abli-Accessible Rooms")).click();
    }

    @And("I click on the location link to search by")
    public void iClickOnTheLocationLinkToSearhBy() throws InterruptedException {

        Thread.sleep(1000);
        driver.findElement(By.id("abli-KY-button")).click();

    }

    @And("I click on the location button")
    public void iClickOnTheLocationButton() throws InterruptedException {
        Thread.sleep(1000);
        WebElement parkCard = driver.findElement(By.id("abli-park-card"));
        WebElement activitySection = parkCard.findElement(By.id(":r0:-tab-2"));
        Thread.sleep(1000);
        activitySection.click();
    }

    @After
    public void after() {
        driver.quit();
    }
}
