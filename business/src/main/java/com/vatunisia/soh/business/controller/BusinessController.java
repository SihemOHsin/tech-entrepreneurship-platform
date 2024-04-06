package com.vatunisia.soh.business.controller;

import com.vatunisia.soh.business.entity.Business;
import com.vatunisia.soh.business.service.BusinessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/businesses")
@CrossOrigin(origins = "http://localhost:4200")
public class BusinessController {
    private BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Business>> getAllBusinesses(){
        return new ResponseEntity<>(businessService.getAllBusinesses(),
                HttpStatus.OK);
    }

    @GetMapping("/it-experts")
    public ResponseEntity<List<Business>> getITExperts(){
        return new ResponseEntity<>(businessService.getITExperts(),
                HttpStatus.OK);
    }

    @GetMapping("/entrepreneurs")
    public ResponseEntity<List<Business>> getEntrepreneurs(){
        return new ResponseEntity<>(businessService.getEntrepreneurs(),
                HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBusiness(@PathVariable Long id,
                                                 @RequestBody Business business){
        businessService.updateBusiness(business, id);
        return new ResponseEntity<>("Business updated successfully",
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> addBusiness(@RequestBody Business business){
        businessService.createBusiness(business);
        return new ResponseEntity<>("Business added successfully",
                HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBusiness(@PathVariable Long id){
        boolean isDeleted = businessService.deleteBusinessById(id);
        if (isDeleted) {
            return new ResponseEntity<>("Business Successfully Deleted",
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Business Not Found",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusiness(@PathVariable Long id){
        Business business = businessService.getBusinessById(id);
        if (business != null){
            return new ResponseEntity<>(business, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
