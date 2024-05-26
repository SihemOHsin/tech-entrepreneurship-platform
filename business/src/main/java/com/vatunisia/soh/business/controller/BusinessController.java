package com.vatunisia.soh.business.controller;

import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.service.BusinessService;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("businesses")
@CrossOrigin
public class BusinessController {

    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    public ResponseEntity<List<BusinessDTO>> findAll() {
        return ResponseEntity.ok(businessService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> createBusiness(@RequestBody Business business) {
        businessService.createBusiness(business);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessDTO> getBusinessById(@PathVariable Integer id) {
        BusinessDTO businessDTO = businessService.getBusinessById(id);
        if (businessDTO  != null)
            return new ResponseEntity<>(businessDTO, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBusinessById(@PathVariable Integer id) {
        boolean deleted = businessService.deleteBusinessById(id);
        if (deleted)
            return new ResponseEntity<>("Expertise deleted successfully",HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBusiness(@PathVariable Integer id, @RequestBody BusinessDTO updatedBusiness) {
        boolean updated = businessService.updateBusiness(id, updatedBusiness);
        if (updated) {
            return new ResponseEntity<>("Business updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BusinessDTO>> getBusinessesByUserId(@PathVariable Integer userId) {
        List<BusinessDTO> businessDTOs = businessService.findBusinessByUserID(userId);
        if (!businessDTOs.isEmpty()) {
            return ResponseEntity.ok(businessDTOs);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/role/{userRole}")
    public ResponseEntity<List<BusinessDTO>> getBusinessesByUserRole(@PathVariable String userRole) {
        List<BusinessDTO> businessDTOs = businessService.findBusinessByUserRole(userRole);
        if (!businessDTOs.isEmpty()) {
            return ResponseEntity.ok(businessDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/logo/{business-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBusinessLogo(
            @PathVariable("business-id") Integer businessId,
            @RequestPart("file") MultipartFile file
    ) {
        businessService.uploadBusinessLogo(file, businessId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/user-email/{email}")
    public ResponseEntity<List<BusinessDTO>> getBusinessesByUserEmail(@PathVariable String email) {
        List<BusinessDTO> businesses = businessService.findBusinessByUserEmail(email);
        return ResponseEntity.ok(businesses);
    }
}
