package com.luca.engineer.backend.services;

import com.luca.engineer.backend.config.JwtUtil;
import com.luca.engineer.backend.models.Utente;
import com.luca.engineer.backend.repositories.UtenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthDetailsService implements UserDetailsService {

    private final UtenteRepository utenteRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utente utente = utenteRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User.withUsername(
                utente
                    .getEmail())
                    .password(utente.getPassword())
                    .roles(utente.getRuolo().getTesto())
                    .build();
    }

}
