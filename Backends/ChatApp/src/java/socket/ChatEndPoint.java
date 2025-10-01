/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package socket;

import com.google.gson.Gson;
import entity.Chat;
import entity.Status;
import entity.Users;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import util.HibernateUtil;

@ServerEndpoint(value = "/chat")
public class ChatEndPoint {

    private static final Gson GSON = new Gson();
    private int userId;

    @OnOpen
    public void onOpen(Session session) {
        String query = session.getQueryString();
        if (query != null && query.startsWith("userId=")) {
            userId = Integer.parseInt(query.substring("userId=".length()));
            ChatService.register(userId, session);
            UserService.updateLogInStatus(userId);
            UserService.updateFriendChatStatus(userId);
//            ChatService.sendToUser(userId,
//                    ChatService.friendListEnvelope(ChatService.getFriendChatsForUser(userId)));
        }
    }

    @OnClose
    public void onClose(Session session) {
        if (userId > 0) { // userId != null
            ChatService.unregister(userId);
            UserService.updateLogOutStatus(userId);
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        if (userId>0) {
            UserService.updateLogOutStatus(userId);
        }
        throwable.printStackTrace();
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        try {
            Map<String, Object> map = ChatEndPoint.GSON.fromJson(message, Map.class);
            String type = (String) map.get("type");
            switch (type) {
                case "send_chat":{
                    int fromId = (int) map.get("fromId");
                    int toId = (int) map.get("toId");
                    String chatText = (String) map.get("message");
                    org.hibernate.Session s = HibernateUtil.getSessionFactory().openSession();
                    Users fromUser = (Users) s.get(Users.class, fromId);
                    Users toUser = (Users) s.get(Users.class, toId);

                    if (fromUser != null && toUser != null) {
                        Chat chat = new Chat(fromUser, chatText, toUser, "", Status.SENT);
                        chat.setCreatedAt(new Date());
                        chat.setUpdatedAt(new Date());
                        ChatService.deliverChat(chat);
                    }
                    break;
                }
                case "get_chat_list": {

                    ChatService.sendToUser(userId,
                            ChatService.friendListEnvelope(ChatService.getFriendChatsForUser(userId)));

                    break;
                }
                case "get_single_chat": {
                    int friendId = (int) ((double) map.get("friendId"));
                    List<Chat> chats = ChatService.getChatHistory(userId, friendId);

                    Map<String, Object> envelop = ChatService.singleChatEnvelope(chats);
                    ChatService.sendToUser(userId, envelop);
                    
                    ChatService.sendToUser(userId,
                            ChatService.friendListEnvelope(ChatService.getFriendChatsForUser(userId)));

                    break;
                }
                case "send_message": {
                    int friendId = (int) ((double) map.get("toUserId"));
                    String chat = String.valueOf(map.get("message"));
                    
                    
                    ChatService.saveNewChat(userId,friendId, chat);
                    
                   
                    
                    break;
                }
                
                case "get_friend_data":{
                    int friendId = (int) ((double) map.get("friendId"));
                    Map<String,Object> envelope = UserService.getFriendData(friendId);
                    
                    ChatService.sendToUser(userId, envelope);
                    break;
                }
                default:
                    System.out.println("Ignored unknown clientside" + type);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
