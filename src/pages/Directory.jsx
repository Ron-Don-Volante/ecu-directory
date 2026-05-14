import { useState, useMemo } from 'react';
import ShopCard from '../components/ShopCard';
import {
  getAllShops,
  getShopsByTier,
  getStateFromZipCode,
  SPECIALTIES,
  ECU_BRANDS,
} from '../services/shops';
import './Directory.css';

function TierLabel({ icon, label, sortNote, noteColor }) {
  return (
    <div className="tier-label">
      <span className="tier-label-icon">{icon}</span>
      {label}
      {sortNote && (
        <span className="tier-sort-note" style={{ color: noteColor }}>
          · {sortNote}
        </span>
      )}
      <span className="tier-label-line" />
    </div>
  );
}

export default function Directory() {
  const [zip, setZip]                 = useState('');
  const [activeZip, setActiveZip]     = useState('');
  const [specialtyFilter, setSpecialty] = useState('');
  const [brandFilter, setBrand]       = useState('');

  const allShops = useMemo(
    () => getAllShops({ specialty: specialtyFilter || null, ecuBrand: brandFilter || null }),
    [specialtyFilter, brandFilter]
  );

  const { featured, standard, free, visitorState, hasCoords } = useMemo(
    () => getShopsByTier(allShops, activeZip),
    [allShops, activeZip]
  );

  // annotate standard cards with stateMatch flag
  const standardAnnotated = standard.map((s) => ({
    ...s,
    stateMatch: visitorState ? s.state === visitorState : false,
  }));

  function handleZipSearch() {
    if (/^\d{5}$/.test(zip)) setActiveZip(zip);
  }

  function handleZipKey(e) {
    if (e.key === 'Enter') handleZipSearch();
    if (activeZip && zip === '') setActiveZip('');
  }

  const total = featured.length + standard.length + free.length;

  return (
    <div className="directory">
      {/* Header */}
      <div className="dir-header">
        <h1 className="dir-title">
          Find a <em>tuner or shop</em> near you
        </h1>
        <p className="dir-sub">
          Specialists in standalone ECU installs, wiring, and tuning.
        </p>

        <div className="dir-search-row">
          <div className="search-bar">
            <input type="text" placeholder="Search by name or specialty..." />
            <button className="search-btn">Search</button>
          </div>
          <div className="zip-bar">
            <span className="zip-icon">◎</span>
            <input
              type="text"
              placeholder="Zip code"
              maxLength={5}
              value={zip}
              onChange={(e) => {
                setZip(e.target.value);
                if (e.target.value === '') setActiveZip('');
              }}
              onKeyDown={handleZipKey}
              className="zip-input"
            />
            <button className="zip-btn" onClick={handleZipSearch}>Go</button>
          </div>
        </div>

        {/* Sort status pills */}
        <div className="sort-pills">
          <span className={`sort-pill ${activeZip && hasCoords ? 'pill-accent' : 'pill-dim'}`}>
            ★ Featured: {activeZip && hasCoords ? `sorted by distance from ${activeZip}` : 'default order'}
          </span>
          <span className={`sort-pill ${activeZip && visitorState ? 'pill-blue' : 'pill-dim'}`}>
            ✓ Standard: {activeZip && visitorState ? `${visitorState} shops first` : 'default order'}
          </span>
          <span className="sort-pill pill-dim">
            · Free: alphabetical only
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="dir-layout">
        {/* Sidebar */}
        <aside className="dir-sidebar">
          <div className="filter-section">
            <div className="filter-label">Specialty</div>
            {SPECIALTIES.map((s) => (
              <label key={s.id} className={`filter-item ${specialtyFilter === s.id ? 'on' : ''}`}>
                <input
                  type="radio"
                  name="specialty"
                  style={{ display: 'none' }}
                  checked={specialtyFilter === s.id}
                  onChange={() => setSpecialty(specialtyFilter === s.id ? '' : s.id)}
                />
                <div className="fchk">{specialtyFilter === s.id && <div className="fchki" />}</div>
                <span className="ft">{s.label}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <div className="filter-label">ECU brand</div>
            {ECU_BRANDS.map((b) => (
              <label key={b} className={`filter-item ${brandFilter === b ? 'on' : ''}`}>
                <input
                  type="radio"
                  name="brand"
                  style={{ display: 'none' }}
                  checked={brandFilter === b}
                  onChange={() => setBrand(brandFilter === b ? '' : b)}
                />
                <div className="fchk">{brandFilter === b && <div className="fchki" />}</div>
                <span className="ft">{b}</span>
              </label>
            ))}
          </div>

          {(specialtyFilter || brandFilter) && (
            <button
              className="clear-btn"
              onClick={() => { setSpecialty(''); setBrand(''); }}
            >
              Clear filters
            </button>
          )}
        </aside>

        {/* Cards */}
        <main className="dir-content">
          <div className="dir-content-header">
            <span className="result-label">
              {total} listing{total !== 1 ? 's' : ''}
              {specialtyFilter && ` · ${SPECIALTIES.find(s => s.id === specialtyFilter)?.label}`}
              {brandFilter && ` · ${brandFilter}`}
              {activeZip && ` · zip: ${activeZip}${visitorState ? ` (${visitorState})` : ''}`}
            </span>
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <>
              <TierLabel
                icon="★"
                label="Featured"
                sortNote={activeZip && hasCoords ? 'sorted by distance' : 'sorted by distance · enter zip above'}
                noteColor="var(--accent)"
              />
              {featured.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </>
          )}

          {/* Standard */}
          {standard.length > 0 && (
            <>
              <TierLabel
                icon="✓"
                label="Standard"
                sortNote={activeZip && visitorState ? `${visitorState} first` : 'enter zip to sort by state'}
                noteColor="var(--blue)"
              />
              {standardAnnotated.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </>
          )}

          {/* Free */}
          {free.length > 0 && (
            <>
              <TierLabel
                icon="·"
                label="Free listings"
                sortNote="alphabetical"
                noteColor="var(--muted2)"
              />
              {free.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </>
          )}

          {total === 0 && (
            <div className="empty-state">
              <div className="empty-icon">⚡</div>
              <p>No listings match your filters.</p>
              <button onClick={() => { setSpecialty(''); setBrand(''); }} className="clear-btn">
                Clear filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Key */}
      <div className="dir-key">
        <span className="key-item"><span className="key-dot" style={{ background: 'var(--accent)' }} /> Featured: exact distance sort (zip)</span>
        <span className="key-item"><span className="key-dot" style={{ background: 'var(--blue)' }} /> Standard: same-state priority</span>
        <span className="key-item"><span className="key-dot" style={{ background: 'var(--muted2)' }} /> Free: name only, alphabetical</span>
      </div>
    </div>
  );
}
