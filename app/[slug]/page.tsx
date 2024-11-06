import { draftMode } from 'next/headers'
import { createClient, generateSeo, getArticles } from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentAPIResponse } from '@gocontento/client'
import InfoPage from '@/components/pages/InfoPage'
import PolicyPage from '@/components/pages/PolicyPage'

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
        content_type: ['info_page', 'policy_page'],
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
        content_type: ['info_page', 'policy_page'],
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
        content_type: ['info_page', 'policy_page'],
        slug: params.slug,
        limit: '1',
      },
    })
    .catch(() => {
      notFound()
    })

  const content = response.content[0]

  const posts = await getArticles()

  if (content.content_type.handle == 'info_page') {
    return <InfoPage initialContent={content} posts={posts} />
  }

  if (content.content_type.handle == 'policy_page') {
    return <PolicyPage initialContent={content} />
  }
}
