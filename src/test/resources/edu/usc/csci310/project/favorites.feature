Feature: favorites
  Scenario: Navigating to favorites
    When I sign up with user "abimur" and pass "Abi1" to the wep app for favorites
    And I navigate to my "favorites" page
    Then I should see my favorites page
  Scenario: Adding two parks to favorites
    When I sign up with user "grace" and pass "Grace1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    Then I should see "abli" ranked as "1"
    And I should see "acad" ranked as "2"
  Scenario: Checking my favorites to after logging in again
    When I sign up with user "jesus" and pass "Jesus1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I log out of my user "jesus" pass "Jesus1" favorites and log back in
    And I navigate to my "favorites" page
    Then I should see "abli" ranked as "1"
  Scenario: Deleting one of my parks from favorites and confirming deletion
    When I sign up with user "robert" and pass "Robert1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I navigate to my "favorites" page
    And I delete "abli" park from my favorites list
    And I "confirm" the deletion of "abli" park from my favorites list
    Then I should not see "abli" as rank "1" on the favorites page
  Scenario: Deleting one of my parks from favorites and cancelling deletion
    When I sign up with user "albert" and pass "Albert1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I navigate to my "favorites" page
    And I delete "abli" park from my favorites list
    And I "cancel" the deletion of "abli" park from my favorites list
    Then I should see "abli" ranked as "1"
  Scenario: Deleting all of my parks from favorites and confirming deletion
    When I sign up with user "sarah" and pass "Sarah1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    And I delete all parks from my favorites list
    And I "cancel" the deletion of all parks from my favorites list
    Then I should see "abli" ranked as "1"
    And I should see "acad" ranked as "2"
  Scenario: Deleting all of my parks from favorites and not confirming deletion
    When I sign up with user "hutapea" and pass "Hutapea1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    And I delete all parks from my favorites list
    And I "confirm" the deletion of all parks from my favorites list
    Then I should not see "abli" as rank "1" on the favorites page
    And I should not see "acad" as rank "2" on the favorites page
  Scenario: Favorites list default setting is private
    When I sign up with user "jared" and pass "Jared1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I navigate to my "favorites" page
    Then My privacy status is "Change privacy status to public"
  Scenario: Favorites list set to public
    When I sign up with user "elliot" and pass "Elliot1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I navigate to my "favorites" page
    And I change my privacy status to public
    Then My privacy status is "Change privacy status to private"
  Scenario: Privacy status persists
    When I sign up with user "padthai" and pass "Padthai1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I navigate to my "favorites" page
    And I change my privacy status to public
    And I navigate to my "search" page
    And I navigate to my "favorites" page
    Then My privacy status is "Change privacy status to private"
  Scenario: Display initial park rankings
    When I sign up with user "testuser2" and pass "Grace1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    Then I should see "abli" ranked as "1"
    And I should see "acad" ranked as "2"
  Scenario: Increase a park's ranking
    When I sign up with user "testuser3" and pass "Grace1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    And I "increase" the ranking of "acad" park
    Then I should see "abli" ranked as "2"
    And I should see "acad" ranked as "1"
  Scenario: Decrease a park's ranking
    When I sign up with user "testuser4" and pass "Grace1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    And I "decrease" the ranking of "abli" park
    Then I should see "abli" ranked as "2"
    And I should see "acad" ranked as "1"
  Scenario: Change the rankings of multiple parks
    When I sign up with user "testuser5" and pass "Grace1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I add "adam" park to my favorites list
    And I navigate to my "favorites" page
    And I "decrease" the ranking of "abli" park
    And I "increase" the ranking of "adam" park
    Then I should see "abli" ranked as "3"
    And I should see "acad" ranked as "1"
    And I should see "adam" ranked as "2"
  Scenario: Rankings persist
    When I sign up with user "testuser6" and pass "Grace1" to the wep app for favorites
    And I add "abli" park to my favorites list
    And I add "acad" park to my favorites list
    And I navigate to my "favorites" page
    And I "decrease" the ranking of "abli" park
    And I log out of my user "testuser6" pass "Grace1" favorites and log back in
    And I navigate to my "favorites" page
    Then I should see "abli" ranked as "2"
    And I should see "acad" ranked as "1"
