package com.wipro.products.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.PutExchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wipro.products.exception.ProductNotFoundException;
import com.wipro.products.model.Product;
import com.wipro.products.repository.ProductRepository;

import jakarta.servlet.annotation.MultipartConfig;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/v1/product")

public class ProductController {
	
	@Autowired
	private ProductRepository productRepo;
	
	
	@PostMapping("/addProduct")
	public Map<String,Boolean> saveProduct(@RequestBody Product product) throws IOException {
		product.setDate(new Date());
		productRepo.save(product);
		Map<String,Boolean> responce = new HashMap<String,Boolean>();
		responce.put("Product created successfully.", true);
		return responce;
		
	}
	
//	@GetMapping("/getProducts/{productId}")
//	public ResponseEntity<byte[]>  getAllProducts(@PathVariable Long productId){
//		Optional<Product> productOptional = productRepo.findById(productId);
//		Product product = productOptional.get();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        
//        return new ResponseEntity<>(product.getImageData(), headers, HttpStatus.OK);
//	}
//	
	
	@GetMapping("/getProducts/{category}")
	public List<Product> getAllProductsByCategory(@PathVariable String category){
		
		if(category.equals("all")) {
			return productRepo.findAll();
		}
		
		List<Product> product  =  productRepo.findAllByCategory(category);
		List<Product> list = new ArrayList<Product>();
        for(Product p:product) {
        	list.add(new Product(p.getId(),p.getQuantity(),p.getProductName(),p.getDate(),p.getSize(),p.getCategory(),
        			p.getPrice(),p.getDescription(),p.getImageUrl()));
        }
        return list;
	}

	
	@GetMapping("/getProduct/{category}/{id}")
	public Product getProduct(@PathVariable long id,@PathVariable String category) {
		Product product = productRepo.findByIdAndCategory(id,category);
		if(product==null) {
			throw new ProductNotFoundException("Product Not Found with Id "+id);
		}
		return product;
	}
	
	@DeleteMapping("/delete/{productId}")
	public Map<String,Boolean> deleteById(@PathVariable long productId) {
		productRepo.deleteById(productId);
		Map<String,Boolean> responce = new HashMap<String,Boolean>();
		responce.put("Product Deleted successfully.", true);
		return responce;
	}
	
	
	@PutMapping("/update")	
	public Map<String,Boolean> updateProduct(@RequestBody Product p) throws Exception{
		Product exits = productRepo.findById(p.getId()).orElse(null);
		
		if(exits!=null) {
			exits.setCategory(p.getCategory());
			exits.setDate(p.getDate());
			exits.setDescription(p.getDescription());
			exits.setImageUrl(p.getImageUrl());
			exits.setProductName(p.getProductName());
			exits.setSize(p.getSize());
			exits.setPrice(p.getPrice());
			exits.setQuantity(p.getQuantity());
			productRepo.save(exits);
			Map<String,Boolean> responce = new HashMap<String,Boolean>();
			responce.put("Product Deleted successfully.", true);
			return responce;
		}
		throw new Exception("Some wentWrong || product not found");
	}
	
	@PutMapping("/updateQuantity")
	public Product updateProductQuantity(@RequestBody Product p) {
		Product exits = productRepo.findById(p.getId()).orElse(null);
		exits.setQuantity(exits.getQuantity()-p.getQuantity());
		return productRepo.save(exits);
		
	}
}
