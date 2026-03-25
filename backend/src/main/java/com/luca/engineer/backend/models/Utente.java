package com.luca.engineer.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "utenti")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ute_id")
    private Integer id;

    @Column(name = "ute_nome", nullable = false)
    private String nome;

    @Column(name = "ute_cognome", nullable = false)
    private String cognome;

    @Column(name = "ute_email", nullable = false, unique = true)
    private String email;

    @Column(name = "ute_password", nullable = false)
    private String password;

    @Column(name = "ute_data_nascita")
    private LocalDate dataNascita;

    @Column(name = "ute_luogo_nascita")
    private String luogoNascita;

    @ManyToOne
    @JoinColumn(name = "ute_ruo_id")
    private Ruolo ruolo;

}