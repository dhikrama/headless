'use client'

import { useLivePreview } from '@gocontento/next'
import { ContentData, ContentLinkData } from '@gocontento/client/lib/types'
import Image from '@/utils/Image'
import TwitterIcon from '../icons/TwitterIcon'
import LinkedInIcon from '../icons/LinkedInIcon'
import MediumArticleCard from '../blocks/MediumArticleCard'
import LargeArticleCard from '../blocks/LargeArticleCard'
import { ContentLink } from '@/utils/Types'
import Link from 'next/link'

export default function BlogAuthor({
  initialContent,
  posts,
  categoryLinks,
}: {
  initialContent: ContentData
  posts: ContentData[]
  categoryLinks: ContentData[]
}) {
  const { content } = useLivePreview({ content: initialContent })

  // Get popular articles for author

  const popularArticles = content.fields.articles.content_links

  // Remove popular articles from all author articles so there aren't any duplicates in the medium article cards

  // creates an array of ids from the popular articles list

  const popularArticleIds = popularArticles.map(
    (article: ContentLink) => article.content_link.id,
  )

  // All authors posts filtered to _not_ have an id in popularIds

  const filteredArticles = posts.filter(
    (post) => !popularArticleIds.includes(post.id),
  )

  return (
    <div className="mx-auto px-4 md:px-16">
      <div className="gap-x-16 lg:grid lg:grid-cols-7">
        <div className="lg:col-span-3 xl:col-span-2">
          <Image
            asset={content.fields.image.assets[0].asset}
            imgClassName="object-cover"
          />
          <h1 className="mb-5 mt-7 text-4xl font-bold tracking-tight">
            {content.fields.name.text}
          </h1>
          <p className="mb-1 text-lg font-bold">{content.fields.role.text}</p>
          <p className="text-lg md:w-3/4 lg:w-full">
            {content.fields.bio.text}
          </p>
          <div className="mt-7 flex space-x-3 pb-2">
            <TwitterIcon href={content.fields.twitter.text} />
            <LinkedInIcon href={content.fields.linked_in.text} />
          </div>
          <div className="mt-6 border-t border-t-neutral-900 pb-6">
            <h3 className="inline-block bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-50">
              Popular Articles
            </h3>
            <div className="flex flex-col justify-center">
              {popularArticles.map((post: ContentLink) => {
                return (
                  <div
                    key={`${post.content_link.id}`}
                    className="flex gap-x-5 py-4"
                  >
                    <Link
                      className="h-20 w-20 flex-shrink-0"
                      href={`/${post.content_link.uri}`}
                    >
                      <Image
                        asset={post.content_link.fields.image.assets[0].asset}
                        className="h-64 w-64"
                        imgClassName="object-cover aspect-square"
                      />
                    </Link>
                    <div className="flex flex-col justify-between">
                      <Link href={`/${post.content_link.uri}`}>
                        <h3 className="line-clamp-3 text-pretty text-base font-bold leading-tight sm:w-3/4 md:text-xl lg:w-full lg:text-base">
                          {post.content_link.fields.title.text}
                        </h3>
                      </Link>
                      <Link
                        href={`/${post.content_link.fields.category.content_links[0].content_link.uri}`}
                        className="font-mono text-sm"
                      >
                        {
                          post.content_link.fields.category.content_links[0]
                            .content_link.name
                        }
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="gap-10 space-y-10 border-t border-t-neutral-900 pb-16 pt-10 md:grid md:grid-cols-2 md:space-y-0 lg:col-span-4 lg:grid-cols-1 lg:border-none lg:pt-0 xl:col-span-5 xl:grid-cols-2">
          {filteredArticles.map((post) => {
            return <MediumArticleCard post={post} key={`post-${post.id}`} />
          })}
        </div>
      </div>
    </div>
  )
}
