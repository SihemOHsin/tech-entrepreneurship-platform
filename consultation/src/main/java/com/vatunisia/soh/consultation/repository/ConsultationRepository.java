package com.vatunisia.soh.consultation.repository;

import com.vatunisia.soh.consultation.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByBusinessId(Integer businessId);
}