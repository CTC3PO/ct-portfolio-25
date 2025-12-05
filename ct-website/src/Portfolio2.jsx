import React, { useState, useEffect } from 'react';
import { Github, Linkedin, FileText, Mail, ExternalLink, ChevronDown, Menu, X, User, Code, MessageCircle, Moon, Sun, Send } from 'lucide-react';

// Import the custom hook (you'll need to create this file)
import { useTheme } from './use_theme_hook';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Use the custom theme hook
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Hello Chau,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`;
    const mailtoLink = `mailto:chautrancmt26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    setFormData({ name: '', email: '', message: '' });
  };

  const projects = [
    {
      title: "Planning Housing Explorer",
      description: "A 3D web app to explore and communicate NYC Department of City Planning's City of Yes initiative. Built with Three.js.",
      tech: ["React", "Three.js", "Node.js", "MongoDB"],
      github: "https://github.com/CTC3PO/planning-housing-tool",
      live: "https://cif-ud-project.vercel.app/",
      image: "./images/housing-project.png",
      featured: true
    },
    {
      title: "Food Nutri-score Prediction",
      description: "A machine learning project that combines Open Food Facts data (1M rows) and World bank data to predict and recommend nutri-score system adoption globally.",
      tech: ["pandas", "scikit-learn", "Jupyter notebook"],
      github: "https://github.com/CTC3PO/ml-nutri-score-prediction",
      image: "./images/projects/food-project.png",
      featured: true
    },

    {
      title: "Pacman Q-Learning Agent",
      description: "A reinforcement learning agent that learns to play Pacman through Q-learning and feature extraction. The agent can navigate grids, avoid ghosts and collect dots efficiently.",
      tech: ["Python","AI", "Reinforcement Learning"],
      github: "(private)",
      image: "./images/projects/ai-pacman-2.gif" ,
      featured: true
    },

    {
      title: "Project Management Site",
      description: "A collaboration app that allows multiple users to log in, sign up and track and sort projects by categories.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/CTC3PO/react-project-management-site",
      live: "https://project-management-site-woof.netlify.app",
      image: "./images/projects/drawing-13-edit.png",
      featured: true
    },
    {
      title: "CocktailCraft - Recipe Discovery App",
      description: "A responsive web application integrating APIs to display 11,000+ cocktail recipes",
      tech: ["React", "API Integration", "CSS", "JavaScript"],
      github: "https://github.com/CTC3PO/react-projects-cocktail-database",
      live: "https://react-cocktail-db-app.netlify.app/",
      image: "https://images.reactbricks.com/src_set/342e8e70-9e9d-43e5-9271-3dfba38a7c06-1600/dashboard.webp",
      featured: false
    }
,
    
  ];

  const skills = [
    "Python", "Java", "C++", "JavaScript", "React", "Next.js", "Node.js", 
    "Machine learning libraries", "scikit-learn", "Pytorch", 
    "SQL", "MongoDB", "AWS", "Docker", "Git"
  ];

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? `${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md shadow-lg` 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 hover:text-blue-600 ${
                    activeSection === section 
                      ? 'text-blue-600' 
                      : isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {section}
                </button>
              ))}
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className={`md:hidden absolute top-full left-0 w-full ${
              isDark ? 'bg-gray-900/95' : 'bg-white/95'
            } backdrop-blur-md shadow-lg`}>
              <div className="flex flex-col space-y-4 p-6">
                {['home', 'about', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-left hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-1 shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
              <img 
                src="/images/profile.jpg"
                alt="Chau Tran"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-700 to-teal-700 bg-clip-text text-transparent">
            Chau Tran
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-600 font-medium">
            Full Stack Developer
          </p>
          <p className={`text-lg mb-12 max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Full-stack developer specializing in modern web technologies,
             while actively exploring machine learning and big data to build
             more intelligent solutions.
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a 
              href="https://github.com/CTC3PO" 
              className={`hover:text-blue-600 transition-all duration-300 transform hover:scale-110 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://www.linkedin.com/in/chautrancmt26/" 
              className={`hover:text-blue-600 transition-all duration-300 transform hover:scale-110 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="https://drive.google.com/file/d/1uaL0LFCOBYeQz_msJmNknh_LLQ68v4ie/view?usp=drive_link" 
              className={`hover:text-blue-600 transition-all duration-300 transform hover:scale-110 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
            >
              <FileText size={28} />
            </a>
            <a 
              href="mailto:chautrancmt26@gmail.com" 
              className={`hover:text-blue-600 transition-all duration-300 transform hover:scale-110 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              aria-label="Email"
            >
              <Mail size={28} />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-white shadow-lg hover:shadow-xl"
          >
            View My Work
          </button>
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className={`mx-auto ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 ${isDark ? 'bg-gray-800/20' : 'bg-white/50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-700 flex items-center">
                <User className="mr-3" size={24} />
                My Story
              </h3>
              <div className="space-y-6">
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  I'm a full-stack developer with a unique background in urban planning at the NYC
                   Department of City Planning, now pursuing a Master's in Information Technology
                    at the University of Pennsylvania. My technical focus spans modern web
                     development and machine learning, where I enjoy solving complex problems
                      through code and data.
                </p>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  When not coding, I explore new tech trends, practice urban sketching,
                   and enjoy outdoor adventures with my Australian cattle dog.
                </p>

              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-700 flex items-center">
                <Code className="mr-3" size={24} />
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/40' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-6 ${isDark ? '' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6"></div>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Here are some of my recent projects that showcase my skills and passion for development
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 mb-12">
            {/* First 3 projects */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.slice(0, 3).map((project) => (
                <div
                  key={project.title}
                  className={`rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 hover:shadow-blue-500/10' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {project.title}
                    </h3>
                    <p className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDark 
                              ? 'bg-blue-900/30 text-blue-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        className={`flex items-center text-sm hover:text-blue-600 transition-colors duration-300 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                      <a
                        href={project.live}
                        className={`flex items-center text-sm hover:text-blue-600 transition-colors duration-300 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional projects in pairs */}
            {showAllProjects && displayedProjects.length > 3 && (
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {displayedProjects.slice(3).map((project) => (
                  <div
                    key={project.title}
                    className={`rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 hover:shadow-blue-500/10' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {project.title}
                      </h3>
                      <p className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDark 
                                ? 'bg-blue-900/30 text-blue-300' 
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        <a
                          href={project.github}
                          className={`flex items-center text-sm hover:text-blue-600 transition-colors duration-300 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                        <a
                          href={project.live}
                          className={`flex items-center text-sm hover:text-blue-600 transition-colors duration-300 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Show More/Less Button */}
          {projects.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-white"
              >
                {showAllProjects ? 'Show Less' : `Show All Projects (${projects.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-gray-800/20' : 'bg-white/50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6"></div>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-700 flex items-center">
                <MessageCircle className="mr-3" size={24} />
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <Mail className="mr-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <a 
                    href="mailto:chautrancmt26@gmail.com"
                    className={`hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    chautrancmt26@gmail.com
                  </a>
                </div>
                <div className="flex items-center group">
                  <Github className="mr-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <a 
                    href="https://github.com/CTC3PO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    github.com/CTC3PO
                  </a>
                </div>
                <div className="flex items-center group">
                  <Linkedin className="mr-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <a 
                    href="https://www.linkedin.com/in/chautrancmt26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    linkedin.com/in/chautrancmt26
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your Name"
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-500'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Your Email"
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-500'
                    }`}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Your Message"
                    required
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-500'
                    }`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-white w-full flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;