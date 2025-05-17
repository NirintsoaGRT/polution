import { useCherch } from "@/ChercheContext"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export function Selects() {
  const {handelSel} = useCherch()
  return (
    
    <Select onValueChange={(e)=>handelSel(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Option de filtre</SelectLabel>
          
              <SelectItem value="prix">Prix</SelectItem>
              <SelectItem value="quantiter">quantiter</SelectItem>
              <SelectItem value="Numero">Numero</SelectItem>
         
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
