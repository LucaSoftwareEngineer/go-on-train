package com.luca.engineer.backend.services;

import com.luca.engineer.backend.dto.PasswordResetRequest;
import com.luca.engineer.backend.dto.PasswordUpdateRequest;
import com.luca.engineer.backend.dto.PasswordUpdateResponse;
import com.luca.engineer.backend.exceptions.OtpIsNotvalid;
import com.luca.engineer.backend.models.Utente;
import com.luca.engineer.backend.repositories.UtenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final JavaMailSender javaMailSender;
    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${config.mail.address}")
    private String mailAddressConfig;

    public void reset(PasswordResetRequest request) {

        int otp = generateOtpCode();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime optExpiration = now.plusMinutes(60);

        Utente utente = utenteRepository.findByEmail(request.getEmail()).get();

        if (utente != null) {
            utente.setOptResetPassword(String.valueOf(otp));
            utente.setOptExpiration(optExpiration);
            utenteRepository.save(utente);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailAddressConfig);
            message.setTo(request.getEmail());
            message.setSubject("Reset della password - Go On The Train");
            message.setText(getMailReset(otp));
            javaMailSender.send(message);
        } else {
            throw new UsernameNotFoundException("user not found");
        }
    }

    public PasswordUpdateResponse update(PasswordUpdateRequest request) throws OtpIsNotvalid {
        String email = request.getEmail();
        String rawPassword = request.getRawPassword();
        String hashedPassword = passwordEncoder.encode(rawPassword);
        String otp = request.getOptResetPassword();
        Utente utente = utenteRepository.findByEmail(email).get();
        if (utente != null) {
            if (!utente.getOptResetPassword().equals(otp)) {
                throw new OtpIsNotvalid();
            } else {
                if (LocalDateTime.now().isBefore(utente.getOptExpiration())) {
                    utente.setPassword(hashedPassword);
                    utente.setOptResetPassword(null);
                    utente.setOptExpiration(null);
                    try {
                        utenteRepository.save(utente);
                    } catch (Exception e) {
                        return new PasswordUpdateResponse(false);
                    }
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(mailAddressConfig);
                    message.setTo(request.getEmail());
                    message.setSubject("Modifica della password - Go On The Train");
                    message.setText(getMailUpdate());
                    javaMailSender.send(message);
                    return new PasswordUpdateResponse(true);
                } else {
                    throw new OtpIsNotvalid();
                }
            }
        } else {
            throw new UsernameNotFoundException("user not found");
        }
    }

    public static String getMailReset(int otp) {
        String MAIL_TEMPLATE = new String();
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("Gentile cliente, \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("le confermiamo di aver ricevuto la sua richiesta di modifica della password \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("può modificarla recandosi al seguente link: \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("http://localhost:4200/password/update\n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("ed inserendo il seguente codice quando ti verrà richiesto \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("Codice: "+String.valueOf(otp)+" \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("cordiali saluti \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("Il Team di Go On The Train \n");
        return MAIL_TEMPLATE;
    }

    public static String getMailUpdate() {
        String MAIL_TEMPLATE = new String();
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("Gentile cliente, \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("le confermiamo che la sua password è stata modificata \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("cordiali saluti \n");
        MAIL_TEMPLATE = MAIL_TEMPLATE.concat("Il Team di Go On The Train \n");
        return MAIL_TEMPLATE;
    }

    public static int generateOtpCode() {
        Random random = new Random();
        int range = 90000000;
        return 10000000 + random.nextInt(range);
    }

}
