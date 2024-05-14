package com.wipro.products.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.products.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findAllByCategory(String category);

	Product findByIdAndCategory(long id, String category);

}
