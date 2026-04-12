package com.codetrack.backend.dto.response;

import lombok.Data;
import java.util.List;

@Data
public class PlatformStatsResponse {
    private String name;
    private String logo;
    private String color;
    private Integer solved;
    private Integer streak;
    private Integer easy;
    private Integer medium;
    private Integer hard;
    private List<String> topics;
}