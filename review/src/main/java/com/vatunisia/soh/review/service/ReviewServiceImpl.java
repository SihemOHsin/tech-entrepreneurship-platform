package com.vatunisia.soh.review.service;

import com.vatunisia.soh.review.entity.Review;
import com.vatunisia.soh.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> getAllReviews(Integer businessId) {
        List<Review> reviews = reviewRepository.findByBusinessId(businessId);
        return reviews;
    }

    @Override
    public Review addReview(Integer businessId, Review review) {
        if (businessId != null && review != null) {
            review.setBusinessId(businessId);
            return reviewRepository.save(review);
        } else {
            return null;
        }
    }

    @Override
    public Review getReview(Long reviewId) {
        return reviewRepository.findById(reviewId).orElse(null);
    }

    @Override
    public Review updateReview(Long reviewId, Review updatedReview) {
        Review review = reviewRepository.findById(reviewId).orElse(null);
        if (review != null){
            review.setTitle(updatedReview.getTitle());
            review.setDescription(updatedReview.getDescription());
            review.setRating(updatedReview.getRating());
            review.setBusinessId(updatedReview.getBusinessId());
            review.setReviewerBusinessId(updatedReview.getReviewerBusinessId()); // New field

            return reviewRepository.save(review);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElse(null);
        if (review != null){
            reviewRepository.delete(review);
            return true;
        } else {
            return false;
        }
    }
}
