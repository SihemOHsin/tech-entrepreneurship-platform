package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.dto.BusinessDTO;

import java.util.List;

public interface BusinessService {
    BusinessDTO createBusiness(BusinessDTO businessDTO);

    BusinessDTO getBusinessById(Integer id);

    //List<BusinessDTO> getAllBusinesses();
    void updateBusiness(BusinessDTO businessDTO, Integer id);

    boolean deleteBusiness(Integer id);

    List<BusinessDTO> getEntrepreneursBusinesses();

    List<BusinessDTO> getItExpertsBusinesses();

    //List<BusinessDTO> getAllBusinesses();
    //boolean updateBusiness(Business business, Long id);
    //void createBusiness(Business business);
    //boolean deleteBusinessById(Long id);
    //BusinessDTO getBusinessById(Long id);

    //List<Business> getITExperts();

    //List<Business> getEntrepreneurs();
}
