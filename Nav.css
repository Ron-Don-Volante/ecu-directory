import { Link } from 'react-router-dom';
import './ShopCard.css';

function Initials({ name }) {
  const parts = name.trim().split(' ');
  const i = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : name.slice(0, 2);
  return <div className="shop-initials">{i.toUpperCase()}</div>;
}

function SpecialtyTag({ label, highlight }) {
  return <span className={`tag ${highlight ? 'tag-accent' : ''}`}>{label}</span>;
}

// ── FEATURED ────────────────────────────────────────────────
function FeaturedCard({ shop }) {
  return (
    <div className="card card-featured">
      <div className="card-featured-left">
        <Initials name={shop.name} />
      </div>
      <div className="card-featured-body">
        <span className="badge badge-featured">Featured</span>
        <div className="card-name">{shop.name}</div>
        <div className="card-loc">
          <span className="loc-pin">◎</span>
          {shop.city}, {shop.state}
          {shop.distance != null && (
            <span className="dist-pill">{shop.distance} mi</span>
          )}
        </div>
        {shop.bio && <p className="card-bio">{shop.bio}</p>}
        <div className="tag-row">
          {shop.specialties.map((s) => (
            <SpecialtyTag key={s} label={s.replace('-', ' ')} highlight />
          ))}
        </div>
        <div className="tag-row">
          {shop.ecuBrands.map((b) => (
            <span key={b} className="tag">{b}</span>
          ))}
        </div>
      </div>
      <div className="card-featured-actions">
        {shop.phone && (
          <a href={`tel:${shop.phone}`} className="btn btn-primary">
            Contact
          </a>
        )}
        {shop.website && (
          <a href={shop.website} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Website
          </a>
        )}
        <Link to={`/directory/${shop.id}`} className="btn btn-ghost">
          Profile
        </Link>
      </div>
    </div>
  );
}

// ── STANDARD ─────────────────────────────────────────────────
function StandardCard({ shop }) {
  return (
    <div className="card card-standard">
      <Initials name={shop.name} />
      <div className="card-standard-body">
        <span className="badge badge-standard">✓ Verified</span>
        <div className="card-name card-name-sm">{shop.name}</div>
        <div className="card-loc card-loc-sm">
          <span className="loc-pin">◎</span>
          {shop.city}, {shop.state}
          {shop.stateMatch && <span className="state-match-pill">your state</span>}
        </div>
        <div className="tag-row">
          {shop.specialties.map((s) => (
            <span key={s} className="tag">{s.replace('-', ' ')}</span>
          ))}
          {shop.ecuBrands.map((b) => (
            <span key={b} className="tag">{b}</span>
          ))}
        </div>
      </div>
      <div className="card-standard-actions">
        {shop.website && (
          <a href={shop.website} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            Website
          </a>
        )}
        <Link to={`/directory/${shop.id}`} className="btn btn-ghost btn-sm">
          Profile
        </Link>
      </div>
    </div>
  );
}

// ── FREE ─────────────────────────────────────────────────────
function FreeCard({ shop }) {
  return (
    <div className="card card-free">
      <div className="free-init">{shop.name.slice(0, 2).toUpperCase()}</div>
      <div className="card-free-body">
        <div className="card-name card-name-sm">{shop.name}</div>
        <div className="free-state">{shop.state}</div>
      </div>
      <div className="nudge">
        <span className="nudge-text">Want more visibility?</span>
        <Link to="/submit" className="nudge-btn">Upgrade ↗</Link>
      </div>
    </div>
  );
}

// ── EXPORT ───────────────────────────────────────────────────
export default function ShopCard({ shop }) {
  if (shop.tier === 'featured') return <FeaturedCard shop={shop} />;
  if (shop.tier === 'standard') return <StandardCard shop={shop} />;
  return <FreeCard shop={shop} />;
}
