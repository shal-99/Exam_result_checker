package com.exam.result.repository;

import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.exam.result.model.Result;


public interface ResultRepository extends MongoRepository<Result, String> {
  List<Result> findByFinalized(boolean finalized);
  List<Result> findByNameContaining(String name);
  List<Result> findByIndexContaining(String index);
}

