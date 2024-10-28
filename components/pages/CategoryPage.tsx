'use client'

import { useLivePreview } from '@gocontento/next'
import { ContentData } from '@gocontento/client/lib/types'
import LargeArticleCard from '../blocks/LargeArticleCard'
import MediumArticleCard from '../blocks/MediumArticleCard'

export default function BlogCategory({
  initialContent,
  posts,
}: {
  initialContent: ContentData
  posts: ContentData[]
}) {
  const { content } = useLivePreview({ content: initialContent })

  // Takes just the first post to use as large article card at top of section

  const firstPost = posts[0]

  // Removes the first post from the filtered content so there isn't a duplicate in the medium article cards

  const categoryPosts = posts.slice(1)

  return (
    <div className="mx-auto px-4 pb-6 md:px-16">
      <LargeArticleCard post={firstPost} />
      <div className="mt-6 border-t border-t-neutral-900">
        <h3 className="inline-block bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-50">
          {content.name}
        </h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 pb-12 pt-6">
          {categoryPosts.map((post: ContentData, index: number) => {
            return <MediumArticleCard post={post} key={`article-${index}`} />
          })}
        </div>
      </div>
    </div>
  )
}
