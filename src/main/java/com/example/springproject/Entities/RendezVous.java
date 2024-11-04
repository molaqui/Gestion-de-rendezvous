package com.example.springproject.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nomDeClient;
    private String prenomDeClient;
    private int tel;
    private String nomDEntreprise;
    private String adresse;
    private String ville;
    private int zip;
    private int numeroFiscale;
    private String commentaire;
    private Date dateDeRendezVous;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
   //jsonignoree
    private Employee employee;

    @Enumerated(EnumType.STRING)
    private Type type;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PAS_TRAITER;
}
