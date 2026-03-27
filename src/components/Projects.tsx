import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  status?: string;
}

const DEFAULT_PROJECTS: ProjectType[] = [
  {
    _id: 'default-1',
    title: 'Milk Dairy System',
    description: 'A comprehensive ERP solution for milk production and distribution tracking.',
    image: '/projects/dairy_real.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    status: 'Live'
  },
  {
    _id: 'default-2',
    title: 'Construction ERP',
    description: 'High-end management system for construction project lifecycle and finances.',
    image: '/projects/construction_real.png',
    tags: ['React', 'Express', 'JWT'],
    link: '#',
    status: 'Live'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => { setProjects(DEFAULT_PROJECTS); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="py-24 text-center bg-white">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Syncing...</p>
    </div>
  );

  return (
    <section id="projects" className="py-28 bg-white relative overflow-hidden">
      {/* Subtle top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5"
          >
            Portfolio Highlights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-syne tracking-tight mb-5"
          >
            Case <span className="premium-gradient-text">Studies.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed"
          >
            High-fidelity engineering for industries that demand absolute precision.
          </motion.p>
        </div>

        {/* Compact 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const displayImage = project.image.includes('dairy') ? '/projects/dairy_real.png'
                               : project.image.includes('construction') ? '/projects/construction_real.png'
                               : project.image;

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="project-card group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                  <img
                    src={displayImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.currentTarget.parentElement!.classList.add('bg-slate-200'); }}
                  />
                  {/* Status chip */}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-slate-700 rounded-full border border-slate-100 shadow-sm">
                    {project.status || 'Live'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-wider text-slate-400 rounded-lg font-dm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold font-syne text-slate-900 mb-1.5 tracking-tight group-hover:text-accent transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 font-dm">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-colors group/cta"
                  >
                    View Project
                    <ArrowUpRight size={13} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
