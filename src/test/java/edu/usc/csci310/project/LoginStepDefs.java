package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginStepDefs {

    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);

    @When("I am on the login page")
    public void iAmOnTheSignUpPage(){
        driver.get(ROOT_URL + "loginPage");
    }

    @And("I am on da login page")
    public void iAmTheSignUpPage(){
        driver.get(ROOT_URL + "loginPage");
    }

    @Then("I should see {string} on the login page")
    public void iShouldSeeOnTheLoginPage(String arg0) throws InterruptedException {
        Thread.sleep(100);assertTrue(driver.getPageSource().contains(arg0));
    }

    @And("I click on the login button")
    public void iClickOnTheLoginButton() {
        driver.findElement(By.id("submit-button")).click();
    }

    @And("I enter a valid username to login")
    public void iEnterAValidUsernameToLogin() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys("ValidUsername");
    }

    @And("I enter a valid password to login")
    public void iEnterAValidPasswordToLogin() throws InterruptedException{
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("Pass01");

    }

    @And("I enter valid credentials in login")
    public void iEnterValidCredentialsInLogin() throws InterruptedException{
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys("ValidTestUser");
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys("ValidTestUser1");
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys("ValidTestUser1");
        driver.findElement(By.id("submit-button")).click();

        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys("ValidTestUser");
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("ValidTestUser1");
        driver.findElement(By.id("submit-button")).click();
    }

    @Then("I should see {string} on the webpage")
    public void iShouldSeeOnTheWebpage(String arg0) throws InterruptedException{
        Thread.sleep(3000);
        //System.out.println(driver.getPageSource());
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @After
    public void after() {
        driver.quit();
    }

    @And("I enter invalid credentials in login")
    public void iEnterInvalidCredentialsInLogin() throws InterruptedException {
        Thread.sleep(500);
        driver.get(ROOT_URL + "loginPage");
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys("NotValid");
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("NotValid1");
        driver.findElement(By.id("submit-button")).click();
    }

    @When("I sign up with valid credentials {string}")
    public void signupValid(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "SignupPage");
        Thread.sleep(500);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("password")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("confirm-password")).sendKeys(arg0);
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();
    }

    @And("I enter the correct username {string} but incorrect password 3 times in succession")
    public void iEnterTheUsernameButIncorrectPassword(String arg0) throws InterruptedException {
        Thread.sleep(500);
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("Gibberish47");
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);
    }

    @And("I wait for {int} seconds")
    public void iWaitForSeconds(int arg0) throws InterruptedException {
        Thread.sleep(arg0*1000+1000);
    }

    @And("I login correctly with {string}")
    public void iLoginCorrectlyWith(String arg0) throws InterruptedException {
        driver.findElement(By.id("password")).clear();
        driver.findElement(By.id("password")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("submit-button")).click();
        Thread.sleep(500);
    }

    @And("I enter the correct username {string} but wrong password")
    public void rightUserWrongPass(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("username")).sendKeys(arg0);
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("Gibberish47");
        Thread.sleep(1000);
    }
}
