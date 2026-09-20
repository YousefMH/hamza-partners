import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Meander } from '@/components/Decorative/Ornaments'

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory" role="contentinfo">
      <div className="container-editorial pt-14 pb-9 md:pt-16 md:pb-10">
        <Meander className="mb-10 w-full opacity-70 md:mb-12" tone="champagne" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-12 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <p className="font-display text-xl font-bold">{siteConfig.firmNameAr}</p>
            <p className="mt-1 text-sm text-gold-champagne">{siteConfig.firmNameEn}</p>
            <p className="mt-5 max-w-md text-base leading-[1.85] text-ivory/80">{siteConfig.tagline}</p>
          </div>

          <div>
            <p className="mb-3 font-display text-sm font-bold text-gold-champagne sm:mb-4 sm:text-base">
              التنقل
            </p>
            <ul className="space-y-2 text-sm text-ivory/85 sm:space-y-2.5 sm:text-base">
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
            <p className="mb-3 font-display text-sm font-bold text-gold-champagne sm:mb-4 sm:text-base">
              التواصل
            </p>
            <ul className="space-y-2 text-sm text-ivory/85 sm:space-y-2.5 sm:text-base">
              <li>
                <a href={siteConfig.contact.phoneHref} className="hover:text-gold-champagne">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all hover:text-gold-champagne"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="leading-relaxed">{siteConfig.contact.address}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-4 text-sm sm:mt-5 sm:text-base">
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

          <div className="col-span-2 lg:col-span-1">
            <p className="mb-3 font-display text-sm font-bold text-gold-champagne sm:mb-4 sm:text-base">
              مجالات العمل
            </p>
            <ul className="grid grid-cols-1 gap-y-2 text-sm text-ivory/85 sm:space-y-2.5 sm:text-base md:grid-cols-2 md:gap-x-6 lg:grid-cols-1">
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
