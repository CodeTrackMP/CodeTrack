package com.codetrack.backend.dto.response;

import lombok.Data;

@Data
public class TopicActivityResponse {
    private String topic;
    private Integer count;
}