import { encryptWithPassword } from './passwordEncryption';
import { DiscreetAppointment } from '../types';

export const generateOfflineEncryptedViewer = async (appointments: DiscreetAppointment[], password: string) => {
  const jsonData = JSON.stringify(appointments);
  const encryptedPayload = await encryptWithPassword(jsonData, password);

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendrier de Suivi - Archive Sécurisée</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #F8F7F2;
      color: #3E3B39;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 600px;
      width: 100%;
      border: 1px solid #E5E2D9;
    }
    h1 {
      font-size: 20px;
      margin-top: 0;
      color: #5A5A40;
    }
    .input-group {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    input[type="password"] {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #CED6C1;
      font-size: 16px;
    }
    button {
      padding: 12px;
      border-radius: 8px;
      background-color: #8A9A5B;
      color: white;
      border: none;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
    button:hover {
      background-color: #78884d;
    }
    .error {
      color: #A64D4D;
      font-size: 14px;
      margin-top: 10px;
      display: none;
    }
    #content {
      display: none;
      margin-top: 20px;
    }
    .appointment {
      border: 1px solid #E5E2D9;
      padding: 15px;
      border-radius: 12px;
      margin-bottom: 12px;
      background-color: #F8F7F2;
    }
    .appointment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .time {
      font-size: 14px;
      color: #8E8B82;
      font-weight: 600;
    }
    .details {
      font-size: 14px;
      color: #5A5A40;
    }
    .status {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
      background-color: #E5EAD9;
      color: #5A5A40;
      margin-top: 10px;
    }
  </style>
</head>
<body>

<div class="container" id="auth-container">
  <h1>🔒 Calendrier de Suivi Sécurisé</h1>
  <p style="font-size: 14px; color: #8E8B82;">Cette archive est cryptée. Entrez votre mot de passe pour consulter vos rendez-vous hors ligne.</p>
  <div class="input-group">
    <input type="password" id="pwd" placeholder="Mot de passe" />
    <button onclick="decrypt()">Déverrouiller</button>
  </div>
  <p class="error" id="error-msg">Mot de passe incorrect ou archive corrompue.</p>
</div>

<div class="container" id="content">
  <h1>📅 Vos Rendez-vous</h1>
  <div id="appointments-list"></div>
  <button onclick="lock()" style="margin-top: 20px; background-color: #A64D4D;">Re-verrouiller</button>
</div>

<script>
  const payloadStr = '${encryptedPayload}';
  
  async function decryptWithPassword(encryptedJson, password) {
    const payload = JSON.parse(encryptedJson);
    const salt = Uint8Array.from(window.atob(payload.s), c => c.charCodeAt(0));
    const iv = Uint8Array.from(window.atob(payload.i), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(window.atob(payload.c), c => c.charCodeAt(0));

    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']
    );

    const key = await window.crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
      keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv }, key, ciphertext
    );

    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }

  async function decrypt() {
    const pwd = document.getElementById('pwd').value;
    if(!pwd) return;
    
    try {
      const decryptedJson = await decryptWithPassword(payloadStr, pwd);
      const appointments = JSON.parse(decryptedJson);
      renderAppointments(appointments);
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      document.getElementById('error-msg').style.display = 'none';
      document.getElementById('pwd').value = '';
    } catch(e) {
      document.getElementById('error-msg').style.display = 'block';
    }
  }

  function lock() {
    document.getElementById('appointments-list').innerHTML = '';
    document.getElementById('content').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
  }

  function renderAppointments(appointments) {
    const list = document.getElementById('appointments-list');
    list.innerHTML = '';
    
    if(appointments.length === 0) {
      list.innerHTML = '<p>Aucun rendez-vous planifié.</p>';
      return;
    }

    // Trier par date
    appointments.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));

    appointments.forEach(apt => {
      const div = document.createElement('div');
      div.className = 'appointment';
      
      const dateObj = new Date(apt.date);
      const dateStr = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      
      div.innerHTML = \`
        <div class="appointment-header">
          <div class="title">\${apt.discreetTitle}</div>
          <div class="time">\${dateStr} à \${apt.time}</div>
        </div>
        <div class="details">Avec : \${apt.professionalName} (\${apt.role})</div>
        <div class="status">\${apt.status === 'CONFIRMED' ? 'Confirmé' : apt.status}</div>
      \`;
      list.appendChild(div);
    });
  }
</script>

</body>
</html>
  `;
  return htmlTemplate;
};
