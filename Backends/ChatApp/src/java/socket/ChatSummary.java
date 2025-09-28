package socket;

import java.util.Date;

public class ChatSummary {

    public ChatSummary(int friendContact, String friendname, String lastMessage, Date lastSeenTime, int unreadCount, String profileImage) {
        this.friendContact = friendContact;
        this.friendname = friendname;
        this.lastMessage = lastMessage;
        this.lastSeenTime = lastSeenTime;
        this.unreadCount = unreadCount;
        this.profileImage = profileImage;
    }

    public ChatSummary() {
    }
    
    private int friendContact;
    private String friendname;
    private String lastMessage;
    private Date lastSeenTime;
    private int unreadCount;
    private String profileImage;

    public int getFriendContact() {
        return friendContact;
    }

    public void setFriendContact(int friendContact) {
        this.friendContact = friendContact;
    }

    public String getFriendname() {
        return friendname;
    }

    public void setFriendname(String friendname) {
        this.friendname = friendname;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public Date getLastSeenTime() {
        return lastSeenTime;
    }

    public void setLastSeenTime(Date lastSeenTime) {
        this.lastSeenTime = lastSeenTime;
    }

    public int getUnreadCount() {
        return unreadCount;
    }

    public void setUnreadCount(int unreadCount) {
        this.unreadCount = unreadCount;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
    
}