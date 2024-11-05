import { ContentData } from '@gocontento/client'
import Link from 'next/link'

export default function SmallArticleCard({ post }: { post: ContentData }) {
  return (
    <Link
      href={`/${post.uri}`}
      className="py-6 md:px-6 lg:first:pl-0 lg:last:pr-0"
    >
      <h3 className="mb-3 text-pretty text-lg/[1.2em] font-bold text-neutral-900 md:text-base/[1.3em] lg:text-lg/[1.2em]">
        {post.fields.title.text}
      </h3>
      <p className="line-clamp-3 text-pretty text-base text-neutral-900/80 md:hidden lg:block">
        {post.fields.excerpt.text}
      </p>
    </Link>
  )
}
