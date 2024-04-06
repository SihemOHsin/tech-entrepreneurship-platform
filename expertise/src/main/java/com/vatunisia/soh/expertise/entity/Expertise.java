package com.vatunisia.soh.expertise.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expertise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String entrepreneurshipNeeds;
    private String techExpertise;
    private String minProposedPrice;
    private String maxProposedPrice;
    private Long businessId; }
