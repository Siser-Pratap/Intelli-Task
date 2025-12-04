import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Zap, Shield, TrendingUp } from "lucide-react"

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="text-white font-semibold text-xl">IntelliTask</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Solutions
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Resources
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Log in
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500/30">✨ Powered by AI</Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            One AI work platform
            <br />
            <span className="text-blue-300">for any kind of work</span>
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plan and execute work across projects, sales, marketing, IT, and engineering with a unified, AI-first
            product suite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-white/60 text-sm">No credit card needed • Unlimited time on Free plan</p>
          </div>

          {/* Trust Indicators */}
          <div className="mb-16">
            <p className="text-white/60 mb-6">Trusted by over 60% of the Fortune 500</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-white font-semibold">Coca-Cola</div>
              <div className="text-white font-semibold">Universal Music</div>
              <div className="text-white font-semibold">Lionsgate</div>
              <div className="text-white font-semibold">Carrefour</div>
              <div className="text-white font-semibold">Glossier</div>
            </div>
          </div>
        </div>

        {/* What would you like to manage? */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">What would you like to manage?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: "📋", label: "Projects" },
              { icon: "✅", label: "Tasks" },
              { icon: "📈", label: "Marketing" },
              { icon: "🎨", label: "Design" },
              { icon: "👥", label: "CRM" },
              { icon: "💻", label: "Software" },
              { icon: "⚙️", label: "IT" },
              { icon: "🔄", label: "Operations" },
              { icon: "🚀", label: "Product" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white text-sm font-medium">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your teams' impact.
            <br />
            <span className="text-yellow-300">Multiplied by AI.</span>
          </h2>
          <p className="text-white/80 text-lg">Drive efficiency with intelligent automation and insights</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Drive projects forward with AI insights</h3>
              </div>
              <p className="text-white/80 mb-4">
                Get intelligent recommendations and risk analysis to keep your projects on track.
              </p>
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-300 hover:bg-blue-600/20 bg-transparent"
              >
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Automate customer journeys</h3>
              </div>
              <p className="text-white/80 mb-4">
                Create seamless workflows that respond intelligently to customer interactions.
              </p>
              <Button
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-600/20 bg-transparent"
              >
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Ship quality software with AI-guided sprints</h3>
              </div>
              <p className="text-white/80 mb-4">
                Optimize development cycles with intelligent sprint planning and code quality insights.
              </p>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 bg-transparent"
              >
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-orange-400" />
                <h3 className="text-xl font-semibold text-white">Deliver standout service with AI ticket handling</h3>
              </div>
              <p className="text-white/80 mb-4">
                Resolve customer issues faster with intelligent routing and automated responses.
              </p>
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-300 hover:bg-orange-600/20 bg-transparent"
              >
                Learn more
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Leading brands drive efficient growth</h2>
          <p className="text-white/80 text-lg">Join thousands of companies transforming their workflows</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-green-400 mb-2">615%</div>
              <div className="text-white/80">Return on investment</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-blue-400 mb-2">105K</div>
              <div className="text-white/80">Hours saved annually</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-purple-400 mb-2">300%</div>
              <div className="text-white/80">Productivity increase</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-600/20 text-green-300 border-green-500/30">ENTERPRISE</Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Enterprise-grade security</h2>
          <p className="text-white/80 text-lg mb-8">
            Keep your company's data secure and compliant with industry-leading standards
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-2">
              GDPR
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-2">
              SOC 2
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-2">
              ISO 27001
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-2">
              HIPAA
            </Badge>
          </div>

          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
            Explore our Trust Center
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">The AI work platform your team will love</h2>
          <p className="text-white/80 text-lg mb-8">
            Start building better workflows today with our intuitive, AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-white font-semibold text-xl">TaskFlow</span>
              </div>
              <p className="text-white/60 text-sm">The AI work platform designed for modern teams.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Project Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Team Collaboration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/60 text-sm">© 2024 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
