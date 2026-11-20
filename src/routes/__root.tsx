import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Cursor } from "@/components/site/Cursor";
import { SmoothScroll } from "@/components/site/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="bg-hero grain flex min-h-screen items-center justify-center px-4 text-ink">
      <div className="max-w-xl text-center">
        <h1 className="display text-[30vw] md:text-[16rem]">404</h1>
        <p className="font-ui text-lg">This page doesn't exist — yet.</p>
        <div className="mt-8">
          <Link to="/" className="ui-label inline-flex border-b-2 border-ink pb-1">
            Back to the portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-5xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="ui-label bg-primary px-4 py-3 text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="ui-label border border-input px-4 py-3 text-foreground">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mohammad Abdul Raqeeb — Engineer, Researcher & Innovator" },
      { name: "description", content: "Portfolio of Mohammad Abdul Raqeeb: robotics, AI, computer vision and engineering research from Hyderabad, India." },
      { name: "author", content: "Mohammad Abdul Raqeeb" },
      { name: "theme-color", content: "#FF3B0B" },
      { property: "og:site_name", content: "Mohammad Abdul Raqeeb" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main" className="ui-label sr-only z-[200] bg-vermilion px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Cursor />
      <Outlet />
      <Toaster position="bottom-left" />
    </QueryClientProvider>
  );
}
