package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class NavigationStepDefs {
    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @Given("I am on the login")
    public void onLogin(){
        driver.get(ROOT_URL+"loginPage");
    }

    @When("I navigate to signup")
    public void toSignup() throws InterruptedException {
        Thread.sleep(1000);
//        driver.findElement(By.id("signup-link")).click();

        WebElement signUpLink = driver.findElement(By.id("signup-link"));
        JavascriptExecutor executor = (JavascriptExecutor)driver;
        executor.executeScript("arguments[0].click();", signUpLink);
    }

    @Then("I can see {string}")
    public void iCanSee(String arg0) throws InterruptedException {
        Thread.sleep(600);
        assertTrue(driver.getPageSource().contains(arg0));
        Thread.sleep(600);
    }

    @When("I navigate to login")
    public void iNavigateToLogin() {
//        driver.findElement(By.id("login-link")).click();
        WebElement loginLink = driver.findElement(By.id("login-link"));
        JavascriptExecutor executor = (JavascriptExecutor)driver;
        executor.executeScript("arguments[0].click();", loginLink);
    }

    @Given("I login")
    public void iLogin() throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys("Abinav46");
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys("Abinav46");
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys("Abinav46");
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys("Abinav46");
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("Abinav46");
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(1000);
    }

    @When("I navigate to Search")
    public void iNavigateToSearch() throws InterruptedException {
        Thread.sleep(1000);
        WebElement searchLink = driver.findElement(By.id("search-link"));
        JavascriptExecutor executor = (JavascriptExecutor)driver;
        executor.executeScript("arguments[0].click();", searchLink);
        Thread.sleep(1000);
    }

    @When("I navigate to Public User List")
    public void iNavigateToPublicUserList() throws InterruptedException {
        Thread.sleep(1000);

        WebElement publicUserLink = driver.findElement(By.id("public-user-link"));
        JavascriptExecutor executor = (JavascriptExecutor)driver;
        executor.executeScript("arguments[0].click();", publicUserLink);
        Thread.sleep(1000);

    }

    @When("I navigate to Favorite Page")
    public void iNavigateToFavoritePage() {
        WebElement favoritesLink = driver.findElement(By.id("favorites-link"));
        JavascriptExecutor executor = (JavascriptExecutor)driver;
        executor.executeScript("arguments[0].click();", favoritesLink);
    }

    @When("I try to access {string}")
    public void navWithUrl(String arg0){
        driver.get(ROOT_URL+arg0);
    }

    @After
    public void tearDown(){
        driver.quit();
    }
}
