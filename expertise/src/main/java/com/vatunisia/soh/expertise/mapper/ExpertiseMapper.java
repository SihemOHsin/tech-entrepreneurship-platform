package com.vatunisia.soh.expertise.mapper;
import com.vatunisia.soh.expertise.dto.Business;
import com.vatunisia.soh.expertise.dto.ExpertiseDTO;
import com.vatunisia.soh.expertise.dto.Review;
import com.vatunisia.soh.expertise.entity.Expertise;

import java.util.List;

public class ExpertiseMapper {
    public static ExpertiseDTO mapToExpertiseWithBusinessDto(
            Expertise expertise,
            Business business,
            List<Review> reviews) {

        ExpertiseDTO expertiseDTO = new ExpertiseDTO();
        expertiseDTO.setId(expertise.getId());
        expertiseDTO.setTitle(expertise.getTitle());
        expertiseDTO.setDescription(expertise.getDescription());
        expertiseDTO.setMaxProposedPrice(expertise.getMaxProposedPrice());
        expertiseDTO.setMinProposedPrice(expertise.getMinProposedPrice());
        expertiseDTO.setBusiness(business);
        expertiseDTO.setReviews(reviews);

        return expertiseDTO;
    }
}
