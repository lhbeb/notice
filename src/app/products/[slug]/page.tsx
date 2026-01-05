import { redirect } from 'next/navigation';

// Redirect all product pages to home page during temporary closure
export default async function ProductPage() {
  redirect('/');
}
 