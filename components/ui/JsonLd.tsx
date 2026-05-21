export default function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "R.S. Pharma Link Pvt. Ltd.",
    url: "https://rspharmalink.com",
    logo: "https://rspharmalink.com/logo.svg",
    description: "Nepal's trusted pharmaceutical distributor in Kathmandu. Quality medicines and healthcare supply solutions across the Kathmandu Valley.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Golfutar",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.7512,
      longitude: 85.3308,
    },
    telephone: "+977-1-XXXXXXX",
    email: "info@rspharmalink.com",
    openingHours: "Su-Fr 09:00-18:00",
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+977-1-XXXXXXX",
      contactType: "customer service",
      availableLanguage: ["English", "Nepali"],
    },
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "R.S. Pharma Link Pvt. Ltd.",
    url: "https://rspharmalink.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rspharmalink.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
