export const validateFirstName = (name:string):string|null=>{
    if (!name||name.trim().length===0) {
        return "First name is required";
    }

    return null;
};

export const validateLastName = (name:string):string|null=>{
    if (!name||name.trim().length===0) {
        return "Last name is required";
    }

    return null;
};


export const validateCountryCode=(countryCode:string):string|null=>{
    const regex =/^\+[1-9]\d{0,3}$/;

    if (!countryCode) {
        return "Country code is required";
    }
    if (!regex.test(countryCode)) {
        return "Country code is not valid";
    }


    return null;
};



export const validatePhoneNo = (phoneNo:string):string|null=>{
    const regex =/^[1-9][0-9]{6,14}$/;

    if (!phoneNo) {
        return "Phone number is required";
    }

    if (!regex.test(phoneNo)) {
        return "Phone number is not valid";
    }


    return null;
};



export const validateprofileImage=(image:{
    uri:string;
    type:string;
    fileSize:number;
}|null

):string|null=>{
    if (!image) {
        return "Profile image is required";
    }

    if (image.type && !["image/jpeg","image/png","image/jpg"].includes(image.type)) {
        return "Select valid image type(png,jpg,jpeg)";
    }

    if (image.fileSize && image.fileSize>15*1024*1024) {
        return "Image size should be less than 15MB";
    }


    return null;
};