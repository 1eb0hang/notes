package com.wren.web.storage;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.HashMap;
import java.sql.ResultSet;

import com.wren.web.storage.model.Page;

public class DbOperation{
    private Connection connection;

    public DbOperation(Connection connection) {
        this.connection = connection;
    }

    public void savePage(Page page) throws SQLException {
        if (connection != null) {

            Statement statement = connection.createStatement();
            String saveQuery = String.format(
					     "INSERT INTO pages (title, content) VALUES (\"%s\",\"%s\")",
					     page.title, 
					     page.content);
            int rowsAffected = statement.executeUpdate(saveQuery);

            if (rowsAffected > 0) {
                // String selectQuery = "SELECT * FROM pages WHERE id = 0";
                // ResultSet resultSet = statement.executeQuery(selectQuery);
                System.out.println("Assuming that page save worked");
		System.out.println(String.format("Inserted: %d-%s-%s", page.id, page.title, page.content));
                // resultSet.close();
            } else {
                System.out.println("No rows affected, insertion might have failed.");
            }
            statement.close();
        } else{
            System.out.println("Connection is null!");
        }
    }

    //#######################################//#######################################

    // public void saveRecord(String table, String[] fields, String[] values) throws SQLException {
    //     if (connection != null) {

    //         Statement statement = connection.createStatement();
    //         String saveQuery = String.format(
    // 					     "INSERT INTO %s {fields} VALUES {values}",
    // 					     table,
    // 					     fields, 
    // 					     values); // replace so that it works
    //         int rowsAffected = statement.executeUpdate(saveQuery);

    //         if (rowsAffected > 0) {
    //             // String selectQuery = "SELECT * FROM pages WHERE id = 0";
    //             // ResultSet resultSet = statement.executeQuery(selectQuery);
    //             System.out.println("Insertion complete");
    //             resultSet.close();
    //         } else {
    //             System.out.println("No rows affected, insertion might have failed.");
    //         }
    //         statement.close();
    //     } else{
    //         System.out.println("Connection is null!");
    //     }
    // }

    //################################################################################
    public HashMap<Integer, String[]> retrieveRecords(String table_name) {
        ResultSet resultSet = null;
        HashMap<Integer, String[]> table = new HashMap<Integer, String[]>();

        if (connection != null) {
            try {
                Statement statement = connection.createStatement();
                String query = String.format("SELECT * FROM %s", table_name);
                resultSet = statement.executeQuery(query);

                HashMap<Integer, String[]> fields = this.getTableFields(table_name);

                while(resultSet.next()){
                    String[] record = new String[fields.size()];

                    for(int i = 1; i < fields.size(); i+=1){
                        record[i] = fields.get(i+1)[1].toUpperCase().equals("INTEGER")?
			    Integer.toString(resultSet.getInt(i+1)) : resultSet.getString(i+1);
                    }
                    table.put(resultSet.getInt(1), record); //;???????###########################
                }

                resultSet.close();
                statement.close();
            } catch (SQLException e) {
                System.out.println("Query failed.");
                e.printStackTrace();
            }
        } else {
            System.out.println("Connection is null!");
        }

        return table;
    }

    //#######################################//#######################################//#######################################

    public HashMap<Integer, String[]> getTableFields(String table){
        ResultSet result = null;
        String[] out = null;
        // PRAGMA table_info(table_name);
        if (connection != null) {

            try {
                Statement statement = connection.createStatement();
                String query = String.format("PRAGMA table_info(%s)", table);
                result = statement.executeQuery(query);

            }catch(Exception err){
                err.printStackTrace();
            }
        }

        HashMap<Integer, String[]> fields = new HashMap<Integer, String[]>();
        int field = 0;
        try{
            while(result.next()){
                fields.put(field, new String[]{result.getString(2), result.getString(3)});
                field+=1;
            }
        }catch(java.sql.SQLException err){
            System.out.println("SQLException: Trying to access column index out of table bounds\nAborting");
	    err.printStackTrace();
        }catch(Exception err){
            err.printStackTrace();
        }

        return fields;
    }

    //#######################################//#######################################//#######################################

    public String[] getRecord(String table_name, int id){
        HashMap<Integer, String[]> table = retrieveRecords(table_name);

        return table.get(id);
    }

    //#######################################//#######################################//#######################################

    public String[] getRecordWithValue(String table_name, String field, String value){
	try{
	    HashMap<Integer, String[]> table = retrieveRecords(table_name);
	    int field_idx = (int)(getKeyFromValue(getTableFields(table_name), field.toLowerCase()));

	    for(int i = 0; i < table.size(); i +=1){
		if(table.get(i)[field_idx].equals(value)){
		    return table.get(i);
		}
	    }
	    return null;
	}catch(Exception e){
	    e.printStackTrace();
	    return null;
	}
    }

    private int getKeyFromValue(HashMap<Integer, String[]> map, String obj){
	for (int i = 0; i < map.size(); i+=1) {
            if (map.get(i).equals(obj)) {
                return i;
            }
        }
        return -1;
    }
}
