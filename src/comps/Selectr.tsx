import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProd } from "@/ProduitContext"

export function Selectr({ onChange }:{ onChange: (value: string) => void }) {
  const {Products}=useProd()
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Liste des Produits" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>les Produits</SelectLabel>
          {Products.map((prod)=>{
            return(
              <SelectItem value={prod.nomPro} key={prod.numP}>{prod.nomPro}</SelectItem>
            )
          })}
  
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
