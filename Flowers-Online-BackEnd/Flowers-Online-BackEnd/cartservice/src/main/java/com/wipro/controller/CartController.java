package com.wipro.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.entity.Cart;
import com.wipro.exception.UnauthorizedException;
import com.wipro.feign.Product;
import com.wipro.feign.ProductFeign;
import com.wipro.repository.CartRepository;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/v1/cart")
public class CartController {
	
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private ProductFeign productFeign;
	
	
	public String getToken(final HttpServletRequest request) {
		
		  final String authHeader = request.getHeader("authorization"); 
		  final String token = authHeader.substring(7); 
		  String emailId =Jwts.parser().setSigningKey("wipro").parseClaimsJws(token).getBody().getSubject();
		  return emailId;
	}
	

	@PostMapping("/addToCart")
	public Cart addToCart(@RequestBody Cart c,HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Product p = productFeign.getProduct(c.getProductId(), c.getCategory());
		
		if(p!=null) {
			c.setQuantity(1);
			
			Cart exitsItem = cartRepo.findByProductIdAndEmail(c.getProductId(),this.getToken(request));
			
			if(exitsItem!=null) {
				throw new Exception("Product Alraedy Exists");
			}
			c.setEmail(this.getToken(request));
			return cartRepo.save(c);
			
		}
		throw new Exception("Please try to add valid product to cart");
	}
	
	@GetMapping("/getProducts")
	public List<Cart> getProducts(HttpServletRequest request, HttpServletResponse response){
		try {
			List<Cart> c = cartRepo.findAllByEmail(this.getToken(request));
			System.out.println(c);
			return c;
			
		}catch (Exception e) {
			throw new UnauthorizedException("You are not authorized to access");
		}
		
	}
	
	@DeleteMapping("/delete/{productId}")
	@Transactional
	public Map<String, Boolean> deleteByProdutId(@PathVariable long productId,HttpServletRequest request, HttpServletResponse response){
		cartRepo.deleteByProductIdAndEmail(productId,this.getToken(request));
		Map<String, Boolean> respons = new HashMap<>();
		respons.put("Product Deleted SucessFully", Boolean.TRUE);
		return respons;
		
	}
	
	@DeleteMapping("/deleteAll")
	@Transactional
	public Map<String, Boolean> deleteAllFromCart(HttpServletRequest request, HttpServletResponse response){
		cartRepo.deleteAllByEmail(this.getToken(request));
		Map<String, Boolean> respons = new HashMap<>();
		respons.put("deleted", Boolean.TRUE);
	    return respons;		
	}
	
	
	@DeleteMapping("/deleteAllByProductId/{productId}")
	@Transactional
	public Map<String, Boolean> deleteAllByProductIdFromCart(@PathVariable long productId){
		cartRepo.deleteAllByProductId(productId);
		Map<String, Boolean> respons = new HashMap<>();
		respons.put("deleted sucessfully", Boolean.TRUE);
	    return respons;	
	}
	
	@PutMapping("/updateCart")
	public Map<String, Boolean> updateCart(@RequestBody Cart c){
		Cart exits = cartRepo.findById(c.getId()).orElse(null);
		exits.setQuantity(c.getQuantity());
		cartRepo.save(exits);
		Map<String, Boolean> respons = new HashMap<>();
		respons.put("deleted sucessfully", Boolean.TRUE);
	    return respons;	
	}
}
