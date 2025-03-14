'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

/**
 * ClientOnly component to prevent hydration errors
 * This component will only render its children on the client side
 */
export default function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  // Simple effect that sets mounted state to true on client-side
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only render children on the client-side
  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
} 