package com.wren.web;

import io.javalin.Javalin;
import io.javalin.core.JavalinConfig;
import io.javalin.http.Context;
import io.javalin.http.staticfiles.Location;

import com.wren.web.storage.DbOperation;
import com.wren.web.storage.DbConnector;
import com.wren.web.storage.model.Page;
import com.wren.web.common.Json;

import static io.javalin.apibuilder.ApiBuilder.*;

public class WebService{
    
    public static final int DEFAULT_PORT = 8080;

    private Javalin server;
    private DbOperation dbOps;

    public static void main(String[] args){
	WebService service = new WebService();
	service.server.start(DEFAULT_PORT);
    }

    public WebService(){
	server = configureHttpServer();
	dbOps = new DbOperation(DbConnector.connect("jdbc:sqlite:/home/lebo/Dev/PROJECTS/notes/resources/demo.db"));
	//savePage();
    }

    // public WebService(HttpClient client, Javalin server){
    //     this.httpClient = client;
    //     this.server = server;
    // }

    public WebService(Javalin server){
        this.server = server;
    }

    public void start(int port) {
        server.start(port);
    }

    private Javalin configureHttpServer() {
	
        return Javalin.create(config -> {
		config.addStaticFiles("/home/lebo/Dev/PROJECTS/notes/web/src/main/resources", Location.EXTERNAL);
	    })
	    .get("/", ctx -> ctx.render("index.html"))
	    // .get("/get", ctx ->{
	    // 	    String[] page = dbOps.getRecordWithValue("pages", "title", "Example");
	    // 	    ctx.json(Json.toJson(new Page(Integer.parseInt(page[0]), page[1], page[2])));
	    // 	    ctx.status(200);
	    // 	})
	    .get("page/{page}", ctx->{
		    String param = ctx.pathParam("page");
		    String page[] = isNum(param)?
			dbOps.getRecord("pages",Integer.parseInt(param)):
			dbOps.getRecordWithValue("pages", "title", param);
		    ctx.json(Json.toJson(new Page(page)));
		    ctx.status(200);
		})
	    .post("/post", ctx ->{
		    System.out.println(String.format("Recieved post: %s", ctx.body()));
		    Page page = ctx.bodyAsClass(Page.class);
		    System.out.println(Page.isValidId(page));
		    if(!Page.isValidId(page)){ // invalid id is on already in db
			dbOps.updatePage(page);
		    }else{
			dbOps.savePage(page);
		    }
		    ctx.status(200);
		});
	
	    // routes(() -> {
	    // 	    path("/", () -> get(ctx -> ctx.render("index.html")));
	    // 	});
    }

    public boolean savePage(){
	boolean saved = false;
	try{
	    dbOps.savePage(new Page(0, "Example", "# Title\nThis is example text\nBad reciepts"));
	    saved = true;
	}catch(Exception err){
	    err.printStackTrace();
	}
	return saved;
    }

    private boolean isNum(String value){
	char[] arr = value.toCharArray();
	for(int i = 0; i<arr.length; i+=1){
	    if((int)arr[i] > 57 || (int)arr[i] <48){
		return false;
	    }
	}
	return true;
    }
}
