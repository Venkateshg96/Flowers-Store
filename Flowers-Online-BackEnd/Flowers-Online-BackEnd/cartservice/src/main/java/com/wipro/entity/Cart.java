package com.wipro.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cart")
@Data
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private long productId;
	
	@Column
	private long quantity;
	
	
	@Column
	private String email; 
	@Column
	private String category;
}
