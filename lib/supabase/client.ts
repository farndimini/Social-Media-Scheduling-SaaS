// بيانات المستخدمين التجريبية
const MOCK_USERS = [
  {
    id: "user-1",
    email: "admin@postscheduler.com",
    password: "admin123",
    user_metadata: { name: "مدير النظام" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "demo@postscheduler.com",
    password: "demo123",
    user_metadata: { name: "حساب تجريبي" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-3",
    email: "test@postscheduler.com",
    password: "test123",
    user_metadata: { name: "حساب اختبار" },
    created_at: new Date().toISOString(),
  },
  {
    id: "user-4",
    email: "user@example.com",
    password: "password",
    user_metadata: { name: "مستخدم عادي" },
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

// Mock query builder that supports all the chaining methods
class MockQueryBuilder {
  private table: string
  private selectColumns = "*"
  private filters: any[] = []
  private orderBy: { column: string; ascending: boolean } | null = null
  private limitCount: number | null = null

  constructor(table: string) {
    this.table = table
  }

  select(columns = "*") {
    this.selectColumns = columns
    return this
  }

  eq(column: string, value: any) {
    this.filters.push({ type: "eq", column, value })
    return this
  }

  in(column: string, values: any[]) {
    this.filters.push({ type: "in", column, values })
    return this
  }

  order(column: string, options: { ascending?: boolean } = {}) {
    this.orderBy = { column, ascending: options.ascending !== false }
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  async single() {
    return { data: null, error: null }
  }

  then(resolve: (value: any) => void, reject?: (reason?: any) => void) {
    const result = { data: [], error: null }
    return Promise.resolve(result).then(resolve, reject)
  }
}

class MockSupabaseClient {
  private listeners: Array<(event: string, session: MockSession | null) => void> = []

  auth = {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      console.log("🔐 محاولة تسجيل الدخول بالإيميل:", email)
      console.log("🔐 كلمة المرور المدخلة:", password)

      // تأخير بسيط لمحاكاة الشبكة
      await new Promise((resolve) => setTimeout(resolve, 500))

      // البحث عن المستخدم
      const user = MOCK_USERS.find((u) => {
        console.log(`🔍 مقارنة: ${u.email} === ${email} && ${u.password} === ${password}`)
        return u.email.toLowerCase() === email.toLowerCase() && u.password === password
      })

      if (!user) {
        console.log("❌ فشل تسجيل الدخول: بيانات غير صحيحة")
        console.log("📋 المستخدمون المتاحون:")
        MOCK_USERS.forEach((u) => console.log(`   - ${u.email} : ${u.password}`))
        return {
          data: { user: null, session: null },
          error: { message: "الإيميل أو كلمة المرور غير صحيحة" },
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
        expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 ساعة
      }

      // حفظ الجلسة
      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        console.log("✅ تم حفظ الجلسة بنجاح")
      }

      // إشعار المستمعين
      this.listeners.forEach((listener) => listener("SIGNED_IN", session))

      console.log("✅ تم تسجيل الدخول بنجاح للمستخدم:", user.email)
      return {
        data: { user: session.user, session },
        error: null,
      }
    },

    signUp: async ({ email, password }: { email: string; password: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const existingUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (existingUser) {
        return {
          data: { user: null, session: null },
          error: { message: "المستخدم موجود بالفعل" },
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
        console.log("❌ لا توجد جلسة محفوظة")
        return { data: { session: null }, error: null }
      }

      try {
        const session: MockSession = JSON.parse(storedSession)

        if (Date.now() > session.expires_at) {
          localStorage.removeItem(SESSION_KEY)
          console.log("❌ انتهت صلاحية الجلسة")
          return { data: { session: null }, error: null }
        }

        console.log("✅ تم العثور على جلسة صالحة")
        return { data: { session }, error: null }
      } catch {
        localStorage.removeItem(SESSION_KEY)
        console.log("❌ خطأ في قراءة الجلسة")
        return { data: { session: null }, error: null }
      }
    },

    signOut: async () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY)
        console.log("✅ تم تسجيل الخروج")
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

  from(table: string) {
    return new MockQueryBuilder(table)
  }
}

let mockClient: MockSupabaseClient | null = null

export function createClient() {
  if (!mockClient) {
    mockClient = new MockSupabaseClient()
  }
  return mockClient
}
