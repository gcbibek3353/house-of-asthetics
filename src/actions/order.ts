"use server"

import prisma from "@/db";



type OrderData = {
  name: string;
  phone: string;
  email: string;
  zipcode: string;
  city: string;
  address: string;
  product: any
};
export async function addOrder({
  name,
  phone,
  email,
  zipcode,
  city,
  address,
  product,
}: OrderData) {
  try {
    // Validate input
    if (!name || !phone || !email || !zipcode || !city || !address || !product || product.length === 0) {
      throw new Error("All fields are required");
    }

    // Fetch product prices from the database
    const productIds = product.map((p: any) => p.id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Map products by ID for easy lookup
    const productMap = new Map(products.map(p => [p.id, p.price]));

    // Update prices in cart based on fetched prices
    const updatedProductData = product.map((p: any) => {
      const currentPrice = productMap.get(p.id);
      if (currentPrice !== undefined) {
        return {
          ...p,
          price: currentPrice,
        };
      }
      return p;
    });

    // Calculate the total price
    const total = updatedProductData.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create the order with updated product prices and total amount
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        email,
        zipcode,
        city,
        address,
        product: updatedProductData,
        total,  
      },
    });

    console.log("Order is added");
    return order;

  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}



export async function fetchOrders() {
  try {
    const orders = await prisma.order.findMany({
    
    });
    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error('Failed to fetch orders');
  }
}

type UpdateOrderStatusData = {
  orderId: string;
  status: "processing" | "cancelled" | "shipped" | "delivered";
};

export async function updateOrderStatus({ orderId, status }: UpdateOrderStatusData) {
  try {
    if (!orderId || !status) {
      throw new Error("Order ID and status are required");
    }

    // Update the status of the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    console.log("Order status updated");
    const orders = await prisma.order.findMany({
    
    });
    return orders;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw new Error("Failed to update order status");
  }
}