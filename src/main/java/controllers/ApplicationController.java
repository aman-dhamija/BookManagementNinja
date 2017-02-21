/**
 * Copyright (C) 2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package controllers;

import ninja.Result;
import ninja.Results;
import ninja.params.PathParam;

import java.util.List;

import javax.persistence.EntityManager;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;

import controllers.ApplicationController.SimplePojo;
import entity.Admin;
import entity.Book;


@Singleton
public class ApplicationController {
	@Inject
	Provider<EntityManager> entitiyManagerProvider;
    public Result index() {

        return Results.html();

    }
    
    public Result helloWorldJson() {
        
        SimplePojo simplePojo = new SimplePojo();
        simplePojo.content = "Hello World! Hello Json!";

        return Results.json().render(simplePojo);

    }
    
    public static class SimplePojo {

        public String content;
        
    }
    
    public Result adminLogin(Admin admin) {
//      public Result performLogin(@PathParam("id") String id,@PathParam("pass") String pass){
  		String adminName = admin.getName();
  		String adminPwd = admin.getPassword();
  		SimplePojo s=new SimplePojo();
  		if (adminCheck(adminName,adminPwd)) {
  			s.content="Logged In!!";
  			//return Result.json().render(s);
  		}
  		s.content="Error";
  		return Results.json().render(s);
      }
    
    private boolean adminCheck(String aName, String aPass) {
		EntityManager entityManager = entitiyManagerProvider.get();
		List<?>admin = entityManager.createQuery("from Admin where name = ?1 and password = ?2").setParameter(1, aName).setParameter(2, aPass).getResultList();
		return (admin.size() > 0) ? true : false;
	}
    @Transactional
    public Result showAllBooks(){
		EntityManager entityManager = entitiyManagerProvider.get();
		List<Book> x = entityManager.createQuery("from Book").getResultList();
		return Results.json().render(x);

	}
   @Transactional
   public Result addBook(Book b){
	   EntityManager entityManager = entitiyManagerProvider.get();
	   List<Book> x = entityManager.createQuery("from Book B where B.id='"+b.getId()+"'").getResultList();
	   if ( !x.isEmpty())
			return Results.badRequest();
		entityManager.persist(b);
		return Results.json().render(b);
   }
   
   @Transactional
   public Result removeBook(Book b){
	   EntityManager entityManager = entitiyManagerProvider.get();
	   Book bo= entityManager.find(Book.class, b.getId());
	   entityManager.remove(bo);
	   return Results.json().render("success");

   }
   @Transactional
   public Result updateBook(Book b){
	   EntityManager entityManager = entitiyManagerProvider.get();
	   System.out.println(b.getAuthor());
	   System.out.println(b.getId());
	   Book bo= entityManager.find(Book.class, b.getId());
	   bo.setName(b.getName());
	   bo.setAuthor(b.getAuthor());
	   bo.setPrice(b.getPrice());
	   
	   return Results.json().render("success");

   }

    
    public Result main(){
		
		return Results.html();
	}
}
