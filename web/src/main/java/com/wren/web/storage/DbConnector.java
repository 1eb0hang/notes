package com.wren.web.storage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnector{
    // this is for the future, but for now, and for the for seeable future
    // the db will be an sqlite file
    // private String url; 

    // public DbConnector(String url){
    // 	this.url = url;
    // }

    /**
     * connects to the SQLite database.
     *
     * @return A Connection object if the connection is successful, null otherwise.
     */
    public static Connection connect(String url) {
        Connection connection = null;

        // Path dbPath = Paths.get(DATABASE_DIRECTORY, DATABASE_FILE);
        // File dbFile = dbPath.toFile();


        // if (!dbFile.exists()) {
        //     System.out.println("Database file does not exist at " + dbPath.toAbsolutePath());
        //     return null;
        // }

        // String databaseUrl = "jdbc:sqlite:" + dbPath.toAbsolutePath();

        try {
            connection = DriverManager.getConnection(url);
            System.out.println("Connection to SQLite has been established.");
        } catch (SQLException e) {
            System.out.println("Connection failed.");
            e.printStackTrace();
        } catch(Exception e){
	    System.out.println("Something went wrong while trying to astablish db connection.");
	    e.printStackTrace();
	}

        return connection;
    }

}
