package com.wipro.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="orders")
public class Order {
	@Id
	private long id;
	
	@Column
	private String email;
	
	@Column
	private Double totalCost;
	@Column
	private Date orderDate;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "order_fid", referencedColumnName = "id")
	private List<Products> products;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_fid", referencedColumnName = "id")
	private BillingAddress billingAddress;

}
