import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialogs } from "./Dialogs"

export default function Lits() {
  return (
    <Card className="sm:col-span-2 h-auto">
      <CardHeader className="pb-3">
        <CardTitle>Ajouter des NEW Produit</CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          Vous pouvez ajouter des nouveau produit ou supprimer des produit qui ne sont 
          plus disponible dans votre stock
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialogs/>
      </CardFooter>
    </Card>
  )
}
