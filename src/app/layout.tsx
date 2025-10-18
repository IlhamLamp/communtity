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
import { FilterProvider } from "@/context/FilterContext";
import { toasterStatusColor } from "@/helpers/tagColor";
import { MainMenuProvider } from "@/context/MainMenuContext";
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
          <FilterProvider>
            <AuthProvider>
              <ProfileProvider>
                <MainMenuProvider>
                  <Toaster toastOptions={toasterStatusColor} />
                  <Header />
                  <main>{children}</main>
                </MainMenuProvider>
              </ProfileProvider>
            </AuthProvider>
          </FilterProvider>
        </PublicResourceProvider>
      </body>
    </html>
  );
}
