import Link from 'next/link'
import Image from '@/utils/Image'
import { ContentData } from '@gocontento/client'

export default function LatestPosts({
  posts,
  className,
}: {
  posts: ContentData[]
  className?: string
}) {
  return (
    <div className={`border-t border-t-neutral-900 pb-6 ${className}`}>
      <h3 className="inline-block bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-50">
        Latest
      </h3>
      <div className="flex flex-col justify-between">
        {posts.map((post) => {
          return (
            <div key={`${post.id}`} className="flex gap-x-5 py-4">
              <Link className="h-20 w-20 flex-shrink-0" href={`/${post.uri}`}>
                <Image
                  asset={post.fields.image.assets[0].asset}
                  imgClassName="object-cover aspect-square"
                />
              </Link>
              <div className="flex flex-col justify-between">
                <Link href={`/${post.uri}`}>
                  <h3 className="text-md text-pretty font-bold">
                    {post.fields.title.text}
                  </h3>
                </Link>
                <Link
                  href={`/${post.fields.category.content_links[0].content_link.uri}`}
                  className="font-mono text-sm"
                >
                  {post.fields.category.content_links[0].content_link.name}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
