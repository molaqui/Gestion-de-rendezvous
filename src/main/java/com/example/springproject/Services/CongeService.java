package com.example.springproject.Services;

import com.example.springproject.DAO.CongeRepository;
import com.example.springproject.Entities.Admin;
import com.example.springproject.Entities.Conge;
import com.example.springproject.Entities.LeaveStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CongeService {
    @Autowired
    private CongeRepository congeRepository;

    public Conge saveConge(Conge conge) {
        return congeRepository.save(conge);
    }

    public List<Conge> getAllConges() {
        return congeRepository.findAll();
    }

    public Conge getCongeById(Integer id) {
        return congeRepository.findById(id).orElse(null);
    }

    public void deleteConge(Integer id) {
        congeRepository.deleteById(id);
    }

    public Conge requestLeave(Conge leave) {
        leave.setStatus(LeaveStatus.PENDING);
        return congeRepository.save(leave);
    }

    public Conge approveLeave(Integer leaveId) {
        Conge leave = congeRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Congé non trouvé"));
        leave.setStatus(LeaveStatus.APPROVED);
        return congeRepository.save(leave);
    }

    public Conge rejectLeave(Integer leaveId) {
        Conge leave = congeRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Congé non trouvé"));
        leave.setStatus(LeaveStatus.REJECTED);

        return congeRepository.save(leave);
    }
    public int countCongeByStatus(LeaveStatus status) {
        return congeRepository.countByStatus(status);
    }
    public List<Conge> getLeavesByEmployee(Long employeeId) {
        return congeRepository.findByEmployeeId(employeeId);
    }

    // Méthode pour obtenir tous les congés par statut en utilisant le repository
    public List<Conge> getLeavesByStatus(LeaveStatus status) {
        return congeRepository.findByStatus(status);
    }
}
