import { ImageResponse } from "next/og";
import { getInitials, site } from "@/lib/site";

/** Icon used when the site is saved to an iPhone/iPad home screen. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
          color: "#FAFAFA",
          fontSize: 80,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        {getInitials(site.name)}
      </div>
    ),
    size,
  );
}
