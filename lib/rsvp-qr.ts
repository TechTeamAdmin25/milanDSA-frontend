/**
 * RSVP QR Code Generation
 *
 * This module handles the generation of RSVP QR codes for Milan 26' event.
 * The QR code is a static URL that redirects students to the RSVP confirmation page.
 */

export const RSVP_QR_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/rsvp?source=station_qr`
  : 'http://localhost:3000/rsvp?source=station_qr';

/**
 * Generate RSVP QR code data
 * This returns the URL that should be encoded in the QR code
 */
export function generateRSVPQRData(): string {
  console.log('[RSVP QR] Generated RSVP QR URL:', RSVP_QR_URL);
  return RSVP_QR_URL;
}

/**
 * Validate RSVP source
 */
export function isValidRSVPSource(source: string | null): boolean {
  return source === 'station_qr';
}
