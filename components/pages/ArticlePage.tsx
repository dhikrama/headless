'use client'

import { ContentData } from '@gocontento/client'
import { useLivePreview } from '@gocontento/next'
import { formatDate } from '@/utils/formatDate'
import Image from '@/utils/Image'
import Link from 'next/link'
import LatestPosts from '../blocks/LatestPosts'
import CategoryPosts from '../blocks/CategoryPosts'

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
      <div className="xl:grid xl:grid-cols-7 xl:gap-x-10">
        <div className="xl:col-span-5">
          <Image
            asset={content.fields.image.assets[0].asset}
            imgClassName="aspect-video md:aspect-[9/4] object-cover mb-7"
            apiParams="fit=crop&w=1200&dpr=2&q=80"
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
          <h1 className="mt-6 text-pretty text-4xl/[1.1em] font-bold tracking-tight text-neutral-900 md:line-clamp-4 md:text-5xl/[1.1em] lg:text-6xl/[1.1em]">
            {content.fields.title.text}
          </h1>
          <Link
            href={`/${author.uri}`}
            className="my-9 flex items-center gap-x-5"
          >
            <Image
              asset={author.fields.image.assets[0].asset}
              className="flex-shrink-0 object-cover md:hidden lg:block"
              imgClassName="w-12 h-12"
              apiParams="fit=crop&w=30&h=30&dpr=2&q=80"
            />
            <span className="text-md text-neutral-900">{author.name}</span>
          </Link>
          <div className="border-t border-t-neutral-900 pb-16 pt-9">
            <div
              dangerouslySetInnerHTML={{
                __html: content.fields.post_body.text,
              }}
              className="prose prose-lg"
            />
          </div>
        </div>
        <div className="space-y-6 md:flex md:gap-x-10 md:space-y-0 xl:col-span-2 xl:flex-col">
          <LatestPosts posts={latestPosts} className="md:flex-1 xl:flex-none" />
          <CategoryPosts
            posts={posts}
            currentPost={content}
            className="md:flex-1 xl:flex-none"
          />
        </div>
      </div>
    </div>
  )
}
