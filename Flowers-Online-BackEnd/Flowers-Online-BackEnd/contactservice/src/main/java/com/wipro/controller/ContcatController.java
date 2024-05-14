package com.wipro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.model.Contact;
import com.wipro.service.ContactService;

@RestController

@CrossOrigin(origins = {"*"})
@RequestMapping("/api/v1/contact")
public class ContcatController {
	
	@Autowired
	private ContactService cartService;
	
	@PostMapping("/saveContact")
	public Contact saveContact(@RequestBody Contact c) {
		return cartService.saveContac(c);
	}

}
