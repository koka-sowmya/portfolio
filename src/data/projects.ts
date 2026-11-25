export interface Project {
  slug: string; name: string; tagline: string; team: string; event: string; problemId: string;
  title: string; image: string; summary: string;
  introduction: string; problem: string; solution: string;
  features: { title: string; text: string; planned?: boolean }[];
  how: string[]; diagram?: string; pdf?: string;
  contribution?: string; // Only rendered when provided. Add your role here when ready.
}
// To add another project: append an object here. The Projects menu and /projects/:slug route pick it up automatically.
export const projects: Project[] = [{
  slug: 'anchor', name: 'ANCHOR', tagline: 'Cognitive games & memory assistance for dementia care',
  team: 'Team Neur0 Nex', event: 'Smart India Hackathon 2026', problemId: 'SIH26003',
  title: "AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in India's North Eastern Region",
  image: '/images/anchor-diagram.png', pdf: '/documents/anchor-overview.pdf', diagram: '/images/anchor-diagram.png',
  summary: 'One app combining adaptive cognitive games, a shared caregiver circle, location safety and a family memory bank, built to work well in low-connectivity areas.',
  introduction: 'Most apps today are either pure medical-alert (SOS) apps or pure brain-training games. Anchor combines both — cognitive games, a caregiver support circle, location safety and a family memory bank — in one app, built to work well even in remote, low-connectivity areas.',
  problem: "Elderly dementia patients in India's North Eastern Region need support that keeps the mind active, feels familiar and keeps their families and caregivers connected. Existing apps tend to cover only one side: either emergency alerts or generic brain training.",
  solution: 'Anchor gives the patient short daily activities that exercise memory, attention, focus and recall of their own routine, built from familiar content that caregivers add themselves. A shared care circle, reminders and safety features support the patient and family in the same app.',
  features: [
    { title: 'Adaptive cognitive games', text: 'Short daily activities for memory, attention, focus and recalling a daily routine. Difficulty adjusts automatically: easier if the person struggles, harder if they do well.' },
    { title: 'Familiar, personalised content', text: 'Activities use real family photos, names and relationships, and the patient’s own routine. Game visuals change with the patient’s home region across the North Eastern states.' },
    { title: 'Shared caregiver circle', text: 'Any number of people can join a care circle with an invite code. Everyone sees the same schedule, notes and photos, and an authorised clinic caregiver can be added the same way.' },
    { title: 'Daily support reminders', text: 'Reminders for medicine, drinking water, appointments and activities.' },
    { title: 'Rakshak emergency assistance', text: 'A one-tap button that calls and texts priority emergency contacts with the patient’s live location, and tries the next contact if nobody responds in time.' },
    { title: 'Home-radius safety alerts', text: 'If the patient’s phone leaves a safe zone set around their home, the circle is alerted with their location.' },
    { title: 'Family voice notes', text: 'Family members can record short voice notes that the patient can play back.' },
    { title: 'Family voice guidance', planned: true, text: 'Planned, not built yet: a guide that walks the patient through activities in a family member’s recorded voice. Today the app only supports voice notes.' },
  ],
  how: [
    'A caregiver creates the patient profile and an invite code.',
    'Family, neighbours or clinic staff join the same circle; the patient can also have a linked account.',
    'Everyone in the circle sees the same shared patient profile.',
    'The profile drives four cognitive games, daily support reminders, familiar-world content, the Rakshak button and home-radius alerts.',
    'Results flow into a journey chart, shared circle notes and alerts that reach the whole circle.',
    'Caregivers see everything on their own phones, with no separate calls or updates needed.',
  ],
}];
