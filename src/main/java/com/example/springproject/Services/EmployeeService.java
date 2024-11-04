package com.example.springproject.Services;

import com.example.springproject.DAO.EmployeeRepository;
import com.example.springproject.DAO.RendezVousRepository;
import com.example.springproject.DTO.EmployeeSalaryDTO;
import com.example.springproject.Entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private RendezVousRepository rendezVousRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
   private  RendezVousService rendezvousService;

    // Ajouter le service d'email

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }

    public List<RendezVous> getRendezVousByEmployeeId(Integer employeeId) {
        return rendezVousRepository.findByEmployeeId(employeeId);
    }

    /////  get salaire


    public Employee calculateAndSaveNetSalary(Integer employeeId) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeId);
        if (!optionalEmployee.isPresent()) {
            throw new RuntimeException("Employee not found");
        }
        Employee employee = optionalEmployee.get();
        int daysPresent = employee.getNmbreDeJour();
        int prime= (int) employee.getPrime();
        if(this.rendezvousService.countRendezVousByEmployeeIdAndStatus(employeeId,Status.CONFIRME)==2){

            prime=20;
        }
        float netSalary = daysPresent * employee.getSalaireParJour() + prime;
        employee.setSalaireNet(netSalary);
        employee.setPrime(prime);
        return employeeRepository.save(employee);
    }
  /// get ALL emp
    public List<EmployeeSalaryDTO> getAllEmployeesWithSalary() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(employee -> {
            int daysPresent = employee.getNmbreDeJour();
            int prime= (int) employee.getPrime();
            if(this.rendezvousService.countRendezVousByEmployeeIdAndStatus(employee.getId(),Status.CONFIRME)>=2){

                prime=20;
            }
            float netSalary = daysPresent * employee.getSalaireParJour() + prime;
            employee.setPrime(prime);
            employee.setSalaireNet(netSalary);
            employeeRepository.save(employee);
            return new EmployeeSalaryDTO(
                    employee.getId(),
                    employee.getNom(),
                    employee.getPrenom(),
                    employee.getImage(),
                    netSalary,
                    employee.getSalaireParJour(),
                    daysPresent,
                    employee.getPrime(),
                    employee.getPaymentStatus()
            );
        }).collect(Collectors.toList());
    }

/////////:: confirme la payment
    public Employee confirmPayment(Integer employeeId) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeId);
        if (!optionalEmployee.isPresent()) {
            throw new RuntimeException("Employee not found");
        }

        Employee employee = optionalEmployee.get();
        employee.setPaymentStatus(PaymentStatus.PAID);
        employee.setNmbreDeJour(0); // Resetting number of days to zero
        employee.setSalaireNet(0);  // Resetting net salary to zero
        employee.setPrime(0);    // Resetting prime to zero
        Employee updatedEmployee = employeeRepository.save(employee);
        // Envoyer l'email de confirmation
        emailService.sendEmail(new EmailData(
                employee.getEmail(), // Assurez-vous que l'entité Employee a un champ email
                "Confirmation de paiement",
                "Bonjour " + employee.getPrenom() + ",\n\nVotre paiement a été traité avec succès.\n\nCordialement,\nL'équipe RH"
        ));

        return updatedEmployee;
    }

    public Map<String, Object> getEmployeeStatistics() {
        List<Employee> employees = employeeRepository.findAll();
        int totalEmployees = employees.size();
        double totalPaidSalaries = 0;
        double totalUnpaidSalaries = 0;
        int totalDaysWorked = 0;

        for (Employee employee : employees) {
            if (employee.getPaymentStatus() == PaymentStatus.PAID) {
                totalPaidSalaries += employee.getSalaireNet();
            } else {
                totalUnpaidSalaries += employee.getSalaireNet();
            }
            totalDaysWorked = Math.max(totalDaysWorked, employee.getNmbreDeJour());
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", totalEmployees);
        stats.put("totalPaidSalaries", totalPaidSalaries);
        stats.put("totalUnpaidSalaries", totalUnpaidSalaries);
        stats.put("totalDaysWorked", totalDaysWorked);

        return stats;
    }


    public Employee findEmployeeByNomAndMotDePass(String nom, String motDePass) {
        Optional<Employee> optionalEmployee = employeeRepository.findByNomAndMotDePass(nom, motDePass);
        if (!optionalEmployee.isPresent()) {
            throw new RuntimeException("Employee not found");
        }
        return optionalEmployee.get();
    }

    public Employee updateEmployeePassword(Integer employeeId, String newPassword) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeId);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setMotDePass(newPassword);
            return employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found with ID: " + employeeId);
        }
    }

    public List<RendezVous> getRendezVousByEmployeeIdAndStatus(Integer employeeId, Status status) {
        return rendezVousRepository.findByEmployeeIdAndStatus(employeeId, status);
    }

}
