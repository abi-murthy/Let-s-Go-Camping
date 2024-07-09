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


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class SignUpStepDefs {

    private static final String ROOT_URL = "https://localhost:8080/";

    private static final ChromeOptions chromeOptions;

    static {
        chromeOptions = new ChromeOptions().addArguments("--ignore-certificate-errors");
        chromeOptions.setAcceptInsecureCerts(true);
    }


    private final WebDriver driver = new ChromeDriver(chromeOptions);



    @When("I am on the signup page")
    public void iAmOnTheSignUpPage(){
        driver.get(ROOT_URL + "signupPage");
    }

    @Then("I see {string}")
    public void iShouldSeeOnTheSignUpPage(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @When("I enter the username {string}")
    public void iEnterAUsername(String arg0){
        driver.findElement(By.id("username")).sendKeys(arg0);
    }

    @And("I enter the password {string}")
    public void iEnterAValidPassword(String arg0) {
        driver.findElement(By.id("password")).sendKeys(arg0);
    }

    @And("I enter the confirm password {string}")
    public void iEnterAValidConfirmPassword(String arg0) {
        driver.findElement(By.id("confirm-password")).sendKeys(arg0);
    }

    @Then("The signup button should be enabled")
    public void theSignupButtonShouldBeEnabled() throws InterruptedException {
        assertTrue(driver.findElement(By.id("submit-button")).isEnabled());
    }

    @After
    public void after() {
        driver.quit();
    }

    @And("I click the cancel button")
    public void iClickTheCancelButton() {
        driver.findElement(By.id("signup-cancel")).click();
    }

    @And("I click the confirm button")
    public void iClickTheConfirmButton() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("cancel-true")).click();
    }

    @Then("The username field should contain {string}")
    public void theUsernameFieldShouldContain(String arg0) throws InterruptedException {
        Thread.sleep(1000);
        assertEquals(driver.findElement(By.id("username")).getAttribute("value"), arg0);
    }

    @And("I click the do not confirm button")
    public void iClickTheDoNotConfirmButton() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.id("cancel-false")).click();
    }
}
