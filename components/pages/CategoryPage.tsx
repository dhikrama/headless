'use client'

import { useLivePreview } from '@gocontento/next'
import { ContentData } from '@gocontento/client/lib/types'
import LargeArticleCard from '../blocks/layouts/LargeArticleCard'
import MediumArticleCard from '../blocks/layouts/MediumArticleCard'

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

  // Removes the first post from the filtered content so there isn't a duplicate in the small article cards

  const categoryPosts = posts.slice(1)

  return (
    <div className="mx-auto px-4 pb-6 md:px-16">
      <LargeArticleCard post={firstPost} />
      <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10 border-t border-t-neutral-900 py-16">
        {categoryPosts.map((post) => {
          return <MediumArticleCard post={post} />
        })}
      </div>
    </div>
  )
}
