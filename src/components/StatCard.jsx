import './StatCard.css'

export default function StatCard({ label, value, icon, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon-wrap">
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  )
}
