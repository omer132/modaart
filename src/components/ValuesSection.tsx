import { Palette, Heart, Shield, Truck } from 'lucide-react'

const values = [
  {
    icon: Palette,
    title: 'Kaliteli Sanat',
    description: 'Her eserimiz profesyonel sanatçılar tarafından özenle seçilmiş ve kalite kontrolünden geçmiştir.'
  },
  {
    icon: Heart,
    title: 'Müşteri Memnuniyeti',
    description: 'Müşterilerimizin memnuniyeti bizim için en önemli değerdir. 7/24 destek sağlıyoruz.'
  },
  {
    icon: Shield,
    title: 'Güvenli Alışveriş',
    description: '256-bit SSL şifreleme ile güvenli ödeme ve kişisel verilerinizin korunması garantimizdir.'
  },
  {
    icon: Truck,
    title: 'Hızlı Teslimat',
    description: 'Tüm siparişleriniz 2-3 iş günü içinde özenle paketlenerek kapınıza kadar teslim edilir.'
  }
]

export function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Değerlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ModaArt olarak müşterilerimize en iyi hizmeti sunmak için 
            bu değerler doğrultusunda çalışıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}




