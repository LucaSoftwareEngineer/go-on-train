package com.luca.engineer.backend.repositories;

import com.luca.engineer.backend.models.Corsa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorsaRepository extends JpaRepository<Corsa, Long> {
}
