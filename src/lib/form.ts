export interface ContactFormValues {
  fullName: string
  email: string
  phone: string
  serviceType: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+0-9\s()-]{8,20}$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'يرجى إدخال الاسم الكامل'
  }

  if (!values.email.trim() || !emailPattern.test(values.email.trim())) {
    errors.email = 'يرجى إدخال بريد إلكتروني صالح'
  }

  if (!values.phone.trim() || !phonePattern.test(values.phone.trim())) {
    errors.phone = 'يرجى إدخال رقم هاتف صالح'
  }

  if (!values.serviceType.trim()) {
    errors.serviceType = 'يرجى اختيار نوع الخدمة'
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'يرجى كتابة رسالة أوضح (١٠ أحرف على الأقل)'
  }

  return errors
}

export interface ContactApiPayload extends ContactFormValues {
  source: 'landing-contact'
  submittedAt: string
}

export interface ContactApiResponse {
  ok: boolean
  id?: string
  message: string
}

/** Mock API — replace with real endpoint when backend is ready */
export async function submitContactRequest(
  values: ContactFormValues,
): Promise<ContactApiResponse> {
  const payload: ContactApiPayload = {
    ...values,
    source: 'landing-contact',
    submittedAt: new Date().toISOString(),
  }

  await new Promise((resolve) => setTimeout(resolve, 900))

  if (import.meta.env.DEV) {
    console.info('[mock contact API]', payload)
  }

  return {
    ok: true,
    id: `req_${Date.now()}`,
    message: 'تم استلام طلبك بنجاح. سنتواصل معك قريبًا.',
  }
}
