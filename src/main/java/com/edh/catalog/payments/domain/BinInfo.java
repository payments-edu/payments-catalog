package com.edh.catalog.payments.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BinInfo.
 */
@Entity
@Table(name = "bin_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BinInfo implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bin")
    private String bin;

    @Column(name = "country_id")
    private Integer countryId;

    @ManyToOne
    @JsonIgnoreProperties("binInfos")
    private CardType type;

    @ManyToOne
    @JsonIgnoreProperties("binInfos")
    private CardLevel level;

    @ManyToOne
    @JsonIgnoreProperties("binInfos")
    private CardBrand cardBrand;

    @ManyToOne
    @JsonIgnoreProperties("binInfos")
    private Bank bank;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBin() {
        return bin;
    }

    public BinInfo bin(String bin) {
        this.bin = bin;
        return this;
    }

    public void setBin(String bin) {
        this.bin = bin;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public BinInfo countryId(Integer countryId) {
        this.countryId = countryId;
        return this;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public CardType getType() {
        return type;
    }

    public BinInfo type(CardType cardType) {
        this.type = cardType;
        return this;
    }

    public void setType(CardType cardType) {
        this.type = cardType;
    }

    public CardLevel getLevel() {
        return level;
    }

    public BinInfo level(CardLevel cardLevel) {
        this.level = cardLevel;
        return this;
    }

    public void setLevel(CardLevel cardLevel) {
        this.level = cardLevel;
    }

    public CardBrand getCardBrand() {
        return cardBrand;
    }

    public BinInfo cardBrand(CardBrand cardBrand) {
        this.cardBrand = cardBrand;
        return this;
    }

    public void setCardBrand(CardBrand cardBrand) {
        this.cardBrand = cardBrand;
    }

    public Bank getBank() {
        return bank;
    }

    public BinInfo bank(Bank bank) {
        this.bank = bank;
        return this;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BinInfo binInfo = (BinInfo) o;
        if (binInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), binInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BinInfo{" +
            "id=" + getId() +
            ", bin='" + getBin() + "'" +
            ", countryId=" + getCountryId() +
            "}";
    }
}
