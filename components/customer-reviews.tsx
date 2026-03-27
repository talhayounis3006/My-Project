"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Ana Petrović",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "May 15, 2025",
    text: "The Ajvar from Balkan Foods is absolutely authentic! It tastes just like my grandmother used to make back in Serbia. I'm so happy to have found this store - it brings back so many childhood memories.",
    product: "Ajvar",
  },
  {
    id: 2,
    name: "Milan Kovačević",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "April 22, 2025",
    text: "I've been looking for authentic Ćevapi for years, and Balkan Foods has the best I've found in the US. The quality is exceptional, and the taste is exactly like what I remember from Bosnia. Highly recommended!",
    product: "Ćevapi",
  },
  {
    id: 3,
    name: "Jelena Nikolić",
    location: "Boston, MA",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "May 3, 2025",
    text: "The Burek is delicious and reminds me of home. The pastry is flaky and the filling is well-seasoned. I would definitely order again. The only thing that would make it better is if they offered more filling varieties.",
    product: "Burek",
  },
  {
    id: 4,
    name: "Dragan Jovanović",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "April 10, 2025",
    text: "The Rakija is exceptional - smooth and aromatic. It's the perfect digestif after a hearty meal, and it reminds me of celebrations back home. I've already ordered more bottles as gifts for friends.",
    product: "Rakija",
  },
  {
    id: 5,
    name: "Marija Đorđević",
    location: "Miami, FL",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "May 18, 2025",
    text: "The Kajmak is creamy and delicious - perfect on fresh bread or with grilled meats. The quality is consistent, and the packaging keeps it fresh. I'm a regular customer now!",
    product: "Kajmak",
  },
  {
    id: 6,
    name: "Stefan Popović",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "April 30, 2025",
    text: "Sarma is one of my favorite dishes, and Balkan Foods makes it just right. The cabbage is tender, and the filling is flavorful. It's almost as good as my mother's recipe, which is saying a lot!",
    product: "Sarma",
  },
]

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reviewsPerPage = 3
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const nextReviews = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevReviews = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const visibleReviews = reviews.slice(currentIndex * reviewsPerPage, (currentIndex + 1) * reviewsPerPage)

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-warm" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="section-subtitle block mb-3">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <div className="section-ornament mt-4 mb-4">
            <span className="text-primary text-lg">✦</span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Read authentic reviews from our satisfied customers who enjoy our traditional Balkan products
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="h-full border-0 shadow-lg card-hover-lift bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      {/* Avatar with gradient ring */}
                      <div className="relative w-14 h-14 rounded-full p-[2px] gradient-primary">
                        <div className="w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center text-primary font-bold shadow-inner">
                          {getInitials(review.name)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{review.name}</h3>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/15" />
                  </div>

                  {/* Star rating with glow */}
                  <div className="flex items-center mb-3 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating 
                            ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]" 
                            : "text-muted/40"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground font-medium">{review.date}</span>
                  </div>

                  <p className="text-sm flex-grow leading-relaxed text-muted-foreground">{review.text}</p>

                  <div className="mt-4 pt-4 border-t border-dashed text-sm flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {review.product}
                    </span>
                    <span className="text-muted-foreground text-xs">Verified Purchase</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-10 gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReviews}
              disabled={currentIndex === 0}
              className="rounded-full w-10 h-10 border-2 hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous reviews</span>
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? "w-8 h-3 gradient-primary" 
                      : "w-3 h-3 bg-primary/20 hover:bg-primary/40"
                  }`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReviews}
              disabled={currentIndex === totalPages - 1}
              className="rounded-full w-10 h-10 border-2 hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next reviews</span>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
