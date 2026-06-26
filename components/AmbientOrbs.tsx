export default function AmbientOrbs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="orb float-slow"
        style={{
          width: 380,
          height: 380,
          top: "-8%",
          left: "8%",
          background: "rgba(91,157,240,0.10)",
        }}
      />
      <div
        className="orb float-slower"
        style={{
          width: 320,
          height: 320,
          top: "4%",
          right: "4%",
          background: "rgba(242,166,90,0.09)",
        }}
      />
    </div>
  );
}
