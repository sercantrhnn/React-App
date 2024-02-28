package com.deneme.api.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.deneme.api.model.Product;

import com.deneme.api.service.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
    private ProductService productService;

    
    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    
    @PostMapping("/add")
    public void addProduct(@RequestBody Product _product) {
        productService.addProduct(_product);
    }

    @GetMapping("/getProduct{id}")
    public Optional<Product> getProductId(@PathVariable  Integer id){
    	return productService.getProductId(id);
    }
    
    @PutMapping("/update{id}")
    public Product updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
    	return productService.updateProduct(id, productDetails);
    }
    
    @DeleteMapping("/delete{id}")
    public void deleteProduct(@PathVariable Integer id) {
    	productService.deleteProduct(id);
    }

}
