import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Preview card shown when the site link is shared (WhatsApp, LinkedIn, X, Telegram…).
 * Generated automatically at build time — no image editing needed.
 * Project pages with their own image keep using that image instead.
 */

/** Short line under your name. Edit freely. */
const TAGLINE = "Building modern web applications · Based in Batam";

export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  background: "#0A0A0A",
  card: "#121212",
  border: "#242424",
  accent: "#A1A1A1",
  foreground: "#FAFAFA",
  muted: "#A1A1A1",
};

/** Loads the profile photo from /public as a data URL (PNG/JPG only). */
async function loadAvatar(): Promise<string | null> {
  if (!site.avatar) return null;
  const ext = site.avatar.split(".").pop()?.toLowerCase();
  const mime = ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : null;
  if (!mime) return null;

  try {
    const file = await readFile(join(process.cwd(), "public", site.avatar.replace(/^\//, "")));
    return `data:${mime};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const avatar = await loadAvatar();
  const domain = site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: colors.background,
          color: colors.foreground,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: avatar ? 640 : 1000 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {site.name}
          </div>
           <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: colors.muted }}>
            {TAGLINE}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 56, fontSize: 26 }}>
            {domain}
          </div>
        </div>

        {avatar && (
          <div
            style={{
              display: "flex",
              width: 320,
              height: 400,
              borderRadius: 32,
              overflow: "hidden",
              border: `2px solid ${colors.border}`,
              backgroundColor: colors.card,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt=""
              width={320}
              height={400}
              style={{ width: 320, height: 400, objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    ),
    size,
  );
}
