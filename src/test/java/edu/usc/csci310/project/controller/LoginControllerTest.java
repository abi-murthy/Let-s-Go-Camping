package edu.usc.csci310.project.controller;

import edu.usc.csci310.project.service.LoginAttemptService;
import edu.usc.csci310.project.service.UserService;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class LoginControllerTest {

    private LoginAttemptService loginAttemptService;
    private UserService userService;
    private SecretKey secretKey;
    private HttpServletResponse response;

    private LoginController loginController;

    @BeforeEach
    void initTest(){
        secretKey = mock();
        loginAttemptService = mock();
        userService = mock();
        response = mock();
        loginController = new LoginController(loginAttemptService, userService, secretKey);
    }

    @Test
    void testLogin(){
        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(false);
        long seconds = 60;
        when(loginAttemptService.getLockoutTime(anyString())).thenReturn(seconds);
        Map<String, String> result = (Map<String, String>) loginController.login("Username", "Password1", response).getBody();
        assertEquals("You are locked out. Please wait 60 seconds.", result.get("error"));

        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(true);
        when(userService.authenticate(anyString(), anyString())).thenReturn(true);
        when(userService.findUserIdByUsername(anyString())).thenReturn(Optional.empty());
        result = (Map<String, String>) loginController.login("Username", "Password1", response).getBody();
        assertEquals("Login failed", result.get("error"));


        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(true);
        when(userService.authenticate(anyString(), anyString())).thenReturn(false);
        result = (Map<String, String>) loginController.login("Username", "Password1", response).getBody();
        assertEquals("Login failed", result.get("error"));

//        Jwts jwts = mock();
//       LoginController mockedLoginController = mock();
//        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(true);
//        when(userService.authenticate(anyString(), anyString())).thenReturn(true);
//        when(userService.findUserIdByUsername(anyString())).thenReturn(Optional.of((long)1234));
//        when(mockedLoginController.generateJwtToken("Username", (long)1234)).thenReturn("jwtToken");
//        String username = "Username";
//        Long id = (long)1234;
//        when(jwts.builder()
//                .claim("username", any(String.class))
//                .claim("id", any(Long.class))
//                .issuedAt(any(Date.class))
//                .signWith(any(SecretKey.class))
//                .compact())
//                .thenReturn("jwtsToken");
//
//        Map<String, String> result = (Map<String, String>) loginController.login(username, "Password1", response).getBody();
//        assertEquals("Login failed", result.get("error"));


    }

    @Test
    void validateSessionTest() {
        HttpServletResponse httpServletResponse = new MockHttpServletResponse();

        // Test case 1: Authentication object is null
        Map<String, String> result = (Map<String, String>) loginController.validateSession(null, httpServletResponse).getBody();
        assertEquals("Unauthorized", result.get("error"));

        // Test case 2: Authentication object is not null, but getName() returns null
        Authentication mockAuthentication = mock(Authentication.class);
        when(mockAuthentication.getName()).thenReturn(null);
        result = (Map<String, String>) loginController.validateSession(mockAuthentication, httpServletResponse).getBody();
        assertEquals("Unauthorized", result.get("error"));

        // Test case 3: Authentication object is not null and getName() returns a non-null value
        when(mockAuthentication.getName()).thenReturn("Name");
        when(userService.findUserIdByUsername(anyString())).thenReturn(Optional.of(Long.valueOf(13)));
        result = (Map<String, String>) loginController.validateSession(mockAuthentication, httpServletResponse).getBody();
        assertEquals("Name", result.get("username"));
    }


    @Test
    void logoutTest(){
        HttpServletResponse httpServletResponse = new MockHttpServletResponse();
        Map<String, String> result = (Map<String, String>) loginController.logout(httpServletResponse,null).getBody();
        assertEquals("", result.get("error"));
    }

//    @Test
//    void generateJwtTokenTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
//        long currentTimeMillis = 1617392993000L; // Example time
//        Date now = new Date(currentTimeMillis);
//
//        // Mock the behavior of Jwts.builder().claim() and so on
//        when(Jwts.builder().claim("username", "testUser").claim("id", 123L).issuedAt(now)
//                .signWith(any()).compact()).thenReturn("mockedJwtToken");
//
//        // Call the method under test
//        String jwtToken = loginController.generateJwtToken("testUser", 123L);
//
//        // Verify that the method returned the expected JWT token
//        assertEquals("mockedJwtToken", jwtToken);
//    }

//    @Test
//    void loginTest(){
//        @Test
//        void testGenerateJwtToken() {
//            // Mock dependencies
//            SecretKey jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Mock a secret key
//            LoginController loginController1 = mock();
//
//            // Define input parameters
//            String username = "testUser";
//            Long id = 123L;
//
//            // Define current time
//            long nowMillis = System.currentTimeMillis();
//
//            // Call the method to generate JWT token
//            String jwtToken = loginController1.generateJwtToken(username, id);
//
//            // Extract claims from the generated JWT token
//            Claims claims = Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(jwtToken).getBody();
//
//            // Assert the claims
//            assertEquals(username, claims.get("username", String.class));
//            assertEquals(id, claims.get("id", Long.class));
//
//            // You can also assert issuedAt and expiration if needed
//            assertEquals(new Date(nowMillis), claims.getIssuedAt()); // Assert issuedAt time
//            // Add assertions for expiration if you're testing it
//        }
//
//    }

    @Test
    void whenUserLockedOut_returnLockoutMessage() {
        // Given
        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(false);
        long seconds = 60;
        when(loginAttemptService.getLockoutTime(anyString())).thenReturn(seconds);

        // When
        ResponseEntity<Map<String, String>> result = (ResponseEntity<Map<String, String>>) loginController.login("Username", "Password1", response);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        assertEquals("You are locked out. Please wait 60 seconds.", result.getBody().get("error"));
    }

    @Test
    void whenAuthenticationSucceedsButNoUserId_returnLoginFailed() {
        // Given
        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(true);
        when(userService.authenticate(anyString(), anyString())).thenReturn(true);
        when(userService.findUserIdByUsername(anyString())).thenReturn(Optional.empty());

        // When
        ResponseEntity<Map<String, String>> result = (ResponseEntity<Map<String, String>>) loginController.login("Username", "Password1", response);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        assertEquals("Login failed", result.getBody().get("error"));
    }

    @Test
    void whenAuthenticationFails_returnLoginFailed() {
        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(true);
        when(userService.authenticate(anyString(), anyString())).thenReturn(false);

        // When
        ResponseEntity<Map<String, String>> result = (ResponseEntity<Map<String, String>>) loginController.login("Username", "Password1", response);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        assertEquals("Login failed", result.getBody().get("error"));
    }

    @Test
    void whenAuthenticationSucceedsAndUserIdFound_returnJwtToken() {
        // Given
        when(loginAttemptService.canAttemptLogin(anyString())).thenReturn(true);
        when(userService.authenticate(anyString(), anyString())).thenReturn(true);
        Optional<Long> userId = Optional.of(1234L);
        when(userService.findUserIdByUsername(anyString())).thenReturn(userId);

        // Mock secretKey and JWT creation
        secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a real secret key for testing
        loginController = new LoginController(loginAttemptService, userService, secretKey); // Recreate loginController to use the real secret key

        // When
        ResponseEntity<Map<String, String>> result = (ResponseEntity<Map<String, String>>) loginController.login("Username", "Password1", response);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        System.out.println(result.getHeaders());

    }

    @Test
    void whenAuthenticationIsValidButUserIdNotFound_thenUnauthorized() {
        HttpServletResponse response = new MockHttpServletResponse();
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("validUsername");
        when(userService.findUserIdByUsername("validUsername")).thenReturn(Optional.empty());

        ResponseEntity<?> result = loginController.validateSession(authentication, response);

        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
        assertEquals("Unauthorized", ((Map) result.getBody()).get("error"));
    }
}