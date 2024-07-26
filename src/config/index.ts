export const siteConfig = {
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
};
