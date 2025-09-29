import { fromJSON } from "postcss"

export interface User{
    id:number,
    firstName:string,
    lastName:string,
 
    countryCode:string,
    contactNo:string
    profileImage?:string,
};

export interface Chat{
    friendId:number,
    friendName:string,
    lastMessage:string,
    lastTimeStamp:string,
    unreadCount:number,
    profileImage:string,
    from:User,

    to:User,
    createdAt:string,
    updatedAt:string,
    status:"SENT"|"DELIVERED"|"READ"
};

export interface WSRequest{
    type:string,
    fromUserId?:number,
    toUserId?:number,
    message?:string
};

export interface WSResponse{
    type:string,
    payload:any
}