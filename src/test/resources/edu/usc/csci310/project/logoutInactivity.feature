Feature: Auto-logout after inactivity
  Scenario: Logging into the web app and becoming inactive for 60 seconds
    Given I login with "apmurthy" and "Pass46"
    And I am inactive for at least 60 seconds
    Then I see "Login" on the webpage

  Scenario: Logging into the web app, clicking the mouse after 30 seconds, and remaining logged in
    Given I login with "apmurhy" and "Pats46"
    And I click search after 30 seconds
    And I am inactive for another 30 seconds
    Then I see "Search" on the webpage
