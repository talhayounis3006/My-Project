import { products, getCategories } from "@/lib/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function MenuPage() {
  const categories = getCategories()
  
  const menuCategories = categories.map((cat, index) => ({
    id: index + 1,
    name: cat,
    icon: cat.includes("Beverages") ? "☕" : 
          cat.includes("Snacks") ? "🥨" : 
          cat.includes("Pantry") ? "🥫" : 
          cat.includes("Soups") ? "🥘" : "🍞",
    items: products.filter(p => p.category === cat)
  }))

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Page Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="container relative z-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-3">✦ Discover ✦</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Our Products</h1>
          <p className="text-white/70 max-w-lg mx-auto">
            Explore our authentic Balkan food selection, crafted with traditional recipes and premium ingredients
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <div className="container py-12 md:py-16">
        <div className="space-y-16">
          {menuCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category header */}
              <div className="flex items-center gap-4">
                <span className="text-3xl">{category.icon}</span>
                <div className="flex-1">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold">{category.name}</h2>
                  <div className="h-1 w-16 gradient-primary rounded-full mt-2" />
                </div>
              </div>

              {/* Menu items */}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, index) => (
                  <Link 
                    key={index} 
                    href={`/products/${item.id}`}
                    className="group relative rounded-xl p-5 bg-card border border-border/60 shadow-sm card-hover-lift overflow-hidden"
                  >
                    {/* Hover gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold gradient-primary text-white shadow-sm">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
