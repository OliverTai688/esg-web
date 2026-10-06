import QRCode from "qrcode"
import { site } from "@/lib/site"

// Real QR code for the official LINE account, rendered to inline SVG at build time.
export async function LineQr({ className, label }: { className?: string; label: string }) {
  const svg = await QRCode.toString(site.line.url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#1F2022", light: "#FFFFFF" },
  })
  return (
    <div
      role="img"
      aria-label={label}
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
