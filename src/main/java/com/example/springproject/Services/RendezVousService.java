package com.example.springproject.Services;

import com.example.springproject.DAO.RendezVousRepository;
import com.example.springproject.Entities.Conge;
import com.example.springproject.Entities.LeaveStatus;
import com.example.springproject.Entities.RendezVous;
import com.example.springproject.Entities.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class RendezVousService {
    @Autowired
    private RendezVousRepository rendezVousRepository;

    public RendezVous saveRendezVous(RendezVous rendezVous) {
        return rendezVousRepository.save(rendezVous);
    }

    public List<RendezVous> getAllRendezVous() {
        return rendezVousRepository.findAll();
    }

    public RendezVous getRendezVousById(Integer id) {
        return rendezVousRepository.findById(id).orElse(null);
    }

    public void deleteRendezVous(Integer id) {
        rendezVousRepository.deleteById(id);
    }

    public List<RendezVous> getRendezVousByEmployeeId(Integer employeeId) {
        return rendezVousRepository.findByEmployeeId(employeeId);
    }

    public List<RendezVous> getRendezVousByAdminIdAndStatus(Integer adminId, Status status) {
        return rendezVousRepository.findByAdminIdAndStatus(adminId, status);
    }

    public Long countRendezVousByEmployeeIdAndStatus(Integer employeeId, Status status) {
        return rendezVousRepository.countByEmployeeIdAndStatus(employeeId, status);
    }

    public Long countAllRendezVousByAdminId(Integer adminId) {
        return rendezVousRepository.countAllRendezVousByAdminId(adminId);
    }


    public Long countRendezVousByAdminIdAndStatus(Integer adminId, Status status) {
        return rendezVousRepository.countByAdminIdAndStatus(adminId, status);
    }


    public RendezVous approveRendezVous(Integer rendezVousId) {
        RendezVous rendezVous = rendezVousRepository.findById(rendezVousId).orElseThrow(() -> new RuntimeException("RendezVous non trouvé"));
        rendezVous.setStatus(Status.CONFIRME);
        return rendezVousRepository.save(rendezVous);
    }

    public RendezVous rejectRendezVous(Integer rendezVousId) {
        RendezVous rendezVous = rendezVousRepository.findById(rendezVousId).orElseThrow(() -> new RuntimeException("RendezVous non trouvé"));
        rendezVous.setStatus(Status.ANNULE);

        return rendezVousRepository.save(rendezVous);
    }
    public RendezVous updateRendezVous(Integer id, RendezVous rendezVous) {
        Optional<RendezVous> optionalRendezVous = rendezVousRepository.findById(id);
        if (optionalRendezVous.isPresent()) {
            RendezVous existingRV = optionalRendezVous.get();
            existingRV.setNomDeClient(rendezVous.getNomDeClient());
            existingRV.setPrenomDeClient(rendezVous.getPrenomDeClient());
            existingRV.setTel(rendezVous.getTel());
            existingRV.setNomDEntreprise(rendezVous.getNomDEntreprise());
            existingRV.setAdresse(rendezVous.getAdresse());
            existingRV.setVille(rendezVous.getVille());
            existingRV.setZip(rendezVous.getZip());
            existingRV.setNumeroFiscale(rendezVous.getNumeroFiscale());
            existingRV.setCommentaire(rendezVous.getCommentaire());
            existingRV.setDateDeRendezVous(rendezVous.getDateDeRendezVous());
            existingRV.setType(rendezVous.getType());
            existingRV.setStatus(rendezVous.getStatus());
            return rendezVousRepository.save(existingRV);
        } else {
            throw new RuntimeException("Rendez-vous non trouvé avec l'id " + id);
        }
    }
    public List<RendezVous> getRendezVousByEmployeeIdAndStatus(Integer employeeId, Status status) {
        return rendezVousRepository.findByEmployeeIdAndStatus(employeeId, status);
    }

}
