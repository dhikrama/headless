import { ContentLink } from '@/utils/Types'
import Image from '@/utils/Image'
import Link from 'next/link'
import LinkedInIcon from '../icons/LinkedInIcon'
import TwitterIcon from '../icons/TwitterIcon'

export default function AuthorCards({
  authors,
}: {
  authors: Array<ContentLink>
}) {
  return (
    <div className="border-t border-t-neutral-900 pb-2 md:pb-0">
      <h3 className="inline-block bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-50">
        Popular Authors
      </h3>
      <div className="flex flex-col justify-center">
        {authors.map((author: any) => {
          return (
            <div key={`${author.id}`} className="flex gap-x-5 py-5">
              <Link
                className="h-20 w-20 flex-shrink-0"
                href={`/${author.content_link.uri}`}
              >
                <Image
                  asset={author.content_link.fields.image.assets[0].asset}
                  apiParams="fit=crop&w=150&h=150&dpr=2&q=80"
                  imgClassName="object-cover aspect-square"
                />
              </Link>
              <div className="flex flex-col justify-between">
                <div>
                  <Link href={`/${author.content_link.uri}`}>
                    <h3 className="text-md font-bold">
                      {author.content_link.fields.name.text}
                    </h3>
                  </Link>
                  <p className="font-mono text-sm">
                    {author.content_link.fields.role.text}
                  </p>
                </div>
                <div className="flex gap-x-3 text-neutral-900">
                  <LinkedInIcon
                    href={author.content_link.fields.linked_in.text}
                  />
                  <TwitterIcon href={author.content_link.fields.twitter.text} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
