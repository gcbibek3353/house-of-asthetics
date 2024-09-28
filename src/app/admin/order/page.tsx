import { fetchOrders } from "@/actions/order";
import AdminOrders from "@/components/AdminOrders";

export  default async function () {
  const product = await fetchOrders();
  return (
    <div>
      <AdminOrders products = {product} />
    </div>
  );
}
