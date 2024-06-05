package com.vatunisia.soh.order.service;

import com.vatunisia.soh.order.dto.OrderDTO;
import com.vatunisia.soh.order.entity.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface OrderService {

    OrderDTO saveOrderInDb(OrderDTO orderDTO);

    OrderDTO getOrderById(String id);

    List<OrderDTO> findAll();

    boolean deleteOrderById(String id);

    ResponseEntity<String> generateReport(Map<String, Object> requestMap);

    ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap);
}
