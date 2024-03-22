package com.vatunisia.soh.consultation.service;

import com.vatunisia.soh.consultation.dto.Business;
import com.vatunisia.soh.consultation.dto.ConsultationDTO;
import com.vatunisia.soh.consultation.entity.Consultation;
import com.vatunisia.soh.consultation.mapper.ConsultationMapper;
import com.vatunisia.soh.consultation.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConsultationServiceImpl implements ConsultationService {

    ConsultationRepository consultationRepository;

    @Autowired
    RestTemplate restTemplate;
    public ConsultationServiceImpl(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }
    @Override
    public List<ConsultationDTO> findAll() {

        List<Consultation> consultations = consultationRepository.findAll();
        List<ConsultationDTO> consulationDTOs =new ArrayList<>();
        
        return consultations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ConsultationDTO convertToDto(Consultation consultation) {
                Business business = restTemplate.getForObject(
                        "http://BUSINESS:9091/businesses/" + consultation.getBusinessId(),
                        Business.class);
                ConsultationDTO consultationDTO = ConsultationMapper.mapToConsultationServiceDTO(consultation, business);
        return consultationDTO;
    }

    @Override
    public void createConsultation(Consultation consultation) {
        consultationRepository.save(consultation);
    }

    @Override
    public ConsultationDTO getConsultationById(Long id) {
        Consultation consultation = consultationRepository.findById(id).orElse(null);
        return convertToDto(consultation);
    }

    @Override
    public boolean deleteConsultationById(Long id) {
        try {
            consultationRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public boolean updateConsultation(Long id, Consultation updatedConsultation) {
        Optional<Consultation> consultationOptional = consultationRepository.findById(id);
        if (consultationOptional.isPresent()) {
            Consultation consultation = consultationOptional.get();
            consultation.setConsultationName(updatedConsultation.getConsultationName());
            consultation.setConsultationDescription(updatedConsultation.getConsultationDescription());
            consultation.setPrice(updatedConsultation.getPrice());
            consultation.setBusinessId(updatedConsultation.getBusinessId());
            consultationRepository.save(consultation);
            return true;
        }
        return false;
    }

    @Override
    public List<ConsultationDTO> findConsultationByBusinessId(Long businessId) {
        List<Consultation> consultations = consultationRepository.findByBusinessId(businessId);
        List<ConsultationDTO> ConsultationDTOs = new ArrayList<>();
        return consultations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

}