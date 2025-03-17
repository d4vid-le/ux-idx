'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-900 text-white pt-10">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between">
					<div className="w-full md:w-1/4 mb-8 md:mb-0">
						<Link href="/" className="flex items-center mb-4">
							<div className="relative h-10 w-10 mr-3 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
								<Image src="/logo.png" alt="Logo" width={32} height={32} />
							</div>
							<div>
								<h1 className="text-xl font-bold">
									UX <span className="text-gray-400">/</span> IDX
								</h1>
								<p className="text-xs text-gray-200">IDX Solution</p>
							</div>
						</Link>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 pt-6 pb-6">
					<div className="md:flex md:items-center md:justify-between">
						<p className="text-gray-200 text-sm mb-4 md:mb-0">
							© {new Date().getFullYear()} UX/IDX. All rights reserved.
						</p>
						<div className="flex space-x-6">
							<Link href="/privacy" className="text-gray-200 hover:text-white text-sm transition-colors">Privacy Policy</Link>
							<Link href="/terms" className="text-gray-200 hover:text-white text-sm transition-colors">Terms of Service</Link>
							<Link href="/sitemap" className="text-gray-200 hover:text-white text-sm transition-colors">Sitemap</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
