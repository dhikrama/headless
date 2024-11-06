'use client'

import { ContentData } from '@gocontento/client/lib/types'
import { useLivePreview } from '@gocontento/next'

export default function GeneralPage({
  initialContent,
}: {
  initialContent: ContentData
}) {
  const { content } = useLivePreview({ content: initialContent })

  return (
    <div>
      <div className="mx-auto px-4 py-9 md:px-16">
        <h1 className="text-4xl/[1.1em] font-bold tracking-tight lg:text-6xl/[1.1em]">
          {content.fields.title.text}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: content.fields.content.text,
          }}
          className="prose prose-lg mt-7"
        />
      </div>
    </div>
  )
}
