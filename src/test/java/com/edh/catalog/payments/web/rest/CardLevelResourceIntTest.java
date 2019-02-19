package com.edh.catalog.payments.web.rest;

import com.edh.catalog.payments.PaymentscatalogApp;

import com.edh.catalog.payments.domain.CardLevel;
import com.edh.catalog.payments.repository.CardLevelRepository;
import com.edh.catalog.payments.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.edh.catalog.payments.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CardLevelResource REST controller.
 *
 * @see CardLevelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaymentscatalogApp.class)
public class CardLevelResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CardLevelRepository cardLevelRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCardLevelMockMvc;

    private CardLevel cardLevel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardLevelResource cardLevelResource = new CardLevelResource(cardLevelRepository);
        this.restCardLevelMockMvc = MockMvcBuilders.standaloneSetup(cardLevelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CardLevel createEntity(EntityManager em) {
        CardLevel cardLevel = new CardLevel()
            .name(DEFAULT_NAME);
        return cardLevel;
    }

    @Before
    public void initTest() {
        cardLevel = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardLevel() throws Exception {
        int databaseSizeBeforeCreate = cardLevelRepository.findAll().size();

        // Create the CardLevel
        restCardLevelMockMvc.perform(post("/api/card-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardLevel)))
            .andExpect(status().isCreated());

        // Validate the CardLevel in the database
        List<CardLevel> cardLevelList = cardLevelRepository.findAll();
        assertThat(cardLevelList).hasSize(databaseSizeBeforeCreate + 1);
        CardLevel testCardLevel = cardLevelList.get(cardLevelList.size() - 1);
        assertThat(testCardLevel.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCardLevelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardLevelRepository.findAll().size();

        // Create the CardLevel with an existing ID
        cardLevel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardLevelMockMvc.perform(post("/api/card-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardLevel)))
            .andExpect(status().isBadRequest());

        // Validate the CardLevel in the database
        List<CardLevel> cardLevelList = cardLevelRepository.findAll();
        assertThat(cardLevelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCardLevels() throws Exception {
        // Initialize the database
        cardLevelRepository.saveAndFlush(cardLevel);

        // Get all the cardLevelList
        restCardLevelMockMvc.perform(get("/api/card-levels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardLevel.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getCardLevel() throws Exception {
        // Initialize the database
        cardLevelRepository.saveAndFlush(cardLevel);

        // Get the cardLevel
        restCardLevelMockMvc.perform(get("/api/card-levels/{id}", cardLevel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardLevel.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCardLevel() throws Exception {
        // Get the cardLevel
        restCardLevelMockMvc.perform(get("/api/card-levels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardLevel() throws Exception {
        // Initialize the database
        cardLevelRepository.saveAndFlush(cardLevel);

        int databaseSizeBeforeUpdate = cardLevelRepository.findAll().size();

        // Update the cardLevel
        CardLevel updatedCardLevel = cardLevelRepository.findById(cardLevel.getId()).get();
        // Disconnect from session so that the updates on updatedCardLevel are not directly saved in db
        em.detach(updatedCardLevel);
        updatedCardLevel
            .name(UPDATED_NAME);

        restCardLevelMockMvc.perform(put("/api/card-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardLevel)))
            .andExpect(status().isOk());

        // Validate the CardLevel in the database
        List<CardLevel> cardLevelList = cardLevelRepository.findAll();
        assertThat(cardLevelList).hasSize(databaseSizeBeforeUpdate);
        CardLevel testCardLevel = cardLevelList.get(cardLevelList.size() - 1);
        assertThat(testCardLevel.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCardLevel() throws Exception {
        int databaseSizeBeforeUpdate = cardLevelRepository.findAll().size();

        // Create the CardLevel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCardLevelMockMvc.perform(put("/api/card-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardLevel)))
            .andExpect(status().isBadRequest());

        // Validate the CardLevel in the database
        List<CardLevel> cardLevelList = cardLevelRepository.findAll();
        assertThat(cardLevelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCardLevel() throws Exception {
        // Initialize the database
        cardLevelRepository.saveAndFlush(cardLevel);

        int databaseSizeBeforeDelete = cardLevelRepository.findAll().size();

        // Delete the cardLevel
        restCardLevelMockMvc.perform(delete("/api/card-levels/{id}", cardLevel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CardLevel> cardLevelList = cardLevelRepository.findAll();
        assertThat(cardLevelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardLevel.class);
        CardLevel cardLevel1 = new CardLevel();
        cardLevel1.setId(1L);
        CardLevel cardLevel2 = new CardLevel();
        cardLevel2.setId(cardLevel1.getId());
        assertThat(cardLevel1).isEqualTo(cardLevel2);
        cardLevel2.setId(2L);
        assertThat(cardLevel1).isNotEqualTo(cardLevel2);
        cardLevel1.setId(null);
        assertThat(cardLevel1).isNotEqualTo(cardLevel2);
    }
}
