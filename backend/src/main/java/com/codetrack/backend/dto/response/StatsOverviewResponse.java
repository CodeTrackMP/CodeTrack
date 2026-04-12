package com.codetrack.backend.dto.response;

import lombok.Data;

@Data
public class StatsOverviewResponse {
    private Integer totalSolved;
    private Integer currentStreak;
    private Integer ranking;
    private Double accuracy;
}