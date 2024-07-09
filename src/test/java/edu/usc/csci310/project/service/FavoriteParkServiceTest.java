package edu.usc.csci310.project.service;

import edu.usc.csci310.project.model.FavoritePark;
import edu.usc.csci310.project.repository.FavoriteParkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class FavoriteParkServiceTest {

    private FavoriteParkService favoriteParkService;
    private FavoriteParkRepository favoriteParkRepository;

    @BeforeEach
    void initTest(){
        favoriteParkRepository = mock();
        favoriteParkService = new FavoriteParkService(favoriteParkRepository);
    }

    @Test
    void deleteFavoriteParkTest(){

        String username = "Username";
        String parkCode = "ParkCode";

        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(new FavoritePark("Username", "abli"));
        favoriteParks.add(new FavoritePark("Username", "asdf"));
        when(favoriteParkRepository.findByUserUsernameAndParkCode(username, parkCode)).thenReturn(favoriteParks);

        assertEquals("abli", favoriteParkService.deleteFavoritePark(username, parkCode).getParkCode());

    }

    @Test
    void deleteFavoriteParkTestFirst(){
        String username = "Username";
        String parkCode = "ParkCode";

        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(new FavoritePark("Username", "asdf"));
        favoriteParks.get(0).setRanking(1);
        favoriteParks.add(new FavoritePark("Username", "abli"));
        favoriteParks.get(1).setRanking(2);
        when(favoriteParkRepository.findByUserUsernameAndParkCode(username, parkCode)).thenReturn(favoriteParks);
        when(favoriteParkRepository.findByUserUsername(username)).thenReturn(favoriteParks);

        assertEquals("asdf", favoriteParkService.deleteFavoritePark(username, parkCode).getParkCode());

    }

    @Test
    void addFavoriteParkTest(){
        String userUsername = "UserName";
        String parkCode = "abli";

        FavoritePark favoritePark = new FavoritePark();
        favoritePark.setUserUsername(userUsername);
        favoritePark.setParkCode(parkCode);
        when(favoriteParkRepository.save(any(FavoritePark.class))).thenReturn(favoritePark);
        assertEquals(parkCode, favoriteParkService.addFavoritePark(userUsername, parkCode).getParkCode());
    }

    @Test
    void getFavoriteParksByUserUsernameTest(){
        List<FavoritePark> favoriteParks = new ArrayList<>();
        favoriteParks.add(new FavoritePark("Username", "abli"));

        when(favoriteParkRepository.findByUserUsername(anyString())).thenReturn(favoriteParks);
        assertEquals(1, favoriteParkService.getFavoriteParksByUserUsername("Username").size());
    }

    @Test
    void isFavoriteTest(){
//        public boolean isFavorite(String userUsername, String parkCode) {
//            return !favoriteParkRepository.findByUserUsernameAndParkCode(userUsername, parkCode).isEmpty();
//        }
        List<FavoritePark> favoriteParks = new ArrayList<>();
        when(favoriteParkRepository.findByUserUsernameAndParkCode(anyString(),anyString())).thenReturn(favoriteParks);
        assertFalse(favoriteParkService.isFavorite("TestUser", "TestPassword"));

        favoriteParks.add(new FavoritePark("Username", "abli"));
        when(favoriteParkRepository.findByUserUsernameAndParkCode(anyString(),anyString())).thenReturn(favoriteParks);
        assertTrue(favoriteParkService.isFavorite("TestUser", "TestPassword"));


    }

    @Test
    public void testUpdateFavoriteParks() {
        // Arrange
        String userUsername = "user123";
        List<FavoritePark> favorites = Arrays.asList(
                new FavoritePark("Yosemite", "lwck"),
                new FavoritePark("Zion", "akdd"),
                new FavoritePark("Grand Canyon", "akcm")
        );

        // Act
        favoriteParkService.updateFavoriteParks(userUsername, favorites);

        // Assert
        // Verify rankings are set as expected
        for (int i = 0; i < favorites.size(); i++) {
            assertEquals(i + 1, favorites.get(i).getRanking());
        }

        // Verify saveAll was called with the correctly ranked parks
        verify(favoriteParkRepository).saveAll(favorites);
    }
    @Test
    public void testUpdateFavoriteNoParks() {
        String userUsername = "user123";
        List<FavoritePark> favorites = Arrays.asList(
        );
        favoriteParkService.updateFavoriteParks(userUsername, favorites);
        assertEquals(0, favoriteParkService.getFavoriteParksByUserUsername("user123").size());


        verify(favoriteParkRepository).saveAll(favorites);
    }

    @Test
    void suggestCommonFavoriteParkTest() {
        // Given
        List<String> usernames = Arrays.asList("user1", "user2");
        List<FavoritePark> user1Parks = Arrays.asList(
                new FavoritePark("user1", "park1"),
                new FavoritePark("user1", "park2")
        );
        user1Parks.get(0).setRanking(1);
        user1Parks.get(1).setRanking(2);

        List<FavoritePark> user2Parks = Arrays.asList(
                new FavoritePark("user2", "park1"),
                new FavoritePark("user2", "park2"),
                new FavoritePark("user2", "park3")
        );

        user2Parks.get(0).setRanking(1);
        user2Parks.get(1).setRanking(2);

        when(favoriteParkRepository.findByUserUsername("user1")).thenReturn(user1Parks);
        when(favoriteParkRepository.findByUserUsername("user2")).thenReturn(user2Parks);

        // Act
        String suggestedParkCode = favoriteParkService.suggestCommonFavoritePark(usernames);

        // Assert
        assertNotNull(suggestedParkCode);
        assertEquals("park1", suggestedParkCode);
    }

    @Test
    void suggestCommonFavoriteParkNoCommonTest() {
        List<String> usernames = Arrays.asList("user3", "user4");
        List<FavoritePark> user3Parks = List.of(
                new FavoritePark("user3", "park4")
        );
        user3Parks.get(0).setRanking(1);
        List<FavoritePark> user4Parks = List.of(
                new FavoritePark("user4", "park5")
        );
        user4Parks.get(0).setRanking(1);


        when(favoriteParkRepository.findByUserUsername("user3")).thenReturn(user3Parks);
        when(favoriteParkRepository.findByUserUsername("user4")).thenReturn(user4Parks);

        // Act
        String suggestedParkCode = favoriteParkService.suggestCommonFavoritePark(usernames);

        // Assert
        assertEquals(null, suggestedParkCode);
    }

}