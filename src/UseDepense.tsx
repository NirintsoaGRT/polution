import { useState } from "react";

export default function UseDepense(ab:number){
    const [Depense,setDepense]=useState(ab)
    const[date,setdate]=useState(0)
    return(
        {
        action:Depense,
        date:date,
        setaction :setDepense,
        setdate:setdate

    }
    )
}