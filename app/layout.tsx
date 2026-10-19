import type { Metadata } from 'next';
import './globals.css';
import AntiCopyShield from './components/AntiCopyShield';

export const metadata: Metadata = {
  title: 'Neuro Systems · Neurociência Cognitiva, Neuroplasticidade & Memória Celular',
  description:
    'Neuro Systems — Sistema Canónico de Neurociência Cognitiva, Neuroplasticidade Hebbiana, Reprogramação Biográfica e Memória Celular. Autoria de Ricardo R Pereira · Safe Creative #2610157331452.',
  authors: [{ name: 'Ricardo R Pereira', url: 'https://cylindermargin.tech' }],
  creator: 'Ricardo R Pereira',
  publisher: 'Cylinder Margin',
  manifest: '/manifest.json',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-indigo-500/30 selection:text-white bg-[#08091A] text-[#EDE9FE]">
        <AntiCopyShield />
        {children}
      </body>
    </html>
  );
}
