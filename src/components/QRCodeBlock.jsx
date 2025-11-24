"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRCodeBlock({ id }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/u/${id}`;

  return (
    <div className="flex flex-col items-center p-6 bg-[#111722] rounded-2xl shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
      <h3 className="text-sm font-medium text-[#C8D3E0]/80 mb-6 uppercase tracking-wide">
        Escanea para compartir
      </h3>
      <div className="p-6 bg-white rounded-xl border border-white/10 shadow-[0_4px_12px_rgba(0,20,40,0.4)]">
        <QRCodeSVG 
          value={url}
          size={200}
          level="H"
          includeMargin={true}
          fgColor="#0A0F16"
        />
      </div>
      <p className="mt-6 text-xs text-[#C8D3E0]/60 text-center max-w-xs break-all font-mono">
        {url}
      </p>
    </div>
  );
}

