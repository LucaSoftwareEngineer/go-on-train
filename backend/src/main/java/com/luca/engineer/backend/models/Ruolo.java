package com.luca.engineer.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ruoli")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ruolo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ruo_id")
    private Integer id;

    @Column(name = "ruo_testo", nullable = false)
    private String testo;

    @OneToMany(mappedBy = "ruolo")
    private List<Utente> utenti;
    
}
