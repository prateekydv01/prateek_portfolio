import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Mail, Phone, MapPin, ExternalLink, Code, ChevronDown, Menu, X } from 'lucide-react';

const SpacePortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const [formErrors, setFormErrors] = useState({});

  // Image error handler
  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  // Helper function to check if demo link is valid
  const isValidDemoLink = (demoUrl) => {
    return demoUrl && 
           demoUrl.trim() !== '' && 
           demoUrl !== '#' && 
           demoUrl.toLowerCase() !== 'none' &&
           demoUrl.startsWith('http');
  };

  // Enhanced stars animation effect with reduced opacity
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-40 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 4 + 3}s`
          }}
        />
      );
    }
    return stars;
  };

  // Fixed scroll-based section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Contact form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } 
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY); 
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, isSubmitted: false }));
        }, 5000);
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: 'Failed to send message. Please try again.' 
      });
    }
  };

  // Updated projects with conditional demo links
  const projects = [
    {
      id: 2,
      title: "Smart India Hackathon Project",
      description: "Civic complaint management system with admin dashboards, municipality management, complaint tracking, and location-based services. Features user authentication, file uploads, and priority systems.",
      image: "http://res.cloudinary.com/dxeri7eq3/image/upload/v1758752239/cjw5w2hu5l9b1p0os9sj.png",
      imageAlt: "Smart India Hackathon civic complaint management system",
      skills: ["MERN Stack", "Google Maps API", "3d-Models"],
      github: "hhttps://github.com/JanConnect/",
      demo: null // No demo link available - button will be hidden
    },
    
    {
      id: 1,
      title: "Blog Posting Platform",
      description: "Developed a blog posting web application using the MERN stack with full CRUD functionality. Implemented features to create, update, and manage posts with active/inactive status for better content control",
      image: "http://res.cloudinary.com/dxeri7eq3/image/upload/v1758752133/bmmcvvmmf1exerkjyl1o.png",
      imageAlt: "Blog posting platform screenshot showing the main interface",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/prateekydv01/blogsite",
      demo: "https://blogsite-frontend-9wke.vercel.app/" // Valid demo link
    },
    {
      id: 3,
      title: "8 Mini JS projects",
      description: "Built 8 projects with HTML, CSS & JavaScript to strengthen DOM manipulation and JavaScript fundamentals, including calculator, todo app, weather app, cart, banner, tracker, text counter, and food order",
      image: "/images/projects/bl",
      imageAlt: "Blog posting platform screenshot showing the main interface",
      skills: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/prateekydv01/mini-javascript-projects",
    },
    
    
  ];

  const skills = [
    "React", "Node.js", "Express.js", "MongoDB", 
    "JavaScript", "Tailwind CSS", "Git & GitHub", "Python", "C++"
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden relative">
      {/* Enhanced Animated Space Background - DARKER */}
      <div className="fixed inset-0 z-0">
        {/* Stars with reduced opacity */}
        <div className="absolute inset-0">{generateStars()}</div>
        
        {/* Enhanced Solar System with Single Jupiter Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central Sun - Enhanced */}
          <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-40 blur-sm animate-pulse shadow-2xl shadow-orange-400/30">
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-60 animate-ping" style={{animationDuration: '3s'}}></div>
          </div>
          
          {/* Mercury - Small, rocky planet */}
          <div className="absolute w-48 h-48 border border-gray-500/20 rounded-full animate-spin" style={{animationDuration: '15s'}}>
            <div className="absolute -top-2 left-1/2 w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transform -translate-x-1/2 shadow-lg shadow-gray-400/40">
              <div className="absolute inset-0.5 rounded-full bg-gray-500 opacity-80"></div>
            </div>
          </div>
          
          {/* Venus - Bright, yellowish planet */}
          <div className="absolute w-64 h-64 border border-yellow-400/15 rounded-full animate-spin" style={{animationDuration: '25s'}}>
            <div className="absolute -top-3 left-1/2 w-5 h-5 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-yellow-400/50">
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-90"></div>
            </div>
          </div>
          
          {/* Earth - Blue and green with atmosphere */}
          <div className="absolute w-80 h-80 border border-blue-400/15 rounded-full animate-spin" style={{animationDuration: '35s'}}>
            <div className="absolute -top-4 left-1/2 w-6 h-6 bg-gradient-to-r from-blue-400 to-green-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-blue-400/50">
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-blue-300 via-green-300 to-blue-400 opacity-90"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-t from-green-200 to-blue-200 opacity-60"></div>
            </div>
          </div>
          
          {/* Mars - Red planet */}
          <div className="absolute w-96 h-96 border border-red-400/12 rounded-full animate-spin" style={{animationDuration: '45s'}}>
            <div className="absolute -top-3 left-1/2 w-4 h-4 bg-gradient-to-r from-red-400 to-orange-600 rounded-full transform -translate-x-1/2 shadow-lg shadow-red-400/50">
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-red-300 to-red-500 opacity-90"></div>
            </div>
          </div>
          
          {/* Jupiter - Large gas giant with CLEAN SINGLE ring */}
          <div className="absolute w-112 h-112 border border-orange-300/10 rounded-full animate-spin" style={{animationDuration: '60s'}}>
            {/* Jupiter Planet */}
            <div className="absolute -top-5 left-1/2 w-8 h-8 bg-gradient-to-r from-orange-300 to-yellow-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-orange-400/40">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-orange-200 via-yellow-300 to-orange-400 opacity-90"></div>
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-t from-amber-300 to-orange-200 opacity-70"></div>
            </div>
          </div>
          
          {/* Single Jupiter Ring - Clean and Elegant */}
          <div className="absolute w-112 h-112 flex items-center justify-center">
            <div 
              className="w-20 h-20 border-2 border-amber-300/20 rounded-full animate-spin"
              style={{
                animationDuration: '50s',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)'
              }}
            ></div>
          </div>
        </div>
        
        {/* DARKER Distant Galaxies with Purple/Pink theme */}
        <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 opacity-10 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/10 w-52 h-52 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-5 blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* DARKER Nebula Effect with Purple/Pink colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5"></div>
        
        {/* DARKER Cosmic Dust with varied Purple/Pink colors */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-violet-300 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-fuchsia-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/6 right-1/2 w-1 h-1 bg-violet-400 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-fuchsia-300 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-1/6 right-1/5 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '3.5s'}}></div>
        </div>
      </div>

      {/* DARKER Header with adjusted font colors */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Prateek Yadav
            </div>
            
            {/* Desktop Navigation - Lightened text */}
            <nav className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-violet-400 ${
                    activeSection === item ? 'text-violet-400' : 'text-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href="#"
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full hover:from-violet-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg text-white"
              >
                Resume
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu - Lightened text */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-4">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block capitalize text-gray-200 hover:text-violet-400 transition-colors"
                >
                  {item}
                </button>
              ))}
              <a
                href="#"
                className="inline-block px-6 py-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full hover:from-violet-700 hover:to-pink-700 transition-all duration-300 font-medium text-white"
              >
                Resume
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Home Section - Adjusted text colors */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center px-6 max-w-5xl mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Welcome to Prateek's Universe
              </h1>
              <div className="space-y-4 mb-8">
                <p className="text-xl md:text-2xl text-gray-200">
                  Exploring the infinite possibilities of code and creativity
                </p>
                <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Crafting digital experiences with modern web technologies, passionate about creating innovative solutions in the  full stack development ecosystem
                </p>
              </div>
              
              {/* Tech Stack Highlight - Adjusted colors */}
              <div className="mb-8">
                <p className="text-sm text-gray-200 mb-3">Specializing in</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'].map((tech, index) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-full border border-violet-400/30 text-violet-300"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              <a
                href="https://www.linkedin.com/in/prateek-yadav-b0b278310/"
                target='_blank'
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/prateekydv01"
                target='_blank'
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.instagram.com/prateekydv__/"
                target='_blank'
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* Dulled Scroll Button - Adjusted text */}
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce p-3 rounded-full bg-gray-700/40 backdrop-blur-sm border border-gray-500/40 hover:bg-gray-600/50 hover:border-gray-400/50 transition-all duration-300"
            >
              <ChevronDown size={24} className="text-gray-300" />
            </button>
          </div>
        </section>

        {/* About Section - Adjusted text colors */}
        <section id="about" className="min-h-screen py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-200 leading-relaxed">
                  I'm a 2nd year Engineering student in <span className="text-violet-400 font-semibold">computer science</span> with a passion for 
                  <span className="text-pink-400 font-semibold"> Web Development</span>. Currently specializing in the 
                  <span className="text-violet-400 font-semibold"> MERN stack</span>, I enjoy building full-stack applications that solve real-world problems.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  My technical journey includes working with <span className="text-pink-400 font-semibold">MongoDB, Express.js, React, and Node.js</span>, along with 
                  <span className="text-violet-400 font-semibold"> Python and various libraries</span>. I'm also in the starting phase of
                  <span className="text-pink-400 font-semibold">  C++ and Data Structures & Algorithms</span>, 
                  continuously expanding my problem-solving skills and technical foundation.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-100">Skills & Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 backdrop-blur-sm text-center transition-all duration-300 hover:scale-110 hover:from-violet-500/30 hover:to-pink-500/30 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-100">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Updated with conditional demo button rendering */}
        <section id="projects" className="min-h-screen py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-violet-400/50"
                >
                  {/* Image Container with Fallback */}
                  <div className="h-48 bg-gradient-to-br from-violet-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
                    {!imageErrors[project.id] ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={() => handleImageError(project.id)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-6xl opacity-30">🚀</div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-100">{project.title}</h3>
                    <p className="text-gray-200 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-gradient-to-r from-violet-600/30 to-pink-600/30 rounded-full border border-violet-400/30 text-gray-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Conditional Button Rendering */}
                    <div className="flex gap-4">
                      {/* GitHub button - always show if github link exists */}
                      {project.github && (
                        <a
                          href={project.github}
                          target='_blank'
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-100"
                        >
                          <Code size={16} />
                          Code
                        </a>
                      )}
                      
                      {/* Demo button - only show if valid demo link exists */}
                      {isValidDemoLink(project.demo) && (
                        <a
                          href={project.demo}
                          target='_blank'
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-lg transition-all text-white"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - WORKING FORM */}
        <section id="contact" className="min-h-screen py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Contact Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Working Contact Form */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                {/* Success Message */}
                {formStatus.isSubmitted && (
                  <div className="mb-6 p-4 bg-green-600/20 border border-green-400/30 rounded-lg">
                    <p className="text-green-400 text-center">✨ Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}

                {/* Error Message */}
                {formStatus.error && (
                  <div className="mb-6 p-4 bg-red-600/20 border border-red-400/30 rounded-lg">
                    <p className="text-red-400 text-center">{formStatus.error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors text-gray-100 placeholder-gray-400 ${
                        formErrors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-violet-400'
                      }`}
                      placeholder="Your Name"
                    />
                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors text-gray-100 placeholder-gray-400 ${
                        formErrors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-violet-400'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors text-gray-100 placeholder-gray-400 ${
                        formErrors.subject ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-violet-400'
                      }`}
                      placeholder="Subject"
                    />
                    {formErrors.subject && <p className="text-red-400 text-sm mt-1">{formErrors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors resize-none text-gray-100 placeholder-gray-400 ${
                        formErrors.message ? 'border-red-400 focus:border-red-400' : 'border-gray-600 focus:border-violet-400'
                      }`}
                      placeholder="Your message..."
                    />
                    {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`w-full py-3 rounded-lg transition-all duration-300 font-medium text-white ${
                      formStatus.isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700'
                    }`}
                  >
                    {formStatus.isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      '🚀 Send Message'
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info - Adjusted text colors */}
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-100">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="text-violet-400" size={20} />
                      <span className="text-gray-200"><a href="tel:+917988365150">+91 7988365150</a></span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="text-violet-400" size={20} />
                      <span className="text-gray-200"><a href="mailto:prateekyadav2023@gmail.com">prateekyadav2023@gmail.com</a></span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="text-violet-400" size={20} />
                      <span className="text-gray-200">Rewari, Haryana</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-100">Connect with Me</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/prateek-yadav-b0b278310/"
                      target='_blank'
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://github.com/prateekydv01"
                      target='_blank'
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-110"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/prateekydv__/"
                      target='_blank'
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* DARKER Footer with adjusted text */}
      <footer className="relative z-10 bg-black/90 backdrop-blur-md border-t border-gray-700/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            © 2025 Prateek Yadav. Made with ❤️ and lots of ☕
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Crafted in the cosmic void of creativity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SpacePortfolio;
