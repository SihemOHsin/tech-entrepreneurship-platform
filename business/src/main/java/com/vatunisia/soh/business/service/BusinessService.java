package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.entity.Business;

import java.util.List;

public interface BusinessService {
    List<Business> getAllBusinesses();
    boolean updateBusiness(Business business, Long id);
    void createBusiness(Business business);
    boolean deleteBusinessById(Long id);
    Business getBusinessById(Long id);

    List<Business> getITExperts();

    List<Business> getEntrepreneurs();
}
