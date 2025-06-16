import type { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "user-1",
    email: "demo@example.com",
    password: "password123",
    user_metadata: { name: "Demo User" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "test@example.com",
    password: "test123",
    user_metadata: { name: "Test User" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-3",
    email: "farndimini@gmail.com",
    password: "pass;0600231590m",
    user_metadata: { name: "Farndimini" },
    created_at: new Date().toISOString(),
  },
]

// Mock session storage
const SESSION_KEY = "supabase-mock-session"

interface MockUser {
  id: string
  email: string
  user_metadata: any
  created_at: string
}

interface MockSession {
  user: MockUser
  access_token: string
  refresh_token: string
  expires_at: number
}

class MockSupabaseClient {
  private listeners: Array<(event: string, session: MockSession | null) => void> = []

  auth = {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!user) {
        return {
          data: { user: null, session: null },
          error: { message: "Invalid login credentials" },
        }
      }

      const session: MockSession = {
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
          created_at: user.created_at,
        },
        access_token: `mock-token-${user.id}`,
        refresh_token: `mock-refresh-${user.id}`,
        expires_at: Date.now() + 3600000, // 1 hour
      }

      // Store session in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      }

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_IN", session))

      return {
        data: { user: session.user, session },
        error: null,
      }
    },

    signUp: async ({ email, password }: { email: string; password: string }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === email)
      if (existingUser) {
        return {
          data: { user: null, session: null },
          error: { message: "User already registered" },
        }
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password,
        user_metadata: { name: email.split("@")[0] },
        created_at: new Date().toISOString(),
      }

      // Add to mock users (in real app, this would be saved to database)
      MOCK_USERS.push(newUser)

      const session: MockSession = {
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: newUser.user_metadata,
          created_at: newUser.created_at,
        },
        access_token: `mock-token-${newUser.id}`,
        refresh_token: `mock-refresh-${newUser.id}`,
        expires_at: Date.now() + 3600000, // 1 hour
      }

      // Store session in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      }

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_UP", session))

      return {
        data: { user: session.user, session },
        error: null,
      }
    },

    getSession: async () => {
      if (typeof window === "undefined") {
        return { data: { session: null }, error: null }
      }

      const storedSession = localStorage.getItem(SESSION_KEY)
      if (!storedSession) {
        return { data: { session: null }, error: null }
      }

      try {
        const session: MockSession = JSON.parse(storedSession)

        // Check if session is expired
        if (Date.now() > session.expires_at) {
          localStorage.removeItem(SESSION_KEY)
          return { data: { session: null }, error: null }
        }

        return { data: { session }, error: null }
      } catch {
        localStorage.removeItem(SESSION_KEY)
        return { data: { session: null }, error: null }
      }
    },

    signOut: async () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY)
      }

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_OUT", null))

      return { error: null }
    },

    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => {
      this.listeners.push(callback)

      // Return subscription object
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const index = this.listeners.indexOf(callback)
              if (index > -1) {
                this.listeners.splice(index, 1)
              }
            },
          },
        },
      }
    },
  }

  from = (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: (column: string, options?: any) => ({
          limit: (count: number) => Promise.resolve({ data: [], error: null }),
        }),
      }),
      order: (column: string, options?: any) => ({
        limit: (count: number) => Promise.resolve({ data: [], error: null }),
      }),
    }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
    }),
  })
}

let mockClient: MockSupabaseClient | null = null

// Create a single instance of the supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton client
const supabaseClient: ReturnType<typeof createSupabaseClient<Database>> | null = null

export function createClient() {
  if (typeof window === "undefined") {
    // Server-side: Return a minimal mock for SSR
    return new MockSupabaseClient()
  }

  // Client-side: Create or return the singleton
  if (!mockClient) {
    mockClient = new MockSupabaseClient()
  }

  return mockClient
}
