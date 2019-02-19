package com.edh.catalog.payments.repository;

import com.edh.catalog.payments.domain.CardType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CardType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardTypeRepository extends JpaRepository<CardType, Long> {

}
