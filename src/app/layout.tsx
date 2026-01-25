import { ThemeProvider } from "@/components/theme-provider";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { Provider as JotaiProvider } from "jotai";
import "./globals.css";
import "@/components/login/login.css";
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
			<body>
				<Auth0Provider>
					<JotaiProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</JotaiProvider>
				</Auth0Provider>
			</body>
		</html>
	);
}
