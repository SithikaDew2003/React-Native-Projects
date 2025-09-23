import React, { createContext, useContext, useState } from "react";

export interface UserRegistrationData{
    firstName: string;
    lastName: string;
    contactN0: string;
    countryCode: string;
    profileImage: string|null;
}

interface UserRegistrationContextType{
    userData:UserRegistrationData,
    setUserData:React.Dispatch<React.SetStateAction<UserRegistrationData>>;
}

const UserRegistrationContext = createContext<UserRegistrationContextType | undefined>(undefined);

export const UserRegistrationProvider : React.FC<{children:React.ReactNode}> = ({children})=>{
    const[userData,setUserData]=useState<UserRegistrationData>({
        firstName:"",
        lastName: "",
        contactN0: "",
        countryCode: "",
        profileImage: null
    
    });

    return(
        <UserRegistrationContext.Provider value={{userData,setUserData}}>
            {children}
        </UserRegistrationContext.Provider>
    );
};



export const useUseRegistration = ():UserRegistrationContextType=>{
    const ctx =useContext(UserRegistrationContext);

    if (!ctx) {
        throw new Error("useUseRegistration must be used within a UserRegistrationProvider");
    }

    return ctx;
}