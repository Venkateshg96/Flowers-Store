package com.wipro.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name="product-service",url="http://localhost:8080/")
public interface ProductFeign {
	
	@GetMapping("/api/v1/product/getProduct/{category}/{id}")
	public Product getProduct(@PathVariable long id,@PathVariable String category) ;

}
