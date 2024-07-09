package edu.usc.csci310.project.service;

import edu.usc.csci310.project.model.LoginAttempt;
import edu.usc.csci310.project.model.User;
import edu.usc.csci310.project.repository.FavoriteParkRepository;
import edu.usc.csci310.project.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import edu.usc.csci310.project.model.FavoritePark;

class UserServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;
    private User user;

    private FavoriteParkService favoriteParkService;

    private FavoriteParkRepository favoriteParkRepository;
    @BeforeEach
    void initTest(){
        userRepository = mock();
        passwordEncoder = new BCryptPasswordEncoder();
        user = mock();
        favoriteParkRepository = mock();
        userService = new UserService(userRepository, passwordEncoder, favoriteParkRepository );
        favoriteParkService = new FavoriteParkService(favoriteParkRepository);
    }

    @Test
    void getUsersAndTheirFavoriteParksTest() {
        User userPublic1 = new User("publicUser1", "password");
        userPublic1.setIs_favorites_public(true);

        User userPublic2 = new User("publicUser2", "password");
        userPublic2.setIs_favorites_public(true);

        User userPrivate = new User("privateUser", "password");
        userPrivate.setIs_favorites_public(false);

        FavoritePark park1 = new FavoritePark(userPublic1.getUsername(), "PARKCODE1");
        FavoritePark park2 = new FavoritePark(userPublic2.getUsername(), "PARKCODE2");
        FavoritePark park3 = new FavoritePark(userPrivate.getUsername(), "PARKCODE3");

        when(userRepository.findAll()).thenReturn(Arrays.asList(userPublic1, userPublic2, userPrivate));

        when(favoriteParkRepository.findAll()).thenReturn(Arrays.asList(park1, park2, park3));

        Map<String, List<String>> result = userService.getUsersAndTheirFavoriteParks();

        assertEquals(2, result.size(), "Should only have public users");

        assertTrue(result.containsKey(userPublic1.getUsername()), "Should contain public user 1");
        assertTrue(result.get(userPublic1.getUsername()).contains("PARKCODE1"), "User 1 should have PARKCODE1");

        assertTrue(result.containsKey(userPublic2.getUsername()), "Should contain public user 2");
        assertTrue(result.get(userPublic2.getUsername()).contains("PARKCODE2"), "User 2 should have PARKCODE2");

        assertFalse(result.containsKey(userPrivate.getUsername()), "Should NOT contain private user");
    }

    @Test
    void userExistsTest(){
        String testUsername = "TestUsername";

        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.empty());
        assertFalse(userService.userExists(testUsername));

        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.of(user));
        assertTrue(userService.userExists(testUsername));
    }

    @Test
    void authenticateTest(){
        String testUsername = "TestUsername";
        String testPassword = "TestPassword";

        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.empty());
        assertFalse(userService.authenticate(testUsername, testPassword));

        String hashPassword = passwordEncoder.encode(testPassword);
        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.of(user));
        when(user.getPassword()).thenReturn(hashPassword);
        assertTrue(userService.authenticate(testUsername, testPassword));

    }

    @Test
    void createUserTest(){
        String testUsername = "TestUsername";
        String testPassword = "TestPassword";

        userService.createUser(testUsername, testPassword);
    }

    @Test
    void findUserIdByUsernameTest(){

        User user = new User("Username", "Pass");
        user.setId((long)123);
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        assertEquals((long)123, userService.findUserIdByUsername("Username").get());

    }

    // ... other tests ...

    @Test
    void changeUserListVisibilityTest() {
        String testUsername = "TestUsername";
        User testUser = new User(testUsername, "password");

        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.of(testUser));

        boolean result = userService.changeUserListVisibility(testUsername, true);
        assertTrue(result);
        verify(userRepository).save(testUser);
        assertTrue(testUser.getIs_favorites_public());

        // Test for false case
        result = userService.changeUserListVisibility(testUsername, false);
        assertTrue(result);
        verify(userRepository, times(2)).save(testUser); // because it's called twice now
        assertFalse(testUser.getIs_favorites_public());

        // Test user not found
        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.empty());
        result = userService.changeUserListVisibility(testUsername, true);
        assertFalse(result);
    }

    @Test
    void findListVisByUsernameTest() {
        String testUsername = "TestUsername";
        User testUser = new User(testUsername, "password");
        testUser.setIs_favorites_public(true);

        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.of(testUser));

        // User found and list is public
        Optional<Boolean> result = userService.findListVisByUsername(testUsername);
        assertTrue(result.isPresent());
        assertTrue(result.get());

        // User not found
        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.empty());
        result = userService.findListVisByUsername(testUsername);
        assertFalse(result.isPresent());
    }

    @Test
    void findCommonFavoriteParksWithUsersTest() {
        // Prepare some mock favorite parks
        FavoritePark park1 = new FavoritePark("user1", "park1");
        FavoritePark park2 = new FavoritePark("user2", "park1");
        FavoritePark park3 = new FavoritePark("user1", "park2");
        List<FavoritePark> favoriteParks = Arrays.asList(park1, park2, park3);

        // Define usernames for the test
        List<String> usernames = Arrays.asList("user1", "user2");

        // Mock the repository call
        when(favoriteParkRepository.findByUserUsernameIn(usernames)).thenReturn(favoriteParks);

        // Call the method under test
        Map<String, List<String>> result = favoriteParkService.findCommonFavoriteParksWithUsers(usernames);

        // Assert the results
        assertEquals(2, result.size(), "Should have parks for 2 codes");
        assertEquals(Arrays.asList("user1", "user2"), result.get("park1").stream().sorted().collect(Collectors.toList()), "Both users like park1");
        assertEquals(List.of("user1"), result.get("park2"), "Only user1 likes park2");
    }
}