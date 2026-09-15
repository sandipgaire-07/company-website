export type SocialLink = {
  platform: string;
  url: string;
};

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  profileImage: string;
  biography: string;
  socialLinks: SocialLink[];
  sortOrder: number;
  isActive: boolean;
};
