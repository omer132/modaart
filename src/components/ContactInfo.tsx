import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    details: [
      'ModaArt Sanat Galerisi',
      'Bağdat Caddesi No: 123',
      'Kadıköy, İstanbul 34710',
      'Türkiye'
    ]
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: [
      '+90 (212) 555 0123',
      '+90 (212) 555 0124',
      'Pazartesi - Cuma: 09:00 - 18:00'
    ]
  },
  {
    icon: Mail,
    title: 'E-posta',
    details: [
      'info@modaart.com',
      'destek@modaart.com',
      'siparis@modaart.com'
    ]
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    details: [
      'Pazartesi - Cuma: 09:00 - 18:00',
      'Cumartesi: 10:00 - 16:00',
      'Pazar: Kapalı'
    ]
  }
]

const faqs = [
  {
    question: 'Siparişim ne zaman teslim edilir?',
    answer: 'Tüm siparişleriniz 2-3 iş günü içinde kargo ile teslim edilir. İstanbul içi teslimatlar aynı gün yapılabilir.'
  },
  {
    question: 'İade politikası nedir?',
    answer: 'Memnun kalmadığınız ürünleri 30 gün içinde, orijinal ambalajında iade edebilirsiniz.'
  },
  {
    question: 'Ödeme seçenekleri nelerdir?',
    answer: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kullanabilirsiniz.'
  },
  {
    question: 'Ürünleriniz orijinal mi?',
    answer: 'Evet, tüm ürünlerimiz orijinal ve sertifikalıdır. Sahte ürün satışı yapmıyoruz.'
  }
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          İletişim Bilgileri
        </h2>
        
        <div className="space-y-6">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Sosyal Medya
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <a
            href="#"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">f</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Facebook</div>
              <div className="text-sm text-gray-600">@modaart</div>
            </div>
          </a>
          
          <a
            href="#"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-pink-600 font-bold">ig</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Instagram</div>
              <div className="text-sm text-gray-600">@modaart</div>
            </div>
          </a>
          
          <a
            href="#"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">in</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">LinkedIn</div>
              <div className="text-sm text-gray-600">ModaArt</div>
            </div>
          </a>
          
          <a
            href="#"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">WhatsApp</div>
              <div className="text-sm text-gray-600">+90 212 555 0123</div>
            </div>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Sık Sorulan Sorular
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <h3 className="font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-sm">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}




