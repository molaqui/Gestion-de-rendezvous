package com.example.springproject.Controllers;

import com.example.springproject.DAO.EmployeeRepository;
import com.example.springproject.DTO.EmployeeSalaryDTO;
import com.example.springproject.Entities.Admin;
import com.example.springproject.Entities.Employee;
import com.example.springproject.Entities.RendezVous;
import com.example.springproject.Entities.Status;
import com.example.springproject.Services.AdminService;
import com.example.springproject.Services.EmployeeService;
import com.example.springproject.Services.RendezVousService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private RendezVousService rendezVousService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private EmployeeRepository employeeRepository;
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @PostMapping("")
    public Employee addEmployee(
            @RequestParam("admin_id") int admin_id,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("email") String email,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("motDePass") String motDePass,
            @RequestParam("adresse") String adresse,
            @RequestParam("matricule") int matricule,
            @RequestParam("salaireParJour") float salaireParJour
    ) throws IOException {
        logger.info("Employee added succefully");
        Employee personne = new Employee();
        personne.setAdmin(adminService.getAdminById(admin_id));
        personne.setNom(nom);
        personne.setPrenom(prenom);
        personne.setEmail(email);
        if (image != null && !image.isEmpty()) {
            personne.setImage(image.getBytes());
        } else {
            personne.setImage(null);
        }
        personne.setMotDePass(motDePass);
        personne.setAdress(adresse);
        personne.setMatricule(matricule);
        personne.setSalaireParJour(salaireParJour);
        return employeeService.saveEmployee(personne);
    }




    @GetMapping
    public List<Employee> getAllEmployees() {

        logger.info("Fetched all employees");
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Integer id)
    { Employee employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            logger.info("Fetched employee with ID: {}", id);
        } else {
            logger.warn("Employee with ID: {} not found", id);
        }
        return employee;
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Integer id) {

        employeeService.deleteEmployee(id);
        logger.info("Deleted employee with ID: {}", id);
    }

    @GetMapping(value = "/{id}/rendezvous", produces = "application/json")
    public List<RendezVous> getRendezVousByEmployeeId(@PathVariable Integer id) {
        logger.info("Fetched rendezvous for employee ID: {}", id);
        return rendezVousService.getRendezVousByEmployeeId(id);
    }



    @GetMapping(value = "/{id}/image", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getEmployeeImageById(@PathVariable Integer id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee != null && employee.getImage() != null) {
            String base64Image = Base64.getEncoder().encodeToString(employee.getImage());
            Map<String, String> response = new HashMap<>();
            response.put("image", base64Image);
            logger.info("Fetched image for employee ID: {}", id);
            return response;
        } else {
            throw new RuntimeException("Image not found for employee ID: " + id);
        }
    }

    ///get salaire de l'employee
    @PostMapping("/{id}/calculate-salary")
    public Employee calculateAndSaveNetSalary(@PathVariable Integer id) {
        logger.info("Calculated and saved net salary for employee ID: {}", id);
        return employeeService.calculateAndSaveNetSalary(id);
    }



    @GetMapping("/salaries")
    public List<EmployeeSalaryDTO> getAllEmployeesWithSalary()
    {   logger.info("Fetched all employees with salary details,");
        return employeeService.getAllEmployeesWithSalary();
    }


    ///////////:::confrime la payment
    @PutMapping("/{id}/confirmPayment")
    public Employee confirmPayment(@PathVariable Integer id) {
        logger.info("Confirmed payment for employee ID: {}", id);

        return employeeService.confirmPayment(id);
    }



    /// get salaire statistiques
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getEmployeeStatistics() {
        logger.info("Fetched employee statistics");
        Map<String, Object> stats = employeeService.getEmployeeStatistics();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestParam String nom, @RequestParam String motDePass) {
        try {

            Employee employee = employeeService.findEmployeeByNomAndMotDePass(nom, motDePass);
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @PutMapping("/{id}/update-password")
    public ResponseEntity<Employee> updatePassword(@PathVariable Integer id, @RequestParam String newPassword) {

        try {
            logger.info("Employee logged in with Id: {}", id);
            Employee updatedEmployee = employeeService.updateEmployeePassword(id, newPassword);
            return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
