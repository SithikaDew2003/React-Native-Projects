/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author sithi
 */
@Entity
@Table(name = "friend_list")
public class FriendList implements Serializable{
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users userId;
    @ManyToOne
    @JoinColumn(name = "friend_id")
    private Users friendId;
    @Enumerated(EnumType.STRING)
    @Column(name = "user_status",length = 45)
    private Status status =Status.ACTIVE;
    @Column(name = "display_name",length = 100,nullable = true)
    private String displayName;

    public FriendList() {
    }

    public FriendList(Users userId, Users friendId) {
        this.userId = userId;
        this.friendId = friendId;
    }

    public FriendList(Users userId, Users friendId,String displayName) {
        this.userId = userId;
        this.friendId = friendId;
        this.displayName=displayName;
    }
    
    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the userId
     */
    public Users getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(Users userId) {
        this.userId = userId;
    }

    /**
     * @return the friendId
     */
    public Users getFriendId() {
        return friendId;
    }

    /**
     * @param friendId the friendId to set
     */
    public void setFriendId(Users friendId) {
        this.friendId = friendId;
    }

    /**
     * @return the status
     */
    public Status getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(Status status) {
        this.status = status;
    }

    /**
     * @return the displayName
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * @param displayName the displayName to set
     */
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    
    
}
