package com.vatunisia.soh.order.service;

import com.vatunisia.soh.order.entity.Sequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class SequenceGenerator {

    @Autowired
    private MongoOperations mongoOperations;

    public Long generateNextOrderId() {
        Sequence sequence = mongoOperations.findAndModify(
                query(where("_id").is("order_sequence")),
                new Update().inc("sequence", 1),
                options().returnNew(true).upsert(true),
                Sequence.class);

        // Handle null sequence (for safety)
        if (sequence == null) {
            throw new IllegalStateException("Failed to generate the next order ID.");
        }

        return sequence.getSequence();
    }
}
