package com.wipro.products.exception;

import java.util.Date;

import lombok.Data;

@Data
public class ErrorObject {
	
	private Date date;
	private int statusCode;
	private String message;

}
