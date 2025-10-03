import { Mail, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
  {
    name: 'Ayşe Yılmaz',
    position: 'Kurucu & CEO',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Sanat ve tasarım alanında 10 yıllık deneyime sahip. ModaArt\'ın vizyonunu şekillendiren isim.',
    social: {
      email: 'ayse@modaart.com',
      linkedin: 'ayse-yilmaz',
      twitter: 'ayse_modaart'
    }
  },
  {
    name: 'Mehmet Kaya',
    position: 'Sanat Direktörü',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Güzel Sanatlar mezunu, sanat eserlerinin seçimi ve kalite kontrolünden sorumlu.',
    social: {
      email: 'mehmet@modaart.com',
      linkedin: 'mehmet-kaya',
      twitter: 'mehmet_modaart'
    }
  },
  {
    name: 'Zeynep Demir',
    position: 'Müşteri Deneyimi Uzmanı',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Müşteri memnuniyetini artırmak için sürekli çalışan, deneyimli ekip üyemiz.',
    social: {
      email: 'zeynep@modaart.com',
      linkedin: 'zeynep-demir',
      twitter: 'zeynep_modaart'
    }
  },
  {
    name: 'Can Özkan',
    position: 'Teknoloji Lideri',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Platformumuzun teknik altyapısından sorumlu, yenilikçi çözümler üreten geliştirici.',
    social: {
      email: 'can@modaart.com',
      linkedin: 'can-ozkan',
      twitter: 'can_modaart'
    }
  }
]

export function TeamSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ekibimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ModaArt\'ı hayata geçiren, sanat ve teknolojiyi buluşturan 
            deneyimli ekibimizle tanışın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex gap-3">
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="E-posta"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/${member.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}






