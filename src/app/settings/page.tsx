export default function SettingsPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }} className="text-gradient">Settings</h1>
        <p style={{ color: "var(--text-secondary)" }}>Manage your account and platform preferences.</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "24px" }}>Profile Settings</h3>
        
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" defaultValue="Admin User" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-control" defaultValue="admin@example.com" />
        </div>
        
        <div style={{ marginTop: "24px" }}>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
