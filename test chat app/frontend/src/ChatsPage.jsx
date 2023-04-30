import {MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic('910f2ace-b809-49e1-9df8-5e72e740e6b9',props.user.username, props.user.secret);
    return (
    <div style = {{ height: '100vh'}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps} style={{height: '100%'}} />
    </div>   
    )  
}

export default ChatsPage