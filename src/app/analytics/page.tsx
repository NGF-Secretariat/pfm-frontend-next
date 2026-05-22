export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }} className="text-gradient">Analytics</h1>
        <p style={{ color: "var(--text-secondary)" }}>Deep dive into your data metrics.</p>
      </div>

      <div className="card" style={{ minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--text-secondary)", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
          <h3>Detailed Analytics Dashboard</h3>
          <p style={{ marginTop: "8px" }}>Coming soon in the next update.</p>
        </div>
      </div>
    </div>
  );
}
