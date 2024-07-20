
import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = ()=>{
    connect("mongodb+srv://y32551849:QP08lNAxepksb0oy@cluster0.feburia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions).then(
        ()=>{
            console.log("Connected Successfully");            
        },
        (error)=>{
            console.log(error);            
        }
    );
}

//laptop url ==> mongodb+srv://ky815131:EwRSNRKzKFyqA62e@cluster0.mpjipo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//desktop url ==> mongodb+srv://y32551849:QP08lNAxepksb0oy@cluster0.feburia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0