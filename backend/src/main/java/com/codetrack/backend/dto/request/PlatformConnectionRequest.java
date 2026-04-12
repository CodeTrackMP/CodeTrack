package com.codetrack.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlatformConnectionRequest {

    @NotNull(message = "Platform ID is required")
    private Integer platformId;

    @NotBlank(message = "Platform username is required")
    private String platformUsername;
}