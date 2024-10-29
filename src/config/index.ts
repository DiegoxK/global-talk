interface SiteConfig {
  navigation: Navigation[];
  pricing: Pricing;
}

interface Navigation {
  label: string;
  url: string;
  subLinks?: Navigation[];
}
type PricingKey =
  | "beginners_a0"
  | "pure_a1"
  | "beginners_plus_pure_a1"
  | "intensive_b2"
  | "business_english"
  | "from_a2_to_b1"
  | "from_b1_to_b2";

interface PricingDetails {
  price: string;
  name: string;
  description: string;
}

export type Pricing = Record<PricingKey, PricingDetails>;

export const siteConfig: SiteConfig = {
  navigation: [
    {
      label: "Inicio",
      url: "/",
      subLinks: [
        { label: "Caracteristicas", url: "/#qualities" },
        { label: "Camino", url: "/#road" },
        { label: "Profesores", url: "/#team" },
        { label: "Preguntas", url: "/#questions" },
      ],
    },
    {
      label: "Academia",
      url: "/academy",
      subLinks: [
        {
          label: "Dashboard estudiante",
          url: "/academy",
        },
      ],
    },
    {
      label: "Nosotros",
      url: "/about",
      subLinks: [
        { label: "Misión", url: "/about#mision" },
        { label: "Visión", url: "/about#vision" },
        { label: "Experiencia", url: "/about#experience" },
        { label: "Profesores", url: "/about#teams" },
      ],
    },
    {
      label: "Contacto",
      url: "/contact",
      subLinks: [{ label: "Formulario de contacto", url: "/contact#form" }],
    },
  ],

  pricing: {
    beginners_a0: {
      price: "10000",
      name: "Beginners A0",
      description: "Programa Beginners A0, 2 niveles (4 meses)",
    },
    pure_a1: {
      price: "10000",
      name: "Pure A1",
      description: "Programa Pure A1, 2 niveles (4 meses)",
    },
    beginners_plus_pure_a1: {
      price: "10000",
      name: "Beginners + Pure A1",
      description: "Programa Beginners + Pure A1, 2 niveles (4 meses)",
    },
    from_a2_to_b1: {
      price: "10000",
      name: "From A2 to B1",
      description: "Programa From A2 to B1, 2 niveles (4 meses)",
    },
    from_b1_to_b2: {
      price: "10000",
      name: "From B1 to B2",
      description: "Programa From B1 to B2, 2 niveles (4 meses)",
    },
    intensive_b2: {
      price: "10000",
      name: "Intensive B2",
      description: "Programa Intensive B2, 2 niveles (4 meses)",
    },
    business_english: {
      price: "10000",
      name: "Business English",
      description: "Programa Business English, 2 niveles (4 meses)",
    },
  },
};
