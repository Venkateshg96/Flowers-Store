package com.wipro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.model.Contact;
import com.wipro.repository.ContactRepository;

@Service
public class ContactService {

	@Autowired
	private ContactRepository contactRepo;
	
	public Contact saveContac(Contact c) {
		return contactRepo.save(c);
	}
	
}
