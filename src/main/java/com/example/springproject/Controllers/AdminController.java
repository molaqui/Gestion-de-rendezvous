package com.example.springproject.Controllers;

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

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admins")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);


    @Autowired
    private AdminService adminService;
    @Autowired
    private EmployeeService employeeService;

    @Autowired // Ajoutez cette ligne pour l'injection correcte
    private RendezVousService rendezVousService;

    @PostMapping("")
    public Admin addAdmin(
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("email") String email,
            @RequestParam("image") MultipartFile image,
            @RequestParam("motDePass") String motDePass,
            @RequestParam("adresse") String adresse,
            @RequestParam("matricule") int matricule
    ) throws IOException {
        Admin personne = new Admin();
        personne.setNom(nom);
        personne.setPrenom(prenom);
        personne.setEmail(email);
        personne.setImage(image.getBytes());
        personne.setMotDePass(motDePass);
        personne.setAdresse(adresse);
        personne.setMatricule(matricule);

        return adminService.saveAdmin(personne);
    }



    @PutMapping("/modifier/{id}")
    public Admin modifierAdmin(
            @PathVariable Integer id,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("email") String email,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("motDePass") String motDePass,
            @RequestParam("adresse") String adresse,
            @RequestParam("matricule") int matricule
    ) throws IOException {
        Admin admin = adminService.getAdminById(id);
        if (admin != null) {
            admin.setNom(nom);
            admin.setPrenom(prenom);
            admin.setEmail(email);
            if (image != null && !image.isEmpty()) {
                admin.setImage(image.getBytes());
            }
            admin.setMotDePass(motDePass);
            admin.setAdresse(adresse);
            admin.setMatricule(matricule);
            logger.info("Admin updated with ID: {id=1}");
            return adminService.saveAdmin(admin);
        }
        return null;
    }


    @GetMapping(produces = "application/json")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping(value = "/{id}")
    public Admin getAdminById(@PathVariable Integer id) {
        return adminService.getAdminById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Integer id) {
        adminService.deleteAdmin(id);
    }




    //////////////////////////////////////////////////////////////////////////

    @GetMapping(value = "/{id}/employees")
    public List<Employee> getEmployeesByAdminId(@PathVariable Integer id) {
        logger.info("Fetched employees for admin ID: 1");
        return adminService.getEmployeesByAdminId(id);
    }

    @GetMapping(value = "/{adminId}/rendezvous/status/{status}", produces = "application/json")
    public List<RendezVous> getRendezVousByAdminIdAndStatus(
            @PathVariable Integer adminId,
            @PathVariable Status status) {
        return rendezVousService.getRendezVousByAdminIdAndStatus(adminId, status);
    }

    @GetMapping(value = "/{adminId}/employees/{employeeId}/rendezvous/count/status/{status}", produces = "application/json")
    public Long countRendezVousByEmployeeIdAndStatus(
            @PathVariable Integer adminId,
            @PathVariable Integer employeeId,
            @PathVariable Status status) {
        logger.info("Counting RendezVous for employeeId: " + employeeId + " under adminId: " + adminId + " with status: " + status);
        return rendezVousService.countRendezVousByEmployeeIdAndStatus(employeeId, status);
    }

    @GetMapping(value = "/{adminId}/rendezvous/count", produces = "application/json")
    public Long countAllRendezVousByAdminId(@PathVariable Integer adminId) {
        return rendezVousService.countAllRendezVousByAdminId(adminId);
    }

    @GetMapping(value = "/{adminId}/rendezvous/count/status/{status}", produces = "application/json")
    public Long countRendezVousByAdminIdAndStatus(
            @PathVariable Integer adminId,
            @PathVariable Status status) {
        logger.info("Counting RendezVous for adminId: " + adminId + " with status: " + status);
        return rendezVousService.countRendezVousByAdminIdAndStatus(adminId, status);
    }

    @DeleteMapping("/{adminId}/employees/{employeeId}")
    public void supprimerEmploye(
            @PathVariable Integer adminId,
            @PathVariable Integer employeeId) {
            logger.info("Deleted employee with ID: {} under admin ID: {}", employeeId, adminId);

//        Admin admin = adminService.getAdminById(adminId);
//        if (admin != null) {
//            boolean employeExiste = admin.getEmployees().stream()
//                    .anyMatch(employee -> employee.getId().equals(employeeId));
//            if (employeExiste) {
                employeeService.deleteEmployee(employeeId);
//            } else {
//                throw new RuntimeException("Employé non trouvé sous cet administrateur");
//            }
//        }
////        else {
//            throw new RuntimeException("Administrateur non trouvé");
//        }
    }


    // get all rendez vous
    @GetMapping("/rendezvous")
    public List<RendezVous> getAllRendezVous() {
        return rendezVousService.getAllRendezVous();
    }




}
