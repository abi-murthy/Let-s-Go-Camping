package edu.usc.csci310.project.service;

import edu.usc.csci310.project.model.FavoritePark;
import edu.usc.csci310.project.model.User;
import edu.usc.csci310.project.repository.FavoriteParkRepository;
import edu.usc.csci310.project.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final FavoriteParkRepository favoriteParkRepository;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FavoriteParkRepository favoriteParkRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.favoriteParkRepository = favoriteParkRepository;
    }

    public Map<String, List<String>> getUsersAndTheirFavoriteParks() {
        Map<String, Boolean> userVisibilityMap = userRepository.findAll().stream()
                .collect(Collectors.toMap(User::getUsername, User::getIs_favorites_public));

        List<FavoritePark> favoriteParks = favoriteParkRepository.findAll();

        Map<String, List<String>> publicFavoriteParks = favoriteParks.stream()
                .filter(favoritePark -> userVisibilityMap.getOrDefault(favoritePark.getUserUsername(), false))
                .collect(Collectors.groupingBy(
                        FavoritePark::getUserUsername,
                        Collectors.mapping(FavoritePark::getParkCode, Collectors.toList())
                ));

        return publicFavoriteParks;
    }


    public boolean userExists(String username){
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return true;
        }
        return false;
    }

    public boolean authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return passwordEncoder.matches(password, user.get().getPassword());
        }
        return false;
    }
    public void createUser(String username, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(username, hashedPassword);
        userRepository.save(newUser);
    }

    public Optional<Long> findUserIdByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(User::getId);
    }

    public boolean changeUserListVisibility(String username, Boolean priv) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            User usr = user.get();
            usr.setIs_favorites_public(priv);
            userRepository.save(usr);
            return true;
        }
        return false;
    }

    public Optional<Boolean> findListVisByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(User::getIs_favorites_public);
    }



}
