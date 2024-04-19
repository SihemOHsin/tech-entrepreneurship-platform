package com.vatunisia.soh.business.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
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
}
