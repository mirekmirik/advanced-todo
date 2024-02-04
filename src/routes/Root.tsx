import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex flex-col gap-10 h-full">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}
