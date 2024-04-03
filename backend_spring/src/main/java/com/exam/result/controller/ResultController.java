package com.exam.result.controller;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.exam.result.model.Result;
import com.exam.result.repository.ResultRepository;


@CrossOrigin(origins = "http://localhost:8082")
@RestController
@RequestMapping("/api")
public class ResultController {

  @Autowired
  ResultRepository resultRepository;

  @GetMapping("/results")
  public ResponseEntity<List<Result>> getAllResults(@RequestParam(required = false) String name) {
    try {
      List<Result> results = new ArrayList<Result>();

      if (name == null)
        resultRepository.findAll().forEach(results::add);
      else
        resultRepository.findByNameContaining(name).forEach(results::add);

      if (results.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(results, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  @GetMapping("/results/{id}")
  public ResponseEntity<Result> getresultById(@PathVariable("id") String id) {
    Optional<Result> resultData = resultRepository.findById(id);

    if (resultData.isPresent()) {
      return new ResponseEntity<>(resultData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  
  @PostMapping("/results")
  public ResponseEntity<Result> createResult(@RequestBody Result result) {
    try {
    	Result _result = resultRepository.save(new Result(result.getname(), result.getindex(),result.getmaths(),result.getscience(),result.getenglish(),result.getit(), false));
      return new ResponseEntity<>(_result, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PutMapping("/results/{id}")
  public ResponseEntity<Result> updateResult(@PathVariable("id") String id, @RequestBody Result result) {
    Optional<Result> resultData = resultRepository.findById(id);

    if (resultData.isPresent()) {
    	Result _result = resultData.get();
      _result.setname(result.getname());
      _result.setindex(result.getindex());
      _result.setmaths(result.getmaths());
      _result.setscience(result.getscience());
      _result.setenglish(result.getenglish());
      _result.setit(result.getit());
      _result.setfinalized(result.isfinalized());
      return new ResponseEntity<>(resultRepository.save(_result), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  
  
  
  @DeleteMapping("/results/{id}")
  public ResponseEntity<HttpStatus> deleteResult(@PathVariable("id") String id) {
    try {
      resultRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
  @DeleteMapping("/results")
  public ResponseEntity<HttpStatus> deleteAllResults() {
    try {
      resultRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
  @GetMapping("/results/finalized")
  public ResponseEntity<List<Result>> findByFinalized() {
    try {
      List<Result> results = resultRepository.findByFinalized(true);

      if (results.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(results, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}