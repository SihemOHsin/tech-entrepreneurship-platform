package com.vatunisia.soh.order.mapper;

import com.vatunisia.soh.order.dto.Consultation;
import com.vatunisia.soh.order.dto.OrderDTO;
import com.vatunisia.soh.order.entity.Order;

import java.util.List;

public class OrderMapper {

    public static OrderDTO mapToOrderDTO(
            Order order,
            List<Consultation> consultationServices) {

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setConsultationServices(consultationServices);
        orderDTO.setPaymentMethod(order.getPaymentMethod());
        orderDTO.setContactNumber(order.getContactNumber());
        orderDTO.setEmail(order.getEmail());
        orderDTO.setName(order.getName());
        orderDTO.setTotal(order.getTotal());
        orderDTO.setBusinessId(order.getBusinessId());

        return orderDTO;
    }
}
