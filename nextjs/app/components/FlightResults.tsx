"use client";

type Stopover = { code: string; layoverLabel?: string };

type FlightLeg = {
  origin: string;
  dest: string;
  depTime: string;
  arrTime: string;
  duration: string;
  stops: number;
  stopovers: Stopover[];
};

type Flight = {
  id: number;
  airline: string;
  carrierCode?: string;
  price: number;
  hasCabinBaggage: boolean;
  hasCheckedBaggage: boolean;
  outbound: FlightLeg;
  inbound?: FlightLeg;
};

type Segment = {
  from: string;
  to: string;
  date: string;
  fromAirport: unknown;
  toAirport: unknown;
};

type FlightResultsProps = {
  flights: Flight[];
  sortBy: "price" | "duration";
  setSortBy: (value: "price" | "duration") => void;
  apiSearchToken: string;
  apiDateParts: { day: string; month: string; year: string } | null;
  apiError: string;
  segments: Segment[];
  rtReturnDate: string;
};

function getAirlineLogoUrl(code?: string) {
  const safe = code ? String(code).trim().toUpperCase() : "";
  if (!safe) return undefined;
  if (!/^[A-Z0-9]{2,8}$/.test(safe)) return undefined;
  return `https://images.kiwi.com/airlines/64/${safe}.png`;
}

function formatDateFr(value?: string) {
  if (!value) return "";
  const parts = String(value).split("-");
  if (parts.length !== 3) return value;
  const [y, m, d] = parts;
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}

export default function FlightResults(props: FlightResultsProps) {
  const {
    flights,
    sortBy,
    setSortBy,
    apiSearchToken,
    apiDateParts,
    apiError,
    segments,
    rtReturnDate,
  } = props;

  return (
    <section className="results">
      {/* ── Header ── */}
      <div className="results-header">
        <div className="results-count">
          <span className="results-count-number">{flights.length}</span>
          <span className="results-count-label">vols disponibles</span>
        </div>
        <div className="input-wrapper sort-wrapper">
          <span className="sort-label">Trier par</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "price" | "duration")}
          >
            <option value="price">Meilleur prix</option>
            <option value="duration">Plus rapide</option>
          </select>
        </div>
      </div>

      {/* ── Debug meta ── */}
      {apiSearchToken && apiDateParts && (
        <p className="api-meta">
          Token: {apiSearchToken} &nbsp;·&nbsp; {apiDateParts.day}/
          {apiDateParts.month}/{apiDateParts.year}
        </p>
      )}
      {apiError && <p className="api-error">{apiError}</p>}

      {/* ── List ── */}
      <div className="flight-list">
        {flights.length === 0 ? (
          <div className="empty-results">
            <div className="empty-icon">
              <i className="fa-solid fa-plane-slash" />
            </div>
            <h3>Aucun vol trouvé</h3>
            <p>Modifiez vos filtres (prix, escales, compagnies) pour voir d&apos;autres résultats.</p>
          </div>
        ) : (
          flights.map((flight) => {
            const logoUrl = getAirlineLogoUrl(flight.carrierCode);
            const fallback = String(flight.carrierCode || flight.airline || "C")
              .trim()
              .slice(0, 2)
              .toUpperCase();

            return (
              <article key={flight.id} className="flight-card">

                {/* ──────────────────────────────
                    LEFT — Airline identity
                ────────────────────────────── */}
                <div className="card-airline">
                  <div
                    className="airline-mark"
                    data-state={logoUrl ? "loading" : "empty"}
                  >
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt={flight.airline}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onLoad={(e) =>
                          e.currentTarget.parentElement?.setAttribute(
                            "data-state",
                            "loaded"
                          )
                        }
                        onError={(e) =>
                          e.currentTarget.parentElement?.setAttribute(
                            "data-state",
                            "error"
                          )
                        }
                      />
                    )}
                    <span className="airline-fallback" aria-hidden>
                      {fallback}
                    </span>
                  </div>
                  <div className="airline-text">
                    <span className="airline-name">{flight.airline}</span>
                    {flight.carrierCode && (
                      <span className="airline-code">{flight.carrierCode}</span>
                    )}
                  </div>
                </div>

                {/* ──────────────────────────────
                    MIDDLE — Legs
                ────────────────────────────── */}
                <div className="card-legs">

                  {/* Trip type badges (date row) */}
                  <div className={`trip-dates ${flight.inbound ? "trip-dates--rt" : "trip-dates--ow"}`}>
                    <span className="trip-date-item">
                      <i className="fa-solid fa-plane-departure" />
                      {formatDateFr(segments?.[0]?.date)}
                    </span>
                    {flight.inbound && (
                      <>
                        <span className="trip-dates-sep" aria-hidden />
                        <span className="trip-date-item trip-date-item--return">
                          <i className="fa-solid fa-plane-arrival" />
                          {formatDateFr(rtReturnDate)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Outbound leg */}
                  <div className="flight-leg">
                    <span className="leg-pill leg-pill--out">
                      <i className="fa-solid fa-plane-departure" />
                      Aller
                    </span>
                    <div className="leg-row">
                      <div className="time-col">
                        <div className="time">{flight.outbound.depTime}</div>
                        <div className="iata">{flight.outbound.origin}</div>
                      </div>

                      <div className="route-vis">
                        <span className="route-duration">{flight.outbound.duration}</span>
                        <div className="route-track">
                          <span className="route-dot route-dot--left" />
                          <span className="route-line" />
                          {flight.outbound.stops > 0 &&
                            flight.outbound.stopovers.map((_, i) => (
                              <span
                                key={i}
                                className="route-stop-dot"
                                style={{
                                  left: `${((i + 1) / (flight.outbound.stops + 1)) * 100}%`,
                                }}
                              />
                            ))}
                          <span className="route-dot route-dot--right" />
                        </div>
                        {flight.outbound.stops === 0 ? (
                          <span className="stops-badge stops-badge--direct">Direct</span>
                        ) : (
                          <span className="stops-badge stops-badge--stops">
                            {flight.outbound.stops} escale{flight.outbound.stops > 1 ? "s" : ""}
                            <span className="stops-tooltip">
                              {flight.outbound.stopovers.map((s, idx) => (
                                <span key={`${flight.id}-out-${s.code}-${idx}`} className="tooltip-row">
                                  <i className="fa-solid fa-location-dot" />
                                  <strong>{s.code}</strong>
                                  {s.layoverLabel ? ` — ${s.layoverLabel}` : ""}
                                </span>
                              ))}
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="time-col time-col--right">
                        <div className="time">{flight.outbound.arrTime}</div>
                        <div className="iata">{flight.outbound.dest}</div>
                      </div>
                    </div>
                  </div>

                  {/* Inbound leg */}
                  {flight.inbound && (
                    <div className="flight-leg flight-leg--inbound">
                      <span className="leg-pill leg-pill--in">
                        <i className="fa-solid fa-plane-arrival" />
                        Retour
                      </span>
                      <div className="leg-row">
                        <div className="time-col">
                          <div className="time">{flight.inbound.depTime}</div>
                          <div className="iata">{flight.inbound.origin}</div>
                        </div>

                        <div className="route-vis">
                          <span className="route-duration">{flight.inbound.duration}</span>
                          <div className="route-track">
                            <span className="route-dot route-dot--left" />
                            <span className="route-line" />
                            {flight.inbound.stops > 0 &&
                              flight.inbound.stopovers.map((_, i) => (
                                <span
                                  key={i}
                                  className="route-stop-dot"
                                  style={{
                                    left: `${((i + 1) / (flight.inbound!.stops + 1)) * 100}%`,
                                  }}
                                />
                              ))}
                            <span className="route-dot route-dot--right" />
                          </div>
                          {flight.inbound.stops === 0 ? (
                            <span className="stops-badge stops-badge--direct">Direct</span>
                          ) : (
                            <span className="stops-badge stops-badge--stops">
                              {flight.inbound.stops} escale{flight.inbound.stops > 1 ? "s" : ""}
                              <span className="stops-tooltip">
                                {flight.inbound.stopovers.map((s, idx) => (
                                  <span key={`${flight.id}-in-${s.code}-${idx}`} className="tooltip-row">
                                    <i className="fa-solid fa-location-dot" />
                                    <strong>{s.code}</strong>
                                    {s.layoverLabel ? ` — ${s.layoverLabel}` : ""}
                                  </span>
                                ))}
                              </span>
                            </span>
                          )}
                        </div>

                        <div className="time-col time-col--right">
                          <div className="time">{flight.inbound.arrTime}</div>
                          <div className="iata">{flight.inbound.dest}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ──────────────────────────────
                    RIGHT — Price + CTA
                ────────────────────────────── */}
                <div className="card-price">
                  <div className="baggage-row">
                    {flight.hasCabinBaggage && (
                      <span className="bag-chip bag-chip--cabin" title="Bagage cabine inclus">
                        <i className="fa-solid fa-suitcase-rolling" />
                        Cabine
                      </span>
                    )}
                    {flight.hasCheckedBaggage ? (
                      <span className="bag-chip bag-chip--checked" title="Bagage en soute inclus">
                        <i className="fa-solid fa-suitcase" />
                        Soute
                      </span>
                    ) : (
                      <span className="bag-chip bag-chip--none" title="Pas de bagage soute">
                        <i className="fa-solid fa-suitcase" />
                        Sans soute
                      </span>
                    )}
                  </div>

                  <div className="price-display">
                    <span className="price-amount">{flight.price}</span>
                    <span className="price-currency">€</span>
                  </div>
                  <p className="price-sub">par passager</p>

                  <button
                    className="btn-select"
                    onClick={() =>
                      window.alert(
                        `Redirection vers le paiement pour le vol ${flight.airline}...`
                      )
                    }
                  >
                    Sélectionner
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </div>

              </article>
            );
          })
        )}
      </div>
    </section>
  );
}