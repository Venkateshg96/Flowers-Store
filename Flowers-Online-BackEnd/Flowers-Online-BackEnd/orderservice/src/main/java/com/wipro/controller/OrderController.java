package com.wipro.controller;



import java.util.Date;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.wipro.model.BillingAddress;
import com.wipro.model.Order;
import com.wipro.model.Products;
import com.wipro.repository.OrderRepository;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;



@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/v1/order")
public class OrderController {
	
	@Autowired
	private OrderRepository orderRepo;
	
	
	
	public String getToken(final HttpServletRequest request) {
		
		  final String authHeader = request.getHeader("authorization"); 
		  final String token = authHeader.substring(7); 
		  String emailId =Jwts.parser().setSigningKey("wipro").parseClaimsJws(token).getBody().getSubject();
		  return emailId;
	}
	
	
	
	@PostMapping("/placeOrder")
	public Order saveOrder(@RequestBody Order order,HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		if(order.getProducts()==null && order.getBillingAddress()==null)
		{
			throw new Exception("SomeThing went Wrong");
		}
		
		order.setEmail(this.getToken(request));
		order.setId(this.generateRandom(6));
		order.setOrderDate(new Date());
		
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		List<Products> products = order.getProducts();
		
		for(Products p:products ) {
			HttpEntity<Products> requestEntity = new HttpEntity<>(p, headers);
			restTemplate.put("http://localhost:8080/api/v1/product/updateQuantity", requestEntity);
		}
		return orderRepo.save(order);
	
		
	}
	
	@GetMapping("/getProducts")
	@Transactional
	public List<Order> getOrdera(HttpServletRequest request, HttpServletResponse response) {
		
		List<Order> orderDetails = (List<Order>) orderRepo.findAllByEmail(this.getToken(request));
		System.out.println(orderDetails);
		return orderDetails;
	}
	
	
	@GetMapping("/getProduct/{orderId}")
	public Order getOrderDeatilsByOrderId(@PathVariable long orderId) {
		return orderRepo.findById(orderId).orElse(null);
	}
	
	
	@GetMapping("/getAllProducts")
	public List<Order> getAllProducts(){
		return orderRepo.findAll();
	}
	
	
	@GetMapping("/getAllUsersOrders")
	public List<Order> getOrdersForAdmin() {
		List<Order> orderDetails = (List<Order>) orderRepo.findAll();
		System.out.println(orderDetails);
		return orderDetails;
	}
	
	
	
	
	
	
	public long generateRandom(int length) 
	{
		Random random=new Random();
		char[] digits=new char[length];
		digits[0]=(char)(random.nextInt(9) +'1');
		for(int i=1;i<length;i++) 
		{
			digits[i]=(char)(random.nextInt(10) + '0');
		}
		return Long.parseLong(new String(digits));
	}
	


}
