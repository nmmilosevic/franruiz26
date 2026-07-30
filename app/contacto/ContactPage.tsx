"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import ActionLabel from "../components/ActionLabel";
import MainHeader from "../components/MainHeader";
import SiteFooter from "../components/SiteFooter";

type Lang = "es" | "en";

const copy = {
  es: {
    title: "Hablemos de tu proyecto.",
    intro:
      "Cuéntanos dónde está, en qué fase se encuentra y qué necesitas. Te responderemos para organizar una primera conversación con el equipo adecuado.",
    prompt: "Escríbenos",
    offices: "Málaga · Marbella",
    area: "Proyectos en toda la Costa del Sol",
    formTitle: "El primer paso es entenderlo bien.",
    formIntro:
      "No necesitas tener todas las respuestas. Comparte la información disponible y te ayudaremos a ordenar los siguientes pasos.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo electrónico",
    message: "Cuéntanos sobre el proyecto",
    privacyPrefix: "He leído y acepto la",
    privacyLink: "política de privacidad",
    send: "Enviar consulta",
    prepared: "Hemos preparado el mensaje en tu aplicación de correo. Revísalo y envíalo desde allí.",
  },
  en: {
    title: "Let’s discuss your project.",
    intro:
      "Tell us where it is, what stage it has reached, and what you need. We will reply to arrange an initial conversation with the right team.",
    prompt: "Write to us",
    offices: "Málaga · Marbella",
    area: "Projects throughout the Costa del Sol",
    formTitle: "The first step is understanding it clearly.",
    formIntro:
      "You do not need to have every answer. Share what you know and we will help you organise the next steps.",
    name: "Name",
    phone: "Phone",
    email: "Email address",
    message: "Tell us about the project",
    privacyPrefix: "I have read and accept the",
    privacyLink: "privacy policy",
    send: "Send enquiry",
    prepared: "We have prepared the message in your email app. Review it and send it from there.",
  },
} as const;

export default function ContactPage() {
  const [lang, setLang] = useState<Lang>("es");
  const [prepared, setPrepared] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = lang === "es" ? `Consulta de proyecto · ${name}` : `Project enquiry · ${name}`;
    const body = [
      `${lang === "es" ? "Nombre" : "Name"}: ${name}`,
      `${lang === "es" ? "Teléfono" : "Phone"}: ${phone}`,
      `${lang === "es" ? "Correo" : "Email"}: ${email}`,
      "",
      message,
    ].join("\n");

    setPrepared(true);
    window.location.href = `mailto:administracion@franruizarquitectos.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="contact-page">
      <MainHeader language={lang} onLanguageChange={setLang} current="contact" />

      <section className="contact-page-hero section-shell">
        <h1>{t.title}</h1>
        <div className="contact-page-intro">
          <p>{t.intro}</p>
          <a className="action-pill" href="#consulta"><ActionLabel>{t.prompt}</ActionLabel><ArrowIcon direction="down-right" /></a>
        </div>
        <div className="contact-page-direct">
          <div>
            <strong>{t.offices}</strong>
            <span>{t.area}</span>
          </div>
          <div>
            <a href="tel:+34952417723">+34 952 41 77 23</a>
            <a href="mailto:administracion@franruizarquitectos.com">
              administracion@franruizarquitectos.com
            </a>
          </div>
        </div>
      </section>

      <section className="contact-page-form" id="consulta">
        <div className="contact-page-form-inner section-shell">
          <div className="contact-page-form-copy">
            <h2>{t.formTitle}</h2>
            <p>{t.formIntro}</p>
          </div>
          <form onSubmit={submit}>
            <label>
              <span>{t.name}</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              <span>{t.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
            <label>
              <span>{t.email}</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="contact-page-message">
              <span>{t.message}</span>
              <textarea name="message" rows={5} required />
            </label>
            <label className="contact-page-privacy">
              <input type="checkbox" required />
              <span>
                {t.privacyPrefix}{" "}
                <Link href="/politica-de-privacidad">{t.privacyLink}</Link>.
              </span>
            </label>
            <div className="contact-page-submit">
              <button className="action-pill action-pill--on-dark" type="submit"><ActionLabel>{t.send}</ActionLabel><ArrowIcon /></button>
              <p aria-live="polite">{prepared ? t.prepared : ""}</p>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter language={lang} precedingTone="light" />
    </main>
  );
}
