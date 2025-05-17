import { forwardRef } from "react";

interface InvoiceProps {
  achats: {
    id: number;
    product: string;
    quantity: number;
    total?: number;
  }[];
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(({ achats }, ref) => {
  return (
    <div ref={ref} className="p-5 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Facture</h2>
      <ul>
        {achats.map((achat) => (
          <li key={achat.id}>
            <strong>Produit :</strong> {achat.product}, <strong>Quantité :</strong> {achat.quantity}, <strong>Total :</strong> {achat.total ?? 0}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Invoice;
