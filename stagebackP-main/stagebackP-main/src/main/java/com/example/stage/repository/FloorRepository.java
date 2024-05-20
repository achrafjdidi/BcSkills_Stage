package com.example.stage.repository;

import com.example.stage.entity.Floor;
import com.example.stage.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FloorRepository extends JpaRepository<Floor, Long> {
    Optional<Floor> findByParkingAndNumber(Parking parking, int number);    }