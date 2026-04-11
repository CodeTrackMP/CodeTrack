package com.codetrack.backend.Repository;

import com.codetrack.backend.Entity.DailyStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyStatsRepository extends JpaRepository<DailyStats, Long> {
    Optional<DailyStats> findByUserIdAndStatDate(Long userId, LocalDate statDate);
    List<DailyStats> findByUserIdOrderByStatDateDesc(Long userId);
    List<DailyStats> findByUserIdAndStatDateBetweenOrderByStatDateAsc(Long userId, LocalDate from, LocalDate to);
}