import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Achat } from "@/lib/Essentiell/type/Achat";
import { useProd } from "@/ProduitContext";
import { useTheme } from "@/ThemeContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "./Dialogs";

export function Lialoge({ Achats, nom }: { Achats: Achat[]; nom: string }) {
  const [totale, setTotal] = useState(0);
  const { Products } = useProd();

  useEffect(() => {
    const totalPrice = Achats.reduce((acc, ach) => {
      const product = Products.find((prod) => prod.nomPro === ach.product);
      if (product) {
        return acc + product.prix * ach.quantity;
      }
      return acc;
    }, 0);
    setTotal(totalPrice);
  }, [Achats, Products]);

  const handelprint = () => {
    window.print();
    const listAchats: {
      nomClient: string;
      nomProduit: string;
      nombre: string;
    }[] = [];
    Achats.forEach((e) => {
      listAchats.push({
        nomClient: nom,
        nomProduit: e.product,
        nombre: "" + e.quantity,
      });
    });

    axios
      .post(`${path}/vente/actionvente`, {
        list: listAchats,
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const date = new Date();
  const { darkMode } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px] ">Effectuer l Achat</Button>
      </DialogTrigger>
      <DialogContent
        className={` ml-10 w-[50vw] ${
          darkMode ? "text-black" : "text-white"
        } flex flex-col gap-y-4`}
      >
        <DialogHeader>
          <DialogTitle>Facture des Achats </DialogTitle>
          <DialogDescription className="pt-3 flex items-center gap-x-12">
            <Label>achat fait par : {nom} </Label>
            <Label className="pl-[90px]">
              Date : {date.toLocaleDateString()}
            </Label>
          </DialogDescription>
        </DialogHeader>

        <Table className="pt-6">
          <TableHeader className="">
            <TableRow>
              <TableHead>Nom du Produit</TableHead>
              <TableHead>quantiter</TableHead>
              <TableHead>Prix du produit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Achats &&
              Achats.map((acht) => (
                <TableRow key={acht.id}>
                  <TableCell className="font-medium">{acht.product}</TableCell>
                  <TableCell>{acht.quantity}kg</TableCell>
                  <TableCell>
                    {Products &&
                      Products.find((prod) => prod.nomPro == acht.product)
                        ?.prix}
                    Ar
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-y-4">
          <Label>N° Facture : {Date.now()}</Label>
          <Label>heure d Achat: {date.toLocaleTimeString()}</Label>
          <Label className="mt-3 font-bold">ToTal : {totale} Ar</Label>
        </div>

        <Button
          className="w-[200px] ml-[260px] mt-4"
          onClick={() => handelprint()}
        >
          Imprimer
        </Button>
      </DialogContent>
    </Dialog>
  );
}
