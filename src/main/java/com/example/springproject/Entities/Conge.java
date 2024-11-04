package com.example.springproject.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conge
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    //jsonIngore
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin approvedBy;

    private Date dateDebut;
    private Date dateFin;

    @Enumerated(EnumType.STRING)
    private LeaveType type;

    private String reason;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status;

}
