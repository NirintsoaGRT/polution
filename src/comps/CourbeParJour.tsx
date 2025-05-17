
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const chartConfig = {
  date_pollution: {
    label: "Date",
  },
  index_qualite: {
    label: "Index de qualite",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

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
//   date_pollution: string;
//   mesure: string;
// }
// interface TypePollution{
//   typePol:number;
// }

export function CourbeParJour() {

  // const qi = ["WQI","AQI","SQI"]
  // const [chartData, setData] = React.useState<DataType[]>([])
  // const [mesure,setMesure] = React.useState(qi[props.typePol-1])
  // console.log(mesure)
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
  //     const data = await getData("http://localhost:2000/pollution.php?typePollution="+props.typePol+"&mesure="+valMesure+"&pays="+pays+"&annee="+annee)
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
          <CardTitle>Courbe de variation</CardTitle>
          <CardDescription>
          Variation du taux de {} a {} par jour
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
            {/* {allAnnee.map((val,index) => (
                <SelectItem key={index} value={val.annee} className="rounded-lg">
                  {val.annee}
                </SelectItem>
              ))} */}
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
            {/* {allPays.map((val,index) => (
                <SelectItem key={index} value={val.pays} className="rounded-lg">
                  {val.pays}
                </SelectItem>
              ))} */}
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
            {/* {allMesure.map((val,index) => {
                return(
                  <SelectItem key={index} value={val.nom_mesure} className="rounded-lg">
                    {val.nom_mesure}
                  </SelectItem>)

                })} */}
          </SelectContent>
        </Select>

      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart >
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date_pollution"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
