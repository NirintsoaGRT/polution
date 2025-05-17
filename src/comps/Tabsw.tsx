import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Selectr } from "./Selectr";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import Invoice from "@/lib/les_page/Invoice";
import { useProd } from "@/ProduitContext";
import { useSelect } from "@/SelectContext";

import { useNotif } from "@/NotificationContext";
import { Lialoge } from "./Lialoge";
import { Achat } from "@/lib/Essentiell/type/Achat";
import { path } from "./Dialogs";
import axios from "axios";

export function Tabsw() {
  const { Products } = useProd();
  const { select } = useSelect();
  const { handelAddNotif } = useNotif();
  const [achats, setAchats] = useState<Achat[]>([
    { id: Date.now(), product: "", quantity: 1 },
  ]);
  const [nomProd, setnomProd] = useState("");

  const invoiceRef = useRef<HTMLDivElement>(null);
  const [prt, setprt] = useState(Number);
  const [nomClient, SetnomClient] = useState("");

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(achats);
    console.log(nomClient);
  };

  const handelSub = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = `modification du prix de ${select}, nouveau prix ${prt} Ar`;
    const id = Date.now();
    const date = "22/12/2025";

    const NewNotif = { Content: content, id: id, date: date };
    handelAddNotif(NewNotif);
    axios
      .put(`${path}/stock/alterproduct`, {
        news: {
          prixProduit: "" + prt,
        },
        nomProduit: nomProd,
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handelCreatAchat = () => {
    setAchats([...achats, { id: Date.now(), product: "", quantity: 1 }]);
  };

  const handleDeleteAchat = (id: number) => {
    setAchats(achats.filter((achat) => achat.id !== id));
  };

  const handleProductChange = (id: number, product: string) => {
    setAchats(
      achats.map((achat) => (achat.id === id ? { ...achat, product } : achat))
    );
  };
  const handelC = (pro: string) => {
    setnomProd(pro);
  };
  const handleQuantityChange = (id: number, quantity: number) => {
    setAchats(
      achats.map((achat) => (achat.id === id ? { ...achat, quantity } : achat))
    );
  };
  const handleNewPrix = (newProx: number) => {
    setprt(newProx);
  };

  return (
    <>
      <Tabs defaultValue="account" className="w-[55vw]">
        <TabsList className="grid w-[30vw] rounded-xl grid-cols-2">
          <TabsTrigger value="account">Achat de Produit</TabsTrigger>
          <TabsTrigger value="password">Gestion d'Achat</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <div className="flex gap-x-[200px]">
              <div>
                <CardHeader>
                  <CardTitle>Achat</CardTitle>
                  <CardDescription className="flex gap-x-[200px] items-center  ">
                    tout ce qui concerne les Achats
                  </CardDescription>
                </CardHeader>
              </div>
              <div className="flex justify-center items-center gap-6 w-[200px] ">
                <Label className="text-sm text-nowrap">Nom de l Acheteur</Label>
                <Input
                  className=" w-[500px]"
                  onChange={(e) => SetnomClient(e.target.value)}
                />
              </div>
            </div>
            <CardContent className="space-y-2 ">
              <div className="flex flex-col ">
                <div className="flex gap-[150px]">
                  <div className="flex gap-3 items-center">
                    <Button onClick={handelCreatAchat}>
                      <Plus />
                    </Button>
                    <Label>Ajouter un Produit</Label>
                  </div>
                </div>
                <form
                  action="submit"
                  className="flex flex-col pt-4 gap-3"
                  onSubmit={handelSubmit}
                >
                  {achats.map((achat) => (
                    <div key={achat.id} className="flex gap-8 items-center">
                      <Selectr
                        onChange={(value) =>
                          handleProductChange(achat.id, value)
                        }
                      />
                      <Input
                        className="w-60"
                        placeholder="Quantité"
                        id="quantite"
                        onChange={(e) =>
                          handleQuantityChange(achat.id, Number(e.target.value))
                        }
                      />
                      <Button
                        variant="outline"
                        className="text-red-500"
                        onClick={() => handleDeleteAchat(achat.id)}
                      >
                        <Trash2 size={26} />
                      </Button>
                    </div>
                  ))}
                  <div className="pt-3">
                    <Lialoge Achats={achats} nom={nomClient} />
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Gestion d'Achat</CardTitle>
              <CardDescription>
                tout ce qui concerne les Prix D Achat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label className="font-bold uppercase">
                Modifier les Prix d Achat
              </Label>
              <form
                action="submit"
                onSubmit={handelSub}
                className="flex flex-1 flex-col gap-y-4 my-4"
              >
                <div className="flex gap-x-6 items-center">
                  <Selectr onChange={(e) => handelC(e)} />

                  <Label>
                    acien prix :
                    {Products &&
                      Products.find((prod) => prod.nomPro == nomProd)?.prix}
                  </Label>
                  <Input
                    className="w-60"
                    placeholder="Nouveau Prix"
                    onChange={(e) => handleNewPrix(Number(e.target.value))}
                  ></Input>
                </div>
                <Button className="w-40 mt-7 ">Enregistre</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invoice component for printing */}
      <div style={{ display: "none" }}>
        <Invoice ref={invoiceRef} achats={achats} />
      </div>
    </>
  );
}
