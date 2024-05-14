package com.wipro.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorObjectException {

	
	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<ErrorObject>  handleUnazuthirizedException(UnauthorizedException ex) {
		
		ErrorObject er = new ErrorObject();
		er.setDate(new Date());
		er.setStatusCode(HttpStatus.UNAUTHORIZED.value());
		er.setMessage(ex.getMessage());
		
		return new ResponseEntity<ErrorObject>(er,HttpStatus.UNAUTHORIZED);
	}
}
