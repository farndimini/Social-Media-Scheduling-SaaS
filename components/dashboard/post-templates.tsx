"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Copy,
  Edit,
  Eye,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"

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
  tags: string[]
}

const templates: Template[] = [
  {
    id: "1",
    title: "Morning Motivation Post",
    description: "Perfect template to start the day with positive energy",
    content: `🌅 Good Morning!

Today is a new opportunity to achieve your goals. Start with a small step and keep moving forward.

What's your goal for today? Share it in the comments! 👇

#Motivation #Success #GoodMorning #Goals #Inspiration`,
    category: "Motivational",
    platforms: ["instagram", "facebook", "twitter", "linkedin"],
    type: "text",
    engagement_rate: 8.5,
    uses: 1250,
    tags: ["morning", "motivation", "goals"],
  },
  {
    id: "2",
    title: "Educational Reel - Quick Tips",
    description: "Template for sharing useful tips in short video format",
    content: `💡 Today's Tip:

[Write your tip here]

✅ Easy to implement
✅ Guaranteed results  
✅ Try it now

Save this post for later! 📌

#Tips #Learning #Growth #Education #QuickTip`,
    category: "Educational",
    platforms: ["instagram", "tiktok", "youtube"],
    type: "reel",
    engagement_rate: 12.3,
    uses: 890,
    tags: ["tips", "education", "howto"],
  },
  {
    id: "3",
    title: "Product Promotion Post",
    description: "Professional template for promoting products and services",
    content: `🎯 Special Offer!

[Product/Service Name]

✨ Features:
• [Feature 1]
• [Feature 2] 
• [Feature 3]

🔥 20% OFF for limited time
Use code: SAVE20

Link in bio 👆

#Sale #Product #Discount #LimitedOffer #ShopNow`,
    category: "Marketing",
    platforms: ["facebook", "instagram", "linkedin"],
    type: "image",
    engagement_rate: 15.7,
    uses: 2100,
    tags: ["sale", "product", "promotion"],
  },
  {
    id: "4",
    title: "Success Story Template",
    description: "Share inspiring success stories to motivate your audience",
    content: `🏆 Success Story

[Write the story here...]

Key Takeaways:
1. [Lesson 1]
2. [Lesson 2]
3. [Lesson 3]

What's your success story? Share below! 👇

#Success #Inspiration #Story #Achievement #Motivation`,
    category: "Inspirational",
    platforms: ["linkedin", "facebook", "instagram"],
    type: "text",
    engagement_rate: 9.8,
    uses: 750,
    tags: ["success", "story", "inspiration"],
  },
  {
    id: "5",
    title: "Tutorial Video Template",
    description: "Template for creating detailed educational content",
    content: `📚 Today's Tutorial: [Tutorial Title]

What you'll learn:
• [Point 1]
• [Point 2]
• [Point 3]

⏰ Video Duration: [X] minutes

Don't forget to subscribe for more tutorials! 🔔

#Tutorial #Education #Learning #HowTo #StepByStep`,
    category: "Educational",
    platforms: ["youtube", "facebook", "linkedin"],
    type: "video",
    engagement_rate: 18.2,
    uses: 450,
    tags: ["tutorial", "education", "video"],
  },
  {
    id: "6",
    title: "Interactive Question Post",
    description: "Ask questions to increase audience engagement",
    content: `🤔 Question of the Day:

[Write your question here]

Share your thoughts in the comments 👇

I read every single comment and love hearing from you!

#Question #Engagement #Community #YourOpinionMatters #LetsTalk`,
    category: "Interactive",
    platforms: ["instagram", "facebook", "twitter"],
    type: "text",
    engagement_rate: 22.1,
    uses: 1800,
    tags: ["question", "engagement", "community"],
  },
]

const categoryIcons = {
  Motivational: Zap,
  Educational: Target,
  Marketing: TrendingUp,
  Inspirational: Heart,
  Interactive: Sparkles,
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
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const router = useRouter()

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category)))]

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((t) => t.category === selectedCategory)

  const useTemplate = useCallback(
    (template: Template) => {
      // Store template in localStorage and navigate to create post
      localStorage.setItem("selectedTemplate", JSON.stringify(template))
      router.push("/create-post?template=true")
    },
    [router],
  )

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const startEditing = (template: Template) => {
    setEditingTemplate(template)
    setEditedContent(template.content)
  }

  const saveEdit = () => {
    if (editingTemplate) {
      // Here you would typically save to database
      console.log("Saving edited template:", { ...editingTemplate, content: editedContent })
      setEditingTemplate(null)
      setEditedContent("")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Professional Content Templates
          </CardTitle>
          <p className="text-muted-foreground">Choose from a wide range of templates designed to boost engagement</p>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.slice(1).map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const CategoryIcon = categoryIcons[template.category as keyof typeof categoryIcons]
                  const TypeIcon = typeIcons[template.type]

                  return (
                    <Card
                      key={template.id}
                      className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                    >
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {CategoryIcon && <CategoryIcon className="h-5 w-5 text-purple-600" />}
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <TypeIcon className="h-4 w-4" />
                            <span className="text-xs capitalize">{template.type}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

                        {/* Platforms */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs text-gray-500">Platforms:</span>
                          <div className="flex gap-1">
                            {template.platforms.slice(0, 4).map((platform) => {
                              const PlatformIcon = platformIcons[platform as keyof typeof platformIcons]
                              return PlatformIcon ? (
                                <div key={platform} className="p-1 rounded bg-gray-100">
                                  <PlatformIcon className="h-4 w-4 text-gray-600" />
                                </div>
                              ) : null
                            })}
                            {template.platforms.length > 4 && (
                              <span className="text-xs text-gray-500 ml-1">+{template.platforms.length - 4}</span>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{template.engagement_rate}% engagement</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{template.uses.toLocaleString()} uses</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={() => useTemplate(template)}
                          >
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setPreviewTemplate(template)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(template.content)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {previewTemplate.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">{previewTemplate.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium">Content Preview:</Label>
                  <div className="mt-2 whitespace-pre-wrap text-sm bg-white p-4 rounded border min-h-[200px]">
                    {previewTemplate.content}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {previewTemplate.platforms.map((platform) => {
                      const PlatformIcon = platformIcons[platform as keyof typeof platformIcons]
                      return PlatformIcon ? (
                        <div key={platform} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          <PlatformIcon className="h-3 w-3" />
                          {platform}
                        </div>
                      ) : null
                    })}
                  </div>
                  <Badge>{previewTemplate.type}</Badge>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                    onClick={() => {
                      useTemplate(previewTemplate)
                      setPreviewTemplate(null)
                    }}
                  >
                    Use This Template
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      startEditing(previewTemplate)
                      setPreviewTemplate(null)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => copyToClipboard(previewTemplate.content)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
        <DialogContent className="max-w-2xl">
          {editingTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Edit Template: {editingTemplate.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">Template Content</Label>
                  <Textarea
                    id="content"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[300px] mt-2"
                    placeholder="Edit your template content..."
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveEdit} className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingTemplate(null)
                      setEditedContent("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
