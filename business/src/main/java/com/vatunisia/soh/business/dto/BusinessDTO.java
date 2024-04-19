package com.vatunisia.soh.business.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessDTO {
    private Integer id;
    private User user;
    private String bizname;
    private LocalDate dateOfBizCreation;
    private String industry;
    private String location;
}

