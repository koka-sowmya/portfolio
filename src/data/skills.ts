export interface Skill { id: string; title: string; subtitle: string; description: string; accent: string; icon: string }
// Accent colours come from the palette. Descriptions avoid proficiency claims on purpose.
export const skills: Skill[] = [
  { id: 'cyber', title: 'Cybersecurity fundamentals', subtitle: 'Security & cryptography', accent: '#C599B6', icon: 'shield',
    description: 'Foundations of security and cryptography, learned through Girls Who Code courses.' },
  { id: 'c', title: 'C Programming', subtitle: 'Systems basics', accent: '#E6B2BA', icon: 'terminal',
    description: 'Core programming concepts and low-level thinking in C.' },
  { id: 'html', title: 'HTML', subtitle: 'Structure', accent: '#FAD0C4', icon: 'layout',
    description: 'Semantic markup for building the structure of web pages.' },
  { id: 'css', title: 'CSS', subtitle: 'Styling', accent: '#C599B6', icon: 'palette',
    description: 'Styling and layout for clean, responsive interfaces.' },
  { id: 'python', title: 'Python', subtitle: 'Scripting & analysis', accent: '#E6B2BA', icon: 'code',
    description: 'Used for data analysis and machine learning in my research paper.' },
  { id: 'js', title: 'JavaScript fundamentals', subtitle: 'Web interactivity', accent: '#FAD0C4', icon: 'braces',
    description: 'Fundamentals of scripting behaviour for the web.' },
];
