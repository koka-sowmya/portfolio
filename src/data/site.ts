// Central site settings. Edit here to update the name, email and social links.
export const site = {
  name: 'Koka Sowmya',
  college: 'Anurag University',
  email: 'kokasowmya131work@gmail.com',
  // Set a real URL to show the link on the Contact page and footer. Leave null to hide it.
  socials: { github: null as string | null, linkedin: null as string | null },
  // Auto-detected at build time: put your photo at public/images/profile.jpg (or .jpeg/.png/.webp) and rebuild.
  profileImage: __PROFILE_IMAGE__,
};
export const nav = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'About', to: '/about', icon: 'user' },
  { label: 'Skills', to: '/skills', icon: 'sparkles' },
  { label: 'Projects', to: '/projects', icon: 'folder' },
  { label: 'Certificates', to: '/certificates', icon: 'award' },
  { label: 'Blogs', to: '/blogs', icon: 'book' },
  { label: 'Contact', to: '/contact', icon: 'mail' },
] as const;
