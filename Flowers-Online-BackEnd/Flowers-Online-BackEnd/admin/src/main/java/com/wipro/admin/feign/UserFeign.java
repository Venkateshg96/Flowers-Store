package com.wipro.admin.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.wipro.admin.entity.User;



@FeignClient(name = "USER-SERVICE")
public interface UserFeign {
	
	
	
	@GetMapping("/api/v1/userservice/getAllUsers")
	public List<User>  getAllUsers() ;

}
