package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserIdOrderBySolvedAtDesc(Long userId);
    List<Submission> findByUserIdAndPlatformId(Long userId, Integer platformId);

    @Query("SELECT COUNT(s) FROM Submission s WHERE s.user.id = :userId AND s.isFirstSolve = true")
    Long countUniqueSolvedByUserId(@Param("userId") Long userId);

    Boolean existsByUserIdAndProblemId(Long userId, Long problemId);
}
