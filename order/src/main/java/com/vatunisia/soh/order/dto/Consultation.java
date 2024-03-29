package com.vatunisia.soh.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Consultation {

    private Long id;

    private String consultationName;

    private String consultationDescription;

    private Long price;

    private Long businessId;

}
