Feature: Signup
  Scenario: Typing nothing in the fields
    Given I am on the signup page
    Then I see "Username must be at least 5 characters long."
  Scenario: Input a username and no password
    Given I am on the signup page
    When I enter the username "ValidUsername"
    Then I see "requires one uppercase, one lowercase, and one number."
  Scenario: Input a username and password and no confirm password
    Given I am on the signup page
    When I enter the username "ValidUsername"
    And I enter the password "Pass01"
    And I enter the confirm password "Pass02"
    Then I see "Passwords do not match."
  Scenario: Input all valid credentials
    Given I am on the signup page
    When I enter the username "ValidUsername"
    And I enter the password "Pass01"
    And I enter the confirm password "Pass01"
    Then The signup button should be enabled
  Scenario: I cancel the signup
    Given I am on the signup page
    When I enter the username "ValidUsername"
    And I click the cancel button
    And I click the confirm button
    Then The username field should contain ""
  Scenario: I do not confirm the cancel signup
    Given I am on the signup page
    When I enter the username "ValidUsername"
    And I click the cancel button
    And I click the do not confirm button
    Then The username field should contain "ValidUsername"


