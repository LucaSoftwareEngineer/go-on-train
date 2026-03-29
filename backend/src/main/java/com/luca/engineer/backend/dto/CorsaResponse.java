package com.luca.engineer.backend.dto;

import com.luca.engineer.backend.models.Utente;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CorsaResponse {

    private Long id;
    private LocalDate partenzaData;
    private LocalTime partenzaOra;
    private String partenzaLuogo;
    private LocalDate arrivoData;
    private LocalTime arrivoOra;
    private String arrivoLuogo;

}
