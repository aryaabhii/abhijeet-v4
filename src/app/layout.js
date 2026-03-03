import Footer from "@/components/common/Footer";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import FloatingActions from "@/components/common/FloatingActions";
import Social from "@/components/common/Social";

export const metadata = {
  title: "Abhijeet Kumar – Software Developer | Laravel, JavaScript, React",
  description: "Abhijeet Kumar is a full-stack software developer with expertise in Laravel, JavaScript, React, and modern frontend/backend technologies. Passionate about scalable applications, UI/UX, and problem solving through innovation.",
  keywords: "Abhijeet Kumar, Software Developer, Full Stack Developer, Laravel Developer, React Developer, JavaScript Developer, Next.js Developer, Node.js Developer, Express.js Developer, MongoDB Developer, PHP Developer, Web Developer India, Remote Developer, UI UX Designer, Frontend Developer, Backend Developer, Web App Developer, Vercel Developer, API Developer, REST API, GitHub Portfolio, Tailwind CSS Developer, Bootstrap Developer, jQuery Developer, Responsive Web Design, SEO Friendly Developer, Freelance Web Developer, JavaScript Freelancer, Website Developer, Custom Web App Developer, MERN Stack Developer, LAMP Stack Developer, Clean Code Developer, Software Engineer Portfolio, Web Designer and Developer",
  author: "Abhijeet Kumar",
  robots: "index, follow",
  verification: {
    google: "3H0Msg1fStoKTvjbxbNtrpNGqcu0zZY_X9e5YEAzccg"
  }

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <Social />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PAGE CONTENT */}
          <main className="min-h-[70vh]">
            {children}
          </main>
        <FloatingActions />  
        <Footer />
        </div>
      </body>
    </html>
  );
}