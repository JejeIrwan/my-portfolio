/**
 * Certificates shown on the About page.
 *
 * Images: put files in /public/certificates/ and reference them like "/certificates/nama-file.jpg".
 * Leave the list empty ([]) to hide the Certificates section.
 */

export type Certificate = {
  title: string;
  /** Who issued it, e.g. "Dicoding", "Coursera", "Google". */
  issuer: string;
  year?: number;
  image: string;
  /** Optional link to verify the certificate online. Clicking the card opens this instead of the image. */
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Program kerja praktik di EDUCA STUDIO",
    issuer: "Programming - Educa Studio",
    year: 2025,
    image: "/certificates/sertifikat2_page-0001.jpg",
  },

  {
    title: "Intership Program Batch 7 on IBM Academy : Advanced AI",
    issuer: "Infinite Learning Batam",
    year: 2024,
    image: "/certificates/sertifikat2_page-0002.jpg",
  },
];