let users=[]


const addUser=(id,username,room)=>{
const user={id,username,room}
users.push(user)
return user;
}


const getCurrentUser=(id)=>{
return users.find(user=>user.id==id)
}

const disconnectUser=(id)=>{
    const index= users.findIndex((user)=>user.id==id)
    if(index!=-1){
    return users.splice(index,1)[0]
    }
    }

const getroomuser=(room)=>{

    const roomusers=users.filter((user)=>{
        if(room==user.room){
            return true
        }
    })
    console.log(roomusers)
    return roomusers
}
module.exports={addUser,getCurrentUser,disconnectUser,getroomuser}