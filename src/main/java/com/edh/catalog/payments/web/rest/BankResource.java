package com.edh.catalog.payments.web.rest;
import com.edh.catalog.payments.domain.Bank;
import com.edh.catalog.payments.repository.BankRepository;
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
 * REST controller for managing Bank.
 */
@RestController
@RequestMapping("/api")
public class BankResource {

    private final Logger log = LoggerFactory.getLogger(BankResource.class);

    private static final String ENTITY_NAME = "bank";

    private final BankRepository bankRepository;

    public BankResource(BankRepository bankRepository) {
        this.bankRepository = bankRepository;
    }

    /**
     * POST  /banks : Create a new bank.
     *
     * @param bank the bank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bank, or with status 400 (Bad Request) if the bank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banks")
    public ResponseEntity<Bank> createBank(@RequestBody Bank bank) throws URISyntaxException {
        log.debug("REST request to save Bank : {}", bank);
        if (bank.getId() != null) {
            throw new BadRequestAlertException("A new bank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bank result = bankRepository.save(bank);
        return ResponseEntity.created(new URI("/api/banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banks : Updates an existing bank.
     *
     * @param bank the bank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bank,
     * or with status 400 (Bad Request) if the bank is not valid,
     * or with status 500 (Internal Server Error) if the bank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banks")
    public ResponseEntity<Bank> updateBank(@RequestBody Bank bank) throws URISyntaxException {
        log.debug("REST request to update Bank : {}", bank);
        if (bank.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bank result = bankRepository.save(bank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bank.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banks : get all the banks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks")
    public List<Bank> getAllBanks() {
        log.debug("REST request to get all Banks");
        return bankRepository.findAll();
    }

    /**
     * GET  /banks/:id : get the "id" bank.
     *
     * @param id the id of the bank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bank, or with status 404 (Not Found)
     */
    @GetMapping("/banks/{id}")
    public ResponseEntity<Bank> getBank(@PathVariable Long id) {
        log.debug("REST request to get Bank : {}", id);
        Optional<Bank> bank = bankRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bank);
    }

    /**
     * DELETE  /banks/:id : delete the "id" bank.
     *
     * @param id the id of the bank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banks/{id}")
    public ResponseEntity<Void> deleteBank(@PathVariable Long id) {
        log.debug("REST request to delete Bank : {}", id);
        bankRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
