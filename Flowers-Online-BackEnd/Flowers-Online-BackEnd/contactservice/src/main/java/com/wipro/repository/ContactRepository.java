package com.wipro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long>{

}
