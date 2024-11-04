package com.example.springproject.Services;

import com.example.springproject.DAO.AppelesRepository;
import com.example.springproject.Entities.Appeles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppelesService {
    @Autowired
    private AppelesRepository appelesRepository;

    public Appeles saveAppeles(Appeles appeles) {
        return appelesRepository.save(appeles);
    }

    public List<Appeles> getAllAppeles() {
        return appelesRepository.findAll();
    }

    public Appeles getAppelesById(Integer id) {
        return appelesRepository.findById(id).orElse(null);
    }

    public void deleteAppeles(Integer id) {
        appelesRepository.deleteById(id);
    }
}
