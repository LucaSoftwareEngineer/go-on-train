package com.luca.engineer.backend.services;

import com.luca.engineer.backend.dto.RegisterRequest;
import com.luca.engineer.backend.dto.RegisterResponse;
import com.luca.engineer.backend.models.Utente;
import com.luca.engineer.backend.repositories.RuoloRepository;
import com.luca.engineer.backend.repositories.UtenteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UtenteRepository utenteRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final RuoloRepository ruoloRepository;

    public RegisterResponse registerUser(RegisterRequest request) {

        request.setPassword(passwordEncoder.encode(request.getPassword()));

        Utente utente = modelMapper.map(request, Utente.class);
        utente.setRuolo(ruoloRepository.findById(2L).get());
        utente = utenteRepository.save(utente);

        return modelMapper.map(utente, RegisterResponse.class);

    }

}
