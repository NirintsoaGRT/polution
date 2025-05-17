import {   Globe, Droplet,Wind, Sprout } from 'lucide-react';
import { Elements } from './type/Elements';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/ThemeContext';
import Loder from '@/comps/Loder';


const elements:Elements[]=[
    {name:"Globale polution ",lien:"/",icons:Globe,key:1},
    {name:"Polution Eau",lien:"/Eau",icons:Droplet,key:2},
    {name:"Polution Air",lien:"/Air",icons:Wind,key:3},
    {name:"Polution Terre",lien:"/Terre",icons:Sprout,key:4},
  
    
]
export default function Sidebar(){
    const{darkMode}=useTheme()
    return(
        
        <section className={` flex  flex-col gap-5 h-screen overflow-hidden fixed pt-3  w-48 shadow-5xl ${darkMode ? "bg-white":"bg-gray-950"}`}>
            <div className='flex gap-6 mt-4 pl-4'>
                {/* <Link to={"/Profile"}>
                     <div className="avatar w-7 cursor-pointer">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <img src="/image/pop.jpg" className='w-10 h-10' />
                        </div>
                    </div>
                    </Link>  
                                  */}
                                  <Loder/>
               <Label className='font-bold text-lg'>Tri-Polu</Label>
            </div> 
            <div className={`mt-3 w-5/6 h-[1px] mx-auto ${darkMode ? "bg-black" :"bg-white"}`}></div>
            <div className=" flex flex-col gap-y-6 mt-5">
            
                {elements.map((element)=>{
                    return(
                        
                        
                            <Link to={element.lien} key={element.key} className={`flex  group  items-center ${ darkMode ? "hover:bg-zinc-200 hover:font-bold rounded-xl " :"hover:bg-gray-700 hover:font-bold rounded-xl"}`} > 
                                <div className=' flex items-center text-sm gap-3 font-medium pl-3 pt-2 pb-2'>
                                    <element.icons size={19}/>
                                    <Label className='text-md '>{element.name}</Label>
                                </div>
                            </Link>
                        
                    )
                })}                     
                    </div>
                   </section>
               
    )
}