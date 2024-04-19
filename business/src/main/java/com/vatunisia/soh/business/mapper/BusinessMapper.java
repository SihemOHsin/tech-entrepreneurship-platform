package com.vatunisia.soh.business.mapper;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.dto.User;
import com.vatunisia.soh.business.entity.Business;

public class BusinessMapper {
    public static BusinessDTO mapToBusinessWithUserDto(Business business , User user
                                                    ) {
        BusinessDTO businessDTO = new BusinessDTO();
        businessDTO.setId(business.getId());
        businessDTO.setUser(user);
        businessDTO.setBizname(business.getBizname());
        businessDTO.setDateOfBizCreation(business.getDateOfBizCreation());
        businessDTO.setIndustry(business.getIndustry());
        businessDTO.setLocation(business.getLocation());
        return businessDTO;
    }

    public static Business businessDTOToBusiness(BusinessDTO businessDTO) {
        Business business = new Business();
        business.setId(businessDTO.getId());
        if (businessDTO.getUser() != null) {
            business.setUserId(businessDTO.getUser().getId());
        }
        business.setBizname(businessDTO.getBizname());
        business.setDateOfBizCreation(businessDTO.getDateOfBizCreation());
        business.setIndustry(businessDTO.getIndustry());
        business.setLocation(businessDTO.getLocation());
        return business;
    }

}

