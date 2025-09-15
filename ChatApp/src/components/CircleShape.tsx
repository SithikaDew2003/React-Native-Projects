import { View } from "react-native";


interface Circle{
    width: number;
    height: number;
    borderRadius: number;
    className?: string;
    fillColor?:string;
    top?: number;    // Optional property 
    left?: number;
    right?: number;
    bottom?: number;
}


export default function Circle(c:Circle){
    return(
        <View className={`${c.className ?? ""}`} //class name eka thiyenawanam ganna nathnm empty krnna
         style={{
            width:c.width,
            height:c.height,
            borderRadius:c.borderRadius,
            position:"absolute",

            ...(c.fillColor !== undefined && {backgroundColor:c.fillColor}),
            ...(c.top !== undefined && {top:c.top}),
            ...(c.left !== undefined && {left:c.left}),
            ...(c.right !== undefined && {right:c.right}),
            ...(c.bottom !== undefined && {bottom:c.bottom}),
            }}>
            
        </View>
    );
}