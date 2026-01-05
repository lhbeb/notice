"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function AdminRouteCheck({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');
  const isHomeRoute = pathname === '/';

  if (isAdminRoute || isCheckoutRoute || isHomeRoute) {
    return null;
  }

  return <>{children}</>;
}

export function PublicRouteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');
  const isHomeRoute = pathname === '/';

  if (isAdminRoute || isCheckoutRoute || isHomeRoute) {
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

export function HomeRouteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomeRoute = pathname === '/';

  if (!isHomeRoute) {
    return null;
  }

  return <>{children}</>;
}

