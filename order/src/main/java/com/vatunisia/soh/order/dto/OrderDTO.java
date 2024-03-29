package com.vatunisia.soh.order.dto;


import java.util.List;

public class OrderDTO {

    private String id;
    private List<Consultation> consultationServices;
    private Long businessId;
    private String paymentMethod;
    private  String contactNumber;
    private String email;
    private String name;
    private Integer total;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Consultation> getConsultationServices() {
        return consultationServices;
    }

    public void setConsultationServices(List<Consultation> consultationServices) {
        this.consultationServices = consultationServices;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

}
