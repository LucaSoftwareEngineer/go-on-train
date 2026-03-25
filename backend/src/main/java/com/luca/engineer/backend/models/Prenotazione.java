package com.luca.engineer.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "prenotazione")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prenotazione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pre_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pre_ute_id")
    private Utente utente;

    @ManyToOne
    @JoinColumn(name = "pre_cor_id")
    private Corsa corsa;

    @Column(name = "pre_timestamp")
    private LocalDateTime timestamp;

}