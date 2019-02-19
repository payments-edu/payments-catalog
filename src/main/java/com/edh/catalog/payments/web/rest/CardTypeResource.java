package com.edh.catalog.payments.web.rest;
import com.edh.catalog.payments.domain.CardType;
import com.edh.catalog.payments.repository.CardTypeRepository;
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
 * REST controller for managing CardType.
 */
@RestController
@RequestMapping("/api")
public class CardTypeResource {

    private final Logger log = LoggerFactory.getLogger(CardTypeResource.class);

    private static final String ENTITY_NAME = "cardType";

    private final CardTypeRepository cardTypeRepository;

    public CardTypeResource(CardTypeRepository cardTypeRepository) {
        this.cardTypeRepository = cardTypeRepository;
    }

    /**
     * POST  /card-types : Create a new cardType.
     *
     * @param cardType the cardType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardType, or with status 400 (Bad Request) if the cardType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-types")
    public ResponseEntity<CardType> createCardType(@RequestBody CardType cardType) throws URISyntaxException {
        log.debug("REST request to save CardType : {}", cardType);
        if (cardType.getId() != null) {
            throw new BadRequestAlertException("A new cardType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardType result = cardTypeRepository.save(cardType);
        return ResponseEntity.created(new URI("/api/card-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /card-types : Updates an existing cardType.
     *
     * @param cardType the cardType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardType,
     * or with status 400 (Bad Request) if the cardType is not valid,
     * or with status 500 (Internal Server Error) if the cardType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-types")
    public ResponseEntity<CardType> updateCardType(@RequestBody CardType cardType) throws URISyntaxException {
        log.debug("REST request to update CardType : {}", cardType);
        if (cardType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CardType result = cardTypeRepository.save(cardType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-types : get all the cardTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cardTypes in body
     */
    @GetMapping("/card-types")
    public List<CardType> getAllCardTypes() {
        log.debug("REST request to get all CardTypes");
        return cardTypeRepository.findAll();
    }

    /**
     * GET  /card-types/:id : get the "id" cardType.
     *
     * @param id the id of the cardType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardType, or with status 404 (Not Found)
     */
    @GetMapping("/card-types/{id}")
    public ResponseEntity<CardType> getCardType(@PathVariable Long id) {
        log.debug("REST request to get CardType : {}", id);
        Optional<CardType> cardType = cardTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cardType);
    }

    /**
     * DELETE  /card-types/:id : delete the "id" cardType.
     *
     * @param id the id of the cardType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-types/{id}")
    public ResponseEntity<Void> deleteCardType(@PathVariable Long id) {
        log.debug("REST request to delete CardType : {}", id);
        cardTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
