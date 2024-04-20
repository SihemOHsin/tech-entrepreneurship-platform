package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.entity.Business;

import java.util.List;

public interface BusinessService {
    List<BusinessDTO> findAll();
    void createBusiness(Business business);
    BusinessDTO getBusinessById(Integer id);
    boolean deleteBusinessById(Integer id);
    boolean updateBusiness(Integer id, Business updatedBusiness);
    List<BusinessDTO> findBusinessByUserID(Integer userID);
    List<BusinessDTO> findBusinessByUserRole(String userRole);
}
