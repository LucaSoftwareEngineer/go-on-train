package com.luca.engineer.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "corsa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Corsa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cor_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cor_adm_id")
    private Utente amministratore;

    @Column(name = "cor_partenza_data")
    private LocalDate partenzaData;

    @Column(name = "cor_partenza_ora")
    private LocalTime partenzaOra;

    @Column(name = "cor_partenza_luogo")
    private String partenzaLuogo;

    @Column(name = "cor_arrivo_data")
    private LocalDate arrivoData;

    @Column(name = "cor_arrivo_ora")
    private LocalTime arrivoOra;

    @Column(name = "cor_arrivo_luogo")
    private String arrivoLuogo;

    @OneToMany(mappedBy = "corsa")
    private List<Prenotazione> prenotazioni;

}
