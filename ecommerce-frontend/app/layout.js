import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Ecommerce Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </body>
    </html>
  );
}