import { ImageResponse } from "next/og";
import { getInitials, site } from "@/lib/site";

/**
 * Browser tab icon (favicon), generated automatically from your initials.
 * To use a real logo instead, delete this file and put icon.png in the app/ folder.
 */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          borderRadius: 14,
          backgroundColor: "#121212",
          color: "#FAFAFA",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {getInitials(site.name)}
      </div>
    ),
    size,
  );
}
