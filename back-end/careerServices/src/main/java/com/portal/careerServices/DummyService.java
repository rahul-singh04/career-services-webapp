package com.portal.careerServices;

import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DummyService {
    @Autowired
    private DummyRepository dummyRepository;

    public List<Dummy> findAllData(){
        return dummyRepository.findAll();
    }
    public Optional<Dummy> findDataById(ObjectId id){
        return dummyRepository.findById(id);
    }
    @Autowired
    private MongoTemplate mongoTemplate;

    public UpdateResult updateDummy(String first, String second, String id) {
        Query query = Query.query(Criteria.where("_id").is(id));
        Update update = new Update()
                .set("first", first)
                .set("second", second);

        UpdateResult result = mongoTemplate.updateFirst(query, update, Dummy.class);
        return result;
    }

}
