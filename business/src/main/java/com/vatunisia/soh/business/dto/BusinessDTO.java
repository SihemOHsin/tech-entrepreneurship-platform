package com.vatunisia.soh.business.dto;

import java.time.LocalDate;

public class BusinessDTO {
    private Integer id;
    private User user;//get
    private String bizname;
    private LocalDate dateOfBizCreation;
    private String industry;
    private String location;
    private byte[] businessLogo;

    public byte[] getBusinessLogo() {
        return businessLogo;
    }

    public void setBusinessLogo(byte[] businessLogo) {
        this.businessLogo = businessLogo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBizname() {
        return bizname;
    }

    public void setBizname(String bizname) {
        this.bizname = bizname;
    }

    public LocalDate getDateOfBizCreation() {
        return dateOfBizCreation;
    }

    public void setDateOfBizCreation(LocalDate dateOfBizCreation) {
        this.dateOfBizCreation = dateOfBizCreation;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


}

