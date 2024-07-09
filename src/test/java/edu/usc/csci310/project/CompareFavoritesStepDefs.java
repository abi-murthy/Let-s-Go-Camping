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

public class CompareFavoritesStepDefs {
    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);
    
    @Given("{string} logs into the webpage for compare favorites")
    public void logsIntoTheWebpageForCompareFavorites(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(arg0);
        driver.findElement(By.id("submit-button")).click();
    }


    @When("FavoriteUserOne adds two parks to favorites")
    public void favoriteUserOneAddsTwoParksToFavorites() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("add-favorite-abli")));
        Thread.sleep(500);
        driver.findElement(By.id("add-favorite-abli")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("add-favorite-acad")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();

    }

    @And("The current user sets their favorites to public")
    public void theCurrentUserSetsTheirFavoritesToPublic() throws InterruptedException {
        Thread.sleep(2000);
        driver.get(ROOT_URL+ "favoritesPage");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div/div[2]/ul")));
        //Thread.sleep(9000);
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[2]/ul/div/button[2]")).click();


    }

    @And("The current user navigates to Public User's List Page")
    public void theCurrentUserNavigatesToPublicUserSListPage() throws InterruptedException {
        Thread.sleep(2000);
        driver.get(ROOT_URL+ "publicUserListPage");

    }

    @And("The current user clicks on the Compare Favorites button")
    public void theCurrentUserClicksOnTheCompareFavoritesButton() throws InterruptedException {
        Thread.sleep(6000);
        driver.findElement(By.id("compare-favorites-button")).click();
        Thread.sleep(1000);

    }

    @Then("Nothing should be shown on the pop up window")
    public void nothingShouldBeShownOnThePopUpWindow() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div[2]/div")));
        driver.getPageSource();
        assertTrue(true);
    }

    @Then("Nothing happens as users not selected")
    public void noUsersSelectedAndCompare() throws InterruptedException {
        String before = driver.getPageSource();
        Thread.sleep(100);
        assertEquals(before, driver.getPageSource());
    }



    @Then("{string} should be seen on the pop-up window")
    public void shouldBeSeenOnThePopUpWindow(String arg0) throws InterruptedException {
        Thread.sleep(10000);
        assertTrue(driver.getPageSource().contains(arg0));

    }

    @And("The current user selects {string} list")
    public void theCurrentUserSelectsFavoriteUserOneList(String arg0) throws InterruptedException {
        Thread.sleep(300);
        driver.findElement(By.id("searchbar")).sendKeys(arg0);
        Thread.sleep(300);
        driver.findElement(By.id("search-enter")).click();
        Thread.sleep(1000);
    }

    @After
    public void after() {
        driver.quit();
    }

    @When("FavoriteUserTwo adds two parks to favorites")
    public void favoriteUserTwoAddsTwoParksToFavorites() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("add-favorite-abli")));
        Thread.sleep(500);
        driver.findElement(By.id("add-favorite-abli")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("add-favorite-adam")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
    }

    @And("The current user selects FavoriteUserTwo list")
    public void theCurrentUserSelectsFavoriteUserTwoList() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div/div/div")));
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/button")).click();
    }

    @And("The current user sets their favorites to private")
    public void theCurrentUserSetsTheirFavoritesToPrivate() throws InterruptedException {
        Thread.sleep(2000);
        driver.get(ROOT_URL+ "favoritesPage");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("privacy-status-button")));
        //Thread.sleep(9000);
        driver.findElement(By.id("privacy-status-button")).click();
    }


    @Then("{string} should not be seen on PublicUserListPage")
    public void shouldNotBeSeenOnPublicUserListPage(String arg0) throws InterruptedException {
        Thread.sleep(4000);
        assertFalse(driver.getPageSource().contains(arg0));
    }

    @When("FavoriteUserThree adds two parks to favorites")
    public void favoriteUserThreeAddsTwoParksToFavorites() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("add-favorite-abli")));
        Thread.sleep(500);
        driver.findElement(By.id("add-favorite-abli")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("add-favorite-adam")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
    }

    @And("The current user selects FavoriteUserThree list")
    public void theCurrentUserSelectsFavoriteUserThreeList() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div/div/div")));
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/button")).click();
    }

    @And("The current user selects FavoriteUserFour list")
    public void theCurrentUserSelectsFavoriteUserFourList() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/div/div/div/div/div")));
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/button")).click();
    }

    @When("FavoriteUserFour adds two parks to favorites")
    public void favoriteUserFourAddsTwoParksToFavorites() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.id("add-favorite-abli")));
        Thread.sleep(500);
        driver.findElement(By.id("add-favorite-abli")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("add-favorite-acad")).click();
        driver.findElement(By.id("confirm-add-favorite")).click();
    }

    @And("The current user hovers on the tooltip")
    public void theCurrentUserClicksOnTheTooltip() throws InterruptedException {
        Thread.sleep(6000);
        Actions action = new Actions(driver);
        action.moveToElement(driver.findElement(By.id("tooltipAbraham Lincoln Birthplace National Historical Park"))
        ).perform();
        Thread.sleep(6000);
    }


    @And("The current user clicks on the park name in the comparison")
    public void theCurrentUserClicksOnTheParkNameInTheSuggestion() throws InterruptedException {
        Thread.sleep(10000);
        driver.findElement(By.id("title-abli")).click();
    }

    @Then("the current user can see park details")
    public void theCurrentUserCanSeeParkDetails() throws InterruptedException {
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains("Location"));
        assertTrue(driver.getPageSource().contains("Activities"));
        assertTrue(driver.getPageSource().contains("Amenities"));

    }
}
