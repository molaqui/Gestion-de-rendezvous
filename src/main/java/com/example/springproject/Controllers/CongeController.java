package com.example.springproject.Controllers;

import com.example.springproject.Entities.Admin;
import com.example.springproject.Entities.Conge;
import com.example.springproject.Entities.EmailData;
import com.example.springproject.Entities.LeaveStatus;
import com.example.springproject.Services.CongeService;
import com.example.springproject.Services.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/leaves")
public class CongeController {
    @Autowired
    private CongeService leaveService;
    @Autowired
    private EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(CongeController.class);

    // Demande de congé
    @PostMapping("/request")
    public ResponseEntity<Conge> requestLeave(@RequestBody Conge leave) {
        Conge newLeave = leaveService.requestLeave(leave);
        logger.info("Leave requested for employee ID: {}", leave.getEmployee().getId());
        return ResponseEntity.ok(newLeave);
    }

    // Approuver un congé
    @PostMapping("/approve/{id}")
    public ResponseEntity<Conge> approveLeave(@PathVariable Integer id) {
        Conge approvedLeave = leaveService.approveLeave(id);
        logger.info("Leave approved with ID: {}", id);
        sendApprovalEmail(approvedLeave);
        return ResponseEntity.ok(approvedLeave);
    }

    // Rejeter un congé
    @PostMapping("/reject/{id}")
    public ResponseEntity<Conge> rejectLeave(@PathVariable Integer id) {
        Conge rejectedLeave = leaveService.rejectLeave(id);
        logger.info("Leave rejected with ID: {}", id);
        sendRejectionEmail(rejectedLeave);
        return ResponseEntity.ok(rejectedLeave);
    }

    private void sendApprovalEmail(Conge conge) {
        String to = conge.getEmployee().getEmail();
        String subject = "Your leave request has been approved";
        String body = "Dear " + conge.getEmployee().getNom() + ",\n\n" +
                "Your leave request from " + conge.getDateDebut() + " to " + conge.getDateFin() + " has been approved.\n\n" +
                "Best regards,\nAdmin Team";
        EmailData emailData = new EmailData(to, subject, body);
        logger.info("Approval email sent to employee ID: {}", conge.getEmployee().getId());
        emailService.sendEmail(emailData);
    }

    private void sendRejectionEmail(Conge conge) {
        String to = conge.getEmployee().getEmail();
        String subject = "Your leave request has been rejected";
        String body = "Dear " + conge.getEmployee().getNom() + ",\n\n" +
                "Your leave request from " + conge.getDateDebut() + " to " + conge.getDateFin() + " has been rejected.\n\n" +
                "Best regards,\nAdmin Team";
        EmailData emailData = new EmailData(to, subject, body);
        logger.info("Rejection email sent to employee ID: {}", conge.getEmployee().getId());
        emailService.sendEmail(emailData);
    }


    // Obtenir les congés d'un employé
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Conge>> getLeavesByEmployee(@PathVariable Long employeeId) {
        List<Conge> leaves = leaveService.getLeavesByEmployee(employeeId);
        logger.info("Fetched leaves for employee ID: {}, count: {}", employeeId, leaves.size());
        return ResponseEntity.ok(leaves);
    }

    // Obtenir tous les congés
    @GetMapping("/all")
    public ResponseEntity<List<Conge>> getAllLeaves() {
        List<Conge> allLeaves = leaveService.getAllConges();
        logger.info("Fetched all leaves, count: {}", allLeaves.size());
        return ResponseEntity.ok(allLeaves);
    }

    // Obtenir les congés par statut
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Conge>> getLeavesByStatus(@PathVariable LeaveStatus status) {
        List<Conge> leavesByStatus = leaveService.getLeavesByStatus(status);
        logger.info("Fetched leaves with status: {}, count: {}", status, leavesByStatus.size());
        return ResponseEntity.ok(leavesByStatus);

    }

    // Count leaves by status
    @GetMapping("/count/status/{status}")
    public ResponseEntity<Integer> countCongeByStatus(@PathVariable LeaveStatus status) {
        int count = leaveService.countCongeByStatus(status);
        logger.info("Counted leaves with status: {}, count: {}", status, count);
        return ResponseEntity.ok(count);
    }
}
