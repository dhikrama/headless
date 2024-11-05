import { ContentData } from '@gocontento/client'
import Image from '@/utils/Image'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

export default function LargeArticleCard({ post }: { post: ContentData }) {
  const author = post.fields.author.content_links[0].content_link
  return (
    <div className="gap-x-9 space-y-4 pb-7 md:grid md:grid-cols-5 md:space-y-0">
      <Link href={`/${post.uri}`} className="md:col-span-2 lg:col-span-3">
        <Image
          asset={post.fields.image.assets[0].asset}
          apiParams="fit=crop&w=1200&dpr=2&q=80"
          imgClassName="aspect-video md:aspect-square lg:aspect-video object-cover"
        />
      </Link>
      <div className="flex flex-col justify-between md:col-span-3 lg:col-span-2">
        <div>
          <span className="font-mono text-sm">
            {formatDate(post.published_at)}
          </span>
          <Link href={`/${post.uri}`}>
            <h2 className="mt-4 text-pretty text-4xl/[1.1em] font-bold tracking-tight text-neutral-900 md:line-clamp-3 2xl:text-6xl/[1.1em]">
              {post.fields.title.text}
            </h2>
          </Link>
          <p className="my-7 text-base text-neutral-900/80 md:line-clamp-3 lg:text-lg">
            {post.fields.excerpt.text}
          </p>
        </div>
        <Link
          href={`/${author.uri}`}
          className="flex items-center gap-x-5 md:hidden lg:flex"
        >
          <Image
            asset={author.fields.image.assets[0].asset}
            className="flex-shrink-0 object-cover"
            imgClassName="w-12 h-12"
            apiParams="fit=crop&w=30&h=30&dpr=2&q=80"
          />
          <span className="text-md text-neutral-900">{author.name}</span>
        </Link>
      </div>
    </div>
  )
}
