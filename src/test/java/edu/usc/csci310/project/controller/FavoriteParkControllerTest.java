package edu.usc.csci310.project.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import edu.usc.csci310.project.config.ApiKeyHolder;
import edu.usc.csci310.project.model.FavoritePark;
import edu.usc.csci310.project.service.FavoriteParkService;
import edu.usc.csci310.project.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

class FavoriteParkControllerTest {
    private FavoriteParkController favoriteParkController;
    private ApiKeyHolder apiKeyHolder;
    private FavoriteParkService favoriteParkService;


    private final ObjectMapper objectMapper = new ObjectMapper();

    private Authentication authentication;

    @BeforeEach
    void initTest(){
        apiKeyHolder = mock();
        favoriteParkService = mock();
        favoriteParkController = new FavoriteParkController(apiKeyHolder, favoriteParkService);
        authentication = mock();
        when(authentication.getName()).thenReturn("user");
        List<FavoritePark> favoriteParksList = new ArrayList<>();
        favoriteParksList.add(new FavoritePark("Park1", "CODE1"));
        favoriteParksList.get(0).setRanking(1);
        favoriteParksList.add(new FavoritePark("Park2", "CODE2"));
        favoriteParksList.get(1).setRanking(2);
        favoriteParksList.add(new FavoritePark("Park3", "CODE3"));
        favoriteParksList.get(2).setRanking(3);

        when(favoriteParkService.getFavoriteParksByUserUsername(anyString())).thenReturn(favoriteParksList);
    }

    @Test
    void findCommonFavoriteParks_WhenApiResponseLacksDataField_Test() {
        // Given
        List<String> usernames = Arrays.asList("user1", "user2");
        Map<String, List<String>> mockServiceResponse = new HashMap<>();
        mockServiceResponse.put("parkCode1", Arrays.asList("user1", "user2"));
        when(favoriteParkService.findCommonFavoriteParksWithUsers(usernames)).thenReturn(mockServiceResponse);

        // Mocking RestTemplate to return a JsonNode without a "data" field
        RestTemplate mockedRestTemplate = mock(RestTemplate.class);

        favoriteParkController.setRestTemplate(mockedRestTemplate);

        // Perform the action
        ResponseEntity<Map<String, List<String>>> responseEntity = favoriteParkController.findCommonFavoriteParks(usernames);

        // Assert
        assertNotNull(responseEntity.getBody());

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify interactions
        verify(favoriteParkService).findCommonFavoriteParksWithUsers(usernames);
        verify(mockedRestTemplate).getForObject(anyString(), eq(JsonNode.class));
    }

    @Test
    void findCommonFavoriteParksTest() {
        // Given
        List<String> usernames = Arrays.asList("user1", "user2");
        Map<String, List<String>> mockServiceResponse = new HashMap<>();
        mockServiceResponse.put("parkCode1", Arrays.asList("user1", "user2"));
        mockServiceResponse.put("parkCode2", Collections.singletonList("user2"));
        when(favoriteParkService.findCommonFavoriteParksWithUsers(usernames)).thenReturn(mockServiceResponse);

        // When simulating the response from the National Parks Service API
        JsonNode rootNode = objectMapper.createObjectNode();
        ArrayNode dataArray = objectMapper.createArrayNode();
        ObjectNode park1 = objectMapper.createObjectNode();
        park1.put("parkCode", "parkCode1");
        park1.put("fullName", "Yosemite National Park");
        dataArray.add(park1);
        ObjectNode park2 = objectMapper.createObjectNode();
        park2.put("parkCode", "parkCode2");
        park2.put("fullName", "Grand Canyon National Park");
        dataArray.add(park2);
        ((ObjectNode) rootNode).set("data", dataArray);

        RestTemplate mockedRestTemplate = mock(RestTemplate.class);
        when(mockedRestTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(rootNode);
        favoriteParkController.setRestTemplate(mockedRestTemplate);

        // Perform the action
        ResponseEntity<Map<String, List<String>>> responseEntity = favoriteParkController.findCommonFavoriteParks(usernames);

        // Assert
        assertNotNull(responseEntity.getBody());
        assertTrue(responseEntity.getBody().containsKey("Yosemite National Park"));
        assertTrue(responseEntity.getBody().containsKey("Grand Canyon National Park"));
        assertEquals(Arrays.asList("user1", "user2"), responseEntity.getBody().get("Yosemite National Park"));
        assertEquals(Collections.singletonList("user2"), responseEntity.getBody().get("Grand Canyon National Park"));
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify interactions
        verify(favoriteParkService).findCommonFavoriteParksWithUsers(usernames);
        verify(mockedRestTemplate).getForObject(anyString(), eq(JsonNode.class));
    }



    @Test
    void getFavoritesByUserTest(){
        FavoritePark favoritePark = new FavoritePark("TestName", "abli");

        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(favoritePark);

        Authentication authentication = mock();
        when(apiKeyHolder.getApiKey()).thenReturn("VWaLngE0ePnBA7PZECEEzk3QritRKGaHmRTWnXCK");
        when(authentication.getName()).thenReturn("TestName");
        when(favoriteParkService.getFavoriteParksByUserUsername("TestName")).thenReturn(favoriteParks);
        ResponseEntity<?> result = (ResponseEntity<?>) favoriteParkController.getFavoritesByUser(authentication);
        assertTrue(result.hasBody());
    }

    @Test
    void getFavoritesByUserTestRanking(){
        FavoritePark favoritePark = new FavoritePark("TestName", "abli");


        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(favoritePark);
        favoritePark.setParkCode(null);
        Authentication authentication = mock();
        when(apiKeyHolder.getApiKey()).thenReturn("VWaLngE0ePnBA7PZECEEzk3QritRKGaHmRTWnXCK");
        when(authentication.getName()).thenReturn("TestName");
        when(favoriteParkService.getFavoriteParksByUserUsername("TestName")).thenReturn(favoriteParks);
        ResponseEntity<?> result = (ResponseEntity<?>) favoriteParkController.getFavoritesByUser(authentication);
        assertTrue(result.hasBody());
    }

    @Test
    void deleteFavoriteParkTest(){

        Authentication authentication = mock();
        when(authentication.getName()).thenReturn("Name");
        when(favoriteParkService.deleteFavoritePark("Name", "ParkCode"))
                .thenReturn(new FavoritePark("Name", "ParkCode"));
        FavoritePark fp = (FavoritePark) favoriteParkController.deleteFavoritePark("ParkCode", authentication).getBody();
        assertEquals("Name", fp.getUserUsername());


    }

    @Test
    void addUserFavoriteTest(){

        Authentication authentication = mock();
        when(authentication.getName()).thenReturn("Name");
        when(favoriteParkService.addFavoritePark("Name", "ParkCode"))
                .thenReturn(new FavoritePark("Name", "ParkCode"));
        FavoritePark fp = (FavoritePark) favoriteParkController.addUserFavorite("ParkCode", authentication).getBody();
        assertEquals("Name", fp.getUserUsername());

    }

    @Test
    void getParkInfoFromParkCodeListAndAddIsFavoriteTest(){
        List<String> favParksCodes = new ArrayList<>();
        favParksCodes.add("abli");

        when(apiKeyHolder.getApiKey()).thenReturn("VWaLngE0ePnBA7PZECEEzk3QritRKGaHmRTWnXCK");
        int result = favoriteParkController.getParkInfoFromParkCodeListAndAddIsFavorite(favParksCodes).getBody().size();
        assertEquals(1, result);

        RestTemplate mockedRestTemplate = mock();
        favoriteParkController.setRestTemplate(mockedRestTemplate);

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;

        when(mockedRestTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        result = favoriteParkController.getParkInfoFromParkCodeListAndAddIsFavorite(favParksCodes).getBody().size();
        assertEquals(0, result);

        when(mockedRestTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        result = favoriteParkController.getParkInfoFromParkCodeListAndAddIsFavorite(favParksCodes).getBody().size();
        assertEquals(0, result);

    }


    @Test
    void whenParkIsAtTop_thenShouldNotMoveUp() {
        ResponseEntity<?> response = favoriteParkController.moveParkUpInRanking(authentication, "CODE1");
        assertEquals(ResponseEntity.ok().body("Park is already at the top"), response);
    }

    @Test
    void whenParkExists_thenShouldMoveUp() {
        ResponseEntity<?> response = favoriteParkController.moveParkUpInRanking(authentication, "CODE2");
        assertEquals(ResponseEntity.ok().body("Park moved up successfully"), response);
    }

    @Test
    void whenParkIsAtBottom_thenShouldNotMoveDown() {
        ResponseEntity<?> response = favoriteParkController.moveParkDownInRanking(authentication, "CODE3");
        assertEquals(ResponseEntity.ok().body("Park is already at the bottom"), response);
    }

    @Test
    void whenParkExists_thenShouldMoveDown() {
        ResponseEntity<?> response = favoriteParkController.moveParkDownInRanking(authentication, "CODE2");
        assertEquals(ResponseEntity.ok().body("Park moved down successfully"), response);
    }

    @Test
    void whenParkDoesNotExist_thenShouldReturnError() {
        ResponseEntity<?> response = favoriteParkController.moveParkUpInRanking(authentication, "CODE4");
        assertEquals(ResponseEntity.badRequest().body("Park not found in user's favorites"), response);
    }

    @Test
    void whenParkDoesNotExist_thenShouldReturnErrorDown() {
        ResponseEntity<?> response = favoriteParkController.moveParkDownInRanking(authentication, "CODE4");
        assertEquals(ResponseEntity.badRequest().body("Park not found in user's favorites"), response);
    }



    @Test
    void suggestFavoriteParkTest() {
        // Given
        List<String> usernames = Arrays.asList("user1", "user2");
        String parkCode = "yellow"; // Park code returned by the service
        String parkName = "Yellowstone National Park"; // Park name from the external service

        when(favoriteParkService.suggestCommonFavoritePark(usernames)).thenReturn(parkCode);

        ObjectNode park = objectMapper.createObjectNode();
        park.put("fullName", parkName);

        ArrayNode dataArray = objectMapper.createArrayNode();
        dataArray.add(park);

        ObjectNode rootNode = objectMapper.createObjectNode();
        rootNode.set("data", dataArray);

        RestTemplate mockedRestTemplate = mock(RestTemplate.class);
        when(mockedRestTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(rootNode);
        favoriteParkController.setRestTemplate(mockedRestTemplate);

        // When
        ResponseEntity<String> responseEntity = favoriteParkController.suggestFavoritePark(usernames);

        // Then
        assertNotNull(responseEntity.getBody());
        assertEquals(parkName, responseEntity.getBody());
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify interactions
        verify(favoriteParkService).suggestCommonFavoritePark(usernames);
        verify(mockedRestTemplate).getForObject(anyString(), eq(JsonNode.class));
    }




}