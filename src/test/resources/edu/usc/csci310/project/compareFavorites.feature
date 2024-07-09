Feature: compare favorites
  Scenario: Comparing with nothing
    Given "FavoriteUser1" logs into the webpage for compare favorites
    When FavoriteUserOne adds two parks to favorites
    And The current user sets their favorites to public
    And The current user navigates to Public User's List Page
    And The current user clicks on the Compare Favorites button
    Then Nothing happens as users not selected
  Scenario: Comparing with one user
    Given "FavoriteUser1" logs into the webpage for compare favorites
    When The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user clicks on the Compare Favorites button
    Then "1/1 of selected users like this park" should be seen on the pop-up window
  Scenario: Comparing two users list 1 similar one different
    Given "FavoriteUser2" logs into the webpage for compare favorites
    When FavoriteUserTwo adds two parks to favorites
    And The current user sets their favorites to public
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser2" list
    And The current user clicks on the Compare Favorites button
    Then "1/2 of selected users like this park" should be seen on the pop-up window
  Scenario: Cannot compare favorite when it's private
    Given "FavoriteUser2" logs into the webpage for compare favorites
    And The current user sets their favorites to private
    And The current user navigates to Public User's List Page
    Then "FavoriteUser2" should not be seen on PublicUserListPage
  Scenario: Comparing two users both favorite parks same
    Given "FavoriteUser3" logs into the webpage for compare favorites
    When FavoriteUserThree adds two parks to favorites
    And The current user sets their favorites to public
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser3" list
    And The current user clicks on the Compare Favorites button
    Then "2/2 of selected users like this park" should be seen on the pop-up window
  Scenario: Comparing two users all parks are the same
    Given "FavoriteUser4" logs into the webpage for compare favorites
    When FavoriteUserFour adds two parks to favorites
    And The current user sets their favorites to public
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser4" list
    And The current user clicks on the Compare Favorites button
    Then "2/2 of selected users like this park" should be seen on the pop-up window
  Scenario: Validate that private user cannot be used to make a comparison
    Given "FavoriteUser4" logs into the webpage for compare favorites
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser4" list
    And The current user selects "FavoriteUser3" list
    And The current user selects "FavoriteUser2" list
    And The current user clicks on the Compare Favorites button
    Then "Some selected users are private or do not exist" should be seen on the pop-up window
  Scenario: Validate that nonexistent user cannot be used to make a comparison
    Given "FavoriteUser4" logs into the webpage for compare favorites
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser4" list
    And The current user selects "FavoriteUser3" list
    And The current user selects "Lebron James" list
    And The current user clicks on the Compare Favorites button
    Then "Some selected users are private or do not exist" should be seen on the pop-up window
  Scenario: Validate comparison list is ordered by number of users per park
    Given "FavoriteUser4" logs into the webpage for compare favorites
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser4" list
    And The current user selects "FavoriteUser3" list
    And The current user clicks on the Compare Favorites button
    Then "3/3" should be seen on the pop-up window
    Then "2/3" should be seen on the pop-up window
    Then "1/3" should be seen on the pop-up window

  Scenario: User list pops up on hover
    Given "FavoriteUser4" logs into the webpage for compare favorites
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser4" list
    And The current user selects "FavoriteUser3" list
    And The current user clicks on the Compare Favorites button
    And The current user hovers on the tooltip
    Then "FavoriteUser1, FavoriteUser3, FavoriteUser4" should be seen on the pop-up window
  Scenario: Park details can be seen on the parks in the list
    Given "FavoriteUser4" logs into the webpage for compare favorites
    And The current user navigates to Public User's List Page
    And The current user selects "FavoriteUser1" list
    And The current user selects "FavoriteUser4" list
    And The current user selects "FavoriteUser3" list
    And The current user clicks on the Compare Favorites button
    And The current user clicks on the park name in the comparison
    Then the current user can see park details








