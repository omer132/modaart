import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductProvider } from '@/contexts/ProductContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { CartProvider } from '@/contexts/CartContext'
import { CouponProvider } from '@/contexts/CouponContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'ModaArt - Sanat Ürünleri E-Ticaret',
  description: 'Modern ve minimal tasarımla sanat ürünlerini keşfedin. Resim, heykel ve özel koleksiyonlar.',
  keywords: 'sanat, e-ticaret, resim, heykel, koleksiyon, modern sanat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <ProductProvider>
                <CouponProvider>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </CouponProvider>
              </ProductProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
