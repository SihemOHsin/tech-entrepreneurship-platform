package com.vatunisia.soh.business.repository;

import com.vatunisia.soh.business.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
    List<Business> findByUserId(Integer userId);
    List<Business> findByUserIdIn(List<Integer> userIds);

}
