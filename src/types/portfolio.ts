export type Language = 'bn' | 'en';
export type ThemeMode = 'dark' | 'light';

export type ProjectCategory = 'all' | 'video' | 'design' | 'motion' | 'branding' | 'thumbnails' | 'meta' | 'ai';

export interface Project {
  id: string;
  title: string;
  titleBn: string;
  category: 'video' | 'design' | 'motion' | 'branding' | 'thumbnails' | 'meta' | 'ai';
  categoryLabel: string;
  categoryLabelBn: string;
  client: string;
  duration?: string;
  year: string;
  featured: boolean;
  thumbnail: string;
  videoUrl?: string; // Direct mp4 or youtube embed
  isVideo?: boolean;
  beforeImage?: string; // For before/after color grading or retouching comparison
  afterImage?: string;
  overview: string;
  overviewBn: string;
  challenge?: string;
  challengeBn?: string;
  solution?: string;
  solutionBn?: string;
  metrics?: string; // e.g. "2.4M+ Views", "18% CTR Increase"
  software: string[];
  externalUrl?: string;
}

export interface SoftwareTool {
  name: string;
  role: string;
  roleBn: string;
  level: number; // percentage (e.g. 95)
  category: 'editing' | 'motion' | 'graphics' | 'audio' | '3d';
  tagColor: string;
  icon: string;
}

export interface SkillItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'Core Video' | 'Graphic Design' | 'Motion & VFX' | 'Multidisciplinary';
  categoryBn: string;
  description: string;
  descriptionBn: string;
  items: string[];
  itemsBn: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  description: string;
  descriptionBn: string;
  deliverables: string[];
  deliverablesBn: string[];
  timeline: string;
  timelineBn: string;
  startingRate?: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  contentBn: string;
  projectTag: string;
}

export interface ProfileInfo {
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  headline: string;
  headlineBn: string;
  bio: string;
  bioBn: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationBn: string;
  availability: string;
  availabilityBn: string;
  showreelUrl: string;
  showreelTitle: string;
  showreelDuration: string;
  avatarUrl?: string;
  resumeDownloadUrl?: string;
  stats: {
    experienceYears: string;
    experienceYearsBn?: string;
    projectsCompleted: string;
    projectsCompletedBn?: string;
    viewsGenerated: string;
    viewsGeneratedBn?: string;
    satisfiedClients: string;
    satisfiedClientsBn?: string;
  };
  socials: {
    behance: string;
    youtube: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
    facebook?: string;
    vimeo?: string;
  };
}

export interface RoleCapability {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  points: string[];
  pointsBn: string[];
  tools: string[];
  sampleDeliverables: string[];
  sampleDeliverablesBn: string[];
}

export interface DualRoleAnalysis {
  videoEditor: {
    tagline: string;
    taglineBn: string;
    summary: string;
    summaryBn: string;
    capabilities: RoleCapability[];
    strengths: string[];
    strengthsBn: string[];
  };
  graphicDesigner: {
    tagline: string;
    taglineBn: string;
    summary: string;
    summaryBn: string;
    capabilities: RoleCapability[];
    strengths: string[];
    strengthsBn: string[];
  };
  learningJourney: {
    title: string;
    titleBn: string;
    description: string;
    descriptionBn: string;
    inProgressSkills: {
      name: string;
      nameBn: string;
      progress: number;
      focus: string;
      focusBn: string;
    }[];
  };
}

export interface PortfolioData {
  profile: ProfileInfo;
  roleAnalysis?: DualRoleAnalysis;
  projects: Project[];
  tools: SoftwareTool[];
  skills: SkillItem[];
  services: ServiceItem[];
  testimonials: Testimonial[];
}
