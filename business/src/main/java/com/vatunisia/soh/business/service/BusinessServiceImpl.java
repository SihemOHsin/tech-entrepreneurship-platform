package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.repository.BusinessRepository;
import com.vatunisia.soh.business.mapper.BusinessMapper;
import com.vatunisia.soh.business.dto.User;
import com.vatunisia.soh.business.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessServiceImpl implements BusinessService {
    private List<User> userList;


    private final BusinessRepository businessRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public BusinessServiceImpl(BusinessRepository businessRepository, RestTemplate restTemplate) {
        this.businessRepository = businessRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public BusinessDTO createBusiness(BusinessDTO businessDTO) {
        Business business = BusinessMapper.businessDTOToBusiness(businessDTO);
        business = businessRepository.save(business);
        User user = businessDTO.getUser();
        return BusinessMapper.mapToBusinessWithUserDto(business, user);
    }

    @Override
    public BusinessDTO getBusinessById(Integer id) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Business not found with id: " + id));

        // Fetch the user associated with the business
        User user = findUserById(userList, business.getUserId());

        return convertToDto(business, user);
    }


    @Override
    public boolean deleteBusiness(Integer id) {
        try {
            businessRepository.deleteById(id);
            return true; // Deletion successful
        } catch (EmptyResultDataAccessException ex) {
            // Entity with the given ID not found
            return false;
        }
    }

    @Override
    public void updateBusiness(BusinessDTO businessDTO, Integer id) {
        Business existingBusiness = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Business not found with id: " + id));

        // Update the existing business with new values from businessDTO
        existingBusiness.setBizname(businessDTO.getBizname());
        existingBusiness.setDateOfBizCreation(businessDTO.getDateOfBizCreation());
        existingBusiness.setIndustry(businessDTO.getIndustry());
        existingBusiness.setLocation(businessDTO.getLocation());

        businessRepository.save(existingBusiness);
    }

    @Override
    public List<BusinessDTO> getEntrepreneursBusinesses() {
        List<User> entrepreneurs = Arrays.asList(restTemplate.getForObject(
                "http://localhost:9096/api/v1/auth/entrepreneurs",
                User[].class));

        List<Integer> entrepreneurIds = entrepreneurs.stream().map(User::getId).collect(Collectors.toList());
        List<Business> entrepreneurBusinesses = businessRepository.findByUserIdIn(entrepreneurIds);

        return entrepreneurBusinesses.stream()
                .map(business -> convertToDto(business, findUserById(entrepreneurs, business.getUserId())))
                .collect(Collectors.toList());
    }

    @Override
    public List<BusinessDTO> getItExpertsBusinesses() {
        List<User> itExperts = Arrays.asList(restTemplate.getForObject(
                "http://localhost:9096/api/v1/auth/it-experts",
                User[].class));

        List<Integer> itExpertIds = itExperts.stream().map(User::getId).collect(Collectors.toList());
        List<Business> itExpertBusinesses = businessRepository.findByUserIdIn(itExpertIds);

        return itExpertBusinesses.stream()
                .map(business -> convertToDto(business, findUserById(itExperts, business.getUserId())))
                .collect(Collectors.toList());
    }

    private BusinessDTO convertToDto(Business business, User user) {
        return BusinessMapper.mapToBusinessWithUserDto(business, user);
    }

    private User findUserById(List<User> userList, Integer userId) {
        return userList.stream()
                .filter(user -> user.getId().equals(userId))
                .findFirst()
                .orElse(null);
    }
}
