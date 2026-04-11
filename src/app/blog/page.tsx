import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - ReviewSpark | Turn Reviews Into Social Media Gold",
  description: "Expert guides on leveraging customer reviews for social media marketing. Learn how restaurants, fitness businesses, service providers, and salons can turn reviews into engaging content.",
  keywords: ["review marketing", "social media strategy", "customer testimonials", "Google reviews", "social media content"],
  openGraph: {
    title: "ReviewSpark Blog - Expert Marketing Guides",
    description: "Learn how to turn customer reviews into social media content that drives growth",
    type: "website",
  },
};

const posts = [
  // General Marketing Guides
  {
    slug: "google-reviews-instagram-engagement",
    title: "From Google Reviews to Instagram Engagement: A Small Business Guide",
    excerpt: "Learn how local businesses can transform Google reviews into engaging Instagram content that drives real engagement, builds trust, and attracts new customers.",
    category: "Small Business",
    readTime: "10 min read",
    keywords: ["Google reviews Instagram", "local business social media", "review marketing"],
  },
  {
    slug: "wasted-5-star-reviews",
    title: "Wasted 5-Star Reviews: Why Your Best Customer Praise Never Gets Seen",
    excerpt: "Discover why collecting 5-star reviews is only half the battle. Learn review marketing strategies that amplify social proof and maximize your reputation investment.",
    category: "Strategy",
    readTime: "9 min read",
    keywords: ["5-star reviews", "review marketing", "social proof strategy"],
  },
  {
    slug: "social-proof-marketing-guide-2026",
    title: "Social Proof Marketing Guide 2026: Turn Reviews Into Revenue",
    excerpt: "Master social proof marketing for local businesses in 2026. Learn proven strategies to leverage reviews, testimonials, and user-generated content.",
    category: "2026 Guide",
    readTime: "11 min read",
    keywords: ["social proof marketing", "local business marketing 2026", "review strategy"],
  },
  {
    slug: "service-business-review-automation",
    title: "Service Business Review Automation: From Feedback to Marketing",
    excerpt: "Learn how service businesses can automatically turn Yelp and Google reviews into Instagram content. Save hours, boost engagement, and convert reviews into customers.",
    category: "Service Businesses",
    readTime: "12 min read",
    keywords: ["service business automation", "review to social media", "Yelp to Instagram"],
  },
  {
    slug: "service-business-testimonials-tiktok",
    title: "How Service Businesses Can Turn Customer Testimonials Into Viral TikTok and Reels Content",
    excerpt: "Discover proven strategies for service businesses to transform customer testimonials into scroll-stopping TikTok and Instagram Reels content that drives leads and builds trust.",
    category: "Service Businesses",
    readTime: "8 min read",
    keywords: ["service business TikTok marketing", "customer testimonial videos", "TikTok for local business"],
  },
  {
    slug: "how-to-get-more-google-reviews",
    title: "How to Get More Google Reviews: The Complete Guide for Local Businesses",
    excerpt: "Master the art of generating more Google reviews. Learn proven strategies, automation tips, and best practices to build your online reputation and attract more customers.",
    category: "Strategy",
    readTime: "12 min read",
    keywords: ["get more Google reviews", "Google review strategy", "online reputation"],
  },
  {
    slug: "review-management-tools-comparison",
    title: "Review Management Tools Comparison: Find the Right Solution for Your Business",
    excerpt: "Compare the top review management tools and platforms. Learn which features matter most and find the perfect solution for your business's reputation management needs.",
    category: "Tools",
    readTime: "10 min read",
    keywords: ["review management tools", "reputation management software", "review platforms"],
  },
  // Restaurants & Food
  {
    slug: "restaurant-customer-marketing",
    title: "Restaurant Customer Marketing: The Review-to-Social Playbook",
    excerpt: "Discover 5 proven strategies restaurants use to transform satisfied customers into powerful marketing assets. Drive word-of-mouth, boost reviews, and fill more seats.",
    category: "Restaurants",
    readTime: "10 min read",
    keywords: ["restaurant customer marketing", "restaurant word-of-mouth", "restaurant social media"],
  },
  {
    slug: "restaurant-reviews-instagram",
    title: "How Restaurants Can Turn 5-Star Reviews Into Instagram Engagement That Drives Reservations",
    excerpt: "Learn proven strategies for restaurants to transform glowing customer reviews into Instagram content that stops the scroll, sparks engagement, and fills tables.",
    category: "Restaurants",
    readTime: "8 min read",
    keywords: ["restaurant Instagram marketing", "restaurant social media strategy", "food business marketing"],
  },
  // Beauty & Wellness
  {
    slug: "salon-reviews-instagram",
    title: "How Hair Salons Can Turn Customer Reviews Into Instagram Content That Books Appointments",
    excerpt: "Learn how hair salons can transform Google reviews into Instagram posts that book appointments. 5 proven formulas + automation tools to save 20+ hours/month on social media.",
    category: "Salons",
    readTime: "7 min read",
    keywords: ["salon Instagram marketing", "hair salon social media", "beauty business marketing"],
  },
  {
    slug: "hair-salon-instagram-marketing",
    title: "Hair Salon Instagram Marketing: How to Turn Reviews Into Clients",
    excerpt: "Master Instagram marketing for your hair salon. Learn how to leverage reviews, showcase transformations, and build a social media presence that books appointments.",
    category: "Salons",
    readTime: "9 min read",
    keywords: ["hair salon Instagram", "salon marketing", "beauty business social media"],
  },
  // Fitness
  {
    slug: "fitness-reviews-social-media",
    title: "How Fitness Businesses Can Turn Customer Reviews into Social Media Gold",
    excerpt: "Discover proven strategies for gyms and fitness studios to transform 5-star reviews into engaging social media content that attracts new members and builds community trust.",
    category: "Fitness",
    readTime: "7 min read",
    keywords: ["gym social media marketing", "fitness business reviews", "fitness studio marketing"],
  },
  {
    slug: "fitness-studio-reviews-marketing",
    title: "Fitness Studio Reviews Marketing: Build Trust and Attract New Members",
    excerpt: "Learn how fitness studios can leverage Google reviews to attract new members, build community trust, and create compelling social media content.",
    category: "Fitness",
    readTime: "8 min read",
    keywords: ["fitness studio reviews", "gym marketing", "fitness center reputation"],
  },
  // Healthcare Professionals
  {
    slug: "dentist-google-reviews-marketing",
    title: "Dentist Google Reviews Marketing: How to Build Trust and Attract More Patients",
    excerpt: "Learn how dental practices can leverage Google reviews to build trust, attract new patients, and grow their practice through strategic review marketing.",
    category: "Healthcare",
    readTime: "10 min read",
    keywords: ["dentist Google reviews", "dental practice marketing", "dentist reputation management"],
  },
  // Auto Services
  {
    slug: "auto-repair-shop-reviews-marketing",
    title: "Auto Repair Shop Reviews Marketing: Build Trust and Win More Customers",
    excerpt: "Discover how auto repair shops can leverage Google reviews to build trust, attract new customers, and stand out in a competitive market.",
    category: "Auto Services",
    readTime: "9 min read",
    keywords: ["auto repair reviews", "mechanic marketing", "car shop reputation"],
  },
  // Home Services
  {
    slug: "hvac-contractor-google-reviews",
    title: "HVAC Contractor Google Reviews: How to Get More 5-Star Reviews That Win Jobs",
    excerpt: "Learn how HVAC contractors can leverage Google reviews to build trust, win more jobs, and grow their business through strategic reputation management.",
    category: "Home Services",
    readTime: "10 min read",
    keywords: ["HVAC reviews", "heating cooling contractor", "HVAC marketing"],
  },
  {
    slug: "plumber-google-reviews",
    title: "Plumber Google Reviews: How to Build Trust and Get More Emergency Calls",
    excerpt: "Learn how plumbers can leverage Google reviews to build trust, attract emergency service calls, and grow their plumbing business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["plumber reviews", "plumbing marketing", "emergency plumber"],
  },
  {
    slug: "electrician-google-reviews",
    title: "Electrician Google Reviews: How to Build Trust and Win More Jobs",
    excerpt: "Learn how electricians can leverage Google reviews to build trust, win more electrical contracts, and grow their business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["electrician reviews", "electrical contractor marketing", "electrician reputation"],
  },
  {
    slug: "roofer-google-reviews",
    title: "Roofer Google Reviews: How to Win More Jobs and Build Your Reputation",
    excerpt: "Learn how roofing contractors can leverage Google reviews to win more jobs, build trust with homeowners, and grow their roofing business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["roofer reviews", "roofing contractor marketing", "roofing reputation"],
  },
  {
    slug: "landscaper-google-reviews-marketing",
    title: "Landscaper Google Reviews: How to Win More Contracts and Build Your Reputation",
    excerpt: "Learn how landscaping businesses can leverage Google reviews to win more contracts, build trust with property owners, and grow their business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["landscaper reviews", "landscaping marketing", "lawn care reputation"],
  },
  {
    slug: "house-cleaning-reviews-marketing",
    title: "House Cleaning Google Reviews: How to Build Trust and Get More Recurring Clients",
    excerpt: "Learn how house cleaning businesses can leverage Google reviews to build trust, attract recurring clients, and grow their cleaning business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["house cleaning reviews", "maid service marketing", "cleaning business reputation"],
  },
  {
    slug: "mover-google-reviews-marketing",
    title: "Mover Google Reviews: How to Build Trust and Win More Moving Jobs",
    excerpt: "Learn how moving companies can leverage Google reviews to build trust, win more moving contracts, and grow their business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["mover reviews", "moving company marketing", "moving company reputation"],
  },
  {
    slug: "carpet-cleaning-google-reviews",
    title: "Carpet Cleaning Google Reviews: How to Build Trust and Get More Bookings",
    excerpt: "Learn how carpet cleaning businesses can leverage Google reviews to build trust, attract more bookings, and grow their cleaning business.",
    category: "Home Services",
    readTime: "9 min read",
    keywords: ["carpet cleaning reviews", "carpet cleaner marketing", "carpet cleaning reputation"],
  },
  {
    slug: "pest-control-google-reviews",
    title: "Pest Control Google Reviews: How to Build Trust and Get More Service Calls",
    excerpt: "Learn how pest control companies can leverage Google reviews to build trust, attract more service calls, and grow their extermination business.",
    category: "Home Services",
    readTime: "10 min read",
    keywords: ["pest control reviews", "exterminator marketing", "pest control reputation"],
  },
  {
    slug: "pet-grooming-google-reviews",
    title: "Pet Grooming Google Reviews: How to Build Trust and Attract More Pet Parents",
    excerpt: "Learn how pet grooming businesses can leverage Google reviews to build trust, attract more pet parents, and grow their grooming business.",
    category: "Pet Services",
    readTime: "9 min read",
    keywords: ["pet grooming reviews", "dog groomer marketing", "pet grooming reputation"],
  },
  // Professional Services
  {
    slug: "lawyer-google-reviews-marketing",
    title: "Lawyer Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how lawyers and law firms can leverage Google reviews to build trust, attract more clients, and grow their legal practice.",
    category: "Professional Services",
    readTime: "10 min read",
    keywords: ["lawyer reviews", "attorney marketing", "law firm reputation"],
  },
  {
    slug: "real-estate-agent-google-reviews",
    title: "Real Estate Agent Google Reviews: How to Build Trust and Close More Deals",
    excerpt: "Learn how real estate agents can leverage Google reviews to build trust, close more deals, and grow their real estate business.",
    category: "Real Estate",
    readTime: "9 min read",
    keywords: ["real estate agent reviews", "realtor marketing", "real estate reputation"],
  },
  // Beauty & Personal Services
  {
    slug: "tattoo-artist-google-reviews",
    title: "Tattoo Artist Google Reviews: How to Build Trust and Book More Clients",
    excerpt: "Learn how tattoo artists can leverage Google reviews to build trust, showcase their art, and attract more clients.",
    category: "Beauty & Art",
    readTime: "12 min read",
    keywords: ["tattoo artist reviews", "tattoo studio marketing", "tattoo reputation"],
  },
  {
    slug: "nail-salon-google-reviews",
    title: "Nail Salon Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how nail salons can leverage Google reviews to build trust, showcase their work, and attract more clients.",
    category: "Beauty & Art",
    readTime: "11 min read",
    keywords: ["nail salon reviews", "nail salon marketing", "nail technician reputation"],
  },
  // Additional Professional Services
  {
    slug: "accountant-cpa-google-reviews",
    title: "Accountant Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how accountants and CPAs can leverage Google reviews to build trust, attract high-value clients, and grow their practice.",
    category: "Professional Services",
    readTime: "9 min read",
    keywords: ["accountant reviews", "CPA marketing", "accounting firm reputation"],
  },
  {
    slug: "financial-advisor-google-reviews",
    title: "Financial Advisor Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how financial advisors can leverage Google reviews to build trust, attract high-net-worth clients, and grow their practice.",
    category: "Professional Services",
    readTime: "9 min read",
    keywords: ["financial advisor reviews", "wealth manager marketing", "financial planner reputation"],
  },
  {
    slug: "insurance-agent-google-reviews",
    title: "Insurance Agent Google Reviews: How to Build Trust and Sell More Policies",
    excerpt: "Learn how insurance agents can leverage Google reviews to build trust, attract more clients, and grow their book of business.",
    category: "Professional Services",
    readTime: "9 min read",
    keywords: ["insurance agent reviews", "insurance broker marketing", "insurance reputation"],
  },
  {
    slug: "architect-google-reviews",
    title: "Architect Google Reviews: How to Build Trust and Win More Projects",
    excerpt: "Learn how architects can leverage Google reviews to build credibility, attract high-value clients, and win more design projects.",
    category: "Professional Services",
    readTime: "10 min read",
    keywords: ["architect reviews", "architecture firm marketing", "architect reputation"],
  },
  {
    slug: "home-inspector-google-reviews",
    title: "Home Inspector Google Reviews: How to Build Trust and Get More Real Estate Referrals",
    excerpt: "Learn how home inspectors can leverage Google reviews to build trust with buyers, sellers, and real estate agents.",
    category: "Professional Services",
    readTime: "8 min read",
    keywords: ["home inspector reviews", "inspection marketing", "home inspector reputation"],
  },
  // Healthcare & Wellness
  {
    slug: "chiropractor-google-reviews-marketing",
    title: "Chiropractor Google Reviews: How to Build Trust and Attract More Patients",
    excerpt: "Learn how chiropractors can leverage Google reviews to build credibility, attract new patients, and grow their practice.",
    category: "Healthcare",
    readTime: "9 min read",
    keywords: ["chiropractor reviews", "chiropractic marketing", "chiropractor reputation"],
  },
  {
    slug: "veterinarian-google-reviews",
    title: "Veterinarian Google Reviews: How to Build Trust and Attract More Pet Parents",
    excerpt: "Learn how veterinarians can leverage Google reviews to build trust, attract more pet parents, and grow their veterinary practice.",
    category: "Healthcare",
    readTime: "9 min read",
    keywords: ["veterinarian reviews", "vet marketing", "veterinary clinic reputation"],
  },
  // Spa & Wellness
  {
    slug: "day-spa-google-reviews-marketing",
    title: "Day Spa Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how day spas can leverage Google reviews to build credibility, attract new clients, and grow revenue.",
    category: "Spa & Wellness",
    readTime: "9 min read",
    keywords: ["day spa reviews", "spa marketing", "wellness spa reputation"],
  },
  {
    slug: "med-spa-google-reviews",
    title: "Med Spa Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how medical spas and aesthetic practices can leverage Google reviews to build trust, attract new clients, and grow their practice.",
    category: "Spa & Wellness",
    readTime: "9 min read",
    keywords: ["med spa reviews", "medical spa marketing", "aesthetic practice reputation"],
  },
  {
    slug: "massage-therapy-google-reviews",
    title: "Massage Therapy Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how massage therapists and wellness centers can leverage Google reviews to build trust, attract new clients, and grow their practice.",
    category: "Spa & Wellness",
    readTime: "8 min read",
    keywords: ["massage therapy reviews", "massage therapist marketing", "wellness center reputation"],
  },
  // Fitness
  {
    slug: "personal-trainer-google-reviews",
    title: "Personal Trainer Google Reviews: How to Build Trust and Attract More Clients",
    excerpt: "Learn how personal trainers and fitness coaches can leverage Google reviews to build trust, attract new clients, and grow their training business.",
    category: "Fitness",
    readTime: "8 min read",
    keywords: ["personal trainer reviews", "fitness coach marketing", "trainer reputation"],
  },
  // Creative Services
  {
    slug: "wedding-photographer-google-reviews",
    title: "Wedding Photographer Google Reviews: How to Build Trust and Book More Weddings",
    excerpt: "Learn how wedding photographers can leverage Google reviews to build trust, attract more couples, and grow their photography business.",
    category: "Creative Services",
    readTime: "10 min read",
    keywords: ["wedding photographer reviews", "photographer marketing", "wedding photography reputation"],
  },
  // Home Services - Additional
  {
    slug: "appliance-repair-google-reviews",
    title: "Appliance Repair Google Reviews: How to Build Trust and Get More Emergency Calls",
    excerpt: "Learn how appliance repair businesses can leverage Google reviews to build trust with homeowners and get more repair calls.",
    category: "Home Services",
    readTime: "8 min read",
    keywords: ["appliance repair reviews", "refrigerator repair marketing", "appliance technician reputation"],
  },
  {
    slug: "locksmith-google-reviews",
    title: "Locksmith Google Reviews: How to Build Trust and Get More Emergency Calls",
    excerpt: "Learn how locksmiths can leverage Google reviews to build trust, rank higher in local search, and get more emergency lockout calls.",
    category: "Home Services",
    readTime: "8 min read",
    keywords: ["locksmith reviews", "locksmith marketing", "emergency locksmith reputation"],
  },
  {
    slug: "pool-service-google-reviews",
    title: "Pool Service Google Reviews: How to Build Trust and Get More Recurring Clients",
    excerpt: "Learn how pool cleaning and maintenance companies can leverage Google reviews to build trust, attract recurring clients, and grow their business.",
    category: "Home Services",
    readTime: "8 min read",
    keywords: ["pool service reviews", "pool cleaning marketing", "pool maintenance reputation"],
  },
  {
    slug: "pressure-washing-google-reviews",
    title: "Pressure Washing Google Reviews: How to Build Trust and Get More Jobs",
    excerpt: "Learn how pressure washing businesses can leverage Google reviews to build trust with homeowners and property managers.",
    category: "Home Services",
    readTime: "8 min read",
    keywords: ["pressure washing reviews", "power washing marketing", "driveway cleaning reputation"],
  },
  {
    slug: "window-cleaning-google-reviews",
    title: "Window Cleaning Google Reviews: How to Build Trust and Get More Jobs",
    excerpt: "Learn how window cleaning businesses can leverage Google reviews to build trust with homeowners and property managers.",
    category: "Home Services",
    readTime: "8 min read",
    keywords: ["window cleaning reviews", "window washing marketing", "window cleaner reputation"],
  },
  // Automotive
  {
    slug: "towing-service-google-reviews",
    title: "Towing Service Google Reviews: How to Build Trust and Get More Emergency Calls",
    excerpt: "Learn how towing companies can leverage Google reviews to build trust, get more emergency calls, and grow their business.",
    category: "Automotive",
    readTime: "8 min read",
    keywords: ["towing service reviews", "towing company marketing", "roadside assistance reputation"],
  },
  // Energy
  {
    slug: "solar-installer-google-reviews",
    title: "Solar Installer Google Reviews: How to Build Trust and Close More Deals",
    excerpt: "Learn how solar installation companies can leverage Google reviews to build trust, attract homeowners, and close more solar deals.",
    category: "Energy",
    readTime: "9 min read",
    keywords: ["solar installer reviews", "solar company marketing", "solar panel reputation"],
  },
  // Childcare & Education
  {
    slug: "childcare-daycare-google-reviews",
    title: "Childcare & Daycare Google Reviews: How to Build Trust and Attract More Families",
    excerpt: "Learn how childcare centers and daycares can leverage Google reviews to build trust with parents, increase enrollment, and stand out in a competitive market.",
    category: "Childcare & Education",
    readTime: "10 min read",
    keywords: ["childcare reviews", "daycare marketing", "preschool reputation"],
  },
  // Healthcare - Specialty
  {
    slug: "orthodontist-google-reviews",
    title: "Orthodontist Google Reviews: How to Build Trust and Attract More Patients",
    excerpt: "Learn how orthodontists can leverage Google reviews to build trust with parents, attract new patients, and grow their practice in a competitive market.",
    category: "Healthcare",
    readTime: "10 min read",
    keywords: ["orthodontist reviews", "braces marketing", "invisalign reputation"],
  },
  // Home Services - Emergency
  {
    slug: "garage-door-repair-google-reviews",
    title: "Garage Door Repair Google Reviews: How to Build Trust and Get More Emergency Calls",
    excerpt: "Learn how garage door repair companies can leverage Google Reviews to build trust, attract more customers, and grow their business.",
    category: "Home Services",
    readTime: "10 min read",
    keywords: ["garage door repair reviews", "garage door marketing", "door repair reputation"],
  },
  // Professional Services - Design
  {
    slug: "interior-designer-google-reviews",
    title: "Interior Designer Google Reviews: How to Build Trust and Win More High-End Projects",
    excerpt: "Learn how interior designers can leverage Google Reviews to build credibility, attract premium clients, and grow their design business.",
    category: "Professional Services",
    readTime: "11 min read",
    keywords: ["interior designer reviews", "design firm marketing", "designer reputation"],
  },
  // Automotive - Detailing
  {
    slug: "car-detailing-google-reviews",
    title: "Car Detailing Google Reviews: How to Build Trust and Attract More Premium Clients",
    excerpt: "Learn how car detailing businesses can leverage Google Reviews to build trust, attract premium clients, and grow their detailing business.",
    category: "Automotive",
    readTime: "10 min read",
    keywords: ["car detailing reviews", "auto detailing marketing", "ceramic coating reputation"],
  },
  // Home Services - Removal
  {
    slug: "junk-removal-google-reviews",
    title: "Junk Removal Google Reviews: How to Build Trust and Get More Calls",
    excerpt: "Learn how junk removal companies can leverage Google Reviews to build trust, attract more customers, and grow their business.",
    category: "Home Services",
    readTime: "10 min read",
    keywords: ["junk removal reviews", "junk hauling marketing", "waste removal reputation"],
  },
  // Construction & Contracting
  {
    slug: "general-contractor-google-reviews",
    title: "General Contractor Google Reviews: How to Build Trust and Win More Construction Projects",
    excerpt: "Learn how general contractors can leverage Google Reviews to win more construction projects, build credibility, and grow their contracting business.",
    category: "Construction",
    readTime: "10 min read",
    keywords: ["general contractor reviews", "construction marketing", "contractor reputation"],
  },
  // Property Management
  {
    slug: "property-management-google-reviews",
    title: "Property Management Google Reviews: How to Build Trust and Win More Property Owners",
    excerpt: "Learn how property management companies can leverage Google Reviews to attract property owners, increase portfolio size, and build lasting client relationships.",
    category: "Real Estate",
    readTime: "10 min read",
    keywords: ["property management reviews", "property manager marketing", "real estate management reputation"],
  },
  // Home Services - Painting
  {
    slug: "painting-services-google-reviews",
    title: "Painting Services Google Reviews: How to Build Trust and Win More Painting Contracts",
    excerpt: "Learn how painting contractors can leverage Google Reviews to win more residential and commercial painting projects, build credibility, and grow their business.",
    category: "Home Services",
    readTime: "10 min read",
    keywords: ["painting services reviews", "painter marketing", "painting contractor reputation"],
  },
  // Events & Entertainment
  {
    slug: "event-planner-google-reviews",
    title: "Event Planner Google Reviews: How to Build Trust and Win More Events",
    excerpt: "Learn how event planners can leverage Google Reviews to attract corporate and social clients, build credibility, and grow their event planning business.",
    category: "Events",
    readTime: "11 min read",
    keywords: ["event planner reviews", "event planning marketing", "wedding planner reputation"],
  },
  // Healthcare - Vision
  {
    slug: "optometrist-eye-doctor-google-reviews",
    title: "Optometrist & Eye Doctor Google Reviews: How to Build Trust and Attract More Patients",
    excerpt: "Learn how optometrists and eye doctors can leverage Google reviews to build patient trust, improve local SEO, and grow their practice.",
    category: "Healthcare",
    readTime: "10 min read",
    keywords: ["optometrist google reviews", "eye doctor reviews", "optometry marketing", "vision care reviews"],
  },
  // Healthcare - Rehabilitation
  {
    slug: "physical-therapy-google-reviews",
    title: "Physical Therapy Google Reviews: How to Build Trust and Attract More Patients",
    excerpt: "Learn how physical therapists can leverage Google reviews to build patient trust, improve local SEO, and grow their practice.",
    category: "Healthcare",
    readTime: "11 min read",
    keywords: ["physical therapy google reviews", "physiotherapy reviews", "physical therapist marketing", "PT practice reviews"],
  },
  // Home Services - Tree Care
  {
    slug: "tree-service-google-reviews",
    title: "Tree Service Google Reviews: How to Build Trust and Get More Calls",
    excerpt: "Learn how tree service companies can leverage Google reviews to build homeowner trust, improve local SEO, and grow their business.",
    category: "Home Services",
    readTime: "10 min read",
    keywords: ["tree service google reviews", "tree removal reviews", "arborist marketing", "tree care reviews"],
  },
  // Healthcare - Dermatology
  {
    slug: "dermatologist-google-reviews",
    title: "Dermatologist Google Reviews: How to Build Trust and Attract More Patients",
    excerpt: "Learn how dermatologists can leverage Google reviews to build trust with potential patients, increase bookings, and grow their practice.",
    category: "Healthcare",
    readTime: "11 min read",
    keywords: ["dermatologist google reviews", "dermatology reviews", "skin doctor reviews", "cosmetic dermatology reviews"],
  },
  // Financial Services - Mortgage
  {
    slug: "mortgage-broker-google-reviews",
    title: "Mortgage Broker Google Reviews: How to Build Trust and Close More Loans",
    excerpt: "Learn how mortgage brokers can leverage Google reviews to build trust with homebuyers, increase referrals, and grow their lending business.",
    category: "Financial Services",
    readTime: "11 min read",
    keywords: ["mortgage broker google reviews", "mortgage broker reviews", "lender reviews", "home loan reviews"],
  },
  // Senior Care
  {
    slug: "assisted-living-google-reviews",
    title: "Assisted Living Google Reviews: How to Build Trust and Attract Families",
    excerpt: "Learn how assisted living facilities can leverage Google reviews to build trust with families, increase inquiries, and grow occupancy.",
    category: "Senior Care",
    readTime: "12 min read",
    keywords: ["assisted living google reviews", "senior living reviews", "memory care reviews", "elder care reviews"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600">
              ReviewSpark
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Blog
            </Link>
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            ReviewSpark Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Expert guides on turning customer reviews into powerful social media content
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-4 block">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              </Link>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs text-gray-500 dark:text-gray-500"
                  >
                    #{keyword.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Read article
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to turn your reviews into social media gold?
          </h2>
          <p className="mt-4 text-blue-100">
            Join thousands of businesses using ReviewSpark to transform customer reviews into engaging content.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-600 hover:bg-gray-50"
          >
            Start Free Trial
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">ReviewSpark</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 ReviewSpark. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
<!-- Build 1775868683 -->
