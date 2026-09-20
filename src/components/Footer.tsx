import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Meander } from '@/components/Decorative/Ornaments'

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory" role="contentinfo">
      <div className="container-editorial pt-16 pb-10">
        <Meander className="mb-12 opacity-70" tone="champagne" />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-semibold">{siteConfig.firmNameAr}</p>
            <p className="mt-1 text-xs tracking-[0.18em] text-gold-champagne uppercase">
              {siteConfig.firmNameEn}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ivory/65">{siteConfig.tagline}</p>
          </div>

          <div>
            <p className="mb-4 font-display text-sm text-gold-champagne">التنقل</p>
            <ul className="space-y-2 text-sm text-ivory/75">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-gold-champagne">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-sm text-gold-champagne">مجالات العمل</p>
            <ul className="space-y-2 text-sm text-ivory/75">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="line-clamp-1 transition-colors hover:text-gold-champagne"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-sm text-gold-champagne">التواصل</p>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li>
                <a href={siteConfig.contact.phoneHref} className="hover:text-gold-champagne">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-gold-champagne"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="leading-relaxed">{siteConfig.contact.address}</li>
            </ul>
            <div className="mt-5 flex gap-4 text-sm">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/70 hover:text-gold-champagne"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/70 hover:text-gold-champagne"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 جميع الحقوق محفوظة.</p>
          <p>
            {siteConfig.firmNameAr} · {siteConfig.firmNameEn}
          </p>
        </div>
      </div>
    </footer>
  )
}
