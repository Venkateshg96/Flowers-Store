package com.wipro.admin.feign;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.wipro.admin.entity.Product;


@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductFeign {


	
	
	@GetMapping("/api/v1/product/getProducts/{category}")
	public List<Product> getAllProductsByCategory(@PathVariable String category);
	
	
	
	
	@PostMapping("/api/v1/product/addProduct")
	public Map<String,Boolean> saveProduct(@RequestBody Product product) throws IOException ;
	
	
	@DeleteMapping("/api/v1/product/delete/{productId}")
	public Map<String,Boolean> deleteById(@PathVariable long productId) ;
	
	
	
	@PutMapping("/api/v1/product/update")	
	public Map<String,Boolean> updateProduct(@RequestBody Product p) throws Exception;
	
	
	@PutMapping("/api/v1/product/updateQuantity")
	public Product updateProductQuantity(@RequestBody Product p) ;
	
	@GetMapping("/getProduct/{category}/{id}")
	public Product getProduct(@PathVariable long id,@PathVariable String category);

}
