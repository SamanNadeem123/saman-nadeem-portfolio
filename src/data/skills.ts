export interface SkillGroup { id: string; name: string; short: string; skills: string[]; blurb: string }
export const skillGroups: SkillGroup[] = [
  { id: 'lang', name: 'Programming Languages', short: 'Programming', skills: ['Python', 'C++', 'JavaScript', 'HTML', 'CSS'], blurb: 'Languages used across coursework, internship and personal projects.' },
  { id: 'ai', name: 'AI / Machine Learning', short: 'AI / ML', skills: ['TensorFlow', 'Deep Learning', 'Predictive Modeling', 'Simulation Design'], blurb: 'Predictive modelling and simulation work applied to operational problems.' },
  { id: 'web', name: 'Backend / Development', short: 'Backend', skills: ['Flask', 'REST API Design', 'CRUD Applications', 'MVC/MVT Architecture'], blurb: 'Backend services and API design in Python.' },
  { id: 'db', name: 'Database', short: 'Database', skills: ['SQLite', 'Relational Database Design'], blurb: 'Schema design and database-backed applications.' },
  { id: 'tools', name: 'Tools', short: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Tkinter'], blurb: 'Everyday tooling, version control and desktop GUI development.' },
  { id: 'eng', name: 'Engineering', short: 'Engineering', skills: ['Object-Oriented Programming', 'Agile', 'Code Review', 'Problem Solving', 'Team Collaboration'], blurb: 'Engineering practices and how I work with teams and independently.' },
]
