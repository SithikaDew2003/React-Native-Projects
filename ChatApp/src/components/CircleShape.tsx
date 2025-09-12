import { View } from "react-native";


interface Circle{
    width: number;
    height: number;
    fillColor:string;
    borderRadius: number;
    top?: number;    // Optional property 
    left?: number;
    right?: number;
    bottom?: number;
}


export default function Circle({width,height,fillColor,borderRadius,top,left,right,bottom}:Circle){
    return(
        <View style={{
            width:width,
            height:height,
            backgroundColor:fillColor,
            borderRadius:borderRadius,
            position:"absolute",

            ...(top !== undefined && {top:top}),
            ...(left !== undefined && {left:left}),
            ...(right !== undefined && {right:right}),
            ...(bottom !== undefined && {bottom:bottom}),
            }}>
            
        </View>
    );
}