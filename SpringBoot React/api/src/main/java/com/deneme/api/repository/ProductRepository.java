package com.deneme.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deneme.api.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

}
