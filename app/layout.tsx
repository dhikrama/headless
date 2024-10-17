import './globals.css'
import {
  createClient,
  getBlogCategoryLinks,
  getBlogPosts,
} from '@/lib/contento'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

const DMSansFont = DM_Sans({
  variable: '--font-dm-sans',
  weight: ['400', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
})

const JetBrainsMonoFont = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const mainNavId = process.env.SITE_MAIN_NAV_ID ?? false
  const footerNavId = process.env.SITE_FOOTER_NAV_ID ?? false

  if (!mainNavId) {
    throw new Error(
      'No main nav found. Please ensure you have created one in Contento and copied the ID to your .env file.',
    )
  }

  if (!footerNavId) {
    throw new Error(
      'No footer nav found. Please ensure you have created one in Contento and copied the ID to your .env file.',
    )
  }

  const mainNav = await createClient()
    .getContentById(mainNavId)
    .catch(() => {
      notFound()
    })

  const footerNav = await createClient()
    .getContentById(footerNavId)
    .catch(() => {
      notFound()
    })

  const categoryLinks = await getBlogCategoryLinks()

  return (
    <html
      lang="en"
      className={`${DMSansFont.variable} ${JetBrainsMonoFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-neutral-100">
        <div className="flex w-full flex-col">
          <Header mainNav={mainNav} categoryLinks={categoryLinks} />
          <main className="flex-auto">{children}</main>
          <Footer footerNav={footerNav} />
        </div>
      </body>
    </html>
  )
}
