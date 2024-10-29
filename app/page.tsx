<<<<<<< HEAD
import { createClient, generateSeo, getArticles } from '@/lib/contento'
=======
import { createClient, generateSeo, getBlogPosts } from '@/lib/contento'
>>>>>>> 2b08fd0fe2dd2df7aaaeb0e1285ba7fb5aec1d0a
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import GeneralPage from '@/components/pages/GeneralPage'
import { Metadata } from 'next'
import { ContentData } from '@gocontento/client'

export async function generateMetadata(): Promise<Metadata> {
  return await createClient()
    .getContentBySlug('home', 'general_page')
    .then((content: ContentData) => {
      return generateSeo(content, {}, content.url?.replace('/home', ''))
    })
    .catch(() => {
      return {}
    })
}

export default async function page() {
  const content = await createClient(draftMode().isEnabled)
    .getContentBySlug('home', 'general_page')
    .catch(() => {
      notFound()
    })

  const posts = await getArticles()

  return <GeneralPage initialContent={content} posts={posts} />
}
