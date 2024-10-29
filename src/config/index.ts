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
  price: {
    level: string;
    complete: string;
  };
  name: string;
  description: {
    level: string;
    complete: string;
  };
  features: {
    level: string[];
    complete: string[];
  };
  extra?: {
    level?: string;
    complete?: string;
  };
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
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "Beginners A0",
      description: {
        level: "Programa Beginners A0, 2 niveles (4 meses)",
        complete: "Programa Beginners A0, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level:
          "Este plan es recurrente y se cobrará 300.000 pesos mensualmente durante el transcurso del programa (4 meses).",
        complete: "asdsad",
      },
    },
    pure_a1: {
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "Pure A1",
      description: {
        level: "Programa Pure A1, 2 niveles (4 meses)",
        complete: "Programa Pure A1, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
    },
    beginners_plus_pure_a1: {
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "Beginners + Pure A1",
      description: {
        level: "Programa Beginners + Pure A1, 2 niveles (4 meses)",
        complete: "Programa Beginners + Pure A1, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
    },
    from_a2_to_b1: {
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "From A2 to B1",
      description: {
        level: "Programa From A2 to B1, 2 niveles (4 meses)",
        complete: "Programa From A2 to B1, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
    },
    from_b1_to_b2: {
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "From B1 to B2",
      description: {
        level: "Programa From B1 to B2, 2 niveles (4 meses)",
        complete: "Programa From B1 to B2, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
    },
    intensive_b2: {
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "Intensive B2",
      description: {
        level: "Programa Intensive B2, 2 niveles (4 meses)",
        complete: "Programa Intensive B2, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
    },
    business_english: {
      price: {
        level: "10000",
        complete: "10000",
      },
      name: "Business English",
      description: {
        level: "Programa Business English, 2 niveles (4 meses)",
        complete: "Programa Business English, 2 niveles (4 meses)",
      },
      features: {
        level: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
        complete: [
          "16 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
    },
  },
};
