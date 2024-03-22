package com.vatunisia.soh.consultation.mapper;

import com.vatunisia.soh.consultation.dto.Business;
import com.vatunisia.soh.consultation.dto.ConsultationDTO;
import com.vatunisia.soh.consultation.entity.Consultation;

public class ConsultationMapper {
    public static ConsultationDTO mapToConsultationServiceDTO(Consultation consultation, Business business) {
        ConsultationDTO consultationDTO = new ConsultationDTO();
        consultationDTO.setId(consultation.getId());
        consultationDTO.setConsultationName(consultation.getConsultationName());
        consultationDTO.setConsultationDescription(consultation.getConsultationDescription());
        consultationDTO.setPrice(consultation.getPrice());
        consultationDTO.setBusiness(business);
        return consultationDTO;
    }
}
