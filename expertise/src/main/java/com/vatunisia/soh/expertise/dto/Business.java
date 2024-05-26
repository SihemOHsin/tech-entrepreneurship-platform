package com.vatunisia.soh.expertise.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private String bizname;
    private LocalDate dateOfBizCreation;//LocalDate in Spring Boot is typically ISO-8601 (yyyy-MM-dd)
    private String industry;
    private String location;
    private String businessLogo;

}