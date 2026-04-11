package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.Problem;
import com.codetrack.backend.Enum.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findByPlatformIdAndPlatformProblemId(Integer platformId, String platformProblemId);
    List<Problem> findByDifficulty(Difficulty difficulty);
    List<Problem> findByPlatformId(Integer platformId);
}