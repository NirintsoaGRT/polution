// import { Tabsw } from "@/comps/Tabsw";

import { BarHorizontal } from "@/comps/BarHorizontal";
import { CourbeParJour } from "@/comps/CourbeParJour";
import { CourbeParMois } from "@/comps/CourbeParMois";
import { RadarGlobal } from "@/comps/RadarGlobal";
import { Tarte } from "@/comps/Tarte";
import { TarteTotal } from "@/comps/TarteTotal";
import { Top } from "@/comps/Top";

export default function Terre(){
    return (
        <section className="flex ">
            
                  <div className="flex pl-3 gap-y-5  flex-col  w-full">
                            {/* <Globe/> */}
                            <div className="">
                                <BarHorizontal/>
                            </div>
                              <div className="flex  space-x-20 ">
                                <Tarte/>
                                <RadarGlobal/>
                                <TarteTotal/>
                              </div>
                              <div className="flex flex-col gap-y-4">
                                <CourbeParJour/>
                                <Top/>
                                <CourbeParMois/>
                                
                              </div>
                              
                              
                          </div>  
                       
       </section>
    )
}