package com.wipro.model;

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
@Data
@Table(name="contact us")
public class Contact {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String message;

}
