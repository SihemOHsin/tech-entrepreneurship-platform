package com.vatunisia.soh.consultation.controller;

import com.vatunisia.soh.consultation.dto.ConsultationDTO;
import com.vatunisia.soh.consultation.entity.Consultation;
import com.vatunisia.soh.consultation.service.ConsultationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultations")
@CrossOrigin
public class ConsultationController {
    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @GetMapping
    public ResponseEntity<List<ConsultationDTO>> findAll() {
        return ResponseEntity.ok(consultationService.findAll());
    }

    @PostMapping
    public ResponseEntity<String> createConsultation(@RequestBody Consultation consultation) {
        consultationService.createConsultation(consultation);
        return new ResponseEntity<>("Consultation added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultationDTO> getConsultationById(@PathVariable Long id) {
        ConsultationDTO consultationDTO = consultationService.getConsultationById(id);
        if (consultationDTO != null) {
            return ResponseEntity.ok(consultationDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConsultationById(@PathVariable Long id) {
        return consultationService.deleteConsultationById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateConsultation(@PathVariable Long id,
                                                @RequestBody Consultation updatedConsultation) {
        Consultation updated = consultationService.updateConsultation(id, updatedConsultation);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consultation not found with id " + id);
        }
    }



    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<ConsultationDTO>> findConsultationByBusinessId(@PathVariable Integer businessId) {
        List<ConsultationDTO> consultationDTOs = consultationService.findConsultationByBusinessId(businessId);
        if (!consultationDTOs.isEmpty()) {
            return ResponseEntity.ok(consultationDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
