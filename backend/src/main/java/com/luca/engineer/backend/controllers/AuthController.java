package com.luca.engineer.backend.controllers;

import com.luca.engineer.backend.config.JwtUtil;
import com.luca.engineer.backend.dto.LoginRequest;
import com.luca.engineer.backend.dto.LoginResponse;
import com.luca.engineer.backend.dto.RegisterRequest;
import com.luca.engineer.backend.dto.RegisterResponse;
import com.luca.engineer.backend.services.AuthDetailsService;
import com.luca.engineer.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("auth/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(request.getEmail());

        String ruolo = authentication.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new LoginResponse(token, ruolo));
    }

    @PostMapping("user/register")
    public ResponseEntity<RegisterResponse> registerUser(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok().body(userService.registerUser(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
