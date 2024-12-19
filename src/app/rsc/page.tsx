import { PetList } from "@/components/pet-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSC",
  description: "RSC",
};

export default function Page() {
  return (
    <main>
      <h1>RSC</h1>
      <PetList />
    </main>
  );
}
