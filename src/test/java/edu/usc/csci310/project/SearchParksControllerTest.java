package edu.usc.csci310.project;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import edu.usc.csci310.project.config.ApiKeyHolder;
import edu.usc.csci310.project.controller.SearchParksController;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.usc.csci310.project.model.FavoritePark;
import edu.usc.csci310.project.service.FavoriteParkService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.client.RestTemplate;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//@ExtendWith(SpringExtension.class)
//@WebMvcTest(SearchParksController.class)


@SpringBootTest
class SearchParksControllerTest {
    @Value("${api.key}")
    private String API_KEY;
    private RestTemplate restTemplate;
    private RestTemplate realRestTemplate;
    private SearchParksController searchParksController;

    private Authentication authentication;

    private ApiKeyHolder apiKeyHolder;
    private FavoriteParkService favoriteParkService;
    private final ObjectMapper objectMapper = new ObjectMapper();


    @BeforeEach
    void initTest(){
        restTemplate = mock();
        authentication = mock();
        apiKeyHolder = mock();
        favoriteParkService = mock();
        realRestTemplate = new RestTemplate();
        searchParksController = new SearchParksController(apiKeyHolder, favoriteParkService);
        searchParksController.setRestTemplate(restTemplate);
    }

    @Test
    void getterTest(){
        searchParksController.setRestTemplate(realRestTemplate);
        assertNotNull(searchParksController.getRestTemplate());
    }

    @Test
    void getParksByStateTest(){
        String url = "https://developer.nps.gov/api/v1/parks?limit=10000&api_key="+API_KEY;

        FavoritePark favoritePark = new FavoritePark("TestName", "abli");
        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(favoritePark);

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(realRestTemplate.getForObject(url, JsonNode.class));
        when(authentication.getName()).thenReturn("TestName");
        when(favoriteParkService.getFavoriteParksByUserUsername(anyString())).thenReturn(favoriteParks);
        assertEquals(11, searchParksController.getParksByState("AL", authentication).getBody().size());


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        assertEquals(0, searchParksController.getParksByState("AL", authentication).getBody().size());


        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        assertEquals(0, searchParksController.getParksByState("AL", authentication).getBody().size());

    }

    @Test
    void getParksByActivityName_WhenResponseIsNull() {
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);

        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByActivityName("hiking", authentication);
        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void getAmenitiesTest(){
        String url = "https://developer.nps.gov/api/v1/amenities?api_key="+API_KEY;

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(realRestTemplate.getForObject(url, JsonNode.class));
        assertEquals(50, searchParksController.getAmenities().getBody().size());


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        assertEquals(0, searchParksController.getAmenities().getBody().size());


        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        assertEquals(0, searchParksController.getAmenities().getBody().size());

    }

    @Test
    void testGetParksByAmenityName() throws Exception {
        String amenityID = "some_amenity_id";
        JsonNode mockJsonNode = objectMapper.readTree("{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"data\":[[{\"id\":\"some_id\",\"name\":\"Some Amenity\",\"parks\":[{\"states\":\"HI\",\"designation\":\"National Historic Trail\",\"parkCode\":\"alka\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alka/index.htm\",\"name\":\"Ala Kahakai\"}]}]]}");
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockJsonNode).thenReturn(createMockJsonResponse());

        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByAmenityName(amenityID, authentication);

        assertEquals(1, response.getBody().size()); // Assuming returnParksWithInfo formats the data in a certain way

    }
    @Test
    void testGetParksByAmenityNameNoData() throws Exception {
        String amenityID = "some_amenity_id";
        JsonNode mockJsonNode = objectMapper.readTree("{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"gaba\":[[{\"id\":\"some_id\",\"name\":\"Some Amenity\",\"parks\":[{\"states\":\"HI\",\"designation\":\"National Historic Trail\",\"parkCode\":\"alka\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alka/index.htm\",\"name\":\"Ala Kahakai\"}]}]]}");
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockJsonNode).thenReturn(createMockJsonResponse());

        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByAmenityName(amenityID, authentication);

        assertEquals(0, response.getBody().size()); // Assuming returnParksWithInfo formats the data in a certain way

    }
    @Test
    void testGetParksByAmenityNameNullResponse() throws Exception {
        String amenityID = "some_amenity_id";
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null).thenReturn(createMockJsonResponse());

        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByAmenityName(amenityID, authentication);

        assertEquals(0, response.getBody().size()); // Assuming returnParksWithInfo formats the data in a certain way

    }



    @Test
    void getActivitiesTest(){
        String url = "https://developer.nps.gov/api/v1/activities?api_key="+ API_KEY;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(realRestTemplate.getForObject(url, JsonNode.class));
        assertEquals(40,searchParksController.getActivities().getBody().size());

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        assertEquals(0, searchParksController.getActivities().getBody().size());


        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        assertEquals(0, searchParksController.getActivities().getBody().size());
    }

    private JsonNode createMockJsonResponse() {
        String jsonResponse = "{"
                + "  \"total\": \"1\","
                + "  \"limit\": \"50\","
                + "  \"start\": \"0\","
                + "  \"data\": ["
                + "    {"
                + "      \"id\": \"3B8307B3-54AB-4E5F-ACBC-8DECB98AD5F1\","
                + "      \"url\": \"https://www.nps.gov/alka/index.htm\","
                + "      \"fullName\": \"Ala Kahakai National Historic Trail\","
                + "      \"parkCode\": \"alka\","
                + "      \"description\": \"Established in 2000...\","
                + "      \"latitude\": \"19.144668109\","
                + "      \"longitude\": \"-155.890734294\","
                + "      \"latLong\": \"lat:19.144668109, long:-155.890734294\","
                + "      \"activities\": ["
                + "        { \"id\": \"AE3C95F5-E05B-4A28-81DD-1C5FD4BE88E2\", \"name\": \"Surfing\" }"
                + "      ],"
                + "      \"topics\": [],"
                + "      \"states\": \"HI\","
                + "      \"contacts\": {},"
                + "      \"entranceFees\": [],"
                + "      \"entrancePasses\": [],"
                + "      \"fees\": [],"
                + "      \"directionsInfo\": \"Open sections of the Ala Kahakai NHT...\","
                + "      \"directionsUrl\": \"http://home.nps.gov/alka/planyourvisit/directions.htm\","
                + "      \"operatingHours\": [{}],"
                + "      \"addresses\": [{}],"
                + "      \"images\": [{}],"
                + "      \"weatherInfo\": \"Hawaiʻiʻs coast is generally sunny and hot...\","
                + "      \"name\": \"Ala Kahakai\","
                + "      \"designation\": \"National Historic Trail\","
                + "      \"relevanceScore\": 1"
                + "    }"
                + "  ]"
                + "}";

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readTree(jsonResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private JsonNode createMockJsonResponseNoData() {
        String jsonResponse = "{"
                + "  \"total\": \"1\","
                + "  \"limit\": \"50\","
                + "  \"start\": \"0\","
                + "  \"gaba\": ["
                + "    {"
                + "      \"id\": [],"
                + "      \"url\": [],"
                + "      \"fullName\": [],"
                + "      \"parkCode\": \"alka\","
                + "      \"description\": \"Established in 2000...\","
                + "      \"latitude\": \"19.144668109\","
                + "      \"longitude\": \"-155.890734294\","
                + "      \"latLong\": \"lat:19.144668109, long:-155.890734294\","
                + "      \"activities\": ["
                + "        { \"id\": \"AE3C95F5-E05B-4A28-81DD-1C5FD4BE88E2\", \"name\": \"Surfing\" }"
                + "      ],"
                + "      \"topics\": [],"
                + "      \"states\": [],"
                + "      \"contacts\": {},"
                + "      \"entranceFees\": [],"
                + "      \"entrancePasses\": [],"
                + "      \"fees\": [],"
                + "      \"directionsInfo\": [],"
                + "      \"directionsUrl\": [],"
                + "      \"operatingHours\": [{}],"
                + "      \"addresses\": [{}],"
                + "      \"images\": [{}],"
                + "      \"weatherInfo\": [],"
                + "      \"name\":[],"
                + "      \"designation\": [],"
                + "      \"relevanceScore\": 0"
                + "    }"
                + "  ]"
                + "}";

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readTree(jsonResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void getParksByActivityNameTest() {
        // Given
        String activityName = "Surfing";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("testUser");

        String expectedUrl = "https://developer.nps.gov/api/v1/activities/parks?limit=1000&q=" + activityName + "&api_key=" + apiKeyHolder.getApiKey();
        JsonNode mockResponse = createMockResponseForActivities();

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockResponse).thenReturn(createMockJsonResponse());


        searchParksController.setRestTemplate(restTemplate);
        ResponseEntity<List<JsonNode>> responseEntity = searchParksController.getParksByActivityName(activityName, authentication);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(1, responseEntity.getBody().size()); // Asserting one park in the response for brevity

        // Verify that restTemplate was called with the right parameters
        verify(restTemplate).getForObject(eq(expectedUrl), eq(JsonNode.class));
    }

    @Test
    void getParksByActivityNameTestNull() {
        // Given
        String activityName = "Surfing";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("testUser");

        String expectedUrl = "https://developer.nps.gov/api/v1/activities/parks?limit=1000&q=" + activityName + "&api_key=" + apiKeyHolder.getApiKey();
        JsonNode mockResponse = createMockResponseForActivities();

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null).thenReturn(createMockJsonResponse());


        searchParksController.setRestTemplate(restTemplate);
        ResponseEntity<List<JsonNode>> responseEntity = searchParksController.getParksByActivityName(activityName, authentication);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(0, responseEntity.getBody().size()); // Asserting one park in the response for brevity

        // Verify that restTemplate was called with the right parameters
        verify(restTemplate).getForObject(eq(expectedUrl), eq(JsonNode.class));
    }

    @Test
    void getParksByActivityNameTestDataNotThere() {
        // Given
        String activityName = "Surfing";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("testUser");

        String expectedUrl = "https://developer.nps.gov/api/v1/activities/parks?limit=1000&q=" + activityName + "&api_key=" + apiKeyHolder.getApiKey();
        JsonNode mockResponse = createMockResponseForActivitiesDataNull();

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockResponse).thenReturn(createMockJsonResponse());


        searchParksController.setRestTemplate(restTemplate);
        ResponseEntity<List<JsonNode>> responseEntity = searchParksController.getParksByActivityName(activityName, authentication);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(0, responseEntity.getBody().size()); // Asserting one park in the response for brevity

        // Verify that restTemplate was called with the right parameters
        verify(restTemplate).getForObject(eq(expectedUrl), eq(JsonNode.class));
    }

    @Test
    void getParksByActivityNameTestNoActivityName() {
        // Given
        String activityName = "Surfing";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("testUser");

        String expectedUrl = "https://developer.nps.gov/api/v1/activities/parks?limit=1000&q=" + activityName + "&api_key=" + apiKeyHolder.getApiKey();
        JsonNode mockResponse = createMockResponseForActivitiesNoActivityName();

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockResponse).thenReturn(createMockJsonResponse());


        searchParksController.setRestTemplate(restTemplate);
        ResponseEntity<List<JsonNode>> responseEntity = searchParksController.getParksByActivityName(activityName, authentication);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(0, responseEntity.getBody().size()); // Asserting one park in the response for brevity

        // Verify that restTemplate was called with the right parameters
        verify(restTemplate).getForObject(eq(expectedUrl), eq(JsonNode.class));
    }


    private JsonNode createMockResponseForActivities() {
        String jsonResponse = "{"
                + "  \"total\": \"1\","
                + "  \"limit\": \"50\","
                + "  \"start\": \"0\","
                + "  \"data\": ["
                + "    {"
                + "      \"id\": \"AE3C95FD4BE88E2\","
                + "      \"name\": \"Surfing\","
                + "      \"parks\": ["
                + "        {"
                + "          \"states\": \"hgj\","
                + "          \"parkCode\": \"alka\","
                + "          \"designation\": \"dfgvfvgil\","
                + "          \"fullName\": \"Ala Kahakai National Historic Trail\","
                + "          \"url\": \"hj bbhj bhm\","
                + "          \"name\": \"Ala Kahakai\""
                + "        }"
                + "      ]"
                + "    }"
                + "  ]"
                + "}";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readTree(jsonResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }



    private JsonNode createMockResponseForActivitiesDataNull() {
        String jsonResponse = "{"
                + "  \"total\": \"1\","
                + "  \"limit\": \"50\","
                + "  \"start\": \"0\","
                + "  \"bata\": ["
                + "    {"
                + "      \"id\": \"AhbjbD-1C5FD4BE88E2\","
                + "      \"name\": \"Surfing\","
                + "      \"parks\": ["
                + "        {"
                + "          }"
                + "      ]"
                + "    }"
                + "  ]"
                + "}";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readTree(jsonResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private JsonNode createMockResponseForActivitiesNoActivityName() {
        String jsonResponse = "{"
                + "  \"total\": \"1\","
                + "  \"limit\": \"50\","
                + "  \"start\": \"0\","
                + "  \"data\": ["
                + "    {"
                + "      \"id\": \"AE3C95F5-E05B-4A28-81DD-1C5FD4BE88E3\","
                + "      \"name\": \"Burfing\","
                + "      \"parks\": ["
                + "        {"
                + "          \"states\": \"CA\","
                + "          \"parkCode\": \"abli\","
                + "          \"designation\": \"National Trail\","
                + "          \"fullName\": \"National Historic Trail\","
                + "          \"url\": \"https://www.nps.gov/alka/index.html\","
                + "          \"name\": \"Ala Moana\""
                + "        }"
                + "      ]"
                + "    }"
                + "  ]"
                + "}";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readTree(jsonResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }



    @Test
    void getAllParksTest(){

        String url = "https://developer.nps.gov/api/v1/parks?limit=10000&api_key="+ API_KEY;
        FavoritePark favoritePark = new FavoritePark("TestName", "abli");
        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(favoritePark);

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(realRestTemplate.getForObject(url, JsonNode.class));
        when(authentication.getName()).thenReturn("TestName");
        when(favoriteParkService.getFavoriteParksByUserUsername(anyString())).thenReturn(favoriteParks);
        assertEquals(471,searchParksController.getAllParks(authentication).getBody().size());

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        assertEquals(0, searchParksController.getAllParks(authentication).getBody().size());


        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        assertEquals(0, searchParksController.getAllParks(authentication).getBody().size());
    }

    @Test
    void getTopicsTest(){
        String url = "https://developer.nps.gov/api/v1/topics?api_key="+ API_KEY;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(realRestTemplate.getForObject(url, JsonNode.class));
        assertEquals(50,searchParksController.getTopics().getBody().size());

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        assertEquals(0, searchParksController.getTopics().getBody().size());


        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        assertEquals(0, searchParksController.getTopics().getBody().size());

    }



    @Test
    void getParksByNameTest() throws JsonProcessingException {
        String url = "https://developer.nps.gov/api/v1/parks?limit=10000&api_key=" + API_KEY;
        FavoritePark favoritePark = new FavoritePark("TestName", "abli");
        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(favoritePark);

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(realRestTemplate.getForObject(url, JsonNode.class));
        when(authentication.getName()).thenReturn("TestName");
        when(favoriteParkService.getFavoriteParksByUserUsername(anyString())).thenReturn(favoriteParks);
        assertEquals(2,searchParksController.getParksByName("Blue", authentication).getBody().size());

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("fieldName", "fieldValue");
        JsonNode finalJsonNode = (JsonNode) jsonNode;
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
        assertEquals(0, searchParksController.getParksByName("NameInput", authentication).getBody().size());


        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
        assertEquals(0, searchParksController.getParksByName("NameInput", authentication).getBody().size());

    }

//    @Test
//    void getParksByAmenityNameTest(){
//        ObjectMapper objectMapper = new ObjectMapper();
//        ObjectNode jsonNode = objectMapper.createObjectNode();
//        jsonNode.put("fieldName", "fieldValue");
//        JsonNode finalJsonNode = (JsonNode) jsonNode;
//        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
//        assertEquals(0, searchParksController.getParksByAmenityName("AmenityID", authentication).getBody().size());
//
//
//        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
//        assertEquals(0, searchParksController.getParksByAmenityName("AmenityID", authentication).getBody().size());
//
//    }
//
//    @Test
//    void getParksByActivityNameTest(){
//        ObjectMapper objectMapper = new ObjectMapper();
//        ObjectNode jsonNode = objectMapper.createObjectNode();
//        jsonNode.put("fieldName", "fieldValue");
//        JsonNode finalJsonNode = (JsonNode) jsonNode;
//        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
//        assertEquals(0, searchParksController.getParksByActivityName("ActivityID", authentication).getBody().size());
//
//
//        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
//        assertEquals(0, searchParksController.getParksByActivityName("ActivityID", authentication).getBody().size());
//    }
//
//    @Test
//    void getParksByTopicNameTest(){
//        ObjectMapper objectMapper = new ObjectMapper();
//        ObjectNode jsonNode = objectMapper.createObjectNode();
//        jsonNode.put("fieldName", "fieldValue");
//        JsonNode finalJsonNode = (JsonNode) jsonNode;
//        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(finalJsonNode);
//        assertEquals(0, searchParksController.getParksByTopicName("TopicName", authentication).getBody().size());
//
//
//        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);
//        assertEquals(0, searchParksController.getParksByTopicName("TopicName", authentication).getBody().size());
//
//    }


    @Test
    void testGetParksByTopicName() throws Exception {
        String jsonResponse = "{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"data\":[{\"id\":\"77B7EFDF-1A74-409C-8BA2-324EC919DB0E\",\"name\":\"Arctic\",\"parks\":[{\"states\":\"AK\",\"parkCode\":\"alka\",\"designation\":\"National Historic Trail\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alag/index.htm\",\"name\":\"Alagnak\"}]}]}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode mockJsonNode = objectMapper.readTree(jsonResponse);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockJsonNode).thenReturn(createMockJsonResponse());


        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByTopicName("Arctic", authentication);

        // Assertions
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.hasBody());
        JsonNode body = objectMapper.valueToTree(response.getBody());
        assertTrue(body.isArray());
        assertFalse(body.isEmpty());
        // Check for specific details in the response
        JsonNode firstPark = body.get(0); // Assuming your returnParksWithInfo formats the response correctly
        assertEquals("Ala Kahakai National Historic Trail", firstPark.get("fullName").asText());
    }

    @Test
    void testGetParksByTopicNameNoCode() throws Exception {
        String jsonResponse = "{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"data\":[{\"id\":\"77B7EFDF-1A74-409C-8BA2-324EC919DB0E\",\"name\":\"Arctic\",\"parks\":[{\"states\":\"AK\",\"parkCode\":\"abka\",\"designation\":\"National Historic Trail\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alag/index.htm\",\"name\":\"Alagnak\"}]}]}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode mockJsonNode = objectMapper.readTree(jsonResponse);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockJsonNode).thenReturn(createMockJsonResponse());


        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByTopicName("Arctic", authentication);

        // Assertions
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.hasBody());
        JsonNode body = objectMapper.valueToTree(response.getBody());
        assertTrue(body.isArray());
        assertTrue(body.isEmpty());
    }

    @Test
    void testGetParksByTopicNameNoDataInResponse() throws Exception {
        String jsonResponse = "{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"data\":[{\"id\":\"77B7EFDF-1A74-409C-8BA2-324EC919DB0E\",\"name\":\"Arctic\",\"parks\":[{\"states\":\"AK\",\"parkCode\":\"alka\",\"designation\":\"National Historic Trail\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alag/index.htm\",\"name\":\"Alagnak\"}]}]}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode mockJsonNode = objectMapper.readTree(jsonResponse);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockJsonNode).thenReturn(createMockJsonResponseNoData());


        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByTopicName("Arctic", authentication);

        // Assertions
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.hasBody());
        JsonNode body = objectMapper.valueToTree(response.getBody());
        assertTrue(body.isArray());
        assertTrue(body.isEmpty());
    }



    @Test
    void testGetParksByTopicNameNullRes() throws Exception {
        String jsonResponse = "{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"data\":[{\"id\":\"77B7EFDF-1A74-409C-8BA2-324EC919DB0E\",\"name\":\"Arctic\",\"parks\":[{\"states\":\"AK\",\"parkCode\":\"alka\",\"designation\":\"National Historic Trail\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alag/index.htm\",\"name\":\"Alagnak\"}]}]}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode mockJsonNode = objectMapper.readTree(jsonResponse);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null).thenReturn(createMockJsonResponse());


        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByTopicName("Arctic", authentication);

        // Assertions
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.hasBody());
        JsonNode body = objectMapper.valueToTree(response.getBody());
        assertTrue(body.isArray());
        assertTrue(body.isEmpty());

    }

    @Test
    void testGetParksByTopicNameNoData() throws Exception {
        String jsonResponse = "{\"total\":\"1\",\"limit\":\"50\",\"start\":\"0\",\"kata\":[{\"id\":\"77B7EFDF-1A74-409C-8BA2-324EC919DB0E\",\"name\":\"Arctic\",\"parks\":[{\"states\":\"AK\",\"parkCode\":\"alka\",\"designation\":\"National Historic Trail\",\"fullName\":\"Ala Kahakai National Historic Trail\",\"url\":\"https://www.nps.gov/alag/index.htm\",\"name\":\"Alagnak\"}]}]}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode mockJsonNode = objectMapper.readTree(jsonResponse);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(mockJsonNode).thenReturn(createMockJsonResponse());

        ResponseEntity<List<JsonNode>> response = searchParksController.getParksByTopicName("Arctic", authentication);

        // Assertions
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.hasBody());
        JsonNode body = objectMapper.valueToTree(response.getBody());
        assertTrue(body.isArray());
        assertTrue(body.isEmpty());

    }


    @Test
    void testReturnParksWithInfoWhenBodyIsNull() {
        ResponseEntity<List<JsonNode>> parksResponseEntity = ResponseEntity.ok(null);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null).thenReturn(createMockJsonResponse());


        ResponseEntity<List<JsonNode>> response = searchParksController.returnParksWithInfo(parksResponseEntity, authentication);

        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void testReturnParksWithInfoWhenNoData() {
        ResponseEntity<List<JsonNode>> parksResponseEntity = ResponseEntity.ok(null);
        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(createMockResponseForActivities()).thenReturn(createMockJsonResponse());


        ResponseEntity<List<JsonNode>> response = searchParksController.returnParksWithInfo(parksResponseEntity, authentication);

        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void testReturnParksWithInfoWhenApiResponseIsNull() throws JsonProcessingException {
        JsonNode parksNode = new ObjectMapper().readTree("[{\"parks\":[{\"parkCode\":\"alka\"}]}]");
        ResponseEntity<List<JsonNode>> parksResponseEntity = ResponseEntity.ok(Collections.singletonList(parksNode));

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);

        ResponseEntity<List<JsonNode>> response = searchParksController.returnParksWithInfo(parksResponseEntity, authentication);

        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void testReturnParksWithInfoWhenNoParkCode() throws JsonProcessingException {
        JsonNode parksNode = new ObjectMapper().readTree("[{\"parks\":[{\"parkCode\":\"alka\"}]}]");
        ResponseEntity<List<JsonNode>> parksResponseEntity = ResponseEntity.ok(Collections.singletonList(parksNode));

        when(restTemplate.getForObject(anyString(), eq(JsonNode.class))).thenReturn(null);

        ResponseEntity<List<JsonNode>> response = searchParksController.returnParksWithInfo(parksResponseEntity, authentication);

        assertTrue(response.getBody().isEmpty());
    }

}
