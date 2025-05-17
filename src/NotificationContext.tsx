import {createContext, ReactNode, useContext, useState } from "react"
import { NotifType } from "./lib/Essentiell/type/NotifType"

interface NotifProps{
    notif:NotifType[],
    handelAddNotif:(NewNotif:NotifType)=>void,
    handelDellNotif:(id:number)=>void,
    taill:number
}
export const  NotifContext =createContext<NotifProps| undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useNotif = () :NotifProps =>{
    const context =useContext(NotifContext)
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
interface NotifProviderProps{
    children:ReactNode
}

export const NotifProvider :React.FC<NotifProviderProps>  = ({children}) =>{
    const[notif,setnotif]=useState<NotifType[]>([
        {Content:"nouvel compt crée dans votre appication",id:1,date:"22/12/2024"},
        {Content:"Nouvell produit dans notre Stock ",id:2,date:"13/01/2025"}
    ])
    const[taill,settaill]=useState(notif.length)
    const handelAddNotif = (NewNotif:NotifType)=>{
        const copyNotif =[...notif]
        copyNotif.push(NewNotif)
        const newtaill =copyNotif.length
        settaill(newtaill)
        setnotif(copyNotif)
    }
    const handelDellNotif = (id:number)=>{
        const copyNotif =[...notif]
        const NotifUpdate =copyNotif.filter((noti)=>noti.id !==id)
        const newtaill =NotifUpdate.length
        settaill(newtaill)
        setnotif(NotifUpdate)
    }
    return(
        <NotifContext.Provider value={{notif,handelAddNotif,handelDellNotif,taill}}>
            {children}
        </NotifContext.Provider>
    )


}

