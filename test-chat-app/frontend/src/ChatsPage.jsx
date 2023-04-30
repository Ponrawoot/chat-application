import {MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic('025449c7-e41d-4f36-a330-00b69652ac56',props.user.username, props.user.secret);
    return (
    <div style = {{ height: '100vh'}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps} style={{height: '100%'}} />
    </div>   
    )  
}

export default ChatsPage