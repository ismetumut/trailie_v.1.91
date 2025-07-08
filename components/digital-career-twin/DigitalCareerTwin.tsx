"use client";
import React, { useState } from 'react';
import TopBar from '../TopBar';
import { Plus, Sparkles, TrendingUp, Brain, Target, Star, Zap, User, Award, Settings, ChevronRight, Heart, Coffee, Code, Palette, MessageSquare, BarChart3, Globe, Camera, Music, Book, Lightbulb, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRouter } from 'next/navigation';

const DigitalCareerTwin = () => {
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [catCustomization, setCatCustomization] = useState({
    color: '#4F46E5',
    pattern: 'solid',
    accessory: 'none',
    mood: 'confident'
  });
  const { language } = useLanguage();
  const router = useRouter();

  // Tüm metinler
  const TEXT = {
    tr: {
      header: 'Dijital Kariyer İkizini',
      header2: 'Oluştur',
      desc: 'Kişilik ve uzmanlık envanterine dayalı olarak kendine özgü bir avatar oluştur',
      addSkill: 'Yetkinlik Ekle (Demo)',
      yourTwin: 'Dijital İkizin',
      personality: 'Kişilik:',
      currentRole: 'Mevcut Rol:',
      skillsTitle: 'Yetkinliklerini Ekle',
      skillsAndComp: 'Yetkinlikler',
      noSkill: 'Henüz yetkinlik seçilmedi',
      roleSuggestions: 'Rol Önerileri',
      noRole: 'Seçili yetkinliklere uygun rol önerisi bulunamadı.',
      color: 'Renk',
      mood: 'Ruh Hali',
      pattern: 'Desen',
      accessory: 'Aksesuar',
      confident: 'Güvenli',
      curious: 'Meraklı',
      focused: 'Odaklı',
      creative: 'Yaratıcı',
      solid: 'Düz',
      striped: 'Çizgili',
      spotted: 'Benekli',
      none: 'Yok',
      glasses: 'Gözlük',
      bow: 'Fiyonk',
      hat: 'Şapka',
    },
    en: {
      header: 'Create Your Digital Career',
      header2: 'Twin',
      desc: 'Create a unique avatar based on your personality and expertise inventory',
      addSkill: 'Add Skill (Demo)',
      yourTwin: 'Your Digital Twin',
      personality: 'Personality:',
      currentRole: 'Current Role:',
      skillsTitle: 'Add Your Skills',
      skillsAndComp: 'Skills & Competencies',
      noSkill: 'No skills selected yet',
      roleSuggestions: 'Role Suggestions',
      noRole: 'No suitable role suggestions for selected skills.',
      color: 'Color',
      mood: 'Mood',
      pattern: 'Pattern',
      accessory: 'Accessory',
      confident: 'Confident',
      curious: 'Curious',
      focused: 'Focused',
      creative: 'Creative',
      solid: 'Solid',
      striped: 'Striped',
      spotted: 'Spotted',
      none: 'None',
      glasses: 'Glasses',
      bow: 'Bow',
      hat: 'Hat',
    }
  };
  const t = TEXT[language];

  // Tüm roller dummy olarak burada tanımlı
  const allRoles = [
    { 
      id: 1, 
      title: 'Product Manager', 
      match: 85, 
      trend: 'rising', 
      description: 'Ürün geliştirme süreçlerini yönetir',
      tags: ['Leadership', 'Agile', 'Project Management'],
      simulation: true,
      skills: ['Project Management', 'Leadership', 'Agile']
    },
    { 
      id: 2, 
      title: 'Tech Lead', 
      match: 78, 
      trend: 'stable', 
      description: 'Teknik takımları yönetir',
      tags: ['React', 'Mentoring', 'Machine Learning'],
      simulation: false,
      skills: ['React', 'Mentoring', 'Machine Learning']
    },
    { 
      id: 3, 
      title: 'UX Designer', 
      match: 72, 
      trend: 'rising', 
      description: 'Kullanıcı deneyimi tasarlar',
      tags: ['UI/UX Design', 'Research', 'Content Creation'],
      simulation: false,
      skills: ['UI/UX Design', 'Research', 'Content Creation']
    },
    { 
      id: 4, 
      title: 'Marketing Specialist', 
      match: 68, 
      trend: 'rising', 
      description: 'Dijital pazarlama stratejileri',
      tags: ['Digital Marketing', 'SEO', 'Content'],
      simulation: false,
      skills: ['Digital Marketing', 'SEO', 'Content Creation']
    }
  ];

  // Seçili yetkinliklere göre önerilen rolleri filtrele
  const getRecommendedRoles = () => {
    if (selectedSkills.length === 0) return allRoles;
    // En çok eşleşen skill sayısına göre sıralama
    return allRoles
      .map(role => {
        const matchCount = role.skills.filter(skillName => selectedSkills.some(s => s.name === skillName)).length;
        return { ...role, matchCount };
      })
      .filter(role => role.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount || b.match - a.match);
  };

  const recommendedRoles = getRecommendedRoles();

  const skills = [
    { id: 1, name: 'React', icon: Code, category: 'Teknik', color: 'bg-blue-500' },
    { id: 2, name: 'UI/UX Design', icon: Palette, category: 'Tasarım', color: 'bg-purple-500' },
    { id: 3, name: 'Digital Marketing', icon: TrendingUp, category: 'Pazarlama', color: 'bg-green-500' },
    { id: 4, name: 'Public Speaking', icon: MessageSquare, category: 'İletişim', color: 'bg-orange-500' },
    { id: 5, name: 'Data Analysis', icon: BarChart3, category: 'Analitik', color: 'bg-indigo-500' },
    { id: 6, name: 'Project Management', icon: Target, category: 'Yönetim', color: 'bg-red-500' },
    { id: 7, name: 'Content Creation', icon: Camera, category: 'Yaratıcı', color: 'bg-pink-500' },
    { id: 8, name: 'SEO', icon: Globe, category: 'Pazarlama', color: 'bg-teal-500' },
    { id: 9, name: 'Music Production', icon: Music, category: 'Yaratıcı', color: 'bg-violet-500' },
    { id: 10, name: 'Research', icon: Book, category: 'Akademik', color: 'bg-amber-500' },
    { id: 11, name: 'Innovation', icon: Lightbulb, category: 'Strateji', color: 'bg-yellow-500' },
    { id: 12, name: 'Machine Learning', icon: Brain, category: 'Teknik', color: 'bg-cyan-500' },
    { id: 13, name: 'Leadership', icon: Star, category: 'Yönetim', color: 'bg-indigo-600' },
    { id: 14, name: 'Agile', icon: Zap, category: 'Metodoloji', color: 'bg-green-600' },
    { id: 15, name: 'Mentoring', icon: Heart, category: 'İletişim', color: 'bg-pink-600' }
  ];

  const roles = [
    { 
      id: 1, 
      title: 'Product Manager', 
      match: 85, 
      trend: 'rising', 
      description: 'Ürün geliştirme süreçlerini yönetir',
      tags: ['Leadership', 'Agile'],
      simulation: true
    },
    { 
      id: 2, 
      title: 'Tech Lead', 
      match: 78, 
      trend: 'stable', 
      description: 'Teknik takımları yönetir',
      tags: ['React', 'Mentoring'],
      simulation: false
    },
    { 
      id: 3, 
      title: 'UX Designer', 
      match: 72, 
      trend: 'rising', 
      description: 'Kullanıcı deneyimi tasarlar',
      tags: ['Design', 'Research'],
      simulation: false
    },
    { 
      id: 4, 
      title: 'Marketing Specialist', 
      match: 68, 
      trend: 'rising', 
      description: 'Dijital pazarlama stratejileri',
      tags: ['Marketing', 'Content'],
      simulation: false
    }
  ];

  const catColors = [
    { name: 'Indigo', value: '#4F46E5' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Teal', value: '#14B8A6' }
  ];

  const patterns = ['solid', 'striped', 'spotted'];
  const accessories = ['none', 'glasses', 'bow', 'hat'];
  const moods = ['confident', 'curious', 'focused', 'creative'];

  const addSkill = (skill: any) => {
    if (!selectedSkills.find(s => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillId: any) => {
    setSelectedSkills(selectedSkills.filter(s => s.id !== skillId));
  };

  const CatAvatar = ({ size = 'large' }) => {
    const sizeClasses = size === 'large' ? 'w-32 h-32 md:w-40 md:h-40' : 'w-16 h-16';
    
    return (
      <div className={`${sizeClasses} relative mx-auto`}>
        <div 
          className="w-full h-full rounded-full relative overflow-hidden shadow-lg"
          style={{ backgroundColor: catCustomization.color }}
        >
          {/* Cat face */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-4xl md:text-5xl">🐱</div>
          </div>
          {/* Pattern overlay */}
          {catCustomization.pattern === 'striped' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45"></div>
          )}
          {catCustomization.pattern === 'spotted' && (
            <div className="absolute inset-0">
              <div className="w-3 h-3 bg-white/30 rounded-full absolute top-6 left-8"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full absolute top-12 right-6"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full absolute bottom-8 left-6"></div>
            </div>
          )}
          {/* Accessories */}
          {catCustomization.accessory === 'glasses' && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-xl">👓</div>
          )}
          {catCustomization.accessory === 'bow' && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xl">🎀</div>
          )}
          {catCustomization.accessory === 'hat' && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xl">🎩</div>
          )}
          {/* Mood indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
            {catCustomization.mood === 'confident' && <span className="text-sm">💪</span>}
            {catCustomization.mood === 'curious' && <span className="text-sm">🤔</span>}
            {catCustomization.mood === 'focused' && <span className="text-sm">🎯</span>}
            {catCustomization.mood === 'creative' && <span className="text-sm">✨</span>}
          </div>
        </div>
      </div>
    );
  };

  const handleHome = () => router.push('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-0 md:p-0">
      <TopBar onModuleSelect={handleHome} />
      <div className="max-w-6xl mx-auto pt-8 pb-12 px-2 md:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            {t.header}
            <span className="block text-indigo-600 mt-1">{t.header2}</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t.desc}
          </p>
        </div>
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Avatar Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="mb-4">
                <CatAvatar />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t.yourTwin}</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{t.personality}:</span>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">Innovator</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{t.currentRole} Software Engineer</p>
            </div>
            
            {/* Quick customization */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t.color}</h3>
                <div className="flex gap-2">
                  {catColors.slice(0, 3).map(color => (
                    <button
                      key={color.value}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        catCustomization.color === color.value ? 'border-gray-400 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setCatCustomization({...catCustomization, color: color.value})}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t.mood}</h3>
                <div className="flex gap-1">
                  {moods.slice(0, 2).map(mood => (
                    <button
                      key={mood}
                      className={`px-2 py-1 rounded-md text-xs transition-all ${
                        catCustomization.mood === mood 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setCatCustomization({...catCustomization, mood})}
                    >
                      {mood === 'confident' ? '💪' : '🤔'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{t.skillsTitle}</h2>
            </div>
            
            {/* Selected Skills */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">{t.skillsAndComp}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {selectedSkills.length === 0 && (
                  <p className="text-gray-400 text-sm">{t.noSkill}</p>
                )}
              </div>
            </div>

            {/* Add Skill Button */}
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium mb-4">{t.addSkill}</button>
            
            {/* Available Skills Grid */}
            <div className="grid grid-cols-2 gap-2">
              {skills.slice(0, 8).map(skill => (
                <button
                  key={skill.id}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    selectedSkills.find(s => s.id === skill.id) 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => addSkill(skill)}
                >
                  <div className="flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Role Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">🔵</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{t.roleSuggestions}</h2>
            </div>
            
            <div className="space-y-4">
              {recommendedRoles.length === 0 ? (
                <div className="text-gray-400 text-sm">{t.noRole}</div>
              ) : (
                recommendedRoles.map((role) => (
                  <div
                    key={role.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <div className="flex items-center gap-2">
                        {role.simulation && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            Simülasyon
                          </span>
                        )}
                        <span className="text-sm font-medium text-gray-600">
                          Başarı Olasılığı: {role.match}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${role.match}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Skills */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Yetkinliklerini Ekle</h2>
            </div>
            
            {/* Selected Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Skills & Competencies</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <span>{skill.name}</span>
                    <X className="w-3 h-3" />
                  </div>
                ))}
              </div>
              {selectedSkills.length === 0 && (
                <p className="text-gray-400 text-sm">Henüz yetkinlik seçilmedi</p>
              )}
            </div>

            {/* Add Skill Button */}
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-6 hover:bg-blue-700 transition-colors">
              Add Skill (Demo)
            </button>

            {/* Available Skills */}
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {skills.map(skill => (
                <button
                  key={skill.id}
                  className={`p-3 rounded-lg border transition-all text-left hover:shadow-sm ${
                    selectedSkills.find(s => s.id === skill.id) 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => addSkill(skill)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <skill.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{skill.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center Panel - Avatar */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className="mb-6">
                <CatAvatar />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Digital Twin</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-1">
                <span className="font-medium">Kişilik:</span>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">Innovator</span>
              </div>
              <p className="text-sm text-gray-500">Mevcut Rol: Software Engineer</p>
              
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {selectedSkills.slice(0, 2).map(skill => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Customization Controls */}
            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Renk</h3>
                <div className="flex justify-center gap-2">
                  {catColors.map(color => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        catCustomization.color === color.value ? 'border-gray-400 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setCatCustomization({...catCustomization, color: color.value})}
                    />
                  ))}
                </div>
              </div>

              {/* Pattern Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Desen</h3>
                <div className="flex justify-center gap-2">
                  {patterns.map(pattern => (
                    <button
                      key={pattern}
                      className={`px-3 py-1 rounded-md text-xs transition-all ${
                        catCustomization.pattern === pattern 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setCatCustomization({...catCustomization, pattern})}
                    >
                      {pattern === 'solid' ? 'Düz' : pattern === 'striped' ? 'Çizgili' : 'Benekli'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Ruh Hali</h3>
                <div className="flex justify-center gap-2">
                  {moods.map(mood => (
                    <button
                      key={mood}
                      className={`px-3 py-1 rounded-md text-xs transition-all ${
                        catCustomization.mood === mood 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setCatCustomization({...catCustomization, mood})}
                    >
                      {mood === 'confident' ? 'Güvenli' : mood === 'curious' ? 'Meraklı' : mood === 'focused' ? 'Odaklı' : 'Yaratıcı'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Role Recommendations */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">🔵</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Rol Önerileri</h2>
            </div>
            
            <div className="space-y-4">
              {recommendedRoles.length === 0 ? (
                <div className="text-gray-400 text-sm">Seçili yetkinliklere uygun rol önerisi bulunamadı.</div>
              ) : (
                recommendedRoles.map((role) => (
                  <div
                    key={role.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <div className="flex items-center gap-2">
                        {role.simulation && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            Simülasyon
                          </span>
                        )}
                        <span className="text-sm font-medium text-gray-600">
                          Başarı Olasılığı: {role.match}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${role.match}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCareerTwin; 