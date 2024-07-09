package edu.usc.csci310.project;


import io.cucumber.java.After;
import io.cucumber.java.en.And;
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
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class FavoritesStepDef {

    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @When("I login to the wep app for favorites")
    public void iLoginToTheWebAppForFavorites() throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys("TestUser");
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys("TestPass1");
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys("TestPass1");
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys("TestUser");
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("TestPass1");
        driver.findElement(By.id("submit-button")).click();
    }

    @When("I sign up with user {string} and pass {string} to the wep app for favorites")
    public void iSignUpWithUserAndPassToTheWepAppForFavorites(String arg0, String arg1) throws InterruptedException {
        driver.get(ROOT_URL + "SignUpPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys(arg1);
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys(arg1);
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg1);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);
    }

    @And("I favorite {string} on the search page")
    public void iFavoriteOnTheSearchPage(String arg0) throws InterruptedException {
        Thread.sleep(1500);
        driver.findElement(By.id("allParkSelector")).click();

        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(6000);
        WebElement ulElement = driver.findElement(By.id("list-of-parks"));
        List<WebElement> liElements = ulElement.findElements(By.tagName("li"));
        for (WebElement li : liElements) {
            //System.out.println(li.findElement(By.id("favorite-button")));
            if(li.findElement(By.className("flex")).getText().contains(arg0)){
                li.findElement(By.id("favorite-button")).click();
                break;
            }
        }
    }

    @And("I navigate to my {string} page")
    public void iNavigateToMyFavoritesPage(String arg0) throws InterruptedException {
        Thread.sleep(2000);
        driver.get(ROOT_URL+ arg0 + "Page");
        Thread.sleep(2000);
    }

    @Then("I should see {string} on the favorites page")
    public void iShouldSeeOnTheFavoritesPage(String arg0) throws InterruptedException {
//        Thread.sleep(5000);
//        //System.out.println(driver.getPageSource().contains(arg0));
//        assertTrue(driver.getPageSource().contains(arg0));

        String id = "favorite-card-" + arg0;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        boolean isDisplayed = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id))).isDisplayed();
        assertTrue(isDisplayed);
    }

//    @After
//    public void after() {
//        driver.quit();
//    }

    @And("I add parks by searching the term {string}")
    public void iAddParksBySearchingTheTerm(String arg0) throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("card-")));

        Thread.sleep(1500);
        driver.findElement(By.id("nameSelector")).click();
        Thread.sleep(500);
        driver.findElement(By.id("nameSelection")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div/div/div[6]/ul")));

        driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[6]/ul/li[1]/div/div[2]/div[1]/div[2]/button")).click();
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[6]/ul/li[2]/div/div[2]/div[1]/div[2]/button")).click();

    }

    @And("I add {string} park to my favorites list")
    public void iAddParkToMyFavoritesList(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "SearchPage");
        String id = "add-favorite-" + arg0;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id(id)));
        driver.findElement(By.id(id)).click();
        Thread.sleep(500);
        driver.findElement(By.id("confirm-add-favorite")).click();
    }

    @And("I delete first park from my favorites")
    public void iDeleteFirstParkFromMyFavorites() throws InterruptedException {
        Thread.sleep(2000);
//        driver.findElement(By.id()).click();
    }

    @Then("I should see my favorites page")
    public void iShouldSeeMyFavoritesPage() throws InterruptedException {
        Thread.sleep(500);
        assertTrue(driver.getPageSource().contains("Favorites"));

    }

    @And("I log out of my user {string} pass {string} favorites and log back in")
    public void iLogOutOfMyUserPassFavoritesAndLogBackIn(String arg0, String arg1) throws InterruptedException {
        driver.findElement(By.id("logout-link")).click();
        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg1);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);

    }

    @And("I delete {string} park from my favorites list")
    public void iDeleteParkFromMyFavoritesList(String arg0) throws InterruptedException {
        Thread.sleep(2000);
        String id = "delete-button-" + arg0;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id(id)));
        driver.findElement(By.id(id)).click();
    }

    @And("I {string} the deletion of {string} park from my favorites list")
    public void iTheDeletionOfParkFromMyFavoritesList(String arg0, String arg1) throws InterruptedException {
        Thread.sleep(500);
        String id = arg0 + "-delete-button-" + arg1;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id(id)));
        driver.findElement(By.id(id)).click();
    }

    @Then("I should not see {string} on the favorites page")
    public void iShouldNotSeeOnTheFavoritesPage(String arg0) {
        String id = "favorite-card-" + arg0;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        boolean isNotDisplayed = wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id(id)));
        assertTrue(isNotDisplayed);
    }

    @And("I delete all parks from my favorites list")
    public void iDeleteAllParksFromMyFavoritesList() throws InterruptedException {
        Thread.sleep(500);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("delete-all-button")));
        driver.findElement(By.id("delete-all-button")).click();
    }

    @And("I {string} the deletion of all parks from my favorites list")
    public void iTheDeletionOfAllParksFromMyFavoritesList(String arg0) throws InterruptedException {
        Thread.sleep(500);
        String id = arg0 + "-delete-all-button";
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id(id)));
        driver.findElement(By.id(id)).click();
    }

    @Then("My privacy status is {string}")
    public void myPrivacyStatusIs(String arg0) throws InterruptedException {
        Thread.sleep(5000);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @And("I change my privacy status to public")
    public void iChangeMyPrivacyStatusToPublic() throws InterruptedException {
        Thread.sleep(500);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("privacy-status-button")));
        driver.findElement(By.id("privacy-status-button")).click();
    }

    @Then("I should get the message {string} confirming add")
    public void iShouldGetTheMessageConfirmingAdd(String arg0) {
        String id = "add-confirmation-message";
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        boolean isDisplayed = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id))).isDisplayed();
        assertTrue(isDisplayed);

    }

    @Then("I should see {string} ranked as {string}")
    public void iShouldSeeRankedAs(String arg0, String arg1) {
        String id = "favorite-card-" + arg0 + "-" + arg1;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        boolean isDisplayed = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id))).isDisplayed();
        assertTrue(isDisplayed);
    }

    @And("I {string} the ranking of {string} park")
    public void iTheRankingOfPark(String arg0, String arg1) throws InterruptedException {
        Thread.sleep(1000);
        String id = arg0 + "-button-" + arg1;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id(id)));
        driver.findElement(By.id(id)).click();
        Thread.sleep(1000);
    }

    @Then("I should not see {string} as rank {string} on the favorites page")
    public void iShouldNotSeeAsRankOnTheFavoritesPage(String arg0, String arg1) {
        String id = "favorite-card-" + arg0 + "-" + arg1;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofMinutes(2));
        boolean isNotDisplayed = wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id(id)));
        assertTrue(isNotDisplayed);
    }
}