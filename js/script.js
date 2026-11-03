/* =====================================
   JAVASCRIPT - PÁGINA ITACE
===================================== */
/* MENÚ RESPONSIVO */
document.addEventListener("DOMContentLoaded", function () {
    const botonMenu = document.getElementById("menuHamburguesa");
    const enlacesMenu = document.getElementById("enlacesMenu");
    if (!botonMenu || !enlacesMenu) return;
    /* ABRIR Y CERRAR MENÚ */
    botonMenu.addEventListener("click", function () {
        const abierto = enlacesMenu.classList.toggle("activo");
        botonMenu.textContent = abierto ? "✕" : "☰";
        botonMenu.setAttribute("aria-expanded", String(abierto));
        botonMenu.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });
    /* CERRAR MENÚ AL ELEGIR UNA SECCIÓN */
    enlacesMenu.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            enlacesMenu.classList.remove("activo");
            botonMenu.textContent = "☰";
            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        });
    });
});

/* =====================================
   MOSTRAR MÁS HISTORIA DEL ITACE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botonHistoria = document.getElementById("botonHistoria");
    const lineaTiempo = document.getElementById("lineaTiempo");

    if (!botonHistoria || !lineaTiempo) return;

    botonHistoria.addEventListener("click", function () {

        const expandida = lineaTiempo.classList.toggle("expandida");

        if (expandida) {
            botonHistoria.textContent = "📜 Mostrar menos historia ↑";
        } else {
            botonHistoria.textContent = "📜 Ver más historia ↓";
        }

        botonHistoria.setAttribute(
            "aria-expanded",
            String(expandida)
        );

    });

});

/* =====================================
   CARRUSEL DE CARRERAS DEL ITACE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const pista = document.getElementById("pistaCarreras");
    const anterior = document.getElementById("carreraAnterior");
    const siguiente = document.getElementById("carreraSiguiente");

    if (!pista || !anterior || !siguiente) return;

    function moverCarrusel(direccion) {
        const tarjeta = pista.querySelector(".tarjeta-carrera");

        if (!tarjeta) return;

        const estilos = getComputedStyle(pista);
        const espacio = parseFloat(estilos.gap) || 0;
        const distancia = tarjeta.getBoundingClientRect().width + espacio;

        pista.scrollBy({
            left: direccion * distancia,
            behavior: "smooth"
        });
    }

    function actualizarFlechas() {
        const maximo = pista.scrollWidth - pista.clientWidth;

        anterior.disabled = pista.scrollLeft <= 2;
        siguiente.disabled = pista.scrollLeft >= maximo - 2;
    }

    anterior.addEventListener("click", function () {
        moverCarrusel(-1);
    });

    siguiente.addEventListener("click", function () {
        moverCarrusel(1);
    });

    pista.addEventListener("scroll", actualizarFlechas);
    window.addEventListener("resize", actualizarFlechas);

    actualizarFlechas();

});

/* =====================================
   VENTANAS DE INFORMACIÓN DE CARRERAS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("modalCarrera");
    const cerrar = document.getElementById("cerrarModalCarrera");
    const volver = document.getElementById("volverCarreras");
    const tarjetas = document.querySelectorAll(
        "#carreras .tarjeta-carrera"
    );

    if (!modal || !cerrar || !volver || !tarjetas.length) return;

    /* INFORMACIÓN DE LAS 7 CARRERAS */

    const informacionCarreras = [
        {
            aprendizaje:
                "Fundamentos de programación, análisis de datos, " +
                "automatización, algoritmos y aplicaciones de inteligencia artificial.",

            trabajo:
                "Apoyo en proyectos tecnológicos, desarrollo de software, " +
                "automatización y análisis básico de información."
        },
        {
            aprendizaje:
                "Seguridad de redes, protección de datos, " +
                "identificación de riesgos informáticos y buenas prácticas digitales.",

            trabajo:
                "Soporte informático, monitoreo de sistemas, " +
                "protección de información y asistencia en seguridad digital."
        },
        {
            aprendizaje:
                "Circuitos electrónicos, componentes semiconductores, " +
                "mediciones eléctricas y fundamentos de microelectrónica.",

            trabajo:
                "Apoyo técnico en electrónica, pruebas de componentes, " +
                "manufactura tecnológica y mantenimiento de equipos."
        },
        {
            aprendizaje:
                "Diseño visual, edición de imágenes, composición gráfica, " +
                "herramientas digitales y producción multimedia.",

            trabajo:
                "Diseño publicitario, creación de contenido digital, " +
                "material gráfico y apoyo en proyectos creativos."
        },
        {
            aprendizaje:
                "Control de inventarios, almacenamiento, distribución, " +
                "organización de mercancías y procesos logísticos.",

            trabajo:
                "Auxiliar de almacén, control de inventarios, " +
                "distribución y apoyo en operaciones logísticas."
        },
        {
            aprendizaje:
                "Mecánica industrial, electricidad, diagnóstico de fallas, " +
                "mantenimiento preventivo y seguridad en equipos.",

            trabajo:
                "Apoyo en mantenimiento de maquinaria, " +
                "operaciones industriales y revisión de equipos."
        },
        {
            aprendizaje:
                "Funcionamiento de motores, sistemas automotrices, " +
                "diagnóstico de fallas y mantenimiento de vehículos.",

            trabajo:
                "Apoyo en talleres automotrices, mantenimiento preventivo, " +
                "servicio técnico y revisión de vehículos."
        }
    ];

    const titulo = document.getElementById("modalCarreraTitulo");
    const imagen = document.getElementById("modalCarreraImagen");
    const descripcion = document.getElementById("modalCarreraDescripcion");
    const aprendizaje = document.getElementById("modalCarreraAprendizaje");
    const trabajo = document.getElementById("modalCarreraTrabajo");

    let botonAnterior = null;

    /* ABRIR VENTANA */

    tarjetas.forEach(function (tarjeta, indice) {

        const boton = tarjeta.querySelector(".boton-conocer");

        if (!boton) return;

        boton.addEventListener("click", function () {

            const nombre = tarjeta.querySelector("h3");
            const foto = tarjeta.querySelector("img");
            const texto = tarjeta.querySelector("p");
            const detalles = informacionCarreras[indice];

            if (!nombre || !foto || !texto || !detalles) return;

            titulo.textContent = nombre.textContent;
            imagen.src = foto.src;
            imagen.alt = foto.alt;
            descripcion.textContent = texto.textContent.trim();

            aprendizaje.textContent = detalles.aprendizaje;
            trabajo.textContent = detalles.trabajo;

            botonAnterior = boton;

            modal.hidden = false;
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            cerrar.focus();

        });
    });

    /* CERRAR VENTANA */

    function cerrarModal() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (botonAnterior) {
            botonAnterior.focus();
        }
    }

    cerrar.addEventListener("click", cerrarModal);
    volver.addEventListener("click", cerrarModal);

    /* CERRAR AL TOCAR EL FONDO OSCURO */

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

    /* CERRAR CON LA TECLA ESCAPE */

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modal.hidden) {
            cerrarModal();
        }
    });

    /* MANTENER EL TECLADO DENTRO DE LA VENTANA */

    modal.addEventListener("keydown", function (evento) {

        if (evento.key !== "Tab") return;

        const controles = [cerrar, volver];
        const primero = controles[0];
        const ultimo = controles[controles.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primero.focus();
        }
    });

});

/* =====================================
   VENTANAS DE LOS CLUBES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const clubes = {
        rondalla: {
            nombre: "🎶 Rondalla",
            descripcion: "La rondalla es una agrupación musical que permite a los estudiantes desarrollar sus habilidades artísticas y disfrutar de la música.",
            habilidades: "Interpretación musical, coordinación, expresión artística y trabajo en equipo."
        },

        banda: {
            nombre: "🥁 Banda de guerra",
            descripcion: "La banda de guerra es una actividad cívica que fomenta la disciplina, el respeto y la coordinación.",
            habilidades: "Disciplina, coordinación, trabajo en equipo y participación cívica."
        },

        oratoria: {
            nombre: "🎤 Oratoria",
            descripcion: "La oratoria es el arte de hablar en público de manera clara, segura y expresiva.",
            habilidades: "Comunicación, expresión oral, argumentación y confianza."
        },

        robotica: {
            nombre: "🤖 Robótica",
            descripcion: "La robótica combina tecnología, creatividad y conocimientos para comprender y desarrollar sistemas automatizados.",
            habilidades: "Pensamiento lógico, programación, creatividad y resolución de problemas."
        },

        danza: {
            nombre: "💃 Danza",
            descripcion: "La danza es una forma de expresión artística que utiliza el movimiento corporal y la música.",
            habilidades: "Ritmo, coordinación, creatividad y expresión corporal."
        },

        ajedrez: {
            nombre: "♟️ Ajedrez",
            descripcion: "El ajedrez es un juego de estrategia que estimula el pensamiento lógico y la concentración.",
            habilidades: "Estrategia, paciencia, análisis y toma de decisiones."
        },

        dibujo: {
            nombre: "🎨 Dibujo",
            descripcion: "El dibujo es una actividad artística que permite representar ideas, emociones y objetos mediante técnicas visuales.",
            habilidades: "Creatividad, observación, imaginación y expresión artística."
        },

        premilitar: {
            nombre: "🎖️ Premilitar",
            descripcion: "La formación premilitar se enfoca en actividades relacionadas con la disciplina, la organización y el trabajo colectivo.",
            habilidades: "Responsabilidad, respeto, disciplina y compañerismo."
        }
    };

    const modal = document.getElementById("modalClub");
    const titulo = document.getElementById("tituloClub");
    const descripcion = document.getElementById("descripcionClub");
    const habilidades = document.getElementById("habilidadesClub");
    const cerrar = document.getElementById("cerrarClub");
    const volver = document.getElementById("volverClub");
    
const imagenClubModal = document.getElementById("imagenClubModal");

const imagenesClubes = {
    rondalla: "../img/club-rondalla.jpg",
    banda: "../img/club-banda.jpg",
    oratoria: "../img/club-oratoria.jpg",
    robotica: "../img/club-robotica.jpg",
    danza: "../img/club-danza.jpg",
    ajedrez: "../img/club-ajedrez.jpg",
    dibujo: "../img/club-dibujo.jpg",
    premilitar: "../img/club-premilitar.jpg"
};


    if (!modal || !titulo || !descripcion ||
        !habilidades || !cerrar || !volver) return;

    let botonAnterior = null;

    function cerrarVentana() {
        modal.hidden = true;
        document.body.style.overflow = "";
        if (botonAnterior) botonAnterior.focus();
    }

    document.querySelectorAll("#clubes [data-club]").forEach(boton => {
        boton.addEventListener("click", function () {
            const club = clubes[boton.dataset.club];

            if (!club) return;

            botonAnterior = boton;
            titulo.textContent = club.nombre;
            descripcion.textContent = club.descripcion;
            habilidades.textContent = club.habilidades;
const nombreClub = boton.dataset.club;

if (imagenClubModal && imagenesClubes[nombreClub]) {
    imagenClubModal.src = imagenesClubes[nombreClub];
    imagenClubModal.alt = "Fotografía del club " + club.nombre;
}
            modal.hidden = false;
            document.body.style.overflow = "hidden";
            cerrar.focus();
        });
    });

    cerrar.addEventListener("click", cerrarVentana);
    volver.addEventListener("click", cerrarVentana);

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) cerrarVentana();
    });

    document.addEventListener("keydown", function (evento) {
        if (modal.hidden) return;

        if (evento.key === "Escape") {
            cerrarVentana();
        }

        if (evento.key === "Tab") {
            const controles = [cerrar, volver];
            const primero = controles[0];
            const ultimo = controles[1];

            if (evento.shiftKey &&
                document.activeElement === primero) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey &&
                       document.activeElement === ultimo) {
                evento.preventDefault();
                primero.focus();
            }
        }
    });
});

/* =====================================
   🎠 CARRUSEL DE CLUBES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const carrusel = document.querySelector(
        "#clubes .clubes-grid"
    );

    const anterior = document.querySelector(
        "#clubes .club-anterior"
    );

    const siguiente = document.querySelector(
        "#clubes .club-siguiente"
    );

    if (!carrusel || !anterior || !siguiente) return;

    function distanciaTarjeta() {
        const tarjeta = carrusel.querySelector(".club-card");

        if (!tarjeta) return 0;

        const estilos = getComputedStyle(carrusel);
        const separacion = parseFloat(estilos.columnGap) || 0;

        return tarjeta.getBoundingClientRect().width + separacion;
    }

    function actualizarFlechas() {
        const maximo = carrusel.scrollWidth - carrusel.clientWidth;

        anterior.disabled = carrusel.scrollLeft <= 2;
        siguiente.disabled = carrusel.scrollLeft >= maximo - 2;
    }

    anterior.addEventListener("click", function () {
        carrusel.scrollBy({
            left: -distanciaTarjeta(),
            behavior: "smooth"
        });
    });

    siguiente.addEventListener("click", function () {
        carrusel.scrollBy({
            left: distanciaTarjeta(),
            behavior: "smooth"
        });
    });

    carrusel.addEventListener("scroll", actualizarFlechas);
    window.addEventListener("resize", actualizarFlechas);

    actualizarFlechas();

});

/* =====================================
   1. BOTÓN PARA VOLVER ARRIBA
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botonSubir = document.querySelector(
        "#volverArriba, #btnVolverArriba, .volver-arriba, .boton-subir"
    );

    // Si la página no tiene el botón, no hacemos nada.
    if (!botonSubir) return;

    // Mostrar el botón al bajar por la página.
    function actualizarBoton() {

        const mostrar = window.scrollY > 350;

        botonSubir.classList.toggle("oculto", !mostrar);

    }

    // Regresar al inicio al hacer clic.
    botonSubir.addEventListener("click", function () {

        const reducirMovimiento = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reducirMovimiento ? "instant" : "smooth"
        });

    });

    // Revisar cuando el usuario se desplaza.
    window.addEventListener("scroll", actualizarBoton, {
        passive: true
    });

    // Revisar el estado inicial.
    actualizarBoton();

});

/* =====================================
   2. FILTROS DE NOTICIAS Y PROYECTOS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       FUNCIÓN GENERAL PARA FILTRAR
    ===================================== */

    function configurarFiltros(
        selectorBotones,
        selectorTarjetas
    ) {

        const botones = document.querySelectorAll(
            selectorBotones
        );

        const tarjetas = document.querySelectorAll(
            selectorTarjetas
        );

        // Si no existen los elementos,
        // no ejecutamos esta función.

        if (!botones.length || !tarjetas.length) {
            return;
        }

        /* =====================================
           RECORRER BOTONES
        ===================================== */

        botones.forEach(function (boton) {

            boton.addEventListener("click", function () {

                const categoria = (
                    boton.dataset.filtro || "todos"
                ).toLowerCase();

                /* =====================================
                   CAMBIAR BOTÓN ACTIVO
                ===================================== */

                botones.forEach(function (otroBoton) {

                    const activo = otroBoton === boton;

                    otroBoton.classList.toggle(
                        "activo",
                        activo
                    );

                    otroBoton.setAttribute(
                        "aria-pressed",
                        String(activo)
                    );

                });

                /* =====================================
                   MOSTRAR U OCULTAR TARJETAS
                ===================================== */

                tarjetas.forEach(function (tarjeta) {

                    const categoriaTarjeta = (
                        tarjeta.dataset.categoria || ""
                    ).toLowerCase();

                    const categorias = categoriaTarjeta
                        .split(/\s+/)
                        .filter(Boolean);

                    const mostrar =
                        categoria === "todos" ||
                        categorias.includes(categoria);

                    tarjeta.classList.toggle(
                        "oculto",
                        !mostrar
                    );

                    tarjeta.hidden = !mostrar;
                });
            });
        });
    }
    /* =====================================
       FILTROS DE NOTICIAS
    ===================================== */
  configurarFiltros(
    ".noticias-publicaciones .filtro-noticia",
    ".noticias-publicaciones .tarjeta-noticia"
);
    /* =====================================
       FILTROS DE PROYECTOS
    ===================================== */
    configurarFiltros(
        ".filtro-proyecto",
        ".proyecto-card, .tarjeta-proyecto"
    );
});


/* ============================================
   DIRECTORIO DE DOCENTES ITACE
   25 DOCENTES - BUSCADOR Y CONOCER MÁS
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    const lista = document.getElementById("listaDocentes");
    const buscador = document.getElementById("buscarDocente");
    const filtro = document.getElementById("filtroAcademia");
    const limpiar = document.getElementById("limpiarBusqueda");
    const contador = document.getElementById("contadorDocentes");
    const sinResultados = document.getElementById("sinResultados");
    const pendientes = document.getElementById("docentesPendientes");

    const modal = document.getElementById("modalDocente");
    const modalNombre = document.getElementById("modalDocenteNombre");
    const modalAcademia = document.getElementById("modalDocenteAcademia");
    const modalSemestre = document.getElementById("modalDocenteSemestre");
    const modalPerfil = document.getElementById("modalDocentePerfil");
    const modalFoto = document.getElementById("modalDocenteFoto");
    const cerrar = document.getElementById("cerrarModalDocente");
    const volver = document.getElementById("volverDocentes");

    if (!lista || !buscador || !filtro) return;

    /* =====================================
       INFORMACIÓN DE LOS DOCENTES
    ===================================== */

    const docentes = [

        {
            nombre: "Bertha Alicia Zapata Aldape",
            academia: "Matemáticas",
            materias: "No especificadas",
            semestres: "1.º y 3.º",
            formacion: "Doctorado",
            antiguedad: "2 años y medio",
            salon: "C-6"
        },

        {
            nombre: "Carlos Melecio Carmona Olivares",
            academia: "Formación Técnica",
            materias: "Diseño Gráfico e Inglés",
            semestres: "1.º y 3.º",
            formacion: "Maestría en Educación Básica (UPN) y Licenciatura en Diseño Gráfico (UVB), según los datos proporcionados",
            antiguedad: "2 años",
            salon: "C-5 y L-2"
        },

        {
            nombre: "Erik Ramírez Solís",
            academia: "Matemáticas",
            materias: "Pensamiento Matemático",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Licenciatura en Electromecánica y Maestría en Educación",
            antiguedad: "21 años",
            salon: "C-2"
        },

        {
            nombre: "Grecia Ávalos Ramos",
            academia: "Comunicación",
            materias: "Lengua y Comunicación",
            semestres: "1.º y 3.º",
            formacion: "Licenciatura y maestría (áreas no especificadas)",
            antiguedad: "3 años",
            salon: "B-1"
        },

        {
            nombre: "Sandra Catalina Silva Camacho",
            academia: "Comunicación",
            materias: "Comunicación",
            semestres: "5.º actualmente; anteriormente otros semestres",
            formacion: "Maestría en Metodología de la Enseñanza",
            antiguedad: "25 años",
            salon: "B-4"
        },

        {
            nombre: "Liliana Rosas Pacheco",
            academia: "Humanidades",
            materias: "Pensamiento Filosófico, Conciencia Histórica, Lengua y Comunicación y Formación Socioemocional",
            semestres: "1.º y 5.º",
            formacion: "Licenciatura en Pedagogía, maestría en Educación Media Superior o Docencia (por confirmar) y Doctorado en Educación",
            antiguedad: "5 años",
            salon: "No especificado"
        },

        {
            nombre: "Carla Valeria Morán Lerma",
            academia: "Ciencias Sociales",
            materias: "Pensamiento Filosófico, Ciencias Sociales y Cultura Digital",
            semestres: "1.º y 3.º",
            formacion: "Maestría (área no especificada)",
            antiguedad: "33 años, según los datos proporcionados",
            salon: "B-3 / A-6 (por confirmar)"
        },

        {
            nombre: "Benjamín Limón Martínez",
            academia: "Formación Técnica",
            materias: "Programación, Inteligencia Artificial y Cultura Digital",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Formación en Administración de Productividad y Calidad y Maestría en Educación",
            antiguedad: "5 años",
            salon: "Laboratorio 5"
        },

        {
            nombre: "Isidro de León Flores",
            academia: "Formación Técnica",
            materias: "Educación Física Premilitar",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Licenciaturas en Psicopedagogía y Pedagogía",
            antiguedad: "29 años",
            salon: "No especificado"
        },

        {
            nombre: "Norma Elena Torres Quiñones",
            academia: "Ciencias Naturales",
            materias: "Ciencias Naturales e IT (siglas por confirmar)",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Ingeniería Química y Maestría en Docencia",
            antiguedad: "26 años",
            salon: "C-4"
        },

        {
            nombre: "Luis Enrique Lerma Martínez",
            academia: "Ciencias Sociales",
            materias: "Conciencia Histórica, Lengua y Comunicación y Formación Socioemocional; también se mencionan módulos de mantenimiento",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Ingeniería Petrolera, formación en Pedagogía o Docencia (por confirmar) y Diplomado en Competencias Docentes",
            antiguedad: "33 años",
            salon: "B-2"
        },

        {
            nombre: "Brenda Itzel Herrera García",
            academia: "Formación Técnica",
            materias: "Cultura Digital e Inteligencia Artificial",
            semestres: "1.º y 3.º",
            formacion: "Técnica en Informática, Ingeniería en Sistemas Computacionales y Maestría en Educación",
            antiguedad: "4 años",
            salon: "No especificado"
        },

        {
            nombre: "Walter Allan Barrera Cerda",
            academia: "Inglés",
            materias: "Inglés 3 y Club de Rondalla",
            semestres: "3.º; club para 1.º, 2.º y 3.º",
            formacion: "Ingeniería Industrial y Administración",
            antiguedad: "13 años",
            salon: "No especificado"
        },

        {
            nombre: "Gerardo de la Rosa Ortega",
            academia: "Inglés",
            materias: "Inglés",
            semestres: "5.º",
            formacion: "Licenciatura en Contaduría",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Erika Aidé Pérez Abrego",
            academia: "Ciencias Naturales",
            materias: "Ciencias Naturales y Humanidades",
            semestres: "3.º y 5.º",
            formacion: "Ingeniería Industrial en Sistemas y Maestría en Educación",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Samuel Gonzales de la Fuente",
            academia: "Ciencias Sociales",
            materias: "Pensamiento Filosófico, Ciencias Sociales y Estudios Literarios",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Licenciatura en Administración de Empresas y carrera técnica en Ebanistería",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Laura Esmeralda Heredia Blanco",
            academia: "Ciencias Naturales",
            materias: "Ciencias Naturales, Física y Química",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Biología, con especialización en Física y Química",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Felipe Hernández González",
            academia: "Formación Técnica",
            materias: "Electrónica y Semiconductores, Lengua y Comunicación y Conciencia Histórica",
            semestres: "3.º y 5.º",
            formacion: "Ingeniería en Electrónica",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Yuridia Lizbeth Cepeda Ramos",
            academia: "Matemáticas",
            materias: "Inglés y Temas Selectos de Matemáticas 2",
            semestres: "No especificados",
            formacion: "Ingeniería Industrial, Licenciatura en Matemáticas, Maestría en Educación e Innovación Educativa; estudios de Doctorado en Educación en curso, según la información proporcionada",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Juan Pablo Torres Adame",
            academia: "Formación Técnica",
            materias: "Programación, Cultura Digital, Club de Robótica y cursos de Excel",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Licenciatura en Información Administrativa y Maestría en Ciencias de la Enseñanza",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Romualdo Guadalupe de la Cruz",
            academia: "Matemáticas",
            materias: "Pensamiento Matemático 1 y 3",
            semestres: "1.º y 3.º",
            formacion: "Mantenimiento Industrial y Mantenimiento en Instalaciones Petroleras",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Nohemí Quintanilla Arcos",
            academia: "Por confirmar",
            materias: "No especificadas",
            semestres: "No especificados",
            formacion: "No especificada",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Ulises Solís Rieboles",
            academia: "Ciencias Naturales",
            materias: "Ciencias Naturales",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Químico Farmacéutico Biólogo, maestrías en Análisis Clínicos y Educación; estudios de Doctorado en Educación en curso, según la información proporcionada",
            antiguedad: "No especificada",
            salon: "No especificado"
        },

        {
            nombre: "Trinidad Hernades Barrera",
            academia: "Ciencias Naturales",
            materias: "Ciencias Naturales, Experimentales y Tecnología",
            semestres: "1.º, 3.º y 5.º",
            formacion: "Biología",
            antiguedad: "No especificada",
            salon: "C8"
        },

        {
            nombre: "Mildred Yasmín Reyes Norberto",
            academia: "Matemáticas",
            materias: "Temas Selectos de Matemáticas 2",
            semestres: "5.º",
            formacion: "Ingeniería Química y Maestría en Docencia",
            antiguedad: "No especificada",
            salon: "C1"
        }

    ];

/* =====================================
   FOTOGRAFÍAS DE LOS 25 DOCENTES
===================================== */

docentes.forEach((docente, indice) => {
    docente.foto = `../img/docentes/docente${indice + 1}.jpg`;
});

    /* =====================================
       CREAR TARJETAS
    ===================================== */

    function crearTarjeta(docente) {

        const tarjeta = document.createElement("article");
        tarjeta.className = "docente-card";

       
const foto = document.createElement("div");
foto.className = "docente-foto";

const imagen = document.createElement("img");

imagen.src = docente.foto;
imagen.alt = "Fotografía de " + docente.nombre;
imagen.loading = "lazy";

imagen.onerror = function () {
    foto.textContent = "👩‍🏫";
};

foto.appendChild(imagen);


        const nombre = document.createElement("h3");
        nombre.textContent = docente.nombre;

        const academia = document.createElement("p");
        academia.textContent = "📚 " + docente.academia;

        const semestres = document.createElement("p");
        semestres.textContent = "🎓 " + docente.semestres;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = "Conocer más";

        boton.addEventListener("click", function () {
            abrirPerfil(docente);
        });

        tarjeta.append(
            foto,
            nombre,
            academia,
            semestres,
            boton
        );

        return tarjeta;
    }

    /* =====================================
       MOSTRAR DOCENTES Y FILTRAR
    ===================================== */

    function normalizar(texto) {
        return String(texto)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function mostrarDocentes() {

        const texto = normalizar(buscador.value.trim());
        const academiaElegida = filtro.value;

        const resultados = docentes.filter(function (docente) {

            const contenido = normalizar(
                docente.nombre + " " +
                docente.academia + " " +
                docente.materias
            );

            const coincideTexto = contenido.includes(texto);

            const coincideAcademia =
                academiaElegida === "todos" ||
                docente.academia === academiaElegida;

            return coincideTexto && coincideAcademia;
        });

        lista.replaceChildren();

        resultados.forEach(function (docente) {
            lista.appendChild(crearTarjeta(docente));
        });

        if (contador) {
            contador.textContent =
                "Mostrando " + resultados.length +
                " de " + docentes.length + " docentes";
        }

        if (sinResultados) {
            sinResultados.hidden = resultados.length !== 0;
        }

        if (pendientes) {
            pendientes.hidden = true;
        }
    }

    buscador.addEventListener("input", mostrarDocentes);
    filtro.addEventListener("change", mostrarDocentes);

    if (limpiar) {
        limpiar.addEventListener("click", function () {
            buscador.value = "";
            filtro.value = "todos";
            mostrarDocentes();
        });
    }

    /* =====================================
       VENTANA CONOCER MÁS
    ===================================== */

    function abrirPerfil(docente) {

        if (!modal) return;

        if (modalNombre) {
            modalNombre.textContent = docente.nombre;
        }

        if (modalAcademia) {
            modalAcademia.textContent =
                "📚 Academia: " + docente.academia;
        }

        if (modalSemestre) {
            modalSemestre.textContent =
                "🎓 Semestres: " + docente.semestres;
        }

        if (modalPerfil) {
            modalPerfil.textContent =
                "📖 Materias: " + docente.materias +
                "\n\n🎓 Formación académica: " +
                docente.formacion +
                "\n\n🏫 Años en ITACE: " +
                docente.antiguedad +
                "\n\n🚪 Aula: " + docente.salon;
        }

       
if (modalFoto) {

    modalFoto.textContent = "";

    const imagenModal = document.createElement("img");

    imagenModal.src = docente.foto;
    imagenModal.alt = "Fotografía de " + docente.nombre;

    imagenModal.onerror = function () {
        modalFoto.textContent = "👩‍🏫";
    };

    modalFoto.appendChild(imagenModal);

}


        modal.hidden = false;
        document.body.style.overflow = "hidden";
        cerrar?.focus();
    }

    function cerrarPerfil() {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    cerrar?.addEventListener("click", cerrarPerfil);
    volver?.addEventListener("click", cerrarPerfil);

    modal?.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            cerrarPerfil();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal && !modal.hidden) {
            cerrarPerfil();
        }
    });

    /* =====================================
       INICIAR DIRECTORIO
    ===================================== */

    mostrarDocentes();

});
/* ==========================================
   BOTONES CONOCER MÁS - CARRERAS ITACE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const tarjetas = document.querySelectorAll(
        "#pistaCarreras .tarjeta-carrera"
    );

    const modal = document.getElementById("modalCarrera");
    const titulo = document.getElementById("modalCarreraTitulo");
    const imagen = document.getElementById("modalCarreraImagen");
    const descripcion = document.getElementById("modalCarreraDescripcion");
    const aprendizaje = document.getElementById("modalCarreraAprendizaje");
    const trabajo = document.getElementById("modalCarreraTrabajo");

    const cerrar = document.getElementById("cerrarModalCarrera");
    const volver = document.getElementById("volverCarreras");

    if (!modal || !tarjetas.length) return;

    const informacion = {
        "Inteligencia Artificial": {
            aprendizaje: "Programación, algoritmos, análisis de datos, automatización y fundamentos de inteligencia artificial.",
            trabajo: "Apoyo en proyectos de software, análisis de datos y soluciones tecnológicas."
        },

        "Ciberseguridad": {
            aprendizaje: "Redes informáticas, seguridad de sistemas, protección de información y prevención de amenazas digitales.",
            trabajo: "Soporte técnico, seguridad informática y asistencia en protección de redes."
        },

        "Semiconductores y Microelectrónica": {
            aprendizaje: "Circuitos electrónicos, componentes semiconductores, medición y fundamentos de microelectrónica.",
            trabajo: "Apoyo en procesos electrónicos, pruebas de componentes y mantenimiento de equipos."
        },

        "Diseño Gráfico Digital": {
            aprendizaje: "Diseño visual, ilustración digital, edición de imágenes, composición y comunicación gráfica.",
            trabajo: "Diseño de materiales publicitarios, contenido digital y proyectos creativos."
        },

        "Logística": {
            aprendizaje: "Control de inventarios, almacenamiento, distribución y organización de mercancías.",
            trabajo: "Apoyo en almacenes, inventarios, distribución y operaciones logísticas."
        },

        "Mantenimiento Industrial": {
            aprendizaje: "Mantenimiento preventivo, diagnóstico de fallas y fundamentos de sistemas mecánicos y eléctricos.",
            trabajo: "Apoyo en mantenimiento de maquinaria y equipos industriales."
        },

        "Mantenimiento Automotriz": {
            aprendizaje: "Motores, sistemas automotrices, herramientas, diagnóstico y mantenimiento preventivo.",
            trabajo: "Apoyo en talleres mecánicos, mantenimiento y servicios automotrices."
        }
    };

    function cerrarVentana() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    tarjetas.forEach(function (tarjeta) {

        const boton = tarjeta.querySelector(".boton-conocer");

        if (!boton) return;

        boton.addEventListener("click", function () {

            const nombre = tarjeta.querySelector("h3")?.textContent.trim() || "";
            const foto = tarjeta.querySelector("img");
            const texto = tarjeta.querySelector(
                ".carrera-informacion p"
            );

            const datos = informacion[nombre];

            if (titulo) titulo.textContent = nombre;

            if (descripcion) {
                descripcion.textContent = texto?.textContent.trim() || "";
            }

            if (imagen && foto) {
                imagen.src = foto.getAttribute("src");
                imagen.alt = foto.alt;
            }

            if (aprendizaje) {
                aprendizaje.textContent =
                    datos?.aprendizaje || "Información próximamente.";
            }

            if (trabajo) {
                trabajo.textContent =
                    datos?.trabajo || "Información próximamente.";
            }

            modal.hidden = false;
            modal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
        });

    });

    if (cerrar) {
        cerrar.addEventListener("click", cerrarVentana);
    }

    if (volver) {
        volver.addEventListener("click", cerrarVentana);
    }

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            cerrarVentana();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modal.hidden) {
            cerrarVentana();
        }
    });

});

/* ==========================================
   CONOCER MÁS - CLUBES ESTUDIANTILES
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("modalClub");
    const titulo = document.getElementById("tituloClub");
    const descripcion = document.getElementById("descripcionClub");
    const habilidades = document.getElementById("habilidadesClub");

    const cerrar = document.getElementById("cerrarClub");
    const volver = document.getElementById("volverClub");

    const botones = document.querySelectorAll(
        "#clubes .club-card button[data-club]"
    );

    // Evitar errores en las demás páginas
    if (!modal || !botones.length) return;

    /* INFORMACIÓN DE LOS CLUBES */

    const clubes = {

        rondalla: {
            nombre: "🎶 Rondalla",
            descripcion:
                "Un espacio dedicado a la música, el canto y la interpretación de canciones en grupo.",
            habilidades:
                "Afinación, ritmo, interpretación musical, trabajo en equipo y expresión artística."
        },

        banda: {
            nombre: "🥁 Banda de Guerra",
            descripcion:
                "Actividad que promueve la disciplina, la coordinación y la participación en ceremonias escolares.",
            habilidades:
                "Disciplina, coordinación, responsabilidad, concentración y compañerismo."
        },

        oratoria: {
            nombre: "🎤 Oratoria",
            descripcion:
                "Club dedicado a mejorar la expresión oral y la capacidad de comunicar ideas frente a otras personas.",
            habilidades:
                "Seguridad al hablar, expresión verbal, argumentación, dicción y comunicación."
        },

        robotica: {
            nombre: "🤖 Robótica",
            descripcion:
                "Espacio para explorar la tecnología mediante proyectos de programación, electrónica y automatización.",
            habilidades:
                "Pensamiento lógico, creatividad, programación, resolución de problemas y trabajo colaborativo."
        },

        danza: {
            nombre: "💃 Danza",
            descripcion:
                "Actividad artística que permite expresarse a través del movimiento, la música y las coreografías.",
            habilidades:
                "Coordinación, ritmo, expresión corporal, creatividad y trabajo en equipo."
        },

        ajedrez: {
            nombre: "♟️ Ajedrez",
            descripcion:
                "Club donde se practica el ajedrez y se desarrollan estrategias para resolver diferentes situaciones.",
            habilidades:
                "Concentración, memoria, paciencia, lógica y pensamiento estratégico."
        },

        dibujo: {
            nombre: "🎨 Dibujo",
            descripcion:
                "Espacio para desarrollar la creatividad mediante técnicas de dibujo y expresión visual.",
            habilidades:
                "Observación, imaginación, creatividad, composición y expresión artística."
        },

        premilitar: {
            nombre: "🎖️ Premilitar",
            descripcion:
                "Actividad enfocada en la disciplina, el orden, el respeto y el desarrollo de hábitos de responsabilidad.",
            habilidades:
                "Disciplina, coordinación, liderazgo, respeto, compromiso y trabajo en equipo."
        }

    };

    /* ABRIR VENTANA */

    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const clave = boton.dataset.club;
            const club = clubes[clave];

            if (!club) return;

            titulo.textContent = club.nombre;
            descripcion.textContent = club.descripcion;
            habilidades.textContent = club.habilidades;

            modal.hidden = false;
            document.body.style.overflow = "hidden";

            cerrar?.focus();

        });

    });

    /* CERRAR VENTANA */

    function cerrarModalClub() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    cerrar?.addEventListener("click", cerrarModalClub);
    volver?.addEventListener("click", cerrarModalClub);

    /* CERRAR AL HACER CLIC FUERA */

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            cerrarModalClub();
        }
    });

    /* CERRAR CON ESC */

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modal.hidden) {
            cerrarModalClub();
        }
    });

});

/* =====================================
   📸 GALERÍA DIGITAL ITACE
   20 FOTOGRAFÍAS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const galeria = document.getElementById("albumGaleria");
    const modal = document.getElementById("albumModal");

    // Evitar ejecutar la galería en otras páginas
    if (!galeria || !modal) return;

    /* =====================================
       LISTA DE LAS 20 FOTOGRAFÍAS
    ===================================== */

    const fotos = [
        {
            archivo: "foto8.jpg",
            categoria: "eventos",
            titulo: "Momentos especiales",
            descripcion: "Recuerdos de nuestra comunidad escolar."
        },
        {
            archivo: "foto9.jpg",
            categoria: "talleres",
            titulo: "Aprendiendo juntos",
            descripcion: "Experiencias que fortalecen el aprendizaje."
        },
        {
            archivo: "galeria1.jpg",
            categoria: "eventos",
            titulo: "Celebraciones escolares",
            descripcion: "Momentos especiales de nuestra institución."
        },
        {
            archivo: "galeria2.jpg",
            categoria: "cultura",
            titulo: "Orgullo y tradición",
            descripcion: "Expresiones culturales de nuestra comunidad."
        },
        {
            archivo: "galeria3.jpg",
            categoria: "deportes",
            titulo: "Espíritu deportivo",
            descripcion: "Esfuerzo, compañerismo y participación."
        },
        {
            archivo: "galeria4.jpg",
            categoria: "talleres",
            titulo: "Aprendizaje en acción",
            descripcion: "Desarrollando nuevas habilidades."
        },
        {
            archivo: "galeria5.jpg",
            categoria: "eventos",
            titulo: "Nuestra comunidad",
            descripcion: "Experiencias que nos unen."
        },
        {
            archivo: "galeria6.jpg",
            categoria: "cultura",
            titulo: "Talento estudiantil",
            descripcion: "Creatividad y expresión artística."
        },
        {
            archivo: "galeria7.jpg",
            categoria: "deportes",
            titulo: "Pasión por el deporte",
            descripcion: "Trabajo en equipo y superación."
        },
        {
            archivo: "galeria8.jpg",
            categoria: "talleres",
            titulo: "Explorando conocimientos",
            descripcion: "Aprendiendo a través de la práctica."
        },
        {
            archivo: "galeria9.jpg",
            categoria: "eventos",
            titulo: "Momentos inolvidables",
            descripcion: "Recuerdos de nuestra vida escolar."
        },
        {
            archivo: "galeria10.jpg",
            categoria: "cultura",
            titulo: "Arte y creatividad",
            descripcion: "Espacios para descubrir nuestros talentos."
        },
        {
            archivo: "galeria11.jpg",
            categoria: "deportes",
            titulo: "Unidos por el deporte",
            descripcion: "Participación y convivencia estudiantil."
        },
        {
            archivo: "galeria12.jpg",
            categoria: "talleres",
            titulo: "Innovación estudiantil",
            descripcion: "Ideas y habilidades para el futuro."
        },
        {
            archivo: "galeria13.jpg",
            categoria: "eventos",
            titulo: "Celebrando juntos",
            descripcion: "Actividades de nuestra comunidad escolar."
        },
        {
            archivo: "galeria14.jpg",
            categoria: "cultura",
            titulo: "Nuestras tradiciones",
            descripcion: "Celebrando la diversidad cultural."
        },
        {
            archivo: "galeria15.jpg",
            categoria: "deportes",
            titulo: "Grandes experiencias",
            descripcion: "Disciplina, esfuerzo y compañerismo."
        },
        {
            archivo: "galeria16.jpg",
            categoria: "talleres",
            titulo: "Construyendo el futuro",
            descripcion: "Creatividad y aprendizaje práctico."
        },
        {
            archivo: "galeria17.jpg",
            categoria: "eventos",
            titulo: "Historias para recordar",
            descripcion: "Experiencias que forman parte del ITACE."
        },
        {
            archivo: "galeria18.jpg",
            categoria: "cultura",
            titulo: "Expresando nuestro talento",
            descripcion: "Momentos de creatividad estudiantil."
        }
    ];

    /* =====================================
       NOMBRES DE LAS CATEGORÍAS
    ===================================== */

    const nombresCategorias = {
        eventos: "🎉 Eventos",
        talleres: "🔬 Talleres",
        deportes: "🏆 Deportes",
        cultura: "🎭 Cultura"
    };

    /* =====================================
       ELEMENTOS DE LA GALERÍA
    ===================================== */

    const filtros = document.querySelectorAll(".filtro-album");

    const botonVerMas = document.getElementById("albumVerMas");
    const mensajeVacio = document.getElementById("albumVacio");

    const imagenGrande = document.getElementById("albumImagenGrande");
    const tituloGrande = document.getElementById("albumTitulo");
    const descripcionGrande = document.getElementById("albumDescripcion");
    const contador = document.getElementById("albumContador");

    const cerrar = document.getElementById("albumCerrar");
    const anterior = document.getElementById("albumAnterior");
    const siguiente = document.getElementById("albumSiguiente");

    if (
        !botonVerMas || !mensajeVacio ||
        !imagenGrande || !tituloGrande ||
        !descripcionGrande || !contador ||
        !cerrar || !anterior || !siguiente
    ) return;

    let categoriaActual = "todos";
    let mostrarTodas = false;
    let indiceActual = 0;
    let fotosVisibles = [];
    let botonAnterior = null;

    /* =====================================
       CREAR TARJETAS DE FOTOGRAFÍAS
    ===================================== */

    function crearTarjeta(foto) {

        const figura = document.createElement("figure");
        figura.className = "album-foto";
        figura.dataset.categoria = foto.categoria;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "album-abrir";
        boton.setAttribute("aria-label", "Ampliar " + foto.titulo);

        const imagen = document.createElement("img");
        imagen.src = "../img/" + foto.archivo;
        imagen.alt = foto.titulo;
        imagen.loading = "lazy";

        boton.appendChild(imagen);

        const pie = document.createElement("figcaption");

        const categoria = document.createElement("span");
        categoria.textContent = nombresCategorias[foto.categoria];

        const titulo = document.createElement("h3");
        titulo.textContent = foto.titulo;

        const descripcion = document.createElement("p");
        descripcion.textContent = foto.descripcion;

        pie.append(categoria, titulo, descripcion);
        figura.append(boton, pie);

        boton.addEventListener("click", function () {
            botonAnterior = boton;
            abrirFoto(foto);
        });

        return figura;
    }

    /* =====================================
       MOSTRAR Y FILTRAR FOTOGRAFÍAS
    ===================================== */

    function actualizarGaleria() {

        const filtradas = fotos.filter(function (foto) {
            return categoriaActual === "todos" ||
                   foto.categoria === categoriaActual;
        });

        const cantidadInicial = 8;

        const fotosAMostrar = mostrarTodas
            ? filtradas
            : filtradas.slice(0, cantidadInicial);

        galeria.replaceChildren();

        fotosAMostrar.forEach(function (foto) {
            galeria.appendChild(crearTarjeta(foto));
        });

        mensajeVacio.hidden = filtradas.length > 0;

        botonVerMas.hidden = filtradas.length <= cantidadInicial;

        if (!botonVerMas.hidden) {
            botonVerMas.textContent = mostrarTodas
                ? "💗 Ver menos fotografías"
                : "💗 Ver más fotografías";
        }
    }

    /* =====================================
       BOTONES DE FILTROS
    ===================================== */

    filtros.forEach(function (boton) {

        boton.addEventListener("click", function () {

            categoriaActual = boton.dataset.filtro;
            mostrarTodas = false;

            filtros.forEach(function (filtro) {

                const activo = filtro === boton;

                filtro.classList.toggle("activo", activo);

                filtro.setAttribute(
                    "aria-pressed",
                    String(activo)
                );
            });

            actualizarGaleria();
        });
    });

    /* =====================================
       BOTÓN VER MÁS
    ===================================== */

    botonVerMas.addEventListener("click", function () {

        mostrarTodas = !mostrarTodas;

        actualizarGaleria();

        if (!mostrarTodas) {

            document.getElementById("galeria")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }
    });

    /* =====================================
       ABRIR FOTOGRAFÍA EN GRANDE
    ===================================== */

    function abrirFoto(foto) {

        fotosVisibles = fotos.filter(function (item) {
            return categoriaActual === "todos" ||
                   item.categoria === categoriaActual;
        });

        indiceActual = fotosVisibles.indexOf(foto);

        if (indiceActual === -1) return;

        actualizarModal();

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        cerrar.focus();
    }

    /* =====================================
       ACTUALIZAR FOTO AMPLIADA
    ===================================== */

    function actualizarModal() {

        const foto = fotosVisibles[indiceActual];

        if (!foto) return;

        imagenGrande.src = "../img/" + foto.archivo;
        imagenGrande.alt = foto.titulo;

        tituloGrande.textContent = foto.titulo;
        descripcionGrande.textContent = foto.descripcion;

        contador.textContent =
            "Fotografía " + (indiceActual + 1) +
            " de " + fotosVisibles.length;
    }

    /* =====================================
       CAMBIAR FOTOGRAFÍA
    ===================================== */

    function cambiarFoto(direccion) {

        if (fotosVisibles.length === 0) return;

        indiceActual =
            (indiceActual + direccion + fotosVisibles.length) %
            fotosVisibles.length;

        actualizarModal();
    }

    anterior.addEventListener("click", function () {
        cambiarFoto(-1);
    });

    siguiente.addEventListener("click", function () {
        cambiarFoto(1);
    });

    /* =====================================
       CERRAR FOTOGRAFÍA
    ===================================== */

    function cerrarModal() {

        modal.hidden = true;

        imagenGrande.removeAttribute("src");

        document.body.style.overflow = "";

        if (botonAnterior && botonAnterior.isConnected) {
            botonAnterior.focus();
        }
    }

    cerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", function (evento) {

        if (evento.target === modal) {
            cerrarModal();
        }
    });

    /* =====================================
       CONTROLES DEL TECLADO
    ===================================== */

    document.addEventListener("keydown", function (evento) {

        if (modal.hidden) return;

        if (evento.key === "Escape") {
            cerrarModal();
        }

        if (evento.key === "ArrowLeft") {
            cambiarFoto(-1);
        }

        if (evento.key === "ArrowRight") {
            cambiarFoto(1);
        }
    });

    /* =====================================
       INICIAR GALERÍA
    ===================================== */

    actualizarGaleria();

});

/* =====================================
   REPRODUCTOR DE MÚSICA ITACE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const musica = document.getElementById("musicaFondo");
    const boton = document.getElementById("botonMusica");

    if (!musica || !boton) return;

    musica.volume = 0.35;

    // Recordar la preferencia entre páginas.
    let musicaActivada = false;

    try {
        musicaActivada =
            sessionStorage.getItem("musicaItace") === "activada";
    } catch (error) {
        musicaActivada = false;
    }

    function guardarPreferencia(activada) {
        try {
            sessionStorage.setItem(
                "musicaItace",
                activada ? "activada" : "pausada"
            );
        } catch (error) {
            // La música sigue funcionando sin almacenamiento.
        }
    }

    function actualizarBoton() {

        if (musica.paused) {
            boton.textContent = "🎵";
            boton.classList.remove("reproduciendo");
            boton.setAttribute("aria-label", "Reproducir música");
            boton.setAttribute("aria-pressed", "false");
            boton.title = "Reproducir música";
        } else {
            boton.textContent = "⏸";
            boton.classList.add("reproduciendo");
            boton.setAttribute("aria-label", "Pausar música");
            boton.setAttribute("aria-pressed", "true");
            boton.title = "Pausar música";
        }
    }

    async function reproducirMusica() {
        try {
            await musica.play();
            guardarPreferencia(true);
        } catch (error) {
            actualizarBoton();
        }
    }

    boton.addEventListener("click", async function () {

        if (musica.paused) {
            await reproducirMusica();
        } else {
            musica.pause();
            guardarPreferencia(false);
        }
    });

    musica.addEventListener("play", actualizarBoton);
    musica.addEventListener("pause", actualizarBoton);
    musica.addEventListener("ended", actualizarBoton);

    // Intentar reanudar la música al abrir otra página.
    // Algunos navegadores requieren un nuevo clic.
    if (musicaActivada) {
        reproducirMusica();
    }

    actualizarBoton();

});

/* =====================================
   🌸 CARRUSEL 3D - 25 INSTALACIONES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const pista = document.getElementById("instalacionesPista");
    if (!pista) return;

    const botonAnterior = document.getElementById("instalacionesAnterior");
    const botonSiguiente = document.getElementById("instalacionesSiguiente");
    const indicadores = document.getElementById("instalacionesIndicadores");

    if (!botonAnterior || !botonSiguiente || !indicadores) return;

    /* =====================================
       LISTA DE LAS 25 FOTOGRAFÍAS
    ===================================== */

/* =====================================
   FOTOGRAFÍAS Y DESCRIPCIONES
===================================== */

const instalaciones = [

    // FOTOGRAFÍA 1
    {
        imagen: "../img/instalacion1.jpg",
        nombre: "Nombre del lugar 1",
        descripcion: "Escribe aquí qué es este lugar y para qué se utiliza."
    },

    // FOTOGRAFÍA 2
    {
        imagen: "../img/instalacion2.jpg",
        nombre: "Nombre del lugar 2",
        descripcion: "Escribe aquí la descripción de este espacio."
    },

    // FOTOGRAFÍA 3
    {
        imagen: "../img/instalacion3.jpg",
        nombre: "Nombre del lugar 3",
        descripcion: "Explica qué actividades se realizan aquí."
    },

    // FOTOGRAFÍA 4
    {
        imagen: "../img/instalacion4.jpg",
        nombre: "Nombre del lugar 4",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 5
    {
        imagen: "../img/instalacion5.jpg",
        nombre: "Nombre del lugar 5",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 6
    {
        imagen: "../img/instalacion6.jpg",
        nombre: "Nombre del lugar 6",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 7
    {
        imagen: "../img/instalacion7.jpg",
        nombre: "Nombre del lugar 7",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 8
    {
        imagen: "../img/instalacion8.jpg",
        nombre: "Nombre del lugar 8",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 9
    {
        imagen: "../img/instalacion9.jpg",
        nombre: "Nombre del lugar 9",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 10
    {
        imagen: "../img/instalacion10.jpg",
        nombre: "Nombre del lugar 10",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 11
    {
        imagen: "../img/instalacion11.jpg",
        nombre: "Nombre del lugar 11",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 12
    {
        imagen: "../img/instalacion12.jpg",
        nombre: "Nombre del lugar 12",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 13
    {
        imagen: "../img/instalacion13.jpg",
        nombre: "Nombre del lugar 13",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 14
    {
        imagen: "../img/instalacion14.jpg",
        nombre: "Nombre del lugar 14",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 15
    {
        imagen: "../img/instalacion15.jpg",
        nombre: "Nombre del lugar 15",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 16
    {
        imagen: "../img/instalacion16.jpg",
        nombre: "Nombre del lugar 16",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 17
    {
        imagen: "../img/instalacion17.jpg",
        nombre: "Nombre del lugar 17",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 18
    {
        imagen: "../img/instalacion18.jpg",
        nombre: "Nombre del lugar 18",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 19
    {
        imagen: "../img/instalacion19.jpg",
        nombre: "Nombre del lugar 19",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 20
    {
        imagen: "../img/instalacion20.jpg",
        nombre: "Nombre del lugar 20",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 21
    {
        imagen: "../img/instalacion21.jpg",
        nombre: "Nombre del lugar 21",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 22
    {
        imagen: "../img/instalacion22.jpg",
        nombre: "Nombre del lugar 22",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 23
    {
        imagen: "../img/instalacion23.jpg",
        nombre: "Nombre del lugar 23",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 24
    {
        imagen: "../img/instalacion24.jpg",
        nombre: "Nombre del lugar 24",
        descripcion: "Escribe aquí la descripción."
    },

    // FOTOGRAFÍA 25
    {
        imagen: "../img/instalacion25.jpg",
        nombre: "Nombre del lugar 25",
        descripcion: "Escribe aquí la descripción."
    }

];


    /* =====================================
       CREAR LAS TARJETAS
    ===================================== */

    instalaciones.forEach(function (lugar) {

        const tarjeta = document.createElement("article");
        tarjeta.className = "instalacion-tarjeta";

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "instalacion-giro";
        boton.setAttribute("aria-pressed", "false");
        boton.setAttribute(
            "aria-label",
            "Ver descripción de " + lugar.nombre
        );

        const interior = document.createElement("span");
        interior.className = "instalacion-interior";

        const frente = document.createElement("span");
        frente.className = "instalacion-frente";

        const imagen = document.createElement("img");
        imagen.src = lugar.imagen;
        imagen.alt = lugar.nombre;
        imagen.loading = "lazy";

        const etiqueta = document.createElement("span");
        etiqueta.className = "instalacion-etiqueta";
        etiqueta.textContent = lugar.nombre;

        const indicacion = document.createElement("span");
        indicacion.className = "instalacion-indicacion";
        indicacion.textContent = "↻ Toca para conocer más";

        frente.append(imagen, etiqueta, indicacion);

        const atras = document.createElement("span");
        atras.className = "instalacion-atras";

        const icono = document.createElement("span");
        icono.className = "instalacion-icono";
        icono.textContent = "🏫";

        const titulo = document.createElement("strong");
        titulo.textContent = lugar.nombre;

        const descripcion = document.createElement("span");
        descripcion.className = "instalacion-descripcion";
        descripcion.textContent = lugar.descripcion;

        const regresar = document.createElement("span");
        regresar.className = "instalacion-regresar";
        regresar.textContent = "↻ Volver a la fotografía";

        atras.append(icono, titulo, descripcion, regresar);
        interior.append(frente, atras);
        boton.appendChild(interior);
        tarjeta.appendChild(boton);
        pista.appendChild(tarjeta);

        boton.addEventListener("click", function () {

            const volteada = tarjeta.classList.toggle("volteada");

            boton.setAttribute("aria-pressed", String(volteada));

            boton.setAttribute(
                "aria-label",
                volteada
                    ? "Volver a la fotografía de " + lugar.nombre
                    : "Ver descripción de " + lugar.nombre
            );
        });
    });

    /* =====================================
       CONFIGURACIÓN DEL CARRUSEL
    ===================================== */

    const tarjetas = Array.from(
        pista.querySelectorAll(".instalacion-tarjeta")
    );

    let posicion = 0;

    function tarjetasVisibles() {

        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;

        return 3;
    }

    function crearIndicadores() {

        indicadores.replaceChildren();

        const total = Math.max(
            1,
            tarjetas.length - tarjetasVisibles() + 1
        );

        for (let i = 0; i < total; i++) {

            const punto = document.createElement("button");
            punto.type = "button";
            punto.className = "instalaciones-punto";
            punto.setAttribute(
                "aria-label",
                "Mostrar instalaciones desde la posición " + (i + 1)
            );

            punto.addEventListener("click", function () {
                posicion = i;
                actualizarCarrusel();
            });

            indicadores.appendChild(punto);
        }
    }

    function actualizarCarrusel() {

        const maximo = Math.max(
            0,
            tarjetas.length - tarjetasVisibles()
        );

        posicion = Math.max(0, Math.min(posicion, maximo));

        const estilos = getComputedStyle(pista);
        const espacio = parseFloat(estilos.columnGap) || 0;
        const ancho = tarjetas[0].getBoundingClientRect().width;

        pista.style.transform =
            `translateX(-${posicion * (ancho + espacio)}px)`;

        botonAnterior.disabled = posicion === 0;
        botonSiguiente.disabled = posicion === maximo;

        indicadores.querySelectorAll(".instalaciones-punto")
            .forEach(function (punto, indice) {

                const activo = indice === posicion;

                punto.classList.toggle("activo", activo);
                punto.setAttribute(
                    "aria-current",
                    activo ? "true" : "false"
                );
            });
    }

    botonAnterior.addEventListener("click", function () {
        posicion--;
        actualizarCarrusel();
    });

    botonSiguiente.addEventListener("click", function () {
        posicion++;
        actualizarCarrusel();
    });

    let visiblesAnteriores = tarjetasVisibles();

    window.addEventListener("resize", function () {

        const visiblesActuales = tarjetasVisibles();

        if (visiblesActuales !== visiblesAnteriores) {
            visiblesAnteriores = visiblesActuales;
            crearIndicadores();
        }

        actualizarCarrusel();
    });

    crearIndicadores();
    actualizarCarrusel();

});

/* =====================================
   🌸 CHECKLIST DE ADMISIONES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const checks = document.querySelectorAll(".admision-check");

    const barra = document.getElementById(
        "admisionesBarraProgreso"
    );

    const texto = document.getElementById(
        "admisionesTextoProgreso"
    );

    const reiniciar = document.getElementById(
        "reiniciarChecklist"
    );

    // Evita ejecutar este código en otras páginas
    if (!checks.length || !barra || !texto || !reiniciar) {
        return;
    }

    function actualizarProgreso() {

        const total = checks.length;

        const preparados = Array.from(checks).filter(
            check => check.checked
        ).length;

        const porcentaje = (preparados / total) * 100;

        barra.style.width = porcentaje + "%";

        texto.textContent =
            preparados + " de " + total +
            " documentos preparados";
    }

    checks.forEach(function (check) {

        check.addEventListener(
            "change",
            actualizarProgreso
        );
    });

    reiniciar.addEventListener("click", function () {

        checks.forEach(function (check) {
            check.checked = false;
        });

        actualizarProgreso();
    });

    actualizarProgreso();

});

/* =====================================
   🌸 CONTACTO - COPIAR CORREO
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botonCopiar = document.getElementById("copiarCorreo");

    const mensaje = document.getElementById(
        "contactoMensajeCopia"
    );

    if (!botonCopiar || !mensaje) return;

    const correo = "plantel.reynosa@itace.edu.mx";

    botonCopiar.addEventListener("click", async function () {

        try {

            if (!navigator.clipboard) {
                throw new Error("Portapapeles no disponible");
            }

            await navigator.clipboard.writeText(correo);

            mensaje.textContent = "✓ Correo copiado correctamente";

        } catch (error) {

            mensaje.textContent =
                "No se pudo copiar automáticamente. " +
                "Selecciona el correo de arriba y cópialo.";

        }
    });

});

/* ==========================================
   BOTONES DE DETALLES - CURSOS ITACE ICAT
========================================== */

document.querySelectorAll('.curso-icat-detalles').forEach((boton) => {

    boton.addEventListener('click', () => {

        const panel = boton.nextElementSibling;

        const abierto = !panel.hidden;

        panel.hidden = abierto;

        boton.setAttribute(
            'aria-expanded',
            String(!abierto)
        );

        boton.textContent = abierto
            ? 'Ver detalles'
            : 'Ocultar detalles';

    });

});

/* ==========================================
   CARRUSEL DE CURSOS ITACE - ICAT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carrusel = document.querySelector(
        "#cursos .cursos-icat-grid"
    );

    const anterior = document.querySelector(
        "#cursos .anterior-icat"
    );

    const siguiente = document.querySelector(
        "#cursos .siguiente-icat"
    );

    if (!carrusel || !anterior || !siguiente) return;

    function mover(direccion) {
        const tarjeta = carrusel.querySelector(
            ".curso-icat-card"
        );

        if (!tarjeta) return;

        const gap = parseFloat(
            getComputedStyle(carrusel).columnGap
        ) || 0;

        const distancia = tarjeta.getBoundingClientRect().width + gap;

        carrusel.scrollBy({
            left: direccion * distancia,
            behavior: "smooth"
        });
    }

    function actualizarFlechas() {
        const maximo = carrusel.scrollWidth - carrusel.clientWidth;

        anterior.disabled = carrusel.scrollLeft <= 2;
        siguiente.disabled = carrusel.scrollLeft >= maximo - 2;
    }

    anterior.addEventListener("click", () => mover(-1));
    siguiente.addEventListener("click", () => mover(1));

    carrusel.addEventListener("scroll", actualizarFlechas);
    window.addEventListener("resize", actualizarFlechas);

    actualizarFlechas();
});
