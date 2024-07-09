package edu.usc.csci310.project.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class LoginAttemptTest {

    @Test
    void loginAttemptTest(){
        LoginAttempt loginAttempt = new LoginAttempt();

        LocalDateTime lastAttempt = LocalDateTime.now();
        loginAttempt.setAttempts(1);
        loginAttempt.setLastAttempt(lastAttempt);
        loginAttempt.setUsername("TestUsername");

        assertEquals("TestUsername", loginAttempt.getUsername());
        assertEquals(1, loginAttempt.getAttempts());
        assertEquals(lastAttempt, loginAttempt.getLastAttempt());
    }

}