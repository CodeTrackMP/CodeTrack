package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.UserPlatformConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserPlatformConnectionRepository extends JpaRepository<UserPlatformConnection, Long> {
    List<UserPlatformConnection> findByUserId(Long userId);
    Optional<UserPlatformConnection> findByUserIdAndPlatformId(Long userId, Integer platformId);
    Boolean existsByUserIdAndPlatformId(Long userId, Integer platformId);
}