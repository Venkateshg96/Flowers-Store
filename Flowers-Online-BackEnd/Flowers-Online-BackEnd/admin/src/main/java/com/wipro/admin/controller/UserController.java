package com.wipro.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.admin.entity.User;
import com.wipro.admin.feign.UserFeign;


@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = {"*"})
public class UserController {
	
	@Autowired
	private UserFeign userFeign;
	
	
	@GetMapping("/userservice/getAllUsers")
	public List<User>  getAllUsers() {
		return userFeign.getAllUsers();
	}

}
