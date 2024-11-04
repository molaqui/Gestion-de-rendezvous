package com.example.springproject.DAO;

import com.example.springproject.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByAdminId(Integer adminId);

    @Query("SELECT e FROM Employee e WHERE e.nom = :nom AND e.motDePass = :motDePass")
    Optional<Employee> findByNomAndMotDePass(@Param("nom") String nom, @Param("motDePass") String motDePass);
}
