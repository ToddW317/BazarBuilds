export type BuildType = 'Aggro' | 'Shield' | 'Health'
export type HeroId = 'pygmalien' | 'vanessa' | 'dooley'

export interface Hero {
  id: HeroId
  name: string
  imageUrl: string
  description: string
}

export interface Build {
  id: string
  title: string
  heroId: HeroId
  buildType: BuildType
  description: string
  screenshots: string[]
  videoClip?: string
  userId: string
  creatorName: string
  createdAt: Date
  updatedAt: Date
  likes: number
  likedBy: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  rating: {
    average: number
    count: number
    total: number
  }
}

export interface BuildFormData {
  title: string
  heroId: string
  buildType: BuildType
  description: string
  difficulty: string
  tags: string[]
}

export interface Comment {
  id: string
  buildId: string
  content: string
  userId: string
  userName: string
  createdAt: Date
  likes: number
  likedBy: string[]
  parentId?: string | null
}

export interface Rating {
  userId: string
  buildId: string
  score: number
  createdAt: Date
}

export interface User {
  id: string
  displayName: string
  email: string
  photoURL?: string
  likedBuilds: string[]
}

export interface Notification {
  id: string;
  userId: string;
  type: 'comment_reply' | 'build_like' | 'comment_like' | 'build_rating';
  read: boolean;
  createdAt: Date;
  data: {
    buildId?: string;
    commentId?: string;
    actorName: string;
    buildTitle?: string;
    rating?: number;
  };
} 