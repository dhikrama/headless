import { draftMode } from 'next/headers'
import { createClient, generateSeo, getArticles } from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticlePage from '@/components/pages/ArticlePage'
import { ContentAPIResponse, ContentData } from '@gocontento/client'

const client = createClient()

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return await client
    .getContentByType({
      contentType: 'article',
      limit: 100,
    })
    .then((response: ContentAPIResponse) => {
      return response.content.map((content) => ({
        slug: content.slug,
      }))
    })
    .catch(() => {
      return []
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await client
    .getContentBySlug(params.slug, 'article')
    .then((content: ContentData) => {
      return generateSeo(content, {
        type: 'article',
        publishedTime: content.published_at ?? undefined,
        modifiedTime: content.updated_at,
        authors: content.fields.author.content_links[0].content_link.url,
        section: content.fields.category.content_links[0].content_link.name,
      })
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  const post = await createClient(draftMode().isEnabled)
    .getContentBySlug(params.slug, 'article')
    .catch(() => {
      notFound()
    })

  const posts = await getArticles()

  return <ArticlePage initialContent={post} posts={posts} />
}
