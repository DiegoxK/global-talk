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

  // THESE ARE THE REAL PRICING VALUES USED IN EPAYCO
  pricing: {
    beginners_a0: {
      price: {
        level: "600000",
        complete: "1000000",
      },
      name: "Beginners A0",
      description: {
        level: "Programa Beginners A0, ( 2 meses, 1 nivel )",
        complete: "Programa Beginners A0, ( 4 meses. 2 niveles )",
      },
      features: {
        level: [
          "32 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Material de estudio",
          "Evaluación al final del nivel",
          "1 cupo en clases de máximo 5 personas",
        ],
        complete: [
          "64 clases de una hora (4 por semana)",
          "Programa completo: 2 niveles",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Material de estudio",
          "Evaluación al final de cada nivel",
          "1 cupo en clases de máximo 5 personas",
        ],
      },
      extra: {
        level:
          "Este plan consiste en el pago de un unico nivel con duracion de 2 meses. Al finalizar su nivel, sera notificado en la aplicación acerca de la posibilidad de comprar el siguiente nivel.",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 4 meses en el transcurso de 2 niveles.",
      },
    },
    pure_a1: {
      price: {
        level: "600000",
        complete: "1000000",
      },
      name: "Pure A1",
      description: {
        level: "Programa Pure A1, ( 2 meses, 1 nivel )",
        complete: "Programa Pure A1, ( 4 meses. 2 niveles )",
      },
      features: {
        level: [
          "32 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Material de estudio",
          "Evaluación al final de cada nivel",
          "1 cupo en clases de máximo 5 personas",
        ],
        complete: [
          "64 clases de una hora (4 por semana)",
          "Programa completo: 2 niveles",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level:
          "Este plan consiste en el pago de un unico nivel con duracion de 2 meses. Al finalizar su nivel, sera notificado en la aplicación acerca de la posibilidad de comprar el siguiente nivel.",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 4 meses en el transcurso de 2 niveles.",
      },
    },
    beginners_plus_pure_a1: {
      price: {
        level: "1900000",
        complete: "1900000",
      },
      name: "Beginners + Pure A1",
      description: {
        level: "",
        complete: "Programa Beginners + Pure A1, ( 8 meses. 4 niveles )",
      },
      features: {
        level: [],
        complete: [
          "124 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Programa completo: 4 niveles",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level: "",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 8 meses en el transcurso de 4 niveles.",
      },
    },
    from_a2_to_b1: {
      price: {
        level: "630000",
        complete: "3000000",
      },
      name: "From A2 to B1",
      description: {
        level: "Programa From A2 to B1, ( 2 meses, 1 nivel )",
        complete: "Programa From A2 to B1, ( 10 meses. 5 niveles )",
      },
      features: {
        level: [
          "32 clases de una hora (4 por semana)",
          "Prueba de nivel",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Material de estudio",
          "Evaluación al final de cada nivel",
          "1 cupo en clases de máximo 5 personas",
        ],
        complete: [
          "160 clases de una hora (4 por semana)",
          "Prueba de nivel",
          "Acceso a la plataforma de aprendizaje",
          "Programa completo: 5 niveles",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level:
          "Este plan consiste en el pago de un unico nivel con duracion de 2 meses. Al finalizar su nivel, sera notificado en la aplicación acerca de la posibilidad de comprar el siguiente nivel.",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 10 meses en el transcurso de 5 niveles.",
      },
    },
    from_b1_to_b2: {
      price: {
        level: "630000",
        complete: "3000000",
      },
      name: "From B1 to B2",
      description: {
        level: "Programa From B1 to B2, ( 2 meses, 1 nivel )",
        complete: "Programa From B1 to B2, ( 10 meses. 5 niveles )",
      },
      features: {
        level: [
          "32 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Material de estudio",
          "Evaluación al final de cada nivel",
          "1 cupo en clases de máximo 5 personas",
        ],
        complete: [
          "160 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Programa completo: 5 niveles",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level:
          "Este plan consiste en el pago de un unico nivel con duracion de 2 meses. Al finalizar su nivel, sera notificado en la aplicación acerca de la posibilidad de comprar el siguiente nivel.",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 10 meses en el transcurso de 5 niveles.",
      },
    },
    intensive_b2: {
      price: {
        level: "1000000",
        complete: "1000000",
      },
      name: "Intensive B2",
      description: {
        level: "",
        complete: "Programa Intensive B2, ( 10 meses. 5 niveles )",
      },
      features: {
        level: [],
        complete: [
          "120 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Prueba de nivel",
          "Programa completo: 2 niveles",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level: "",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 3 meses en el transcurso de 2 niveles.",
      },
    },
    business_english: {
      price: {
        level: "630000",
        complete: "3000000",
      },
      name: "Business English",
      description: {
        level: "Programa Business English, ( 2 meses, 1 nivel )",
        complete: "Programa Business English, ( 10 meses. 5 niveles )",
      },
      features: {
        level: [
          "32 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Grabaciones de las clases",
          "Material de estudio",
          "Evaluación al final de cada nivel",
          "1 cupo en clases de máximo 5 personas",
        ],
        complete: [
          "160 clases de una hora (4 por semana)",
          "Acceso a la plataforma de aprendizaje",
          "Programa completo: 5 niveles",
          "Grabaciones de las clases",
          "Todos los materiales",
          "Evaluación al final de cada nivel",
          "1 cupo en un grupo de máximo 5 personas",
        ],
      },
      extra: {
        level:
          "Este plan consiste en el pago de un unico nivel con duracion de 2 meses. Al finalizar su nivel, sera notificado en la aplicación acerca de la posibilidad de comprar el siguiente nivel.",
        complete:
          "Este plan consiste en el pago unico del programa completo con duracion de 10 meses en el transcurso de 5 niveles.",
      },
    },
  },
};
