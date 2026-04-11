package com.codetrack.backend.Entity;
import com.codetrack.backend.Enum.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(
    name = "problems",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"platform_id", "platform_problem_id"})
    }
)
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    @Column(name = "platform_problem_id", nullable = false, length = 100)
    private String platformProblemId;

    @Column(nullable = false, length = 500)
    private String title;

    @Enumerated(EnumType.STRING)
@Column(nullable = false, columnDefinition = "difficulty")
@JdbcTypeCode(SqlTypes.NAMED_ENUM)
private Difficulty difficulty = Difficulty.UNRATED;
    private Integer rating;

    @Column(length = 500)
    private String url;

    @ElementCollection
    @CollectionTable(name = "problem_tags", joinColumns = @JoinColumn(name = "problem_id"))
    @Column(name = "tag")
    private List<String> tags;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
