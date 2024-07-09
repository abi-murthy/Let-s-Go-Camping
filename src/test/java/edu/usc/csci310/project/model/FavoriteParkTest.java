package edu.usc.csci310.project.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FavoriteParkTest {

    @Test
    void favoriteParkTest(){
        FavoritePark favoritePark = new FavoritePark();
        favoritePark.setFavoriteId((long)123);
        favoritePark.setParkCode("ParkCodeTest");
        favoritePark.setUserUsername("UserNameTest");

        assertEquals((long)123, favoritePark.getFavoriteId());
        assertEquals("ParkCodeTest", favoritePark.getParkCode());
        assertEquals("UserNameTest", favoritePark.getUserUsername());
    }

}