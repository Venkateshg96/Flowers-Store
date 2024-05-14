package com.wipro.products.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class ErrorObjectHandler {
	
	
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<ErrorObject> ProductNotFoundException(ProductNotFoundException ex) {
		
		ErrorObject error = new ErrorObject();
		error.setDate(new Date());
		error.setMessage(ex.getMessage());
		error.setStatusCode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<ErrorObject>(error,HttpStatus.NOT_FOUND);
		
		
	}

}
