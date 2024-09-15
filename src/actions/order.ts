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

    if (!name || !phone || !email || !zipcode || !city || !address || !product || product.length === 0) {
      throw new Error("All fields are required");
    }

    const productIds = product.map((p:any) => p.id);
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
    const updatedProductData = product.map((p:any) => {
      const currentPrice = productMap.get(p.id);
      if (currentPrice !== undefined) {
        // Adjust the price in the cart if needed (e.g., correct it)
        return {
          ...p,
          price: currentPrice,
        };
      }
      return p;
    });

    // Create the order with updated product prices
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        email,
        zipcode,
        city,
        address,
        product: updatedProductData,
      },
    });

      console.log("order is added")
    return order;

  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}
