package com.vatunisia.soh.review.service;

import com.vatunisia.soh.review.entity.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getAllReviews(Long businessId);
    boolean addReview(Long businessId, Review review);
    Review getReview(Long reviewId);
    boolean updateReview(Long reviewId, Review review);
    boolean deleteReview(Long reviewId);
}
