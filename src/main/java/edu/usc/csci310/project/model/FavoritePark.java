package edu.usc.csci310.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favorite_parks")
public class FavoritePark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    @Column(name = "user_username")
    private String userUsername;

    @Column(name = "park_code")
    private String parkCode;

    @Column(name = "ranking")
    private int ranking;

    public FavoritePark() {}

    public FavoritePark(String userUsername, String parkCode) {
        this.userUsername = userUsername;
        this.parkCode = parkCode;
    }

    public Long getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(Long favoriteId) {
        this.favoriteId = favoriteId;
    }

    public String getUserUsername() {
        return userUsername;
    }

    public void setUserUsername(String userUsername) {
        this.userUsername = userUsername;
    }

    public String getParkCode() {
        return parkCode;
    }

    public void setParkCode(String parkCode) {
        this.parkCode = parkCode;
    }

    public int getRanking() {
        return ranking;
    }

    public void setRanking(int ranking) {
        this.ranking = ranking;
    }
}

