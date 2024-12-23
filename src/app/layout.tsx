import type { Metadata } from "next";
import "./globals.css";
import "../css/custom-scrollbar.css";
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";



export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main className="flex h-screen w-screen bg-[#f2f6ff] ">
                    <section className="h-full w-[4.5%]" >
                        <Sidebar />
                    </section>
                    <section className="h-full w-[95.5%] flex flex-col bg-gradient-to-br from-indigo-100 to-rose-100 ">
                        <div className="min-h-[10%] w-full ">
                            <div className="h-full w-full">
                                <Topbar />
                            </div>
                        </div>
                        <div className="min-h-[90%] w-full">
                            {children}
                        </div>

                    </section>
                </main>
            </body>
        </html>
    );
}
