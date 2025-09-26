/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

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
@Table(name = "chat")
public class Chat extends BaseEntity{
    
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name="from_user")
    private Users from;
    
    @Column(name="message",nullable =false)
    private String message;
    
    @ManyToOne
    @JoinColumn(name="to_user")
    private Users to;
    
    @Column(name = "files",nullable = false)
    private String files;
    
    @Enumerated(EnumType.STRING)
    @Column(name="status",length = 45)
    private Status status =Status.SENT;

    public Chat() {
    }

    public Chat(Users from, String message, Users to, String files,Status status) {
        this.from = from;
        this.message = message;
        this.to = to;
        this.files = files;
        this.status = status;
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
     * @return the from
     */
    public Users getFrom() {
        return from;
    }

    /**
     * @param from the from to set
     */
    public void setFrom(Users from) {
        this.from = from;
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return the to
     */
    public Users getTo() {
        return to;
    }

    /**
     * @param to the to to set
     */
    public void setTo(Users to) {
        this.to = to;
    }

    /**
     * @return the files
     */
    public String getFiles() {
        return files;
    }

    /**
     * @param files the files to set
     */
    public void setFiles(String files) {
        this.files = files;
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
    
    
    
    
}
