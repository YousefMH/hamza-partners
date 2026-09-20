import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Meander } from '@/components/Decorative/Ornaments'

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory" role="contentinfo">
      <div className="container-editorial pt-14 pb-9 md:pt-16 md:pb-10">
        <Meander className="mb-10 w-full opacity-70 md:mb-12" tone="champagne" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-bold">{siteConfig.firmNameAr}</p>
            <p className="mt-1 text-sm text-gold-champagne">{siteConfig.firmNameEn}</p>
            <p className="mt-5 text-base leading-[1.85] text-ivory/80">{siteConfig.tagline}</p>
          </div>

          <div>
            <p className="mb-4 font-display text-base font-bold text-gold-champagne">التنقل</p>
            <ul className="space-y-2.5 text-base text-ivory/85">
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
            <p className="mb-4 font-display text-base font-bold text-gold-champagne">مجالات العمل</p>
            <ul className="space-y-2.5 text-base text-ivory/85">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="line-clamp-2 leading-relaxed transition-colors hover:text-gold-champagne"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-base font-bold text-gold-champagne">التواصل</p>
            <ul className="space-y-2.5 text-base text-ivory/85">
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
            <div className="mt-5 flex gap-4 text-base">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/80 hover:text-gold-champagne"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/80 hover:text-gold-champagne"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-sm text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 جميع الحقوق محفوظة.</p>
          <p>
            {siteConfig.firmNameAr} · {siteConfig.firmNameEn}
          </p>
        </div>
      </div>
    </footer>
  )
}
