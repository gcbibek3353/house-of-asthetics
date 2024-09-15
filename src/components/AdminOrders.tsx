"use client";

import React, { useState } from "react";
import OrderForm from "./OrderForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MoreVertical,
  Search,
  Filter,
  Plus,
} from "lucide-react";

// Mock data for initial orders
const initialOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2023-07-01",
    total: 199.99,
    status: "Delivered",
    items: [{ name: "Ergonomic Desk Chair", quantity: 1, price: 199.99 }],
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2023-07-02",
    total: 529.97,
    status: "Processing",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 249.99 },
      { name: "Smart Home Camera", quantity: 1, price: 129.99 },
      { name: "Organic Cotton T-Shirt", quantity: 5, price: 29.99 },
    ],
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    date: "2023-07-03",
    total: 24.99,
    status: "Shipped",
    items: [
      { name: "Stainless Steel Water Bottle", quantity: 1, price: 24.99 },
    ],
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    date: "2023-07-04",
    total: 399.98,
    status: "Processing",
    items: [{ name: "Ergonomic Desk Chair", quantity: 2, price: 199.99 }],
  },
  {
    id: "ORD005",
    customer: "Charlie Davis",
    date: "2023-07-05",
    total: 154.98,
    status: "Delivered",
    items: [
      { name: "Smart Home Camera", quantity: 1, price: 129.99 },
      { name: "Stainless Steel Water Bottle", quantity: 1, price: 24.99 },
    ],
  },
];

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / orders.length;

  const handleStatusChange = (orderId: any, newStatus: any) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder(null);
  };

  const handleAddOrder = (newOrder: any) => {
    setOrders([
      ...orders,
      { ...newOrder, id: `ORD${orders.length + 1}`.padStart(6, "0") },
    ]);
    setIsAddOrderOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Status: {statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                All
              </DropdownMenuItem>
              {statusOptions.map((status: any) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      {statusOptions.map((status: any) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                        >
                          Mark as {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="font-semibold">
                Customer: {selectedOrder.customer}
              </h3>
              <p>Date: {selectedOrder.date}</p>
              <p>Total: ${selectedOrder.total.toFixed(2)}</p>
              <h4 className="font-semibold mt-2">Items:</h4>
              <ul className="list-disc pl-5">
                {selectedOrder.items.map((item: any, index: any) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}, Price: $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Label>Update Status</Label>
                <Select
                  defaultValue={selectedOrder.status}
                  onValueChange={(value) =>
                    handleStatusChange(selectedOrder.id, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
