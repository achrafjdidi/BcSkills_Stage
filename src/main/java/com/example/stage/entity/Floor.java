package com.example.stage.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@Entity
public class Floor{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int number;
    private int spotsPerFloor;

    public Floor(int floorNumber) {
    }

    public Parking getParking() {
        return parking;
    }

    public void setParking(Parking parking) {
        this.parking = parking;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_id")

    private Parking parking;
    @JsonIgnore
    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL)
    private List<Spot> spots;

    // Default constructor
    public Floor() {
    }

    // Constructor with all attributes
    public Floor(int number, int spotsPerFloor) {
        this.number = number;
        this.spotsPerFloor = spotsPerFloor;
        this.spots = generateSpots();
    }

    private List<Spot> generateSpots() {
        List<Spot> generatedSpots = new ArrayList<>();

        int spotCount = 1;
        for (int spot = 1; spot <= spotsPerFloor; spot++) {
            String spotNumber = String.valueOf(spotCount++);
            boolean disponible = true; // Set the initial value of disponible as true
            Spot generatedSpot = new Spot(spotNumber, disponible, this);
            generatedSpots.add(generatedSpot);
        }

        return generatedSpots;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSpotsPerFloor() {
        return spotsPerFloor;
    }

    public void setSpotsPerFloor(int spotsPerFloor) {
        this.spotsPerFloor = spotsPerFloor;
    }

    public List<Spot> getSpots() {
        return spots;
    }

    public void setSpots(List<Spot> spots) {
        this.spots = spots;
    }
}
