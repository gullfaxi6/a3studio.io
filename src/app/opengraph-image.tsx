import { ImageResponse } from "next/og";

// Image de partage social (Open Graph + Twitter) — générée au build.
export const alt = "A3 Studio — Architecture augmentée, BIM & Scan-to-BIM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F1EB",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Marque */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              border: "3px solid #1C1B19",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              color: "#1C1B19",
            }}
          >
            A3
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: 6, color: "#1C1B19" }}>
              A3 STUDIO
            </div>
            <div style={{ fontSize: 18, letterSpacing: 4, color: "#8A8377" }}>
              ARCHITECTURE AUGMENTÉE
            </div>
          </div>
        </div>

        {/* Baseline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 500, lineHeight: 1.08, color: "#1C1B19" }}>
            Analyser le réel.
          </div>
          <div style={{ fontSize: 62, fontWeight: 500, lineHeight: 1.08, color: "#1C1B19" }}>
            Anticiper les usages.
          </div>
          <div style={{ fontSize: 62, fontWeight: 500, lineHeight: 1.08, color: "#C25A34" }}>
            Architecturer avec clarté.
          </div>
        </div>

        {/* Pied */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#5A554B",
          }}
        >
          <div>BIM · Scan-to-BIM · Architecture de l&apos;existant</div>
          <div style={{ color: "#1C1B19", fontWeight: 600 }}>www.a3studio.io</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
