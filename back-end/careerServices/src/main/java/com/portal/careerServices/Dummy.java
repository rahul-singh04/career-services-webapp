package com.portal.careerServices;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dummy")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dummy {
    @Id
    private ObjectId id;
    private String first;
    private String second;
}
