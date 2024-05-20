package com.example.stage.controller;

import com.example.stage.entity.Floor;
import com.example.stage.entity.Parking;
import com.example.stage.entity.Spot;
import com.example.stage.repository.FloorRepository;
import com.example.stage.repository.ParkingRepository;
import com.example.stage.repository.SpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/floors")
public class FloorController {

    private final FloorRepository floorRepository;
    private final SpotRepository spotRepository;
    private final ParkingRepository parkingRepository ;

    @Autowired
    public FloorController(FloorRepository floorRepository, SpotRepository spotRepository, ParkingRepository parkingRepository) {
        this.floorRepository = floorRepository;
        this.spotRepository = spotRepository;
        this.parkingRepository = parkingRepository;
    }

    // Other endpoints...

    @PutMapping("/parkings/{parkingId}/{floorId}/generate-spots")
    public ResponseEntity<String> generateSpotsForFloor(@PathVariable Long parkingId, @PathVariable Long floorId, @RequestBody int spotsPerFloor) {
        Parking parking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

        Floor floor = floorRepository.findById(floorId)
                .orElseThrow(() -> new RuntimeException("Floor not found with id: " + floorId));

        floor.setSpotsPerFloor(spotsPerFloor);
        List<Spot> generatedSpots = generateSpots(spotsPerFloor, floor);
        floor.setSpots(generatedSpots);

        floorRepository.save(floor);

        return ResponseEntity.ok("Spots generated successfully for floor with id: " + floorId);
    }


    private List<Spot> generateSpots(int spotsPerFloor, Floor floor) {
        List<Spot> generatedSpots = new ArrayList<>();

        int spotCount = 1;
        for (int spot = 1; spot <= spotsPerFloor; spot++) {
            String spotNumber = String.valueOf(spotCount++);
            boolean disponible = true; // Set the initial value of disponible as true
            Spot generatedSpot = new Spot(spotNumber, disponible, floor);
            generatedSpots.add(generatedSpot);
        }

        return generatedSpots;
    }

    }