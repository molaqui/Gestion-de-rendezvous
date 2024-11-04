package com.example.springproject.Entities;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class EmailData {
    private String to;
    private String subject;
    private String body;

    public EmailData(String to, String subject, String body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
    }
}
