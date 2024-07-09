package edu.usc.csci310.project.service;

import edu.usc.csci310.project.model.LoginAttempt;
import edu.usc.csci310.project.repository.LoginAttemptRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class LoginAttemptService {


    private final LoginAttemptRepository loginAttemptRepository;

    public LoginAttemptService(LoginAttemptRepository loginAttemptRepository){
        this.loginAttemptRepository = loginAttemptRepository;
    }

    public void loginSucceeded(String username) {
        Optional<LoginAttempt> loginAttempt = loginAttemptRepository.findById(username);
        if (loginAttempt.isPresent()){
            loginAttemptRepository.deleteById(username);
        }
    }

    public void loginFailed(String username) {
        Optional<LoginAttempt> attemptOptional = loginAttemptRepository.findById(username);
        if (attemptOptional.isPresent()) {
            LoginAttempt attempt = attemptOptional.get();

            long secondsSinceLastAttempt = Duration.between(attempt.getLastAttempt(), LocalDateTime.now()).getSeconds();

            if (secondsSinceLastAttempt > 30) {
                attempt.setAttempts(1);
                attempt.setLastAttempt(LocalDateTime.now());
            } else {
                attempt.setAttempts(attempt.getAttempts() + 1);
                attempt.setLastAttempt(LocalDateTime.now());
            }

            loginAttemptRepository.save(attempt);
        } else {
            LoginAttempt newAttempt = new LoginAttempt();
            newAttempt.setUsername(username);
            newAttempt.setAttempts(1);
            newAttempt.setLastAttempt(LocalDateTime.now());
            loginAttemptRepository.save(newAttempt);
        }
    }


    public boolean canAttemptLogin(String username) {
        Optional<LoginAttempt> attempt = loginAttemptRepository.findById(username);
        return attempt.isEmpty() || attempt.get().getAttempts() < 3 ||
                Duration.between(attempt.get().getLastAttempt(), LocalDateTime.now()).toSeconds() >= 30;
    }

    public long getLockoutTime(String username) {
        Optional<LoginAttempt> attempt = loginAttemptRepository.findById(username);
        if (attempt.isPresent()) {
            long seconds = 30 - Duration.between(attempt.get().getLastAttempt(), LocalDateTime.now()).toSeconds();
            return Math.max(seconds, 0);
        }
        return 0;
    }
}
