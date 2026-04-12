package com.codetrack.backend.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class HeatmapEntryResponse {
    private LocalDate date;
    private Integer count;
}