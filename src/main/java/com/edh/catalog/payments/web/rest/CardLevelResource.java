package com.edh.catalog.payments.web.rest;
import com.edh.catalog.payments.domain.CardLevel;
import com.edh.catalog.payments.repository.CardLevelRepository;
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
 * REST controller for managing CardLevel.
 */
@RestController
@RequestMapping("/api")
public class CardLevelResource {

    private final Logger log = LoggerFactory.getLogger(CardLevelResource.class);

    private static final String ENTITY_NAME = "cardLevel";

    private final CardLevelRepository cardLevelRepository;

    public CardLevelResource(CardLevelRepository cardLevelRepository) {
        this.cardLevelRepository = cardLevelRepository;
    }

    /**
     * POST  /card-levels : Create a new cardLevel.
     *
     * @param cardLevel the cardLevel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardLevel, or with status 400 (Bad Request) if the cardLevel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-levels")
    public ResponseEntity<CardLevel> createCardLevel(@RequestBody CardLevel cardLevel) throws URISyntaxException {
        log.debug("REST request to save CardLevel : {}", cardLevel);
        if (cardLevel.getId() != null) {
            throw new BadRequestAlertException("A new cardLevel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardLevel result = cardLevelRepository.save(cardLevel);
        return ResponseEntity.created(new URI("/api/card-levels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /card-levels : Updates an existing cardLevel.
     *
     * @param cardLevel the cardLevel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardLevel,
     * or with status 400 (Bad Request) if the cardLevel is not valid,
     * or with status 500 (Internal Server Error) if the cardLevel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-levels")
    public ResponseEntity<CardLevel> updateCardLevel(@RequestBody CardLevel cardLevel) throws URISyntaxException {
        log.debug("REST request to update CardLevel : {}", cardLevel);
        if (cardLevel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CardLevel result = cardLevelRepository.save(cardLevel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardLevel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-levels : get all the cardLevels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cardLevels in body
     */
    @GetMapping("/card-levels")
    public List<CardLevel> getAllCardLevels() {
        log.debug("REST request to get all CardLevels");
        return cardLevelRepository.findAll();
    }

    /**
     * GET  /card-levels/:id : get the "id" cardLevel.
     *
     * @param id the id of the cardLevel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardLevel, or with status 404 (Not Found)
     */
    @GetMapping("/card-levels/{id}")
    public ResponseEntity<CardLevel> getCardLevel(@PathVariable Long id) {
        log.debug("REST request to get CardLevel : {}", id);
        Optional<CardLevel> cardLevel = cardLevelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cardLevel);
    }

    /**
     * DELETE  /card-levels/:id : delete the "id" cardLevel.
     *
     * @param id the id of the cardLevel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-levels/{id}")
    public ResponseEntity<Void> deleteCardLevel(@PathVariable Long id) {
        log.debug("REST request to delete CardLevel : {}", id);
        cardLevelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
