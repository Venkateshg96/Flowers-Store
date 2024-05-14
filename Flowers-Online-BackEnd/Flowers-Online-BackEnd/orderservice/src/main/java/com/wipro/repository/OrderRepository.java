package com.wipro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	Order findByEmail(String token);

	List<Order> findAllByEmail(String token);

}
