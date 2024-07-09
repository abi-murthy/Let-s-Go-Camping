Feature: suggest favorite
  Scenario: Only one user is selected and requests a suggestion
    Given "FavUser1" logs in for suggest favorites
    When the current user adds "abli" and "acad"
    And the current user makes their list public
    And the current user goes to the public compare page
    And the current user adds "FavUser1" for comparision
    And they click the suggest button
    Then they should see "No common favorite park found to suggest one"

  Scenario: A private user is selected for making a suggestion
    Given "FavUser2" logs in for suggest favorites
    When the current user adds "abli" and "acad"
    And the current user goes to the public compare page
    And the current user adds "FavUser1" for comparision
    And the current user adds "FavUser2" for comparision
    And they click the suggest button
    Then they should see "Some selected users are private or do not exist"

  Scenario: A non-existent user is selected for making a suggestion
    Given "FavUser3" logs in for suggest favorites
    And the current user goes to the public compare page
    And the current user adds "Kobe Bryant" for comparision
    And the current user adds "LEBROOOON JAMESSSS" for comparision
    And they click the suggest button
    Then they should see "Some selected users are private or do not exist"
  Scenario: Two public users are selected but have no common parks between them
    Given "FavUser4" logs in for suggest favorites
    When the current user adds "afam" and "afbg"
    And the current user makes their list public
    And the current user goes to the public compare page
    And the current user adds "FavUser1" for comparision
    And the current user adds "FavUser4" for comparision
    And they click the suggest button
    Then they should see "No common favorite park found to suggest one"
  Scenario: Two public users have common parks and a suggestion is made
    Given "FavUser5" logs in for suggest favorites
    When the current user adds "abli" and "afbg"
    And the current user makes their list public
    And the current user goes to the public compare page
    And the current user adds "FavUser1" for comparision
    And the current user adds "FavUser5" for comparision
    And they click the suggest button
    Then they should see "Abraham Lincoln"

  Scenario: Park details can be seen on the suggestion
    Given "FavUser5" logs in for suggest favorites
    And the current user goes to the public compare page
    And the current user adds "FavUser1" for comparision
    And the current user adds "FavUser5" for comparision
    And they click the suggest button
    And The user clicks on the park name in the comparison
    Then they should see "Amenities"
    Then they should see "Activities"
    Then they should see "Location"








