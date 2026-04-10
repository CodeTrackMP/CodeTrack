package com.codetrack.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(
    name = "daily_stats",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "stat_date"})
    }
)
public class DailyStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "stat_date", nullable = false)
    private LocalDate statDate;

    @Column(name = "problems_solved", nullable = false)
    private Integer problemsSolved = 0;

    @Column(name = "easy_solved", nullable = false)
    private Integer easySolved = 0;

    @Column(name = "medium_solved", nullable = false)
    private Integer mediumSolved = 0;

    @Column(name = "hard_solved", nullable = false)
    private Integer hardSolved = 0;

    @Column(name = "contests_participated", nullable = false)
    private Integer contestsParticipated = 0;

    @ElementCollection
    @CollectionTable(name = "daily_stats_platforms", joinColumns = @JoinColumn(name = "daily_stats_id"))
    @Column(name = "platform")
    private List<String> activePlatforms;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}
