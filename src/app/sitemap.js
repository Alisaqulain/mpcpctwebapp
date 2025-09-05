export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const staticRoutes = [
    "",
    "/exam",
    "/learning",
    "/skill_test",
    "/price",
    "/about-us",
    "/contact-us",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.7,
  }));
}
