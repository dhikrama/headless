'use client'

import { ContentData } from '@gocontento/client/lib/types'
import { useLivePreview } from '@gocontento/next'

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
        <h1 className="text-6xl/[1.1em] font-bold tracking-tight">
          {content.title.text}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: content.fields.post_body.text,
          }}
          className="prose prose-lg"
        />
      </div>
    </div>
  )
}
