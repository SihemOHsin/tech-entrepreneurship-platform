package com.vatunisia.soh.business.repository;

import com.vatunisia.soh.business.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, Long> {
}
