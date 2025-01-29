package com.wren.web.storage.model;

public class Page{
    private int id;
    private String title;
    private String content;

    public Page(){}
    
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

    public int getId(){return id;}
    public String getTitle(){return title;}
    public String getContent(){return content;}
}

