import React from "react";
import ViewNotes from "../components/ViewNotes";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SnackBar from "../components/SnackBar";

export default function Dashboard() {
  return (
    <div className="flex flex-col relative">
      <Navbar />
      <Sidebar />
      <ViewNotes />
    </div>
  );
}
