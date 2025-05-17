
import { Card,CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useNotif } from "@/NotificationContext"
import { useTheme } from "@/ThemeContext"
import {  Bell, LucideDelete } from "lucide-react"

export function Sheets() {
  const{darkMode}=useTheme()
  const {taill,handelDellNotif,notif}=useNotif()
  let tek:boolean=false
  if(taill>0){
    tek=false
  }else{
    tek=true
  }
  return (
    <Sheet  >
      <SheetTrigger asChild>
        <div className="flex relative">
          <div className={`${tek ? 'w-0 overflow-hidden ': ' bg-rose-700 w-5 h-5 rounded-box  text-white flex justify-center items-center absolute left-4 bottom-6'}`}>
            <h1 className="text-sm">{taill}</h1>
          </div>
          <Bell size={26} className="cursor-pointer"/>
        </div>
        
      </SheetTrigger>
      <SheetContent className={` ${darkMode ? "text-black" : "text-white"}`}>
        <SheetHeader className={` ${darkMode ? "text-white" : "text-white"}`}>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>
            Suivez les dernier notification sur votre compts
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-3 pt-5">
          {notif.map((not)=>{
            return(
            <Card className="w-[330px] h-[100px] relative" key={not.id}>
              <button className="absolute bott left-[290px] bottom-16 w-6 h-6 flex justify-center items-center rounded-md " onClick={()=>handelDellNotif(not.id)}>
                 <LucideDelete/>
              </button>
              <CardHeader className="p-4">
                <CardTitle>
                  {not.date}
                </CardTitle>
              </CardHeader>
              <div className="text-sm pl-3">
                {not.Content}
              </div>
             
            </Card>
            )
          })}

  </div>
        

      </SheetContent>
    </Sheet>
  )
}
