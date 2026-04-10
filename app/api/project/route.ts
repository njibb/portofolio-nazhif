import { NextResponse } from 'next/server';

const projectsData = [
  { id: 1, title: "Islamic Resource & Prayer App", 
    category: "Web & App", 
    image: "/aplikasirawi.png", 
    images: ["/aplikasirawi.png", "/aplikasirawi2.png","/aplikasirawi3.png","/aplikasirawi4.png","/aplikasirawi5.png","/aplikasirawi6.png"], 
    description: "A comprehensive mobile application providing accurate prayer schedules and a rich library of Islamic literature including Simtuddurror, Barzanji, and Diba'.", role: "Mobile Developer" },
  { id: 2, title: "Unasradio Official Web", category: "Web & App", image: "/unasradio1.png", images: ["/unasradio1.png","/unasradio2.png","/unasradio3.png","/unasradio4.png","/unasradio5.png","/unasradio6.png","/unasradio7.png","/unasradio8.png","/unasradio9.png"], 
    description: "The primary digital platform for Unasradio, designed to facilitate live online broadcasting and showcase program schedules.", role: "Front-End Developer" },
  { id: 3, title: "Rentashot Platform", category: "Web & App", image: "/rentashot1.png", images: ["/rentashot1.png","/rentashot2.png","/rentashot3.png","/rentashot4.png","/rentashot5.png","/rentashot6.png","/rentashot7.png","rentashot8.png"], description: "A specialized digital platform built for a photography equipment rental service with a seamless booking flow.", role: "Web Developer" },
  { id: 4, title: "Cyber Security Seminar", 
    category: "Public Speaker",
     image: "/mcseminarcyber1.png", 
     images: ["/mcseminarcyber1.png","/mcseminarcyber2.png"],
     description: "Served as the main moderator for an intensive Cyber Security Seminar hosted by Karang Taruna Cilandak Barat.", 
     role: "Moderator" },
  { id: 5, title: "Comparative Study Event", category: "Public Speaker", image: "/mcupn.png", images: ["/mcupn.png","/mcupn1.png","/mcupn2.png"], description: "Acted as the Master of Ceremony for the collaborative comparative study event between Unasradio and Fortyfive UPN.", role: "Master of Ceremony" },
  { id: 6, title: "Unasradio Brand Identity", category: "Design", image: "/design-unasradio.jpg", description: "Redesigned the core visual identity and social media templates for Unasradio to appeal to a modern student demographic.", role: "Creative" },
  { id: 7, title: "Story Frame Pelatihan & Sharing Session Unas Radio", category: "Design", image: "/storyframepelatihanradio.png", description: "Redesigned the core visual identity and social media templates for Unasradio", role: "Creative" },
  { id: 8, title: "Banner Paskibra Bumantara", category: "Design", image: "/Banner_aangggggg.jpg", description: "Designed a professional event banner for Paskibra Bumantar, focusing on visual impact and organizational branding.", role: "Freelance Graphic Designer" },
  { id: 9, title: "Instagram Feedss Bracelet Store", category: "Design", image: "/BRACELET.jpg", images: ["/BRACELET.jpg", "/GELANG COUPLE.jpg"], description: "Visual Branding: Instagram Feed Design for a Handmade Bracelet Business.", role: "Freelance Graphic Designer" },
  { id: 10, title: "JIB airlines logo (personal project)", category: "Design", image: "/JIB airlines.png", description: "Brand Identity Design: Concept Logo for an Airline Ticketing Service (Academic Project).", role: "Freelance Graphic Designer" },
  { id: 11, title: "Cover Podcast Spotify Kisah Kasih Krisis", category: "Design", image: "/kkk.png", description: "Visual Identity: Podcast Cover Art for 'Kisah Kasih Krisis' (Stories of Love & Crisis).", role: "Vice Head of Division Creative UnasRadio" },
  { id: 12, title: "Event Highlight Reel", category: "Video Editing", image: "/video-highlight.jpg", description: "Edited dynamic highlight reels for various campus events, focusing on high-energy pacing and engaging visual transitions.", role: "Video Editor" },
  { id: 13, title: "Event Highlight Reel", category: "Video Editing", image: "/video-highlight.jpg", description: "Edited dynamic highlight reels for various campus events, focusing on high-energy pacing and engaging visual transitions.", role: "Video Editor" },
  { id: 14, title: "Agility Wear", 
    category: "Web & App",
     image: "/agility1.png", 
     images: ["/agility1.png","/agility2.png","/agility3.png","/agility4.png","/agility5.png","/agility6.png","/agility7.png","/agility8.png","/agility9.png","/agility10.png"],
     description: "Agility Wear Web Project: A custom-built web application designed for browsing and purchasing athletic equipment.", 
     role: "Personal Project" },
     { id: 15, title: "Logeeka Dashboard", 
    category: "Web & App",
     image: "/logeeka.png", 
     images: ["/logeeka2.png","/logeeka3.png","/logeeka4.png","/logeeka5.png","/logeeka6.png","/logeeka7.png","/logeeka8.png","/logeeka9.png"],
     description: "Logeeka Internal Systems: Admin Dashboard Development & Optimization.", 
     role: "Website Developer" },
];

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "Data portofolio berhasil diambil!",
    data: projectsData
  });
}