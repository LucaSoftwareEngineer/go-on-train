package com.luca.engineer.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    public String nome;
    public String cognome;
    public String email;
    public String password;
    public LocalDate dataNascita;
    public String luogoNascita;
}