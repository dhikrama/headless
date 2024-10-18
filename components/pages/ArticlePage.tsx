'use client'

import { ContentData } from '@gocontento/client'
import { useLivePreview } from '@gocontento/next'
import { formatDate } from '@/utils/formatDate'
import Image from '@/utils/Image'
import Link from 'next/link'
import LatestPosts from '../blocks/layouts/LatestPosts'
import CategoryPosts from '../blocks/layouts/CategoryPosts'

export default function ArticlePage({
  initialContent,
  posts,
}: {
  initialContent: ContentData
  posts: ContentData[]
}) {
  const { content } = useLivePreview({ content: initialContent })
  const author = content.fields.author.content_links[0].content_link

  // Removes current post from posts array

  const postsWithoutFeatured = posts.filter((post) => post.slug != content.slug)

  // Gets latest five posts

  const latestPosts = postsWithoutFeatured.slice(0, 5)

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-16">
      <div className="gap-x-16 md:grid md:grid-cols-5 lg:grid-cols-7">
        <div className="md:col-span-3 lg:col-span-5">
          <Image
            asset={content.fields.image.assets[0].asset}
            imgClassName="aspect-square md:aspect-[9/4] object-cover mb-7"
            apiParams="fit=crop&w=1200&dpr=2"
          />
          <div className=" flex items-center gap-x-5">
            <span className="font-mono text-sm">
              {formatDate(content.published_at)}
            </span>
            <span>/</span>
            <Link
              href={`/${content.fields.category.content_links[0].content_link.uri}`}
              className="font-mono text-sm"
            >
              {content.fields.category.content_links[0].content_link.name}
            </Link>
          </div>
          <h1 className="mt-6 text-4xl/[1.1em] font-bold tracking-tight text-neutral-900 md:line-clamp-4 lg:text-6xl/[1.1em]">
            {content.fields.title.text}
          </h1>
          <Link
            href={`/${author.uri}`}
            className="my-9 flex items-center gap-x-5"
          >
            <Image
              asset={author.fields.image.assets[0].asset}
              className="h-12 w-12 object-cover md:hidden lg:block"
            />
            <span className="text-md text-neutral-900">{author.name}</span>
          </Link>
          <div className="border-t border-t-neutral-900 pb-16 pt-9">
            <div
              dangerouslySetInnerHTML={{
                __html: content.fields.post_body.text,
              }}
              className="prose"
            />
          </div>
        </div>
        <div className="col-span-2">
          <LatestPosts posts={latestPosts} />
          <CategoryPosts posts={posts} currentPost={content} />
        </div>
      </div>
    </div>
  )
}
