import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";

// Lazy so three.js never loads during SSR or on devices that can't run it.
const HeroSculpture = lazy(() => import("./HeroSculpture"));

/** True when this browser can actually hand out a WebGL context right now. */
function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    // Release the probe context immediately so it doesn't count against the browser's limit.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

class SculptureBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(error: unknown) {
    console.warn("3D sculpture disabled:", error);
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Static stand-in shown when WebGL is unavailable or the 3D scene fails. */
export function SculptureFallback() {
  return <div className="sculpture-fallback h-full w-full" aria-hidden />;
}

type Status = "pending" | "3d" | "fallback" | "off";

/**
 * Mounts the 3D sculpture only when `media` matches (so desktop and mobile
 * slots never create two WebGL contexts at once) and the device supports WebGL.
 * Any failure degrades to a static visual instead of blanking the page.
 */
export function SculptureSlot({ media, children }: { media: string; children?: ReactNode }) {
  const [status, setStatus] = useState<Status>("pending");

  useEffect(() => {
    const mq = window.matchMedia(media);
    const update = () => {
      if (!mq.matches) setStatus("off");
      else setStatus((s) => (s === "fallback" ? s : canUseWebGL() ? "3d" : "fallback"));
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [media]);

  if (status === "pending" || status === "off") return null;
  if (status === "fallback") return <SculptureFallback />;

  return (
    <SculptureBoundary fallback={<SculptureFallback />}>
      <Suspense fallback={null}>
        <HeroSculpture onContextLost={() => setStatus("fallback")} />
      </Suspense>
      {children}
    </SculptureBoundary>
  );
}
