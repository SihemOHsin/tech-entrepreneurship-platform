package com.vatunisia.soh.business.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String buzame;
    private String industry;
    private String location;
    private String role; // IT EXPERT OR ENTREPRENEUR
    //private String entrepreneurshipNeeds; // match with expertise entrepreneurshipNeeds
    //private String techExpertise;// match with expertise techExpertise

}

