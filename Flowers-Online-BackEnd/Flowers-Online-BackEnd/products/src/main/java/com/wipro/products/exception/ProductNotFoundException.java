package com.wipro.products.exception;

public class ProductNotFoundException extends RuntimeException{
	
	public ProductNotFoundException(String msg) {
		super(msg);
	}

}
