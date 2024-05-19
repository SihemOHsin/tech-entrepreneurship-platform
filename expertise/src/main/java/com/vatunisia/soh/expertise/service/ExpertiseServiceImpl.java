package com.vatunisia.soh.expertise.service;

import com.vatunisia.soh.expertise.dto.Business;
import com.vatunisia.soh.expertise.dto.ExpertiseDTO;

import com.vatunisia.soh.expertise.dto.Review;
import com.vatunisia.soh.expertise.entity.Expertise;
import com.vatunisia.soh.expertise.mapper.ExpertiseMapper;
import com.vatunisia.soh.expertise.repository.ExpertiseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpertiseServiceImpl implements ExpertiseService {
    // private List<Expertise> expertises = new ArrayList<>();
    ExpertiseRepository expertiseRepository;

    @Autowired
    RestTemplate restTemplate;

    public ExpertiseServiceImpl(ExpertiseRepository expertiseRepository) {
        this.expertiseRepository = expertiseRepository;
    }

    @Override
    public List<ExpertiseDTO> findAll() {
        List<Expertise> expertises = expertiseRepository.findAll();
        List<ExpertiseDTO> expertiseDTOs = new ArrayList<>();

        return expertises.stream().map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ExpertiseDTO convertToDto(Expertise expertise) {
        Business business = restTemplate.getForObject(
                "http://BUSINESS:9091/businesses/" + expertise.getBusinessId(),
                Business.class);

        ResponseEntity<List<Review>> reviewResponse = restTemplate.exchange(
                "http://REVIEW:9095/reviews?businessId=" + expertise.getBusinessId(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Review>>() {
                });

        List<Review> reviews = reviewResponse.getBody();

        ExpertiseDTO expertiseDTO = ExpertiseMapper.
                mapToExpertiseWithBusinessDto(expertise, business, reviews);
        //expertiseDTO.setBusiness(business);

        return expertiseDTO;
    }

    @Override
    public Expertise createExpertise(Expertise expertise) {
        return expertiseRepository.save(expertise);
    }


    @Override
    public ExpertiseDTO getExpertiseById(Long id) {
        Expertise expertise = expertiseRepository.findById(id).orElse(null);
        return convertToDto(expertise);
    }

    @Override
    public boolean deleteExpertiseById(Long id) {
        try {
            expertiseRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Expertise updateExpertise(Long id, Expertise updatedExpertise) {
        Optional<Expertise> expertiseOptional = expertiseRepository.findById(id);
        if (expertiseOptional.isPresent()) {
            Expertise expertise = expertiseOptional.get();
            expertise.setTitle(updatedExpertise.getTitle());
            expertise.setDescription(updatedExpertise.getDescription());
            expertise.setMinProposedPrice(updatedExpertise.getMinProposedPrice());
            expertise.setMaxProposedPrice(updatedExpertise.getMaxProposedPrice());
            Expertise savedExpertise = expertiseRepository.save(expertise);
            return savedExpertise; // Return the updated expertise
        }
        return null; // Return null if expertise not found
    }


    @Override
    public List<ExpertiseDTO> findExpertiseByBusinessId(Long businessId) {
        List<Expertise> expertises = expertiseRepository.findByBusinessId(businessId);
        if (expertises.isEmpty()) {
            return Collections.emptyList(); // Return an empty list if no expertise is found
        } else {
            return expertises.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }
    }

}
