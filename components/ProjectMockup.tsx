type MockupKind = "crm" | "marketplace" | "ecommerce" | "qaboard";

const palette = {
  blue: "#5b9df0",
  amber: "#f2a65a",
  green: "#6fcf97",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.14)",
  fill: "rgba(255,255,255,0.04)",
};

function CRMMockup() {
  return (
    <svg viewBox="0 0 480 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="300" fill="#0d1219" />
      {/* sidebar */}
      <rect x="0" y="0" width="90" height="300" fill="#0a0e14" stroke={palette.line} />
      {[40, 70, 100, 130, 160].map((y, i) => (
        <rect key={y} x="18" y={y} width="54" height="8" rx="3" fill={i === 0 ? palette.blue : palette.fill} opacity={i === 0 ? 0.9 : 0.6} />
      ))}
      {/* top bar */}
      <rect x="90" y="0" width="390" height="44" fill="#0d1219" stroke={palette.line} />
      <circle cx="450" cy="22" r="10" fill={palette.fill} />
      <rect x="112" y="16" width="120" height="12" rx="6" fill={palette.fill} />
      {/* stat cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${112 + i * 122}, 62)`}>
          <rect width="108" height="62" rx="10" fill="rgba(255,255,255,0.045)" stroke={palette.line} />
          <rect x="12" y="14" width="50" height="7" rx="3" fill={palette.fill} />
          <rect x="12" y="30" width="34" height="14" rx="3" fill={i === 0 ? palette.green : i === 1 ? palette.blue : palette.amber} opacity="0.85" />
        </g>
      ))}
      {/* table */}
      <rect x="112" y="138" width="354" height="138" rx="10" fill="rgba(255,255,255,0.03)" stroke={palette.line} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(126, ${158 + i * 28})`}>
          <circle cx="6" cy="6" r="6" fill={i % 2 === 0 ? palette.green : palette.amber} opacity="0.7" />
          <rect x="20" y="1" width="120" height="9" rx="3" fill={palette.fill} />
          <rect x="240" y="1" width="64" height="9" rx="3" fill="rgba(91,157,240,0.35)" />
        </g>
      ))}
    </svg>
  );
}

function MarketplaceMockup() {
  return (
    <svg viewBox="0 0 480 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="300" fill="#0d1219" />
      <rect x="0" y="0" width="480" height="48" fill="#0a0e14" stroke={palette.line} />
      <rect x="24" y="18" width="80" height="12" rx="4" fill={palette.amber} opacity="0.85" />
      <rect x="320" y="16" width="56" height="16" rx="8" fill={palette.fill} />
      <rect x="386" y="16" width="70" height="16" rx="8" fill="rgba(242,166,90,0.25)" />
      {/* grid of cards */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i} transform={`translate(${24 + col * 150}, ${72 + row * 108})`}>
            <rect width="132" height="92" rx="10" fill="rgba(255,255,255,0.04)" stroke={palette.line} />
            <rect x="10" y="10" width="112" height="44" rx="6" fill="rgba(91,157,240,0.18)" />
            <rect x="10" y="62" width="80" height="8" rx="3" fill={palette.fill} />
            <rect x="10" y="76" width="50" height="8" rx="3" fill="rgba(111,207,151,0.4)" />
          </g>
        );
      })}
    </svg>
  );
}

function EcommerceMockup() {
  return (
    <svg viewBox="0 0 480 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="300" fill="#0d1219" />
      <rect x="0" y="0" width="480" height="40" fill="#0a0e14" stroke={palette.line} />
      <rect x="20" y="14" width="60" height="12" rx="4" fill={palette.green} opacity="0.85" />
      <rect x="200" y="12" width="180" height="16" rx="8" fill={palette.fill} />
      <circle cx="440" cy="20" r="9" fill="rgba(111,207,151,0.3)" />
      {/* hero banner */}
      <rect x="20" y="56" width="440" height="78" rx="10" fill="rgba(111,207,151,0.1)" stroke={palette.line} />
      <rect x="40" y="80" width="160" height="10" rx="4" fill={palette.fill} />
      <rect x="40" y="98" width="100" height="18" rx="6" fill="rgba(111,207,151,0.35)" />
      {/* product grid */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${20 + i * 112}, 150)`}>
          <rect width="98" height="110" rx="8" fill="rgba(255,255,255,0.04)" stroke={palette.line} />
          <rect x="9" y="9" width="80" height="60" rx="6" fill="rgba(255,255,255,0.06)" />
          <rect x="9" y="78" width="60" height="8" rx="3" fill={palette.fill} />
          <rect x="9" y="92" width="36" height="9" rx="3" fill="rgba(111,207,151,0.4)" />
        </g>
      ))}
    </svg>
  );
}

function QABoardMockup() {
  const cols = [
    { label: "OPEN", color: palette.amber, count: 3 },
    { label: "IN PROGRESS", color: palette.blue, count: 2 },
    { label: "RESOLVED", color: palette.green, count: 4 },
  ];
  return (
    <svg viewBox="0 0 480 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="300" fill="#0d1219" />
      <rect x="0" y="0" width="480" height="42" fill="#0a0e14" stroke={palette.line} />
      <rect x="20" y="14" width="70" height="12" rx="4" fill={palette.blue} opacity="0.85" />
      <circle cx="440" cy="20" r="9" fill="rgba(91,157,240,0.3)" />
      {cols.map((col, ci) => (
        <g key={col.label} transform={`translate(${16 + ci * 153}, 54)`}>
          <rect width="142" height="22" rx="6" fill="rgba(255,255,255,0.04)" />
          <circle cx="14" cy="11" r="4" fill={col.color} opacity="0.9" />
          <rect x="24" y="7" width="70" height="8" rx="3" fill={palette.fill} />
          <rect x="122" y="5" width="14" height="12" rx="6" fill={`${col.color}33`} />
          {Array.from({ length: col.count }).map((_, ri) => (
            <g key={ri} transform={`translate(0, ${34 + ri * 50})`}>
              <rect
                width="142"
                height="42"
                rx="8"
                fill="rgba(255,255,255,0.035)"
                stroke={palette.line}
              />
              <rect x="10" y="9" width="3" height="24" rx="1.5" fill={col.color} opacity="0.8" />
              <rect x="20" y="10" width={ri % 2 === 0 ? 96 : 76} height="7" rx="3" fill={palette.fill} />
              <rect x="20" y="23" width="40" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
              <circle cx="124" cy="26" r="7" fill={`${col.color}26`} stroke={col.color} strokeWidth="1" opacity="0.7" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function ProjectMockup({ kind }: { kind: MockupKind }) {
  if (kind === "crm") return <CRMMockup />;
  if (kind === "marketplace") return <MarketplaceMockup />;
  if (kind === "qaboard") return <QABoardMockup />;
  return <EcommerceMockup />;
}
