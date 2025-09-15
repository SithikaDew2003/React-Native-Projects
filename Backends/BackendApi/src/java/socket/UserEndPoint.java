/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package socket;

import com.google.gson.Gson;
import java.io.IOException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import model.User;

/**
 *
 * @author sithi
 */
@ServerEndpoint("/user")
public class UserEndPoint {
    @OnOpen
    public void onOpen(Session session){
        System.out.println("WebSocket Connected");
    }
    
    @OnMessage
    public void onMessage(String message , Session session)throws IOException{
//        System.out.println(message);
        Gson gson = new Gson();
        if (message.equals("getUserData")) {
            User user = new User(1, "Saman", "saman@gmail.com");
            String toJson = gson.toJson(user);
            session.getAsyncRemote().sendText(toJson);
            
        }
    }
    
    @OnClose
    public void onClose(Session session){
        System.out.println("Closed"+session.getId());
    }
    
    @OnError
    public void onError(Session session , Throwable throwable){
        System.out.println("Error on "+session.getId()+" >Error: "+throwable.getMessage());
    }
}
