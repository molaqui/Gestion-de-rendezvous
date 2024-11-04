package com.example.springproject.DTO;

import com.example.springproject.Entities.PaymentStatus;
import lombok.*;

@Setter @Getter @NoArgsConstructor
@AllArgsConstructor
public class EmployeeSalaryDTO {
    private Integer id;
    private String nom;
    private String prenom;
    private byte[] image;
    private float salaireNet;
    private float salaireParJour;
    private int nmbreDeJour;
    private float prime;
    private PaymentStatus paymentStatus;
}
