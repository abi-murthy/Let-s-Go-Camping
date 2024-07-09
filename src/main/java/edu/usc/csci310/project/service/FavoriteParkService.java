package edu.usc.csci310.project.service;

import edu.usc.csci310.project.model.FavoritePark;
import edu.usc.csci310.project.repository.FavoriteParkRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FavoriteParkService {

    private final FavoriteParkRepository favoriteParkRepository;

    public FavoriteParkService(FavoriteParkRepository favoriteParkRepository) {
        this.favoriteParkRepository = favoriteParkRepository;
    }

    @Transactional
    public FavoritePark deleteFavoritePark(String userUsername, String parkCode) {
        List<FavoritePark> favoriteParks = favoriteParkRepository.findByUserUsernameAndParkCode(userUsername, parkCode);

        FavoritePark deletedPark = favoriteParks.get(0);
        int deletedRank = deletedPark.getRanking();
        favoriteParkRepository.delete(deletedPark);

        // Adjust the ranks of higher ranked parks
        List<FavoritePark> higherRankedParks = favoriteParkRepository.findByUserUsername(userUsername);
        higherRankedParks.stream()
                .filter(park -> park.getRanking() > deletedRank)
                .forEach(park -> park.setRanking(park.getRanking() - 1));
        favoriteParkRepository.saveAll(higherRankedParks);
        return deletedPark;

    }


    @Transactional
    public void updateFavoriteParks(String userUsername, List<FavoritePark> updatedFavorites) {
        // Assuming updatedFavorites are already sorted in the desired order with updated rankings
        for (int i = 0; i < updatedFavorites.size(); i++) {
            updatedFavorites.get(i).setRanking(i + 1); // Reset rankings based on their order in the list
        }
        favoriteParkRepository.saveAll(updatedFavorites);
    }
    public FavoritePark addFavoritePark(String userUsername, String parkCode) {
        Integer maxRank = favoriteParkRepository.findMaxRankByUserUsername(userUsername);
        int newRank = maxRank + 1;

        FavoritePark favoritePark = new FavoritePark();
        favoritePark.setUserUsername(userUsername);
        favoritePark.setParkCode(parkCode);
        favoritePark.setRanking(newRank);

        return favoriteParkRepository.save(favoritePark);
    }



    public List<FavoritePark> getFavoriteParksByUserUsername(String userUsername) {
        return favoriteParkRepository.findByUserUsername(userUsername);
    }

    public boolean isFavorite(String userUsername, String parkCode) {
        return !favoriteParkRepository.findByUserUsernameAndParkCode(userUsername, parkCode).isEmpty();
    }

    public Map<String, List<String>> findCommonFavoriteParksWithUsers(List<String> usernames) {
        List<FavoritePark> favoriteParks = favoriteParkRepository.findByUserUsernameIn(usernames);

        Map<String, List<String>> parkCodeToUsernamesMap = favoriteParks.stream()
                .collect(Collectors.groupingBy(FavoritePark::getParkCode,
                        Collectors.mapping(FavoritePark::getUserUsername, Collectors.toList())));

        return parkCodeToUsernamesMap;
    }

    public String suggestCommonFavoritePark(List<String> usernames) {
        Map<String, Integer> parkScores = new HashMap<>();
        int numParks = 0;
        for (String username : usernames) {
            List<FavoritePark> favorites = getFavoriteParksByUserUsername(username);
            numParks+=favorites.size();
            for (FavoritePark favorite : favorites) {
                int score = favorites.size() - favorite.getRanking() + 1;
                parkScores.put(favorite.getParkCode(), parkScores.getOrDefault(favorite.getParkCode(), 0) + score);
            }
        }
        if (numParks==parkScores.keySet().size()){
            return null;
        }

        // Find the park with the highest score
        Optional<Map.Entry<String, Integer>> suggestedPark = parkScores.entrySet().stream()
                .max(Map.Entry.comparingByValue());

        return suggestedPark.map(Map.Entry::getKey).orElse(null);
    }

    public void deleteAllFavoritesByUserUsername(String userUsername){
        List<FavoritePark> favoriteParks = favoriteParkRepository.findByUserUsername(userUsername);

        if(!favoriteParks.isEmpty()){
            favoriteParkRepository.deleteAllInBatch(favoriteParks);
        }
    }

}
