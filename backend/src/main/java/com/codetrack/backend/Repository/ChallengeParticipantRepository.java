package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.ChallengeParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeParticipantRepository extends JpaRepository<ChallengeParticipant, Long> {
    List<ChallengeParticipant> findByChallengeId(Long challengeId);
    List<ChallengeParticipant> findByUserId(Long userId);
    Optional<ChallengeParticipant> findByChallengeIdAndUserId(Long challengeId, Long userId);
    List<ChallengeParticipant> findByChallengeIdOrderByRankAsc(Long challengeId);
}
