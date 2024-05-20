package com.example.stage.controller;

import com.example.stage.entity.Parking;
import com.example.stage.repository.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parkings")
    @CrossOrigin(origins = "http://localhost:3000")
public class ParkingController {
    private final ParkingRepository parkingRepository;

    @Autowired
    public ParkingController(ParkingRepository parkingRepository) {
        this.parkingRepository = parkingRepository;
    }

    @GetMapping
    public List<Parking> getParkings() {
        return parkingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Parking getParking(@PathVariable Long id) {
        return parkingRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<Parking> createParking(@RequestBody Parking parking) {
        parking.setFloors(parking.generateFloors());
        Parking newParking = parkingRepository.saveAndFlush(parking); // Use saveAndFlush to persist and flush changes
        newParking.getFloors().size(); // Eagerly fetch the floors

        return ResponseEntity.status(HttpStatus.CREATED).body(newParking);
    }


    // Other endpoints and methods...

}
