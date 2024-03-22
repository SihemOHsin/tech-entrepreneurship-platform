package com.vatunisia.soh.business.service;

import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.repository.BusinessRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusinessServiceImpl implements BusinessService {
    private BusinessRepository businessRepository;

    public BusinessServiceImpl(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @Override
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    @Override
    public boolean updateBusiness(Business business, Long id) {
        Optional<Business> businessOptional = businessRepository.findById(id);
        if (businessOptional.isPresent()) {
            Business businessToUpdate = businessOptional.get();
            businessToUpdate.setIndustry(business.getIndustry());
            businessToUpdate.setName(business.getName());
            businessRepository.save(businessToUpdate);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void createBusiness(Business business) {
        businessRepository.save(business);
    }

    @Override
    public boolean deleteBusinessById(Long id) {
        if(businessRepository.existsById(id)) {
            businessRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Business getBusinessById(Long id) {
        return businessRepository.findById(id).orElse(null);
    }
}

