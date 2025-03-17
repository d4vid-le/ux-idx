import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import Script from 'next/script';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600'],
	variable: '--font-montserrat',
});

export const metadata: Metadata = {
	title: 'IDX Real Estate Solution',
	description: 'Find your dream property with IDX Real Estate Solution',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<body className={`${montserrat.variable} font-sans antialiased h-full text-base leading-relaxed`}>
				<ThemeProvider attribute="class" defaultTheme="light">
					<SupabaseProvider>
						<UserProvider>
							<AuthProvider>{children}</AuthProvider>
						</UserProvider>
					</SupabaseProvider>
				</ThemeProvider>
				<Script src="/auth-redirect.js" strategy="beforeInteractive" />
			</body>
		</html>
	);
}
