package com.magic.project.repositories;

import com.magic.project.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, String> {

	List<Doctor> findBySpeciality(String speciality);

}
