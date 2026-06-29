/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lorsque le domaine cible a3studio.fr sera opérationnel, activer la redirection 301
  // depuis le domaine V1, et aligner NEXT_PUBLIC_SITE_URL en conséquence.
  // async redirects() {
  //   return [
  //     // exemple : redirection d'un ancien chemin
  //     // { source: "/ancien", destination: "/", permanent: true },
  //   ];
  // },
};

export default nextConfig;
