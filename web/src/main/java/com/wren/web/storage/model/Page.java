package com.wren.web.storage.model;

public class Page{
    public int id;
    public String title;
    public String content;

    public Page(int id, String title, String content){
	this.id = id;
	this.title = title;
	this.content = content;
    }
}
