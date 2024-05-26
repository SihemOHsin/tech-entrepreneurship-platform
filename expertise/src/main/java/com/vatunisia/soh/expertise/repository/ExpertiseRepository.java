package com.vatunisia.soh.expertise.repository;

import com.vatunisia.soh.expertise.entity.Expertise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpertiseRepository extends JpaRepository<Expertise, Long> {
    List<Expertise> findByBusinessId(Integer businessId);
}
