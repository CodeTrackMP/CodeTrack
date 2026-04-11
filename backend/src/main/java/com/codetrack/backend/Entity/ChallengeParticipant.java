package com.codetrack.backend.Entity;

import com.codetrack.backend.Enum.ParticipantStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "challenge_participants")
@Data
public class ChallengeParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
@Column(nullable = false, columnDefinition = "participant_status")
@JdbcTypeCode(SqlTypes.NAMED_ENUM)
private ParticipantStatus status = ParticipantStatus.INVITED;

    @Column(name = "problems_solved", nullable = false)
    private Integer problemsSolved = 0;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal score = new BigDecimal("0.00");

    private Integer rank;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
