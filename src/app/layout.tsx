import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { PublicResourceProvider } from "@/context/PublicContext";
config.autoAddCss = false;

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Communtity",
  description: "For everyone when seeking common interests.",
  icons: {
    icon: {
      url: "/assets/icon.png",
      href: "/assets/icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <PublicResourceProvider>
          <AuthProvider>
            <ProfileProvider>
              <Toaster
                toastOptions={{
                  loading: {
                    style: {
                      background: "#FCE38A",
                    },
                  },
                  success: {
                    style: {
                      background: "#95E1D3",
                    },
                  },
                  error: {
                    style: {
                      background: "#F38181",
                      color: "white",
                    },
                  },
                }}
              />
              <Header />
              <main>{children}</main>
            </ProfileProvider>
          </AuthProvider>
        </PublicResourceProvider>
      </body>
    </html>
  );
}
