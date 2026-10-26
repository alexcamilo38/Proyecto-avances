const contactDetails = [
    {
        icon: "bi-telephone",
        label: "Línea telefónica",
        value: "(602) 820 0000 · Ext. 102",
        href: "tel:+576028200000",
    },
    {
        icon: "bi-envelope",
        label: "Correo electrónico",
        value: "easymatric76@gmail.com",
        href: "mailto:easymatric76@gmail.com",
    },
    {
        icon: "bi-clock",
        label: "Horario de atención",
        value: "Lunes a viernes · 7:00 a. m. – 4:00 p. m.",
    },
];

const Contacto = () => {
    return (
        <main className="relative isolate overflow-hidden bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-40 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl"
            />
            <section
                id="contacto"
                aria-labelledby="contacto-titulo"
                className="mx-auto max-w-6xl"
            >
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                        <i className="bi bi-chat-dots" aria-hidden="true" />
                        Estamos para ayudarte
                    </span>
                    <h1
                        id="contacto-titulo"
                        className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
                    >
                        Hablemos de tu{" "}
                        <span className="text-blue-600">próxima matrícula</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                        ¿Tienes dudas sobre el proceso? Nuestro equipo está listo para
                        acompañarte y resolverlas.
                    </p>
                </div>

                <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.22)] ring-1 ring-slate-200/80 lg:grid-cols-[0.85fr_1.15fr]">
                    <aside className="relative isolate overflow-hidden bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-900 p-8 text-white sm:p-10 lg:p-12">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full border-[36px] border-white/10"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl"
                        />
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                            Centro de contacto
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight">
                            Estamos a un mensaje de distancia.
                        </h2>
                        <p className="mt-4 max-w-md leading-7 text-blue-100">
                            Elige el canal que prefieras. Te atenderemos con gusto.
                        </p>

                        <div className="mt-10 space-y-7">
                            {contactDetails.map(({ icon, label, value, href }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg text-white ring-1 ring-white/20">
                                        <i className={`bi ${icon}`} aria-hidden="true" />
                                    </span>
                                    <div className="pt-0.5">
                                        <h3 className="text-sm font-semibold text-blue-100">
                                            {label}
                                        </h3>
                                        {href ? (
                                            <a
                                                href={href}
                                                className="mt-1 inline-block break-all font-medium text-white underline-offset-4 transition hover:underline"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="mt-1 font-medium text-white">
                                                {value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 border-t border-white/20 pt-6 text-sm text-blue-100">
                            <i className="bi bi-shield-check mr-2" aria-hidden="true" />
                            Tu consulta será atendida de forma segura y confidencial.
                        </div>
                    </aside>

                    <div className="p-8 sm:p-10 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                Envíanos un mensaje
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Completa el formulario y nos pondremos en contacto contigo.
                            </p>
                        </div>

                        <form className="space-y-5">
                            <div>
                                <label
                                    htmlFor="contacto-nombre"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Nombre completo
                                </label>
                                <input
                                    id="contacto-nombre"
                                    name="nombre"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Ej. Juan Pérez"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="contacto-correo"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    id="contacto-correo"
                                    name="correo"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="correo@ejemplo.com"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="contacto-mensaje"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    ¿En qué podemos ayudarte?
                                </label>
                                <textarea
                                    id="contacto-mensaje"
                                    name="mensaje"
                                    rows="5"
                                    placeholder="Cuéntanos tu duda..."
                                    required
                                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 sm:w-auto"
                            >
                                Enviar consulta
                                <i className="bi bi-arrow-right" aria-hidden="true" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contacto;
