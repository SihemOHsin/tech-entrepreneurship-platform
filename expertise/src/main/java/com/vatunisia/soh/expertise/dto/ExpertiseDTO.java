package com.vatunisia.soh.expertise.dto;

import java.util.List;

public class ExpertiseDTO {
    private Long id;
    private String title;
    private String entrepreneurshipNeeds;
    private String minProposedPrice;
    private String maxProposedPrice;
    private String location;
    private String techExpertise;
    private Business business;
    private List<Review> reviews;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEntrepreneurshipNeeds() {
        return entrepreneurshipNeeds;
    }

    public void setEntrepreneurshipNeeds(String entrepreneurshipNeeds) {
        this.entrepreneurshipNeeds = entrepreneurshipNeeds;
    }

    public String getMinProposedPrice() {
        return minProposedPrice;
    }

    public void setMinProposedPrice(String minProposedPrice) {
        this.minProposedPrice = minProposedPrice;
    }

    public String getMaxProposedPrice() {
        return maxProposedPrice;
    }

    public void setMaxProposedPrice(String maxProposedPrice) {
        this.maxProposedPrice = maxProposedPrice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTechExpertise() {
        return techExpertise;
    }

    public void setTechExpertise(String techExpertise) {
        this.techExpertise = techExpertise;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
