package com.luca.engineer.backend.services;

import com.luca.engineer.backend.config.JwtUtil;
import com.luca.engineer.backend.dto.RegistraCorsaRequest;
import com.luca.engineer.backend.dto.RegistraCorsaResponse;
import com.luca.engineer.backend.exceptions.UserNotFound;
import com.luca.engineer.backend.exceptions.UserUnauthorized;
import com.luca.engineer.backend.models.Corsa;
import com.luca.engineer.backend.models.Utente;
import com.luca.engineer.backend.repositories.CorsaRepository;
import com.luca.engineer.backend.repositories.UtenteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CorsaService {

    private final CorsaRepository corsaRepository;
    private final UtenteRepository utenteRepository;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;

    public RegistraCorsaResponse registraCorsa(String token, RegistraCorsaRequest request) throws UserNotFound, UserUnauthorized {

        token = jwtUtil.rimuoviBearer(token);

        Corsa corsa = modelMapper.map(request, Corsa.class);
        Utente amministratore = utenteRepository.findByEmail(jwtUtil.extractUsername(token)).get();

        if (amministratore == null) {
            throw new UserNotFound();
        }

        if (amministratore.getRuolo().getId() != 1L) {
            throw new UserUnauthorized();
        }

        corsa.setAmministratore(amministratore);
        corsaRepository.save(corsa);

        return modelMapper.map(corsa, RegistraCorsaResponse.class);

    }

}
