package com.vatunisia.soh.expertise.controller;

import com.vatunisia.soh.expertise.entity.Expertise;
import com.vatunisia.soh.expertise.service.ExpertiseService;
import com.vatunisia.soh.expertise.dto.ExpertiseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expertises")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpertiseController {
    private ExpertiseService expertiseService;

    public ExpertiseController(ExpertiseService expertiseService) {
        this.expertiseService = expertiseService;
    }

    @GetMapping
    public ResponseEntity<List<ExpertiseDTO>> findAll(){
        return ResponseEntity.ok(expertiseService.findAll());
    }

    @PostMapping
    public ResponseEntity<String> createExpertise(@RequestBody Expertise expertise){
        expertiseService.createExpertise(expertise);
        return new ResponseEntity<>("Expertise added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpertiseDTO> getExpertiseById(@PathVariable Long id){
        ExpertiseDTO expertiseDTO = expertiseService.getExpertiseById(id);
        if(expertiseDTO != null)
            return new ResponseEntity<>(expertiseDTO, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpertise(@PathVariable Long id){
        boolean deleted = expertiseService.deleteExpertiseById(id);
        if (deleted)
            return new ResponseEntity<>("Expertise deleted successfully",HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    //@RequestMapping(value = "/expertises/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateExpertise(@PathVariable Long id,
                                                  @RequestBody Expertise updatedExpertise){
        boolean updated = expertiseService.updateExpertise(id, updatedExpertise);
        if (updated)
            return new ResponseEntity<>("Expertise updated successfully",HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<ExpertiseDTO>> findExpertiseByBusinessId(@PathVariable Long businessId) {
        List<ExpertiseDTO> expertiseDTOs = expertiseService.findExpertiseByBusinessId(businessId);
        if (!expertiseDTOs.isEmpty()) {
            return ResponseEntity.ok(expertiseDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

