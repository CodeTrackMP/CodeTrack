import React from "react";
import Sidebar from "../components/layout/sidebar";
import Navbar from "../components/layout/navbar";

export default function Dashboard() {
    return (
        <div className="flex">


            <Sidebar />


            <div className="flex flex-col flex-1">


                <Navbar />


                <div className="p-6">
                    <h1 className="text-white">Dashboard Content</h1>
                </div>

            </div>

        </div>
    );
}