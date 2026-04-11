package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByCreatorId(Long creatorId);
}
