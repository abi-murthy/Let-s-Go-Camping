Feature: Search
  Scenario: Accessing search
    Given I signup and login for search with username "SearchUser1"
    Then I should see "Search By:" on the webpage for search
  Scenario: Seeing first 10 results when accessing search
    Given I login for search with username "SearchUser1"
    And I wait for search results to load
    Then I should see 10 search results
  Scenario: Seeing first 20 results when accessing search
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I press on load more button
    Then I should see 20 search results
  Scenario: Searching by name and pressing enter to submit
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I enter the term "Yellowstone" to search by
    And I press enter to search
    And I wait for search results to load
    Then I should see "Yellowstone National Park" on the webpage for search
  Scenario: Searching by state
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I search by state with the term "CA"
    And I wait for search results to load
    Then I should see "California National Historic Trail" on the webpage for search
  Scenario: Search by activity
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I search by activity with the term "Astronomy"
    And I wait for search results to load
    Then I should see "Agate Fossil Beds National Monument" on the webpage for search
  Scenario: Search by topic
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I search by topic with the term "Geology"
    And I wait for search results to load
    Then I should see "Abraham Lincoln Birthplace National Historical Park" on the webpage for search
  Scenario: Search by amenity
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I search by amenity with the term "Bicycle - Rental"
    And I wait for search results to load
    Then I should see "Everglades National Park" on the webpage for search
  Scenario: Search for gibberish and see no more results and no load more button
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I enter the term "jvnbjkefn" to search by
    And I press enter to search
    Then I should see "No search results" on da page
    Then I shouldn't see "Load More" on the page
  Scenario: Load more button disappears when no more results for a search
    Given I login for search with username "SearchUser1"
    When I wait for search results to load
    And I search by amenity with the term "Assistive Listening Systems - T-Coil Compatible"
    And I wait
    Then I should see "Load More" on da page
    And I press on load more button
    And I wait
    Then I should see "No more results to load" on da page
    Then I shouldn't see "Load More" on the page










