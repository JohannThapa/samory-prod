export type ID = string;

export interface Helper {
  id: ID;
  name: string;
  title: string;
  avatarUrl: string;
  region: string;
  available: boolean;
  yearsExperience: number;
  languages: string[];
  expertise: string[];
  certification?: string;
}

export const helpersMockData: Helper[] = [
  {
    id: '1',
    name: 'Mamadou Bah',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    region: 'Amedia',
    available: true,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'Certified Ethical Hacker',
  },
  {
    id: '2',
    name: 'Roman Wilderman',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    region: 'Conakry',
    available: true,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Ransomware', 'Endpoint Security'],
    certification: 'CISSP',
  },
  {
    id: '3',
    name: 'Nina Hartmann',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=28',
    region: 'South Herta',
    available: true,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'CompTIA Security+',
  },
  {
    id: '4',
    name: 'Ray Crona',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    region: 'Gilbert',
    available: true,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'Certified Ethical Hacker',
  },
  {
    id: '5',
    name: 'Tonya Fritsch',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=45',
    region: 'West Wilson',
    available: false,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'CISSP',
  },
  {
    id: '6',
    name: 'Krystal Yundt',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=48',
    region: 'Providence',
    available: true,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'CompTIA Security+',
  },
  {
    id: '7',
    name: 'Morris Effertz',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=50',
    region: 'Marltown',
    available: false,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'Certified Ethical Hacker',
  },
  {
    id: '8',
    name: 'Christy Killback',
    title: 'Cybersecurity Consultant',
    avatarUrl: 'https://i.pravatar.cc/150?img=53',
    region: 'Nolanton',
    available: true,
    yearsExperience: 4,
    languages: ['French', 'English'],
    expertise: ['Phishing', 'Ransomware', 'Endpoint Security'],
    certification: 'CISSP',
  },
];

export const mockFilterData = {
  availability: ['Available Now', 'Anytime'],
  regions: ['All Regions', 'Amedia', 'Conakry', 'Labe', 'Boké', 'Kindia', 'Kankan'],
  languages: ['English', 'French', 'Spanish', 'German'],
  expertise: ['Phishing', 'Ransomware', 'Malware Analysis', 'Endpoint Security'],
  experience: ['Entry Level', 'Intermediate', 'Expert'],
  certification: ['Certified Ethical Hacker', 'CISSP', 'CompTIA Security+'],
};
