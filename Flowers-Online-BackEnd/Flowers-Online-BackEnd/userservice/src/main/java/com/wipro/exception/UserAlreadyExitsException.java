package com.wipro.exception;

public class UserAlreadyExitsException extends RuntimeException{
	
	public UserAlreadyExitsException(String message){
		super(message);
	}

}
