package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlatformRepository extends JpaRepository<Platform, Integer> {
    Optional<Platform> findByName(String name);
}