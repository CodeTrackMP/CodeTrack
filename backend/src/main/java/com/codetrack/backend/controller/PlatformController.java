package com.codetrack.backend.controller;

import com.codetrack.backend.dto.request.PlatformConnectionRequest;
import com.codetrack.backend.dto.response.PlatformConnectionResponse;
import com.codetrack.backend.service.PlatformService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/platforms")
@RequiredArgsConstructor
public class PlatformController {

    private final PlatformService platformService;

    @PostMapping("/connect")
    public ResponseEntity<PlatformConnectionResponse> connect(
            @Valid @RequestBody PlatformConnectionRequest request) {
        return ResponseEntity.ok(platformService.connectPlatform(request));
    }

    @GetMapping("/my-connections")
    public ResponseEntity<List<PlatformConnectionResponse>> getMyConnections() {
        return ResponseEntity.ok(platformService.getMyConnections());
    }

    @DeleteMapping("/disconnect/{platformId}")
    public ResponseEntity<Void> disconnect(@PathVariable Integer platformId) {
        platformService.disconnectPlatform(platformId);
        return ResponseEntity.noContent().build();
    }
}
