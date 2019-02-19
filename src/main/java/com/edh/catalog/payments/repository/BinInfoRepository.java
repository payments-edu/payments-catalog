package com.edh.catalog.payments.repository;

import com.edh.catalog.payments.domain.BinInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BinInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BinInfoRepository extends JpaRepository<BinInfo, Long> {

}
