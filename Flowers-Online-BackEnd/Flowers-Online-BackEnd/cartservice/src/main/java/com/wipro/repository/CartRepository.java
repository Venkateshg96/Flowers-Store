package com.wipro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{

	Cart findByProductIdAndEmail(long l, String string);

	List<Cart> findAllByEmail(String email);


	void deleteByProductIdAndEmail(long productId, String email);

	void deleteAllByEmail(String token);

	void deleteAllByProductId(long productId);

}
