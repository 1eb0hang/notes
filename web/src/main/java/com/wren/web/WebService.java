package com.wren.web;

import io.javalin.Javalin;
import io.javalin.core.JavalinConfig;
import io.javalin.http.Context;
import io.javalin.http.staticfiles.Location;

import static io.javalin.apibuilder.ApiBuilder.*;

public class WebService{
    
    public static final int DEFAULT_PORT = 8080;

    private Javalin server;

    public static void main(String[] args){
	WebService service = new WebService();
	service.server.start(DEFAULT_PORT);
    }

    public WebService(){
	server = configureHttpServer();
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
            config.addStaticFiles("/", Location.CLASSPATH);
	    }).routes(() -> {
		    path("/", () -> get(ctx -> ctx.render("index.html")));
		    path("/stage", () -> get(ctx -> ctx.json("stage")));
		    path("/provinces", () -> get(ctx -> ctx.json("provinces")));
		    path("/towns/{province}", () -> get(ctx -> {
				String province = ctx.pathParam("province");
				ctx.json("town in province");
			    }));
		    path("/schedule/{town}", () -> get(ctx -> {
				String town = ctx.pathParam("town");
				ctx.json("town schedule");
			    }));
		});
    }
}
