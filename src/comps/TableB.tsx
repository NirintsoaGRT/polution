import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ProductType } from "@/lib/Essentiell/type/PoductType"
  
  
  
  export function TableB({products}:{products:ProductType[]}) {
    return (
      <Table className="w-[50vw] ">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[100px]">numero </TableHead>
            <TableHead>Nom du Produit</TableHead>
            <TableHead>prix du produit</TableHead>
            
            <TableHead className="text-right">quatiter disponible (Kg)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.numP}>
              <TableCell className="font-medium">{product.numP}</TableCell>
              <TableCell>{product.nomPro}</TableCell>
              <TableCell>{product.prix} Ar</TableCell>
              <TableCell className="text-right">{product.quatiter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    )
  }
  