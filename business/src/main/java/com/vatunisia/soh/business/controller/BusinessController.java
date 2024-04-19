package com.vatunisia.soh.business.controller;
import com.vatunisia.soh.business.dto.BusinessDTO;
import com.vatunisia.soh.business.service.BusinessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/businesses")
public class BusinessController {
    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    /*
    @GetMapping("/all")
    public ResponseEntity<List<BusinessDTO>> getAllBusinesses() {
        return new ResponseEntity<>(businessService.getAllBusinesses(), HttpStatus.OK);
    }*/

    @GetMapping("/it-experts")
    public ResponseEntity<List<BusinessDTO>> getItExpertsBusinesses() {
        return new ResponseEntity<>(businessService.getItExpertsBusinesses(), HttpStatus.OK);
    }

    @GetMapping("/entrepreneurs")
    public ResponseEntity<List<BusinessDTO>> getEntrepreneursBusinesses() {
        return new ResponseEntity<>(businessService.getEntrepreneursBusinesses(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBusiness(@PathVariable Integer id,
                                                 @RequestBody BusinessDTO businessDTO) {
        businessService.updateBusiness(businessDTO, id);
        return new ResponseEntity<>("Business updated successfully", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> addBusiness(@RequestBody BusinessDTO businessDTO) {
        businessService.createBusiness(businessDTO);
        return new ResponseEntity<>("Business added successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBusiness(@PathVariable Integer id) {
        boolean isDeleted = businessService.deleteBusiness(id);
        if (isDeleted) {
            return new ResponseEntity<>("Business Successfully Deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Business Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessDTO> getBusiness(@PathVariable Integer id) {
        BusinessDTO businessDTO = businessService.getBusinessById(id);
        if (businessDTO != null) {
            return new ResponseEntity<>(businessDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
