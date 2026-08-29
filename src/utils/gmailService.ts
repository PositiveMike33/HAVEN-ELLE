import { getAccessToken } from './auth';
import { TrustedContact, IncidentRecord } from '../types';

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  unread?: boolean;
}

export interface GmailMessageFull extends GmailMessageSummary {
  bodyHtml?: string;
  bodyText?: string;
}

/**
 * Encode a string to base64url format for Gmail API
 */
function base64UrlEncode(str: string): string {
  // Use utf-8 encoding safely in browser
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * List messages with optional search query (e.g. "is:unread", "from:support", etc.)
 */
export async function listGmailMessages(query?: string, maxResults: number = 15): Promise<GmailMessageSummary[]> {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentification Google requise pour accéder à Gmail.');

  const params = new URLSearchParams();
  params.set('maxResults', maxResults.toString());
  if (query) {
    params.set('q', query);
  }

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Erreur lors de la récupération des courriels (${res.status})`);
  }

  const data = await res.json();
  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }

  // Fetch summaries in parallel (with limit)
  const summaries = await Promise.all(
    data.messages.slice(0, maxResults).map(async (msg: { id: string; threadId: string }) => {
      try {
        const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!detailRes.ok) return { id: msg.id, threadId: msg.threadId };
        const detail = await detailRes.json();
        
        const headers = detail.payload?.headers || [];
        const subject = headers.find((h: any) => h.name?.toLowerCase() === 'subject')?.value || '(Sans objet)';
        const from = headers.find((h: any) => h.name?.toLowerCase() === 'from')?.value || 'Inconnu';
        const to = headers.find((h: any) => h.name?.toLowerCase() === 'to')?.value || '';
        const date = headers.find((h: any) => h.name?.toLowerCase() === 'date')?.value || '';
        const unread = (detail.labelIds || []).includes('UNREAD');

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: detail.snippet,
          subject,
          from,
          to,
          date,
          unread,
        };
      } catch {
        return { id: msg.id, threadId: msg.threadId };
      }
    })
  );

  return summaries;
}

/**
 * Get full email details
 */
export async function getGmailMessageDetails(messageId: string): Promise<GmailMessageFull> {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentification Google requise pour lire ce message.');

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Impossible de charger le contenu du message.');
  }

  const detail = await res.json();
  const headers = detail.payload?.headers || [];
  const subject = headers.find((h: any) => h.name?.toLowerCase() === 'subject')?.value || '(Sans objet)';
  const from = headers.find((h: any) => h.name?.toLowerCase() === 'from')?.value || 'Inconnu';
  const to = headers.find((h: any) => h.name?.toLowerCase() === 'to')?.value || '';
  const date = headers.find((h: any) => h.name?.toLowerCase() === 'date')?.value || '';
  const unread = (detail.labelIds || []).includes('UNREAD');

  let bodyText = detail.snippet || '';
  let bodyHtml = '';

  const extractBody = (part: any) => {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      try {
        bodyText = decodeURIComponent(escape(atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
      } catch {
        bodyText = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      try {
        bodyHtml = decodeURIComponent(escape(atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
      } catch {
        bodyHtml = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }
    }
    if (part.parts && Array.isArray(part.parts)) {
      part.parts.forEach(extractBody);
    }
  };

  if (detail.payload) {
    extractBody(detail.payload);
  }

  return {
    id: detail.id,
    threadId: detail.threadId,
    snippet: detail.snippet,
    subject,
    from,
    to,
    date,
    unread,
    bodyText,
    bodyHtml: bodyHtml || bodyText,
  };
}

/**
 * Send an email via Gmail API
 */
export async function sendGmailMessage(to: string, subject: string, bodyText: string, htmlBody?: string): Promise<{ id: string; threadId: string }> {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentification Google requise pour envoyer un e-mail.');

  const cleanHtml = htmlBody || bodyText.replace(/\n/g, '<br/>');

  const emailLines = [
    `To: ${to}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    cleanHtml,
  ];

  const rawMessage = emailLines.join('\r\n');
  const encodedMessage = base64UrlEncode(rawMessage);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: encodedMessage }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Échec de l'envoi de l'e-mail (${res.status})`);
  }

  return res.json();
}

/**
 * Delete an email message from Gmail (Requires explicit user confirmation before call)
 */
export async function deleteGmailMessage(messageId: string): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentification Google requise.');

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Échec de la suppression du message (${res.status})`);
  }

  return true;
}

/**
 * Send a secure SOS email to a trusted contact
 */
export async function sendEmergencySosEmail(
  contact: TrustedContact,
  location?: { lat: number; lng: number } | null,
  customNote?: string
): Promise<{ success: boolean; contactName: string; error?: string }> {
  if (!contact.email) {
    return { success: false, contactName: contact.name, error: "Ce contact n'a pas d'adresse e-mail renseignée." };
  }

  const timestamp = new Date().toLocaleString('fr-FR', { timeZone: 'America/Toronto' });
  const mapLink = location ? `https://www.google.com/maps?q=${location.lat},${location.lng}` : null;

  const subject = `[ALERTE HAVEN-ELLE] Message d'assistance prioritaire de ${contact.name ? 'votre proche' : 'votre contact'}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #E11D48; border-radius: 12px; background-color: #FFF5F5;">
      <h2 style="color: #BE123C; margin-top: 0;">🚨 Alerte de Sécurité Immédiate</h2>
      <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
        Ce message est une alerte automatique générée depuis l'application de protection <strong>HAVEN-ELLE</strong>.
      </p>
      
      <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; border-left: 4px solid #E11D48; margin: 16px 0;">
        <p style="margin: 0; font-weight: bold; color: #111827;">Heure du déclenchement :</p>
        <p style="margin: 4px 0 12px 0; color: #4B5563;">${timestamp}</p>
        
        ${location ? `
          <p style="margin: 0; font-weight: bold; color: #111827;">📍 Position Géographique approximative :</p>
          <p style="margin: 4px 0 12px 0;"><a href="${mapLink}" style="color: #2563EB; font-weight: bold; text-decoration: underline;">Voir la localisation sur Google Maps</a> (${location.lat.toFixed(5)}, ${location.lng.toFixed(5)})</p>
        ` : '<p style="color: #6B7280; font-style: italic;">Localisation GPS non activée au moment de l\'alerte.</p>'}

        ${customNote ? `
          <p style="margin: 12px 0 0 0; font-weight: bold; color: #111827;">Note d'urgence :</p>
          <p style="margin: 4px 0 0 0; color: #374151; background-color: #F3F4F6; padding: 10px; border-radius: 6px;">${customNote}</p>
        ` : ''}
      </div>

      <p style="font-size: 14px; color: #4B5563; line-height: 1.5;">
        Si vous ne parvenez pas à joindre votre proche, veuillez contacter les services de secours : 
        <strong>911</strong> (Urgences), <strong>988</strong> (Prévention détresse) ou <strong>1 800 363-9010</strong> (SOS Violence Conjugale).
      </p>
      
      <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;" />
      <p style="font-size: 11px; color: #9CA3AF; text-align: center;">
        Message d'alerte sécurisé émis via HAVEN-ELLE • Passerelle Gmail Sécurisée
      </p>
    </div>
  `;

  try {
    await sendGmailMessage(contact.email, subject, `Alerte de sécurité transmise le ${timestamp}.`, htmlContent);
    return { success: true, contactName: contact.name };
  } catch (err: any) {
    return { success: false, contactName: contact.name, error: err.message || 'Erreur inconnue' };
  }
}

/**
 * Send encrypted justice dossier evidence summary to legal counsel / trusted email
 */
export async function sendEvidenceDossierEmail(
  recipientEmail: string,
  recipientName: string,
  incidents: IncidentRecord[],
  personalNote?: string
): Promise<{ success: boolean; error?: string }> {
  const timestamp = new Date().toLocaleDateString('fr-FR');
  const subject = `[HAVEN-ELLE • Dossier Confidentiel] Chronologie des Événements & Preuves (${timestamp})`;

  const incidentsHtml = incidents.length === 0
    ? '<p style="color: #6B7280; font-style: italic;">Aucun incident consigné actuellement.</p>'
    : incidents.map((inc, i) => `
        <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: #111827; font-size: 15px;">#${i + 1} - Type: ${inc.type.toUpperCase()} (Gravité: ${inc.severity}/5)</strong>
            <span style="background-color: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${inc.date} à ${inc.time || 'N/D'}</span>
          </div>
          <p style="color: #4B5563; font-size: 14px; margin: 6px 0;"><strong>Lieu :</strong> ${inc.location || 'Non spécifié'}</p>
          <p style="color: #374151; font-size: 14px; margin: 6px 0; line-height: 1.5;">${inc.description || 'Pas de description détaillée.'}</p>
          ${inc.witnesses ? `<p style="color: #6B7280; font-size: 13px; margin: 4px 0;"><strong>Témoins :</strong> ${inc.witnesses}</p>` : ''}
          ${inc.hasReportedToPolice ? `<p style="color: #15803D; font-size: 13px; margin: 4px 0;"><strong>Signalé à la police :</strong> Oui</p>` : ''}
        </div>
      `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #D1D5DB; border-radius: 12px; background-color: #F9FAFB;">
      <h2 style="color: #1E293B; margin-top: 0;">🛡️ Transmission de Dossier de Preuves & Chronologie</h2>
      <p style="color: #4B5563; font-size: 14px;">
        Destinataire : <strong>${recipientName || recipientEmail}</strong><br/>
        Date de transmission : ${timestamp}
      </p>

      ${personalNote ? `
        <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 12px; margin: 16px 0; border-radius: 6px;">
          <p style="margin: 0; font-weight: bold; color: #1E40AF; font-size: 13px;">Message d'accompagnement :</p>
          <p style="margin: 4px 0 0 0; color: #1E3A8A; font-size: 14px;">${personalNote}</p>
        </div>
      ` : ''}

      <h3 style="color: #334155; margin-top: 20px; font-size: 16px;">Relevé des Incidents Enregistrés (${incidents.length})</h3>
      ${incidentsHtml}

      <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0 16px 0;" />
      <p style="font-size: 11px; color: #9CA3AF; text-align: center;">
        Ce document a été constitué et transmis de façon souveraine via HAVEN-ELLE.
      </p>
    </div>
  `;

  try {
    await sendGmailMessage(recipientEmail, subject, `Dossier d'incidents transmis le ${timestamp}.`, htmlContent);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erreur lors de la transmission.' };
  }
}
