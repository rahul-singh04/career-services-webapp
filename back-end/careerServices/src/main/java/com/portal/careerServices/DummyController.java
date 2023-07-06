package com.portal.careerServices;

import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dummy")
public class DummyController {
    @Autowired
    private DummyService dummyService;

    @GetMapping("/getData")
    public ResponseEntity<List<Dummy>> getData() {
        return new ResponseEntity<List<Dummy>>(dummyService.findAllData(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Dummy>> getSingleData(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Dummy>>(dummyService.findDataById(id), HttpStatus.OK);
    }
    @PostMapping("/updateDummy")
    public ResponseEntity<UpdateResult> createDummy(@RequestBody Map<String, Object> payload) {
        String id = null;
        if (payload.containsKey("_id")) {
            Map<String, String> idMap = (Map<String, String>) payload.get("_id");
            id = idMap.get("$oid");
        }
        String first = (String) payload.get("first");
        String second = (String) payload.get("second");

        UpdateResult result = dummyService.updateDummy(first, second, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
