package com.codetrack.backend.dto.request;
import com.codetrack.backend.Enum.Difficulty;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SubmissionRequest {
     @NotNull
    private Long platformId;

    @NotBlank
    private String platformProblemId;   // e.g. "two-sum" or "1"

    @NotBlank
    private String title;

    @NotNull
    private Difficulty difficulty;

    private List<String> tags;          // e.g. ["array", "hashmap"]

    @NotBlank
    private String status;              // "Accepted", "Wrong Answer", etc.

    @NotBlank
    private String language;            // "Java", "Python", etc.

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime solvedAt;

    private Integer timeTakenSeconds;   // optional
    
}
