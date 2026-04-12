package com.codetrack.backend.dto.response;

import com.codetrack.backend.Enum.SyncStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PlatformConnectionResponse {
    private Long id;
    private String platformName;
    private String platformUsername;
    private Boolean isActive;
    private SyncStatus syncStatus;
    private LocalDateTime lastSyncedAt;
}