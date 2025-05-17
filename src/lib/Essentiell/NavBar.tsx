import { useCherch } from "@/ChercheContext";
import { Sheets } from "@/comps/Sheets";
import Swhits from "@/comps/Swhits";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar(){
  const {value, handelChange}=useCherch()
  return (
    <div className="flex gap-x-60">
      <div>
        <label className="input input-bordered bg-accent flex items-center gap-2 h-9 border-1 border-gray-400">
          <input type="text" className="grow" placeholder="Search" value={value} onChange={(e)=>handelChange(e)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
      </div>
      <div className="flex gap-x-10 ml-[400px]">
        <div className="-z-10">
          <Sheets/>
        </div>
        
        <Link to={"/Help"} className="-z-10">
          <HelpCircle size={26} className="pt-1" />
        </Link>
        <Swhits />
       
      </div>
    </div>
  );
}


