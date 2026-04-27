 "use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FlightSearchForm from "./components/FlightSearchForm";
import FlightResults from "./components/FlightResults";

type Stopover = { code: string; layoverLabel?: string };
type FlightLeg = {
  origin: string;
  dest: string;
  depTime: string;
  arrTime: string;
  duration: string;
  durationMins: number;
  segments: ApiSegment[];
  stops: number;
  stopovers: Stopover[];
};
type Flight = {
  id: number;
  airline: string;
  carrierCode?: string;
  icon: string;
  price: number;
  hasCabinBaggage: boolean;
  hasCheckedBaggage: boolean;
  outbound: FlightLeg;
  inbound?: FlightLeg;
};
type AirportOption = { code: string; destination: string; country_id: string; country_name: string; city_name: string; type: string };
type Segment = { from: string; to: string; date: string; fromAirport: AirportOption | null; toAirport: AirportOption | null };
type FlightType = "OW" | "RT" | "MD";
type ApiSegment = {
  DepartureAirportCode?: string;
  ArrivalAirportCode?: string;
  DepartureDateTime?: string;
  ArrivalDateTime?: string;
};
type ApiItinerary = { Duration?: string; Segments?: ApiSegment[] };
type ApiAvail = {
  CarrierName?: string;
  CarrierCode?: string;
  TotalAmount?: number | string;
  Luggages?: string | string[];
  Itinerary?: ApiItinerary[];
};

function toHHmm(raw?: string) {
  if (!raw) return "--:--";
  const d = new Date(raw.replace(" ", "T"));
  return Number.isNaN(d.getTime()) ? "--:--" : d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function toMinutes(duration?: string) {
  if (!duration) return 0;
  const hm = duration.match(/^(\d{1,2}):(\d{2})$/);
  if (hm) return Number(hm[1]) * 60 + Number(hm[2]);
  const h = duration.match(/(\d+)\s*h/i);
  const m = duration.match(/(\d+)\s*m/i);
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
}

function toAmount(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number.parseFloat(value.replace(/\s/g, "").replace(",", ".").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function toAirportCode(value?: string) {
  if (!value) return "---";
  return String(value).trim() || "---";
}

function minutesToLabel(minutes: number) {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h <= 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function computeStopovers(segments: ApiSegment[]) {
  if (!Array.isArray(segments) || segments.length <= 1) {
    return [] as Stopover[];
  }

  const stopovers: Stopover[] = [];

  for (let i = 0; i < segments.length - 1; i++) {
    const current = segments[i] || {};
    const next = segments[i + 1] || {};
    const stopCode = toAirportCode(current.ArrivalAirportCode || next.DepartureAirportCode);
    if (stopCode === "---") continue;

    const arr = current.ArrivalDateTime ? new Date(String(current.ArrivalDateTime).replace(" ", "T")) : null;
    const dep = next.DepartureDateTime ? new Date(String(next.DepartureDateTime).replace(" ", "T")) : null;
    const diffMin =
      arr && dep && !Number.isNaN(arr.getTime()) && !Number.isNaN(dep.getTime())
        ? Math.max(0, Math.round((dep.getTime() - arr.getTime()) / 60000))
        : 0;

    stopovers.push({
      code: stopCode,
      layoverLabel: diffMin > 0 ? minutesToLabel(diffMin) : undefined,
    });
  }

  return stopovers;
}

function buildLeg(itinerary?: ApiItinerary): FlightLeg {
  const segments = itinerary?.Segments || [];
  const first = segments[0] || {};
  const last = segments[segments.length - 1] || {};
  const origin = toAirportCode(first?.DepartureAirportCode);
  const dest = toAirportCode(last?.ArrivalAirportCode);
  const stops = Math.max(0, segments.length - 1);
  return {
    origin,
    dest,
    depTime: toHHmm(first?.DepartureDateTime),
    arrTime: toHHmm(last?.ArrivalDateTime),
    duration: itinerary?.Duration || "0h 00m",
    durationMins: toMinutes(itinerary?.Duration),
    segments,
    stops,
    stopovers: computeStopovers(segments),
  };
}

function mapApiFlightsToUi(avails: ApiAvail[]): Flight[] {
  return (avails || []).map((item, index: number) => {
    const outbound = buildLeg(item?.Itinerary?.[0]);
    const inboundRaw = item?.Itinerary?.[1];
    const inbound = inboundRaw ? buildLeg(inboundRaw) : undefined;
    const carrierCode = item?.CarrierCode ? String(item.CarrierCode).trim().toUpperCase() : undefined;
    return {
      id: index + 1,
      airline: item?.CarrierName || item?.CarrierCode || "Compagnie",
      carrierCode,
      icon: "fa-plane",
      price: Math.round(toAmount(item?.TotalAmount)),
      hasCabinBaggage: true,
      hasCheckedBaggage: !String(item?.Luggages || "").toLowerCase().includes("without"),
      outbound,
      inbound,
    };
  }).filter((f: Flight) => f.outbound.origin !== "---" && f.outbound.dest !== "---");
}

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

export default function Home() {
  const today = new Date().toISOString().split("T")[0] ?? "";
  const [flightType, setFlightType] = useState<FlightType>("RT");
  const [segments, setSegments] = useState<Segment[]>([
    { from: "", to: "", date: today, fromAirport: null, toAirport: null },
    { from: "", to: "", date: today, fromAirport: null, toAirport: null },
  ]);
  const [suggestions, setSuggestions] = useState<AirportOption[]>([]);
  const [openSug, setOpenSug] = useState<{ idx: number; side: "from" | "to" } | null>(null);
  const [rtReturnDate, setRtReturnDate] = useState(today);
  const [rtRangeStart, setRtRangeStart] = useState<Date | null>(new Date());
  const [rtRangeEnd, setRtRangeEnd] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelerOpen, setTravelerOpen] = useState(false);
  const [stopsMode, setStopsMode] = useState<"all" | "direct">("all");
  const [refundable, setRefundable] = useState(false);
  const [withLuggage, setWithLuggage] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allowDirect, setAllowDirect] = useState(true);
  const [allow1Stop, setAllow1Stop] = useState(true);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState<"price" | "duration">("price");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>(
    [],
  );
  const [sourceFlights, setSourceFlights] = useState<Flight[]>([]);
  const [apiSearchToken, setApiSearchToken] = useState<string>("");
  const [apiDateParts, setApiDateParts] = useState<{ day: string; month: string; year: string } | null>(null);
  const [apiError, setApiError] = useState<string>("");

  const travelersRef = useRef<HTMLDivElement | null>(null);
  const travelersRefMd = useRef<HTMLDivElement | null>(null);

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const travelersLabel = useMemo(() => {
    const total = adults + children + infants;
    const parts: string[] = [];
    parts.push(`${adults} adulte${adults > 1 ? "s" : ""}`);
    if (children > 0) parts.push(`${children} enfant${children > 1 ? "s" : ""}`);
    if (infants > 0) parts.push(`${infants} bébé${infants > 1 ? "s" : ""}`);
    return `${total} voyageur${total > 1 ? "s" : ""} · ${parts.join(" · ")}`;
  }, [adults, children, infants]);

  useEffect(() => {
    if (!travelerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTravelerOpen(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const container = travelersRef.current || travelersRefMd.current;
      if (container && !container.contains(target)) {
        setTravelerOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [travelerOpen]);

  const airlines = useMemo(
    () => Array.from(new Set(sourceFlights.map((flight) => flight.airline))),
    [sourceFlights],
  );

  const getTotalDurationMins = (flight: Flight) => {
    const outbound = flight.outbound?.durationMins ?? 0;
    const inbound = flight.inbound?.durationMins ?? 0;
    return outbound + inbound;
  };

  const getTotalStops = (flight: Flight) => {
    const outbound = flight.outbound?.stops ?? 0;
    const inbound = flight.inbound?.stops ?? 0;
    return outbound + inbound;
  };

  const filteredFlights = useMemo(() => {
    return [...sourceFlights]
      .filter((flight) => {
        if (flight.price > maxPrice) {
          return false;
        }
        if (!selectedAirlines.includes(flight.airline)) {
          return false;
        }
        const stopsCount = getTotalStops(flight);
        if (stopsCount === 0 && !allowDirect) {
          return false;
        }
        if (stopsCount === 1 && !allow1Stop) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "duration") {
          return getTotalDurationMins(a) - getTotalDurationMins(b);
        }
        return a.price - b.price;
      });
  }, [allow1Stop, allowDirect, maxPrice, selectedAirlines, sortBy, sourceFlights]);

  const toggleAirline = (airline: string) => {
    setSelectedAirlines((current) =>
      current.includes(airline)
        ? current.filter((item) => item !== airline)
        : [...current, airline],
    );
  };

  const loadFlightsList = async (searchToken: string, parts: { day: string; month: string; year: string }) => {
    const listResponse = await fetch(
      `/api/flights/list/${searchToken}/${parts.day}/${parts.month}/${parts.year}/1`,
      { cache: "no-store" },
    );
    const listData = await listResponse.json();
    const avails: ApiAvail[] = Array.isArray(listData?.result?.avails)
      ? listData.result.avails
      : [];
    const mapped = mapApiFlightsToUi(avails);
    setSourceFlights(mapped.length > 0 ? mapped : []);
    const nextAirlines = Array.from(new Set(mapped.map((flight) => flight.airline)));
    setSelectedAirlines(nextAirlines);
  };

  const autocomplete = async (query: string, idx: number, side: "from" | "to") => {
    if (query.trim().length < 2) return;
    const response = await fetch(`/api/flights/autocomplete?q=${encodeURIComponent(query)}`, { cache: "no-store" });
    const data = await response.json();
    setSuggestions(Array.isArray(data?.result) ? data.result : []);
    setOpenSug({ idx, side });
  };

  const updateSegment = (idx: number, patch: Partial<Segment>) => {
    setSegments((current) => current.map((item, i) => (i === idx ? { ...item, ...patch } : item)));
  };

  const applyAirport = (idx: number, side: "from" | "to", airport: AirportOption) => {
    if (side === "from") updateSegment(idx, { from: `${airport.destination} (${airport.code})`, fromAirport: airport });
    if (side === "to") updateSegment(idx, { to: `${airport.destination} (${airport.code})`, toAirport: airport });
    setOpenSug(null);
  };

  const ensureTripSegments = () => {
    if (flightType === "OW") return [segments[0]];
    if (flightType === "RT") {
      const base = segments[0];
      return [
        base,
        {
          from: base.to,
          to: base.from,
          date: rtReturnDate,
          fromAirport: base.toAirport,
          toAirport: base.fromAirport,
        },
      ];
    }
    return segments;
  };

  const closeTraveler = () => setTravelerOpen(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setShowResults(false);
    setApiError("");

    try {
      const tripSegments = ensureTripSegments();
      if (flightType === "RT" && rtRangeStart) {
        tripSegments[0].date = rtRangeStart.toISOString().split("T")[0] || tripSegments[0].date;
      }
      if (flightType === "RT" && rtRangeEnd) {
        tripSegments[1].date = rtRangeEnd.toISOString().split("T")[0] || tripSegments[1].date;
      }
      if (tripSegments.some((s) => !s.fromAirport || !s.toAirport || !s.date)) {
        throw new Error("Selectionne toutes les villes via autocomplete et toutes les dates.");
      }
      const payload = {
        dataPost: {
          Trip: flightType,
          Adult: adults,
          Child: children,
          Infant: infants,
          Cabin: "ALL",
          Stops: stopsMode,
          ExactDates: flightType === "MD" ? "e" : "c2",
          RefundableFares: refundable,
          AirlineInclude: [],
          AirlineExclude: [],
          withLuggage: withLuggage,
          Itineraries: tripSegments.map((seg, idx) => ({
            Ref: idx + 1,
            Deprature: seg.fromAirport?.destination,
            DepartureCountryName: seg.fromAirport?.country_name,
            DepartureCityName: seg.fromAirport?.city_name,
            DepartureCountryId: seg.fromAirport?.country_id,
            DepartureCode: seg.fromAirport?.code,
            DepartureType: seg.fromAirport?.type,
            Arrival: seg.toAirport?.destination,
            ArrivalCountryName: seg.toAirport?.country_name,
            ArrivalCityName: seg.toAirport?.city_name,
            ArrivalCountryId: seg.toAirport?.country_id,
            ArrivalCode: seg.toAirport?.code,
            ArrivalType: seg.toAirport?.type,
            Date: seg.date,
          })),
        },
      };

      const availabilityResponse = await fetch("/api/flights/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });
      const availabilityData = await availabilityResponse.json();
      if (!availabilityResponse.ok || availabilityData?.status === false) {
        throw new Error(availabilityData?.message || "invalid request data");
      }
      const result = availabilityData?.result || {};
      const searchToken = result.searchToken;
      const firstDate = String(result.first_date || tripSegments[0].date);
      const [year, month, day] = firstDate.split("-");
      const dateParts = { day, month, year };

      if (!searchToken || !day || !month || !year) {
        throw new Error("La recherche ne retourne pas de searchToken exploitable.");
      }

      await loadFlightsList(searchToken, dateParts);
      setApiSearchToken(searchToken);
      setApiDateParts(dateParts);

      setIsLoading(false);
      setShowResults(true);
    } catch (error) {
      setIsLoading(false);
      setShowResults(true);
      setSourceFlights([]);
      const message =
        error instanceof Error
          ? error.message
          : "Impossible de recuperer les vols reels pour le moment.";
      setApiError(message);
    }
  };

  return (
    <>
      <nav>
        <a href="#" className="logo">
          <i className="fa-solid fa-paper-plane" />
          xo-link <span>Voyages</span>
        </a>
        <div className="nav-links">
          <a href="#" className="active">
            Vols
          </a>
          <a href="#">Hôtels</a>
          <a href="#">Voitures</a>
          <a href="#">Offres exclusives</a>
        </div>
        <div className="user-actions">
          <span>
            <i className="fa-solid fa-globe" /> FR | EUR
          </span>
          <span>
            <i className="fa-regular fa-circle-user user-icon" /> Mon Espace
          </span>
        </div>
      </nav>

      <div className="hero">
        <h1>Où souhaitez-vous aller ?</h1>
        <p>Réservez des billets d&apos;avion aux meilleurs prix à travers le monde entier.</p>
      </div>

      <FlightSearchForm
        today={today}
        flightType={flightType}
        setFlightType={setFlightType}
        segments={segments}
        setSegments={setSegments}
        ensureTripSegments={ensureTripSegments}
        updateSegment={updateSegment}
        suggestions={suggestions}
        openSug={openSug}
        setOpenSug={setOpenSug}
        autocomplete={autocomplete}
        applyAirport={applyAirport}
        rtRangeStart={rtRangeStart}
        rtRangeEnd={rtRangeEnd}
        setRtRangeStart={setRtRangeStart}
        setRtRangeEnd={setRtRangeEnd}
        setRtReturnDate={setRtReturnDate}
        stopsMode={stopsMode}
        setStopsMode={setStopsMode}
        refundable={refundable}
        setRefundable={setRefundable}
        withLuggage={withLuggage}
        setWithLuggage={setWithLuggage}
        travelersLabel={travelersLabel}
        travelerOpen={travelerOpen}
        setTravelerOpen={setTravelerOpen}
        closeTraveler={closeTraveler}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        infants={infants}
        setInfants={setInfants}
        clamp={clamp}
        travelersRef={travelersRef}
        travelersRefMd={travelersRefMd}
        handleSearch={handleSearch}
      />

      <main className="main-content" style={{ display: showResults ? "grid" : "none" }}>
        <aside className="filters">
          <div className="filter-section">
            <h3>
              <i className="fa-solid fa-filter" /> Escales
            </h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <div className="checkbox-left">
                  <input
                    type="checkbox"
                    checked={allowDirect}
                    onChange={(event) => setAllowDirect(event.target.checked)}
                  />
                  Direct
                </div>
              </label>
              <label className="checkbox-label">
                <div className="checkbox-left">
                  <input
                    type="checkbox"
                    checked={allow1Stop}
                    onChange={(event) => setAllow1Stop(event.target.checked)}
                  />
                  1 escale
                </div>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>
              <i className="fa-solid fa-wallet" /> Prix max ({maxPrice}€)
            </h3>
            <input
              type="range"
              className="price-range"
              min={100}
              max={1000}
              step={50}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
            <div className="price-display">
              <span>100€</span>
              <span>1000€</span>
            </div>
          </div>

          <div className="filter-section">
            <h3>
              <i className="fa-solid fa-plane" /> Compagnies
            </h3>
            <div className="checkbox-group">
              {airlines.map((airline) => (
                <label key={airline} className="checkbox-label">
                  <div className="checkbox-left">
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirline(airline)}
                    />
                    {airline}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="results">
          <FlightResults
            flights={filteredFlights}
            sortBy={sortBy}
            setSortBy={setSortBy}
            apiSearchToken={apiSearchToken}
            apiDateParts={apiDateParts}
            apiError={apiError}
            segments={segments}
            rtReturnDate={rtReturnDate}
          />
        </section>
      </main>

      <div className="loader-overlay" style={{ display: isLoading ? "flex" : "none" }}>
        <i className="fa-solid fa-plane plane-loader" />
        <h3 className="loader-title">Recherche des meilleures offres...</h3>
        <p className="loader-subtitle">Interrogation des compagnies aériennes</p>
      </div>
    </>
  );
}
