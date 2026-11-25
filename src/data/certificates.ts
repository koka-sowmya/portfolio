export interface Certificate {
  id: string; title: string; issuer: string; course: string;
  date?: string; // not visible on the supplied certificates, so left undefined
  image: string; pdf: string; signedBy: string;
}
export const certificates: Certificate[] = [
  { id: 'cybersecurity', title: 'Intro to Cybersecurity', issuer: 'Girls Who Code', course: 'Girls Who Code — Cybersecurity',
    image: '/certificates/cybersecurity.png', pdf: '/certificates/cybersecurity.pdf', signedBy: 'Tarika Barrett, Chief Executive Officer' },
  { id: 'cryptography', title: 'Intro to Cryptography', issuer: 'Girls Who Code', course: 'Girls Who Code — Cryptography',
    image: '/certificates/cryptography.png', pdf: '/certificates/cryptography.pdf', signedBy: 'Tarika Barrett, Chief Executive Officer' },
];
