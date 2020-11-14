import React, { useCallback, useEffect, useRef, useState } from 'react'
import API_PATHS from '../../constansts/apiPath'

const SocketContext = React.createContext(null)

export const useSocket = () => React.useContext(SocketContext)
export const useSocketSubscribsion = (action, cb, deps = []) => {
  const subscribe = React.useContext(SocketContext).subscribe
  useEffect(()=> subscribe(action, cb), [...deps])
}

export const WsListenerProvider = ({ children }) => {
  const subscriptions = useRef(new Map()).current
  const [connected, setConnected] = useState(false)

  const subscribe = useCallback(function sub(action, cb){
    if(Array.isArray(action)){
      const unsub = action.map(act=>sub(act, cb))
      return ()=>unsub.forEach(us=>us())
    }else{
      if(!subscriptions.has(action)) subscriptions.set(action, new Set())
      const actionSubscriptions = subscriptions.get(action).add(cb)
      actionSubscriptions
      return ()=>{
        subscriptions.get(action).delete(cb)
        if(!actionSubscriptions.size) subscriptions.delete(action) 
      }
    }
   
  }, [])

  useEffect(()=>{
    const notifySb = ({ data }) => {
      const { action, data: msgData } = JSON.parse(data)
      const actionSubscriptions = subscriptions.get(action)
      if(actionSubscriptions){
        actionSubscriptions.forEach((cb)=>cb(msgData, action))
      }
    }
    function ConnectToSocket(){
      const websocket = new WebSocket(API_PATHS.SOCKET_END_POINT)
      websocket.onopen = ()=>setConnected(true)
      websocket.onclose = ConnectToSocket
      websocket.onmessage = notifySb
      websocket.onerror = ()=>setConnected(false)
    } 
    ConnectToSocket()
  },[])

  return (
    <SocketContext.Provider value={{ connected, subscribe }}>
      {children}
    </SocketContext.Provider>)
}
