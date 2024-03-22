package com.vatunisia.soh.consultation.service;


import com.vatunisia.soh.consultation.dto.ConsultationDTO;
import com.vatunisia.soh.consultation.entity.Consultation;

import java.util.List;

public interface ConsultationService {
    List<ConsultationDTO> findAll();
    void createConsultation(Consultation consultation);
    ConsultationDTO getConsultationById(Long id);
    boolean deleteConsultationById(Long id);
    boolean updateConsultation(Long id, Consultation updatedConsultation);

    // Additional method to find consultation services by business ID
    List<ConsultationDTO> findConsultationByBusinessId(Long businessId);
}
