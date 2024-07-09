package edu.usc.csci310.project.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void userTest(){
        String testUsername = "TestUsername";
        String testPassword = "TestPassword";

        User user = new User();
        user = new User(testUsername, testPassword);

        Long userId = (long)1;
        user.setId(userId);
        user.setUsername("setTestUsername");
        user.setPassword("setTestPassword");
        user.setIs_favorites_public(true);
        assertEquals(userId, user.getId());
        assertEquals("setTestUsername", user.getUsername());
        assertEquals("setTestPassword", user.getPassword());
        assertEquals(true, user.getIs_favorites_public());
    }

}