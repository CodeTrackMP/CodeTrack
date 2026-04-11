package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserCredentialRepository extends JpaRepository<UserCredentials, Long> {
    Optional<UserCredentials> findByUserId(Long userId);
}
