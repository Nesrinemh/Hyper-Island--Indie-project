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
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Climate+Crisis&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='font-DMMono'>
        <>
          <Navbar user={data.user} />
        </>
        <div className='h-full'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
