package com.example.stage.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Parking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idParking;
    private String nomParking;
    private double longitude;
    private double latitude;
    private String adresse;
    private int nbrPlace;
    private int numberOfFloors;
    private String image;

    @OneToMany(mappedBy = "parking", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore // Add this annotation to   ignore the serialization of floors in Parking

    private List<Floor> floors;

    // Default constructor
    public Parking() {
    }

    // Constructor with all attributes
    public Parking(String nomParking, double longitude, double latitude, String adresse, int nbrPlace,
                   int numberOfFloors) {
        this.nomParking = nomParking;
        this.longitude = longitude;
        this.latitude = latitude;
        this.adresse = adresse;
        this.nbrPlace = nbrPlace;
        this.numberOfFloors = numberOfFloors;
        this.floors = generateFloors(); // Call the generateFloors() method to create floors and associate them with the parking.
    }

    public List<Floor> generateFloors() {
        List<Floor> generatedFloors = new ArrayList<>();

        for (int floorNumber = 1; floorNumber <= numberOfFloors; floorNumber++) {
            Floor floor = new Floor(floorNumber, 0); // Use floorNumber as the floor number

            // Set the parking entity in the floor
            floor.setParking(this); // Set the current parking entity as the association

            generatedFloors.add(floor);
        }

        return generatedFloors;
    }


    // Getters and setters
    public Long getIdParking() {
        return idParking;
    }

    public void setIdParking(Long idParking) {
        this.idParking = idParking;
    }

    public String getNomParking() {
        return nomParking;
    }

    public void setNomParking(String nomParking) {
        this.nomParking = nomParking;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public int getNbrPlace() {
        return nbrPlace;
    }

    public void setNbrPlace(int nbrPlace) {
        this.nbrPlace = nbrPlace;
    }



    public int getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(int numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Floor> getFloors() {
        return floors;
    }

    public void setFloors(List<Floor> floors) {
        this.floors = floors;
    }
}
