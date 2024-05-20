package com.example.stage.controller;

import com.example.stage.DataDto;
import com.example.stage.entity.Floor;
import com.example.stage.entity.Parking;
import com.example.stage.entity.Spot;
import com.example.stage.repository.FloorRepository;
import com.example.stage.repository.ParkingRepository;
import com.example.stage.repository.SpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/spots")
@CrossOrigin(origins = "*")

public class SpotController {

    private final SpotRepository spotRepository;
    private final ParkingRepository parkingRepository;
    private final FloorRepository floorRepository;

    @Autowired
    public SpotController(SpotRepository spotRepository, ParkingRepository parkingRepository, FloorRepository floorRepository) {
        this.spotRepository = spotRepository;
        this.parkingRepository = parkingRepository;
        this.floorRepository = floorRepository;
    }

    @GetMapping("/{parkingId}/{floorId}")
    public List<Spot> getSpotsByParkingIdAndFloorId(@PathVariable Long parkingId, @PathVariable Long floorId) {
        Parking parking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

        Floor floor = floorRepository.findById(floorId)
                .orElseThrow(() -> new RuntimeException("Floor not found with id: " + floorId));

        return spotRepository.findByFloorAndFloor_Parking(floor, parking);
    }

        @PostMapping("/{parkingId}/{floorId}")
        public Spot addSpot(@PathVariable Long parkingId, @PathVariable Long floorId) {
            Parking parking = parkingRepository.findById(parkingId)
                    .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

            Floor floor = floorRepository.findById(floorId)
                    .orElseThrow(() -> new RuntimeException("Floor not found with id: " + floorId));

            // Get the current number of spots on the selected floor
            List<Spot> spotsOnFloor = spotRepository.findByFloor(floor);
            int numberOfSpots = spotsOnFloor.size();

            // Create a new spot and associate it with the selected floor and parking
            Spot newSpot = new Spot();
            newSpot.setFloor(floor);
            newSpot.setNumber(String.valueOf(numberOfSpots + 1)); // Set the new spot number based on the current number of spots
            newSpot.setDisponible(true); // Set the new spot as available (change it if needed)
            return spotRepository.save(newSpot);
        }

    @DeleteMapping("/{parkingId}/{floorId}")
    public void decreaseSpot(@PathVariable Long parkingId, @PathVariable Long floorId) {
        Parking parking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

        Floor floor = floorRepository.findById(floorId)
                .orElseThrow(() -> new RuntimeException("Floor not found with id: " + floorId));

        // Get the last added spot on the selected floor and delete it from the database
        List<Spot> spots = spotRepository.findByFloorAndDisponibleOrderByNumberDesc(floor, true);
        if (!spots.isEmpty()) {
            Spot lastAddedSpot = spots.get(0);
            spotRepository.delete(lastAddedSpot);
        }
    }

    @GetMapping("/{parkingId}/floors") // New endpoint to get floors by parking ID
    public List<Floor> getFloorsByParkingId(@PathVariable Long parkingId) {
        Parking parking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

        return parking.getFloors();
    }
    @GetMapping("/{parkingId}/spot/{spotId}/availability")
    public boolean getSpotAvailability(@PathVariable Long parkingId, @PathVariable Long spotId) {
        Parking parking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));
        Optional<Spot> spotOptional = spotRepository.findByIdAndFloor_Parking(spotId, parking);
        return spotOptional.map(Spot::isDisponible).orElse(false);
    }
    @PostMapping("/saveData")
    public ResponseEntity<String> saveData(@RequestBody DataDto dataDto) {
        String receivedData = dataDto.getData();

        // Assuming the data is 0 or 1 representing false/true for disponible
        boolean disponible = receivedData.equals("1") ? true : false;

        // Get the spot with ID 1 from the database
        Optional<Spot> spotOptional = spotRepository.findById(1L);

        // If the spot with ID 1 exists, update its disponible value and save it back to the database
        if (spotOptional.isPresent()) {
            Spot spot = spotOptional.get();
            spot.setDisponible(disponible);
            spotRepository.save(spot);
            return ResponseEntity.ok("Data saved to the database successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


