"use client";

import { useEffect, useState } from "react";

/**
 * True only on devices with a precise pointer and no reduced-motion request.
 * Gate every hover/parallax flourish on this — touch devices get nothing to
 * hover, and pointer tracking there is wasted work.
 *
 * Returns `false` on the server and on first paint, then settles after mount,
 * so it must never drive markup that is server-rendered — only behaviour.
 */
export function useDesktopPointer(): boolean {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setOk(fine.matches && !still.matches);
    sync();

    fine.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  return ok;
}

/** Standalone reduced-motion read, settled after mount. */
export function useStillness(): boolean {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return still;
}
