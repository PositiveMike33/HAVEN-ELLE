export const encryptWithPassword = async (text: string, password: string): Promise<string> => {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(text)
  );

  const encryptedArray = Array.from(new Uint8Array(encrypted));
  const saltArray = Array.from(salt);
  const ivArray = Array.from(iv);

  const payload = {
    s: window.btoa(String.fromCharCode(...saltArray)),
    i: window.btoa(String.fromCharCode(...ivArray)),
    c: window.btoa(String.fromCharCode(...encryptedArray))
  };

  return JSON.stringify(payload);
};

export const decryptWithPassword = async (encryptedJson: string, password: string): Promise<string> => {
  const payload = JSON.parse(encryptedJson);
  const salt = Uint8Array.from(window.atob(payload.s), c => c.charCodeAt(0));
  const iv = Uint8Array.from(window.atob(payload.i), c => c.charCodeAt(0));
  const ciphertext = Uint8Array.from(window.atob(payload.c), c => c.charCodeAt(0));

  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
};
