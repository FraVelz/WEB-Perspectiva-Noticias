import type { Article } from "./types";

export const SITE = {
  name: "Perspectiva",
  product: "Noticias",
  tagline: "Más contexto, mejores decisiones",
  city: "Bogotá, Colombia",
  edition: "Año 1 · Edición 001",
};

export const SEED_ARTICLES: Article[] = [
  {
    id: "reformas-segundo-debate",
    title: "Reformas en segundo debate: el Gobierno afina mayorías",
    slug: "reformas-segundo-debate",
    dek: "La bancada oficialista busca cerrar votaciones clave esta semana mientras la oposición exige más tiempo de discusión en las comisiones económicas.",
    body: `El Palacio de Nariño concentró este miércoles a voceros de partidos de gobierno para alinear el calendario de las reformas que aún no superan el segundo debate. La prioridad, según fuentes de la coalición, es evitar que el semestre legislativo se cierre sin una votación de fondo.

En el Congreso, el tono cambió. Varios congresistas de bancadas independientes advirtieron que no habrá “cheque en blanco” si no se publican los reportes de impacto fiscal y un cronograma realista de implementación. Esa exigencia, que hace una semana parecía retórica, ahora condiciona los votos de última hora.

La oposición, por su parte, insistió en que el apuro no es técnico sino político. “Un debate incompleto se paga después en la calle y en los tribunales”, dijo una senadora de la bancada de control. El Gobierno responde que el país no puede seguir aplazando decisiones que ya fueron anunciadas en campaña.

El desenlace de esta semana no solo define el texto de las reformas. Define, sobre todo, si la coalición todavía puede operar como mayoría o si el resto del año legislativo se jugará voto a voto.`,
    kicker: "Política",
    section: "politica",
    authorName: "Camila Rodríguez",
    authorTitle: "Redacción Política",
    coverImage: "/press/plaza-bolivar.jpg",
    coverCaption: "Plaza histórica y edificios de gobierno, referencia visual de la jornada legislativa.",
    status: "published",
    featured: true,
    breaking: true,
    publishedAt: "2026-09-03T14:20:00.000Z",
    updatedAt: "2026-09-03T14:20:00.000Z",
  },
  {
    id: "dolar-trm-cierra-semana",
    title: "El dólar cierra la semana con presión sobre la TRM",
    slug: "dolar-trm-cierra-semana",
    dek: "La tasa representativa reaccionó a datos de inflación en Estados Unidos y a la cautela del Banco de la República.",
    body: `La TRM terminó la semana con un alza que volvió a poner el dólar en el centro de la conversación económica. Importadores reportan márgenes más estrechos y el mercado de deuda pública se movió con más volatilidad de la habitual.

Analistas consultados por Perspectiva coinciden en que el movimiento no es un pánico, pero sí una señal: el país sigue expuesto a cada dato que sale de Washington. Si la Reserva Federal retrasa recortes, el peso colombiano vuelve a pagar la factura.

El Ministerio de Hacienda evitó hablar de intervención. Prefirió subrayar que los fundamentales fiscales “siguen siendo el ancla”. En privado, sin embargo, varios tesoreros corporativos ya reprograman compras de divisas para no quedar atrapados en un solo día de mercado.

La pregunta para octubre no es si el dólar va a moverse. Es cuánto de esa volatilidad se traslada a precios internos antes de que el Emisor vuelva a hablar.`,
    kicker: "Economía",
    section: "economia",
    authorName: "Andrés Molina",
    authorTitle: "Redacción Economía",
    coverImage: "/press/dolar-prensa.jpg",
    coverCaption: "Billetes de dólar como símbolo de la presión cambiaria sobre la TRM.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-03T13:05:00.000Z",
    updatedAt: "2026-09-03T13:05:00.000Z",
  },
  {
    id: "corte-constitucional-fallo-salud",
    title: "La Corte Constitucional fija un plazo al Gobierno en salud",
    slug: "corte-constitucional-fallo-salud",
    dek: "El alto tribunal ordenó un plan de cumplimiento con indicadores públicos y advirtió que no aceptará reportes genéricos.",
    body: `La Sala Plena de la Corte Constitucional notificó un fallo que obliga al Gobierno a presentar, en 90 días, un plan verificable de atención en salud. El auto no se limita a reiterar la jurisprudencia: pide metas, responsables y un tablero que cualquier ciudadano pueda consultar.

El Ministerio de Salud dijo que acatará. A renglón seguido, sin embargo, pidió “realismo presupuestal”. Esa tensión —entre el derecho y la caja— es el verdadero núcleo del pronunciamiento.

Abogados que siguen el expediente coinciden en que la Corte perdió la paciencia con los informes narrativos. Quiere números. Quiere fechas. Quiere saber quién responde si la orden se queda en el papel.

Si el plan no llega completo, el tribunal dejó abierta la puerta a un seguimiento más estricto. En la práctica, eso convierte un fallo de tutela en un mecanismo de gobierno.`,
    kicker: "Justicia",
    section: "politica",
    authorName: "Helena Vargas",
    authorTitle: "Redacción Justicia",
    coverImage: "/press/mazo-prensa.jpg",
    coverCaption: "Mazo y códigos: la Corte exige un plan de salud con indicadores públicos.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-03T11:40:00.000Z",
    updatedAt: "2026-09-03T11:40:00.000Z",
  },
  {
    id: "ia-estado-colombia-contratacion",
    title: "El Estado prueba inteligencia artificial en contratación pública",
    slug: "ia-estado-colombia-contratacion",
    dek: "Un piloto en tres entidades busca detectar colusiones y pliegos copiados. Los sindicatos piden reglas claras de auditoría.",
    body: `Tres entidades del orden nacional empezaron a usar modelos de lenguaje para revisar pliegos y detectar patrones de colusión. El piloto, todavía pequeño, ya generó una disputa más grande: quién audita al algoritmo cuando el algoritmo audita al Estado.

Colombia Compra Eficiente insistió en que la herramienta no adjudica. Solo marca alertas. Esa distinción importa. Si una alerta se convierte, de hecho, en un veto técnico, el país habrá cambiado el procedimiento de contratación sin pasar por el Congreso.

Expertos en derecho administrativo advierten el riesgo contrario: que la IA se use como pantalla para no decidir. “Si nadie firma la alerta, nadie responde”, resume un excontralor consultado para este reportaje.

El piloto durará seis meses. Al final, el Gobierno tendrá que elegir entre transparentar el modelo o guardarlo como caja negra. Esa decisión dirá más sobre el Estado digital que cualquier discurso de innovación.`,
    kicker: "Investigación",
    section: "investigacion",
    authorName: "Mateo Rincón",
    authorTitle: "Unidad de Datos",
    coverImage: "/press/capitolio-nacional.jpg",
    coverCaption: "El piloto de IA en contratación pública reabre el debate sobre auditoría algorítmica.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-03T10:15:00.000Z",
    updatedAt: "2026-09-03T10:15:00.000Z",
  },
  {
    id: "economia-crece-trimestre",
    title: "La economía colombiana crece 2,7% en el primer trimestre",
    slug: "economia-crece-trimestre",
    dek: "El dato supera las expectativas del mercado, pero el consumo de los hogares sigue débil y la inversión no despega.",
    body: `El DANE reportó un crecimiento de 2,7% para el primer trimestre, por encima del consenso de analistas. El número, sin embargo, esconde una economía a dos velocidades: servicios que avanzan y un aparato productivo que todavía no recupera el ritmo de inversión.

El Gobierno lo leyó como confirmación de su política. Los gremios, como un alivio insuficiente. “Crecer no es lo mismo que sentir el crecimiento”, dijo el presidente de un gremio industrial. La frase resume el clima de las mesas empresariales.

El Banco de la República tendrá ahora un dato más para calibrar tasas. Un rebote moderado no cierra el debate inflacionario, pero sí reduce el argumento de quienes pedían un recorte agresivo.

La clave del segundo semestre está en la inversión privada. Sin esa palanca, el 2,7% se queda en una buena fotografía y no en una tendencia.`,
    kicker: "Economía",
    section: "economia",
    authorName: "Laura Castaño",
    authorTitle: "Redacción Economía",
    coverImage: "/press/bogota-noche.jpg",
    coverCaption: "Skyline nocturno: el dato de crecimiento no alcanza aún a revertir la debilidad de la inversión.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-03T09:00:00.000Z",
    updatedAt: "2026-09-03T09:00:00.000Z",
  },
  {
    id: "dialogo-congreso-gobierno-oposicion",
    title: "Gobierno y oposición se citan para relanzar el diálogo en el Congreso",
    slug: "dialogo-congreso-gobierno-oposicion",
    dek: "La mesa busca destrabar la agenda legislativa después de semanas de choques por el reglamento y el orden del día.",
    body: `Tras tres semanas de bloqueo, las bancadas acordaron una mesa de diálogo para reordenar la agenda. No hay compromisos de voto. Hay, al menos, una tregua de procedimiento.

El Gobierno necesita esa tregua más que un titular. Sin un mínimo de civilidad reglamentaria, cada proyecto se convierte en una batalla de quórum. La oposición, a su vez, no quiere aparecer como el obstáculo permanente si las encuestas empiezan a castigar la parálisis.

El primer punto de la mesa será el calendario. El segundo, más sensible, es qué se vota antes de las regionales. Nadie quiere llegar a campaña con reformas a medias y enemigos de sobra.

Si la mesa sobrevive a su segunda reunión, el semestre puede recuperarse. Si no, el Congreso volverá al único idioma que ha hablado este año: el del desgaste.`,
    kicker: "Política",
    section: "politica",
    authorName: "Julián Pardo",
    authorTitle: "Redacción Congreso",
    coverImage: "/press/capitolio-nacional.jpg",
    coverCaption: "El Congreso busca una tregua de procedimiento para destrabar la agenda.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-02T21:30:00.000Z",
    updatedAt: "2026-09-02T21:30:00.000Z",
  },
  {
    id: "caribe-tension-diplomatica",
    title: "Nueva tensión diplomática en el Caribe por rutas migratorias",
    slug: "caribe-tension-diplomatica",
    dek: "Cancillería convocó a embajadores de la región después de un incidente naval que dejó 14 personas rescatadas.",
    body: `Un operativo de rescate en aguas del Caribe se convirtió en incidente diplomático cuando dos naves se disputaron la jurisdicción del procedimiento. Catorce personas fueron llevadas a puerto. Ninguna resultó herida. El daño, esta vez, fue político.

Cancillería convocó a embajadores y pidió “canales técnicos, no micrófonos”. La frase busca bajar el tono, pero también revela que el tema ya salió del tablero militar y entró al diplomático.

Organizaciones humanitarias recuerdan que la ruta no es nueva. Lo nuevo es la visibilidad. Cada embarcación que aparece en redes obliga a los gobiernos a explicar lo que durante años manejaron en silencio.

Colombia no puede resolver sola una ruta que atraviesa media región. Tampoco puede permitirse que un rescate se lea como una provocación. Ese es el estrecho margen de esta semana.`,
    kicker: "Mundo",
    section: "mundo",
    authorName: "Sofía Beltrán",
    authorTitle: "Corresponsalía Internacional",
    coverImage: "/press/caribe-prensa.jpg",
    coverCaption: "El Caribe vuelve al centro de la agenda diplomática por las rutas migratorias.",
    status: "published",
    featured: false,
    breaking: true,
    publishedAt: "2026-09-02T18:10:00.000Z",
    updatedAt: "2026-09-02T18:10:00.000Z",
  },
  {
    id: "bienal-artes-bogota",
    title: "La Bienal de Bogotá pone el archivo al centro de la escena",
    slug: "bienal-artes-bogota",
    dek: "Curadores locales y de la región apuestan por obras que reconstruyen memoria a partir de documentos, no de monumentos.",
    body: `La nueva Bienal de Bogotá se aleja del espectáculo monumental y se mete en los archivos. Cartas, planos, cintas y recortes ocupan las salas con una tesis clara: la memoria del país no cabe en una estatua.

El gesto no es nostálgico. Varias obras usan el documento para interrogar el presente: quién guarda, quién borra y quién cobra por recordar. El público, según los primeros recorridos, se detiene más de lo habitual. Lee. Eso, en una feria visual, ya es una declaración.

Críticos advierten el riesgo de convertir el archivo en estética fácil. Los mejores montajes, sin embargo, evitan la ilustración y dejan que el material hable con sus lagunas.

Si la Bienal sostiene esa disciplina hasta el cierre, habrá logrado algo raro en el circuito cultural colombiano: una exposición que pide tiempo, no solo fotografías.`,
    kicker: "Cultura",
    section: "cultura",
    authorName: "Inés del Valle",
    authorTitle: "Crítica de arte",
    coverImage:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=1400&q=80",
    coverCaption: "La Bienal desplaza el monumento y pone el documento en el centro de la sala.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-02T16:00:00.000Z",
    updatedAt: "2026-09-02T16:00:00.000Z",
  },
  {
    id: "columnista-acuerdos-sin-renunciar",
    title: "Gobernar es construir acuerdos sin renunciar a los principios",
    slug: "gobernar-acuerdos-sin-renunciar",
    dek: "Una democracia que solo sabe romper no legisla. Una que solo sabe ceder, tampoco.",
    body: `Hay un malentendido cómodo en la política colombiana: creer que el principio se demuestra en el grito y el acuerdo, en la claudicación. Las democracias serias hacen lo contrario. Discuten fuerte y firman en concreto.

El Congreso de este año ha sido un manual de lo primero y un desierto de lo segundo. Cada bancada sale a explicar por qué no podía ceder. Nadie sale a explicar qué quedó resuelto para el ciudadano que no vive de la tribuna.

Acordar no es diluir. Es traducir una convicción a una regla que otro pueda cumplir. Si esa traducción no existe, el principio se queda en eslogan y el Estado, en comunicado.

La tarea de la dirección editorial de un medio no es dictar la transacción. Es recordar que sin ella no hay gobierno, solo campaña permanente.`,
    kicker: "Opinión",
    section: "opinion",
    authorName: "Elena Duarte",
    authorTitle: "Directora editorial",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    coverCaption: "Columna de la dirección editorial sobre el oficio de acordar sin diluir.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-02T12:00:00.000Z",
    updatedAt: "2026-09-02T12:00:00.000Z",
  },
  {
    id: "mineria-ilegal-reportaje",
    title: "El mapa oculto de la minería ilegal en tres departamentos",
    slug: "mapa-mineria-ilegal-tres-departamentos",
    dek: "Perspectiva cruzó alertas satelitales, contratos y denuncias para reconstruir una red que ya no cabe en la etiqueta de ‘economía informal’.",
    body: `Durante cuatro meses, la unidad de investigación de Perspectiva cruzó imágenes satelitales, registros mercantiles y denuncias archivadas. El resultado no es una anécdota de dragas: es un mapa de empresas fachada, rutas y omisiones institucionales en tres departamentos.

La minería ilegal ya no opera solo en la periferia visible del río. Opera en el papel. Hay sociedades que facturan, compran combustible y desaparecen antes de la siguiente visita de control. Esa velocidad administrativa es parte del negocio.

Las autoridades responden con operativos. Los operativos producen fotos. Las fotos no producen un registro único de beneficiarios finales. Mientras ese registro no exista, cada decomiso es un capítulo y no una política.

Este reportaje no pretende agotar el fenómeno. Pretende volverlo ilegible para quienes aún lo tratan como un problema de ‘informalidad’ y no de captura.`,
    kicker: "Investigación",
    section: "investigacion",
    authorName: "Equipo Investigación",
    authorTitle: "Unidad de Investigación",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    coverCaption: "El cruce de datos satelitales y mercantiles revela una red que ya no es informal.",
    status: "published",
    featured: false,
    breaking: false,
    publishedAt: "2026-09-01T20:00:00.000Z",
    updatedAt: "2026-09-01T20:00:00.000Z",
  },
];

export const SEED_MARKETS = [
  { name: "Dólar TRM", value: "$4.187", change: "+0,6%", up: false },
  { name: "Euro", value: "$4.562", change: "+0,2%", up: false },
  { name: "Petróleo Brent", value: "US$81,4", change: "−0,4%", up: true },
  { name: "COLCAP", value: "1.482", change: "+0,3%", up: true },
];
