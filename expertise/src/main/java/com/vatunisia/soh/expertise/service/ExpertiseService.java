package com.vatunisia.soh.expertise.service;

import com.vatunisia.soh.expertise.dto.Business;
import com.vatunisia.soh.expertise.dto.ExpertiseDTO;
import com.vatunisia.soh.expertise.entity.Expertise;

import java.util.List;

public interface ExpertiseService {
    List<ExpertiseDTO> findAll();

    Expertise createExpertise(Expertise expertise);

    ExpertiseDTO getExpertiseById(Long id);
    boolean deleteExpertiseById(Long id);

    Expertise updateExpertise(Long id, Expertise updatedExpertise);

    // Additional method to find expertise by business ID
    List<ExpertiseDTO> findExpertiseByBusinessId(Integer businessId);

    Business getReviewerBusiness(Long reviewId);
    Business getRevieweeBusiness(Integer businessId);
}
