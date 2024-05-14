package com.wipro.ratingservice.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.ratingservice.model.EmailDetails;
import com.wipro.ratingservice.service.EmailSenderService;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/v1/rating")
public class EmailController {

	
	@Autowired 
	private EmailSenderService emailService;
	
	@PostMapping("/sendMail")
    public Map<String, Boolean> sendMail(@RequestBody EmailDetails details)
    {
		System.out.println(details);
        String status
            = emailService.sendSimpleMail(details);
        
        Map<String, Boolean> respons = new HashMap<>();
		respons.put(status, Boolean.TRUE);
	    return respons;
    }
}
