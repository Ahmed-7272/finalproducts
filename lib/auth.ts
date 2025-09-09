// Simple authentication system for testing purposes
// In production, this should use a proper database and secure authentication

export interface User {
  email: string;
  password: string;
  subscriptionPlan?: string;
  createdAt: string;
}

export class AuthService {
  private static USERS_KEY = 'callmint_users';
  private static CURRENT_USER_KEY = 'callmint_current_user';

  // Get all users from localStorage
  private static getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  private static saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Validate Gmail format
  private static isValidGmail(email: string): boolean {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

  // Register a new user
  static async register(email: string, password: string, subscriptionPlan?: string): Promise<{ success: boolean; message: string }> {
    try {
      // Validate Gmail format
      if (!this.isValidGmail(email)) {
        return { success: false, message: 'Please use a valid Gmail address' };
      }

      const users = this.getUsers();
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return { success: false, message: 'User already exists with this email' };
      }

      // Create new user
      const newUser: User = {
        email,
        password, // In production, this should be hashed
        subscriptionPlan,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      this.saveUsers(users);

      return { success: true, message: 'Account created successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to create account' };
    }
  }

  // Login user
  static async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Validate Gmail format
      if (!this.isValidGmail(email)) {
        return { success: false, message: 'Please use a valid Gmail address' };
      }

      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Set current user
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        // Set auth cookie for middleware
        document.cookie = `auth-token=${user.email}; path=/; max-age=86400`; // 24 hours
      }

      return { success: true, message: 'Login successful', user };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  }

  // Get current logged in user
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Logout user
  static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.CURRENT_USER_KEY);
    // Remove auth cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  // Initialize demo users for testing
  static initializeDemoUsers(): void {
    const users = this.getUsers();
    
    // Only create demo users if no users exist
    if (users.length === 0) {
      const demoUsers: User[] = [
        {
          email: 'demo@gmail.com',
          password: 'demo123',
          subscriptionPlan: 'Starter',
          createdAt: new Date().toISOString()
        },
        {
          email: 'test@gmail.com',
          password: 'test123',
          subscriptionPlan: 'Business',
          createdAt: new Date().toISOString()
        },
        {
          email: 'admin@gmail.com',
          password: 'admin123',
          subscriptionPlan: 'Enterprise',
          createdAt: new Date().toISOString()
        }
      ];
      
      this.saveUsers(demoUsers);
    }
  }

  // Update user subscription plan
  static updateUserSubscription(email: string, subscriptionPlan: string): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
      users[userIndex].subscriptionPlan = subscriptionPlan;
      this.saveUsers(users);
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.email === email) {
        currentUser.subscriptionPlan = subscriptionPlan;
        if (typeof window !== 'undefined') {
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
        }
      }
    }
  }
}