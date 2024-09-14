"use server"

import prisma from "@/db"

interface ProductParams {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    stock :number
    category:string
}

export async function GetAllProducts() {
    try {
        const products = await prisma.product.findMany({});
        return products 
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while retrieving the products", error: e };
    }
}


export async function GetProductById(id:string) {
        try{
            const product = await prisma.product.findUnique({where:{
                id
            }})
            return product
        }catch(e){
            console.log(e)
        }
}

export async function DeleteProduct(id:string) {
    try {
        const products = await prisma.product.delete({where:{
            id
        }});
        const product = await prisma.product.findMany({})
        return product; 
        
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while retrieving the products", error: e };
    }
}

export async function UpdateProduct(data:any,id:string) {
    try {
        const products = await prisma.product.update({where:{
            id
        },
        data:{
       ...data
        }
    });
    const product = await prisma.product.findMany({})
    return product; 
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while retrieving the products", error: e };
    }
}


export async function ProductCreate(params: ProductParams) {
    try {
        console.log(params)

        const addedProduct = await prisma.product.create({
            data: {
              name:params.name,
              price:params.price,
              description:params.description,
              stock:params.stock,
              imageUrl:params.imageUrl,
              category:params.category
            },
        });


        const product = await prisma.product.findMany({})
        return product;
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while creating the product", error: e };
    }
}