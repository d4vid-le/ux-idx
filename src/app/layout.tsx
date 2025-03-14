import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import Script from 'next/script';

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
			<body className={`${poppins.className} antialiased h-full`}>
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
