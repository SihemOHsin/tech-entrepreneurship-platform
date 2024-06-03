package com.vatunisia.soh.consultation.service;


import com.vatunisia.soh.consultation.dto.ConsultationDTO;
import com.vatunisia.soh.consultation.entity.Consultation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ConsultationService {
    List<ConsultationDTO> findAll();

    Consultation createConsultation(Consultation consultation);

    ConsultationDTO getConsultationById(Long id);

    ResponseEntity<?> deleteConsultationById(Long id);

    Consultation updateConsultation(Long id, Consultation updatedConsultation);

    // Additional method to find consultation services by business ID
    List<ConsultationDTO> findConsultationByBusinessId(Integer businessId);
}
