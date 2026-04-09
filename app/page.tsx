"use client";

import React, { useEffect, useRef, useState } from 'react';

// --- DATA PROYEK PORTOFOLIO ---
const projectsData = [
  {
    id: 1,
    title: "Islamic Resource & Prayer App",
    category: "Tech Projects",
    image: "/app-islamic.jpg",
    description: "A comprehensive mobile application providing accurate prayer schedules and a rich library of Islamic literature including Simtuddurror, Barzanji, and Diba'. Built with modern development frameworks to ensure smooth and responsive performance.",
    role: "Mobile Developer"
  },
  {
    id: 2,
    title: "Unasradio Official Web",
    category: "Tech Projects",
    image: "/web-unasradio.jpg",
    description: "The primary digital platform for Unasradio, designed to facilitate live online broadcasting and showcase program schedules. Focuses heavily on an intuitive UI/UX to maximize listener engagement and retention.",
    role: "Front-End Developer"
  },
  {
    id: 3,
    title: "Rentashot Platform",
    category: "Tech Projects",
    image: "/web-rentashot.jpg",
    description: "A specialized digital platform built for a photography equipment rental service. Developed with a strong focus on a seamless booking flow, equipment availability tracking, and user-friendly inventory management.",
    role: "Web Developer"
  },
  {
    id: 4,
    title: "Cyber Security Seminar",
    category: "Public Speaking",
    image: "/mc-cyber.jpg",
    description: "Served as the main moderator for an intensive Cyber Security Seminar hosted by Karang Taruna Cilandak Barat. Responsible for guiding high-level discussions between expert panels and engaging the audience.",
    role: "Moderator"
  },
  {
    id: 5,
    title: "Comparative Study Event",
    category: "Public Speaking",
    image: "/mc-study.jpg",
    description: "Acted as the Master of Ceremony for the collaborative comparative study event between Unasradio and Fortyfive UPN. Successfully managed the event's timeline and energized hundreds of student participants.",
    role: "Master of Ceremony"
  }
];

// --- KOMPONEN PEMBUNGKUS ANIMASI ---
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
    );
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`w-full transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function Portfolio() {
  // 1. SIAPKAN WADAH UNTUK DATA DARI BACKEND
  const [projectsData, setProjectsData] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  // --- STATE UNTUK PORTOFOLIO INTERAKTIF ---
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<any>(null); 
  const carouselRef = useRef<HTMLDivElement>(null);

  // 2. FUNGSI UNTUK MENYEDOT DATA DARI API (BACKEND)
  useEffect(() => {
    // Memanggil API yang jalan di port 5000
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        // data.data karena format dari backend kita adalah { status: "success", data: [...] }
        setProjectsData(data.data); 
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Gagal menarik data dari API:", error);
        setIsLoading(false);
      });
  }, []); // Kurung siku kosong artinya fungsi ini cuma jalan 1x pas web dibuka

  // 3. LOGIKA FILTER KATEGORI (Jangan dihapus)
  const filteredProjects = activeFilter === "All Projects" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  // --- FUNGSI SCROLL KANAN KIRI ---
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Mencegah body scroll saat pop-up terbuka
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  // Kalau data masih ditarik, tampilkan tulisan loading (Opsional biar rapi)
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-black font-bold text-2xl">Menyiapkan Portofolio...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* SISA KODE KE BAWAHNYA SAMA PERSIS (Navbar, Hero, About, dll) */}

      {/* HEADER / NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl tracking-tighter">NAZHIF.</span>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="hover:underline underline-offset-4">About</a>
            <a href="#expertise" className="hover:underline underline-offset-4">Expertise</a>
            <a href="#portfolio" className="hover:underline underline-offset-4">Portfolio</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </div>
        </div>
      </nav>

      {/* 🌟 HERO SECTION 🌟 */}
      <section className="relative w-full min-h-[85vh] md:min-h-screen flex items-center bg-white z-20 overflow-hidden py-12">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="text-center lg:text-left z-40 relative pb-16 md:pb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Crafting Digital & Stage Experiences. <br />  
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 font-medium max-w-lg mx-auto lg:mx-0">
                Information Systems Student | Public Speaker | Front-End Developer
              </p>
            </div>
            <div className="relative h-[300px] md:h-[450px] w-full flex items-center justify-center mt-8 lg:-mt-24 pb-16 md:pb-0">
              <div className="absolute bottom-4 left-[0%] lg:left-[5%] z-10">
                <div className="w-24 md:w-36 lg:w-44 aspect-[3/4] bg-gray-100 rounded-xl border-[4px] border-white shadow-xl transform -rotate-12 hover:-translate-y-8 hover:rotate-0 hover:z-50 hover:scale-110 transition-all duration-300 ease-out overflow-hidden">
                  <img src="/dirigw1.png" alt="Portfolio 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute bottom-10 left-[18%] lg:left-[22%] z-20">
                <div className="w-24 md:w-36 lg:w-44 aspect-[3/4] bg-gray-200 rounded-xl border-[4px] border-white shadow-xl transform -rotate-6 hover:-translate-y-8 hover:rotate-0 hover:z-50 hover:scale-110 transition-all duration-300 ease-out overflow-hidden">
                  <img src="/dirigw2.png" alt="Portfolio 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-30">
                <div className="w-24 md:w-36 lg:w-44 aspect-[3/4] bg-gray-300 rounded-xl border-[4px] border-white shadow-xl transform hover:-translate-y-8 hover:scale-110 transition-all duration-300 ease-out overflow-hidden">
                  <img src="/dirigw3.png" alt="Portfolio 3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute bottom-10 right-[18%] lg:right-[22%] z-20">
                <div className="w-24 md:w-36 lg:w-44 aspect-[3/4] bg-gray-200 rounded-xl border-[4px] border-white shadow-xl transform rotate-6 hover:-translate-y-8 hover:rotate-0 hover:z-50 hover:scale-110 transition-all duration-300 ease-out overflow-hidden">
                  <img src="/dirigw4.png" alt="Portfolio 4" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute bottom-4 right-[0%] lg:right-[5%] z-10">
                <div className="w-24 md:w-36 lg:w-44 aspect-[3/4] bg-gray-100 rounded-xl border-[4px] border-white shadow-xl transform rotate-12 hover:-translate-y-8 hover:rotate-0 hover:z-50 hover:scale-110 transition-all duration-300 ease-out overflow-hidden">
                  <img src="/dirigw5.png" alt="Portfolio 5" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer z-30">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Scroll</span>
          <svg className="w-5 h-5 text-black animate-bounce mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

    {/* ABOUT SECTION */}
      {/* FIX: border-b-[3px] border-black sudah dihapus dari sini */}
      <section id="about" className="bg-white relative z-20">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center md:text-left">About Me</h2>
            <div className="text-lg text-gray-700 leading-relaxed max-w-4xl space-y-4">
              <p>
                Information Systems student at Universitas Nasional with a strong background in organizational management, communication, and social service. Experienced in leading youth organizations such as Chairman of Karang Taruna and Head of the Da'wah Division at IRMALA, focusing on team management and event execution.
              </p>
              <p>
                I have a strategic track record as the Vice Head of the Creative Division at Unasradio, leading visual strategy and digital identity while serving as the lead Front-End Developer. I successfully translate creative concepts into responsive and user-friendly website interfaces, bridging the gap between aesthetic design and technical functionality.
              </p>
              <p>
                I am also a competent Master of Ceremony (MC) and Moderator for various seminars and events, and have dedicated myself as an educational and health counselor at Posyandu Remaja.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

 {/* 🚀 MARQUEE (LET'S WORK TOGETHER) 🚀 */}
      <FadeInSection>
        <section className="py-12 relative bg-white flex flex-col items-center justify-center overflow-hidden min-h-[200px] w-full z-20">
          <div className="absolute bg-black text-white py-6 w-[120vw] left-1/2 transform -translate-x-1/2 -rotate-3 z-10 shadow-2xl flex overflow-hidden whitespace-nowrap">
            <div className="flex w-max animate-marquee-right">
              <span className="text-4xl md:text-5xl font-black tracking-widest mx-4 uppercase">LET'S WORK TOGETHER • LET'S WORK TOGETHER • </span>
              <span className="text-4xl md:text-5xl font-black tracking-widest mx-4 uppercase">LET'S WORK TOGETHER • LET'S WORK TOGETHER • </span>
            </div>
          </div>
          <div className="absolute bg-white text-black py-6 w-[120vw] left-1/2 transform -translate-x-1/2 rotate-3 z-0 border-y-[3px] border-black flex overflow-hidden whitespace-nowrap">
            <div className="flex w-max animate-marquee-left">
              <span className="text-4xl md:text-5xl font-black tracking-widest mx-4 uppercase">LET'S WORK TOGETHER • LET'S WORK TOGETHER • </span>
              <span className="text-4xl md:text-5xl font-black tracking-widest mx-4 uppercase">LET'S WORK TOGETHER • LET'S WORK TOGETHER • </span>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 🎬 CINEMATIC VIDEO SHOWCASE 🎬 */}
      <section className="w-full h-[80vh] md:h-screen relative z-10 bg-black" style={{ clipPath: 'inset(0)' }}>
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
          <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover grayscale opacity-80">
            <source src="/0407.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center text-white px-6">
          <FadeInSection>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-widest mb-4 drop-shadow-2xl">
              Unleashing Creativity
            </h2>
            <p className="text-sm md:text-xl font-bold tracking-[0.2em] text-gray-300 drop-shadow-lg">
              BRINGING IDEAS TO LIFE • THROUGH VOICE & CODE
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 🌟 EXPERTISE SECTION 🌟 */}
      <section id="expertise" className="bg-black text-white relative z-20 min-h-screen flex items-center border-t-0 py-20 overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 w-full">
          <FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="col-span-12 md:col-span-4 order-2 md:order-1 flex md:justify-start text-left">
                <div>
                  <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white mb-6 drop-shadow-md">
                    Hard Skills<br className="hidden md:block" /> 
                  </h3>
                  <ul className="space-y-4 text-sm lg:text-base font-medium tracking-wide text-gray-400">
                    <li>• Web Development (HTML/CSS/JS)</li>
                    <li>• React.js • Next.js • TailwindCSS</li>
                    <li>• Mobile Development (Flutter/Dart)</li>
                    <li>• Graphic Design & UI/UX</li>
                    <li>• Event Planning & Project Management</li>
                  </ul>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex justify-center text-center mb-16 md:mb-0">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl text-center">
                  Expertise<br/>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 order-3 md:order-3 flex md:justify-end text-left mt-12 md:mt-0">
                <div>
                  <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white mb-6 drop-shadow-md">
                    Soft Skills<br className="hidden md:block" /> 
                  </h3>
                  <ul className="space-y-4 text-sm lg:text-base font-medium tracking-wide text-gray-400">
                    <li>• Public Speaking (MC & Moderator)</li>
                    <li>• Leadership</li>
                    <li>• Organizational Management</li>
                    <li>• Teamwork & Collaboration</li>
                    <li>• Problem Solving</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

 {/* 🌟 COMPANIES / ORGANIZATIONS SECTION 🌟 */}
      <section className="bg-white py-24 relative z-20 overflow-hidden">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-black">
              Organizations & Companies <br className="hidden md:block"/> I've Worked With
            </h2>
          </div>
          <div className="relative flex flex-col gap-8 md:gap-12 w-full overflow-hidden">
            <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] transition-all">
              <div className="flex gap-6 md:gap-10 px-3 md:px-5 items-center justify-around min-w-[100vw] md:min-w-max">
                {[
                  { src: "/logo-unasradio.jpg", alt: "Unasradio" },
                  { src: "/logeeka.jpg", alt: "PT Logeeka" },
                  { src: "/katar01.jpg", alt: "Karang Taruna" },
                  { src: "/irmala.jpg", alt: "IRMALA" },
                  { src: "/unasfest.jpg", alt: "Unasfest" }
                ].map((logo, index) => (
                  <div key={`row1-set1-${index}`} className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
              <div className="flex gap-6 md:gap-10 px-3 md:px-5 items-center justify-around min-w-[100vw] md:min-w-max">
                {[
                  { src: "/logo-unasradio.jpg", alt: "Unasradio" },
                  { src: "/logeeka.jpg", alt: "PT Logeeka" },
                  { src: "/katar01.jpg", alt: "Karang Taruna" },
                  { src: "/irmala.jpg", alt: "IRMALA" },
                  { src: "/unasfest.jpg", alt: "Unasfest" }
                ].map((logo, index) => (
                  <div key={`row1-set2-${index}`} className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
              <div className="flex gap-6 md:gap-10 px-3 md:px-5 items-center justify-around min-w-[100vw] md:min-w-max">
                {[
                  { src: "/logo-unasradio.jpg", alt: "Unasradio" },
                  { src: "/logeeka.jpg", alt: "PT Logeeka" },
                  { src: "/katar01.jpg", alt: "Karang Taruna" },
                  { src: "/irmala.jpg", alt: "IRMALA" },
                  { src: "/unasfest.jpg", alt: "Unasfest" }
                ].map((logo, index) => (
                  <div key={`row1-set2-${index}`} className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] transition-all mt-4 md:mt-6">
              <div className="flex gap-6 md:gap-10 px-3 md:px-5 items-center justify-around min-w-[100vw] md:min-w-max">
                {[
                  { src: "/unasfest.jpg", alt: "Unasfest" },
                  { src: "/irmala.jpg", alt: "IRMALA" },
                  { src: "/katar01.jpg", alt: "Karang Taruna" },
                  { src: "/logeeka.jpg", alt: "PT Logeeka" },
                  { src: "/logo-unasradio.jpg", alt: "Unasradio" }
                ].map((logo, index) => (
                  <div key={`row2-set1-${index}`} className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-6 md:gap-10 px-3 md:px-5 items-center justify-around min-w-[100vw] md:min-w-max">
                {[
                  { src: "/unasfest.jpg", alt: "Unasfest" },
                  { src: "/irmala.jpg", alt: "IRMALA" },
                  { src: "/katar01.jpg", alt: "Karang Taruna" },
                  { src: "/logeeka.jpg", alt: "PT Logeeka" },
                  { src: "/logo-unasradio.jpg", alt: "Unasradio" }
                ].map((logo, index) => (
                  <div key={`row2-set2-${index}`} className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
              <div className="flex gap-6 md:gap-10 px-3 md:px-5 items-center justify-around min-w-[100vw] md:min-w-max">
                {[
                  { src: "/unasfest.jpg", alt: "Unasfest" },
                  { src: "/irmala.jpg", alt: "IRMALA" },
                  { src: "/katar01.jpg", alt: "Karang Taruna" },
                  { src: "/logeeka.jpg", alt: "PT Logeeka" },
                  { src: "/logo-unasradio.jpg", alt: "Unasradio" }
                ].map((logo, index) => (
                  <div key={`row2-set2-${index}`} className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 🌟 NEW INTERACTIVE PORTFOLIO SECTION 🌟 */}
      <section id="portfolio" className="relative z-20 py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            {/* Judul & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-6 md:mb-0">
                Track Record.
              </h2>
              
              {/* Kategori Filter */}
              <div className="flex flex-wrap justify-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                {/* FIX: Daftar kategori disesuaikan dengan data backend yang baru */}
                {["All Projects", "Web & App", "Design", "Event Management", "Video Editing"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`text-sm md:text-base font-bold transition-all ${
                      activeFilter === category 
                        ? "text-black border-b-2 border-black" 
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Wrapper Slider + Tombol Arrow */}
          <FadeInSection>
            <div className="relative group">
              
              {/* Tombol Kiri */}
              <button 
                onClick={scrollLeft} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 transition-all border border-gray-100 hidden md:flex"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
              </button>

              {/* Area Slider Utama */}
              {/* Area Slider Utama */}
              <div 
                ref={carouselRef} 
                // Ditambah items-center biar sejajar di tengah
                className="flex overflow-x-auto gap-6 hide-scrollbar snap-x snap-mandatory py-8 px-4 items-center" 
              >
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    // FIX: Kotak diperkecil! Dari min-w-[400px] menjadi w-[260px] md:w-[300px]
                    className="w-[260px] md:w-[300px] aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative snap-center cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex-shrink-0 border-4 border-white"
                  >
                    {/* Gambar dibiarkan object-contain dengan padding p-2 biar pas */}
                    <img src={project.image} alt={project.title} className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-500 bg-white" />
                    
                    {/* Overlay Hitam saat di-hover (Teks juga sedikit disesuaikan ukurannya) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-white/80 text-[10px] font-bold tracking-widest uppercase mb-2">{project.category}</span>
                      <h3 className="text-white font-extrabold text-lg md:text-xl leading-tight">{project.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Kanan */}
              <button 
                onClick={scrollRight} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 transition-all border border-gray-100 hidden md:flex"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
              </button>

            </div>
          </FadeInSection>
        </div>
      </section>

     

      {/* 🌟 MODAL / POP-UP DETAIL PROJECT 🌟 */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedProject(null)} // Klik background hitam untuk tutup
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()} // Mencegah klik di dalam modal ikut menutup
          >
            {/* Tombol Tutup (X) */}
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 bg-black/10 hover:bg-black text-black hover:text-white w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            {/* Gambar Modal */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-gray-100">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
            </div>

            {/* Konten Text Modal */}
            <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
              <span className="text-xs font-black tracking-widest text-gray-400 uppercase mb-3">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-black">
                {selectedProject.title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {selectedProject.description}
              </p>
              
              <div className="mt-auto">
                <span className="block text-sm text-gray-500 font-medium mb-2">My Role / Position</span>
                <div className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide">
                  {selectedProject.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contact" className="bg-black text-white relative z-20 border-t-[3px] border-white">
        <FadeInSection>
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest">Get In Touch</h2>
            <p className="text-gray-400 mb-8">Open for collaboration opportunities in web development, design projects, and professional MC offers.</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 font-medium">
              <a href="mailto:nazhifalhuwaidie12@gmail.com" className="hover:text-gray-300 transition">nazhifalhuwaidie12@gmail.com</a>
              <span className="hidden md:inline text-gray-700">|</span>
              <a href="https://wa.me/6281511591083" className="hover:text-gray-300 transition">+62-815-1159-1083</a>
              <span className="hidden md:inline text-gray-700">|</span>
              <a href="https://instagram.com/nazhifalhu" target="_blank" className="hover:text-gray-300 transition">@nazhifalhu</a>
            </div>
            <div className="mt-16 text-sm text-gray-600">© {new Date().getFullYear()} Nazhif Alhuwaidie. All rights reserved.</div>
          </div>
        </FadeInSection>
      </footer>
    </div>
  );
}