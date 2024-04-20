package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.dto.User;
import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.mapper.BusinessMapper;
import com.vatunisia.soh.business.repository.BusinessRepository;
import com.vatunisia.soh.business.service.BusinessService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusinessServiceImpl implements BusinessService {

    private final BusinessRepository businessRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public BusinessServiceImpl(BusinessRepository businessRepository, RestTemplate restTemplate) {
        this.businessRepository = businessRepository;
        this.restTemplate = restTemplate;
    }

    private BusinessDTO convertToDto(Business business) {
        User user = restTemplate.getForObject(
                "http://AUTHENTICATION:9096/auth/users/" + business.getUserId(),
                User.class);

        return BusinessMapper.mapToBusinessWithUserDto(business, user);
    }

    @Override
    public List<BusinessDTO> findAll() {
        List<Business> businesses = businessRepository.findAll();
        List<BusinessDTO> expertiseDTOs = new ArrayList<>();
        return businesses.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void createBusiness(Business business) {
        businessRepository.save(business);
    }

    @Override
    public BusinessDTO getBusinessById(Integer id) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Business not found with id: " + id));
        return convertToDto(business);
    }

    @Override
    public boolean deleteBusinessById(Integer id) {
        try {
            businessRepository.existsById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateBusiness(Integer id, Business updatedBusiness) {
        Optional<Business> businessOptional = businessRepository.findById(id);
        if (businessOptional.isPresent()) {
            Business business = businessOptional.get();
            business.setBizname(updatedBusiness.getBizname());
            business.setDateOfBizCreation(updatedBusiness.getDateOfBizCreation());
            business.setIndustry(updatedBusiness.getIndustry());
            business.setLocation(updatedBusiness.getLocation());

            businessRepository.save(updatedBusiness);
            return true;
        }
        return false;
    }

    @Override
    public List<BusinessDTO> findBusinessByUserID(Integer userID) {
        List<Business> businesses = businessRepository.findByUserId(userID);
        List<BusinessDTO> expertiseDTOs = new ArrayList<>();
        return businesses.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
/*
    @Override
    public List<BusinessDTO> findBusinessByUserRole(String userRole) {
        // Retrieve users with the specified role from the authentication service
        List<User> users = restTemplate.getForObject(
                "http://AUTHENTICATION:9096/auth/role/" + userRole,
                List.class);

        // Extract user IDs from the retrieved users
        List<Integer> userIds = users.stream()
                .map(User::getId)
                .collect(Collectors.toList());

        // Retrieve businesses associated with the extracted user IDs
        List<Business> businesses = businessRepository.findByUserIdIn(userIds);

        // Convert businesses to DTOs
        return businesses.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }*/

    @Override
    public List<BusinessDTO> findBusinessByUserRole(String userRole) {
        // Retrieve users with the specified role from the authentication service
        ResponseEntity<List<User>> response = restTemplate.exchange(
                "http://AUTHENTICATION:9096/auth/role/" + userRole,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<User>>() {});

        if (response.getStatusCode() == HttpStatus.OK) {
            List<User> users = response.getBody();
            if (users != null) {
                // Extract user IDs from the retrieved users
                List<Integer> userIds = users.stream()
                        .map(User::getId)
                        .collect(Collectors.toList());

                // Retrieve businesses associated with the extracted user IDs
                List<Business> businesses = businessRepository.findByUserIdIn(userIds);

                // Convert businesses to DTOs
                return businesses.stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList());
            }
        }

        return Collections.emptyList(); // Return empty list if no users found or error occurred
    }

}
