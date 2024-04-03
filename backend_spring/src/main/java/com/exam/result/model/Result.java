package com.exam.result.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "results")
public class Result {
  @Id
  private String id;

  private String name;
  private String index;
  private String maths;
  private String science;
  private String english;
  private String it;
  private boolean finalized;

  public Result() {

  }

  public Result(String name, String index, String maths,String science,String english,String it,boolean finalized) {
    this.name = name;
    this.index = index;
    this.maths=maths;
    this.science=science;
    this.english=english;
    this.it=it;
    this.finalized = finalized;
  }

  public String getId() {
    return id;
  }

  
  
  
 public String getname() {
    return name;
  }

  public void setname(String name) {
    this.name = name;
  }
  
  
  
 public String getindex() {
	    return index;
	  }

 public void setindex(String index) {
	    this.index = index;
	  }
  
	  
	  
	  
 public String getmaths() {
	    return maths;
	  }

 public void setmaths(String maths) {
	    this.maths = maths;
	  }
	  
	  
	  
public String getscience() {
		    return science;
		  }

public void setscience(String science) {
		    this.science = science;
		  }
		  
		  
		  
	  
public String getenglish() {
			    return english;
			  }

public void setenglish(String english) {
			    this.english = english;
			  }		
		  
public String getit() {
			    return it;
			  }

public void setit(String it) {
			    this.it = it;
			  }
			  
  public boolean isfinalized() {
    return finalized;
  }

  public void setfinalized(boolean isfinalized) {
    this.finalized = isfinalized;
  }

  @Override
  public String toString() {
    return "Result [id=" + id + ", name=" + name + ", index=" + index + ",maths=" + maths + ",science=" + science + ",english=" + english + " ,it=" + it + ", finalized=" + finalized + "]";
  }
}
