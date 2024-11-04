package com.example.springproject.Services;

import com.example.springproject.DAO.AdminRepository;
import com.example.springproject.DAO.EmployeeRepository;
import com.example.springproject.Entities.Admin;
import com.example.springproject.Entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Integer id) {
        return adminRepository.findById(id).orElse(null);
    }

    public void deleteAdmin(Integer id) {
        adminRepository.deleteById(id);
    }

    public List<Employee> getEmployeesByAdminId(Integer adminId) {
        return employeeRepository.findByAdminId(adminId);
    }




}
