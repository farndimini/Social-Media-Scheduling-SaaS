// Simplified server client for mock environment
class MockServerSupabaseClient {
  auth = {
    getSession: async () => {
      return { data: { session: null }, error: null }
    },
    getUser: async () => {
      return { data: { user: null }, error: null }
    },
  }

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

export function createClient() {
  return new MockServerSupabaseClient()
}
