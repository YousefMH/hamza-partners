import { motion } from 'framer-motion'
import { articles } from '@/data/articles'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

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
  return (
    <section id="articles" className="section-pad bg-ivory" aria-labelledby="articles-heading">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>المعرفة</SectionLabel>
          </motion.div>
          <motion.h2 id="articles-heading" variants={fadeUp} className="section-title">
            المقالات والرؤى القانونية
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 max-w-[7rem]">
            <DoubleLine />
          </motion.div>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-10 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {articles.map((article) => (
            <motion.li key={article.id} variants={fadeUp}>
              <article className="flex h-full flex-col border-t border-gold/50 pt-6">
                <p className="text-sm font-bold text-gold-dark">{article.category}</p>
                <h3 className="mt-3 font-display text-xl leading-[1.6] text-charcoal">
                  {article.title}
                </h3>
                <p className="body-copy mt-4 flex-1">{article.excerpt}</p>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <time dateTime={article.date} className="text-sm text-muted">
                    {formatDate(article.date)}
                  </time>
                  <a
                    href={article.href}
                    className="text-base font-bold text-gold-dark transition-colors hover:text-charcoal"
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
