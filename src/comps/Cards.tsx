import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "./Dialogs";

export default function Cards() {
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
      <CardHeader className="pb-1">
        <CardDescription>
          <Label>{Date.now()}</Label>
        </CardDescription>
        <CardTitle className="text-xl">{revenu - depense} Ar</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Progress value={12} aria-label="12% increase" />
      </CardFooter>
    </Card>
  );
}
