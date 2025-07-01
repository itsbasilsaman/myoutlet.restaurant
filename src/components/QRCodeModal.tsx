'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  onClose: () => void;
  domain: string;
};

export default function QRCodeModal({ onClose, domain }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const qrValue = domain.startsWith('http') ? domain : `https://${domain}`;

  useEffect(() => {
    if (containerRef.current) {
      const svg = containerRef.current.querySelector('svg');
      if (svg instanceof SVGSVGElement) {
        svgRef.current = svg;
      }
    }
  }, []);

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'store-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-[320px] relative text-center shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-1">Store QR code</h2>
        <p className="text-sm text-gray-500 mb-4">Downloadable QR code for your store</p>

        <div
          ref={containerRef}
          className="bg-white p-3 rounded-lg border inline-block mx-auto"
        >
          <QRCode value={qrValue} size={256} />
        </div>

        <Button
          onClick={handleDownload}
          className="mt-4 flex items-center justify-center gap-2 text-green-600 hover:text-green-800 bg-transparent border-none"
          variant="ghost"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
