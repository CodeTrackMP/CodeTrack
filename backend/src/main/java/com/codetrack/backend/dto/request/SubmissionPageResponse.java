package com.codetrack.backend.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class SubmissionPageResponse {
    private List<SubmissionResponse> submissions;
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private boolean hasNext;
    private boolean hasPrevious;
    
}
