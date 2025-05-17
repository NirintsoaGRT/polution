import {createContext, ReactNode, useContext, useState } from "react";
interface SelectProps{
    select :string,
    handelSelect:(e:string)=>void
}
export const  SelectContext =createContext<SelectProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useSelect =():SelectProps=>{
    const context =useContext(SelectContext)
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context
}
interface SelectPropsProvider{
    children:ReactNode
}
export const SelectProvider:React.FC<SelectPropsProvider> =({children})=>{
    const [select,setSelect]=useState("")
    const handelSelect =(e:string)=>{
        setSelect(e)
    }
    return(
        <SelectContext.Provider value={{select,handelSelect}}>
            {children}
        </SelectContext.Provider>
    )
} 
