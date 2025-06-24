"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Check,
  Star,
  Zap,
  Users,
  Shield,
  ArrowRight,
  Calendar,
  BarChart3,
  Clock,
  BookOpen,
  Target,
  PenTool,
} from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small businesses",
    monthlyPrice: 29,
    yearlyPrice: 24,
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    features: ["Up to 3 social accounts", "30 posts per month", "Basic analytics", "Content calendar", "Email support"],
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses and agencies",
    monthlyPrice: 79,
    yearlyPrice: 65,
    icon: Users,
    color: "from-purple-500 to-pink-500",
    features: [
      "Up to 10 social accounts",
      "Unlimited posts",
      "Advanced analytics",
      "Team collaboration",
      "Priority support",
      "Custom branding",
      "Bulk scheduling",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    monthlyPrice: 199,
    yearlyPrice: 165,
    icon: Shield,
    color: "from-orange-500 to-red-500",
    features: [
      "Unlimited social accounts",
      "Unlimited posts",
      "White-label solution",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "TechCorp",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content: "This platform has revolutionized our social media strategy. We've seen a 300% increase in engagement!",
  },
  {
    name: "Mike Chen",
    role: "Content Creator",
    company: "Creative Studio",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content: "The scheduling features are incredible. I can plan my entire month's content in just a few hours.",
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    company: "Fashion Brand",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content: "The analytics insights have helped us understand our audience better and create more targeted content.",
  },
  {
    name: "David Thompson",
    role: "Agency Owner",
    company: "Digital Marketing Pro",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    content: "Managing multiple client accounts has never been easier. This tool is a game-changer for agencies.",
  },
]

const articles = [
  {
    title: "10 Social Media Strategies That Actually Work in 2024",
    excerpt:
      "Discover the latest trends and proven strategies to boost your social media presence and engagement rates.",
    category: "Strategy",
    readTime: "8 min read",
    image: "/placeholder.jpg",
    author: "Marketing Team",
    date: "Dec 15, 2024",
  },
  {
    title: "How to Create Engaging Video Content for Instagram Reels",
    excerpt:
      "Learn the secrets of creating viral video content that captures attention and drives engagement on Instagram.",
    category: "Content Creation",
    readTime: "6 min read",
    image: "/placeholder.jpg",
    author: "Content Experts",
    date: "Dec 12, 2024",
  },
  {
    title: "The Ultimate Guide to Social Media Analytics",
    excerpt: "Master the art of measuring your social media performance with our comprehensive analytics guide.",
    category: "Analytics",
    readTime: "12 min read",
    image: "/placeholder.jpg",
    author: "Data Team",
    date: "Dec 10, 2024",
  },
  {
    title: "Content Calendar Planning: A Step-by-Step Guide",
    excerpt:
      "Plan your social media content like a pro with our detailed guide to content calendar creation and management.",
    category: "Planning",
    readTime: "10 min read",
    image: "/placeholder.jpg",
    author: "Strategy Team",
    date: "Dec 8, 2024",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12
    const yearlyCost = yearly * 12
    const savings = monthlyCost - yearlyCost
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { savings, percentage }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Scale your social media presence with our powerful tools. Start with a 14-day free trial, no credit card
            required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isYearly ? "font-semibold text-gray-900" : "text-gray-500"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="scale-125" />
            <span className={`text-lg ${isYearly ? "font-semibold text-gray-900" : "text-gray-500"}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
            const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice)

            return (
              <Card
                key={plan.name}
                className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-gray-500">/{isYearly ? "month" : "month"}</span>
                    </div>
                    {isYearly && (
                      <div className="text-sm text-green-600 font-medium mt-2">
                        Save ${savings.savings}/year ({savings.percentage}% off)
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Customer Reviews */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied users who trust our platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles & Insights</h2>
            <p className="text-gray-600 text-lg">Stay updated with the latest social media trends and strategies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => {
              const getCategoryIcon = (category: string) => {
                switch (category) {
                  case "Strategy":
                    return <Target className="h-4 w-4" />
                  case "Content Creation":
                    return <PenTool className="h-4 w-4" />
                  case "Analytics":
                    return <BarChart3 className="h-4 w-4" />
                  case "Planning":
                    return <Calendar className="h-4 w-4" />
                  default:
                    return <BookOpen className="h-4 w-4" />
                }
              }

              const getCategoryColor = (category: string) => {
                switch (category) {
                  case "Strategy":
                    return "bg-blue-100 text-blue-800"
                  case "Content Creation":
                    return "bg-purple-100 text-purple-800"
                  case "Analytics":
                    return "bg-green-100 text-green-800"
                  case "Planning":
                    return "bg-orange-100 text-orange-800"
                  default:
                    return "bg-gray-100 text-gray-800"
                }
              }

              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`text-xs flex items-center gap-1 ${getCategoryColor(article.category)}`}>
                        {getCategoryIcon(article.category)}
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using our platform to grow their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="text-sm opacity-75">14-day free trial • No credit card required • Cancel anytime</div>
          </div>
        </div>
      </div>
    </div>
  )
}
