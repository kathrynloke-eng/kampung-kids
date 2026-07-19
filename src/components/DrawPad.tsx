"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";

const COLORS = [
  "#1f2937", "#134e4a", "#0f766e", "#0284c7", "#4338ca", "#7e22ce",
  "#be123c", "#ea580c", "#f59e0b", "#ca8a04", "#65a30d", "#16a34a",
  "#ec4899", "#92400e", "#ffffff", "#94a3b8",
];

const DRAWING_TOOLS = {
  pencil: { icon: "✏️", width: 3, alpha: 0.9 },
  coloredPencil: { icon: "🖍️", width: 5, alpha: 0.72 },
  marker: { icon: "🖊️", width: 12, alpha: 0.7 },
  crayon: { icon: "🖍", width: 9, alpha: 0.52 },
} as const;

type DrawingTool = keyof typeof DRAWING_TOOLS;

export function DrawPad({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [tool, setTool] = useState<DrawingTool>("pencil");

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ratio = window.devicePixelRatio || 1;
    const width = parent.clientWidth;
    const height = Math.max(240, Math.round(width * 0.72));
    const prev = canvas.toDataURL("image/png");
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = "#fff7ed";
    ctx.fillRect(0, 0, width, height);
    if (value || prev) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
      };
      img.src = value || prev;
    }
  }, [value]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
    // intentionally only on mount / size changes — avoid wiping strokes on every value update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const commit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/jpeg", 0.72));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.fillStyle = "#fff7ed";
    ctx.fillRect(0, 0, width, height);
    onChange("");
  };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => {
    const style = DRAWING_TOOLS[tool];
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = style.width;
    ctx.globalAlpha = style.alpha;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash(tool === "crayon" ? [1, 2] : []);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  };

  const toolLabel = (nextTool: DrawingTool) => {
    const labels: Record<DrawingTool, string> = {
      pencil: t("drawToolPencil"),
      coloredPencil: t("drawToolColoredPencil"),
      marker: t("drawToolMarker"),
      crayon: t("drawToolCrayon"),
    };
    return labels[nextTool];
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-extrabold text-teal-900">{t("drawHint")}</p>
      <div className="overflow-hidden rounded-[1.5rem] border-2 border-dashed border-orange-300 bg-orange-50/40">
        <canvas
          ref={canvasRef}
          className="touch-none w-full cursor-crosshair"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            last.current = pointFromEvent(e);
            const ctx = canvasRef.current?.getContext("2d");
            if (ctx && last.current) drawLine(ctx, last.current, last.current);
          }}
          onPointerMove={(e) => {
            if (!drawing.current || !last.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;
            const next = pointFromEvent(e);
            drawLine(ctx, last.current, next);
            last.current = next;
          }}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
            commit();
          }}
          onPointerCancel={() => {
            drawing.current = false;
            last.current = null;
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2" aria-label={t("drawTools")}>
        {(Object.keys(DRAWING_TOOLS) as DrawingTool[]).map((nextTool) => (
          <button
            key={nextTool}
            type="button"
            onClick={() => setTool(nextTool)}
            aria-pressed={tool === nextTool}
            className={`rounded-xl px-3 py-2 text-xs font-extrabold transition ${
              tool === nextTool
                ? "bg-teal-700 text-white shadow"
                : "bg-teal-50 text-teal-900"
            }`}
          >
            <span aria-hidden>{DRAWING_TOOLS[nextTool].icon} </span>
            {toolLabel(nextTool)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2" aria-label={t("drawColors")}>
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={c}
            onClick={() => setColor(c)}
            className={`h-9 w-9 rounded-full border-2 ${
              color === c ? "border-teal-800 scale-110" : "border-white"
            }`}
            style={{ background: c, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
          />
        ))}
        <button
          type="button"
          onClick={clear}
          className="ml-auto rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700"
        >
          {t("drawClear")}
        </button>
      </div>
    </div>
  );
}
