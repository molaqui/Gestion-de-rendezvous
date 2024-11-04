package com.example.springproject.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appeles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int numero;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
