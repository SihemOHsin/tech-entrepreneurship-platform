package com.vatunisia.soh.business.mapper;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.dto.User;
import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.file.FileUtils;

import java.util.Arrays;

public class BusinessMapper {
    public static BusinessDTO mapToBusinessWithUserDto(Business business , User user
                                                    ) {
        BusinessDTO businessDTO = new BusinessDTO();
        businessDTO.setId(business.getId());
        businessDTO.setBizname(business.getBizname());
        businessDTO.setDateOfBizCreation(business.getDateOfBizCreation());
        businessDTO.setIndustry(business.getIndustry());
        businessDTO.setLocation(business.getLocation());
        //businessDTO.setBusinessLogo(business.getBusinessLogo());
        businessDTO.setUser(user);

        // Read the business logo from the file system and set it in the DTO
        byte[] businessLogoBytes = FileUtils.readFileFromLocation(business.getBusinessLogo());
        businessDTO.setBusinessLogo(businessLogoBytes);

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

