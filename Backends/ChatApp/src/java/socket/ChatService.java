package socket;

import com.google.gson.Gson;
import entity.Chat;

import entity.Users;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.websocket.Session;
import org.hibernate.Criteria;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

public class ChatService {

    private static final ConcurrentHashMap<Integer, Session> SESSIONS = new ConcurrentHashMap<>();
    private static final Gson GSON = new Gson();
    private static final String URL = "";

    public static void register(int userId, Session session) {
        ChatService.SESSIONS.put(userId, session);
    }

    public static void unregister(int userId) {
        ChatService.SESSIONS.remove(userId);
    }

    public static void SendToUser(int userId, Object payload) {
        Session ws = ChatService.SESSIONS.get(userId);
        if (ws != null && ws.isOpen()) {
            try {
                ws.getBasicRemote().sendText(ChatService.GSON.toJson(payload));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static List<ChatSummary> getFriendChatsForUser(int userId) {
        try {
            org.hibernate.Session session = HibernateUtil.getSessionFactory().openSession();
            Criteria c1 = session.createCriteria(Chat.class);
            Criterion rest1 = Restrictions.or(Restrictions.eq("from_user.id", userId), Restrictions.eq("to_user.id", userId));
            c1.add(rest1);
            c1.addOrder(Order.desc("updated_at"));
            List<Chat> chats = c1.list();

            Map<Integer, ChatSummary> map = new LinkedHashMap<>();

            for (Chat chat : chats) {
                Users friend = chat.getFrom().getId() == (userId) ? chat.getTo() : chat.getFrom();

                if (!map.containsKey(friend.getId())) {
//                    Criteria c2 = session.createCriteria(User.class);
//                    c2.add(Restrictions.eq("contactNo", friendContact));
//                    User friend = (User) c2.uniqueResult();
                    String profileImage = ChatService.URL + "/ChatApp/profile-images/" + friend.getId() + "/profile1.png";
                    int unread = 2;
                    map.put(friend.getId(), new ChatSummary(
                            friend.getId(),
                            friend.getFirstName() + " " + friend.getLastName(),
                            chat.getMessage(),
                            chat.getUpdatedAt(),
                            unread,
                            profileImage));
                }
            }
            return new ArrayList<>(map.values());
        } catch (Exception e) {
            throw new RuntimeException("Data Fetch Failed.");
        }
    }

    public static void deliverChat(Chat chat) {
        org.hibernate.Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tr = session.beginTransaction();
        session.persist(chat);
        tr.commit();
        Map<String, Object> envelope = new HashMap<>();
        envelope.put("type", "chat");
        envelope.put("payload", chat);

        ChatService.SendToUser(chat.getTo().getId(), envelope);
        ChatService.SendToUser(chat.getFrom().getId(), envelope);

        ChatService.SendToUser(chat.getTo().getId(),
                friendListEnvelope(getFriendChatsForUser(chat.getTo().getId())));
        ChatService.SendToUser(chat.getFrom().getId(),
                friendListEnvelope(getFriendChatsForUser(chat.getFrom().getId())));

    }

    public static Map<String, Object> friendListEnvelope(List<ChatSummary> list) {
        Map<String, Object> envelope = new HashMap<>();
        envelope.put("type", "friend_list");
        envelope.put("payload", list);
        return envelope;
    }
}