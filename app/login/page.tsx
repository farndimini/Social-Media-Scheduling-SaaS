"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Share2, Eye, EyeOff, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  // تحقق من الجلسة الحالية
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/dashboard")
      }
    }
    checkSession()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!email || !password) {
      setError("الإيميل وكلمة المرور مطلوبان")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      console.log("🚀 بدء عملية تسجيل الدخول...")

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      console.log("📊 نتيجة تسجيل الدخول:", { data, error: signInError })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

      if (data?.user) {
        console.log("✅ تم تسجيل الدخول بنجاح، التوجه إلى:", redirectPath)
        // تأخير قصير للتأكد من حفظ الجلسة
        setTimeout(() => {
          router.push(redirectPath)
          router.refresh()
        }, 200)
      } else {
        setError("فشل في تسجيل الدخول. حاول مرة أخرى.")
      }
    } catch (err) {
      console.error("❌ خطأ في تسجيل الدخول:", err)
      setError("حدث خطأ غير متوقع.")
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
    setError(null)
  }

  const testCredentials = [
    { email: "admin@postscheduler.com", password: "admin123", name: "حساب المدير" },
    { email: "demo@postscheduler.com", password: "demo123", name: "حساب تجريبي" },
    { email: "test@postscheduler.com", password: "test123", name: "حساب اختبار" },
    { email: "user@example.com", password: "password", name: "مستخدم عادي" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Share2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PostScheduler</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">تسجيل الدخول</h2>
          <p className="mt-2 text-sm text-gray-600">استخدم أحد الحسابات التجريبية أدناه</p>
        </div>

        {/* Debug Toggle */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setDebugMode(!debugMode)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {debugMode ? "إخفاء" : "إظهار"} وضع التشخيص
          </button>
        </div>

        {/* Demo Accounts */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-blue-900 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            الحسابات التجريبية - اضغط للاستخدام:
          </h3>

          <div className="space-y-2">
            {testCredentials.map((cred, index) => (
              <button
                key={index}
                type="button"
                onClick={() => quickLogin(cred.email, cred.password)}
                className="w-full text-left p-3 bg-white rounded-md border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-blue-900">{cred.name}</div>
                <div className="text-sm text-blue-600">{cred.email}</div>
                {debugMode && <div className="text-xs text-blue-500">كلمة المرور: {cred.password}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">الإيميل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل الإيميل"
                disabled={isLoading}
                className="mt-1"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  disabled={isLoading}
                  className="pr-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </form>

        {/* Current Values Debug */}
        {debugMode && (
          <div className="bg-gray-100 rounded-lg p-3 text-xs">
            <h4 className="font-medium mb-2">معلومات التشخيص:</h4>
            <p>الإيميل المدخل: {email}</p>
            <p>كلمة المرور المدخلة: {password}</p>
            <p>حالة التحميل: {isLoading ? "نعم" : "لا"}</p>
            {error && <p className="text-red-600">الخطأ: {error}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
