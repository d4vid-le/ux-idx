import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Building, User as UserIcon, Menu, X } from "lucide-react";

const links = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Properties",
		href: "/search",
	},
];

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const supabaseClient = useSupabaseClient();

	const { user } = useUser();

	// Add scroll effect for navbar
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
	};

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (isMenuOpen && !target.closest('.mobile-menu-container')) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isMenuOpen]);

	// Determine the agent button link based on authentication status
	const agentLinkHref = user ? '/agent-dashboard' : '/agent-login';
	const agentLinkText = user ? 'Agent Dashboard' : 'Agent Login';

	return (
		<div className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link
						href="/"
						aria-label="Company"
						title="Company"
						className="flex items-center">
						<div className="relative h-10 w-10 mr-3 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
							<span className="absolute text-white font-bold text-sm">db</span>
						</div>
						<div>
							<h1 className="text-xl font-bold">
								<span className="text-gray-800">db</span>
								<span className="text-blue-400">/</span>
								<span className="text-gray-800">ux</span>
							</h1>
							<p className="text-xs text-gray-500">IDX Solution</p>
						</div>
					</Link>
					
					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center justify-end flex-1 space-x-4">
						{/* Navigation Links */}
						<nav className="hidden md:flex items-center space-x-6 mr-4">
							{links.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									aria-label={link.label}
									title={link.label}
									className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
									{link.label}
								</Link>
							))}
						</nav>
						
						{/* Auth Buttons */}
						{!user ? (
							<div className="flex items-center space-x-2">
								<Button variant="ghost" className="text-sm py-1 h-auto px-3">
									<Link href="/login">Sign in</Link>
								</Button>
								<Button variant="default" className="text-sm py-1 h-auto px-3">
									<Link href="/signup">Sign up</Link>
								</Button>
								<Button 
									variant="outline" 
									className="text-sm py-1 h-auto px-3 flex items-center gap-1"
								>
									<Building className="h-4 w-4" />
									<Link href={agentLinkHref}>{agentLinkText}</Link>
								</Button>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<Button variant="ghost" className="text-sm py-1 h-auto px-3">
									<Link href="/dashboard">Dashboard</Link>
								</Button>
								<Button 
									variant="outline" 
									className="text-sm py-1 h-auto px-3 flex items-center gap-1"
								>
									<Building className="h-4 w-4" />
									<Link href={agentLinkHref}>{agentLinkText}</Link>
								</Button>
								<Button variant="default" onClick={handleLogout} className="text-sm py-1 h-auto px-3">
									Logout
								</Button>
							</div>
						)}
					</div>
					
					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
							title={isMenuOpen ? "Close Menu" : "Open Menu"}
							className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{isMenuOpen ? (
								<X className="w-5 h-5 text-gray-600" />
							) : (
								<Menu className="w-5 h-5 text-gray-600" />
							)}
						</button>
					</div>
				</div>
			</div>
			
			{/* Mobile Menu - Slide down animation */}
			{isMenuOpen && (
				<div className="md:hidden fixed top-16 left-0 right-0 z-50 mobile-menu-container">
					<div className="bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-top duration-300">
						<div className="container mx-auto px-4 py-3">
							<nav>
								<ul className="space-y-3 pb-3">
									{links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												aria-label={link.label}
												title={link.label}
												className="block py-2 px-3 rounded-md hover:bg-gray-50 font-medium text-gray-700 transition-colors duration-200">
												{link.label}
											</Link>
										</li>
									))}
									<li className="border-t border-gray-100 pt-3 mt-3">
										<p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Account</p>
									</li>
									{!user ? (
										<>
											<li>
												<Link 
													href="/login"
													className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
												>
													<UserIcon className="h-4 w-4 mr-2 text-gray-500" />
													Sign in
												</Link>
											</li>
											<li>
												<Link 
													href="/signup"
													className="flex items-center py-2 px-3 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium"
												>
													<UserIcon className="h-4 w-4 mr-2 text-blue-500" />
													Sign up
												</Link>
											</li>
											<li>
												<Link 
													href={agentLinkHref}
													className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
												>
													<Building className="h-4 w-4 mr-2 text-gray-500" />
													{agentLinkText}
												</Link>
											</li>
										</>
									) : (
										<>
											<li>
												<Link 
													href="/dashboard"
													className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
												>
													<UserIcon className="h-4 w-4 mr-2 text-gray-500" />
													Dashboard
												</Link>
											</li>
											<li>
												<Link 
													href={agentLinkHref}
													className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
												>
													<Building className="h-4 w-4 mr-2 text-gray-500" />
													{agentLinkText}
												</Link>
											</li>
											<li>
												<button 
													onClick={handleLogout}
													className="flex w-full items-center py-2 px-3 rounded-md hover:bg-red-50 text-red-600 font-medium"
												>
													<X className="h-4 w-4 mr-2 text-red-500" />
													Logout
												</button>
											</li>
										</>
									)}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
