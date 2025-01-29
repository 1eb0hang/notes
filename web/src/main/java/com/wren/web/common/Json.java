package com.wren.web.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.core.JsonProcessingException;

public class Json{
  private static ObjectMapper objMapper = getDefaultObjectMapper();

  private static ObjectMapper getDefaultObjectMapper(){
    ObjectMapper objMapper = new ObjectMapper();

    //configure to suppress falure when unkown property recieved
    //objMapper.configure(Deserialization.FAIL_ON_UNKNOWN_PROPERTIES, false);

    return objMapper;
  }

  public static JsonNode parse(String src) throws java.io.IOException{
    return objMapper.readTree(src);
  }

  public static <A> A fromJson(JsonNode node, Class<A> clazz) throws JsonProcessingException {
    return objMapper.treeToValue(node, clazz);
  }

  public static JsonNode toJson(Object a){
    return objMapper.valueToTree(a);
  }


  public static String asString(JsonNode node) throws JsonProcessingException{
    ObjectWriter writer = objMapper.writer();
    return writer.writeValueAsString(node);
  }
}
