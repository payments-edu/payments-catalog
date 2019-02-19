package com.edh.catalog.payments.web.rest;

import com.edh.catalog.payments.PaymentscatalogApp;

import com.edh.catalog.payments.domain.BinInfo;
import com.edh.catalog.payments.repository.BinInfoRepository;
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
 * Test class for the BinInfoResource REST controller.
 *
 * @see BinInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaymentscatalogApp.class)
public class BinInfoResourceIntTest {

    private static final String DEFAULT_BIN = "AAAAAAAAAA";
    private static final String UPDATED_BIN = "BBBBBBBBBB";

    private static final Integer DEFAULT_COUNTRY_ID = 1;
    private static final Integer UPDATED_COUNTRY_ID = 2;

    @Autowired
    private BinInfoRepository binInfoRepository;

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

    private MockMvc restBinInfoMockMvc;

    private BinInfo binInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BinInfoResource binInfoResource = new BinInfoResource(binInfoRepository);
        this.restBinInfoMockMvc = MockMvcBuilders.standaloneSetup(binInfoResource)
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
    public static BinInfo createEntity(EntityManager em) {
        BinInfo binInfo = new BinInfo()
            .bin(DEFAULT_BIN)
            .countryId(DEFAULT_COUNTRY_ID);
        return binInfo;
    }

    @Before
    public void initTest() {
        binInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createBinInfo() throws Exception {
        int databaseSizeBeforeCreate = binInfoRepository.findAll().size();

        // Create the BinInfo
        restBinInfoMockMvc.perform(post("/api/bin-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(binInfo)))
            .andExpect(status().isCreated());

        // Validate the BinInfo in the database
        List<BinInfo> binInfoList = binInfoRepository.findAll();
        assertThat(binInfoList).hasSize(databaseSizeBeforeCreate + 1);
        BinInfo testBinInfo = binInfoList.get(binInfoList.size() - 1);
        assertThat(testBinInfo.getBin()).isEqualTo(DEFAULT_BIN);
        assertThat(testBinInfo.getCountryId()).isEqualTo(DEFAULT_COUNTRY_ID);
    }

    @Test
    @Transactional
    public void createBinInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = binInfoRepository.findAll().size();

        // Create the BinInfo with an existing ID
        binInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBinInfoMockMvc.perform(post("/api/bin-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(binInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BinInfo in the database
        List<BinInfo> binInfoList = binInfoRepository.findAll();
        assertThat(binInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBinInfos() throws Exception {
        // Initialize the database
        binInfoRepository.saveAndFlush(binInfo);

        // Get all the binInfoList
        restBinInfoMockMvc.perform(get("/api/bin-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(binInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].bin").value(hasItem(DEFAULT_BIN.toString())))
            .andExpect(jsonPath("$.[*].countryId").value(hasItem(DEFAULT_COUNTRY_ID)));
    }
    
    @Test
    @Transactional
    public void getBinInfo() throws Exception {
        // Initialize the database
        binInfoRepository.saveAndFlush(binInfo);

        // Get the binInfo
        restBinInfoMockMvc.perform(get("/api/bin-infos/{id}", binInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(binInfo.getId().intValue()))
            .andExpect(jsonPath("$.bin").value(DEFAULT_BIN.toString()))
            .andExpect(jsonPath("$.countryId").value(DEFAULT_COUNTRY_ID));
    }

    @Test
    @Transactional
    public void getNonExistingBinInfo() throws Exception {
        // Get the binInfo
        restBinInfoMockMvc.perform(get("/api/bin-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBinInfo() throws Exception {
        // Initialize the database
        binInfoRepository.saveAndFlush(binInfo);

        int databaseSizeBeforeUpdate = binInfoRepository.findAll().size();

        // Update the binInfo
        BinInfo updatedBinInfo = binInfoRepository.findById(binInfo.getId()).get();
        // Disconnect from session so that the updates on updatedBinInfo are not directly saved in db
        em.detach(updatedBinInfo);
        updatedBinInfo
            .bin(UPDATED_BIN)
            .countryId(UPDATED_COUNTRY_ID);

        restBinInfoMockMvc.perform(put("/api/bin-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBinInfo)))
            .andExpect(status().isOk());

        // Validate the BinInfo in the database
        List<BinInfo> binInfoList = binInfoRepository.findAll();
        assertThat(binInfoList).hasSize(databaseSizeBeforeUpdate);
        BinInfo testBinInfo = binInfoList.get(binInfoList.size() - 1);
        assertThat(testBinInfo.getBin()).isEqualTo(UPDATED_BIN);
        assertThat(testBinInfo.getCountryId()).isEqualTo(UPDATED_COUNTRY_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingBinInfo() throws Exception {
        int databaseSizeBeforeUpdate = binInfoRepository.findAll().size();

        // Create the BinInfo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBinInfoMockMvc.perform(put("/api/bin-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(binInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BinInfo in the database
        List<BinInfo> binInfoList = binInfoRepository.findAll();
        assertThat(binInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBinInfo() throws Exception {
        // Initialize the database
        binInfoRepository.saveAndFlush(binInfo);

        int databaseSizeBeforeDelete = binInfoRepository.findAll().size();

        // Delete the binInfo
        restBinInfoMockMvc.perform(delete("/api/bin-infos/{id}", binInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BinInfo> binInfoList = binInfoRepository.findAll();
        assertThat(binInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BinInfo.class);
        BinInfo binInfo1 = new BinInfo();
        binInfo1.setId(1L);
        BinInfo binInfo2 = new BinInfo();
        binInfo2.setId(binInfo1.getId());
        assertThat(binInfo1).isEqualTo(binInfo2);
        binInfo2.setId(2L);
        assertThat(binInfo1).isNotEqualTo(binInfo2);
        binInfo1.setId(null);
        assertThat(binInfo1).isNotEqualTo(binInfo2);
    }
}
