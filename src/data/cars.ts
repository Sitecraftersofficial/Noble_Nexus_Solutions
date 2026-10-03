/**
 * Typed access to the car rental inventory.
 * Data source: src/data/cars.json — edit that file to add/remove vehicles.
 */
import rawCars from "@/data/cars.json";

export type CarCategory = "Economy" | "Sedan" | "SUV" | "Luxury" | "Van" | "Bus" | "Electric";

export type Car = {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: "Automatic" | "Manual";
  fuel: string;
  seats: number;
  doors: number;
  bags: number;
  image: string;
  daily: number;
  weekly: number;
  monthly: number;
  features: string[];
  unlimitedMileage: boolean;
  mileageLimitPerDay: number;
  deposit: number;
  available: boolean;
  featured: boolean;
  location: string;
  description: string;
};

/** Strongly-typed inventory, validated shape at compile time via satisfies. */
export const cars = rawCars as Car[] satisfies Car[];

export const categories: CarCategory[] = [...new Set(cars.map((c) => c.category))];

export const locations: string[] = [...new Set(cars.map((c) => c.location))];

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id);
}

export function formatPrice(value: number): string {
  return `RWF ${value.toLocaleString("en-US")}`;
}
