Feature: Park Cards
  Scenario: Expanding the park card for more information
    Given I sign up and login using the username "ParkCardTestUser1"
    When I wait for the results to show on the search page
    And I click the see more button for the first result
    And I navigate through activities, amenities, location, and fees
    Then I should see more information about the park
  Scenario: Expanding park and closing park and click on park link
    Given I login using the username "ParkCardTestUser1"
    When I wait for the results to show on the search page
    And I click on the name for the first result to expand park
    And I click on the name for the first result to close park
    And I click on the name for the first result to expand park
    And I click on the park link displayed for the first result
    Then I should see "The First Lincoln Memorial and Boyhood Home" on the new web page
  Scenario: Expanding park and search by activity
    Given I login using the username "ParkCardTestUser1"
    When I wait for the results to show on the search page
    And I click on the name for the first result to expand park
    And I click on the activity button
    And I click on the first activity listed to search
    And I wait for the results to show on the search page
    Then I should see "Showing parks by activity: Astronomy" on the web page
  Scenario: Expanding park and search by amenity
    Given I login using the username "ParkCardTestUser1"
    When I wait for the results to show on the search page
    And I click on the name for the first result to expand park
    And I click on the amenity button
    And I click on the first amenity listed to search
    And I wait for the results to show on the search page
    Then I should see "Showing parks by amenity: Accessible Rooms" on the web page
  Scenario: Expanding park and search by location
    Given I login using the username "ParkCardTestUser1"
    When I wait for the results to show on the search page
    And I click on the name for the first result to expand park
    And I click on the location button
    And I click on the location link to search by
    And I wait for the results to show on the search page
    Then I should see "Showing parks by state: KY" on the web page
