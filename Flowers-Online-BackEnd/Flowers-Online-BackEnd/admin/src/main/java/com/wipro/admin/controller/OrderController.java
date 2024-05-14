package com.wipro.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.admin.entity.Order;
import com.wipro.admin.feign.OrderFeign;



@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = {"*"})
public class OrderController {
	
	@Autowired
	private OrderFeign orderFeign;
	
	
	
	@GetMapping("/order/getAllUsersOrders")
	public List<Order> getAllUsersOrders() {
		
		return orderFeign.getAllUsersOrders();
	}
	

}
