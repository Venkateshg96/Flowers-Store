package com.wipro.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.exception.UserAlreadyExitsException;

import com.wipro.model.User;
import com.wipro.repository.UserRepository;
import com.wipro.services.JwtSecurityTokenGenerator;

@RestController
@RequestMapping("/api/v1/userservice")
@CrossOrigin(origins = {"*"})
public class UserController {
	
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	JwtSecurityTokenGenerator tokenGenerator;
	
	
	@PostMapping("/register")
	public ResponseEntity<User> saveUser(@RequestBody User u) throws Exception {
		User exist = userRepo.findByEmail(u.getEmail());
		
		if(exist!=null) {
			throw new UserAlreadyExitsException("User Already Exists");
			
			
		}else {
			return new ResponseEntity<User>(userRepo.save(u),HttpStatus.CREATED);
		}
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User loginDetails) throws Exception{
		User exits = userRepo.findByEmailAndPassword(loginDetails.getEmail(),loginDetails.getPassword());
		
		if (null == loginDetails.getEmail() || null == loginDetails.getPassword()) {
			throw new Exception("User Id or Password canot be empty.");
		}
		User user = userRepo.findByEmailAndPassword(loginDetails.getEmail(), loginDetails.getPassword());
		if(exits!=null)
		{
			Map<String, String> map = tokenGenerator.generateToken(user);	
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
		}
		return new ResponseEntity<>("Email and password not valid", HttpStatus.UNAUTHORIZED);
	}
	
	
	@GetMapping("/getAllUsers")
	public List<User>  getAllUsers() {
		return userRepo.findAll();
	}
	
	
	@PostMapping("/loginForUpdate")
	public Map<String, Boolean> loginChecker(@RequestBody User loginDetails) throws Exception{
		User exits = userRepo.findByEmailAndPassword(loginDetails.getEmail(),loginDetails.getPassword());
		if (exits==null) {
			throw new Exception("User Id or Password canot be empty.");
		}
		Map<String, Boolean> respons = new HashMap<>();
		respons.put("User Found", Boolean.TRUE);
		return respons;
	}
	
	@PutMapping("/updatePassword")
	public  Map<String, Boolean> updatePassword(@RequestBody User u) throws Exception {
		User exits = userRepo.findByEmail(u.getEmail());
		
		if(exits==null)
		{
			throw new Exception("User not found with the email");
		}
		
		exits.setPassword(u.getPassword());
		userRepo.save(exits);
		Map<String, Boolean> respons = new HashMap<>();
		respons.put("User Updated Sucessfully", Boolean.TRUE);
		return respons;
		
	}

}
