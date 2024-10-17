import { createClient, getBlogPosts } from '@/lib/contento'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import GeneralPage from '@/components/pages/GeneralPage'

type Props = {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {
  const content = await createClient(draftMode().isEnabled)
    .getContentBySlug('home', 'general_page')
    .catch(() => {
      notFound()
    })

  const posts = await getBlogPosts()

  return <GeneralPage initialContent={content} posts={posts} />
}
