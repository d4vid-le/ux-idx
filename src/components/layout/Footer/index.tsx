'use client';

import Link from 'next/link';

const Footer: React.FC = () => {
	return (
		<footer className="bg-blue-900 text-white pt-10">
			<div className="container mx-auto px-4">
				<div className="flex justify-start mb-8">
					{/* Logo */}
					<div className="text-left">
						<div className="flex items-center mb-4">
							<div className="relative h-10 w-10 mr-3 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
								<span className="absolute text-white font-bold text-sm">db</span>
							</div>
							<div>
								<h1 className="text-xl font-bold">
									<span className="text-white">db</span>
									<span className="text-blue-400">/</span>
									<span className="text-white">ux</span>
								</h1>
								<p className="text-xs text-blue-200">IDX Solution</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-blue-800 pt-6 pb-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-blue-200 text-sm mb-4 md:mb-0">
							© 2025 db/ux IDX Solution. All rights reserved.
						</p>
						<div className="flex space-x-6">
							<Link href="/privacy" className="text-blue-200 hover:text-white text-sm transition-colors">Privacy Policy</Link>
							<Link href="/terms" className="text-blue-200 hover:text-white text-sm transition-colors">Terms of Service</Link>
							<Link href="/sitemap" className="text-blue-200 hover:text-white text-sm transition-colors">Sitemap</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
