Feature: login
  Scenario: Accessing login
    When I am on the login page
    Then I should see "Login" on the login page
  Scenario: Inputting only valid username
    When I am on the login page
    And I enter a valid username to login
    And I click on the login button
    Then I should see "Invalid password format" on the login page
  Scenario: Inputting credentials not in database
    When I am on the login page
    And I enter invalid credentials in login
    And I click on the login button
    Then I should see "Login failed" on the webpage
  Scenario: Inputting credentials in database
    When I am on the login page
    And I enter valid credentials in login
    And I click on the login button
    Then I should see "Let‘s Go Camping!" on the webpage
  # TODO complete these scenarios and make sure they works
  Scenario: Three failed login attempt in a minute resulting in a 30 second lockdown
    When I sign up with valid credentials "Abinv78"
    And I am on da login page
    And I enter the correct username "Abinv78" but incorrect password 3 times in succession
    And I click on the login button
    Then I should see "You are locked out. Please wait 30 seconds." on the webpage
  Scenario: Three failed login attempts but after 30 seconds I can login
    When I sign up with valid credentials "Abinv98"
    And I am on da login page
    And I enter the correct username "Abinv98" but incorrect password 3 times in succession
    And I wait for 30 seconds
    And I login correctly with "Abinv98"
    Then I should see "Search By" on the webpage
  Scenario: 2 failed logins but last one successful
    When I sign up with valid credentials "Aboonav56"
    And I am on da login page
    And I enter the correct username "Aboonav56" but wrong password
    And I click on the login button
    And I click on the login button
    And I login correctly with "Aboonav56"
    Then I should see "Search By" on the webpage
  Scenario: 2 failed logins with a minute, and the third one after a minute doesn't lock you out
    When I sign up with valid credentials "Aboonav56"
    And I am on da login page
    And I enter the correct username "Aboonav56" but wrong password
    And I click on the login button
    And I click on the login button
    And I wait for 60 seconds
    And I click on the login button
    And I click on the login button
    Then I should see "Login failed" on the webpage




