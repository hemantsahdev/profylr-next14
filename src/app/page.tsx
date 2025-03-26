import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center h-screen gap-12 ">
            <h1 className="text-4xl font-bold" >Welcome to Resume Builder</h1>
            <Link href="/resume/select-creation-method">
                <Button>Generate Resume</Button>
            </Link>
        </main>
    );
}
