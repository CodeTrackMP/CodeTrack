package com.codetrack.backend.dto.request;


import com.codetrack.backend.Enum.Difficulty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class ProblemResponse {
     private Long id;
    private String platformName;
    private String platformProblemId;
    private String title;
    private Difficulty difficulty;
    private Integer rating;
    private String url;
    private List<String> tags;
    
}
