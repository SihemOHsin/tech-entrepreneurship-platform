package com.vatunisia.soh.order.entity;



import com.vatunisia.soh.order.dto.Consultation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("order")
public class Order {
    private String id;
    private List<Consultation> consultationServices;
    private Long businessId;
    private String paymentMethod;
    private  String contactNumber;
    private String email;
    private String name;
    private Integer total;

}



