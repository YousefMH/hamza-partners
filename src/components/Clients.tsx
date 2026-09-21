import { motion, useReducedMotion } from 'framer-motion'
import { clientLogoUrl, clients, type Client } from '@/data/clients'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import {
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  viewportReading,
} from '@/lib/motion'
import { cn } from '@/lib/cn'

function ClientLogo({ client }: { client: Client }) {
  return (
    <div
      className={cn(
        'flex h-16 w-[9.5rem] shrink-0 items-center justify-center px-3 md:h-[4.5rem] md:w-44',
        'opacity-70 grayscale transition-[opacity,filter] duration-300',
        'hover:opacity-100 hover:grayscale-0',
      )}
    >
      <img
        src={clientLogoUrl(client.logo)}
        alt={client.name}
        title={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-9 max-w-full object-contain md:max-h-10"
      />
    </div>
  )
}

/**
 * Full-bleed client logo marquee after Services.
 * Duplicated track + CSS animation; pauses when reduced motion is on.
 */
export function Clients() {
  const reduce = useReducedMotion()
  const loop = [...clients, ...clients]

  return (
    <section
      id="clients"
      className="overflow-hidden bg-white py-12 md:py-14"
      aria-labelledby="clients-heading"
    >
      <div className="container-editorial">
        <motion.div
          className="mx-auto max-w-2xl text-center md:mx-0 md:max-w-none md:text-start"
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)}>
            <SectionLabel>عملاؤنا</SectionLabel>
          </motion.div>
          <motion.h2
            id="clients-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="section-title"
          >
            يثق بنا قادة الأعمال
          </motion.h2>
          <motion.div variants={readingVariants(reduce, fadeUp)} className="section-rule">
            <DoubleLine />
          </motion.div>
          <motion.p variants={readingVariants(reduce, fadeUpSoft)} className="lede">
            شركات ومؤسسات من قطاعات متعددة تختار استشارتنا القانونية.
          </motion.p>
        </motion.div>
      </div>

      <div
        className="clients-marquee relative mt-10 md:mt-12"
        aria-label="شريط شعارات العملاء"
      >
        <div className="clients-marquee-fade pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-l from-transparent to-white md:w-16" />
        <div className="clients-marquee-fade pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-r from-transparent to-white md:w-16" />

        <div
          dir="ltr"
          className="overflow-hidden border-y border-border/80 bg-ivory/60 py-6 md:py-8"
        >
          <ul
            className={cn(
              'clients-marquee-track flex w-max items-center gap-6 md:gap-10',
              reduce && 'clients-marquee-track--static',
            )}
          >
            {loop.map((client, index) => (
              <li
                key={`${client.id}-${index}`}
                className="list-none"
                aria-hidden={index >= clients.length ? true : undefined}
              >
                <ClientLogo client={client} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
