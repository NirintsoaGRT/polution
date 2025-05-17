import * as React from "react"
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
  mois: {
    label: "Mois de pollution",
  },
  index_qualite: {
    label: "Index de qualite",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export function CourbeParMois() {

 
  return (
    <Card>
      
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Courbe de variation</CardTitle>
          <CardDescription>
          Variation du taux de {} a {} par mois
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
            {/* {allMesure.map((val,index) => (
              <SelectItem key={index} value={val.nom_mesure} className="rounded-lg">
                {val.nom_mesure}
              </SelectItem>
            ))} */}
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
              <linearGradient id="fillMax" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-max)"
                  stopOpacity={0.8}
                />
                <stop
                  fill="var(--color-min)"
                  offset="95%"
                  stopColor="var(--color-min)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMoyenne" x1="0" y1="0" x2="0" y2="1">
                <stop
                  fill="var(--color-moyenne)"
                  offset="5%"
                  stopColor="orange"
                  stopOpacity={0.8}
                />
                <stop
                  fill="var(--color-moyenne)"
                  offset="95%"
                  stopColor="red"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMin" x1="0" y1="0" x2="0" y2="1">
                <stop
                  fill="var(--color-min)"
                  offset="5%"
                  stopColor="black"
                  stopOpacity={0.8}
                />
                <stop
                  fill="var(--color-min)"
                  offset="95%"
                  stopColor="red"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mois"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                    return value}}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value}}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={"Min"}
              type="natural"
              fill="black"
              stroke="black"
              stackId="a"
            />
            <Area
              dataKey={"Max"}
              type="natural"
              fill="url(#fillMax)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey={"Moyenne"}
              type="natural"
              fill="url(#fillMoyenne)"
              stroke="red"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
