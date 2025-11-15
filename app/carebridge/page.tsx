'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Play, LogIn, Globe, Palette, Heart, MapPin, BookOpen, Type, Download, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BookDemo from '@/components/BookDemo';
import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

// Custom Header Component
function CustomHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isCarePage = pathname === '/carebridge';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-28 md:w-32 h-8 relative">
              <Image
                src={isCarePage ? "/sciocare_light.png" : "/logo.png"}
                alt="ScioCare Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

            {/* Sign In Button */}
            <div>
              <Button
                variant="outline"
                className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10"
                onClick={() => setIsDialogOpen(true)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sign In Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsDialogOpen(false)}>
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Sign In</h3>
            <p className="text-gray-600 mb-6">Choose how you&apos;d like to sign in</p>
            
            <div className="space-y-3">
              <Link href="/auth/login" className="w-full">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark">
                  Sign In to Your Account
                </Button>
              </Link>
              
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
            
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section Component
function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        >
          <source
            src="/hero_video.mp4"
            type="video/mp4"
          />
        </video>
        {/* Enhanced Mobile-friendly Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 via-transparent to-brand-orange/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Title */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 animate-fade-in">
            <h1 className="display mb-6 text-4xl md:text-6xl text-white md:!leading-[5rem] leading-[3rem] font-bold">
              The Language of Care, made simple!
            </h1>
            
            {/* Description */}
            <p className="lead max-w-3xl mx-auto mb-8 text-white/90 text-lg">
              Learn the English you&apos;ll actually use in hospitals—practice real clinical conversations, patient interactions, and professional communication with confidence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 mb-12 sm:mb-16 animate-fade-in">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 text-base h-12 px-8 rounded-full font-medium transition-all group"
              >
                Get Started 
                <ArrowRight className="opacity-0 scale-0 -mr-6 group-hover:opacity-100 group-hover:scale-100 group-hover:mr-0 group-hover:ml-2 h-4 w-4 transition-all duration-300" />
              </Button>
            </Link>
            <a href="#games">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/80 hover:text-gray-900 hover:border-white text-base h-12 px-8 rounded-full font-medium transition-all group"
              >
                <Play className="opacity-0 scale-0 -ml-6 group-hover:opacity-100 group-hover:scale-100 group-hover:ml-0 group-hover:mr-2 h-4 w-4 fill-current transition-all duration-300" />
                Try Now
              </Button>
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto px-4 animate-fade-in">
            {[
              { number: '400+', label: 'Learning Videos' },
              { number: '200+', label: 'Revision Games' },
              { number: 'IELTS & OET', label: 'Aligned' }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group">
                <CardContent className="p-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 translate-y-full transform transition-transform duration-300 group-hover:translate-y-0" />
                  <div className="relative">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Revision Problems Section
interface ProblemItem {
  id: string;
  description: string;
  emoji: string;
  bgColor: string;
}

const problemItems: ProblemItem[] = [
  {
    id: 'general',
    description: 'First-year English courses are often too general and don\'t prepare students for real hospital communication.',
    emoji: '📚',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'speaking',
    description: 'Students learn the theory but struggle to speak confidently with patients and staff.',
    emoji: '😕',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'writing',
    description: 'Writing reports, notes, and handovers is difficult without medical-focused language practice.',
    emoji: '✍️',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 'opportunities',
    description: 'Many capable students miss global opportunities—not because of skill, but because of English.',
    emoji: '🌍',
    bgColor: 'bg-purple-100',
  },
];

function RevisionProblems() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-red-50 rounded-full border border-red-100 mb-4 md:mb-6">
            <span className="text-lg md:text-xl">�</span>
            <span className="text-xs md:text-sm font-medium text-red-700">The Challenge</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-gray-900 px-4">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">
              Is English Becoming a Barrier?
            </span>
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Problems */}
          <motion.div 
            className="space-y-3 md:space-y-4 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {problemItems.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="">
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* Emoji Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl ${item.bgColor} flex items-center justify-center text-xl md:text-2xl`}>
                        {item.emoji}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed font-medium text-sm md:text-base lg:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Image with Blob Effect */}
          <motion.div 
            className="relative flex justify-center items-center order-1 lg:order-2"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Blob container */}
            <div className="relative w-96 h-96">
              {/* Animated blob shape background */}
              <motion.div
                className="absolute inset-0 z-10"
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70%/60% 30% 70% 40%",
                    "30% 60% 70% 40%/50% 60% 30% 60%",
                    "60% 40% 30% 70%/60% 30% 70% 40%"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  background: "linear-gradient(45deg, rgba(164, 199, 255, 0.7), rgba(147, 197, 253, 0.8))"
                }}
              />
              
              {/* Image positioned to overflow blob */}
              <div className="absolute -inset-16 z-20">
                <Image
                  src="https://sprints.sciolabs.in/_next/image?url=%2F5.png&w=1200&q=95"
                  alt="Stressed student struggling with traditional revision methods"
                  width={600}
                  height={400}
                  className="object-contain w-full h-full scale-110"
                  priority
                  quality={95}
                  onError={(e) => {
                    console.log('Image load error');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom transition element */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-full border border-orange-200">
            <span className="text-base font-medium text-orange-700">But it doesn&apos;t have to be this way...</span>
            <motion.span 
              className="text-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💡
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// CareBridge Promise Section
function CareBridgePromise() {
  const promises = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'IELTS & OET Aligned',
      description: 'Builds the communication skills needed for professional and global healthcare settings.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: '🎮',
      title: 'Learn the Play Way',
      description: 'Gamified revision activities make practice engaging, memorable, and stress-free.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: '📚',
      title: 'Self-Paced Learning Portal',
      description: 'Access lessons anytime—review, practice, and improve at your own pace.',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: '💬',
      title: 'Skill-Focused Training',
      description: 'Step-by-step practice to speak confidently and write clearly in clinical contexts.',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Workbook-First Design',
      description: 'A structured workbook with QR-linked video lessons to guide and track progress.',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      icon: '🏥',
      title: 'Healthcare-Focused Curriculum',
      description: 'Covers exactly the language used in wards, handovers, patient care, and documentation.',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium text-gray-600">The Solution</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text">
              The CareBridge Promise
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We understand that English can feel overwhelming in clinical settings. That&apos;s why CareBridge English makes communication simple, practical, and confidence-building—so students feel ready for real hospital life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-2xl ${promise.bgColor} flex items-center justify-center mb-4`}>
                  {typeof promise.icon === 'string' ? (
                    <span className="text-4xl">{promise.icon}</span>
                  ) : (
                    <div className={promise.iconColor}>{promise.icon}</div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{promise.title}</h3>
                <p className="text-gray-600">{promise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Games Data (shortened for file size)
interface GameData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: React.ReactNode;
  iframe: {
    src: string;
    width: number;
    height: number;
    allow?: string;
  };
  color: string;
}

const gamesData: GameData[] = [
  {
    id: 'countries',
    title: 'Countries & Capitals',
    description: 'Match the countries with their capitals before time runs out!',
    category: 'Geography',
    difficulty: 'Medium',
    icon: <Globe className="w-5 h-5" />,
    iframe: {
      src: 'https://wordwall.net/embed/play/97069/953/922',
      width: 500,
      height: 380,
    },
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'colors',
    title: 'Colour Search',
    description: 'Find the names of the colours hidden in this wordsearch grid.',
    category: 'Vocabulary',
    difficulty: 'Easy',
    icon: <Palette className="w-5 h-5" />,
    iframe: {
      src: 'https://www.educaplay.com/game/25247811-color_quest_word_search.html',
      width: 795,
      height: 690,
      allow: 'fullscreen; autoplay; allow-top-navigation-by-user-activation',
    },
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'emotions',
    title: 'Emotions',
    description: 'Can you rearrange the words and find the names of emotions?',
    category: 'Social Learning',
    difficulty: 'Easy',
    icon: <Heart className="w-5 h-5" />,
    iframe: {
      src: 'https://wordwall.net/embed/play/97070/887/862',
      width: 500,
      height: 380,
    },
    color: 'from-blue-500 to-orange-500',
  },
  {
    id: 'cities',
    title: 'Indian Cities',
    description: 'Guess the names of these cities using the clues given.',
    category: 'Geography',
    difficulty: 'Medium',
    icon: <MapPin className="w-5 h-5" />,
    iframe: {
      src: 'https://wordwall.net/embed/play/97070/306/480',
      width: 500,
      height: 380,
    },
    color: 'from-orange-600 to-orange-700',
  },
  {
    id: 'verbs',
    title: 'Irregular Verbs',
    description: 'Test your English skills by hitting the moles, the irregular verbs!',
    category: 'Language',
    difficulty: 'Hard',
    icon: <BookOpen className="w-5 h-5" />,
    iframe: {
      src: 'https://wordwall.net/embed/play/97071/185/784',
      width: 500,
      height: 380,
    },
    color: 'from-blue-700 to-blue-800',
  },
  {
    id: 'speech',
    title: 'Adjectives or Adverbs',
    description: 'Is it an adjective or an adverb, or both?',
    category: 'Language',
    difficulty: 'Medium',
    icon: <Type className="w-5 h-5" />,
    iframe: {
      src: 'https://www.educaplay.com/game/25247848-noun_adjective_adverb_sentences.html',
      width: 795,
      height: 690,
      allow: 'fullscreen; autoplay; allow-top-navigation-by-user-activation',
    },
    color: 'from-orange-500 to-blue-600',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Hard':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

// Try Games Section
function TryGamesSection() {
  return (
    <section id="games" className="py-24 bg-gradient-to-b from-green-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
            <Play className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-medium text-gray-600">Interactive Learning</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text">
              Try Our Games
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            CareBridge revision is built on games. Jump in and explore! Play a few sample games to check your English levels — quick, fun, and easy.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="countries" className="w-full">
            {gamesData.map((game) => (
              <TabsContent key={game.id} value={game.id} className="mt-8">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden gap-0">
                  <CardHeader className={`bg-gradient-to-r ${game.color} text-white relative overflow-hidden pt-8`}>
                    <div className="absolute inset-0 bg-white/10 bg-grid-pattern" />
                    
                    <div className="relative">
                      <div className="flex justify-center mb-6">
                        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl p-2 h-auto">
                          {gamesData.map((gameTab) => (
                            <TabsTrigger
                              key={gameTab.id}
                              value={gameTab.id}
                              className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl data-[state=active]:bg-white/30 data-[state=active]:shadow-sm transition-all duration-200 group min-h-[80px] text-center"
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 group-data-[state=active]:bg-white/40 transition-colors">
                                <div className="text-white/80 group-data-[state=active]:text-white transition-colors">
                                  {gameTab.icon}
                                </div>
                              </div>
                              <span className="text-xs font-medium text-white/80 group-data-[state=active]:text-white leading-tight">
                                {gameTab.title}
                              </span>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-4 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                              <Badge variant="secondary" className={`${getDifficultyColor(game.difficulty)} border text-sm py-1 px-2`}>
                                {game.difficulty}
                              </Badge>
                              <p className="text-white/90 text-sm font-medium">
                                {game.category}
                              </p>
                            </div>
                            <p className="text-white/90 text-xl md:text-xl leading-relaxed mx-auto max-w-2xl">
                              {game.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="w-full h-[600px]">
                      <iframe
                        src={game.iframe.src}
                        frameBorder="0"
                        allowFullScreen
                        allow={game.iframe.allow}
                        className="w-full h-full"
                        style={{ minHeight: '600px' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

// Start Your Journey Section
function StartJourneySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Start Your Journey</Badge>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Begin Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            CareBridge English is currently offered through partnered institutions. If your college would like to make this program available to your students, you can get in touch with us. Sign up through the interest form to schedule a demo or curriculum walkthrough.
          </p>

          {/* Brochure Download Section */}
          <div className="mb-12">
            <div className="inline-flex flex-col items-center gap-4 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-900">Explore our curriculum</p>
                  <p className="text-sm text-gray-600">Download our brochure for more details</p>
                </div>
              </div>
              <a href="/CareBridge_Brochure.pdf" download className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto text-white group shadow-md hover:shadow-lg transition-all" 
                  style={{ backgroundColor: '#2d5296' }}
                >
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Download Brochure
                </Button>
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            {/* Already a Student */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex-1 w-full border border-gray-100">
              <p className="text-gray-700 mb-4 font-medium">Are you already a <br/>Student?</p>
              <Link href="/auth/login">
                <Button className="w-full text-white group relative justify-center" style={{ backgroundColor: '#2d5296' }}>
                  <span className="group-hover:mr-6 transition-all duration-200">Sign In</span>
                  <LogIn className="absolute right-4 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Button>
              </Link>
            </div>

            {/* I'm Interested */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex-1 w-full border border-gray-100">
              <p className="text-gray-700 mb-4 font-medium">Want to bring this to your<br />institution?</p>
              <BookDemo>
                <Button className="w-full text-white group relative justify-center" style={{ backgroundColor: '#f99f1b' }}>
                  <span className="group-hover:mr-6 transition-all duration-200">I&apos;m Interested</span>
                  <ArrowRight className="absolute right-4 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Button>
              </BookDemo>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'What is CareBridge English?',
      answer: 'CareBridge English is a comprehensive healthcare English learning program designed specifically for nursing students. It combines workbook-based lessons with video support and gamified practice tools to help you master clinical English communication.'
    },
    {
      question: 'How does the program work?',
      answer: 'The program follows a workbook-first approach with QR-coded video support. Students work through structured lessons covering Listening, Speaking, Reading, and Writing skills, then practice using gamified tools on our digital platform.'
    },
    {
      question: 'Is the program IELTS & OET aligned?',
      answer: 'Yes! CareBridge English builds the communication skills needed for professional and global healthcare settings, including IELTS and OET exam preparation.'
    },
    {
      question: 'How long do I have access to the platform?',
      answer: 'All students get one year of platform access from the date of enrollment. You can access the digital revision portal and practice games throughout this period.'
    },
    {
      question: 'Will I receive a certificate?',
      answer: 'Yes! Upon successful completion of the program, you will receive a digital certificate recognizing your achievement in healthcare English communication.'
    },
    {
      question: 'Can institutions customize the program?',
      answer: 'Yes! We offer custom plans for institutions with specific needs. Contact us at info@sciolabs.in to discuss tailored solutions for your nursing college.'
    }
  ];

  return (
    <section className="py-20 bg-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">FAQs</Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text">
              Frequently Asked Questions
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about CareBridge English
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="space-y-4">
            <Accordion type="single" collapsible>
              {faqs.slice(0, 3).map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 border-gray-200 rounded-lg px-6 hover:border-blue-300 transition-colors bg-white !border-b-2 mb-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible>
              {faqs.slice(3).map((faq, index) => (
                <AccordionItem 
                  key={index + 3} 
                  value={`item-${index + 3}`}
                  className="border-2 border-gray-200 rounded-lg px-6 hover:border-blue-300 transition-colors bg-white !border-b-2 mb-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function CareBridgePage() {
  return (
    <div className="min-h-screen bg-white">
      <CustomHeader />
      <Hero />
      <RevisionProblems />
      <CareBridgePromise />
      <TryGamesSection />
      <StartJourneySection />
      <FAQSection />
      <Footer />
    </div>
  );
}
