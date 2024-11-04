package com.example.springproject.DAO;

import com.example.springproject.Entities.Conge;
import com.example.springproject.Entities.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CongeRepository extends JpaRepository<Conge, Integer> {
    List<Conge> findByEmployeeId(Long employeeId);

    // Ajoutez cette ligne pour filtrer les congés par statut
    List<Conge> findByStatus(LeaveStatus status);

    @Query("SELECT COUNT(c) FROM Conge c WHERE c.status = :status")
    int countByStatus(@Param("status") LeaveStatus status);

}
