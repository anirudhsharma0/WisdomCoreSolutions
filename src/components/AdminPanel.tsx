import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { 
  Mail, Trash2, LogOut, 
  LayoutGrid, Star, Eye, EyeOff, Plus, X, Globe, 
  PlusCircle, FolderOpen, Edit3,
  Search, Settings,
  LayoutDashboard, Briefcase, BarChart3, Bell, ChevronDown,
  TrendingUp, MousePointer2, MoreVertical
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '../icons/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, PieChart, Pie, Cell
} from 'recharts';

interface InquiryType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  status: string;
}

interface ReviewType {
  _id: string;
  name: string;
  text: string;
  rating: number;
  isHidden: boolean;
  createdAt: string;
}

// Mock Data for Charts
const inquirySeries = [
  { month: 'Jan', inquiries: 40, sales: 24 },
  { month: 'Feb', inquiries: 30, sales: 13 },
  { month: 'Mar', inquiries: 20, sales: 98 },
  { month: 'Apr', inquiries: 27, sales: 39 },
  { month: 'May', inquiries: 18, sales: 48 },
  { month: 'Jun', inquiries: 23, sales: 38 },
  { month: 'Jul', inquiries: 34, sales: 43 },
  { month: 'Aug', inquiries: 42, sales: 52 },
];

const trafficSources = [
  { name: 'Search Engines', value: 30, color: '#3182ce' },
  { name: 'Direct Click', value: 30, color: '#38b2ac' },
  { name: 'Bookmarks Click', value: 40, color: '#ed64a6' },
];

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, inquiries, projects, reviews, settings, reports
  const [siteSettings, setSiteSettings] = useState({
    github: '', linkedin: '', twitter: '', instagram: '',
    email: '', phone: '', address: ''
  });
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newProject, setNewProject] = useState({ 
    title: '', description: '', image: '', tags: '', link: '', status: 'Completed' 
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchData();
      fetchStats();
      if (token) fetchSettings();
    }
  }, [token, activeTab]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setSiteSettings(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setStats(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchData = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      if (activeTab === 'inquiries' || activeTab === 'dashboard') {
        const res = await fetch('/api/admin/inquiries', { headers });
        if (res.ok) setInquiries(await res.json());
      }
      
      if (activeTab === 'projects' || activeTab === 'dashboard') {
        const res = await fetch('/api/projects'); 
        if (res.ok) setProjects(await res.json());
      }
      
      if (activeTab === 'reviews' || activeTab === 'dashboard') {
        const res = await fetch('/api/admin/reviews', { headers });
        if (res.ok) setReviews(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failure. Check server.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // ... CRUD Handlers (Reusing existing logic)
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Eliminate this inquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setInquiries(inquiries.filter(i => i._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleAddProject = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = newProject.tags.split(',').map(t => t.trim());
      const method = editingProjectId ? 'PUT' : 'POST';
      const body = editingProjectId 
        ? { ...newProject, tags: tagsArray, id: editingProjectId } 
        : { ...newProject, tags: tagsArray };

      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setIsAddProjectOpen(false);
        setEditingProjectId(null);
        fetchData();
        setNewProject({ title: '', description: '', image: '', tags: '', link: '', status: 'Completed' });
      }
    } catch (err) { console.error(err); }
  };

  const handleOpenEdit = (project: ProjectType) => {
    setEditingProjectId(project._id);
    setNewProject({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(', '),
      link: project.link || '',
      status: project.status
    });
    setIsAddProjectOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    
    // Resize image using Canvas to avoid Vercel 4.5MB payload limit
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Export highly compressed webp/jpeg to save database space
        const base64 = canvas.toDataURL('image/jpeg', 0.8);

        try {
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ base64, filename: file.name })
          });
          const data = await res.json();
          if (res.ok) setNewProject({ ...newProject, image: data.url });
          else alert('Upload failed: ' + data.message);
        } catch (err) { alert('Upload failed. Check your connection.'); }
        finally { setUploading(false); }
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Remove this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setProjects(projects.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleToggleReviewVisibility = async (id: string, isHidden: boolean) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id, isHidden: !isHidden })
      });
      if (res.ok) setReviews(prev => prev.map(r => r._id === id ? { ...r, isHidden: !isHidden } : r));
    } catch (err) { alert('Network failure.'); }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Delete review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setReviews(reviews.filter(r => r._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(siteSettings)
      });
      if (res.ok) alert('Settings saved.');
    } catch (err) { console.error(err); }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Keys do not match.');
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ newPassword: passwordData.newPassword })
      });
      if (res.ok) {
        setPasswordSuccess('Success.');
        setPasswordData({ newPassword: '', confirmPassword: '' });
      }
    } catch (err) { setPasswordError('Failure.'); }
    finally { setPasswordLoading(false); }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-purple-600 relative overflow-hidden font-dm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-purple-200/50 relative z-10 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
            <Globe className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold font-syne tracking-tight text-slate-900">Purple Control</h2>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-[0.2em] font-bold">Secure Access Required</p>
          
          <form onSubmit={handleLogin} className="mt-10 space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Identity</label>
              <input 
                type="text" required
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-400 text-slate-900"
                placeholder="Admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Access Key</label>
              <input 
                type="password" required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-400 text-slate-900"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center font-bold px-2">{error}</p>}
            <button className="w-full py-5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/20 text-white rounded-2xl font-bold transition-all transform active:scale-[0.98]">
              Initialize Session
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const renderSidebarItem = (item: string, icon: any, tab: string) => (
    <button 
      onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-bold text-sm ${
        activeTab === tab 
          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20' 
          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      {icon} <span>{item}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F6F9] font-dm text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-30">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <LayoutGrid className="text-white" size={20} />
          </div>
          <span className="text-2xl font-bold font-syne tracking-tight">Purple<span className="text-purple-600">.</span></span>
        </div>

        <div className="px-4 py-6 mb-auto overflow-y-auto no-scrollbar">
          <p className="px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Core Controls</p>
          <div className="space-y-1 mb-8">
            {renderSidebarItem('Dashboard', <LayoutDashboard size={20} />, 'dashboard')}
            {renderSidebarItem('Inquiries', <Mail size={20} />, 'inquiries')}
            {renderSidebarItem('Projects', <Briefcase size={20} />, 'projects')}
            {renderSidebarItem('Reviews', <Star size={20} />, 'reviews')}
            {renderSidebarItem('Site Config', <Settings size={20} />, 'settings')}
          </div>

          <div className="px-4 py-8 bg-purple-50 rounded-[2.5rem] mt-10 relative overflow-hidden group border border-purple-100 text-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-150"></div>
            <p className="relative z-10 text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-4">Ready to Expand?</p>
            <button 
              onClick={() => setIsAddProjectOpen(true)}
              className="relative z-10 w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-purple-500/20 hover:shadow-purple-700/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Deploy Project
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <nav className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Command Center</span>
            <span className="text-slate-200">/</span>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em]">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>
            <button onClick={logout} className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
              Logout <LogOut size={14} />
            </button>
          </div>
        </nav>

        {/* Dynamic Content Area */}
        <div className="p-10 flex-1 overflow-y-auto overflow-x-hidden">
          
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && stats && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* Dashboard Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center"><LayoutDashboard size={14}/></div>
                       <h2 className="text-3xl font-bold font-syne tracking-tight">System Dashboard</h2>
                    </div>
                    <p className="text-slate-400 text-sm">System diagnostic and activity tracking in real-time.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-purple-300 transition-all shadow-sm">Export Data</button>
                    <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-purple-300 transition-all shadow-sm flex items-center gap-2">Overview <ChevronDown size={14}/></button>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Weekly Sales', value: `$ ${stats.totalInquiries * 2500}`, icon: TrendingUp, gradient: 'from-pink-400 to-rose-500', growth: '60%', count: stats.totalInquiries },
                    { label: 'Project Portfolio', value: stats.totalProjects, icon: Briefcase, gradient: 'from-blue-400 to-indigo-500', growth: '10%', count: stats.totalProjects },
                    { label: 'Active Presence', value: stats.visibleReviews, icon: MousePointer2, gradient: 'from-teal-400 to-emerald-500', growth: '5%', count: reviews.length },
                  ].map((card, i) => (
                    <motion.div 
                      key={card.label}
                      initial={{ opacity: 0, x: i === 0 ? -20 : i === 2 ? 20 : 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`relative p-10 rounded-[3rem] text-white overflow-hidden bg-gradient-to-br ${card.gradient} shadow-2xl shadow-indigo-200/50 group cursor-default`}
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform"><card.icon size={120}/></div>
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{card.label}</p>
                          <card.icon size={24} />
                        </div>
                        <h4 className="text-4xl font-bold font-syne mb-6">{card.value}</h4>
                        <p className="text-xs font-bold opacity-70">Significant increase: <span className="text-white">{card.growth}</span> increase this cycle.</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <h4 className="text-xl font-bold font-syne leading-none mb-2">Visit And Sales Statistics</h4>
                        <div className="flex gap-4 mt-4">
                           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Inquiries</div>
                           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Validated Leads</div>
                           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Conversions</div>
                        </div>
                      </div>
                      <MoreVertical className="text-slate-300 cursor-pointer" />
                    </div>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={inquirySeries}>
                          <defs>
                            <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="inquiries" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorInq)" />
                          <Area type="monotone" dataKey="sales" stroke="#fb7185" strokeWidth={3} fillOpacity={0} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center">
                    <h4 className="text-xl font-bold font-syne w-full text-left mb-10">Traffic Sources</h4>
                    <div className="h-[300px] w-full mt-auto mb-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={trafficSources}
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {trafficSources.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full space-y-4 mt-auto">
                      {trafficSources.map((src) => (
                        <div key={src.name} className="flex items-center justify-between text-xs font-bold font-dm">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: src.color }}></div>
                             <span className="text-slate-400">{src.name}</span>
                          </div>
                          <span>{src.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic List Preview */}
                <div className="grid grid-cols-1 gap-8">
                  <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-white">
                    <div className="flex items-center justify-between mb-10">
                      <h4 className="text-2xl font-bold font-syne">Recent Project Pulse</h4>
                      <PlusCircle className="text-purple-400 cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsAddProjectOpen(true)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {projects.slice(0, 4).map(p => (
                        <div key={p._id} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                           <div className="aspect-video bg-slate-800 rounded-xl mb-4 overflow-hidden relative group">
                              <img src={p.image} className="w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-100" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"><Edit3 size={18}/></div>
                           </div>
                           <h5 className="font-bold text-sm mb-1">{p.title}</h5>
                           <p className="text-[10px] text-slate-500 line-clamp-1">{p.tags.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inquiries' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 {/* Styled Inquiry List */}
                 <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold font-syne">Inquiry Feed</h2>
                    <div className="relative max-w-md w-full ml-10">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Filter signals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-sm bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-purple-300 transition-all text-sm shadow-sm"
                      />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    {inquiries.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map(inq => (
                       <motion.div key={inq._id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all group">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">{inq.name.charAt(0)}</div>
                             <div>
                                <h4 className="font-bold text-lg mb-1">{inq.name}</h4>
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                   <span className="flex items-center gap-1"><Mail size={12}/> {inq.email}</span>
                                   <span className="flex items-center gap-1"><Globe size={12}/> {inq.service}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{new Date(inq.createdAt).toLocaleDateString()}</p>
                                <p className="text-xs text-slate-500 font-bold italic mt-1">{inq.phone}</p>
                             </div>
                             <div className="h-10 w-[1px] bg-slate-100"></div>
                             <button onClick={() => handleDeleteInquiry(inq._id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20}/></button>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold font-syne">Portfolio Archive</h2>
                    <button onClick={() => setIsAddProjectOpen(true)} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all">Archive Project</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(project => (
                     <div key={project._id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-2xl hover:shadow-purple-100 transition-all border-b-4 border-b-transparent hover:border-b-purple-500">
                        <div className="aspect-video relative overflow-hidden bg-slate-100">
                           <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold tracking-widest uppercase text-purple-600 shadow-xl">{project.status}</div>
                        </div>
                        <div className="p-8">
                           <h4 className="text-xl font-bold mb-4">{project.title}</h4>
                           <div className="flex flex-wrap gap-2 mb-8">
                              {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase rounded-lg border border-slate-100">{tag}</span>)}
                           </div>
                           <div className="flex gap-4">
                              <button onClick={() => handleOpenEdit(project)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-2"><Edit3 size={16}/> Edit Architecture</button>
                              <button onClick={() => handleDeleteProject(project._id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20}/></button>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-10"><h2 className="text-3xl font-bold font-syne">Client Feedback Signals</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {reviews.map(review => (
                     <div key={review._id} className={`p-8 rounded-[3rem] border transition-all ${review.isHidden ? 'bg-slate-50 border-slate-200 opacity-50 grayscale' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-100'}`}>
                        <div className="flex items-center gap-4 mb-8">
                           <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner">{review.rating}</div>
                           <div>
                              <h4 className="font-bold text-lg">{review.name}</h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>
                        <p className="text-slate-500 text-sm italic mb-10 leading-relaxed">"{review.text}"</p>
                        <div className="flex gap-4 pt-6 border-t border-slate-50">
                           <button onClick={() => handleToggleReviewVisibility(review._id, review.isHidden)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-purple-50 hover:text-purple-600 transition-all">
                              {review.isHidden ? <><Eye size={16}/> Visibility: OFF</> : <><EyeOff size={16}/> Visibility: ON</>}
                           </button>
                           <button onClick={() => handleDeleteReview(review._id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <div className="max-w-4xl space-y-10">
                    <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
                       <h3 className="text-2xl font-bold font-syne mb-10">Core Configuration</h3>
                       <form onSubmit={handleSaveSettings} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {[
                               { label: 'GitHub Platform', value: siteSettings.github, key: 'github', icon: GitHubIcon },
                               { label: 'LinkedIn Reach', value: siteSettings.linkedin, key: 'linkedin', icon: LinkedInIcon },
                               { label: 'System Email', value: siteSettings.email, key: 'email', icon: Mail },
                               { label: 'Primary Terminal', value: siteSettings.phone, key: 'phone', icon: Globe },
                             ].map(field => (
                               <div key={field.key} className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                     {field.icon === Mail ? <Mail size={12}/> : field.icon === Globe ? <Globe size={12}/> : <field.icon size={12} className="text-purple-600"/> }
                                     {field.label}
                                  </label>
                                  <input 
                                    value={field.value} 
                                    onChange={e => setSiteSettings({...siteSettings, [field.key]: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-purple-300 transition-all text-sm font-bold"
                                  />
                               </div>
                             ))}
                          </div>
                          <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all w-full md:w-auto">Update System Config</button>
                       </form>
                    </div>

                    <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
                       <h3 className="text-2xl font-bold font-syne mb-10">Security Terminal</h3>
                       <form onSubmit={handlePasswordChange} className="space-y-6 max-w-sm">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Access Key</label>
                             <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-purple-300 transition-all text-sm font-bold" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Access Key</label>
                             <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-purple-300 transition-all text-sm font-bold" />
                          </div>
                          {passwordError && <p className="text-red-500 text-[10px] font-bold italic">{passwordError}</p>}
                          {passwordSuccess && <p className="text-purple-600 text-[10px] font-bold italic">{passwordSuccess}</p>}
                          <button disabled={passwordLoading} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-purple-600 transition-all disabled:opacity-50">Sync Security Protocol</button>
                       </form>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-200 rounded-[3rem] bg-white text-center">
                 <div className="p-10 bg-purple-50 text-purple-600 rounded-full mb-8"><BarChart3 size={64}/></div>
                 <h2 className="text-3xl font-bold font-syne mb-4">Diagnostic Reports Engine</h2>
                 <p className="text-slate-400 max-w-sm mb-10">Custom PDF architecture and data export telemetry currently under synchronization.</p>
                 <button className="px-10 py-5 bg-purple-100 text-purple-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all">Request Feature Sync</button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Deploy Project Modal (Rebuilt) */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-12">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => { setIsAddProjectOpen(false); setEditingProjectId(null); }}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            ></motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="relative w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar border-4 border-white/20"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-4xl font-bold font-syne">{editingProjectId ? 'Refine Architecture' : 'Deploy Architecture'}</h3>
                <button onClick={() => { setIsAddProjectOpen(false); setEditingProjectId(null); }} className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"><X/></button>
              </div>
              <form onSubmit={handleAddProject} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Study Context</label>
                        <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:border-purple-300 outline-none transition-all text-slate-900 font-bold" placeholder="E.g. Nexus Core ERP"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">System State</label>
                        <select value={newProject.status} onChange={e => setNewProject({...newProject, status: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:border-purple-300 outline-none transition-all text-slate-900 font-bold">
                            <option value="Completed">Completed</option>
                            <option value="Live Beta">Live Beta</option>
                            <option value="Experimental">Experimental</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 text-center block">Asset Telemetry (System View)</label>
                  <div className="flex flex-col items-center gap-8">
                     <div className="w-full h-64 rounded-[3rem] bg-slate-50 border-4 border-dashed border-slate-100 flex items-center justify-center overflow-hidden relative group shadow-inner">
                        {newProject.image ? (
                           <>
                           <img src={newProject.image} className="w-full h-full object-cover transition-opacity group-hover:opacity-40" />
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={40} className="text-red-500 cursor-pointer" onClick={() => setNewProject({...newProject, image: ''})} />
                           </div>
                           </>
                        ) : (
                           <div className="text-center group-hover:scale-110 transition-transform">
                              <FolderOpen size={48} className="mx-auto text-slate-200 mb-4" />
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Asset Required</p>
                           </div>
                        )}
                        {uploading && <div className="absolute inset-0 bg-white/60 backdrop-blur flex items-center justify-center"><div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div></div>}
                     </div>
                     <div className="flex w-full gap-4">
                        <input type="file" id="p-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        <label htmlFor="p-upload" className="flex-1 py-5 bg-white border-2 border-slate-100 rounded-[2rem] text-center font-bold text-xs uppercase tracking-widest text-slate-400 cursor-pointer hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center gap-2"><PlusCircle size={18}/> Local Source</label>
                        <input value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} className="flex-[2] bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-5 outline-none focus:border-purple-200 text-xs font-dm font-bold" placeholder="Remote Signal URL..." />
                     </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Tech Matrix (Comma Separated)</label>
                      <input required value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:border-purple-300 outline-none transition-all text-slate-900 font-bold" placeholder="React, Three.js, Redis..."/>
                   </div>
                   <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Blueprint URL</label>
                       <input value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:border-purple-300 outline-none transition-all text-slate-900 font-bold" placeholder="https://app.wcs.com/..."/>
                   </div>
                   <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Abstract Decomposition</label>
                       <textarea rows={4} required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-6 focus:border-purple-300 outline-none transition-all text-slate-900 font-bold" placeholder="Full system specifications..."></textarea>
                   </div>
                </div>
                
                <button className="w-full py-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-700/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                   <TrendingUp className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   {editingProjectId ? 'Sync Architecture Core' : 'Establish Core Archive & Deploy'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
