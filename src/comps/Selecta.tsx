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
import { useSelect } from "@/SelectContext"
export function Selecta() {
  const {handelSelect}=useSelect()
  const {Products}=useProd()
  return (
    
    <Select onValueChange={(e)=>handelSelect(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>les Produit Dispo</SelectLabel>
          
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
