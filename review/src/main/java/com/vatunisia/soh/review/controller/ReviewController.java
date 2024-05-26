package com.vatunisia.soh.review.controller;

import com.vatunisia.soh.review.entity.Review;
import com.vatunisia.soh.review.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {
    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews(@RequestParam Integer businessId){
        return new ResponseEntity<>(reviewService.getAllReviews(businessId),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestParam Integer businessId, @RequestBody Review review) {
        Review savedReview = reviewService.addReview(businessId, review);
        if (savedReview != null) {
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReview(@PathVariable Long reviewId){
        return new ResponseEntity<>(reviewService.getReview(reviewId),
                HttpStatus.OK);

    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody Review review) {
        Review updatedReview = reviewService.updateReview(reviewId, review);
        if (updatedReview != null) {
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId){
        boolean isReviewDeleted = reviewService.deleteReview(reviewId);
        if (isReviewDeleted)
            return new ResponseEntity<>("Review deleted successfully",
                    HttpStatus.OK);
        else
            return new ResponseEntity<>("Review not deleted",
                    HttpStatus.NOT_FOUND);
    }
}
