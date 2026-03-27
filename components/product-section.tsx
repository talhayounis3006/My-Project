
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"

export default function ProductSection() {
  // Use a selection of products for the featured section
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      {/* Decorative ornaments */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <h2 className="section-heading text-primary font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Products
            </h2>
            <div className="h-1 w-24 gradient-primary mx-auto rounded-full" />
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
              Discover the most loved Balkan flavors, from our world-famous Ajvar to premium roasted coffee.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group relative flex flex-col items-center p-6 bg-card rounded-3xl border border-border/40 shadow-sm transition-all duration-500 card-hover-lift hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
            >
              {/* Hover gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Product category badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-sm border-border/50 text-muted-foreground group-hover:text-primary transition-colors">
                  {product.category}
                </Badge>
              </div>

              {/* Product image container */}
              <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-muted/30 p-8 flex items-center justify-center transition-colors group-hover:bg-primary/5">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Product info */}
              <div className="w-full text-center space-y-2">
                <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>
                <div className="pt-4 flex items-center justify-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold gradient-primary text-white shadow-md shadow-primary/20 transform group-hover:scale-110 transition-transform duration-300">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Decorative background number/ID */}
              <span className="absolute -bottom-4 -right-2 text-7xl font-black text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                {product.id}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link href="/menu" className="btn-premium group flex items-center gap-2 px-10 py-4 rounded-full text-lg shadow-xl shadow-primary/20">
            View All Products
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
