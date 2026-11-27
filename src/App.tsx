import React from 'react';
import { CalendarPlus, X, Check, MapPin, Volume2, VolumeX, Ticket } from 'lucide-react';
import { EVENTO, mapaUrl, mapaEmbed } from './config';

const FECHA = new Date(EVENTO.fechaISO);
const BASE = import.meta.env.BASE_URL;
const foto = (ruta: string) => `${BASE}${ruta}`;

function useCuentaRegresiva() {
  const [ahora, setAhora] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = window.setInterval(() => setAhora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const resta = Math.max(0, FECHA.getTime() - ahora);
  return {
    dias: Math.floor(resta / 86400000),
    horas: Math.floor((resta / 3600000) % 24),
    minutos: Math.floor((resta / 60000) % 60),
    segundos: Math.floor((resta / 1000) % 60),
  };
}

const enlaceCalendario = () => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${EVENTO.nombre} cumple ${EVENTO.edad}`,
    dates: EVENTO.calendario,
    ctz: 'America/Mexico_City',
    details: `Fiesta de los ${EVENTO.edad} años de ${EVENTO.nombre}. ${EVENTO.vestimenta}`,
    location: [EVENTO.lugar.nombre, EVENTO.lugar.direccion].filter(Boolean).join(', '),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/* ---------- Entrada: boleto que se corta ---------- */

function Entrada({ entrar, alTocar }: { entrar: () => void; alTocar: () => void }) {
  const [saliendo, setSaliendo] = React.useState(false);

  const abrir = () => {
    if (saliendo) return;
    alTocar();
    setSaliendo(true);
    const rapido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(entrar, rapido ? 300 : 1550);
  };

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center overflow-hidden bg-tinta px-6 ${saliendo ? 'bo-saliendo' : ''}`}
      role="dialog"
      aria-label="Entrada a la invitación"
    >
      <button
        type="button"
        onClick={abrir}
        className="bo-boleto group flex w-full max-w-[340px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-papel"
        aria-label="Entrar a la invitación"
      >
        <span className="flex flex-1 flex-col gap-3 bg-rojo p-5 text-tinta">
          <span className="font-poster text-xs tracking-[0.2em] text-papel">GIRA 1967—2027 · FECHA ÚNICA</span>
          <span className="font-poster text-[56px] leading-[0.85]">{EVENTO.nombre.toUpperCase()}</span>
          <span className="contorno font-poster text-[88px] leading-[0.8]">{EVENTO.edad}</span>
          <span className="text-xs font-bold uppercase tracking-[0.14em]">
            {EVENTO.fechaCorta} · {EVENTO.hora} · {EVENTO.lugar.nombre}
          </span>
        </span>
        <span className="bo-talon relative flex w-[74px] flex-col items-center justify-center border-l-2 border-dashed border-rojo bg-papel">
          <span className="font-poster text-sm tracking-[0.28em] [writing-mode:vertical-rl] rotate-180">ADMITE UNO</span>
        </span>
      </button>
      <p className="bo-pulso pointer-events-none absolute inset-x-0 bottom-[max(48px,calc(env(safe-area-inset-bottom)+32px))] text-center font-poster text-sm tracking-[0.3em] text-papel">
        TOCA EL BOLETO PARA ENTRAR
      </p>
    </div>
  );
}

/* ---------- Secciones ---------- */

function Portada() {
  return (
    <header id="inicio" className="relative">
      <div className="relative h-[min(78vh,560px)] overflow-hidden bg-tinta">
        <img
          src={foto(EVENTO.fotoPortada)}
          alt={`${EVENTO.nombre} con lentes de sol y saco azul`}
          className="foto-poster h-full w-full object-cover object-[50%_22%] opacity-90 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-rojo" />
        <div className="absolute inset-x-5 top-[max(20px,calc(env(safe-area-inset-top)+12px))] flex justify-between font-poster text-[13px] tracking-[0.16em] text-papel">
          <span>GIRA 1967—2027</span>
          <span>FECHA ÚNICA</span>
        </div>
      </div>
      <div className="relative -mt-28 px-5">
        <h1 className="po-nombre font-poster text-[clamp(76px,24vw,112px)] leading-[0.85] tracking-[-0.01em]">
          {EVENTO.nombre.toUpperCase()}
        </h1>
        <p className="contorno font-poster text-[clamp(140px,44vw,200px)] leading-[0.8]" aria-label={`${EVENTO.edad} años`}>
          {EVENTO.edad}
        </p>
        <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em]">Seis décadas en el escenario</p>
        <p className="mt-1 text-sm">
          {EVENTO.nacimiento} → {EVENTO.cumple}
        </p>
      </div>
    </header>
  );
}

function CuentaRegresiva() {
  const { dias, horas, minutos, segundos } = useCuentaRegresiva();
  const celdas = [
    ['Días', dias],
    ['Horas', horas],
    ['Min', minutos],
    ['Seg', segundos],
  ] as const;
  return (
    <section aria-label="Cuenta regresiva" className="px-5">
      <h2 className="mb-2 font-poster text-lg tracking-[0.14em]">FALTAN</h2>
      <div className="grid grid-cols-4 gap-1.5">
        {celdas.map(([t, v]) => (
          <div key={t} className="flex flex-col items-center bg-tinta py-3 text-papel">
            <span className="font-poster text-[34px] leading-none tabular-nums">{String(v).padStart(2, '0')}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gira() {
  return (
    <section id="gira" aria-label="La gira" className="scroll-mt-6 px-5">
      <h2 className="mb-3 font-poster text-lg tracking-[0.14em]">FECHAS DE LA GIRA</h2>
      <ol className="flex flex-col">
        {EVENTO.gira.map((g) => (
          <li
            key={g.epoca}
            className="grid grid-cols-[64px_1fr_56px] items-center gap-3 border-t-2 border-tinta py-2.5 last:border-b-2"
          >
            <span className="font-poster text-xl tabular-nums">{g.epoca}</span>
            <span className="font-poster text-lg uppercase tracking-[0.03em]">{g.titulo}</span>
            <img src={foto(g.foto)} alt={`${EVENTO.nombre}, ${g.epoca}`} loading="lazy" className="foto-poster aspect-[3/4] w-14 object-cover" />
          </li>
        ))}
      </ol>
    </section>
  );
}

function FechaUnica() {
  return (
    <section id="fecha" aria-label="Fecha y lugar" className="scroll-mt-6 bg-tinta px-5 py-8 text-papel">
      <p className="font-poster text-sm tracking-[0.2em] text-rojo">FECHA ÚNICA</p>
      <h2 className="mt-1 font-poster text-[44px] uppercase leading-[0.95]">{EVENTO.fechaTexto}</h2>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-[15px]">
        <dt className="pt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] opacity-60">Puertas</dt>
        <dd className="font-poster text-2xl leading-none">{EVENTO.hora.toUpperCase()}</dd>
        <dt className="pt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] opacity-60">Lugar</dt>
        <dd>
          <span className="font-poster text-2xl uppercase leading-none">{EVENTO.lugar.nombre}</span>
          {EVENTO.lugar.direccion && <span className="mt-1 block text-sm opacity-80">{EVENTO.lugar.direccion}</span>}
        </dd>
        <dt className="pt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] opacity-60">Vestimenta</dt>
        <dd>{EVENTO.vestimenta}</dd>
      </dl>
      <figure className="mt-6">
        <img
          src={foto(EVENTO.lugar.foto)}
          alt={`Jardín de ${EVENTO.lugar.nombre}: arcos blancos, cúpulas y alberca`}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
        <figcaption className="mt-2 font-poster text-xs tracking-[0.2em] text-rojo">EL ESCENARIO · {EVENTO.lugar.nombre.toUpperCase()}</figcaption>
      </figure>
      <iframe
        title={`Mapa de ${EVENTO.lugar.nombre}`}
        src={mapaEmbed()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mt-4 aspect-[4/3] w-full border-0 bg-[#2A2A2A] grayscale"
      />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={mapaUrl()}
          target="_blank"
          rel="noopener"
          className="flex min-h-12 items-center justify-center gap-2 border-2 border-papel text-sm font-bold uppercase tracking-[0.1em] hover:bg-papel hover:text-tinta"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" /> Ver mapa
        </a>
        <a
          href={enlaceCalendario()}
          target="_blank"
          rel="noopener"
          className="flex min-h-12 items-center justify-center gap-2 border-2 border-papel text-sm font-bold uppercase tracking-[0.1em] hover:bg-papel hover:text-tinta"
        >
          <CalendarPlus className="h-4 w-4" aria-hidden="true" /> Calendario
        </a>
      </div>
    </section>
  );
}

function Tira() {
  const fotos = EVENTO.gira.filter((g) => g.foto !== EVENTO.fotoPortada);
  return (
    <div className="grid grid-cols-5 gap-1 px-5" aria-hidden="true">
      {fotos.map((g) => (
        <img key={g.epoca} src={foto(g.foto)} alt="" loading="lazy" className="foto-poster aspect-[3/4] w-full object-cover" />
      ))}
    </div>
  );
}

function Boleto({ confirmar }: { confirmar: () => void }) {
  return (
    <section id="confirmar" aria-label="Confirmar asistencia" className="scroll-mt-6 px-5">
      <div className="grid grid-cols-[1fr_80px] bg-papel">
        <div className="flex flex-col gap-1.5 border-r-2 border-dashed border-rojo p-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-rojo">Admite</span>
          <b className="font-poster text-2xl font-normal leading-tight">TÚ + TUS GANAS DE FIESTA</b>
          <small className="text-[13px] leading-snug">
            {EVENTO.fechaTexto} · Puertas {EVENTO.hora}
            <br />
            {EVENTO.lugar.nombre} · Vestimenta casual
          </small>
        </div>
        <div className="grid place-items-center">
          <span className="rotate-180 font-poster text-base tracking-[0.22em] [writing-mode:vertical-rl]">
            FAB · {EVENTO.edad}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={confirmar}
        className="mt-3 flex min-h-[56px] w-full items-center justify-center gap-2 bg-tinta font-poster text-lg tracking-[0.16em] text-papel hover:bg-rojo-oscuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta"
      >
        <Ticket className="h-5 w-5" aria-hidden="true" /> APARTAR MI LUGAR
      </button>
    </section>
  );
}

/* ---------- Confirmación por WhatsApp ---------- */

function Confirmar({ abierto, cerrar }: { abierto: boolean; cerrar: () => void }) {
  const [nombre, setNombre] = React.useState('');
  const [personas, setPersonas] = React.useState(1);
  const [asiste, setAsiste] = React.useState(true);
  const dialogo = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = asiste
      ? `¡Hola! Soy ${nombre.trim()} y confirmo mi asistencia a los ${EVENTO.edad} de ${EVENTO.nombre} el 9 de enero. Seremos ${personas} persona${personas > 1 ? 's' : ''}.`
      : `¡Hola! Soy ${nombre.trim()}. Muchas gracias por la invitación a los ${EVENTO.edad} de ${EVENTO.nombre}; lamentablemente no podré asistir.`;
    window.open(`https://wa.me/${EVENTO.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    cerrar();
  };

  return (
    <dialog
      ref={dialogo}
      onClose={cerrar}
      className="m-auto w-[calc(100%-32px)] max-w-md bg-papel p-0 text-tinta backdrop:bg-tinta/75"
    >
      <form onSubmit={enviar} className="flex flex-col gap-5 p-6 pt-7">
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center border-2 border-tinta hover:bg-tinta hover:text-papel"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col gap-1 pr-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-rojo">Fecha única · {EVENTO.fechaCorta}</span>
          <h2 className="font-poster text-3xl leading-none">APARTA TU LUGAR</h2>
          <p className="text-sm">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setAsiste(v)}
              aria-pressed={asiste === v}
              className={`flex min-h-12 items-center justify-center gap-2 border-2 text-sm font-bold ${
                asiste === v ? 'border-tinta bg-tinta text-papel' : 'border-tinta/25'
              }`}
            >
              {asiste === v && <Check className="h-4 w-4" aria-hidden="true" />}
              {v ? 'Ahí estaré' : 'No podré ir'}
            </button>
          ))}
        </div>

        <label htmlFor="rsvp-nombre" className="flex flex-col gap-1.5 text-sm font-bold">
          Tu nombre
          <input
            id="rsvp-nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y apellido"
            className="min-h-12 border-2 border-tinta/25 bg-white px-4 text-base font-normal outline-none focus:border-tinta"
          />
        </label>

        {asiste && (
          <label htmlFor="rsvp-personas" className="flex flex-col gap-1.5 text-sm font-bold">
            Número de personas
            <select
              id="rsvp-personas"
              value={personas}
              onChange={(e) => setPersonas(Number(e.target.value))}
              className="min-h-12 border-2 border-tinta/25 bg-white px-4 text-base font-normal outline-none focus:border-tinta"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        )}

        <button type="submit" className="min-h-[54px] bg-rojo font-poster text-lg tracking-[0.16em] text-tinta hover:bg-rojo-oscuro hover:text-papel">
          ENVIAR POR WHATSAPP
        </button>
      </form>
    </dialog>
  );
}

/* ---------- Música de fondo (YouTube oculto) ----------
   Los navegadores no dejan sonar audio sin un toque del usuario, así que
   arranca al tocar el boleto de entrada (o el primer toque en la página). */
declare global {
  interface Window { YT?: any; onYouTubeIframeAPIReady?: () => void }
}

function useMusica(videoId: string) {
  const player = React.useRef<any>(null);
  const listo = React.useRef(false);
  const quiere = React.useRef(true);
  const [activa, setActiva] = React.useState(false);

  const tocar = React.useCallback(() => {
    if (!listo.current || !quiere.current) return;
    const p = player.current;
    // La música nunca debe impedir que se abra la invitación
    try {
      if (typeof p?.playVideo !== 'function' || p.getPlayerState?.() === 1) return;
      p.unMute?.();
      p.setVolume?.(70);
      p.playVideo();
    } catch {
      /* sin música */
    }
  }, []);

  React.useEffect(() => {
    if (!videoId) return;
    let creado = false;
    const crear = () => {
      if (creado || player.current) return;
      creado = true;
      new window.YT.Player('musica', {
        videoId,
        width: 1,
        height: 1,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: videoId, playsinline: 1, disablekb: 1 },
        events: {
          onReady: (e: { target: any }) => { player.current = e.target; listo.current = true; },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) setActiva(true);
            if (e.data === 2) setActiva(false);
          },
        },
      });
    };
    if (window.YT?.Player) crear();
    else {
      const previo = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { previo?.(); crear(); };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
    const alTocar = () => tocar();
    document.addEventListener('pointerdown', alTocar);
    return () => document.removeEventListener('pointerdown', alTocar);
  }, [videoId, tocar]);

  const reproducir = React.useCallback(() => { quiere.current = true; tocar(); setActiva(true); }, [tocar]);
  const pausar = React.useCallback(() => {
    quiere.current = false;
    try { player.current?.pauseVideo?.(); } catch { /* nada */ }
    setActiva(false);
  }, []);

  return { disponible: !!videoId, activa, reproducir, pausar };
}

type Musica = ReturnType<typeof useMusica>;

function BotonMusica({ musica }: { musica: Musica }) {
  if (!musica.disponible) return null;
  const Icono = musica.activa ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={musica.activa ? musica.pausar : musica.reproducir}
      aria-label={musica.activa ? 'Pausar música' : 'Reproducir música'}
      aria-pressed={musica.activa}
      className={`fixed right-[max(16px,env(safe-area-inset-right))] top-[max(56px,calc(env(safe-area-inset-top)+48px))] z-40 grid h-11 w-11 place-items-center rounded-full bg-tinta/80 text-papel backdrop-blur ${musica.activa ? 'po-latido' : ''}`}
    >
      <Icono className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

function BarraConfirmar({ confirmar }: { confirmar: () => void }) {
  return (
    <div className="po-barra fixed inset-x-0 bottom-0 z-30 bg-tinta pb-[env(safe-area-inset-bottom)] pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))]">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 py-2.5">
        <span className="font-poster text-sm leading-tight tracking-[0.1em] text-papel">
          {EVENTO.fechaCorta} · {EVENTO.hora.toUpperCase()}
          <span className="block text-[11px] tracking-[0.14em] opacity-60">{EVENTO.lugar.nombre.toUpperCase()}</span>
        </span>
        <button
          type="button"
          onClick={confirmar}
          className="min-h-11 bg-rojo px-5 font-poster text-sm tracking-[0.14em] text-tinta hover:bg-papel"
        >
          CONFIRMAR
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [rsvp, setRsvp] = React.useState(false);
  // ?abierta en la URL salta la entrada (útil para revisar o compartir directo)
  const saltar = new URLSearchParams(window.location.search).has('abierta');
  const [dentro, setDentro] = React.useState(saltar);
  const musica = useMusica(EVENTO.musicaYoutube);

  React.useEffect(() => {
    document.documentElement.style.overflow = dentro ? '' : 'hidden';
  }, [dentro]);

  // La barra de "Confirmar" aparece hasta que la persona llega al boleto (final de la invitación)
  // y desde ahí se queda fija, aunque vuelva a subir.
  const [alFinal, setAlFinal] = React.useState(false);
  React.useEffect(() => {
    if (!dentro || alFinal) return;
    const boleto = document.getElementById('confirmar');
    if (!boleto) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setAlFinal(true);
    }, { threshold: 0.3 });
    obs.observe(boleto);
    return () => obs.disconnect();
  }, [dentro, alFinal]);

  return (
    <div className={`min-h-screen bg-tinta font-sans text-tinta ${dentro ? 'po-visible' : 'po-oculto'}`}>
      {!dentro && <Entrada entrar={() => setDentro(true)} alTocar={musica.reproducir} />}
      <div aria-hidden="true" className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
        <div id="musica" />
      </div>
      {dentro && <BotonMusica musica={musica} />}

      <main className="po-escena grano mx-auto flex min-h-screen max-w-md flex-col gap-10 bg-rojo pb-[calc(96px+env(safe-area-inset-bottom))]">
        <Portada />
        <CuentaRegresiva />
        <Gira />
        <FechaUnica />
        <Tira />
        <Boleto confirmar={() => setRsvp(true)} />
        <p className="px-5 text-center font-poster text-2xl tracking-[0.08em]">¡NOS VEMOS EN PRIMERA FILA!</p>
      </main>

      {dentro && alFinal && <BarraConfirmar confirmar={() => setRsvp(true)} />}
      <Confirmar abierto={rsvp} cerrar={() => setRsvp(false)} />
    </div>
  );
}
