import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductType } from "./lib/Essentiell/type/PoductType";
import { Action } from "./lib/Essentiell/type/Action";
import axios from "axios";
import { path } from "./comps/Dialogs";

interface ProdProps {
  Products: ProductType[];
  handelAddProd: (NewProd: ProductType) => void;
  // handelChangeProd:(id:string)=>(void)
  // handelmod: (nom: string, newval: number) => void;
  Depense: Action;
  handelDepense: (newDepense: number) => void;
  Benefice: Action;
  handelBenefice: (newVente: number) => void;
}

export const ProdContext = createContext<ProdProps | undefined>(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export const useProd = (): ProdProps => {
  const context = useContext(ProdContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
interface ProdPropsProvider {
  children: ReactNode;
}
export const ProdProvider: React.FC<ProdPropsProvider> = ({ children }) => {
  const [Products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    axios
      .get(`${path}/stock/listproduitdetails`)
      .then((d) => {
        const { status, data } = d;
        if (!status) {
          throw new Error("erreur dans le chartData");
        }
        const res = [];
        for (const e of data.data) {
          const produit = {
            numP: e.numeroid,
            nomPro: e.nomProduit,
            quatiter: +e.quantite,
            prix: e.prixProduit,
            prixA: e.prixAchat,
          } satisfies ProductType;
          res.push(produit);
        }
        setProducts(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Products]);
  const handelAddProd = (NewProd: ProductType) => {
    const copyProd = [...Products];
    copyProd.push(NewProd);
    setProducts(copyProd);
  };
  let somme: number = 0;
  Products.forEach((prod) => {
    somme += prod.prixA;
  });
  const dat = new Date();
  const [Depense, setDepense] = useState<Action>({ action: somme, date: dat });
  const handelDepense = (newDepense: number) => {
    const news = Depense.action + newDepense;
    const dates = new Date();
    setDepense({ action: news, date: dates });
  };
  // const handelmod = (nom: string, newval: number) => {
  //   const copyProd = [...Products];
  //   const izy = copyProd.filter((prod) => prod.nomPro !== nom);
  //   const newpr: ProductType | undefined =
  //     Products &&
  //     Products.find((prod) => {
  //       if (prod.nomPro == nom) {
  //         return (prod.prix = newval);
  //       }
  //     });
  //   // console.log(newpr)
  //   // izy.push(newpr!);
   
  //   // setProducts(izy);
  // };

  let ben: number = 0;
  Products.forEach((prod) => {
    ben += prod.prix;
  });

  const [Benefice, setBenefice] = useState<Action>({ action: ben, date: dat });
  const handelBenefice = (newVente: number) => {
    const news = Benefice.action + newVente;
    const dates = new Date();
    setBenefice({ action: news, date: dates });
  };

  return (
    <ProdContext.Provider
      value={{
        Products,
        handelAddProd,
        Depense,
        handelDepense,
        Benefice,
        handelBenefice,
        // handelmod,
      }}
    >
      {children}
    </ProdContext.Provider>
  );
};
