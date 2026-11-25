import { LuHouse, LuUser, LuSparkles, LuFolderKanban, LuAward, LuBookOpen, LuMail, LuShieldCheck, LuTerminal,
  LuLayoutTemplate, LuPalette, LuCode, LuBraces, LuArrowUpRight, LuArrowRight, LuArrowLeft, LuCopy, LuCheck,
  LuX, LuDownload, LuGithub, LuLinkedin, LuChevronDown } from 'react-icons/lu';
import type { ComponentType } from 'react';

// All icons are Lucide icons (via react-icons/lu). Add new ones here, then reference by key.
export const icons: Record<string, ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>> = {
  home: LuHouse, user: LuUser, sparkles: LuSparkles, folder: LuFolderKanban, award: LuAward, book: LuBookOpen, mail: LuMail,
  shield: LuShieldCheck, terminal: LuTerminal, layout: LuLayoutTemplate, palette: LuPalette, code: LuCode, braces: LuBraces,
  arrowUpRight: LuArrowUpRight, arrowRight: LuArrowRight, arrowLeft: LuArrowLeft, copy: LuCopy, check: LuCheck, x: LuX,
  download: LuDownload, github: LuGithub, linkedin: LuLinkedin, down: LuChevronDown,
};
export function Icon({ name, size = 18, className }: { name: string; size?: number; className?: string }) {
  const C = icons[name]; return C ? <C size={size} className={className} aria-hidden /> : null;
}
