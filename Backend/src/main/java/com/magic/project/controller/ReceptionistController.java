package com.magic.project.controller;

import com.magic.project.models.Doctor;
import com.magic.project.models.Receptionist;
import com.magic.project.models.User;
import com.magic.project.models.dto.ReceptionistDto;
import com.magic.project.models.dto.ReceptionistUserMapper;
import com.magic.project.services.ReceptionistService;
import com.magic.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("hospital/receptionist")
public class ReceptionistController {
	@Autowired
	ReceptionistService recepServ;
	@Autowired
	UserService userServ;

	// Add a receptionist
	@PostMapping("/add")
	public ResponseEntity<Receptionist> addReceptionist(@Valid @RequestBody ReceptionistDto receptionistDto) {
		Receptionist receptionist = ReceptionistUserMapper.mapToReceptionist(receptionistDto);
		User user = ReceptionistUserMapper.mapToUser(receptionistDto);
		recepServ.saveReceptionist(receptionist);
		user.setUsername(receptionist.getEmail());
		userServ.saveUser(user);
		return ResponseEntity.status(HttpStatus.OK).body(receptionist);
	}

	// delete a receptionist
	@DeleteMapping("/delete/{email}")
	public ResponseEntity<Receptionist> deleteReceptionist(@Valid @PathVariable String email) {
		Receptionist receptionist = recepServ.deleteReceptionist(email);
		return ResponseEntity.status(HttpStatus.OK).body(receptionist);
	}

	// update a receptionist by ID and Put request
	@PutMapping("/update/{email}")
	public ResponseEntity<Receptionist> updateReceptionist(@Valid @PathVariable String email,
			@RequestBody @Valid Receptionist updatedReceptionist) {
		Receptionist receptionist = recepServ.updateReceptionist(updatedReceptionist, email);
		return ResponseEntity.status(HttpStatus.OK).body(receptionist);
	}

	// get list of all receptionists
	@GetMapping("/list")
	public ResponseEntity<List<Receptionist>> getAllReceptionist() {
		List<Receptionist> receptionists = recepServ.getReceptionistList();
		return ResponseEntity.status(HttpStatus.OK).body(receptionists);
	}
	@GetMapping("/get/{email}")
	public ResponseEntity<Receptionist> getDoctor(@PathVariable @Valid String email) {
		Receptionist receptionist = recepServ.getReceptionist(email);
		return ResponseEntity.status(HttpStatus.OK).body(receptionist);
	}

}
