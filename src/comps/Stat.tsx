import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { path } from "./Dialogs";

export default function Stat() {
  const [revenu, SetRevenu] = useState(0);
  useEffect(() => {
    axios
      .get(`${path}/vente/revenu`)
      .then((data) => {
        const res = data.data.data;
        SetRevenu(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Card className="w-[200px] h-32">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
        <DollarSign className="h-4 w-4 " />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{revenu} Ar</div>
        <Label className="text-xs ">+20.1% les 3mois</Label>
      </CardContent>
    </Card>
  );
}
