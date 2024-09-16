"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { useRecoilState } from "recoil";
import { cartItemState } from "@/recoil/atom";
import { useRouter } from "next/navigation";

import { addOrder } from "@/actions/order";
import { toast } from "react-toastify";

export default function Checkout() {
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);

  // Initialize state for billing details
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const router = useRouter();

  if (cartItems.length === 0) {
    router.push("/");
  }

  const totalItems = cartItems.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal;

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items: any) =>
      items
        .map((item: any) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item: any) => item.quantity > 0)
    );
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(cartItems);
    console.log("Billing Details: ", billingDetails);
    const { name, email, phone, address, city, zipCode } = billingDetails;
    const added = await addOrder({
      name,
      email,
      phone,
      address,
      city,
      zipcode: zipCode,
      product: cartItems,
    });

    setCartItems([]);

    toast.success("Order is placed");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="John Rai"
                  value={billingDetails.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={billingDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  required
                  id="phone"
                  type="number"
                  placeholder="81XXXXXXXX"
                  value={billingDetails.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  required
                  id="address"
                  placeholder="1234 Main St"
                  value={billingDetails.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    required
                    id="city"
                    placeholder="New York"
                    value={billingDetails.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    required
                    id="zipCode"
                    placeholder="10001"
                    value={billingDetails.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full mt-4">
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="flex-col space-y-2">
              <div className="flex justify-between w-full">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between w-full text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
