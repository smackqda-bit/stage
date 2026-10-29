import Directions from '@/components/Directions';
import Events from '@/components/Events';
import Facts from '@/components/Facts';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Prices from '@/components/Prices';
import Signup from '@/components/Signup';
import Trial from '@/components/Trial';
import { contacts, site } from '@/data/site';
import { directions } from '@/data/directions';
import { prices, unlimited } from '@/data/prices';

/** Сборка упадёт, если главная перестанет быть полностью статической */
export const ensureStatic = 'navigation';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DanceSchool',
  name: site.fullName,
  url: site.url,
  description: site.description,
  foundingDate: String(site.foundedYear),
  telephone: '+79212116172',
  sameAs: [contacts.vk],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${contacts.addressStreet}, ${contacts.addressNote}`,
    addressLocality: contacts.addressCity,
    addressCountry: 'RU',
  },
  ...(contacts.closes ? { openingHours: `Mo-Su ${contacts.opens}-${contacts.closes}` } : {}),
  knowsAbout: directions.map((d) => d.title),
  makesOffer: [...prices, { title: unlimited.title, price: unlimited.price }].map((p) => ({
    '@type': 'Offer',
    name: p.title,
    price: p.price,
    priceCurrency: 'RUB',
  })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Facts />
        <Directions />
        <Trial />
        <Prices />
        <Events />
        <Signup />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
