"use client";

import { useState } from 'react';
import IDXHeader from '@/components/IDXHeader';
import FeaturedProperties from '@/components/home/FeaturedProperties';

export default function Home() {
	return (
		<main>
			<div className="bg-white">
				<IDXHeader />
				
				{/* Featured Properties Section */}
				<FeaturedProperties 
					title="Featured Listings" 
					subtitle="Explore our handpicked selection of premium properties in top locations" 
				/>
			</div>
		</main>
	);
}
