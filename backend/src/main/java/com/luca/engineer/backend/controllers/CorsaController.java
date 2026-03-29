package com.luca.engineer.backend.controllers;

import com.luca.engineer.backend.dto.RegistraCorsaRequest;
import com.luca.engineer.backend.dto.RegistraCorsaResponse;
import com.luca.engineer.backend.services.CorsaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class CorsaController {

    private final CorsaService corsaService;

    @PostMapping("corsa/add")
    public ResponseEntity<RegistraCorsaResponse> registraCorsa(@RequestHeader("Authorization") String token, @RequestBody RegistraCorsaRequest request) {
        try {
            return ResponseEntity.ok().body(corsaService.registraCorsa(token, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
