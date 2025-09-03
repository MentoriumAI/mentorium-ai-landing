import { redirect } from 'next/navigation';

export default function PresentationIndexPage() {
  // Redirect to main docs in presentation mode
  redirect('/presentacion/pacasmayo?slide=1');
}