/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package socket;

import com.google.gson.JsonObject;
import dto.UserDTO;
import entity.Chat;
import entity.FriendList;
import entity.Status;
import entity.Users;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

/**
 *
 * @author sithi
 */
public class UserService {

    public static void updateLogInStatus(int userId) {
        updateStatus(userId, Status.ONLINE);
    }

    public static void updateLogOutStatus(int userId) {
        updateStatus(userId, Status.OFFLINE);
    }

    private static void updateStatus(int userId, Status status) {
        Session s = HibernateUtil.getSessionFactory().openSession();
        Users fromUser = (Users) s.get(Users.class, userId);
        fromUser.setStatus(status);
        fromUser.setUpdatedAt(new Date());

        s.update(fromUser);
        s.beginTransaction().commit();
    }

    public static void updateFriendChatStatus(int userId) {
        Session s = HibernateUtil.getSessionFactory().openSession();
        Criteria c1 = s.createCriteria(FriendList.class);

        c1.add(Restrictions.eq("userId.id", userId));
        c1.add(Restrictions.eq("status", Status.ACTIVE));

        List<FriendList> myFriends = c1.list();

        Transaction tr = s.beginTransaction();
        for (FriendList myFriend : myFriends) {
            Users me = myFriend.getUserId();
            Users friend = myFriend.getFriendId();

            if (me.getStatus().equals(Status.ONLINE)) {
                Criteria c2 = s.createCriteria(Chat.class);
                Criterion rest1 = Restrictions.and(Restrictions.eq("from", friend),
                        Restrictions.eq("to", me));

                Criterion rest2 = Restrictions.eq("status", Status.SENT);
                c2.add(rest1);
                c2.add(rest2);

                List<Chat> chats = c2.list();
                for (Chat chat : chats) {
                    chat.setStatus(Status.DELIVERED);
                    chat.setUpdatedAt(new Date());

                    s.update(chat);

                }

            }
        }

        tr.commit();
        s.close();

    }

    public static Map<String, Object> getFriendData(int friendId) {//single chat header
        Session s = HibernateUtil.getSessionFactory().openSession();
        Users friend = (Users) s.get(Users.class, friendId);
        s.close();

        Map<String, Object> envelope = new HashMap<>();
        envelope.put("type", "friend_data");
        envelope.put("payload", friend);

        return envelope;

    }

    public static Map<String, Object> getAllUsers(int userId) {

        try {

            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c1 = s.createCriteria(Users.class);
            c1.add(Restrictions.ne("id", userId));
            List<Users> users = c1.list();
            Map<String, Object> map = new HashMap();

            List<UserDTO> userDTOs = new ArrayList<>();

            for (Users user : users) {//offline/onlne
                Criteria c2 = s.createCriteria(FriendList.class);
                c2.add(Restrictions.and(Restrictions.eq("friendId.id", user.getId()),
                        Restrictions.eq("userId.id", userId),
                        Restrictions.ne("status", Status.BLOCKED)));

                FriendList u1 = (FriendList) c2.uniqueResult();//Active
                if (u1 != null) {
                    user.setStatus(Status.ACTIVE);//if this user already in my friend list change status to active
                }

                
                
                UserDTO dto = new UserDTO();
                dto.setId(user.getId());
                dto.setFirstName(user.getFirstName());
                dto.setLastName(user.getLastName());
                dto.setCountryCode(user.getCountryCode());
                dto.setContactNo(user.getContactNo());
                dto.setProfileImage(ProfileService.getProfileURL(user.getId()));
                dto.setCreatedAt(user.getCreatedAt());
                dto.setUpdatedAt(user.getUpdatedAt());
                dto.setStatus(user.getStatus());
                
                userDTOs.add(dto);

                

            }
            s.close();
            map.put("type", "all_users");
            map.put("payload", userDTOs);

            return map;

        } catch (HibernateException e) {
            throw new RuntimeException(e);
        }
        
    }
    
    
    public static Map<String,Object> saveNewContact(int myId,Users user){
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("responseStatus", Boolean.FALSE);
        
        
        Criteria c1 = s.createCriteria(Users.class);
        c1.add(Restrictions.and(Restrictions.eq("countryCode",user.getCountryCode()),
                Restrictions.eq("contactNo", user.getContactNo())));
        
        
        Users u1 = (Users)c1.uniqueResult();
        
        if (u1==null) {
            responseObject.addProperty("responseStatus", "This User not in chatapp");
        }else{
            Users me = (Users)s.get(Users.class,myId);
            FriendList fl = new FriendList(me, u1,user.getFirstName()+" "+user.getLastName());
            s.save(fl);
            
            responseObject.addProperty("status", Boolean.TRUE);
            
            responseObject.addProperty("responseStatus", "This user added to friendList");
        }
        
        
        s.beginTransaction().commit();
        s.close();
        
        Map<String,Object> map = new HashMap<>();
        map.put("type", "new_contact_response_text");
        map.put("payload", responseObject);
        
        
        return map;
    }
}
