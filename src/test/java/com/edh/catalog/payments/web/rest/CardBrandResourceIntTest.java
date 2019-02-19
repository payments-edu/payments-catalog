package com.edh.catalog.payments.web.rest;

import com.edh.catalog.payments.PaymentscatalogApp;

import com.edh.catalog.payments.domain.CardBrand;
import com.edh.catalog.payments.repository.CardBrandRepository;
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
 * Test class for the CardBrandResource REST controller.
 *
 * @see CardBrandResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaymentscatalogApp.class)
public class CardBrandResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private CardBrandRepository cardBrandRepository;

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

    private MockMvc restCardBrandMockMvc;

    private CardBrand cardBrand;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardBrandResource cardBrandResource = new CardBrandResource(cardBrandRepository);
        this.restCardBrandMockMvc = MockMvcBuilders.standaloneSetup(cardBrandResource)
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
    public static CardBrand createEntity(EntityManager em) {
        CardBrand cardBrand = new CardBrand()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .priority(DEFAULT_PRIORITY)
            .url(DEFAULT_URL)
            .phone(DEFAULT_PHONE);
        return cardBrand;
    }

    @Before
    public void initTest() {
        cardBrand = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardBrand() throws Exception {
        int databaseSizeBeforeCreate = cardBrandRepository.findAll().size();

        // Create the CardBrand
        restCardBrandMockMvc.perform(post("/api/card-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardBrand)))
            .andExpect(status().isCreated());

        // Validate the CardBrand in the database
        List<CardBrand> cardBrandList = cardBrandRepository.findAll();
        assertThat(cardBrandList).hasSize(databaseSizeBeforeCreate + 1);
        CardBrand testCardBrand = cardBrandList.get(cardBrandList.size() - 1);
        assertThat(testCardBrand.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCardBrand.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCardBrand.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testCardBrand.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testCardBrand.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createCardBrandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardBrandRepository.findAll().size();

        // Create the CardBrand with an existing ID
        cardBrand.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardBrandMockMvc.perform(post("/api/card-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardBrand)))
            .andExpect(status().isBadRequest());

        // Validate the CardBrand in the database
        List<CardBrand> cardBrandList = cardBrandRepository.findAll();
        assertThat(cardBrandList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCardBrands() throws Exception {
        // Initialize the database
        cardBrandRepository.saveAndFlush(cardBrand);

        // Get all the cardBrandList
        restCardBrandMockMvc.perform(get("/api/card-brands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardBrand.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }
    
    @Test
    @Transactional
    public void getCardBrand() throws Exception {
        // Initialize the database
        cardBrandRepository.saveAndFlush(cardBrand);

        // Get the cardBrand
        restCardBrandMockMvc.perform(get("/api/card-brands/{id}", cardBrand.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardBrand.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCardBrand() throws Exception {
        // Get the cardBrand
        restCardBrandMockMvc.perform(get("/api/card-brands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardBrand() throws Exception {
        // Initialize the database
        cardBrandRepository.saveAndFlush(cardBrand);

        int databaseSizeBeforeUpdate = cardBrandRepository.findAll().size();

        // Update the cardBrand
        CardBrand updatedCardBrand = cardBrandRepository.findById(cardBrand.getId()).get();
        // Disconnect from session so that the updates on updatedCardBrand are not directly saved in db
        em.detach(updatedCardBrand);
        updatedCardBrand
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .priority(UPDATED_PRIORITY)
            .url(UPDATED_URL)
            .phone(UPDATED_PHONE);

        restCardBrandMockMvc.perform(put("/api/card-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardBrand)))
            .andExpect(status().isOk());

        // Validate the CardBrand in the database
        List<CardBrand> cardBrandList = cardBrandRepository.findAll();
        assertThat(cardBrandList).hasSize(databaseSizeBeforeUpdate);
        CardBrand testCardBrand = cardBrandList.get(cardBrandList.size() - 1);
        assertThat(testCardBrand.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCardBrand.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCardBrand.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testCardBrand.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testCardBrand.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingCardBrand() throws Exception {
        int databaseSizeBeforeUpdate = cardBrandRepository.findAll().size();

        // Create the CardBrand

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCardBrandMockMvc.perform(put("/api/card-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardBrand)))
            .andExpect(status().isBadRequest());

        // Validate the CardBrand in the database
        List<CardBrand> cardBrandList = cardBrandRepository.findAll();
        assertThat(cardBrandList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCardBrand() throws Exception {
        // Initialize the database
        cardBrandRepository.saveAndFlush(cardBrand);

        int databaseSizeBeforeDelete = cardBrandRepository.findAll().size();

        // Delete the cardBrand
        restCardBrandMockMvc.perform(delete("/api/card-brands/{id}", cardBrand.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CardBrand> cardBrandList = cardBrandRepository.findAll();
        assertThat(cardBrandList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardBrand.class);
        CardBrand cardBrand1 = new CardBrand();
        cardBrand1.setId(1L);
        CardBrand cardBrand2 = new CardBrand();
        cardBrand2.setId(cardBrand1.getId());
        assertThat(cardBrand1).isEqualTo(cardBrand2);
        cardBrand2.setId(2L);
        assertThat(cardBrand1).isNotEqualTo(cardBrand2);
        cardBrand1.setId(null);
        assertThat(cardBrand1).isNotEqualTo(cardBrand2);
    }
}
