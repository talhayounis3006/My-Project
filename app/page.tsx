import { ImageSlider } from "@/components/image-slider"
import ProductSection from "@/components/product-section"
import { CustomerReviews } from "@/components/customer-reviews"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  const sliderImages = [
    {
      url: "/images/Edited1.jpeg",
      alt: "Balkan Food Warehouse",
      subtitle: "Professional distribution center serving the community",
    },
    {
      url: "/images/Edited2.jpeg",
      alt: "Authentic Balkan Cuisine",
      subtitle: "Rich, traditional flavors made from the heart",
    },
    {
      url: "/images/Edited3.jpeg",
      alt: "Traditional Balkan Coffee",
      subtitle: "The timeless ritual of morning hospitality",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Slider */}
      <section className="w-full">
        <ImageSlider images={sliderImages} />
      </section>

      {/* Product Section */}
      <section className="relative py-16 md:py-20">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 gradient-primary-subtle opacity-50" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="section-subtitle block mb-3">Our Selection</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Premium <span className="gradient-text">Balkan Products</span>
            </h2>
            <div className="section-ornament mt-4 mb-4">
              <span className="text-primary text-lg">✦</span>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto text-balance">
              Discover our curated selection of authentic Balkan food products,
              made with traditional recipes and the finest ingredients.
            </p>
          </div>
          <ProductSection />
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="w-full">
        <CustomerReviews />
      </section>

      <Footer />
    </main>
  )
}
