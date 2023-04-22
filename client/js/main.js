const chatform= document.getElementById('chat-form')
const chat=document.querySelector('.chat-messages')

const socket= io()

const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

socket.emit('chatJoinRoom',{username,room})

socket.on('message',message=>{
    outputmessage(message)

    chat.scrollTop=chat.scrollHeight;
})

chatform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg= e.target.elements.msg.value
    socket.emit('chatMessage',msg)


    e.target.elements.msg.value=''
    e.target.elements.msg.focus
})

const outputmessage= (message)=>{
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`<p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">
    ${message.message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}