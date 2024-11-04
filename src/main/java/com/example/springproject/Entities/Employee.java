package com.example.springproject.Entities;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] image;
    private String motDePass;
    private int matricule;
    private String Adress;

    /////////////////////gestion des salaire
    private float salaireParJour;
    private float prime;
    private float salaireNet;
    ////////////:presence
    private int nmbreDeJour;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    @JsonIgnore
    private Admin admin;



    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Appeles> appels;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<RendezVous> rendezVous;

    // Relation avec les demandes de congé
    @OneToMany(mappedBy = "employee")
    private List<Conge> conges;


}
