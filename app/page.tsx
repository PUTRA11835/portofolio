// pages/index.tsx
'use client';

import { listTools } from "../data";
import { useState, useEffect } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import Particles from "./components/Particles/Particles";
import GradientText from './components/GradientText/GradientText';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // Handle window resize and initial size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // No longer need a separate useEffect for scroll-behavior due to direct use in scrollToSection

  // Calculate particle settings based on window size
  const isMobile = windowSize.width < 768;
  const particleCount = isMobile ? 200 : 400;
  const particleBaseSize = isMobile ? 100 : 150;

  // Refined smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height for offset
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.offsetHeight || 80; // Default to 80 if navbar not found or no height

      const targetPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'} min-h-screen overflow-x-hidden transition-colors duration-500`}>
      {/* Remove global style for scroll-behavior here, it's handled directly in scrollToSection */}
      {/* <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        * {
          scroll-behavior: smooth;
        }
        @supports (scroll-behavior: smooth) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style> */}

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode
          ? 'bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <GradientText
                colors={["#7F00FF", "#9f4af4", "#c4bbce", "#bd4eed", "#d800ff"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class text-xl lg:text-2xl font-bold"
              >
                Putra Palampang Tarung
              </GradientText>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-sm lg:text-base font-medium hover:text-violet-600 transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-sm lg:text-base font-medium hover:text-violet-600 transition-colors duration-300"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-sm lg:text-base font-medium hover:text-violet-600 transition-colors duration-300"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm lg:text-base font-medium hover:text-violet-600 transition-colors duration-300"
              >
                Contact
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-violet-600' : 'bg-gray-300'
                }`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-violet-600' : 'bg-gray-300'
                }`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className={`flex justify-center items-center space-x-6 px-6 py-3 rounded-2xl shadow-lg ${
          darkMode
            ? 'bg-zinc-800/90 backdrop-blur-md border border-zinc-700'
            : 'bg-white/90 backdrop-blur-md border border-gray-200'
        }`}>
          <button
            onClick={() => scrollToSection('home')}
            className="text-xs font-medium hover:text-violet-600 transition-colors duration-300 text-center"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-xs font-medium hover:text-violet-600 transition-colors duration-300 text-center"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-xs font-medium hover:text-violet-600 transition-colors duration-300 text-center"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-xs font-medium hover:text-violet-600 transition-colors duration-300 text-center"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Particles Background */}
      {windowSize.width > 0 && (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Particles
            particleColors={['#b7d520', '#b7d520']}
            particleCount={particleCount}
            particleSpread={10}
            speed={0.5}
            particleBaseSize={particleBaseSize}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 lg:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8 relative z-10">
              {/* Interest Section */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
                <h2 className="text-lg lg:text-xl xl:text-2xl font-bold whitespace-nowrap">
                  I'm interested in
                </h2>
                <div className="w-full lg:w-auto">
                  <RotatingText
                    texts={['Web Development', 'Quality Assurance', 'Mobile Development', 'Machine Learning']}
                    mainClassName="px-3 lg:px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-lg lg:text-xl xl:text-2xl font-bold inline-flex transition-all w-full lg:w-auto justify-center lg:justify-start"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </div>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <SplitText
                  text="Hello, I'm Putra Palampang Tarung!"
                  className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-bold leading-tight"
                  delay={50} duration={0.6} ease="power3.out"
                  splitType="chars" from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px"
                />
                <SplitText
                  text="Web Programming Enthusiast"
                  className="text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text leading-tight"
                  delay={150} duration={0.6} ease="power3.out"
                  splitType="chars" from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px"
                />
              </div>

              {/* Description */}
              <BlurText
                text="Saya adalah mahasiswa Informatika semester 6 yang memiliki ketertarikan dalam Web & Mobile Development, Quality Assurance, dan Machine Learning. Website ini menampilkan perjalanan saya dalam teknologi serta berbagai proyek yang saya kembangkan."
                delay={70} animateBy="words" direction="top"
                className="text-base lg:text-lg xl:text-xl leading-relaxed max-w-2xl opacity-80"
              />

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-300 ${
                    darkMode
                      ? 'border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white'
                      : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'
                  }`}
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* 3D Lanyard */}
            <div className="hidden lg:flex justify-center items-center relative z-10">
              <div className="w-full h-96 lg:h-[500px] xl:h-[600px]">
                <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg lg:text-xl opacity-80 max-w-2xl mx-auto">
              Berikut adalah beberapa proyek yang telah saya kerjakan dengan berbagai teknologi modern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[1, 2, 3].map((p, index) => (
              <div
                key={p}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  darkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-gray-200'
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className={`h-48 lg:h-56 rounded-t-2xl mb-6 bg-gradient-to-br ${
                  index === 0 ? 'from-violet-400 to-purple-600' :
                    index === 1 ? 'from-blue-400 to-cyan-600' :
                      'from-green-400 to-emerald-600'
                } relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-white/80 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-violet-600 transition-colors duration-300">
                    Project {p}
                  </h3>
                  <p className="opacity-80 text-sm lg:text-base leading-relaxed mb-4">
                    Deskripsi singkat proyek yang menjelaskan fungsi utama dan teknologi yang digunakan dalam pengembangan aplikasi ini.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'Node.js', 'MongoDB'].map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-violet-100 text-violet-800 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors duration-300">
                      Live Demo →
                    </button>
                    <button className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors duration-300">
                      Source Code →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 lg:py-32 relative z-10 ${
        darkMode ? 'bg-zinc-800/10' : 'bg-gray-50/50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg lg:text-xl opacity-80 max-w-2xl mx-auto">
              Teknologi dan tools yang saya gunakan dalam pengembangan aplikasi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {listTools.map((tool, index) => (
              <div
                key={tool.id}
                className={`group flex flex-col items-center p-4 lg:p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  darkMode
                    ? 'bg-zinc-800 border border-zinc-700 hover:border-violet-500'
                    : 'bg-white border border-gray-200 hover:border-violet-400'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 mb-4 relative group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={tool.gambar}
                    alt={`${tool.nama} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-bold text-sm lg:text-base text-center mb-1 group-hover:text-violet-600 transition-colors duration-300">
                  {tool.nama}
                </h4>
                <p className="opacity-60 text-xs lg:text-sm text-center leading-tight">
                  {tool.ket}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Let's Work Together
              </h2>
              <p className="text-lg lg:text-xl opacity-80 max-w-2xl mx-auto">
                Tertarik untuk berkolaborasi? Mari diskusikan proyek Anda dan bagaimana saya dapat membantu
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📧</span>
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="opacity-80">putrapalampangt@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📱</span>
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="opacity-80">+62 8953 4154 7031</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📍</span>
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="opacity-80">Depok, Yogyakarta, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`p-8 rounded-2xl shadow-lg ${
                darkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-gray-200'
              }`}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={`w-full p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                        darkMode
                          ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={`w-full p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                        darkMode
                          ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      required
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      darkMode
                        ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className={`w-full p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      darkMode
                        ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={6}
                    className={`w-full p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 resize-vertical ${
                      darkMode
                        ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t relative z-10 ${
        darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <GradientText
                colors={["#7F00FF", "#9f4af4", "#c4bbce", "#bd4eed", "#d800ff"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class font-bold text-lg bg-gradient-to-r bg-clip-text text-transparent"
              >
                Putra Palampang Tarung
              </GradientText>
              <p className="text-sm opacity-60 mt-1">
                Web Programming Enthusiast
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/putrapalampangtarung/" className="text-sm opacity-60 hover:opacity-100 hover:text-violet-600 transition-all duration-300">
                LinkedIn
              </a>
              <a href="https://github.com/putrapalampangtarung" className="text-sm opacity-60 hover:opacity-100 hover:text-violet-600 transition-all duration-300">
                GitHub
              </a>
              <a href="https://www.instagram.com/putrapalampang_" className="text-sm opacity-60 hover:opacity-100 hover:text-violet-600 transition-all duration-300">
                Instagram
              </a>
            </div>
            <p className="text-xs opacity-60 text-center md:text-right">
              &copy; {new Date().getFullYear()} Putra Palampang Tarung. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}