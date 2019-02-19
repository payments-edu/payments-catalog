package com.edh.catalog.payments.repository;

import com.edh.catalog.payments.domain.CardLevel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CardLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardLevelRepository extends JpaRepository<CardLevel, Long> {

}
