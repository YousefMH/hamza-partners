import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import {
  submitContactRequest,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '@/lib/form'
import { Button } from '@/components/ui/Button'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/cn'

const initialValues: ContactFormValues = {
  fullName: '',
  email: '',
  phone: '',
  serviceType: '',
  message: '',
}

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const onChange = (
    field: keyof ContactFormValues,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      setServerMessage('')
      return
    }

    setStatus('submitting')
    setServerMessage('')
    try {
      const response = await submitContactRequest(values)
      if (response.ok) {
        setStatus('success')
        setServerMessage(response.message)
        setValues(initialValues)
      } else {
        setStatus('error')
        setServerMessage(response.message || 'تعذر إرسال الطلب. حاول مرة أخرى.')
      }
    } catch {
      setStatus('error')
      setServerMessage('حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.')
    }
  }

  const fieldClass =
    'w-full border border-border bg-white px-4 py-3.5 text-base text-charcoal outline-none transition-colors placeholder:text-muted/70 focus:border-gold'

  return (
    <section id="contact" className="section-pad bg-white" aria-labelledby="contact-heading">
      <div className="container-editorial">
        <motion.div
          className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>تواصل</SectionLabel>
            </motion.div>
            <motion.h2 id="contact-heading" variants={fadeUp} className="section-title">
              تواصل معنا
            </motion.h2>
            <motion.div variants={fadeUp} className="section-rule">
              <DoubleLine />
            </motion.div>
            <motion.p variants={fadeUp} className="lede">
              أرسل طلبك وسنتواصل معك لمناقشة احتياجاتك القانونية. بيانات التواصل أدناه توضيحية
              وقابلة للاستبدال.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-8 space-y-4 text-base md:mt-10 md:space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-muted">الهاتف</p>
                  <a href={siteConfig.contact.phoneHref} className="text-charcoal hover:text-gold-dark">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-muted">واتساب</p>
                  <a
                    href={siteConfig.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-gold-dark"
                  >
                    {siteConfig.contact.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-muted">البريد الإلكتروني</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-charcoal hover:text-gold-dark"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-muted">العنوان</p>
                  <p className="text-charcoal">{siteConfig.contact.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-muted">ساعات العمل</p>
                  <p className="text-charcoal">{siteConfig.contact.hours}</p>
                </div>
              </li>
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 aspect-[16/10] overflow-hidden border border-border bg-ivory md:mt-10">
              <iframe
                title="موقع المكتب على الخريطة"
                src={siteConfig.contact.mapEmbedUrl}
                className="h-full w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            noValidate
            className="border border-border bg-ivory p-6 md:p-8"
            aria-describedby="contact-form-status"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-base text-charcoal">
                  الاسم الكامل
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  className={cn(fieldClass, errors.fullName && 'border-red-700')}
                  value={values.fullName}
                  onChange={(e) => onChange('fullName', e.target.value)}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-base text-charcoal">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={cn(fieldClass, errors.email && 'border-red-700')}
                    value={values.email}
                    onChange={(e) => onChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-700" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-base text-charcoal">
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={cn(fieldClass, errors.phone && 'border-red-700')}
                    value={values.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-700" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="serviceType" className="mb-2 block text-base text-charcoal">
                  نوع الخدمة
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className={cn(fieldClass, errors.serviceType && 'border-red-700')}
                  value={values.serviceType}
                  onChange={(e) => onChange('serviceType', e.target.value)}
                >
                  <option value="">اختر الخدمة</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-base text-charcoal">
                  رسالتك
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={cn(fieldClass, 'resize-y', errors.message && 'border-red-700')}
                  value={values.message}
                  onChange={(e) => onChange('message', e.target.value)}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto">
                {status === 'submitting' ? 'جاري الإرسال...' : siteConfig.cta.submit}
              </Button>

              <div id="contact-form-status" aria-live="polite" className="min-h-[1.5rem] text-sm">
                {status === 'success' && (
                  <p className="text-emerald-800">{serverMessage}</p>
                )}
                {status === 'error' && <p className="text-red-700">{serverMessage}</p>}
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
