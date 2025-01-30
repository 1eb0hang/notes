package com.wren.web.storage.model;

import java.util.HashMap;

import com.wren.web.storage.DbOperation;
import com.wren.web.storage.DbConnector;

class PageRepo{
    //private static HashMap<Integer, Page> collection;
    private static DbOperation dbOps = new DbOperation(DbConnector.connect());

    public static boolean isValidPage(Page page){
	if(dbOps.getRecord("pages", page.getId()) != null){
	    System.out.println("[ERROR: ADD PAGE] page already in db");
	    return false;
	}
	//collction.put(page.getId(), page);
	System.out.println("[INFO: ADD PAGE] page added to db");
	return true;
    }

    public static int getNextId(){
	HashMap<Integer, String[]> db = dbOps.retrieveRecords("pages");
	return db.size(); // assumes all values from 0 - db.size()-1 are filled
    }

}

public class Page{
    private int id;
    private String title;
    private String content;

    public Page(){}
    
    public Page(String title, String content){
	this.id = PageRepo.getNextId();
	this.title = title;
	this.content = content;
    }

    public Page(int id, String title, String content){
	this.id = id;
	this.title = title;
	this.content = content;
    }

    public Page(Page page){
	this.id = page.getId();
	this.title = page.getTitle();
	this.content = page.getContent();
    }

    public Page(String page[]){
	this.id = Integer.parseInt(page[0]);
	this.title = page[1];
	this.content = page[2];
    }

    public int getId(){return id;}
    public String getTitle(){return title;}
    public String getContent(){return content;}
    
    public static Page getNewPage(){
	int newId = PageRepo.getNextId();
	return new Page(newId, 
			String.format("New Page %d", newId), 
			"");
    }

    public static Page getNewPage(String title){
	int newId = PageRepo.getNextId();
	return new Page(newId,title,"");
    }

    public static Page getNewPage(String title, String content){
	int newId = PageRepo.getNextId();
	return new Page(newId,title,content);
    }
}

