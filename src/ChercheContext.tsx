import { createContext, ReactNode, useContext, useState } from "react";

interface ChercheProps{
    value:string,
    handelChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    slct:string,
    handelSel:(e:string)=>void
}

export const ChercheContex = createContext<ChercheProps | undefined>(undefined)
// eslint-disable-next-line react-refresh/only-export-components
export const useCherch = (): ChercheProps => {
    const context = useContext(ChercheContex);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };
interface ChercheProviderProps{
    children:ReactNode
}


export const CherchProvider: React.FC<ChercheProviderProps>  = ({children})=>{
    const [value ,setvalue] =useState("")
    const [slct,setslct]=useState("")
    const handelSel =(e:string)=>{
        setslct(e)
    }
    const handelChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value
        setvalue(val)
    }   
    return(
        <ChercheContex.Provider value={{ value , handelChange ,slct,handelSel}}>
            {children}

        </ChercheContex.Provider>
    )

}