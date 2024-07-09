package edu.usc.csci310.project.utility;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.crypto.SecretKey;

class JwtTokenFilterTest {

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    private final SecretKey jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @InjectMocks
    private JwtTokenFilter jwtTokenFilter = new JwtTokenFilter(jwtSecretKey);



    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.clearContext();

    }

    @Test
    void testValidTokenSetsAuthentication() throws Exception {
        String username = "testUser";
        String token = Jwts.builder()
                .claim("username", username)
                .signWith(jwtSecretKey)
                .compact();

        Cookie jwtCookie = new Cookie("JWT", token);
        when(request.getCookies()).thenReturn(new Cookie[]{jwtCookie});

        jwtTokenFilter.doFilterInternal(request, response, filterChain);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals(username, SecurityContextHolder.getContext().getAuthentication().getName());

        verify(filterChain, times(1)).doFilter(request, response); // Ensure chain.doFilter is called
    }

    @Test
    void testInvalidTokenClearsSecurityContext() throws Exception {
        Cookie jwtCookie = new Cookie("JWT", "invalidToken");
        when(request.getCookies()).thenReturn(new Cookie[]{jwtCookie});

        jwtTokenFilter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain, times(1)).doFilter(request, response);
    }
    @Test
    void testInvalidTokenSetsAuthentication() throws Exception {
        String username = "testUser";
        String token = Jwts.builder()
                .claim("username", username)
                .signWith(jwtSecretKey)
                .compact();

        Cookie jwtCookie = new Cookie("JWT2", token);
        when(request.getCookies()).thenReturn(new Cookie[]{jwtCookie});

        jwtTokenFilter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());

        verify(filterChain, times(1)).doFilter(request, response); // Ensure chain.doFilter is called
    }

    @Test
    public void whenTokenIsEmpty_thenDoFilterAndReturn() throws Exception {

        Cookie jwtCookie = new Cookie("JWT", "");
        // Set up an empty JWT cookie
        when(request.getCookies()).thenReturn(new Cookie[]{jwtCookie});

        // Execute the filter with the mock request
        jwtTokenFilter.doFilterInternal(request, response, filterChain);

        // Verify doFilter is called, which indicates we passed through the filter chain
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    public void whenCookiesNull_thenDoFilterAndReturn() throws Exception {



        jwtTokenFilter.doFilterInternal(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
    }

}
