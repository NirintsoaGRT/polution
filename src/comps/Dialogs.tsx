import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotif } from "@/NotificationContext";
import { useProd } from "@/ProduitContext";
import { useState } from "react";
import AlertNon from "./AlertNon";
import AlertOk from "./AlertOk";
import { useTheme } from "@/ThemeContext";
import axios from "axios";
const IP = "10.42.0.1";
const PORT = 3000;
export const path = `http://${IP}:${PORT}`;
export function Dialogs() {
  const { handelAddProd } = useProd();
  const { handelAddNotif } = useNotif();
  const [num, setnum] = useState("");
  const [nom, setnom] = useState("");
  const [prix, setprix] = useState("");
  const [prixA, setprixA] = useState("");
  const [quantiter, setquantiter] = useState("");
  const { handelDepense } = useProd();

  const [showAlertNon, setShowAlertNon] = useState(false);
  const [showAlertOk, setShowAlertOk] = useState(false);
  const errors: string[] = [];
  const validateForm = (errors: string[]): boolean => {
    const numRegex = /[a-zA-Z]/; // Au moins une lettre
    const nomRegex = /^[a-zA-Z\s]+$/; // Seulement des lettres et espaces
    const numberRegex = /^\d+(\.\d+)?$/; // Seulement des nombres, avec point décimal optionnel

    if (!numRegex.test(num)) {
      errors.push("Le numéro de produit doit contenir au moins une lettre.");
    }
    if (!nomRegex.test(nom)) {
      errors.push(
        "Le nom du produit doit contenir uniquement des lettres et des espaces."
      );
    }
    if (!numberRegex.test(prix)) {
      errors.push("Le prix de vente du produit doit être un nombre valide.");
    }
    if (!numberRegex.test(prixA)) {
      errors.push("Le prix d'achat du produit doit être un nombre valide.");
    }
    if (!numberRegex.test(quantiter)) {
      errors.push("La quantité du produit doit être un nombre valide.");
    }
    if (errors.length > 0) {
      setShowAlertNon(true);
      setShowAlertOk(false);
      return false;
    }
    setShowAlertNon(false);
    setShowAlertOk(true);
    return true;
  };
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(errors)) {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const num = String(formData.get("numPro"));
    const nom = String(formData.get("nomPro"));
    const prix = Number(formData.get("prix"));
    const quantiter = Number(formData.get("quantiter"));
    const prixA = Number(formData.get("prixA"));
    const NewPro = {
      numP: num,
      nomPro: nom,
      quatiter: quantiter,
      prix: prix,
      prixA: prixA,
    };
    axios
      .post(`${path}/stock/addproduct`, {
        nomProduit: nom,
        numeroid: num,
        prixProduit: prix,
        prixAchat: prixA,
        quantite: quantiter,
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    const content = `Ajout d'une nouvelle Produit ${nom} numéro du produit ${num}`;
    const id = Date.now();
    const date = "22/12/2025";

    const NewNotif = { Content: content, id: id, date: date };
    handelAddNotif(NewNotif);
    setnom("");
    setnum("");
    setprix("");
    setquantiter("");
    setprixA("");
    handelAddProd(NewPro);
    handelDepense(prixA);
  };
  const { darkMode } = useTheme();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ajouter Nouveau Produit</Button>
      </DialogTrigger>
      <DialogContent
        className={`w-[50vw] ${darkMode ? "text-black" : "text-white"} `}
      >
        <DialogHeader>
          <DialogTitle>Ajout de Nouveau Produit</DialogTitle>
          <DialogDescription className="pt-3">
            Complétez les champs concernant les informations du produit :
          </DialogDescription>
          {showAlertNon && <AlertNon />}
          {showAlertOk && <AlertOk />}
        </DialogHeader>

        <div className="">
          <form
            action="submit"
            onSubmit={handelSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="numPro">Numéro d'Identifiant du Produit</Label>
              <Input
                id="numPro"
                placeholder="Numéro ID"
                name="numPro"
                value={num}
                onChange={(e) => setnum(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="nomPro">Nom du Produit</Label>
              <Input
                id="nomPro"
                placeholder="Nom du Produit"
                name="nomPro"
                value={nom}
                onChange={(e) => setnom(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="prix">Prix de vente du Produit</Label>
              <Input
                id="prix"
                placeholder="Prix de vente"
                name="prix"
                value={prix}
                onChange={(e) => setprix(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="prixA">Prix d'Achat du Produit</Label>
              <Input
                id="prixA"
                placeholder="Prix d'Achat"
                name="prixA"
                value={prixA}
                onChange={(e) => setprixA(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="qt">Quantité du Produit</Label>
              <Input
                id="qt"
                placeholder="Quantité"
                name="quantiter"
                value={quantiter}
                onChange={(e) => setquantiter(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Enregistrer les modifications</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
