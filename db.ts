
import { User, Lesson, Quiz, Post, SkillExchangeEntry, PortfolioProject, ChatMessage, LessonNote } from './types';

const STORAGE_KEY = 'edumate_data';

interface DB {
  users: User[];
  lessons: Lesson[];
  quizzes: Quiz[];
  posts: Post[];
  skillExchange: SkillExchangeEntry[];
  portfolios: PortfolioProject[];
  chats: ChatMessage[];
  lessonNotes: LessonNote[];
  cbtHistory: {
    id: string;
    userId: string;
    topic: string;
    score: number;
    total: number;
    date: string;
  }[];
}

const INITIAL_DATA: DB = {
  users: [
    {
      id: '1',
      name: 'Guest Learner',
      email: 'guest@example.com',
      password: 'password123',
      role: 'user',
      points: 0,
      streak: 0,
      badges: [],
      rank: 'Beginner',
      completedLessons: [],
      savedLessons: [],
    }
  ],
  lessons: [
    { id: 'l1', title: 'Introduction to React', category: 'Technology', difficulty: 'Beginner', points: 100, content: 'React is a JavaScript library for building user interfaces...' },
    { id: 'l2', title: 'Trading Basics 101', category: 'Trading', difficulty: 'Beginner', points: 150, content: 'Trading involves the exchange of assets in financial markets...' },
    { id: 'l3', title: 'Advanced Quantum Physics', category: 'Science', difficulty: 'Advanced', points: 500, content: 'Quantum mechanics is a fundamental theory in physics...' },
    { id: 'l4', title: 'Digital Marketing Essentials', category: 'Digital Skills', difficulty: 'Intermediate', points: 200, content: 'Learn the core pillars of digital marketing...' },
    { id: 'l5', title: 'Entrepreneurship Mindset', category: 'Life Skills', difficulty: 'Beginner', points: 100, content: 'Developing an entrepreneurial mindset is key to innovation...' }
  ],
  quizzes: [
    {
      id: 'q1',
      lessonId: 'l1',
      questions: [
        {
          question: 'Who developed React?',
          options: ['Google', 'Meta (Facebook)', 'Microsoft', 'Apple'],
          correctAnswer: 1,
          explanation: 'React was created by Jordan Walke at Facebook.'
        }
      ]
    }
  ],
  posts: [
    { id: 'p1', userId: '1', userName: 'Adam Mahmud', title: 'Welcome to EduMate!', content: 'I am excited to start learning with everyone here.', likes: 12, replies: 3, createdAt: new Date().toISOString(), category: 'General' }
  ],
  skillExchange: [
    { id: 's1', userId: '1', userName: 'Adam Mahmud', skillOffered: 'React', skillWanted: 'Piano', description: 'I can help you build your first app if you teach me basics of piano!' }
  ],
  portfolios: [],
  chats: [],
  lessonNotes: [
    // Added missing 'category' property to comply with LessonNote interface definition
    { id: 'n1', userId: '1', userName: 'Adam Mahmud', title: 'React Hooks Guide', content: 'Always use hooks at the top level of your React function...', category: 'Technology', createdAt: new Date().toISOString() }
  ],
  cbtHistory: []
};

export const getDB = (): DB => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return INITIAL_DATA;
  
  try {
    const parsed = JSON.parse(data);
    // Ensure all required keys exist and are arrays to prevent .filter errors
    return {
      users: Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : INITIAL_DATA.users,
      lessons: Array.isArray(parsed.lessons) ? parsed.lessons : INITIAL_DATA.lessons,
      quizzes: Array.isArray(parsed.quizzes) ? parsed.quizzes : INITIAL_DATA.quizzes,
      posts: Array.isArray(parsed.posts) ? parsed.posts : INITIAL_DATA.posts,
      skillExchange: Array.isArray(parsed.skillExchange) ? parsed.skillExchange : INITIAL_DATA.skillExchange,
      portfolios: Array.isArray(parsed.portfolios) ? parsed.portfolios : INITIAL_DATA.portfolios,
      chats: Array.isArray(parsed.chats) ? parsed.chats : INITIAL_DATA.chats,
      lessonNotes: Array.isArray(parsed.lessonNotes) ? parsed.lessonNotes : INITIAL_DATA.lessonNotes,
      cbtHistory: Array.isArray(parsed.cbtHistory) ? parsed.cbtHistory : INITIAL_DATA.cbtHistory,
    };
  } catch (e) {
    console.error("Failed to parse DB, reverting to initial data", e);
    return INITIAL_DATA;
  }
};

export const saveDB = (db: DB) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const getCurrentUser = (): User => {
  const db = getDB();
  const sessionId = localStorage.getItem('edumate_session_id');
  const user = db.users.find(u => u.id === sessionId);
  return user || db.users[0];
};

export const setSessionUser = (userId: string | null) => {
  if (userId) {
    localStorage.setItem('edumate_session_id', userId);
  } else {
    localStorage.removeItem('edumate_session_id');
  }
};
