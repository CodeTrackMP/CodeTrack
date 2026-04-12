package com.codetrack.backend.controller;

import com.codetrack.backend.dto.response.*;
import com.codetrack.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<StatsOverviewResponse> getStats() {
        return ResponseEntity.ok(dashboardService.getStatsOverview());
    }

    @GetMapping("/platforms")
    public ResponseEntity<List<PlatformStatsResponse>> getPlatforms() {
        return ResponseEntity.ok(dashboardService.getPlatformStats());
    }

    @GetMapping("/heatmap")
    public ResponseEntity<List<HeatmapEntryResponse>> getHeatmap() {
        return ResponseEntity.ok(dashboardService.getHeatmap());
    }

    @GetMapping("/topics")
    public ResponseEntity<List<TopicActivityResponse>> getTopics() {
        return ResponseEntity.ok(dashboardService.getTopicActivity());
    }
}