"use client";

import { useRef } from "react";
import googleReviews from "../data/google-reviews.json";
import ArrowIcon from "./ArrowIcon";

type ReviewLanguage = "es" | "en";

const copy = {
  es: {
    title: "La confianza también se construye.",
    body: "Experiencias compartidas por clientes y colaboradores que han recorrido el proceso con nosotros.",
    cta: "Ver todas en Google",
    previous: "Reseñas anteriores",
    next: "Más reseñas",
    reviews: "reseñas",
  },
  en: {
    title: "Trust is built too.",
    body: "Experiences shared by clients and collaborators who have been through the process with us.",
    cta: "View all on Google",
    previous: "Previous reviews",
    next: "More reviews",
    reviews: "reviews",
  },
} as const;

function getReviewStep(track: HTMLDivElement) {
  const card = track.querySelector<HTMLElement>(".home-review-card, .home-review-cta");
  if (!card) return Math.min(window.innerWidth * 0.72, 680);

  const styles = window.getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
  return card.getBoundingClientRect().width + gap;
}

export default function GoogleReviewsSection({ language }: { language: ReviewLanguage }) {
  const reviewsTrack = useRef<HTMLDivElement>(null);
  const t = copy[language];

  const moveReviews = (direction: -1 | 1) => {
    const track = reviewsTrack.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * getReviewStep(track),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="home-reviews" id="resenas">
      <div className="home-reviews-heading section-shell" data-reveal>
        <div>
          <h2>{t.title}</h2>
        </div>
        <div className="home-reviews-summary">
          <div className="home-rating">
            <strong>{googleReviews.rating.toFixed(1)}</strong>
            <span aria-label="5 de 5 estrellas">★★★★★</span>
            <small>{googleReviews.googleReviewCount} {t.reviews}</small>
          </div>
          <p>{t.body}</p>
        </div>
      </div>

      <div
        className="home-reviews-track"
        ref={reviewsTrack}
        tabIndex={0}
        role="region"
        aria-label={language === "es" ? "Reseñas de Google" : "Google reviews"}
      >
        {googleReviews.reviews.map((review) => (
          <article
            className={`home-review-card ${review[language].length > 110 ? "home-review-card--long" : ""}`}
            data-reveal
            key={review.name}
          >
            <div className="home-review-card-top">
              <span aria-label={`${review.rating} de 5 estrellas`}>{"★".repeat(review.rating)}</span>
            </div>
            <blockquote>“{review[language]}”</blockquote>
            <footer>
              <strong>{review.name}</strong>
              <span>
                {new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(`${review.date}T12:00:00Z`))} · Google
              </span>
            </footer>
          </article>
        ))}
        <a
          className="home-review-cta"
          href={googleReviews.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>{t.cta}</span>
          <ArrowIcon />
        </a>
      </div>

      <div className="home-reviews-controls section-shell">
        <button className="action-control" type="button" onClick={() => moveReviews(-1)} aria-label={t.previous}>
          <ArrowIcon direction="left" />
        </button>
        <button className="action-control" type="button" onClick={() => moveReviews(1)} aria-label={t.next}>
          <ArrowIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
