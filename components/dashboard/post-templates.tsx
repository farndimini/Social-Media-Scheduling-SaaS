"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  TrendingUp,
  Heart,
  Zap,
  Target,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Video,
  ImageIcon,
  FileText,
} from "lucide-react"

interface Template {
  id: string
  title: string
  description: string
  content: string
  category: string
  platforms: string[]
  type: "text" | "image" | "video" | "reel"
  engagement_rate: number
  uses: number
  preview_image?: string
}

const templates: Template[] = [
  {
    id: "1",
    title: "منشور تحفيزي صباحي",
    description: "قالب مثالي لبدء اليوم بطاقة إيجابية",
    content:
      "🌅 صباح الخير! \n\nاليوم فرصة جديدة لتحقيق أهدافك. ابدأ بخطوة صغيرة واستمر في التقدم.\n\n#تحفيز #نجاح #صباح_الخير",
    category: "تحفيزي",
    platforms: ["instagram", "facebook", "twitter", "linkedin"],
    type: "text",
    engagement_rate: 8.5,
    uses: 1250,
  },
  {
    id: "2",
    title: "ريل تعليمي - نصائح سريعة",
    description: "قالب لمشاركة نصائح مفيدة في فيديو قصير",
    content:
      "💡 نصيحة اليوم:\n\n[اكتب نصيحتك هنا]\n\n✅ سهلة التطبيق\n✅ نتائج مضمونة\n✅ جربها الآن\n\n#نصائح #تعلم #تطوير",
    category: "تعليمي",
    platforms: ["instagram", "tiktok", "youtube"],
    type: "reel",
    engagement_rate: 12.3,
    uses: 890,
  },
  {
    id: "3",
    title: "منشور ترويجي للمنتج",
    description: "قالب احترافي للترويج للمنتجات والخدمات",
    content:
      "🎯 عرض خاص!\n\n[اسم المنتج/الخدمة]\n\n✨ المميزات:\n• [ميزة 1]\n• [ميزة 2]\n• [ميزة 3]\n\n🔥 خصم 20% لفترة محدودة\n\n#عرض #منتج #خصم",
    category: "تسويقي",
    platforms: ["facebook", "instagram", "linkedin"],
    type: "image",
    engagement_rate: 15.7,
    uses: 2100,
  },
  {
    id: "4",
    title: "قصة نجاح ملهمة",
    description: "شارك قصص النجاح لإلهام متابعيك",
    content:
      "🏆 قصة نجاح ملهمة\n\n[اكتب القصة هنا...]\n\nالدروس المستفادة:\n1. [درس 1]\n2. [درس 2]\n3. [درس 3]\n\n#نجاح #إلهام #قصة",
    category: "إلهامي",
    platforms: ["linkedin", "facebook", "instagram"],
    type: "text",
    engagement_rate: 9.8,
    uses: 750,
  },
  {
    id: "5",
    title: "فيديو تعليمي - شرح مفصل",
    description: "قالب لإنشاء محتوى تعليمي مفصل",
    content:
      "📚 درس اليوم: [عنوان الدرس]\n\nما ستتعلمه:\n• [نقطة 1]\n• [نقطة 2]\n• [نقطة 3]\n\n⏰ مدة الفيديو: [X] دقائق\n\n#تعليم #شرح #درس",
    category: "تعليمي",
    platforms: ["youtube", "facebook", "linkedin"],
    type: "video",
    engagement_rate: 18.2,
    uses: 450,
  },
  {
    id: "6",
    title: "منشور تفاعلي - سؤال",
    description: "اطرح أسئلة لزيادة التفاعل مع الجمهور",
    content: "🤔 سؤال اليوم:\n\n[اكتب سؤالك هنا]\n\nشاركنا رأيك في التعليقات 👇\n\n#سؤال #تفاعل #رأيك_يهمنا",
    category: "تفاعلي",
    platforms: ["instagram", "facebook", "twitter"],
    type: "text",
    engagement_rate: 22.1,
    uses: 1800,
  },
]

const categoryIcons = {
  تحفيزي: Zap,
  تعليمي: Target,
  تسويقي: TrendingUp,
  إلهامي: Heart,
  تفاعلي: Sparkles,
}

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Video,
}

const typeIcons = {
  text: FileText,
  image: ImageIcon,
  video: Video,
  reel: Video,
}

export function PostTemplates() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category)))]

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((t) => t.category === selectedCategory)

  const useTemplate = (template: Template) => {
    // Here you would typically navigate to create post with the template
    console.log("Using template:", template)
    // router.push(`/create-post?template=${template.id}`)
  }

  const handleClosePreview = () => {
    setSelectedTemplate(null)
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-6 w-6 text-purple-600" />
          قوالب المحتوى الاحترافية
        </CardTitle>
        <p className="text-muted-foreground">اختر من مجموعة واسعة من القوالب المصممة لزيادة التفاعل</p>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-100">
            <TabsTrigger value="all" className="text-xs">
              الكل
            </TabsTrigger>
            {categories.slice(1).map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const CategoryIcon = categoryIcons[template.category as keyof typeof categoryIcons]
                const TypeIcon = typeIcons[template.type]

                return (
                  <Card
                    key={template.id}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {CategoryIcon && <CategoryIcon className="h-4 w-4 text-purple-600" />}
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <TypeIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500 capitalize">
                            {template.type === "reel"
                              ? "ريل"
                              : template.type === "video"
                                ? "فيديو"
                                : template.type === "image"
                                  ? "صورة"
                                  : "نص"}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-purple-600 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                      {/* Platforms */}
                      <div className="flex items-center gap-1 mb-3">
                        {template.platforms.slice(0, 4).map((platform) => {
                          const PlatformIcon = platformIcons[platform as keyof typeof platformIcons]
                          return PlatformIcon ? (
                            <div key={platform} className="p-1 rounded bg-gray-100">
                              <PlatformIcon className="h-3 w-3 text-gray-600" />
                            </div>
                          ) : null
                        })}
                        {template.platforms.length > 4 && (
                          <span className="text-xs text-gray-500">+{template.platforms.length - 4}</span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>📈 {template.engagement_rate}% تفاعل</span>
                        <span>👥 {template.uses.toLocaleString()} استخدام</span>
                      </div>

                      {/* Action Button */}
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          useTemplate(template)
                        }}
                      >
                        استخدم القالب
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedTemplate.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleClosePreview}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{selectedTemplate.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">معاينة المحتوى:</h4>
                  <div className="whitespace-pre-wrap text-sm bg-white p-3 rounded border">
                    {selectedTemplate.content}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                    onClick={() => {
                      useTemplate(selectedTemplate)
                      handleClosePreview()
                    }}
                  >
                    استخدم هذا القالب
                  </Button>
                  <Button variant="outline" onClick={handleClosePreview}>
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
