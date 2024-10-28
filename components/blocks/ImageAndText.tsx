import { BlockData } from '@gocontento/client'
import Image from '@/utils/Image'
import Link from 'next/link'
import { classNames } from '@/utils/ClassNames'

export default function ImageAndText({ block }: { block: BlockData }) {
  const image = block.fields.image.assets && (
    <div>
      <Image
        asset={block.fields.image.assets[0].asset}
        className="h-full w-full object-cover"
      />
    </div>
  )
  return (
    <div className="mx-auto grid max-w-[1450px] items-center space-y-6 py-16 md:grid-cols-2 md:gap-x-16 md:space-y-0">
      {block.fields.image_side.selected_option.value === 'left' && <>{image}</>}
      <div
        className={classNames(
          block.fields.image_side.selected_option.value === 'left'
            ? '2xl:translate-x-[40px]'
            : '',
        )}
      >
        {block.fields.subtitle.text && (
          <p className="mb-4 font-mono text-base">
            {block.fields.subtitle.text}
          </p>
        )}
        {block.fields.is_hero.is_on ? (
          <h1 className="text-pretty text-4xl/[1.1em] font-bold tracking-tight text-neutral-900 lg:text-6xl/[1.1em]">
            {block.fields.title.text}
          </h1>
        ) : (
          <h2 className="text-pretty text-4xl/[1.1em] font-bold tracking-tight text-neutral-900 lg:text-6xl/[1.1em]">
            {block.fields.title.text}
          </h2>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: block.fields.text.text }}
          className="prose mb-12 mt-6 text-lg lg:w-3/4"
        />
        {block.fields.button.blocks &&
          block.fields.button.blocks.map((button: BlockData) => {
            return (
              <Link
                key={`button-${button.fields.button_text.text}`}
                href={button.fields.button_url.text}
                className="border border-neutral-900 px-6 py-3 hover:bg-neutral-900 hover:text-neutral-50"
              >
                {button.fields.button_text.text}
              </Link>
            )
          })}
      </div>
      {block.fields.image_side.selected_option.value === 'right' && (
        <>{image}</>
      )}
    </div>
  )
}
