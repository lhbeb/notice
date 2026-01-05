"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function AdminRouteCheck({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');
  const isHomePage = pathname === '/';

  if (isAdminRoute || isCheckoutRoute || isHomePage) {
    return null;
  }

  return <>{children}</>;
}

export function PublicRouteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');
  const isHomePage = pathname === '/';

  if (isAdminRoute || isCheckoutRoute || isHomePage) {
    return null;
  }

  return <>{children}</>;
}

export function AdminRouteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (!isAdminRoute) {
    return null;
  }

  return <>{children}</>;
}

export function CheckoutRouteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCheckoutRoute = pathname?.startsWith('/checkout');

  if (!isCheckoutRoute) {
    return null;
  }

  return <>{children}</>;
}

export function ClosurePageOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (!isHomePage) {
    return null;
  }

  return <>{children}</>;
}

