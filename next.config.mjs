/** @type {import('next').NextConfig} */

// En-têtes de sécurité appliqués à toutes les routes.
// Ressources 100 % same-origin (polices auto-hébergées via next/font, images via
// next/image, analytics Vercel first-party) → CSP stricte 'self' suffisante.
// 'unsafe-inline' reste requis pour les scripts d'hydratation Next et les styles
// inline ; à durcir ultérieurement via nonce (amélioration moyen terme).
// 'unsafe-eval' est ajouté UNIQUEMENT en développement (le HMR de Next l'exige) ;
// la production reste stricte, sans eval.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = ["'self'", "'unsafe-inline'", isDev ? "'unsafe-eval'" : ""].filter(Boolean).join(" ");

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
