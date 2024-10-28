import { draftMode } from 'next/headers'
import { createClient, generateSeo, getBlogPosts } from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentAPIResponse } from '@gocontento/client'
import InfoPage from '@/components/pages/InfoPage'

const client = createClient()

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return await client
    .getContent({
      params: {
        content_type: ['info_page'],
        limit: '100',
      },
    })
    .then((response: ContentAPIResponse) => {
      return response.content
        .map((content) => ({
          slug: content.slug,
        }))
        .filter((o) => o.slug !== 'home')
    })
    .catch(() => {
      return []
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await client
    .getContent({
      params: {
        content_type: ['info_page'],
        slug: params.slug,
        limit: '1',
      },
    })
    .then((response: ContentAPIResponse) => {
      return generateSeo(response.content[0])
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  const response = await createClient(draftMode().isEnabled)
    .getContent({
      params: {
        content_type: ['info_page'],
        slug: params.slug,
        limit: '1',
      },
    })
    .catch(() => {
      notFound()
    })

  const content = response.content[0]

  const posts = await getBlogPosts()

  return <InfoPage initialContent={content} posts={posts} />
}
