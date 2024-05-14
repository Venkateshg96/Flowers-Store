package com.wipro.admin.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.wipro.admin.entity.Order;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@FeignClient(name = "ORDER-SERVICE")
public interface OrderFeign {
	
	
	
	@GetMapping("/api/v1/order/getAllUsersOrders")
	public List<Order> getAllUsersOrders();

}
