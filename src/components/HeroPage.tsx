"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import image from "@/images/hero-image.jpg";
import Link from "next/link";

export default function HeroPage() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 min-h-[calc(100vh-64px)] flex items-center">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
            Discover Your Perfect Style
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            Explore our curated collection of trendsetting fashion pieces that
            define your unique personality.
          </p>
          <Link href={"/products"}>
            <Button
              className="animate-fade-in-up animation-delay-400 group"
              size="lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <Image
            src={image}
            alt="Featured Product"
            width={500}
            height={500}
            className="relative rounded-lg shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
}
