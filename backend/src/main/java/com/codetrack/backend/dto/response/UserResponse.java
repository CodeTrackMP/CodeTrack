package com.codetrack.backend.dto.response;

import com.codetrack.backend.Enum.UserRole;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String avatarUrl;
    private UserRole role;
}