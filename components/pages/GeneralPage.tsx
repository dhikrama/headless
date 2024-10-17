'use client'

import { ContentData } from '@gocontento/client/lib/types'
import { useLivePreview } from '@gocontento/next'
import BlockMatcher from '../BlockMatcher'

export default function GeneralPage({
  initialContent,
  posts,
}: {
  initialContent: ContentData
  posts: ContentData[]
}) {
  const { content } = useLivePreview({ content: initialContent })

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 md:px-16">
        <BlockMatcher posts={posts} blocks={content.fields.content.blocks} />
      </div>
    </div>
  )
}
