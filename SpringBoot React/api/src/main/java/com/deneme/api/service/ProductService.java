package com.deneme.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deneme.api.model.Product;
import com.deneme.api.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> getProducts(){
		return productRepository.findAll();
	}
	
	public void addProduct(Product _product) {
		productRepository.save(_product);
	}
	
	public Optional<Product> getProductId(Integer id){
		return productRepository.findById(id);
	}
	
	public Product updateProduct(Integer id, Product productDetails) {
		Optional<Product> product = productRepository.findById(id);
		if (product.isPresent()) {
			Product existingProduct = product.get();
			existingProduct.setName(productDetails.getName());
			existingProduct.setCategory(productDetails.getCategory());
			existingProduct.setBrand(productDetails.getBrand());
			existingProduct.setprice(productDetails.getprice());
			existingProduct.setDescription(productDetails.getDescription());
			return productRepository.save(existingProduct);
		}
		return null;
	}
	
	public void deleteProduct(Integer id) {
		productRepository.deleteById(id);
	}
}
