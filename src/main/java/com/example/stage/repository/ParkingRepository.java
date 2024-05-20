package com.example.stage.repository;

import com.example.stage.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingRepository extends JpaRepository<Parking, Long> {
   Parking findBynomParking(String nomParking);
}
