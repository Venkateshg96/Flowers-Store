package com.wipro.admin.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.admin.entity.Product;
import com.wipro.admin.feign.ProductFeign;


@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = {"*"})
public class AdminController {
	
	@Autowired
	ProductFeign productFeign;
	
	
	@GetMapping("/product/getAllProducts/{category}")
	public List<Product> getProduct(@PathVariable String category) {
		return productFeign.getAllProductsByCategory(category);
		
	}
	
	
	@PostMapping("/product/addProduct")
	public Map<String,Boolean> saveProduct(@RequestBody Product product) throws IOException {
		return productFeign.saveProduct(product);
		
	}
	
	
	@DeleteMapping("/product/delete/{productId}")
	public Map<String,Boolean> deleteById(@PathVariable long productId) {
		return productFeign.deleteById(productId);
	}
	
	
	
	
	
	
	
	
	@PutMapping("/product/update")	
	public Map<String,Boolean> updateProduct(@RequestBody Product p) throws Exception{
		return productFeign.updateProduct(p);
	}
	
	
	@PutMapping("/product/updateQuantity")
	public Product updateProductQuantity(@RequestBody Product p) {
		return productFeign.updateProductQuantity(p);
		
	}
	
	
	@GetMapping("/product/getProduct/{category}/{id}")
	public Product getProduct(@PathVariable long id,@PathVariable String category) {
		
		return productFeign.getProduct(id, category);
	}
	
	
	

}
