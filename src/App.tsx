import { useState } from "react";
import ApiCallForm from "./ApiForm";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="bg-[#121212] h-screen w-screen">
      <div className="flex flex-col items-center">
        <div className="text-white">
          <h1 className="text-4xl font-bold my-5">
            Supabase Database types to Swift converter
          </h1>
          <ApiCallForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
