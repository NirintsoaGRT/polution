import { TrendingUp } from "lucide-react"
import { BarChart, XAxis, YAxis } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}
// interface Mesure {
//   nom_mesure: string;
// }
// interface Pays {
//   pays: string;
// }
// interface Annee {
//   annee: string;
// }
// interface DataType{
//   numJour: number;
//   jour: string;
//   mesureMoyenne: string;
//   mesureMax: string;
//   mesureMin: string;
// }



export function BarHorizontal() {

    // const qi = ["WQI","AQI","SQI"]
    // const [chartData, setData] = React.useState<DataType[]>([])
    // const [mesure,setMesure] = React.useState()
    // const [pays,setPays] = React.useState("India")
    // const [annee,setAnnee] = React.useState("2015")
    // const [allMesure,setAllMesure] = React.useState<Mesure[]>([])
    // const [allPays,setAllPays] = React.useState<Pays[]>([])
    // const [allAnnee,setAllAnnee] = React.useState<Annee[]>([])
  
    // const fetchAllAnnee = async () => {
    //   const data = await getData("http://localhost:2000/getIntervalle.php?typePollution="+props.typePol)
    //   setAllAnnee(data)
    // }
  
    // const fetchAllMesure = async () => {
    //   const data = await getData("http://localhost:2000/getMesure.php?typePollution="+props.typePol)
    //   setAllMesure(data)
    // }
  
    // const fetchAllPays = async () => {
    //     const data = await getData("http://localhost:2000/getPays.php?typePollution="+props.typePol)
    //     setAllPays(data)
      
    // }
  
    // const fetchData = async () => {
    //     const cond = ( mesure == "AQI" || mesure == "WQI" || mesure == "SQI" );
    //     const valMesure = (cond)?"qi":mesure;
    //     const data = await getData("http://localhost:2000/pollutionParSemaineJ.php?typePollution="+props.typePol+"&mesure="+valMesure+"&pays="+pays+"&annee="+annee);
    //     console.log(data)
    //     setData(data)
    // }
    // React.useEffect(() => {
    //   fetchAllMesure()
    //   fetchAllPays()
    //   fetchAllAnnee()
    // },[])
  
    // React.useEffect(() => {
    //   fetchData()
    // },[pays,mesure,annee])
  
    // if(!chartData) return;
  
  return (
    <Card>
       <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
               <div className="grid flex-1 gap-1 text-center sm:text-left">
                 <CardTitle>Histogramme</CardTitle>
                 <CardDescription>
                 {/* Histogramme du taux de {mesure} a {pays} par jour */}
                 </CardDescription>
               </div>
       
               <Select >
                 <SelectTrigger
                   className="w-[160px] rounded-lg sm:ml-auto"
                   aria-label="Select a value"
                 >
                   <SelectValue placeholder="Annee" />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                  
                 </SelectContent>
               </Select>
       
               <Select >
                 <SelectTrigger
                   className="w-[160px] rounded-lg sm:ml-auto"
                   aria-label="Select a value"
                 >
                   <SelectValue placeholder="Pays" />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                   
                 </SelectContent>
               </Select>
               
               <Select >
                 <SelectTrigger
                   className="w-[160px] rounded-lg sm:ml-auto"
                   aria-label="Select a value"
                 >
                   <SelectValue placeholder="Mesure" />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                   
                 </SelectContent>
               </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} >
          <BarChart
            accessibilityLayer
            
            layout="vertical"
            margin={{
              left: -20,
            }}
            className="p-0"
            >
            <XAxis type="number" dataKey={"Max"} hide/>
            <YAxis
              dataKey="jour"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* <Bar dataKey={mesure+"Max"} fill="var(--color-max)" radius={5} barSize={40} />
            <Bar dataKey={mesure+"Moyenne"} fill="var(--color-moyenne)" radius={5} barSize={40} />
            <Bar dataKey={mesure+"Min"} fill="var(--color-min)" radius={5} barSize={40} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
