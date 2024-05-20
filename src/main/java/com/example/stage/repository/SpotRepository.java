package com.example.stage.repository;

import com.example.stage.entity.Spot;
import com.example.stage.entity.Floor;
import com.example.stage.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpotRepository extends JpaRepository<Spot, Long> {
    List<Spot> findByFloorAndFloor_Parking(Floor floor, Parking parking);
    List<Spot> findByFloorId(Long floorId);
    Optional<Spot> findByIdAndFloor_Parking(Long id, Parking parking);
    Optional<Spot> findFirstByFloorAndDisponibleOrderByNumberAsc(Floor floor, boolean disponible);
    List<Spot> findByFloorAndDisponibleOrderByNumberDesc(Floor floor, boolean disponible);
    List<Spot> findByFloor(Floor floor); // Add this custom method
}
