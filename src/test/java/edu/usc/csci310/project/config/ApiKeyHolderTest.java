package edu.usc.csci310.project.config;

import edu.usc.csci310.project.config.ApiKeyHolder;
import edu.usc.csci310.project.service.FavoriteParkService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class ApiKeyHolderTest {

    private final ApiKeyHolder apiKeyHolder;
    @Autowired
    public ApiKeyHolderTest(ApiKeyHolder apiKeyHolder) {
        this.apiKeyHolder = apiKeyHolder;
    }

    @Test
    public void apiKeyIsLoadedCorrectly() {
        assertNotNull(apiKeyHolder.getApiKey(), "API Key should not be null");
        assertEquals("VWaLngE0ePnBA7PZECEEzk3QritRKGaHmRTWnXCK", apiKeyHolder.getApiKey(), "API Key should match the one provided in the test properties");
    }
}