// Simple mock authentication system
const MOCK_USERS = [
  {
    id: "user-1",
    email: "admin@postscheduler.com",
    password: "admin123",
    user_metadata: { name: "Admin User" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "demo@postscheduler.com",
    password: "demo123",
    user_metadata: { name: "Demo User" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-3",
    email: "test@postscheduler.com",
    password: "test123",
    user_metadata: { name: "Test User" },
    created_at: new Date().toISOString(),
  },
]

const SESSION_KEY = "postscheduler-session"

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
      console.log("Attempting login with:", email)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!user) {
        console.log("Login failed: Invalid credentials")
        return {
          data: { user: null, session: null },
          error: { message: "Invalid email or password" },
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
        expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }

      // Store session
      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        console.log("Session stored successfully")
      }

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_IN", session))

      console.log("Login successful for:", user.email)
      return {
        data: { user: session.user, session },
        error: null,
      }
    },

    signUp: async ({ email, password }: { email: string; password: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const existingUser = MOCK_USERS.find((u) => u.email === email)
      if (existingUser) {
        return {
          data: { user: null, session: null },
          error: { message: "User already exists" },
        }
      }

      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password,
        user_metadata: { name: email.split("@")[0] },
        created_at: new Date().toISOString(),
      }

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
        expires_at: Date.now() + 24 * 60 * 60 * 1000,
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      }

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
        console.log("User signed out")
      }

      this.listeners.forEach((listener) => listener("SIGNED_OUT", null))
      return { error: null }
    },

    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => {
      this.listeners.push(callback)

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

  // Mock database methods
  from = () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  })
}

let mockClient: MockSupabaseClient | null = null

export function createClient() {
  if (!mockClient) {
    mockClient = new MockSupabaseClient()
  }
  return mockClient
}
