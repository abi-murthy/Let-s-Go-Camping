package edu.usc.csci310.project.service;

import edu.usc.csci310.project.model.LoginAttempt;
import edu.usc.csci310.project.repository.LoginAttemptRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginAttemptServiceTest {


    private LoginAttemptRepository loginAttemptRepository;
    private LoginAttempt loginAttempt;
    private Optional<LoginAttempt> loginAttemptOptional;
    private LoginAttemptService loginAttemptService;

    @BeforeEach
    void initTest(){
        loginAttempt= mock();
        loginAttemptRepository = mock();
        loginAttemptOptional = mock();
        loginAttemptService = new LoginAttemptService(loginAttemptRepository);
    }

    @Test
    void loginSucceedTest(){
        String testUsername = "TestUsername";

        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.ofNullable(loginAttempt));
        loginAttemptService.loginSucceeded(testUsername);
        verify(loginAttemptRepository).deleteById(testUsername);

        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.empty());
        loginAttemptService.loginSucceeded(testUsername);
    }

    @Test
    void loginFailedTestNewAttempt() {
        String testUsername = "TestUsername";

        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.empty());
        loginAttemptService.loginFailed(testUsername);
        verify(loginAttemptRepository).save(argThat(newLoginAttempt ->
                        newLoginAttempt.getUsername().equals(testUsername) &&
                        newLoginAttempt.getAttempts() == 1 &&
                        newLoginAttempt.getLastAttempt() != null));
    }

    @Test
    void loginFailedTestExistingAttempt() {
        String testUsername = "TestUsername";

        LoginAttempt workingLoginAttempt = new LoginAttempt();
        workingLoginAttempt.setUsername(testUsername);
        workingLoginAttempt.setLastAttempt(LocalDateTime.now().minusSeconds((long)5));
        workingLoginAttempt.setAttempts(1);
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.of(workingLoginAttempt));
        loginAttemptService.loginFailed(testUsername);
        verify(loginAttemptRepository).save(argThat(newLoginAttempt ->
                newLoginAttempt.getUsername().equals(testUsername) &&
                newLoginAttempt.getAttempts() == 2 &&
                newLoginAttempt.getLastAttempt() != null));

        LoginAttempt workingLoginAttempt2 = new LoginAttempt();
        workingLoginAttempt2.setUsername(testUsername);
        workingLoginAttempt2.setLastAttempt(LocalDateTime.now().minusSeconds((long)40));
        workingLoginAttempt2.setAttempts(2);
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.of(workingLoginAttempt2));
        loginAttemptService.loginFailed(testUsername);
        verify(loginAttemptRepository).save(argThat(newLoginAttempt1 ->
                newLoginAttempt1.getUsername().equals(testUsername) &&
                newLoginAttempt1.getAttempts() == 1 &&
                newLoginAttempt1.getLastAttempt() != null));
    }

    @Test
    void canAttemptLoginTest(){
        String testUsername = "TestUsername";

        // the Optional<LoginAttempt> object is empty
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.empty());
        assertTrue(loginAttemptService.canAttemptLogin(testUsername));

        // the Optional<LoginAttempt> object is not empty
        // attempts is less than 3
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.of(loginAttempt));
        when(loginAttempt.getAttempts()).thenReturn(2);
        assertTrue(loginAttemptService.canAttemptLogin(testUsername));

        // the Optional<LoginAttempt> object is not empty
        // attempts is greater than or equal to 3
        // time between attempts is more than a minute
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.of(loginAttempt));
        when(loginAttempt.getAttempts()).thenReturn(3);
        when(loginAttempt.getLastAttempt()).thenReturn(LocalDateTime.now().minusMinutes(5));
        assertTrue(loginAttemptService.canAttemptLogin(testUsername));

        // the Optional<LoginAttempt> object is not empty
        // attempts is greater than or equal to 3
        // time between attempts is less than a minute
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.of(loginAttempt));
        when(loginAttempt.getAttempts()).thenReturn(3);
        when(loginAttempt.getLastAttempt()).thenReturn(LocalDateTime.now().minusSeconds((long)5));
        assertFalse(loginAttemptService.canAttemptLogin(testUsername));
    }

    @Test
    void getLockOutTimeTest(){
        String testUsername = "TestUsername";

        // the Optional<LoginAttempt> object is empty
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.empty());
        assertEquals(0, loginAttemptService.getLockoutTime(testUsername));

        // the Optional<LoginAttempt> object is not empty
        // the lockout time of one minute is not over and 55 seconds are remaining
        when(loginAttemptRepository.findById(testUsername)).thenReturn(Optional.of(loginAttempt));
        when(loginAttempt.getLastAttempt()).thenReturn(LocalDateTime.now().minusSeconds((long)5));
        assertEquals(25, loginAttemptService.getLockoutTime(testUsername));

    }

}