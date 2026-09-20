import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getTeamMemberBySlug, team } from '@/data/team'
import { siteConfig } from '@/data/siteConfig'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { DoubleLine, Meander, SectionLabel } from '@/components/Decorative/Ornaments'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z" />
    </svg>
  )
}

export function LawyerProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const member = slug ? getTeamMemberBySlug(slug) : undefined

  if (!member) {
    return (
      <>
        <Header forceSolid />
        <main className="container-editorial flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
          <h1 className="font-display text-3xl text-charcoal">الملف غير موجود</h1>
          <p className="mt-4 text-muted">تعذر العثور على ملف المحامي المطلوب.</p>
          <Link to="/#team" className="mt-8 text-gold-dark hover:text-charcoal">
            العودة إلى فريق العمل
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const others = team.filter((item) => item.id !== member.id)

  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal pt-28 pb-16 text-ivory md:pt-36 md:pb-20">
          <div className="container-editorial">
            <Link
              to="/#team"
              className="mb-8 inline-flex items-center gap-2 text-base text-ivory/85 transition-colors hover:text-gold-champagne"
            >
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              فريق العمل
            </Link>
            <Meander className="mb-8 w-full max-w-xs" tone="champagne" />
            <p className="text-sm text-ivory/65">ملف شخصي توضيحي — بيانات قابلة للاستبدال</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.4]">
              {member.name}
            </h1>
            <p className="mt-3 text-lg text-gold-champagne">{member.position}</p>
            <p className="mt-4 max-w-2xl text-lg leading-[1.85] text-ivory/88">{member.expertise}</p>
          </div>
        </section>

        <section className="section-pad bg-ivory">
          <div className="container-editorial grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <aside className="space-y-6">
              <div className="overflow-hidden border border-border bg-border">
                <img
                  src={member.image}
                  alt=""
                  className="aspect-[3/4] w-full object-cover grayscale"
                />
              </div>
              <div className="border border-border bg-white p-6">
                <p className="font-display text-base font-bold text-gold-dark">تواصل سريع</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-base text-charcoal transition-colors hover:text-gold-dark"
                >
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                </a>
                <div className="mt-6">
                  <Button href="/#contact" size="lg" className="w-full">
                    {siteConfig.cta.book}
                  </Button>
                </div>
              </div>
            </aside>

            <div>
              <SectionLabel>نبذة مهنية</SectionLabel>
              <DoubleLine className="mb-8 max-w-[7rem]" />
              <div className="max-w-2xl space-y-5">
                {member.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-lg leading-[1.9] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12">
                <SectionLabel>مجالات التركيز</SectionLabel>
                <DoubleLine className="mb-8 max-w-[7rem]" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {member.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="border border-border bg-white px-4 py-3 text-base leading-relaxed text-charcoal"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <div>
                  <SectionLabel>التعليم</SectionLabel>
                  <DoubleLine className="mb-6 max-w-[5rem]" />
                  <ul className="space-y-3">
                    {member.education.map((item) => (
                      <li key={item} className="body-copy text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <SectionLabel>اللغات</SectionLabel>
                  <DoubleLine className="mb-6 max-w-[5rem]" />
                  <ul className="space-y-3">
                    {member.languages.map((item) => (
                      <li key={item} className="body-copy text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {others.length > 0 && (
                <div className="mt-14 border-t border-border pt-10">
                  <p className="font-display text-base font-bold text-gold-dark">أعضاء آخرون في الفريق</p>
                  <ul className="mt-5 space-y-4">
                    {others.map((item) => (
                      <li key={item.id} className="border-b border-border pb-4">
                        <Link
                          to={`/team/${item.slug}`}
                          className="font-display text-lg text-charcoal transition-colors hover:text-gold-dark"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted">{item.position}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
