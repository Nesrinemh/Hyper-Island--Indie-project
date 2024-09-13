import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Living&Co',
  description: 'Research apartment website.',
};

export default async function RootLayout({ children }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <>
          <Navbar user={data.user} />
        </>
        <div className='h-full'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
