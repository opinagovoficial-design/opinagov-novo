import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "OpinaGov — Painel Cívico Oficial"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          border: "12px solid #009b3a",
          padding: "40px",
        }}
      >
        {/* Bandeira estilizada institucional */}
        <div
          style={{
            width: "160px",
            height: "110px",
            backgroundColor: "#009b3a",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
            position: "relative",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "75px",
              backgroundColor: "#fedf00",
              transform: "rotate(45deg)",
              position: "absolute",
            }}
          />
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#002776",
              position: "absolute",
            }}
          />
        </div>

        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          OPINAGOV BRASIL
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#38bdf8",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          Painel Cívico & Consulta Popular Auditada
        </div>

        <div
          style={{
            marginTop: "30px",
            fontSize: 18,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          Transparência • Participação Cívica • Apuração 2026
        </div>
      </div>
    ),
    { ...size }
  )
}
