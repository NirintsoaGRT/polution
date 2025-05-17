import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { path } from "./Dialogs";
import axios from "axios";

export default function Stat2() {
  const [depense, SetDepense] = useState(0);
  useEffect(() => {
    axios
      .get(`${path}/sortant/sumachat`)
      .then((data) => {
        const res = data.data.data;
        SetDepense(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Card className="w-[200px] h-32">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Depense</CardTitle>
        <Users className="h-4 w-4 " />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{depense} Ar</div>
        <p className="text-xs ">+180.1% les 3mois</p>
      </CardContent>
    </Card>
  );
}
