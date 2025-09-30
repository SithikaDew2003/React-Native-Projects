/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package socket;

import entity.Chat;
import entity.FriendList;
import entity.Status;
import entity.Users;
import java.util.Date;
import java.util.List;
import org.hibernate.Criteria;
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
}
