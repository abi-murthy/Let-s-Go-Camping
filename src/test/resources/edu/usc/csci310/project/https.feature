Feature: https vs http
  Scenario: Accessing website from http
    Given I navigate to the website from http
    Then I should see "Bad Request"
  Scenario: Accessing website from https
    Given I navigate to the website from https
    Then I should see "Let's Go Camping"