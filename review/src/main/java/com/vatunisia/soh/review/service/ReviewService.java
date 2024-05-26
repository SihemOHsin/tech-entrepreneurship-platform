package com.vatunisia.soh.review.service;

import com.vatunisia.soh.review.entity.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getAllReviews(Integer businessId);

    Review addReview(Integer businessId, Review review);

    Review getReview(Long reviewId);

    Review updateReview(Long reviewId, Review updatedReview);

    boolean deleteReview(Long reviewId);

}
