package com.example.springproject.Services;




import com.example.springproject.Entities.EmailData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(EmailData emailData) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailData.getTo());
        message.setSubject(emailData.getSubject());
        message.setText(emailData.getBody());
        emailSender.send(message);
    }
}
