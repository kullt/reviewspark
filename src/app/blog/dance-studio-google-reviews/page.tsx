import Link from 'next/link';

export const metadata = {
  title: 'Dance Studios: Turn Student Reviews Into Social Content That Fills Classes | ReviewSpark',
  description: 'Learn how dance studios can transform Google reviews into Instagram and Facebook content that attracts new students and builds community.',
  keywords: 'dance studio marketing, dance school social media, dance class reviews, studio marketing ideas',
  openGraph: {
    title: 'How Dance Studios Can Turn Reviews Into Class-Filling Content',
    description: 'Transform your student reviews into social posts that inspire new dancers to join.',
    url: 'https://review-to-post-tau.vercel.app/blog/dance-studio-google-reviews',
  },
};

export default function DanceStudioReviews() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to ReviewSpark
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dance Studios: Turn Student Reviews Into Social Content That Fills Classes
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>6 min read</span>
          <span>•</span>
          <span>Dance Studio Marketing</span>
        </div>

        <div className="prose prose-pink max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Your dance students are writing marketing gold: "I was terrified to try dance, but this studio made me feel welcome from day one." That's the exact message hesitant beginners need to hear — and it's already written by a real student.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">The Beginner's Mindset Challenge</h2>
          <p className="text-gray-700 mb-4">
            Most people who consider dance classes never sign up. Why? Fear. They worry about:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Looking foolish or uncoordinated</li>
            <li>Being the only beginner</li>
            <li>Not fitting in with "real dancers"</li>
            <li>Being judged</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Your current students felt these same fears. Their reviews describe how your studio helped them overcome those fears. That's exactly what prospective students need to see.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Review Types That Fill Classes</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. The "I Was Terrified" Story</h3>
          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-900 mb-2">The Review:</p>
            <p className="text-gray-700 italic mb-4">
              "I'm in my 40s and have NEVER danced. I almost talked myself out of it a dozen times. But the beginner salsa class here is genuinely beginner-friendly. No judgment, patient instructors, and everyone else was learning too. Now I look forward to class every week. If you've been thinking about it — just go!"
            </p>
            <p className="font-semibold text-gray-900 mb-2">The Social Post:</p>
            <p className="text-gray-700 mb-2">
              📸 Video: Clips from beginner class with smiling students
            </p>
            <p className="text-gray-700 mb-2">
              ✨ Caption: "Never danced? Neither had this student at 40+. Now she counts down the days to class 🩰 Our beginner classes are for actual beginners — no dance experience needed, no judgment, just fun. Your first class is waiting. #DanceAtAnyAge #BeginnerDance #NoExperienceNeeded"
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. The Instructor Praise</h3>
          <p className="text-gray-700 mb-4">
            Students often mention specific instructors by name. This humanizes your studio:
          </p>
          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 italic mb-2">
              "Maria has this magical way of breaking down moves so they actually make sense. I've tried learning bachata elsewhere and gave up frustrated. Her teaching style clicked for me. Patient, clear, encouraging — everything a nervous beginner needs."
            </p>
            <p className="text-pink-600 text-sm mt-2">
              → Instructor spotlight post + "Meet our teachers" series
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. The Community Feeling</h3>
          <p className="text-gray-700 mb-4">
            Dance studios are social spaces. Reviews about community attract people seeking connection:
          </p>
          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 italic mb-2">
              "I moved here knowing no one and now I have a whole dance family. The social events, the encouragement from other students, the birthday celebrations — it's more than a class, it's a community. Best decision I made after moving to the city."
            </p>
            <p className="text-pink-600 text-sm mt-2">
              → Community highlight content + social event promotion
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. The Progress Story</h3>
          <p className="text-gray-700 mb-4">
            Reviews describing growth inspire prospective students:
          </p>
          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 italic mb-2">
              "Started with zero hip hop experience 8 months ago. Just performed in my first showcase and actually felt confident! The progressive curriculum here really works. They meet you where you are and build you up."
            </p>
            <p className="text-pink-600 text-sm mt-2">
              → Student journey content + showcase/recital promotion
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. The Kids & Parents Win</h3>
          <p className="text-gray-700 mb-4">
            Parents leave detailed reviews about children's experiences:
          </p>
          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 italic mb-2">
              "My shy daughter was nervous about dance class. Now she practices at home every day and lights up when it's class day. The instructors are so encouraging with the little ones. She's gained confidence I see in other areas of her life too."
            </p>
            <p className="text-pink-600 text-sm mt-2">
              → Kids class promotion + confidence-building messaging
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Instagram Strategy for Dance Studios</h2>
          <p className="text-gray-700 mb-4">
            Dance and Instagram are a natural fit. Your content should:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Normalize beginners:</strong> Show that everyone starts somewhere</li>
            <li><strong>Feature diversity:</strong> Different ages, body types, skill levels</li>
            <li><strong>Highlight instructors:</strong> People connect with people</li>
            <li><strong>Show the fun:</strong> Dance is joyful — capture that</li>
            <li><strong>Include music:</strong> Reels with trending audio expand reach</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Automating Your Dance Studio Content</h2>
          <p className="text-gray-700 mb-4">
            Studio owners are busy teaching, choreographing, and running businesses. Writing captions from scratch isn't sustainable.
          </p>
          <p className="text-gray-700 mb-4">
            <Link href="/" className="text-pink-600 hover:underline">ReviewSpark</Link> turns your Google reviews into ready-to-post content:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Connect your Google Business Profile</li>
            <li>Reviews automatically become social media drafts</li>
            <li>Add your dance photos/video</li>
            <li>Post or schedule</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Keep your social media active with authentic student voices — without the content creation burnout.
          </p>

          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white my-8">
            <h3 className="text-xl font-bold mb-2">Ready to fill your dance classes?</h3>
            <p className="mb-4 opacity-90">
              ReviewSpark helps dance studios turn student reviews into social content that converts.
            </p>
            <Link href="/" className="inline-block px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors">
              Start Free Trial →
            </Link>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Quick Action Plan</h2>
          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-3">
            <li><strong>This week:</strong> Identify reviews from shy beginners and use them to create "It's okay to be nervous" content</li>
            <li><strong>This month:</strong> Create instructor spotlight posts from reviews that name teachers</li>
            <li><strong>Ongoing:</strong> Set up automation to keep your feed active with student stories</li>
          </ol>

          <p className="text-gray-700">
            Your students' words are the most powerful marketing you have. Let them speak.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Turn student reviews into class enrollments
            </h3>
            <p className="text-gray-600 mb-4">
              Join dance studios using ReviewSpark to grow through authentic content
            </p>
            <Link href="/" className="inline-block px-8 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors">
              Try ReviewSpark Free
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
