import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#009b3a",
          borderRadius: "6px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "16px",
            background: "#fedf00",
            transform: "rotate(45deg)",
            position: "absolute",
          }}
        />
        <div
          style={{
            width: "11px",
            height: "11px",
            borderRadius: "50%",
            background: "#002776",
            position: "absolute",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
