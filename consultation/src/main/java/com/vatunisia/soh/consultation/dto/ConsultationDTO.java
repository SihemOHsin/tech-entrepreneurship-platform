package com.vatunisia.soh.consultation.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class ConsultationDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String consultationName;

    private String consultationDescription;

    private Long price;

    private Business business;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConsultationName() {
        return consultationName;
    }

    public void setConsultationName(String consultationName) {
        this.consultationName = consultationName;
    }

    public String getConsultationDescription() {
        return consultationDescription;
    }

    public void setConsultationDescription(String consultationDescription) {
        this.consultationDescription = consultationDescription;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }
}
