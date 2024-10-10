import type { ReceiveOptions, SendOptions } from './type';

export const stunServers: string[] = [
  'stun:stun.l.google.com:19302',
  'stun:stun.l.google.com:19305',
  'stun:stun4.l.google.com:19302',
  'stun:stun4.l.google.com:19305',
  'stun:stun.sipgate.net:3478',
  'stun:stun.sipgate.net:10000',
  'stun.nextcloud.com:3478',
  'stun.nextcloud.com:443',
  'stun:stun.myvoipapp.com:3478',
  'stun:stun.voipstunt.com:3478'
];

export const pageDescription = 'A secure client-side P2P connection offering features like file sharing and live clipboard.';

export const githubLink = 'https://github.com/sunnydanu/peer-share';

export const defaultSendOptions: SendOptions = {
  chunkSize: 16 * 1024,
  isEncrypt: false,
  iceServer: stunServers[0]
};

export const defaultReceiveOptions: ReceiveOptions = {
  autoAccept: false,
  maxSize: 1024 * 1024 * 1024 // 1GB
};

export const waitIceCandidatesTimeout = 3000; // 3 seconds
