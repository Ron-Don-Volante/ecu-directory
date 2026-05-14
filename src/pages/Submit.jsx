import { useState } from 'react';
import { SPECIALTIES, ECU_BRANDS } from '../services/shops';
import './Submit.css';

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/mo',
    features: ['Name listed in directory', 'State shown', 'Alphabetical placement'],
    note: 'Goes live immediately',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$9',
    period: '/mo',
    features: ['Logo + contact info', 'Website link', 'ECU brands listed', 'Verified badge', 'State-match sort boost'],
    note: 'Reviewed within 48hrs',
  },
  {
    id: 'featured',
    name: 'Featured',
    price: '$39',
    period: '/mo',
    features: ['Full bio displayed', 'Priority placement', 'Distance-sort for visitors', 'Featured badge', 'Homepage spotlight rotation'],
    note: 'Reviewed within 24hrs',
  },
];

function MultiSelect({ options, selected, onChange, label }) {
  function toggle(id) {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className="check-grid">
        {options.map((o) => (
          <div
            key={o.id || o}
            className={`citem ${selected.includes(o.id || o) ? 'on' : ''}`}
            onClick={() => toggle(o.id || o)}
          >
            {o.label || o}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Submit() {
  const [tier, setTier]               = useState('free');
  const [specialties, setSpecialties] = useState([]);
  const [brands, setBrands]           = useState([]);
  const [submitted, setSubmitted]     = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Phase 2: POST to Supabase here
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="submit-success">
        <div className="success-icon">✓</div>
        <h2>Listing submitted</h2>
        <p>
          {tier === 'free'
            ? 'Your free listing is live. You can upgrade anytime.'
            : 'Your listing is under review and will go live within 48 hours.'}
        </p>
        <a href="/directory" className="btn-back">View directory →</a>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <div className="submit-inner">
        <h1>List your shop or tuning service</h1>
        <p className="submit-sub">
          Fill everything out now — upgrading later requires no resubmission.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Tier */}
          <div className="form-section">
            <div className="fs-label">Choose your tier</div>
            <div className="tier-cards">
              {TIERS.map((t) => (
                <div
                  key={t.id}
                  className={`tier-card ${tier === t.id ? 'on' : ''}`}
                  onClick={() => setTier(t.id)}
                >
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-price">{t.price}<span>{t.period}</span></div>
                  <ul className="tc-features">
                    {t.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="tc-note">{t.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Basic info */}
          <div className="form-section">
            <div className="fs-label">Basic info</div>
            <div className="field-row">
              <div className="field">
                <label className="field-label">Shop / business name *</label>
                <input type="text" placeholder="Surge Motorsports" required />
              </div>
              <div className="field">
                <label className="field-label">Your name *</label>
                <input type="text" placeholder="Contact name" required />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label className="field-label">City</label>
                <input type="text" placeholder="Los Angeles" />
              </div>
              <div className="field">
                <label className="field-label">State *</label>
                <input type="text" placeholder="CA" maxLength={2} required />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label className="field-label">Email *</label>
                <input type="email" placeholder="you@shop.com" required />
              </div>
              <div className="field">
                <label className="field-label">Phone</label>
                <input type="tel" placeholder="(555) 000-0000" />
              </div>
            </div>
            <div className="field">
              <label className="field-label">Website URL</label>
              <input type="url" placeholder="https://yourshop.com" />
            </div>
          </div>

          {/* Specialties */}
          <div className="form-section">
            <div className="fs-label">Specialties</div>
            <MultiSelect
              options={SPECIALTIES}
              selected={specialties}
              onChange={setSpecialties}
              label="Select all that apply"
            />
            <div className="field" style={{ marginTop: '0.75rem' }}>
              <label className="field-label">Other specialty (optional)</label>
              <input type="text" placeholder="e.g. Motorcycle EFI, rotary specialist..." />
            </div>
          </div>

          {/* ECU brands */}
          <div className="form-section">
            <div className="fs-label">ECU brands you work with</div>
            <MultiSelect
              options={ECU_BRANDS.map((b) => ({ id: b, label: b }))}
              selected={brands}
              onChange={setBrands}
              label="Select all that apply"
            />
          </div>

          {/* Profile */}
          <div className="form-section">
            <div className="fs-label">Profile</div>
            <div className="field">
              <label className="field-label">Shop bio / description</label>
              <textarea placeholder="Tell the community about your shop, your experience, and what makes you stand out..." />
            </div>
            <div className="field-row">
              <div className="field">
                <label className="field-label">Instagram</label>
                <input type="text" placeholder="@yourshop" />
              </div>
              <div className="field">
                <label className="field-label">YouTube</label>
                <input type="url" placeholder="https://youtube.com/..." />
              </div>
            </div>
            <div className="field">
              <label className="field-label">Build portfolio / gallery (optional)</label>
              <input type="url" placeholder="https://..." />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit listing
          </button>
          <p className="submit-note">
            {tier === 'free'
              ? 'Free listings go live immediately.'
              : 'Standard and Featured listings are reviewed within 24–48 hours.'}
          </p>
        </form>
      </div>
    </div>
  );
}
