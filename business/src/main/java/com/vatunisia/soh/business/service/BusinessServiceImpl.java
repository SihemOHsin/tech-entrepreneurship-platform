package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.dto.User;
import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.file.FileStorageService;
import com.vatunisia.soh.business.mapper.BusinessMapper;
import com.vatunisia.soh.business.repository.BusinessRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BusinessServiceImpl implements BusinessService {

    private final BusinessRepository businessRepository;
    private final RestTemplate restTemplate;
    private final FileStorageService fileStorageService;



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
    public boolean updateBusiness(Integer id, BusinessDTO updatedBusinessDTO) {
        Optional<Business> businessOptional = businessRepository.findById(id);
        if (businessOptional.isPresent()) {
            Business business = businessOptional.get();
            business.setBizname(updatedBusinessDTO.getBizname());
            business.setDateOfBizCreation(updatedBusinessDTO.getDateOfBizCreation());
            business.setIndustry(updatedBusinessDTO.getIndustry());
            business.setLocation(updatedBusinessDTO.getLocation());

            businessRepository.save(business);
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

    @Override
    public void uploadBusinessLogo(MultipartFile file, Integer businessId) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + businessId));
        var businessLogo = fileStorageService.saveFile(file, businessId);
        business.setBusinessLogo(businessLogo);
        businessRepository.save(business);
    }


    /*
    @Override
    public List<BusinessDTO> findBusinessByUserEmail(String userEmail) {
        List<Business> businesses = businessRepository.findByUserEmail(userEmail);
        return businesses.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
*/

    @Override
    public List<BusinessDTO> findBusinessByUserEmail(String userEmail) {
        // Step 1: Retrieve all users
        ResponseEntity<List<User>> response = restTemplate.exchange(
                "http://AUTHENTICATION:9096/auth/users",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<User>>() {});

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new EntityNotFoundException("Failed to retrieve users from authentication service");
        }

        List<User> users = response.getBody();

        if (users == null || users.isEmpty()) {
            throw new EntityNotFoundException("No users found in the system");
        }

        // Step 2: Filter the user by email
        Optional<User> optionalUser = users.stream()
                .filter(user -> userEmail.equals(user.getEmail()))
                .findFirst();

        if (!optionalUser.isPresent()) {
            throw new EntityNotFoundException("User not found with email: " + userEmail);
        }

        User user = optionalUser.get();

        // Step 3: Fetch businesses by user ID
        List<Business> businesses = businessRepository.findByUserId(user.getId());

        // Step 4: Convert the businesses to BusinessDTO
        return businesses.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }



}
