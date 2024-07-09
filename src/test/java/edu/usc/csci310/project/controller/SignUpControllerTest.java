package edu.usc.csci310.project.controller;

import edu.usc.csci310.project.service.UserService;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SignUpControllerTest {
    @Test
    void signupTest(){
        UserService userService = mock();
        SignUpController signUpController = new SignUpController(userService);

        when(userService.userExists(anyString())).thenReturn(true);
        Map<String, String> result = (Map<String, String>) signUpController.signup("Username", "Password").getBody();
        assertEquals("Sign up failed user exists", result.get("error"));

        when(userService.userExists(anyString())).thenReturn(false);
        result = (Map<String, String>) signUpController.signup("Username", "Password").getBody();
        assertEquals("Sign up succeeded", result.get("error"));

    }


}