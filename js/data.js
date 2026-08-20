
window.PORTFOLIO = (function () {

  /* ---------- Site configuration (single source of truth) ---------- */
  var config = {
  
    siteUrl: "https://ahmerabbasi.com/",

    basePath: ""
  };

  /* ---------- Person ---------- */
  var person = {
    name: "Ahmer Abbasi",
    role: "Software Engineer",
    tagline: "Software engineer building scalable systems, useful interfaces, and automated workflows.",
    /* [CONTENT TO BE PROVIDED] Social links. Leave an entry empty ("") to hide its button. */
    links: {
      linkedin: "https://www.linkedin.com/in/ahmer-abbasi-039a9a175/",
      email: "mailto:ahmerabbasi101@gmail.com"
    }
  };

  /* ---------- Systems map (02 / SYSTEMS) ---------- */
  var systems = [
    {
      id: "requirements",
      title: "REQUIREMENTS",
      desc: "Understanding what the business actually needs before deciding what the implementation should look like.",
      tags: ["requirement understanding", "flowcharts", "business workflows", "process mapping"]
    },
    {
      id: "architecture",
      title: "ARCHITECTURE",
      desc: "Defining service boundaries, API contracts, and integration points so the pieces fit together cleanly.",
      tags: ["microservices", "service boundaries", "API design", "integration planning", "scalability"]
    },
    {
      id: "backend",
      title: "BACKEND",
      desc: "Building the services that hold business logic, enforce rules, and move data reliably.",
      tags: ["ASP.NET Core", "Web API", "security", "business logic", "database design"]
    },
    {
      id: "frontend",
      title: "FRONTEND",
      desc: "Turning services into interfaces people actually use — responsive, reusable, and well integrated to real APIs.",
      tags: ["React.js", "responsive interfaces", "reusable components", "API integration"]
    },
    {
      id: "automation",
      title: "AUTOMATION",
      desc: "Replacing repetitive manual steps with flows that run themselves and notify the right people.",
      tags: ["Power Automate", "SharePoint", "Teams", "Microsoft Graph API", "Power Apps"]
    },
    {
      id: "reporting",
      title: "REPORTING",
      desc: "Making operational activity visible through structured data, summaries, and dashboards.",
      tags: ["Power Automate", "progress reporting", "operational dashboards", "SharePoint Sites","structured business data"]
    }
  ];

  /* ---------- Projects (03 / PROJECTS) ---------- */
  var projects = [
    {
      num: "PRJ-01",
      category: "FINTECH",
      title: "Money Router - by Route Trading",
      short: "An anti-money laundering, risk-free system having a strong and solid KYC, robust and faultless compliance system. Working according to GDPR and PCI-DSS under the eye of Due diligence and Enhanced Due Diligence, making the system more secure and guaranteed.",
      featured: true,
      problem: "Financial workflows require reliable transaction handling, clear service boundaries, and dependable integrations.",
      approach: "Built and integrated backend services and APIs around financial workflows, with emphasis on reliability, compliance, authentication, and service-to-service communication.",
      result: "A structured fintech system built around API-driven financial operations.",
      technologies: [
        "ASP.NET Core",
        "MVC",
        "Microservices",
        "REST APIs",
        'React.js',
        'SQL Server'
      ]
    },
    {
      num: "PRJ-02",
      category: "HEALTHCARE",
      title: "SPINE - by Route Trading",
      short: "Healthcare platform integrating reception, nursing, doctor, laboratory, and pharmacy workflows into one connected system.",
      featured: true,
      problem: "Healthcare operations involve multiple departments that need to work with connected data and coordinated workflows.",
      approach: "Developed integrated services and interfaces for reception, nurse, doctor, lab, and pharmacy workflows.",
      result: "A connected healthcare platform covering core clinical and operational workflows.",
      technologies: [
        "ASP.NET Core",
        "Microservices",
        "REST APIs",
        "React.js",
        "Next.js",
        'SQL Server'
      ]
    }
  ];

  /* ---------- Experience (04 / EXPERIENCE) ---------- */
  var experience = [
    {
      tag: "June 2023 -- Dec 2024",
      role: "MiT Trainee & Junior Developer",
      org: "Route Trading Ltd",
      desc: "Completed structured technical training covering requirement understanding, research, documentation,BA, QA, UI/UX, development lifecycle, and project delivery.",
      focus: ["Requirement Understanding", "Research", "Flowcharts", "Documentation", "QA", "UI / UX", "Development"]
    },
    {
      tag: "Feb 2025 -- Feb 2026",
      role: "Software Developer",
      org: "Route Trading Ltd",
      desc: "Developed backend services, APIs, frontend interfaces, and integrations using ASP.NET Core, React.js, microservices, and SQL Server",
      focus: ["ASP.NET Core", "React.js", "Web APIs", "Microservices", "REST APIs", "API Integration"]
    },
    {
      tag: "Feb 2026 --",
      role: "Senior Software Developer",
      org: "Route Trading Ltd",
      desc: "Taking greater ownership of system design, development standards, technical documentation, integrations, automation, and supporting the wider development team.",
      focus: ["System Design", "ASP.NET Core", "React.js", "Microservices", "Coding Standards", "SOPs", "Technical Guidance", "Automation"]
    }
  ];
  /* ---------- Stack (05 / STACK) ---------- */
  var stack = [
    {
      group: "BACKEND",
      items: [
        { name: "C#", flow: ["LANGUAGE", "OBJECT-ORIENTED", "BACKEND DEVELOPMENT"] },
        { name: "ASP.NET Core", flow: ["WEB APPLICATIONS", "MIDDLEWARE", "DEPENDENCY INJECTION"] },
        { name: "ASP.NET Core Web API", flow: ["CONTROLLERS", "ROUTING", "HTTP", "JSON"] },
        { name: "REST APIs", flow: ["HTTP METHODS", "ENDPOINTS", "STATUS CODES", "JSON"] },
        { name: "Microservices", flow: ["SERVICE BOUNDARIES", "API COMMUNICATION", "INDEPENDENT DEPLOYMENT"] }
      ]
    },
    {
     group: "FRONTEND",
     items: [
       { name: "JavaScript", flow: ["LOGIC", "DOM", "ASYNC PROGRAMMING"] },
       { name: "React.js", flow: ["COMPONENTS", "STATE", "API INTEGRATION"] },
       { name: "HTML", flow: ["STRUCTURE", "SEMANTICS", "ACCESSIBILITY"] },
       { name: "CSS", flow: ["LAYOUT", "STYLING", "RESPONSIVE DESIGN"] }
     ]
   },
   {
     group: "MICROSOFT ECOSYSTEM",
     items: [
       { name: "SharePoint", flow: ["SITES", "LISTS", "PERMISSIONS", "DOCUMENTS"] },
       { name: "Azure DevOps", flow: ["REPOS", "BRANCHING", "PULL REQUESTS", "CI/CD"] },
       { name: "Power Automate", flow: ["TRIGGERS", "ACTIONS", "CONDITIONS", "AUTOMATION"] },
       { name: "Microsoft Graph API", flow: ["AUTHENTICATION", "ENDPOINTS", "MICROSOFT 365 DATA", "INTEGRATION"] }
     ]
   },
   {
     group: "ENGINEERING",
     items: [
       { name: "Git", flow: ["VERSION CONTROL", "BRANCHING", "MERGING", "HISTORY"] },
       { name: "API Integration", flow: ["AUTHENTICATION", "REQUESTS", "DATA MAPPING", "ERROR HANDLING"] },
       { name: "Workflow Design", flow: ["TRIGGERS", "CONDITIONS", "ACTIONS", "APPROVALS"] },
       { name: "Documentation", flow: ["REQUIREMENTS", "TECHNICAL SPECS", "SOPs", "MAINTENANCE"] },
       { name: "System Design", flow: ["ARCHITECTURE", "SERVICE BOUNDARIES", "DATA FLOW", "SCALABILITY"] }
     ]
   }
  ];

  /* ---------- Process (06 / PROCESS) ---------- */
  var process = [
    { title: "UNDERSTAND", desc: "Understand the business requirement before deciding what the implementation should look like." },
    { title: "RESEARCH", desc: "Investigate existing systems, data, and constraints so the design is grounded in reality." },
    { title: "MODEL", desc: "Translate the requirement into flows, architecture, data movement, and responsibilities." },
    { title: "BUILD", desc: "Implement backend services, frontend interfaces, integrations, or automation." },
    { title: "TEST", desc: "Validate behavior rather than assuming that successful compilation means successful software." },
    { title: "AUTOMATE", desc: "Remove the repetitive parts of the process so the system, not memory, enforces consistency." },
    { title: "DOCUMENT", desc: "Capture decisions and processes so the system remains understandable to the team." },
    { title: "IMPROVE", desc: "Return to the system with new requirements and refine it — the loop never really closes." }
  ];

  /* ---------- Ownership (07 / OWNERSHIP) ---------- */
  var ownership = [
    { title: "Coding Standards", desc: "Contributing to shared conventions so code reads consistently across the team." },
    { title: "SOP Development", desc: "Turning repeated engineering tasks into documented, repeatable procedures." },
    { title: "Documentation", desc: "Keeping decisions and processes written down where the next person can find them." },
    { title: "Trainee Support", desc: "Helping newer developers move from tasks to understanding through guidance and review." },
    { title: "Technical Guidance", desc: "Providing direction on approach, design, and quality without owning every decision." },
    { title: "Process Improvement", desc: "Looking at how the team works and finding steps worth automating or simplifying." }
  ];

  return {
    config: config,
    person: person,
    systems: systems,
    projects: projects,
    experience: experience,
    stack: stack,
    process: process,
    ownership: ownership
  };
})();
