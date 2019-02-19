package com.edh.catalog.payments.repository;

import com.edh.catalog.payments.domain.CardBrand;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CardBrand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardBrandRepository extends JpaRepository<CardBrand, Long> {

}
