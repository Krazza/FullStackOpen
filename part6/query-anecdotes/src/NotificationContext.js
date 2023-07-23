import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "UPVOTE":
        break;
        case "UPDATE":
            state = action.payload;
            return state
        case "CLEAR":
            state = "";
            return state;
        default:
            break;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "your notification will be here");

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}
  
  export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}