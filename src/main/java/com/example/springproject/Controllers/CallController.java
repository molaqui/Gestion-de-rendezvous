package com.example.springproject.Controllers;

import com.example.springproject.Services.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/call")
public class CallController {

    @Autowired
    TwilioService twillioService;

    @Value("${app.twillio.fromPhoneNo}")
    private String from;

    @Value("${app.twillio.toPhoneNo}")
    private String to;





    @GetMapping("/makeCall")
    public String makeVoiceCall() {

        twillioService.makeCall(from, to);
        return "call initiated..";
    }
}
