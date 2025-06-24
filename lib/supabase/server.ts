// Mock query builder for server-side
class MockServerQueryBuilder {
  private table: string

  constructor(table: string) {
    this.table = table
  }

  select(columns = "*") {
    return this
  }

  eq(column: string, value: any) {
    return this
  }

  in(column: string, values: any[]) {
    return this
  }

  order(column: string, options: { ascending?: boolean } = {}) {
    return this
  }

  limit(count: number) {
    return this
  }

  async single() {
    return { data: null, error: null }
  }

  // This is the method that gets called at the end of the chain
  then(resolve: (value: any) => void, reject?: (reason?: any) => void) {
    // Return empty array for all queries to prevent build errors
    const result = { data: [], error: null }
    return Promise.resolve(result).then(resolve, reject)
  }
}

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

  from(table: string) {
    return new MockServerQueryBuilder(table)
  }
}

export function createClient() {
  return new MockServerSupabaseClient()
}
