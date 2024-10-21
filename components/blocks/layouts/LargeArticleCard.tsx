import { ContentData } from '@gocontento/client'
import Image from '@/utils/Image'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

export default function LargeArticleCard({ post }: { post: ContentData }) {
  const author = post.fields.author.content_links[0].content_link
  return (
    <div className="gap-x-9 space-y-4 border-b border-b-neutral-900 py-6 md:grid md:grid-cols-2 md:space-y-0 md:border-none lg:grid-cols-5">
      <Link href={`/${post.uri}`} className="md:cols-span-1 lg:col-span-3">
        <Image
          asset={post.fields.image.assets[0].asset}
          imgClassName="aspect-video object-cover"
        />
      </Link>
      <div className="md:cols-span-1 flex flex-col justify-between lg:col-span-2">
        <div>
          <span className="font-mono text-sm">
            {formatDate(post.published_at)}
          </span>
          <Link href={`/${post.uri}`}>
            <h2 className="mt-4 text-5xl/[1.1em] font-bold tracking-tight text-neutral-900 md:line-clamp-3 md:text-4xl/[1.1em] lg:text-6xl/[1.1em]">
              {post.fields.title.text}
            </h2>
          </Link>
          <p className="my-7 text-base text-neutral-900/80 md:line-clamp-3 lg:text-lg">
            {post.fields.excerpt.text}
          </p>
        </div>
        <Link href={`/${author.uri}`} className="flex items-center gap-x-5">
          <Image
            asset={author.fields.image.assets[0].asset}
            className="h-12 w-12 object-cover md:hidden lg:block"
          />
          <span className="text-md text-neutral-900">{author.name}</span>
        </Link>
      </div>
    </div>
  )
}
