"use client";

import type { Dispatch, RefObject, SetStateAction } from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

type AirportOption = {
  code: string;
  destination: string;
  country_id: string;
  country_name: string;
  city_name: string;
  type: string;
};

type Segment = {
  from: string;
  to: string;
  date: string;
  fromAirport: AirportOption | null;
  toAirport: AirportOption | null;
};

type FlightType = "OW" | "RT" | "MD";

type DateParts = { day: string; month: string; year: string };

type FlightSearchFormProps = {
  today: string;

  flightType: FlightType;
  setFlightType: Dispatch<SetStateAction<FlightType>>;

  segments: Segment[];
  setSegments: Dispatch<SetStateAction<Segment[]>>;

  ensureTripSegments: () => Segment[];
  updateSegment: (idx: number, patch: Partial<Segment>) => void;

  suggestions: AirportOption[];
  openSug: { idx: number; side: "from" | "to" } | null;
  setOpenSug: Dispatch<SetStateAction<{ idx: number; side: "from" | "to" } | null>>;
  autocomplete: (query: string, idx: number, side: "from" | "to") => Promise<void>;
  applyAirport: (idx: number, side: "from" | "to", airport: AirportOption) => void;

  rtRangeStart: Date | null;
  rtRangeEnd: Date | null;
  setRtRangeStart: Dispatch<SetStateAction<Date | null>>;
  setRtRangeEnd: Dispatch<SetStateAction<Date | null>>;
  setRtReturnDate: Dispatch<SetStateAction<string>>;

  stopsMode: "all" | "direct";
  setStopsMode: Dispatch<SetStateAction<"all" | "direct">>;
  refundable: boolean;
  setRefundable: Dispatch<SetStateAction<boolean>>;
  withLuggage: boolean;
  setWithLuggage: Dispatch<SetStateAction<boolean>>;

  travelersLabel: string;
  travelerOpen: boolean;
  setTravelerOpen: Dispatch<SetStateAction<boolean>>;
  closeTraveler: () => void;

  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  children: number;
  setChildren: Dispatch<SetStateAction<number>>;
  infants: number;
  setInfants: Dispatch<SetStateAction<number>>;
  clamp: (value: number, min: number, max: number) => number;

  travelersRef: RefObject<HTMLDivElement | null>;
  travelersRefMd: RefObject<HTMLDivElement | null>;

  handleSearch: () => void;

  onMeta?: (meta: { searchToken: string; dateParts: DateParts }) => void;
};

export default function FlightSearchForm(props: FlightSearchFormProps) {
  const {
    today,
    flightType,
    setFlightType,
    segments,
    setSegments,
    ensureTripSegments,
    updateSegment,
    suggestions,
    openSug,
    setOpenSug,
    autocomplete,
    applyAirport,
    rtRangeStart,
    rtRangeEnd,
    setRtRangeStart,
    setRtRangeEnd,
    setRtReturnDate,
    stopsMode,
    setStopsMode,
    refundable,
    setRefundable,
    withLuggage,
    setWithLuggage,
    travelersLabel,
    travelerOpen,
    setTravelerOpen,
    closeTraveler,
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    clamp,
    travelersRef,
    travelersRefMd,
    handleSearch,
  } = props;

  const formatLocalYmd = (value: Date) => {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const hasRtRange = Boolean(rtRangeStart && rtRangeEnd);

  const setAdultsSafe = (next: number) => {
    const safeAdults = clamp(next, 1, 6);
    setAdults(safeAdults);
    setInfants((current) => clamp(current, 0, Math.min(2, safeAdults)));
  };

  const setChildrenSafe = (next: number) => {
    setChildren(clamp(next, 0, 4));
  };

  const setInfantsSafe = (next: number) => {
    setInfants(clamp(next, 0, Math.min(2, adults)));
  };

  const [dateModalOpen, setDateModalOpen] = useState(false);
  const closeDateModal = () => setDateModalOpen(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsSmallScreen(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!dateModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDateModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dateModalOpen]);

  return (
    <div className="search-container">
      <div className="trip-tabs">
        {[
          { code: "RT", label: "Aller-retour" },
          { code: "OW", label: "Aller simple" },
          { code: "MD", label: "Multi-destinations" },
        ].map((tab) => (
          <button
            key={tab.code}
            type="button"
            className={`trip-tab ${flightType === tab.code ? "trip-tab-active" : ""}`}
            onClick={() => {
              const next = tab.code as FlightType;
              setFlightType(next);
              if (next === "OW") setSegments((cur) => [cur[0]]);
              if (next === "RT") {
                setSegments((cur) => [cur[0]]);
                setRtRangeStart(new Date());
                setRtRangeEnd(null);
                setRtReturnDate(today);
              }
              if (next === "MD" && segments.length < 2) setSegments((cur) => [...cur, { ...cur[0] }]);
              closeTraveler();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="search-switches">
        <label className={`switch-pill ${stopsMode === "direct" ? "switch-pill-active" : ""}`}>
          <input
            type="checkbox"
            checked={stopsMode === "direct"}
            onChange={(event) => setStopsMode(event.target.checked ? "direct" : "all")}
          />
          <i className="fa-solid fa-bolt" /> Vol direct
        </label>
        <label className={`switch-pill ${withLuggage ? "switch-pill-active" : ""}`}>
          <input
            type="checkbox"
            checked={withLuggage}
            onChange={(event) => setWithLuggage(event.target.checked)}
          />
          <i className="fa-solid fa-suitcase" /> Avec bagage
        </label>
        <label className={`switch-pill ${refundable ? "switch-pill-active" : ""}`}>
          <input
            type="checkbox"
            checked={refundable}
            onChange={(event) => setRefundable(event.target.checked)}
          />
          <i className="fa-solid fa-shield-heart" /> Remboursable
        </label>
      </div>

      <div className="search-widget search-widget-advanced">
        {(flightType === "RT" ? [segments[0]] : ensureTripSegments()).map((segment, idx) => (
          <div key={`seg-${idx}`} className={`segment-row ${flightType !== "MD" && idx === 0 ? "segment-row-main" : ""}`}>
            <div className="route-switch-group">
              <div className="input-group route-field route-field--from">
                <label>Départ</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-plane-departure" />
                  <input
                    type="text"
                    placeholder="D'où partez-vous ?"
                    value={segment.from}
                    onFocus={() => {
                      setOpenSug({ idx, side: "from" });
                      void autocomplete(segment.from, idx, "from");
                    }}
                    onBlur={() => {
                      window.setTimeout(() => setOpenSug(null), 120);
                    }}
                    onChange={(event) => {
                      updateSegment(idx, { from: event.target.value, fromAirport: null });
                      void autocomplete(event.target.value, idx, "from");
                    }}
                  />
                </div>
                {openSug?.idx === idx && openSug.side === "from" && suggestions.length > 0 && (
                  <div className="suggestions-list">
                    {suggestions.map((airport) => (
                      <button
                        key={`from-${idx}-${airport.code}-${airport.destination}`}
                        type="button"
                        className="suggestion-item"
                        onClick={() => applyAirport(idx, "from", airport)}
                      >
                        <span className="suggestion-city">
                          {airport.destination} ({airport.code})
                        </span>
                        <span className="suggestion-country">
                          {airport.city_name}, {airport.country_name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="route-switch-btn"
                aria-label="Inverser départ et arrivée"
                onClick={() => {
                  setOpenSug(null);
                  updateSegment(idx, {
                    from: segment.to,
                    to: segment.from,
                    fromAirport: segment.toAirport,
                    toAirport: segment.fromAirport,
                  });
                }}
              >
                <i className="fa-solid fa-right-left" />
              </button>

              <div className="input-group route-field route-field--to">
                <label>Arrivée</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-plane-arrival" />
                  <input
                    type="text"
                    placeholder="Où allez-vous ?"
                    value={segment.to}
                    onFocus={() => {
                      setOpenSug({ idx, side: "to" });
                      void autocomplete(segment.to, idx, "to");
                    }}
                    onBlur={() => {
                      window.setTimeout(() => setOpenSug(null), 120);
                    }}
                    onChange={(event) => {
                      updateSegment(idx, { to: event.target.value, toAirport: null });
                      void autocomplete(event.target.value, idx, "to");
                    }}
                  />
                </div>
                {openSug?.idx === idx && openSug.side === "to" && suggestions.length > 0 && (
                  <div className="suggestions-list">
                    {suggestions.map((airport) => (
                      <button
                        key={`to-${idx}-${airport.code}-${airport.destination}`}
                        type="button"
                        className="suggestion-item"
                        onClick={() => applyAirport(idx, "to", airport)}
                      >
                        <span className="suggestion-city">
                          {airport.destination} ({airport.code})
                        </span>
                        <span className="suggestion-country">
                          {airport.city_name}, {airport.country_name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {flightType !== "RT" && (
              <div className="input-group">
                <label>Date</label>
                <div className="input-wrapper">
                  <i className="fa-regular fa-calendar" />
                  <input type="date" value={segment.date} min={today} onChange={(event) => updateSegment(idx, { date: event.target.value })} />
                </div>
              </div>
            )}

            {flightType === "RT" && idx === 0 && (
              <div className="input-group date-range-group">
                <label>Dates</label>
                {hasRtRange ? (
                  <div className="date-range-split">
                    <button
                      type="button"
                      className="field-control"
                      onClick={() => setDateModalOpen(true)}
                      aria-label="Sélectionner date de départ"
                    >
                      <span className="field-icon">
                        <i className="fa-solid fa-plane-departure" />
                      </span>
                      <span className="field-value">
                        {rtRangeStart ? formatLocalYmd(rtRangeStart) : "Départ"}
                      </span>
                      <span className="field-suffix">
                        <i className="fa-solid fa-chevron-down" />
                      </span>
                    </button>

                    <button
                      type="button"
                      className="field-control"
                      onClick={() => setDateModalOpen(true)}
                      aria-label="Sélectionner date de retour"
                    >
                      <span className="field-icon">
                        <i className="fa-solid fa-plane-arrival" />
                      </span>
                      <span className="field-value">
                        {rtRangeEnd ? formatLocalYmd(rtRangeEnd) : "Retour"}
                      </span>
                      <span className="field-suffix">
                        <i className="fa-solid fa-chevron-down" />
                      </span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="field-control"
                    onClick={() => setDateModalOpen(true)}
                    aria-label="Sélectionner dates aller-retour"
                  >
                    <span className="field-icon">
                      <i className="fa-regular fa-calendar" />
                    </span>
                    <span className="field-value">
                      {rtRangeStart ? formatLocalYmd(rtRangeStart) : "Sélectionnez vos dates"}
                    </span>
                    <span className="field-suffix">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </button>
                )}
              </div>
            )}

            {flightType !== "MD" && idx === 0 && (
              <div className="input-group travelers-group">
                <label>Voyageurs</label>
                <div className="popover-anchor" ref={travelersRef}>
                  <button
                    type="button"
                    className="field-control"
                    onClick={() => setTravelerOpen((v) => !v)}
                    aria-haspopup="dialog"
                    aria-expanded={travelerOpen}
                  >
                    <span className="field-icon">
                      <i className="fa-solid fa-users" />
                    </span>
                    <span className="field-value">{travelersLabel}</span>
                    <span className="field-suffix">
                      <i className={`fa-solid ${travelerOpen ? "fa-chevron-up" : "fa-chevron-down"}`} />
                    </span>
                  </button>

                  {travelerOpen && (
                    <div className="popover" role="dialog" aria-label="Sélection des voyageurs">
                      <div className="popover-row">
                        <div className="popover-left">
                          <div className="popover-title">
                            <i className="fa-solid fa-user" /> Adultes
                          </div>
                          <div className="popover-subtitle">12 ans et +</div>
                        </div>
                        <div className="stepper">
                          <button type="button" className="stepper-btn" onClick={() => setAdultsSafe(adults - 1)} aria-label="Diminuer adultes">
                            <i className="fa-solid fa-minus" />
                          </button>
                          <div className="stepper-value">{adults}</div>
                          <button type="button" className="stepper-btn" onClick={() => setAdultsSafe(adults + 1)} aria-label="Augmenter adultes">
                            <i className="fa-solid fa-plus" />
                          </button>
                        </div>
                      </div>

                      <div className="popover-row">
                        <div className="popover-left">
                          <div className="popover-title">
                            <i className="fa-solid fa-child" /> Enfants
                          </div>
                          <div className="popover-subtitle">2 - 11 ans</div>
                        </div>
                        <div className="stepper">
                          <button type="button" className="stepper-btn" onClick={() => setChildrenSafe(children - 1)} aria-label="Diminuer enfants">
                            <i className="fa-solid fa-minus" />
                          </button>
                          <div className="stepper-value">{children}</div>
                          <button type="button" className="stepper-btn" onClick={() => setChildrenSafe(children + 1)} aria-label="Augmenter enfants">
                            <i className="fa-solid fa-plus" />
                          </button>
                        </div>
                      </div>

                      <div className="popover-row">
                        <div className="popover-left">
                          <div className="popover-title">
                            <i className="fa-solid fa-baby" /> Bébés
                          </div>
                          <div className="popover-subtitle">- 2 ans</div>
                        </div>
                        <div className="stepper">
                          <button type="button" className="stepper-btn" onClick={() => setInfantsSafe(infants - 1)} aria-label="Diminuer bébés">
                            <i className="fa-solid fa-minus" />
                          </button>
                          <div className="stepper-value">{infants}</div>
                          <button type="button" className="stepper-btn" onClick={() => setInfantsSafe(infants + 1)} aria-label="Augmenter bébés">
                            <i className="fa-solid fa-plus" />
                          </button>
                        </div>
                      </div>

                      <div className="popover-actions">
                        <button type="button" className="btn-mini btn-done" onClick={closeTraveler}>
                          Terminer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {flightType !== "MD" && idx === 0 && (
              <div className="input-group">
                <label className="desktop-hidden">&nbsp;</label>
                <button className="btn-search btn-search-inline" onClick={handleSearch}>
                  <i className="fa-solid fa-magnifying-glass" /> <span className="btn-text">Rechercher</span>
                </button>
              </div>
            )}

            {flightType === "MD" && idx > 1 && (
              <div className="input-group">
                <label className="desktop-hidden">&nbsp;</label>
                <button type="button" className="btn-mini-danger" onClick={() => setSegments((cur) => cur.filter((_, i) => i !== idx))}>
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            )}
          </div>
        ))}

        {flightType === "MD" && segments.length < 4 && (
          <div className="add-segment-wrapper">
            <button type="button" className="btn-add-segment" onClick={() => setSegments((cur) => [...cur, { from: "", to: "", date: today, fromAirport: null, toAirport: null }])}>
              <i className="fa-solid fa-plus" /> Ajouter un vol
            </button>
          </div>
        )}

        {flightType === "MD" && (
          <div className="search-actions-md">
            <div className="input-group travelers-group">
              <label>Voyageurs</label>
              <div className="popover-anchor" ref={travelersRefMd}>
                <button
                  type="button"
                  className="field-control"
                  onClick={() => setTravelerOpen((v) => !v)}
                  aria-haspopup="dialog"
                  aria-expanded={travelerOpen}
                >
                  <span className="field-icon">
                    <i className="fa-solid fa-users" />
                  </span>
                  <span className="field-value">{travelersLabel}</span>
                  <span className="field-suffix">
                    <i className={`fa-solid ${travelerOpen ? "fa-chevron-up" : "fa-chevron-down"}`} />
                  </span>
                </button>

                {travelerOpen && (
                  <div className="popover" role="dialog" aria-label="Sélection des voyageurs">
                    <div className="popover-row">
                      <div className="popover-left">
                        <div className="popover-title">
                          <i className="fa-solid fa-user" /> Adultes
                        </div>
                        <div className="popover-subtitle">12 ans et +</div>
                      </div>
                      <div className="stepper">
                        <button type="button" className="stepper-btn" onClick={() => setAdultsSafe(adults - 1)} aria-label="Diminuer adultes">
                          <i className="fa-solid fa-minus" />
                        </button>
                        <div className="stepper-value">{adults}</div>
                        <button type="button" className="stepper-btn" onClick={() => setAdultsSafe(adults + 1)} aria-label="Augmenter adultes">
                          <i className="fa-solid fa-plus" />
                        </button>
                      </div>
                    </div>

                    <div className="popover-row">
                      <div className="popover-left">
                        <div className="popover-title">
                          <i className="fa-solid fa-child" /> Enfants
                        </div>
                        <div className="popover-subtitle">2 - 11 ans</div>
                      </div>
                      <div className="stepper">
                        <button type="button" className="stepper-btn" onClick={() => setChildrenSafe(children - 1)} aria-label="Diminuer enfants">
                          <i className="fa-solid fa-minus" />
                        </button>
                        <div className="stepper-value">{children}</div>
                        <button type="button" className="stepper-btn" onClick={() => setChildrenSafe(children + 1)} aria-label="Augmenter enfants">
                          <i className="fa-solid fa-plus" />
                        </button>
                      </div>
                    </div>

                    <div className="popover-row">
                      <div className="popover-left">
                        <div className="popover-title">
                          <i className="fa-solid fa-baby" /> Bébés
                        </div>
                        <div className="popover-subtitle">- 2 ans</div>
                      </div>
                      <div className="stepper">
                        <button type="button" className="stepper-btn" onClick={() => setInfantsSafe(infants - 1)} aria-label="Diminuer bébés">
                          <i className="fa-solid fa-minus" />
                        </button>
                        <div className="stepper-value">{infants}</div>
                        <button type="button" className="stepper-btn" onClick={() => setInfantsSafe(infants + 1)} aria-label="Augmenter bébés">
                          <i className="fa-solid fa-plus" />
                        </button>
                      </div>
                    </div>

                    <div className="popover-actions">
                      <button type="button" className="btn-mini btn-done" onClick={closeTraveler}>
                        Terminer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button className="btn-search" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass" /> Rechercher
            </button>
          </div>
        )}
      </div>

      {dateModalOpen && (
        <div
          className="date-modal-backdrop"
          role="dialog"
          aria-label="Sélectionner dates aller-retour"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDateModal();
          }}
        >
          <div className="date-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="date-modal-header">
              <div className="date-modal-title">Dates</div>
              <button type="button" className="date-modal-close" onClick={closeDateModal} aria-label="Fermer">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="date-modal-body">
              <DatePicker
                inline
                selectsRange
                startDate={rtRangeStart}
                endDate={rtRangeEnd}
                minDate={new Date()}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setRtRangeStart(start);
                  setRtRangeEnd(end);
                  if (start) updateSegment(0, { date: formatLocalYmd(start) || today });
                  if (end) setRtReturnDate(formatLocalYmd(end) || today);
                }}
                monthsShown={isSmallScreen ? 1 : 2}
                dateFormat="yyyy-MM-dd"
              />

              <div className="date-modal-actions">
                <button type="button" className="btn-mini btn-done" onClick={closeDateModal}>
                  Terminer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}