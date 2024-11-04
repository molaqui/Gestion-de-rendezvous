package com.example.springproject.Controllers;

import com.example.springproject.Entities.Conge;
import com.example.springproject.Entities.RendezVous;
import com.example.springproject.Entities.Status;
import com.example.springproject.Services.RendezVousService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/rendezvous")
public class RendezVousController {
    private static final Logger logger = LoggerFactory.getLogger(RendezVousController.class);
    @Autowired
    private RendezVousService rendezVousService;

    @PostMapping
    public RendezVous addRendezVous(@RequestBody RendezVous rendezVous) {
        logger.info("Ajout d'un nouveau rendez-vous: {}", rendezVous);
        return rendezVousService.saveRendezVous(rendezVous);
    }

    @GetMapping
    public List<RendezVous> getAllRendezVous() {

        logger.info("Récupération de tous les rendez-vous");
        return rendezVousService.getAllRendezVous();
    }

    @GetMapping("/{id}")
    public RendezVous getRendezVousById(@PathVariable Integer id) {
        logger.info("Récupération du rendez-vous avec ID: {}", id);
        return rendezVousService.getRendezVousById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRendezVous(@PathVariable Integer id) {
        logger.info("Suppression du rendez-vous avec ID: {}", id);
        rendezVousService.deleteRendezVous(id);
    }




    // Approuver un Rendez vous
    @PostMapping("/approve/{id}")
    public ResponseEntity<RendezVous> approveRV(@PathVariable Integer id) {
        logger.info("Approbation du rendez-vous avec ID: {}", id);
        RendezVous approvedrv = rendezVousService.approveRendezVous(id);
        return ResponseEntity.ok(approvedrv);
    }

    // Rejeter un Rendez vous
    @PostMapping("/reject/{id}")
    public ResponseEntity<RendezVous> rejectRV(@PathVariable Integer id) {
        logger.info("Rejet du rendez-vous avec ID: {}", id);
        RendezVous rejecteRV = rendezVousService.rejectRendezVous(id);
        return ResponseEntity.ok(rejecteRV);
    }

    // Mise à jour d'un Rendez vous
    @PutMapping("/{id}")
    public ResponseEntity<RendezVous> updateRendezVous(@PathVariable Integer id, @RequestBody RendezVous rendezVous) {
        RendezVous updatedRV = rendezVousService.updateRendezVous(id, rendezVous);
        return ResponseEntity.ok(updatedRV);
    }

    @GetMapping("/employee/{employeeId}/status/{status}")
    public List<RendezVous> getRendezVousByEmployeeIdAndStatus(@PathVariable Integer employeeId, @PathVariable Status status) {
        return rendezVousService.getRendezVousByEmployeeIdAndStatus(employeeId, status);
    }


}
