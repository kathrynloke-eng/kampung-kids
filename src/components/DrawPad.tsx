"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";

const COLORS = ["#134e4a", "#ea580c", "#0284c7", "#be123c", "#ca8a04", "#ffffff"];

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
  const [brush, setBrush] = useState(6);

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
          }}
          onPointerMove={(e) => {
            if (!drawing.current || !last.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;
            const next = pointFromEvent(e);
            ctx.strokeStyle = color;
            ctx.lineWidth = brush;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();
            ctx.moveTo(last.current.x, last.current.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
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
      <div className="flex flex-wrap items-center gap-2">
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
          onClick={() => setBrush((b) => (b === 6 ? 12 : 6))}
          className="rounded-full bg-teal-100 px-3 py-2 text-xs font-extrabold text-teal-900"
        >
          {brush === 6 ? "✏️" : "🖌️"}
        </button>
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
