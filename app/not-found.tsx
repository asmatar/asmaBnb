import { Button } from "@/components/ui/button"; // Adjust according to your setup
import { Hotel, Search } from "lucide-react"; // Icons from Lucide or any other icon set
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="absolute right-0 left-0 top-0 flex flex-col items-center justify-center h-screen bg-cover bg-center text-center  animate-fade-in"
      style={{ backgroundImage: "url('/not-found.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-lg text-white">
        <Hotel className="w-24 h-24 text-white mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold mb-4 animate-slide-up">
          Oops! You’re Lost in Paradise
        </h1>
        <p className="text-lg mb-6 animate-fade-in">
          It seems like the page you’re looking for took a detour. No worries,
          let’s get you back to booking your dream stay!
        </p>
        <Link href="/" passHref>
          <Button className="bg-white text-black hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg animate-pulse">
            <Search className="mr-2 w-5 h-5" />
            Back to Homepage
          </Button>
        </Link>
      </div>
    </section>
  );
}
