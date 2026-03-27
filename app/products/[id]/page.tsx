import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Star } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart"
import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === Number.parseInt(id))
  if (!product) { notFound() }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Product Details */}
      <div className="container py-8 md:py-12">
        <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/40 shadow-lg image-zoom bg-muted/20 p-8 flex items-center justify-center">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain p-8" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <div key={index} className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${index === 0 ? "border-primary shadow-sm" : "border-transparent opacity-60 hover:opacity-100 hover:border-primary/40"}`}>
                  <Image src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} fill className="object-contain p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 text-xs font-semibold bg-primary/10 text-primary border-0 px-3 py-1">
                {product.category}
              </Badge>
              <h1 className="font-heading text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="mt-3">
                <span className="inline-flex items-center px-5 py-2 rounded-full text-xl font-bold gradient-primary text-white shadow-lg shadow-primary/20">
                  {product.price}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">{product.longDescription}</p>

            {/* Product Details Grid */}
            <div className="rounded-xl border border-border/50 p-5 bg-muted/20 space-y-4">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground">Product Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full gradient-primary" /><span className="font-medium">Origin:</span> {product.origin}</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full gradient-primary" /><span className="font-medium">Weight:</span> {product.weight}</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Status:</span>
                  <span className={product.inStock ? "text-emerald-600 font-semibold" : "text-red-600 font-semibold"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-heading font-semibold mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border/50">{ing}</span>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div className="rounded-xl border border-border/50 p-5 bg-muted/20">
              <h3 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Nutrition Facts (per serving)</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/50 rounded-lg p-2"><div className="text-[10px] text-muted-foreground uppercase">Calories</div><div className="font-bold text-primary">{product.nutritionFacts.calories}</div></div>
                <div className="bg-white/50 rounded-lg p-2"><div className="text-[10px] text-muted-foreground uppercase">Fat</div><div className="font-bold text-primary">{product.nutritionFacts.fat}</div></div>
                <div className="bg-white/50 rounded-lg p-2"><div className="text-[10px] text-muted-foreground uppercase">Carbs</div><div className="font-bold text-primary">{product.nutritionFacts.carbs}</div></div>
                <div className="bg-white/50 rounded-lg p-2"><div className="text-[10px] text-muted-foreground uppercase">Protein</div><div className="font-bold text-primary">{product.nutritionFacts.protein}</div></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <AddToCartButton disabled={!product.inStock} productId={product.id} />
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-2 hover:border-primary hover:text-primary transition-all group">
                <Heart className="h-5 w-5 group-hover:fill-primary transition-colors" />
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading text-2xl font-bold">Customer Reviews</h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary p-[2px]"><div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary">AP</div></div>
                  <div><div className="font-bold text-sm">Ana Popescu</div><div className="text-[10px] text-muted-foreground">March 12, 2026</div></div>
                </div>
                <div className="flex gap-0.5 text-amber-400"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /></div>
              </div>
              <p className="text-sm text-muted-foreground italic">&quot;The absolute best quality, tastes just like what I remember from my childhood! Fast shipping too.&quot;</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary p-[2px]"><div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary">MS</div></div>
                  <div><div className="font-bold text-sm">Marko Stankovic</div><div className="text-[10px] text-muted-foreground">March 05, 2026</div></div>
                </div>
                <div className="flex gap-0.5 text-amber-400"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /></div>
              </div>
              <p className="text-sm text-muted-foreground italic">&quot;Great experience, authentic products. The packaging was very secure and arrived in perfect condition.&quot;</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading text-2xl font-bold">You May Also Like</h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(rp => (
                <Link key={rp.id} href={`/products/${rp.id}`} className="group bg-card rounded-2xl border border-border/40 overflow-hidden card-hover-lift shadow-sm">
                  <div className="aspect-square relative p-6 bg-muted/10 flex items-center justify-center overflow-hidden">
                    <Image src={rp.images[0]} alt={rp.name} fill className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{rp.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{rp.category}</p>
                    <div className="text-primary font-bold">{rp.price}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
