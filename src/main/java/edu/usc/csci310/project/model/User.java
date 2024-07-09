package edu.usc.csci310.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "is_favorites_public")
    private Boolean is_favorites_public;

    @Column(nullable = false)
    private String password;

    public User() {
    }

    public User(String username, String password, boolean is_favorites_public) {
        this.username = username;
        this.password = password;
        this.is_favorites_public = is_favorites_public;
    }

    public User(String username, String password) {
        this(username, password, false); // Call the main constructor with false for is_favorites_public
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getIs_favorites_public() {
        return is_favorites_public;
    }

    public void setIs_favorites_public(Boolean is_favorites_public) {
        this.is_favorites_public = is_favorites_public;
    }
}
