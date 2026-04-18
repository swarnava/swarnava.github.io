import type { Context } from "https://edge.netlify.com";

const HOMEPAGE_MARKDOWN = `# Swarnava Sengupta

Open Source Evangelist and Customer Success Engineer.

## About

Swarnava Sengupta is an Open Source Evangelist and Computer Engineer from Kolkata, India.
He currently works at Vercel as a Customer Success Engineer.

- Blog: http://blog.swarnava.in/
- LinkedIn: https://www.linkedin.com/in/swarnavasengupta/
- GitHub: https://github.com/swarnava

## Contact

- Email: hello@swarnava.in
- Twitter: https://twitter.com/sw4rn4v4
- LinkedIn: https://linkedin.com/in/swarnavasengupta
`;

function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept");
  return typeof accept === "string" && accept.includes("text/markdown");
}

function estimateTokens(markdown: string): string {
  return String(markdown.trim().split(/\s+/).length);
}

export default async (request: Request, context: Context) => {
  if (!wantsMarkdown(request)) {
    return context.next();
  }

  const headers = new Headers({
    "content-type": "text/markdown; charset=utf-8",
    vary: "Accept",
    "x-markdown-tokens": estimateTokens(HOMEPAGE_MARKDOWN),
  });

  return new Response(HOMEPAGE_MARKDOWN, {
    status: 200,
    headers,
  });
};
