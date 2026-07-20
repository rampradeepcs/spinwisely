"use client";

import { useEffect } from "react";

/** Globally disables the context menu and image drag-to-save. */
export function NoRightClick() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);
  return null;
}
