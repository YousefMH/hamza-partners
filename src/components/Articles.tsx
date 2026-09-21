import { motion, useReducedMotion } from 'framer-motion'
import { articles } from '@/data/articles'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import {
  fadeUp,
  readingStagger,
  readingVariants,
  staggerContainer,
  staggerReading,
  viewportReading,
} from '@/lib/motion'

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function Articles() {
  const reduce = useReducedMotion()

  return (
    <section id="articles" className="section-pad bg-ivory" aria-labelledby="articles-heading">
      <div className="container-editorial">
        <motion.div
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)}>
            <SectionLabel>المعرفة</SectionLabel>
          </motion.div>
          <motion.h2
            id="articles-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="section-title"
          >
            المقالات والرؤى القانونية
          </motion.h2>
          <motion.div variants={readingVariants(reduce, fadeUp)} className="section-rule">
            <DoubleLine />
          </motion.div>
        </motion.div>

        <motion.ul
          className="section-body grid gap-10 lg:grid-cols-3 lg:gap-12"
          variants={readingStagger(reduce, staggerReading)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {articles.map((article) => (
            <motion.li key={article.id} variants={readingVariants(reduce, fadeUp)}>
              <article className="flex h-full flex-col border-t border-gold/40 pt-7 text-center md:text-start">
                <div className="flex flex-col items-center gap-2 md:items-start">
                  <p className="text-xs font-bold tracking-[0.14em] text-gold-dark">
                    {article.category}
                  </p>
                  <time dateTime={article.date} className="text-sm text-muted">
                    {formatDate(article.date)}
                  </time>
                </div>
                <h3 className="mt-4 font-display text-xl leading-[1.55] text-charcoal md:mt-5">
                  {article.title}
                </h3>
                <p className="body-copy mt-4 flex-1">{article.excerpt}</p>
                <div className="mt-7 flex items-center justify-center border-t border-border pt-5 md:justify-start">
                  <a
                    href={article.href}
                    className="inline-flex border-b border-gold/40 pb-0.5 text-sm font-bold tracking-wide text-gold-dark transition-colors hover:border-gold hover:text-charcoal sm:text-base"
                  >
                    {siteConfig.cta.readArticle}
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
