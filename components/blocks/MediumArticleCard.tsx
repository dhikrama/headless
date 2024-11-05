import { ContentData } from '@gocontento/client'
import Image from '@/utils/Image'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

export default function MediumArticleCard({ post }: { post: ContentData }) {
  return (
    <div className="lg:grid lg:grid-cols-7 lg:gap-x-5">
      {/* // JOSH HELP?? - Lots of space below image */}
      <Link href={`/${post.uri}`} className="col-span-3">
        <Image
          asset={post.fields.image.assets[0].asset}
          imgClassName="object-cover aspect-video lg:aspect-square"
          apiParams="fit=crop&w=400&h=400&dpr=2&q=80"
        />
      </Link>
      <div className="col-span-4 mt-6 flex flex-col lg:mt-0">
        <span className="mb-3 font-mono text-sm">
          {formatDate(post.published_at)}
        </span>
        <Link href={`/${post.uri}`}>
          <h3 className="mb-3 line-clamp-3 text-pretty text-2xl/[1.2em] font-bold text-neutral-900">
            {post.fields.title.text}
          </h3>
        </Link>
        <p className="line-clamp-2 text-base text-neutral-900/80">
          {post.fields.excerpt.text}
        </p>
      </div>
    </div>
  )
}
