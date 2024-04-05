let users= [
    {
        id: "123",
        password: "123",
    },
    {
        id: "456",
        password: "123",
    }
]

let locData={

}

const getUser= (id, password)=>{
    let result=false;
    users.forEach((user)=>{
        if(user.id===id && user.password==password){
            result= true;
        }
    });

    return result;
}

const storeInDB=(id, data)=>{
    const timeStamp=new Date();
    data["timestamp"]=timeStamp.getTime();
    locData[id]=data;

    return locData[id];
}

const getAllData = () => {
    return locData;
}

module.exports = {storeInDB, getUser, getAllData}