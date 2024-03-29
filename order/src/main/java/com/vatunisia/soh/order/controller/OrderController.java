package com.vatunisia.soh.order.controller;

import com.vatunisia.soh.order.dto.OrderDTO;
import com.vatunisia.soh.order.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/saveOrder")

    public ResponseEntity<OrderDTO> saveOrder(@RequestBody OrderDTO orderDetails){
         OrderDTO orderSavedInDB = orderService.saveOrderInDb(orderDetails);
         return new ResponseEntity<>(orderSavedInDB, HttpStatus.CREATED);
}

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable String id) {
        // Print the request URL
        //System.out.println("Request URL: " + request.getRequestURL().toString());

        OrderDTO orderDTO = orderService.getOrderById(id);
        if (orderDTO != null) {
            return ResponseEntity.ok(orderDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDTO>> findAll() {
        List<OrderDTO> orders = orderService.findAll();
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable String id) {
        boolean deleted = orderService.deleteOrderById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/report")
    public ResponseEntity<String> generateReport(@RequestBody Map<String, Object> requestMap) {
        ResponseEntity<String> response = orderService.generateReport(requestMap);
        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody Map<String, Object> requestMap) {
        ResponseEntity<byte[]> response = orderService.getPdf(requestMap);
        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }
}
