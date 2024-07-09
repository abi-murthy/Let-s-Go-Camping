package edu.usc.csci310.project.repository;

import edu.usc.csci310.project.model.FavoritePark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;


import java.util.List;

public interface FavoriteParkRepository extends JpaRepository<FavoritePark, Long> {
    List<FavoritePark> findByUserUsername(String userUsername);

//    @Query("SELECT fp FROM FavoritePark fp WHERE fp.userUsername = ?1 AND fp.parkCode = ?2")
    List<FavoritePark> findByUserUsernameAndParkCode(String userUsername, String parkCode);

    void deleteAllInBatch(@NonNull Iterable<FavoritePark> favoriteParks);

    List<FavoritePark> findByUserUsernameIn(List<String> usernames);

    @Query("SELECT COALESCE(MAX(fp.ranking), 0) FROM FavoritePark fp WHERE fp.userUsername = ?1")
    Integer findMaxRankByUserUsername(String userUsername);
}
