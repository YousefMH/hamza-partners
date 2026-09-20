export interface TeamMember {
  id: string
  name: string
  position: string
  expertise: string
  image: string
  linkedin: string
}

// PLACEHOLDER — replace with real lawyer profiles
export const team: TeamMember[] = [
  {
    id: '1',
    name: 'اسم المحامي',
    position: 'شريك',
    expertise: 'متخصص في قانون الشركات والمعاملات التجارية',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    id: '2',
    name: 'اسم المحامي',
    position: 'شريك',
    expertise: 'متخصص في قانون الشركات والمعاملات التجارية',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    id: '3',
    name: 'اسم المحامي',
    position: 'شريك',
    expertise: 'متخصص في قانون الشركات والمعاملات التجارية',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/',
  },
]
