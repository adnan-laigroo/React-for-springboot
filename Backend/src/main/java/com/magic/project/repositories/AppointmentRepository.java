package com.magic.project.repositories;

import com.magic.project.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {

	List<Appointment> findByDocId(String email);

}