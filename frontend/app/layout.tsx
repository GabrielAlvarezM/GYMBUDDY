import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GymBuddy - Tu Compañero de Fitness',
  description: 'Entrenamientos, dietas y suplementos personalizados',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
