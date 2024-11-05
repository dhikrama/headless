import Link from 'next/link'
import { ContentData } from '@gocontento/client'
import { MouseEventHandler } from 'react'
import { classNames } from '@/utils/ClassNames'

export default function CategoryPill({
  category,
  onClick,
  pathName,
}: {
  category: ContentData
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
  pathName: string
}) {
  return (
    category &&
    category.slug && (
      <Link
        href={`/${category.uri}`}
        onClick={onClick}
        className={classNames(
          'hover:bold not-prose p-2 font-mono text-sm text-neutral-50 first:pl-0 md:text-neutral-900',
          pathName.endsWith(category.slug)
            ? 'font-bold md:font-normal md:underline md:underline-offset-4'
            : '',
        )}
      >
        {category.name}
      </Link>
    )
  )
}
