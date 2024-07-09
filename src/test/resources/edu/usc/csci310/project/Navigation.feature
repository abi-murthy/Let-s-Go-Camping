Feature: Navigating as logged in and logged out
  Scenario: Logged out and navigating between pages
    Given I am on the login
    When I navigate to signup
    Then I can see "Sign Up"
    When I navigate to login
    Then I can see "Login"
  Scenario: Navigating to Public User List from Favorite Page
    Given I login
    When I navigate to Search
    Then I can see "Search By"
    When I navigate to Public User List
    Then I can see "Current Selection:"
    When I navigate to Favorite Page
    Then I can see "Favorites"
    When I navigate to Search
    Then I can see "Search By"
    When I navigate to Favorite Page
    Then I can see "Favorites"
    When I navigate to Public User List
    Then I can see "Current Selection:"
    When I navigate to Favorite Page
    Then I can see "Favorites"
    When I navigate to Search
    Then I can see "Search By"
  Scenario: Navigating to private pages with url when not logged in
    Given I am on the login
    When I try to access "SearchPage"
    Then I can see "Login"
    When I try to access "PublicUserListPage"
    Then I can see "Login"
    When I try to access "FavoritesPage"
    Then I can see "Login"





