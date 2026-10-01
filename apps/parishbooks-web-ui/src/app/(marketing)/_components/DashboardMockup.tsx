export function DashboardMockup() {
  const bars = [40, 65, 50, 80, 60, 90, 70];
  const stats = [
    { label: "Members", value: "1,284", color: "var(--color-accent-indigo)" },
    { label: "Giving", value: "$18.2k", color: "var(--color-accent-amber)" },
    { label: "Families", value: "412", color: "var(--color-accent-emerald)" },
  ];

  return (
    <div
      className="w-full max-w-md rounded-2xl border p-5 shadow-sm"
      style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
          Dashboard
        </span>
        <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          This month
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg p-3" style={{ background: "var(--color-muted)" }}>
            <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              {stat.label}
            </p>
            <p className="mt-1 text-lg font-semibold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex h-24 items-end gap-2">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: `${height}%`,
              background: "var(--color-accent-indigo)",
              opacity: 0.25 + (i / bars.length) * 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
