package com.example.stage.controller;

import com.example.stage.entity.Spot;
import com.example.stage.repository.SpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SpotRepository spotRepository; // Inject the SpotRepository to access the database

    @MessageMapping("/updateSpot")
    @SendTo("/topic/spotUpdates")
    public Spot updateSpotAvailability(String data) {
        boolean availability = Boolean.parseBoolean(data);

        // Assuming you have a Spot with ID 1 in the database
        Spot spot = spotRepository.findById(1L).orElse(null);
        if (spot != null) {
            spot.setDisponible(availability);
            spotRepository.save(spot);
        }

        return spot;
    }
}





