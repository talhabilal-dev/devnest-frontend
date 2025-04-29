import Link from "next/link";
import HeroSection from "@/components/hero-section";


export default function Home() {


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="font-bold text-white">B</span>
          </div>
          <span className="font-bold text-xl">DevNest</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Articles
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="hidden md:block px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main>
        <HeroSection />
      </main>

      <footer className="container mx-auto py-12 px-4 mt-20 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="font-bold text-white">B</span>
              </div>
              <span className="font-bold text-xl">DevNest</span>
            </div>
            <p className="text-gray-400 mb-4">
              A modern platform for writers and readers to connect through the
              power of words.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} DevNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
