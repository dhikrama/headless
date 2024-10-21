import { ContentData } from '@gocontento/client'
import Image from '@/utils/Image'
import { formatDate } from '@/utils/formatDate'

export default function MediumArticleCard({ post }: { post: ContentData }) {
  return (
    <div className="grid grid-cols-7 gap-x-5">
      <Image
        asset={post.fields.image.assets[0].asset}
        className="col-span-3 flex-shrink-0"
        imgClassName="object-cover aspect-square"
      />
      <div className="col-span-4 flex flex-col">
        <span className="mb-3 font-mono text-sm">
          {formatDate(post.published_at)}
        </span>
        <h3 className="mb-3 text-pretty text-2xl/[1.2em] font-bold text-neutral-900">
          {post.fields.title.text}
        </h3>
        <p className="line-clamp-2 text-base text-neutral-900/80">
          {post.fields.excerpt.text}
        </p>
      </div>
    </div>
  )
}
