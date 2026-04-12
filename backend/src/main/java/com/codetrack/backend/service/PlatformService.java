package com.codetrack.backend.service;

import com.codetrack.backend.dto.request.PlatformConnectionRequest;
import com.codetrack.backend.dto.response.PlatformConnectionResponse;
import com.codetrack.backend.Entity.Platform;
import com.codetrack.backend.Entity.User;
import com.codetrack.backend.Entity.UserPlatformConnection;
import com.codetrack.backend.Repository.PlatformRepository;
import com.codetrack.backend.Repository.UserPlatformConnectionRepository;
import com.codetrack.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlatformService {

    private final UserRepository userRepository;
    private final PlatformRepository platformRepository;
    private final UserPlatformConnectionRepository connectionRepository;

    public PlatformConnectionResponse connectPlatform(PlatformConnectionRequest request) {
        User user = getCurrentUser();

        Platform platform = platformRepository.findById(request.getPlatformId())
                .orElseThrow(() -> new RuntimeException("Platform not found"));

        if (connectionRepository.existsByUserIdAndPlatformId(user.getId(), platform.getId())) {
            throw new RuntimeException("Platform already connected");
        }

        UserPlatformConnection connection = new UserPlatformConnection();
        connection.setUser(user);
        connection.setPlatform(platform);
        connection.setPlatformUsername(request.getPlatformUsername());
        connectionRepository.save(connection);

        return mapToResponse(connection);
    }

    public List<PlatformConnectionResponse> getMyConnections() {
        User user = getCurrentUser();
        return connectionRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void disconnectPlatform(Integer platformId) {
        User user = getCurrentUser();
        UserPlatformConnection connection = connectionRepository
                .findByUserIdAndPlatformId(user.getId(), platformId)
                .orElseThrow(() -> new RuntimeException("Connection not found"));
        connectionRepository.delete(connection);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private PlatformConnectionResponse mapToResponse(UserPlatformConnection connection) {
        PlatformConnectionResponse response = new PlatformConnectionResponse();
        response.setId(connection.getId());
        response.setPlatformName(connection.getPlatform().getName());
        response.setPlatformUsername(connection.getPlatformUsername());
        response.setIsActive(connection.getIsActive());
        response.setSyncStatus(connection.getSyncStatus());
        response.setLastSyncedAt(connection.getLastSyncedAt());
        return response;
    }
}
