package com.wipro.ratingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.wipro.ratingservice.model.EmailDetails;



@Service
public class EmailSenderService {
	
	@Autowired
	private JavaMailSender mailsender;
	@Value("${spring.mail.username}") private String sender;
	public String sendSimpleMail(EmailDetails details) {
		System.out.println(details.getMsgBody());
		
		try {
			SimpleMailMessage mailMessage
	        = new SimpleMailMessage();
			mailMessage.setFrom(sender);
	        mailMessage.setTo(details.getRecipient());
	        mailMessage.setText(details.getMsgBody());
	        mailMessage.setSubject("Shopping Experience from Customer");
	        mailsender.send(mailMessage);
	        return "Mail Sent Successfully...";
			
		}catch (Exception e) {
			System.out.println(e);
 
            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
		
	}

}
