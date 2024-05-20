package com.example.stage.entity;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")

@Entity
public class Spot{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;
    private boolean disponible;

    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor;

    // Default constructor
    public Spot() {
    }

    // Constructor with all attributes
    public Spot(String number, boolean disponible, Floor floor) {
        this.number = number;
        this.disponible = disponible;
        this.floor = floor;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public Floor getFloor() {
        return floor;
    }

    public void setFloor(Floor floor) {
        this.floor = floor;
    }
}
