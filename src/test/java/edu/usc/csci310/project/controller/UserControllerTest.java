package edu.usc.csci310.project.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import edu.usc.csci310.project.config.ApiKeyHolder;
import edu.usc.csci310.project.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;
    @Mock
    private ApiKeyHolder apiKeyHolder;
    @Mock
    private RestTemplate restTemplate;
    @Mock
    private Authentication authentication;
    @InjectMocks
    private UserController userController;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        when(apiKeyHolder.getApiKey()).thenReturn("test-api-key");
    }
    @Test
    void getAllUsersAndFavorites_ResponseLacksDataField() {
        Map<String, List<String>> userFavoritesMap = new HashMap<>();
        userFavoritesMap.put("user1", Collections.singletonList("park1"));

        when(userService.getUsersAndTheirFavoriteParks()).thenReturn(userFavoritesMap);

        ObjectNode responseNode = objectMapper.createObjectNode();

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(responseNode);
        userController.setRestTemplate(restTemplate);

        ResponseEntity<Map<String, List<String>>> response = userController.getAllUsersAndFavorites();

        assertEquals("Unknown Park", response.getBody().get("user1").get(0));

        verify(restTemplate).getForObject(anyString(), eq(JsonNode.class));
    }


    @Test
    void getAllUsersAndFavorites_WithApiResponse() {
        Map<String, List<String>> userFavoritesMap = new HashMap<>();
        userFavoritesMap.put("user1", Collections.singletonList("park1"));

        when(userService.getUsersAndTheirFavoriteParks()).thenReturn(userFavoritesMap);

        JsonNode dataNode = objectMapper.createArrayNode();
        ObjectNode parkNode = objectMapper.createObjectNode();
        parkNode.put("parkCode", "park1");
        parkNode.put("fullName", "Test Park Name");
        ((ArrayNode) dataNode).add(parkNode);

        ObjectNode responseNode = objectMapper.createObjectNode();
        responseNode.set("data", dataNode);

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(responseNode);
        userController.setRestTemplate(restTemplate);

        ResponseEntity<Map<String, List<String>>> response = userController.getAllUsersAndFavorites();

        assertEquals("Test Park Name", response.getBody().get("user1").get(0));
    }

    @Test
    void getAllUsersAndFavorites_WithoutApiResponse() {
        Map<String, List<String>> userFavoritesMap = new HashMap<>();
        userFavoritesMap.put("user1", Collections.singletonList("park1"));

        when(userService.getUsersAndTheirFavoriteParks()).thenReturn(userFavoritesMap);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        userController.setRestTemplate(restTemplate);

        ResponseEntity<Map<String, List<String>>> response = userController.getAllUsersAndFavorites();

        assertEquals("Unknown Park", response.getBody().get("user1").get(0));
    }

    @Test
    void changeUserListPrivacy_SuccessfulUpdate_ShouldReturnOk() {
        String username = "testUser";
        boolean newPrivacySetting = true;
        when(authentication.getName()).thenReturn(username);
        when(userService.changeUserListVisibility(username, newPrivacySetting)).thenReturn(true);

        ResponseEntity<?> response = userController.changeUserListPrivacy(authentication, newPrivacySetting);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userService).changeUserListVisibility(username, newPrivacySetting);
    }

    @Test
    void changeUserListPrivacy_FailedUpdate_ShouldReturnBadRequest() {
        String username = "testUser";
        boolean newPrivacySetting = false;
        when(authentication.getName()).thenReturn(username);
        when(userService.changeUserListVisibility(username, newPrivacySetting)).thenReturn(false);

        ResponseEntity<?> response = userController.changeUserListPrivacy(authentication, newPrivacySetting);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(userService).changeUserListVisibility(username, newPrivacySetting);
    }

    @Test
    void getUserVisibility_UserVisibilityPresent_ShouldReturnVisibility() {
        String username = "testUser";
        Optional<Boolean> visibility = Optional.of(true);
        when(authentication.getName()).thenReturn(username);
        when(userService.findListVisByUsername(username)).thenReturn(visibility);

        ResponseEntity<?> response = userController.getUserVisibility(authentication);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(visibility.get(), ((Map<String, Boolean>) response.getBody()).get("visibility"));
        verify(userService).findListVisByUsername(username);
    }

    @Test
    void getUserVisibility_UserVisibilityNotPresent_ShouldReturnBadRequest() {
        String username = "testUser";
        when(authentication.getName()).thenReturn(username);
        when(userService.findListVisByUsername(username)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userController.getUserVisibility(authentication);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(userService).findListVisByUsername(username);
    }

}
