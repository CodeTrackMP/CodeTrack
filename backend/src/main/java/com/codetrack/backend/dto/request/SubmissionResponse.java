package com.codetrack.backend.dto.request;


import com.codetrack.backend.Enum.Difficulty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder

public class SubmissionResponse {
    private Long id;
    private String platformName;
    private String problemTitle;
    private String problemUrl;
    private Difficulty difficulty;
    private String status;
    private String language;
    private LocalDateTime solvedAt;
    private Integer timeTakenSeconds;
    private Boolean isFirstSolve;
    
}
