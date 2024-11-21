export interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  userPlan: 'basic' | 'premium';  
}

  