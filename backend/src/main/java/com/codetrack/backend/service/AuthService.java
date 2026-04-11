package com.codetrack.backend.service;

import com.codetrack.backend.dto.request.LoginRequest;
import com.codetrack.backend.dto.request.RegisterRequest;
import com.codetrack.backend.dto.response.AuthResponse;
import com.codetrack.backend.Entity.User;
import com.codetrack.backend.Entity.UserCredentials;
import com.codetrack.backend.Repository.UserCredentialRepository;
import com.codetrack.backend.Repository.UserRepository;
import com.codetrack.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserCredentialRepository userCredentialRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        // Create user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        userRepository.save(user);

        // Create credentials
        UserCredentials credential = new UserCredentials();
        credential.setUser(user);
        credential.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        userCredentialRepository.save(credential);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getFullName());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        UserCredentials credential = userCredentialRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), credential.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getFullName());
    }
}