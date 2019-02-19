package com.edh.catalog.payments.web.rest;
import com.edh.catalog.payments.domain.BinInfo;
import com.edh.catalog.payments.repository.BinInfoRepository;
import com.edh.catalog.payments.web.rest.errors.BadRequestAlertException;
import com.edh.catalog.payments.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BinInfo.
 */
@RestController
@RequestMapping("/api")
public class BinInfoResource {

    private final Logger log = LoggerFactory.getLogger(BinInfoResource.class);

    private static final String ENTITY_NAME = "binInfo";

    private final BinInfoRepository binInfoRepository;

    public BinInfoResource(BinInfoRepository binInfoRepository) {
        this.binInfoRepository = binInfoRepository;
    }

    /**
     * POST  /bin-infos : Create a new binInfo.
     *
     * @param binInfo the binInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new binInfo, or with status 400 (Bad Request) if the binInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bin-infos")
    public ResponseEntity<BinInfo> createBinInfo(@RequestBody BinInfo binInfo) throws URISyntaxException {
        log.debug("REST request to save BinInfo : {}", binInfo);
        if (binInfo.getId() != null) {
            throw new BadRequestAlertException("A new binInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BinInfo result = binInfoRepository.save(binInfo);
        return ResponseEntity.created(new URI("/api/bin-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bin-infos : Updates an existing binInfo.
     *
     * @param binInfo the binInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated binInfo,
     * or with status 400 (Bad Request) if the binInfo is not valid,
     * or with status 500 (Internal Server Error) if the binInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bin-infos")
    public ResponseEntity<BinInfo> updateBinInfo(@RequestBody BinInfo binInfo) throws URISyntaxException {
        log.debug("REST request to update BinInfo : {}", binInfo);
        if (binInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BinInfo result = binInfoRepository.save(binInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, binInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bin-infos : get all the binInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of binInfos in body
     */
    @GetMapping("/bin-infos")
    public List<BinInfo> getAllBinInfos() {
        log.debug("REST request to get all BinInfos");
        return binInfoRepository.findAll();
    }

    /**
     * GET  /bin-infos/:id : get the "id" binInfo.
     *
     * @param id the id of the binInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the binInfo, or with status 404 (Not Found)
     */
    @GetMapping("/bin-infos/{id}")
    public ResponseEntity<BinInfo> getBinInfo(@PathVariable Long id) {
        log.debug("REST request to get BinInfo : {}", id);
        Optional<BinInfo> binInfo = binInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(binInfo);
    }

    /**
     * DELETE  /bin-infos/:id : delete the "id" binInfo.
     *
     * @param id the id of the binInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bin-infos/{id}")
    public ResponseEntity<Void> deleteBinInfo(@PathVariable Long id) {
        log.debug("REST request to delete BinInfo : {}", id);
        binInfoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
