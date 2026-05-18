// ══════════════════════════════════════════
// STAGE CONFIG
// ══════════════════════════════════════════
const STAGES={
  todo:     {label:'To do',        color:'var(--s-todo)',  bg:'var(--s-todo-bg)',  border:'var(--s-todo-b)'},
  inprogress:{label:'In progress', color:'var(--s-prog)',  bg:'var(--s-prog-bg)',  border:'var(--s-prog-b)'},
  review:   {label:'In review',    color:'var(--s-rev)',   bg:'var(--s-rev-bg)',   border:'var(--s-rev-b)'},
  approved: {label:'Approved',     color:'var(--s-app)',   bg:'var(--s-app-bg)',   border:'var(--s-app-b)'},
  onhold:   {label:'On hold',      color:'var(--s-hold)',  bg:'var(--s-hold-bg)',  border:'var(--s-hold-b)'},
  completed:{label:'Completed',    color:'var(--s-done)',  bg:'var(--s-done-bg)',  border:'var(--s-done-b)'},
  remark:   {label:'Remark',       color:'var(--s-rem)',   bg:'var(--s-rem-bg)',   border:'var(--s-rem-b)'},
};
const STAGE_ORDER=['todo','inprogress','review','approved','onhold','completed','remark'];
const PRI_CFG={high:{label:'High',cls:'pri-high'},medium:{label:'Medium',cls:'pri-med'},low:{label:'Low',cls:'pri-low'}};

// ══════════════════════════════════════════
// DATA
// ══════════════════════════════════════════
let MEMBERS=[
  {id:1,name:'Raj Kumar',   initials:'RK',role:'super-admin',title:'',                        color:'#7c6af7',bg:'#7c6af722',username:'admin',   password:'admin123', active:true,brands:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {id:2,name:'Priya Shah',  initials:'PS',role:'sam',        title:'Strategic Account Manager',color:'#4eca8b',bg:'#4eca8b22',username:'priya',   password:'sam123',   active:true,brands:[1,2,5,6,7]},
  {id:3,name:'Arjun Mehta', initials:'AM',role:'sam',        title:'Strategic Account Manager',color:'#f5a623',bg:'#f5a62322',username:'arjun',   password:'sam123',   active:true,brands:[3,4,8,9,10]},
  {id:4,name:'Neha Joshi',  initials:'NJ',role:'specialist-content', title:'Content Specialist',       color:'#5baef7',bg:'#5baef722',username:'neha',    password:'spec123',  active:true,brands:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {id:5,name:'Vikram Rao',  initials:'VR',role:'specialist-graphic', title:'Graphic Specialist',       color:'#f55c5c',bg:'#f55c5c22',username:'vikram',  password:'spec123',  active:true,brands:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {id:6,name:'Aisha Kapoor',initials:'AK',role:'specialist-seo', title:'SEO Specialist',           color:'#2dd4bf',bg:'#2dd4bf22',username:'aisha',   password:'spec123',  active:true,brands:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {id:7,name:'AutoDrive Co',initials:'AU',role:'owner',      title:'Brand Stakeholder',        color:'#a78bfa',bg:'#a78bfa22',username:'client',  password:'client123',active:true,brands:[1]},
];
let INTEGRATIONS=[];
const SEED_MEMBERS=JSON.parse(JSON.stringify(MEMBERS));

// ── PROMPT REPOSITORY (shared workspace library)
const SEED_PROMPT_CATEGORIES=[
  {id:'c-web',     slug:'web-design-code',    name:'Website Design & Code', icon:'💻', description:'Landing pages, components, prototypes' },
  {id:'c-creative',slug:'creative-design',    name:'Creative Design',       icon:'🎨', description:'Visual concepts, branding, art direction' },
  {id:'c-copy',    slug:'copywriting',        name:'Copywriting',           icon:'✍️', description:'Headlines, body copy, email, ads' },
  {id:'c-analysis',slug:'analysis',           name:'Analysis & Research',   icon:'📊', description:'Audits, competitor scans, summaries' },
  {id:'c-auto',    slug:'automation',         name:'Automation',            icon:'🤖', description:'Workflows, ops, integrations' },
];
const SEED_PROMPTS=[
  {id:'p-1',workspaceId:1,categoryId:'c-copy',title:'B2B landing-page hero copy',description:'One-line headline + 2-sentence subheadline for a SaaS landing page.',content:'You are a senior B2B copywriter. Write a punchy hero section for a {{product}} landing page targeting {{audience}}. Output: 1 headline (max 9 words), 1 subheadline (max 28 words), 1 primary CTA button label (max 4 words). Tone: confident, specific, no marketing fluff.',tags:['saas','landing-page','b2b'],createdBy:1,createdAt:'2026-04-10T09:00:00Z',updatedAt:'2026-04-10T09:00:00Z'},
  {id:'p-2',workspaceId:1,categoryId:'c-creative',title:'Brand moodboard prompt',description:'Generate a moodboard direction for a new brand.',content:'Generate a moodboard direction for a brand called {{brand}} in the {{industry}} industry. Cover: color palette (5 hex codes), typography pairing (2 fonts), photography style (3 keywords), texture / motif (3 keywords), reference brands (3). Keep it tight and avoid clichés.',tags:['branding','moodboard'],createdBy:1,createdAt:'2026-04-12T11:30:00Z',updatedAt:'2026-04-12T11:30:00Z'},
  {id:'p-3',workspaceId:1,categoryId:'c-analysis',title:'Competitor positioning snapshot',description:'5-row positioning grid for a market.',content:'For the {{market}} market, give me a 5-row positioning snapshot of the top competitors. For each: company name, one-line positioning statement, primary audience, pricing tier (low/mid/premium), biggest gap. Plain markdown table.',tags:['research','positioning'],createdBy:2,createdAt:'2026-04-18T14:10:00Z',updatedAt:'2026-04-18T14:10:00Z'},
];
let PROMPTS = JSON.parse(JSON.stringify(SEED_PROMPTS));
let PROMPT_CATEGORIES = JSON.parse(JSON.stringify(SEED_PROMPT_CATEGORIES));
let CPromptCat = 'all';
let CPromptSearch = '';
let CEditPromptId = null;
let CDelPromptId = null;
let _promptSearchTimer = null;

let BRANDS=[
  {id:1,name:'AutoDrive',industry:'Automotive',type:'internal',color:'#7c6af7',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Internal automotive brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:2,name:'MediCare Plus',industry:'Healthcare',type:'internal',color:'#4eca8b',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Internal healthcare brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:3,name:'StaffPro',industry:'Staffing',type:'internal',color:'#5baef7',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Internal staffing brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:4,name:'LogiLink',industry:'Logistics',type:'internal',color:'#f5a623',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Internal logistics brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:5,name:'GreenBuild',industry:'Construction',type:'client',color:'#4eca8b',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client construction brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:6,name:'FinEdge',industry:'Finance',type:'client',color:'#f55c5c',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client finance brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:7,name:'EduSpark',industry:'EdTech',type:'client',color:'#a78bfa',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client edtech brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:8,name:'RetailHub',industry:'Retail',type:'client',color:'#f5a623',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client retail brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:9,name:'TechNest',industry:'Technology',type:'client',color:'#5baef7',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'approved',desc:'Client technology brand',archived:false,ownerId:2,bmId:2,clientName:'Aisha Kapoor',clientEmail:'aisha@technest.com',clientMemberId:6,pimFeedback:[],campFeedback:{}},
  {id:10,name:'AgriGrow',industry:'Agriculture',type:'client',color:'#4eca8b',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client agriculture brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:11,name:'HealthFirst',industry:'Healthcare',type:'client',color:'#7c6af7',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client healthcare brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
  {id:12,name:'MoveIt',industry:'Logistics',type:'client',color:'#f55c5c',g7:[{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:true,status:'done',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}],g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:[{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'},{active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}]},campaigns:[],assets:[],pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},pimStatus:'draft',desc:'Client logistics brand',archived:false,ownerId:2,bmId:2,clientName:'',clientEmail:'',clientMemberId:null,pimFeedback:[],campFeedback:{}},
];

// TASKS — seeded with sample data
let TASKS=[
  {id:1,title:'Publish SMM post — LinkedIn',brandId:1,g7:'G6',assigneeId:2,priority:'high',stage:'inprogress',due:'2026-05-05',notes:'Carousel format, 5 slides about Q2 results',challenges:'Need final approval on copy',remarks:'',score:0,files:[],campaignId:null,createdAt:'2026-05-01'},
  {id:2,title:'SEO audit and keyword report',brandId:2,g7:'G3',assigneeId:3,priority:'high',stage:'review',due:'2026-05-03',notes:'Full on-page audit, identify top 20 keywords',challenges:'',remarks:'Good work, minor formatting fixes needed',score:4,files:[],campaignId:null,createdAt:'2026-04-28'},
  {id:3,title:'Monthly newsletter — May issue',brandId:3,g7:'G4',assigneeId:2,priority:'medium',stage:'todo',due:'2026-05-10',notes:'Cover product launch and team highlight',challenges:'',remarks:'',score:0,files:[],campaignId:null,createdAt:'2026-05-01'},
  {id:4,title:'Brand guidelines refresh',brandId:1,g7:'G1',assigneeId:5,priority:'medium',stage:'approved',due:'2026-05-02',notes:'Update typography and add dark mode variants',challenges:'',remarks:'Excellent work, approved for production',score:5,files:[],campaignId:null,createdAt:'2026-04-25'},
  {id:5,title:'Testimonial video — client shoot',brandId:5,g7:'G5',assigneeId:4,priority:'high',stage:'onhold',due:'2026-05-08',notes:'3 customer testimonials, 60–90 seconds each',challenges:'Client availability — shoot rescheduled',remarks:'On hold until client confirms new date',score:0,files:[],campaignId:null,createdAt:'2026-04-30'},
  {id:6,title:'PR article — industry publication',brandId:6,g7:'G7',assigneeId:1,priority:'low',stage:'remark',due:'2026-05-12',notes:'500-word thought leadership piece',challenges:'',remarks:'Revise headline and add statistics in para 2',score:2,files:[],campaignId:null,createdAt:'2026-05-01'},
  {id:7,title:'Website homepage redesign',brandId:9,g7:'G2',assigneeId:5,priority:'medium',stage:'completed',due:'2026-04-30',notes:'New hero section, updated value props',challenges:'',remarks:'Delivered on time, great execution',score:5,files:[],campaignId:null,createdAt:'2026-04-20'},
  {id:8,title:'Instagram content — weekly posts',brandId:8,g7:'G6',assigneeId:4,priority:'medium',stage:'todo',due:'2026-05-07',notes:'2 posts this week, product focus',challenges:'',remarks:'',score:0,files:[],campaignId:null,createdAt:'2026-05-02'},
];

// ══ SUPABASE PERSISTENCE ══
const DB_KEY='marketingOS_v1'; // kept for theme/session localStorage only
const APP_VERSION='v13';
let _persistTimer=null;

function persist(){
  // Always save to localStorage as instant fallback
  try{localStorage.setItem(DB_KEY,JSON.stringify({MEMBERS,BRANDS,TASKS,NOTIFICATIONS,LOOKUPS,INTEGRATIONS,REPORT_DATA,PROMPTS,PROMPT_CATEGORIES}));}catch(e){}
  // Debounce Supabase saves (max 1 per 1.5s to avoid rate limits)
  clearTimeout(_persistTimer);
  _persistTimer=setTimeout(()=>persistToSupabase(),1500);
}

async function persistToSupabase(){
  if(!_sb)return;
  try{
    const data={MEMBERS,BRANDS,TASKS,NOTIFICATIONS,LOOKUPS,INTEGRATIONS,REPORT_DATA,PROMPTS,PROMPT_CATEGORIES};
    await _sb.from('app_state').upsert({id:1,data},{ onConflict:'id'});
  }catch(e){console.warn('Supabase persist failed:',e);}
}

async function loadFromSupabase(){
  if(!_sb)return null;
  try{
    const{data,error}=await _sb.from('app_state').select('data').eq('id',1).single();
    if(error||!data)return null;
    return data.data;
  }catch(e){return null;}
}

function applyLoadedData(saved){
  if(!saved)return;
  if(saved.MEMBERS&&saved.MEMBERS.length)MEMBERS=saved.MEMBERS;
  if(saved.NOTIFICATIONS)NOTIFICATIONS=saved.NOTIFICATIONS;
  if(saved.LOOKUPS)LOOKUPS=Object.assign({},LOOKUPS,saved.LOOKUPS);
  if(saved.INTEGRATIONS)INTEGRATIONS=saved.INTEGRATIONS;
  if(saved.REPORT_DATA)REPORT_DATA=saved.REPORT_DATA;
  // Prompts (seed if absent)
  PROMPT_CATEGORIES = Array.isArray(saved.PROMPT_CATEGORIES) && saved.PROMPT_CATEGORIES.length
    ? saved.PROMPT_CATEGORIES
    : JSON.parse(JSON.stringify(SEED_PROMPT_CATEGORIES));
  PROMPTS = Array.isArray(saved.PROMPTS) ? saved.PROMPTS : JSON.parse(JSON.stringify(SEED_PROMPTS));
  if(saved.BRANDS&&saved.BRANDS.length){
    BRANDS=saved.BRANDS;
    BRANDS.forEach(b=>{
      if(!b.g7)b.g7=Array(7).fill(null).map(()=>({done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null}));
      b.g7=b.g7.map(a=>{
        if(typeof a==='object'&&a!==null){
          a.taskIds=a.taskIds||[];a.campaignId=a.campaignId||null;
          a.notes=a.notes||'';a.startDate=a.startDate||'';
          a.endDate=a.endDate||'';a.assigneeId=a.assigneeId||null;
          a.manualDone=a.manualDone||false;return a;
        }
        const done=!!a;
        return{done,status:done?'done':'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[],campaignId:null,manualDone:false};
      });
      b.pimFeedback=b.pimFeedback||[];b.campFeedback=b.campFeedback||{};
      b.campaigns=b.campaigns||[];b.bmId=b.bmId||b.ownerId||null;
      b.clientMemberId=b.clientMemberId||null;b.clientName=b.clientName||'';
      b.clientEmail=b.clientEmail||'';b.coOwnerId=b.coOwnerId||null;
      // Owner-remarks shape (My Assets, My Brand)
      b.assets=Array.isArray(b.assets)?b.assets:[];
      b.assets.forEach(a=>{ if(!Array.isArray(a.remarks)) a.remarks=[]; });
      if(!b.brandRemarks||typeof b.brandRemarks!=='object'){
        b.brandRemarks={name:[],color:[],logo:[],description:[],industry:[],overall:[],overview:[],guidelines:[],toneOfVoice:[],positioning:[]};
      } else {
        ['name','color','logo','description','industry','overall','overview','guidelines','toneOfVoice','positioning']
          .forEach(k=>{ if(!Array.isArray(b.brandRemarks[k])) b.brandRemarks[k]=[]; });
      }
    });
  }
  if(saved.TASKS){
    TASKS=saved.TASKS;
    TASKS.forEach(t=>{t.comments=t.comments||[];t.files=t.files||[];t.specFiles=t.specFiles||[];t.score=t.score||0;});
  }
}

async function loadData(){
  buildDemoList(); // show login options immediately with seed data
  if(!_sb){console.log('⚡ Local mode — using seed data');return;}
  try{
    const{data,error}=await _sb.from('app_state').select('data').eq('id',1).single();
    if(!error&&data&&data.data&&(data.data.BRANDS?.length||data.data.MEMBERS?.length)){
      applyLoadedData(data.data);
      buildDemoList();
      console.log('✅ Data loaded from Supabase');
    } else {
      // Push local seed data to Supabase for first-time setup
      console.log('📤 First run — pushing seed data to Supabase');
      await persistToSupabase();
    }
  }catch(e){console.warn('Supabase load failed — using seed data:',e);}
}
function clearData(){
  localStorage.removeItem(DB_KEY);
  location.reload();
}

let CU=null,CBid=null,CCampBid=null,CAssetBid=null,CEditBid=null,CEditMid=null,CBrandFilter='all',CPIMOpen={P:false,I:false,M:false},CNewMemberBrands=[],CEditMemberBrands=[],CTaskView='kanban',CTaskFilter='all',CTaskBrandFilter='',CEditTaskId=null,toastTimer=null;

const G7_NAMES=['Brand Guidelines + Backbone','Website','SEO','Newsletter','Social Media','PR & Articles','Events'];
const G7_DESCS=[
  'Brand guidelines, sales kit, pitch deck, brand architecture — the strategic backbone',
  'Website content, design updates, landing pages, UX improvements',
  'On-page SEO, 15–20 B2B keywords, backlinks, technical audit, rankings',
  'Monthly/bi-monthly segmented newsletter — insights, stories, thought leadership',
  'SM posts (all platforms) · Videos · Reels · Stories · Carousels — medium + creative style define format',
  'PR articles · Thought leadership blogs · Case studies · Media coverage · Employee advocacy',
  'Internal events (R&R, townhall, hackathon) · External (conferences, panels) · pre/during/post amplification'
];
const ACTIVITIES=[
  {u:'PS',bg:'#4eca8b22',c:'#4eca8b',txt:'<strong>Priya</strong> completed SMM post for <strong>TechNest</strong>',time:'12 min ago'},
  {u:'AM',bg:'#5baef722',c:'#5baef7',txt:'<strong>Arjun</strong> moved SEO task to In review — <strong>FinEdge</strong>',time:'45 min ago'},
  {u:'NJ',bg:'#f5a62322',c:'#f5a623',txt:'<strong>Neha</strong> flagged blocker on video task — <strong>GreenBuild</strong>',time:'1 hr ago'},
  {u:'VR',bg:'#f55c5c22',c:'#f55c5c',txt:'<strong>Vikram</strong> got task approved — <strong>AutoDrive</strong>',time:'2 hrs ago'},
  {u:'RK',bg:'#7c6af722',c:'#7c6af7',txt:'<strong>Raj</strong> left remark on PR article — <strong>FinEdge</strong>',time:'3 hrs ago'},
];

// ══════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════
function roleLabel(r){
  if(r==='super-admin')return 'Super Admin';
  if(r==='sam')return 'SAM';
  if(r==='specialist-seo')return 'SEO Specialist';
  if(r==='specialist-graphic')return 'Graphic Specialist';
  if(r==='specialist-video')return 'Video Specialist';
  if(r==='specialist-content')return 'Content Specialist';
  if(r==='specialist')return 'Specialist';
  if(r==='owner'||r==='brand-owner'||r==='client')return 'Owner — Brand Stakeholder';
  if(r==='co-owner'||r==='coowner')return 'Co-Owner — Brand Co-Stakeholder';
  return 'Member';
}
function isBrandOwner(u){return u&&(u.role==='brand-owner'||u.role==='client'||u.role==='owner');}
function roleBadgeCls(r){return r==='super-admin'?'bp':r==='sam'?'ba':r&&r.startsWith('specialist')?'bgr':'bg';}
function isSuperAdmin(u){return u&&u.role==='super-admin';}
function isSAM(u){return u&&(u.role==='sam'||u.role==='super-admin');}
function isBM(u){return isSAM(u);}
function isSpec(u){return u&&(u.role==='specialist'||u.role==='specialist-seo'||u.role==='specialist-graphic'||u.role==='specialist-video'||u.role==='specialist-content');}
function canManage(u){return u&&(u.role==='sam'||u.role==='super-admin');}
function canBeAssigned(u){return isSpec(u)||canManage(u);}
function canSeeMyWork(u){return canManage(u)||isSpec(u);}
function canSeeBrands(u){return canManage(u)||isBrandOwner(u);}
function canSeeReports(u){return canManage(u)||isSpec(u);}
function canSeeSettings(u){return isSuperAdmin(u);}
function canSeeTeam(u){return isSuperAdmin(u);}
function canSeeLookups(u){return isSuperAdmin(u);}
function canSeeProductivity(u){return canManage(u);}
function canAddBrand(u){return isSuperAdmin(u);}
function canDeleteBrand(u){return isSuperAdmin(u);}
function canTransferBrand(u){return isSuperAdmin(u);}
function canArchiveBrand(u){return isSuperAdmin(u);}

function buildDemoList(){
  const demos=[];
  ['super-admin','sam','specialist'].forEach(r=>{
    const m=MEMBERS.find(x=>x.active&&x.role===r);
    if(m)demos.push(m);
  });
  // Show brand owner accounts
  MEMBERS.filter(x=>x.active&&['brand-owner','owner','client'].includes(x.role)).forEach(m=>demos.push(m));
  document.getElementById('demo-list').innerHTML=demos.map(m=>
    `<div class="demo-item" onclick="quickLogin('${m.username}','${m.password}')"><div class="dii"><div class="dav" style="background:${m.bg};color:${m.color}">${m.initials}</div><div><div style="font-size:12px;font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--text3)">${roleLabel(m.role)}${m.title?' · '+m.title:''}</div></div></div><div style="font-size:11px;color:var(--accent2)">Use →</div></div>`
  ).join('');
}
let NOTIFICATIONS=[];
let LOOKUPS={
  objectives:['Brand Awareness','Lead Generation','Product Launch','Customer Retention','Thought Leadership','Event Promotion','Sales Enablement','Community Building','Crisis Communication'],
  formats:['Static image','Carousel','Video','GIF','Reel','Short video','Article','Blog','PR article','Newsletter','Story','Podcast','Infographic','Paid Campaign','Event'],
  platforms:['LinkedIn','Instagram','Facebook','Twitter/X','YouTube','Email','WhatsApp','SEO/Blog','PR/Media','Google Ads','Events','OOH/Print'],
  activities:['Social Media','PR & Articles','Events','SEO','Website','Newsletter','Paid Ads'],
  currencies:['₹','$','€','£','AED','SGD'],
  industries:['Automotive','Technology','Healthcare','Finance','Education','Retail','Real Estate','Manufacturing','Food & Beverage','Media & Entertainment','Logistics','Energy','Hospitality','Non-profit','Other'],
  focusAreas:['AF-X','ISV','DES','ENT','SMB','General','Brand','Product','Event'],
  g1Deliverables:['Brand guidelines doc','Sales kit','Pitch deck','Brand architecture','Messaging framework','Visual identity'],
  g2WorkTypes:['New page','Content update','Landing page','Design fix','Technical fix','Performance'],
  g3SeoFocus:['Keyword research','On-page optimisation','Backlink building','Technical audit','Content gap analysis','Local SEO'],
  timeActivities:['Strategy','Briefing','Client call','Campaign planning','Content review','Approval review','Reporting','Internal meeting','Research','Training','Other'],
  campaignLibrary:['Brand Awareness','Brand Recall','Brand Positioning','Brand Launch','Product Launch','New Feature Launch','Product Demo Campaign','Lead Generation','Performance Marketing','Conversion Campaign','Blog Content Series','Thought Leadership','SEO Content Push','Social Media Growth','Community Building','Influencer Campaign','Seasonal Campaign','Festive Campaign','Year-end Campaign','Customer Retention','Customer Success Stories','Loyalty Campaign','Event Promotion','Webinar Series','Conference Campaign','Email Marketing','Newsletter Campaign','Drip Campaign','Partnership Campaign','PR & Media','Awards & Recognition','Employee Advocacy','Sales Promotion','Flash Sale'],
  milestoneBuffers:{briefToApproval:3,approvalToDesign:5,designToFinal:5,finalToPost:2}
};
// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown',function(e){
  // Esc — close any open modal, notification panel, or MW detail
  if(e.key==='Escape'){
    if(CWizard&&CWizard.open){wizardClose();return;}
    const overlay=document.getElementById('modal-overlay');
    if(overlay&&overlay.classList.contains('open')){closeModal();return;}
    const notifPanel=document.getElementById('notif-panel');
    if(notifPanel){notifPanel.remove();return;}
    const cpModal=document.getElementById('modal-cp');
    if(cpModal){cpModal.remove();return;}
    closeMWDetail&&closeMWDetail();
    return;
  }
  // Ignore shortcuts when typing in an input/textarea
  if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;
  // D — Dashboard
  if(e.key==='d'||e.key==='D'){showScreen('dashboard',document.querySelector('.navi'));return;}
  // T — Tasks
  if(e.key==='t'||e.key==='T'){showScreen('tasks',null);return;}
  // B — Brands
  if(e.key==='b'||e.key==='B'){showScreen('brands',null);return;}
  // N — New task (if BM/SAM)
  if((e.key==='n'||e.key==='N')&&canManage(CU)){openAddTask();return;}
  // ? — Show shortcuts help
  if(e.key==='?'){
    toast('⌨ D=Dashboard  T=Tasks  B=Brands  N=New task  Esc=Close','var(--accent)',4000);
  }
});

loadData();
applyTheme();
document.addEventListener('DOMContentLoaded',buildDemoList);
if(document.readyState!=='loading')buildDemoList();
function buildLookups(){
  if(!isSAM(CU))return;
  const el=document.getElementById('lookups-body');if(!el)return;

  const LOOKUP_DEFS=[
    {key:'objectives',    label:'Campaign objectives',      icon:'🎯', desc:'Options in the campaign objective dropdown'},
    {key:'formats',       label:'Content formats',          icon:'🖼', desc:'Format options in planning rows (Static image, Video etc)'},
    {key:'platforms',     label:'Platforms',                icon:'📱', desc:'Platform options in planning rows and campaign M field'},
    {key:'activities',    label:'Activity types',           icon:'⚡', desc:'Activity options in planning rows (Social Media, PR etc)'},
    {key:'currencies',    label:'Currencies',               icon:'💰', desc:'Currency symbols in budget field'},
    {key:'industries',    label:'Industries',               icon:'🏭', desc:'Industry options when creating brands'},
    {key:'focusAreas',    label:'Focus areas',              icon:'📌', desc:'Focus area options for monthly planning (AF-X, ISV, DES etc)'},
    {key:'g1Deliverables',label:'G1 — Brand deliverables',  icon:'🎨', desc:'Deliverable options under G1 Brand Guidelines activity'},
    {key:'g2WorkTypes',   label:'G2 — Website work types',  icon:'🌐', desc:'Work type options under G2 Website activity'},
    {key:'g3SeoFocus',    label:'G3 — SEO focus areas',     icon:'🔍', desc:'SEO focus options under G3 SEO activity'},
    {key:'timeActivities',label:'Time log activity types',   icon:'⏱', desc:'Activity types for SAM/BM time logging per brand'},
    {key:'campaignLibrary',label:'Campaign library',         icon:'🎯', desc:'Predefined campaign names in the New Campaign wizard — add, edit or remove options'},
  ];

  const mb=LOOKUPS.milestoneBuffers||{briefToApproval:3,approvalToDesign:5,designToFinal:5,finalToPost:2};
  const bufHtml='<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:12px">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span>📅</span><div><div style="font-size:13px;font-weight:600">Milestone buffers</div><div style="font-size:11px;color:var(--text3)">Days between milestones — auto-calculated from post date</div></div></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">'
    +'<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">📋 Brief → ✅ Brief approval</div><div style="display:flex;align-items:center;gap:6px"><input type="number" min="1" max="30" value="'+mb.briefToApproval+'" id="buf-briefToApproval" style="width:50px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 6px;font-size:13px;color:var(--text);text-align:center"> <span style="font-size:11px;color:var(--text3)">days</span></div></div>'
    +'<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">✅ Brief approval → 🎨 Design</div><div style="display:flex;align-items:center;gap:6px"><input type="number" min="1" max="30" value="'+mb.approvalToDesign+'" id="buf-approvalToDesign" style="width:50px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 6px;font-size:13px;color:var(--text);text-align:center"> <span style="font-size:11px;color:var(--text3)">days</span></div></div>'
    +'<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">🎨 Design ready → ✅ Final approval</div><div style="display:flex;align-items:center;gap:6px"><input type="number" min="1" max="30" value="'+mb.designToFinal+'" id="buf-designToFinal" style="width:50px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 6px;font-size:13px;color:var(--text);text-align:center"> <span style="font-size:11px;color:var(--text3)">days</span></div></div>'
    +'<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">✅ Final approval → 📤 Post</div><div style="display:flex;align-items:center;gap:6px"><input type="number" min="1" max="30" value="'+mb.finalToPost+'" id="buf-finalToPost" style="width:50px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 6px;font-size:13px;color:var(--text);text-align:center"> <span style="font-size:11px;color:var(--text3)">days</span></div></div>'
    +'</div>'
    +'<button class="btn btn-p" onclick="saveMilestoneBuffers()">Save buffers</button>'
    +'</div>';
  el.innerHTML=bufHtml+LOOKUP_DEFS.map(def=>`
    <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="font-size:16px">${def.icon}</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600">${def.label}</div>
          <div style="font-size:11px;color:var(--text3)">${def.desc}</div>
        </div>
        <button class="btn btn-sm btn-p" onclick="addLookupItem('${def.key}')">+ Add</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px" id="lookup-items-${def.key}">
        ${(LOOKUPS[def.key]||[]).map((item,i)=>`
          <div data-lookup-idx="${i}" style="display:flex;align-items:center;gap:4px;padding:3px 8px;background:${item.toLowerCase()==='other'?'var(--ambg)':'var(--bg3)'};border:.5px solid ${item.toLowerCase()==='other'?'var(--amborder)':'var(--border)'};border-radius:var(--rsm)">
            <span style="font-size:12px;color:${item.toLowerCase()==='other'?'var(--amber)':''}">${item}</span>
            <button onclick="editLookupItem('${def.key}',${i})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:11px;padding:0 2px" title="Edit">✏</button>
            <button onclick="removeLookupItem('${def.key}',${i})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:13px;padding:0 2px" title="Remove">×</button>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function addLookupItem(key){
  const container=document.getElementById('lookup-items-'+key);if(!container)return;
  // Check if inline input already open
  if(container.querySelector('.lookup-add-input'))return;
  const row=document.createElement('div');
  row.className='lookup-add-input';
  row.style.cssText='display:flex;align-items:center;gap:6px;padding:3px 8px;background:var(--acbg);border:1.5px solid var(--accent);border-radius:var(--rsm)';
  row.innerHTML=`<input id="lookup-new-${key}" placeholder="Type and press Enter..." style="background:none;border:none;outline:none;font-family:var(--font);font-size:12px;color:var(--text);width:160px" autofocus>
    <button onclick="saveLookupNewItem('${key}')" style="background:var(--accent);border:none;border-radius:4px;color:#fff;font-size:10px;padding:2px 7px;cursor:pointer;font-family:var(--font)">Add</button>
    <button onclick="this.closest('.lookup-add-input').remove()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px;line-height:1">×</button>`;
  container.appendChild(row);
  setTimeout(()=>{
    const inp=document.getElementById('lookup-new-'+key);
    if(inp){inp.focus();inp.addEventListener('keydown',e=>{if(e.key==='Enter')saveLookupNewItem(key);if(e.key==='Escape')row.remove();});}
  },50);
}

function saveLookupNewItem(key){
  const inp=document.getElementById('lookup-new-'+key);if(!inp)return;
  const val=inp.value.trim();
  if(!val){inp.focus();return;}
  if(!LOOKUPS[key])LOOKUPS[key]=[];
  if(LOOKUPS[key].map(x=>x.toLowerCase()).includes(val.toLowerCase())){toast('Already exists','var(--amber)');inp.focus();return;}
  LOOKUPS[key].push(val);
  persist();buildLookups();
  toast('✓ Added: '+val,'var(--green)');
}

function editLookupItem(key,idx){
  const container=document.getElementById('lookup-items-'+key);if(!container)return;
  const chips=container.querySelectorAll('[data-lookup-idx]');
  const chip=container.querySelector(`[data-lookup-idx="${idx}"]`);if(!chip)return;
  const old=LOOKUPS[key][idx];
  // Replace chip with inline edit
  const row=document.createElement('div');
  row.style.cssText='display:flex;align-items:center;gap:6px;padding:3px 8px;background:var(--acbg);border:1.5px solid var(--accent);border-radius:var(--rsm)';
  row.innerHTML=`<input id="lookup-edit-${key}-${idx}" value="${old}" style="background:none;border:none;outline:none;font-family:var(--font);font-size:12px;color:var(--text);width:160px">
    <button onclick="saveLookupEdit('${key}',${idx},this)" style="background:var(--accent);border:none;border-radius:4px;color:#fff;font-size:10px;padding:2px 7px;cursor:pointer;font-family:var(--font)">Save</button>
    <button onclick="buildLookups()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px;line-height:1">×</button>`;
  chip.replaceWith(row);
  const inp=document.getElementById(`lookup-edit-${key}-${idx}`);
  if(inp){inp.focus();inp.select();inp.addEventListener('keydown',e=>{if(e.key==='Enter')saveLookupEdit(key,idx,inp);if(e.key==='Escape')buildLookups();});}
}

function saveLookupEdit(key,idx,el){
  const inp=el.closest('div').querySelector('input');if(!inp)return;
  const val=inp.value.trim();
  if(!val||val===LOOKUPS[key][idx]){buildLookups();return;}
  LOOKUPS[key][idx]=val;
  persist();buildLookups();
  toast('✓ Updated','var(--green)');
}

// ── "Other" option handler for lookup dropdowns ──
// Usage: <select onchange="handleOtherSelect(this,'custom-input-id')">
function handleOtherSelect(selectEl, customInputId){
  const wrap=document.getElementById(customInputId);
  if(!wrap)return;
  if(selectEl.value==='Other'||selectEl.value==='other'){
    wrap.style.display='flex';
    wrap.querySelector('input')?.focus();
  } else {
    wrap.style.display='none';
    const inp=wrap.querySelector('input');
    if(inp)inp.value='';
  }
}
// Build a select with Other+textbox pattern
function buildSelectWithOther(items, selectedVal, id, onchangeExtra){
  const opts=items.map(v=>`<option value="${v}" ${v===selectedVal?'selected':''}>${v}</option>`).join('');
  const isOther=selectedVal&&!items.includes(selectedVal)&&selectedVal!=='';
  const customId=id+'-custom-wrap';
  return `<select class="fsel" id="${id}" onchange="handleOtherSelect(this,'${customId}')${onchangeExtra?';'+onchangeExtra:''}">
    <option value="">— Select —</option>
    ${opts}
    <option value="Other" ${isOther?'selected':''}>Other (custom)</option>
  </select>
  <div id="${customId}" style="display:${isOther?'flex':'none'};align-items:center;gap:6px;margin-top:6px">
    <input class="finp" placeholder="Type custom value..." value="${isOther?selectedVal:''}" style="flex:1" oninput="document.getElementById('${id}').dataset.custom=this.value">
  </div>`;
}
function getSelectWithOtherValue(id){
  const el=document.getElementById(id);if(!el)return '';
  if(el.value==='Other'||el.value==='other'){
    const inp=document.getElementById(id+'-custom-wrap')?.querySelector('input');
    return inp?inp.value.trim():el.dataset.custom||'';
  }
  return el.value;
}

function removeLookupItem(key,idx){
  const item=LOOKUPS[key][idx];
  if(!confirm('Remove "'+item+'" from '+key+'?'))return;
  LOOKUPS[key].splice(idx,1);
  persist();buildLookups();
  toast('Removed: '+item,'var(--amber)');
}


function renderBriefCal(selectedDate, bid, ci, pi){
  const wrap=document.getElementById('brief-cal-wrap');
  const el=document.getElementById('brief-cal');
  if(!wrap||!el)return;
  wrap.style.display='block';
  wrap.style.display='block';


  // Get current month from selected date or today
  const base=(selectedDate&&selectedDate.length>=7)?new Date(selectedDate+'T12:00:00'):new Date();
  const year=base.getFullYear();
  const month=base.getMonth();
  const mk=year+'-'+String(month+1).padStart(2,'0');
  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDay=new Date(year,month,1).getDay();
  const monthLabel=new Date(year,month,1).toLocaleDateString('en-IN',{month:'long',year:'numeric'});

  // Collect all other pieces' post dates for this brand/month
  const b=BRANDS.find(x=>x.id==bid);
  const occupiedDates={};
  if(b){
    b.campaigns.forEach(function(camp,campIdx){
      (camp.contentPieces||[]).forEach(function(piece,pieceIdx){
        if(piece.postDate&&piece.postDate.startsWith(mk)){
          if(campIdx===parseInt(ci)&&pieceIdx===parseInt(pi))return; // skip current piece
          if(!occupiedDates[piece.postDate])occupiedDates[piece.postDate]=[];
          occupiedDates[piece.postDate].push(piece);
        }
      });
    });
  }

  // Current piece platform
  const currPiece=b&&b.campaigns[ci]?b.campaigns[ci].contentPieces[pi]:null;
  const currPlatforms=currPiece?(currPiece.platforms&&currPiece.platforms.length?currPiece.platforms:[currPiece.platform||'']).filter(Boolean):[];

  const SICONS={'Video':'🎬','Reel':'🎬','Static image':'🖼','Carousel':'🎠','Article':'📝','Blog':'📝','Infographic':'📊','Story':'⭕','Podcast':'🎙'};

  var html='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">'
    +'<button onclick="shiftBriefCal(-1,this.dataset.sel,this.dataset.bid,this.dataset.ci,this.dataset.pi)" data-sel="'+selectedDate+'" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+pi+'" style="background:none;border:none;color:var(--text2);cursor:pointer;font-size:14px;padding:0 4px">◀</button>'
    +'<span style="font-size:11px;font-weight:600;color:var(--text2)">'+monthLabel+'</span>'
    +'<button onclick="shiftBriefCal(1,this.dataset.sel,this.dataset.bid,this.dataset.ci,this.dataset.pi)" data-sel="'+selectedDate+'" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+pi+'" style="background:none;border:none;color:var(--text2);cursor:pointer;font-size:14px;padding:0 4px">▶</button>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">';

  ['S','M','T','W','T','F','S'].forEach(function(d){
    html+='<div style="text-align:center;font-size:9px;color:var(--text3);padding:2px">'+d+'</div>';
  });

  for(var i=0;i<firstDay;i++) html+='<div></div>';

  for(var day=1;day<=daysInMonth;day++){
    const dateStr=mk+'-'+String(day).padStart(2,'0');
    const isSelected=dateStr===selectedDate;
    const pieces=occupiedDates[dateStr]||[];
    const today=new Date().toISOString().split('T')[0];
    const isToday=dateStr===today;

    // Check if current piece platform clashes with existing pieces on this day
    var hasClash=false;
    if(currPlatforms.length&&pieces.length){
      pieces.forEach(function(piece){
        const pPlats=piece.platforms&&piece.platforms.length?piece.platforms:[piece.platform||''];
        currPlatforms.forEach(function(cp){
          if(pPlats.includes(cp))hasClash=true;
        });
      });
    }

    const bg=isSelected?'var(--accent)':hasClash?'var(--rbg)':pieces.length?'var(--acbg)':isToday?'var(--bg4)':'var(--bg2)';
    const col=isSelected?'#fff':hasClash?'var(--red)':pieces.length?'var(--accent2)':isToday?'var(--accent)':'var(--text2)';
    const bdr=isSelected?'var(--accent)':hasClash?'var(--rborder)':pieces.length?'var(--acb)':'var(--border)';

    html+='<div style="min-height:36px;background:'+bg+';border:.5px solid '+bdr+';border-radius:3px;padding:2px;cursor:pointer;text-align:center" '
      +'data-date="'+dateStr+'" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+pi+'" '
      +'onclick="pickBriefCalDate(this.dataset.date,this.dataset.bid,this.dataset.ci,this.dataset.pi)">'
      +'<div style="font-size:10px;font-weight:'+(isSelected||isToday?'700':'400')+';color:'+col+'">'+day+'</div>'
      +pieces.slice(0,2).map(function(piece){return'<div style="font-size:8px;color:'+col+';overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(SICONS[piece.creativeStyle]||'📄')+'</div>';}).join('')
      +(hasClash?'<div style="font-size:8px;color:var(--red)">⚠</div>':'')
      +'</div>';
  }
  html+='</div>';

  // Clash warning
  if(selectedDate&&occupiedDates[selectedDate]&&occupiedDates[selectedDate].length){
    const clashPieces=occupiedDates[selectedDate];
    const clashPlats=[];
    var clashMsg='';
    clashPieces.forEach(function(piece){
      const pPlats=piece.platforms&&piece.platforms.length?piece.platforms:[piece.platform||''];
      pPlats.forEach(function(pl){
        if(currPlatforms.includes(pl)&&!clashPlats.includes(pl))clashPlats.push(pl);
      });
    });
    if(clashPlats.length){
      clashMsg='<div style="margin-top:6px;padding:5px 8px;background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);font-size:10px;color:var(--red)">⚠ '+clashPlats.join(', ')+' already has '+(clashPieces.length)+' piece'+(clashPieces.length>1?'s':'')+' on this day</div>';
    } else {
      clashMsg='<div style="margin-top:6px;padding:5px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:10px;color:var(--text3)">'+clashPieces.length+' other piece'+(clashPieces.length>1?'s':'')+' on this day (different platform ✓)</div>';
    }
    html+=clashMsg;
  }

  el.innerHTML=html;
}

function pickBriefCalDate(dateStr,bid,ci,pi){
  const inp=document.getElementById('cp-post-date');
  if(inp){
    inp.value=dateStr;
    // Trigger milestone calculation
    if(dateStr){
      const d=calcMilestonesFromPost(dateStr);
      document.getElementById('cp-brief-date').value=d.briefDue;
      document.getElementById('cp-brief-approval-date').value=d.briefApproval;
      document.getElementById('cp-design-date').value=d.designDue;
      document.getElementById('cp-approval-date').value=d.approvalDue;
    }
  }
  renderBriefCal(dateStr,bid,ci,pi);
}

function shiftBriefCal(dir,selectedDate,bid,ci,pi){
  // Shift calendar by 1 month
  const base=(selectedDate&&selectedDate.length>=7)?new Date(selectedDate+'T12:00:00'):new Date();
  base.setMonth(base.getMonth()+dir);
  const fakeDate=base.getFullYear()+'-'+String(base.getMonth()+1).padStart(2,'0')+'-01';
  renderBriefCal(selectedDate||fakeDate,bid,ci,pi);
  // Store shifted month in calendar div
  document.getElementById('brief-cal').dataset.viewMonth=fakeDate;
}


// ══════════════════════════════════════════
// OWNER FLOW
// ══════════════════════════════════════════

// ── Reusable: build Owner / Co-Owner / Both radio UI for any brand ──
function buildOwnerRecipientUI(bid,namePrefix){
  namePrefix=namePrefix||'owner-recipient';
  const owners=MEMBERS.filter(m=>m.active&&['owner','client','brand-owner','co-owner','coowner'].includes(m.role)&&m.brands&&m.brands.some(x=>x==bid));
  const hasOwner=owners.some(m=>['owner','client','brand-owner'].includes(m.role));
  const hasCoOwner=owners.some(m=>['co-owner','coowner'].includes(m.role));
  const ownerName=owners.find(m=>['owner','client','brand-owner'].includes(m.role))?.name||'Owner';
  const coOwnerName=owners.find(m=>['co-owner','coowner'].includes(m.role))?.name||'Co-Owner';
  if(!hasOwner&&!hasCoOwner)return '<div style="font-size:12px;color:var(--amber);padding:8px">⚠ No owner assigned to this brand</div>';
  if(hasOwner&&!hasCoOwner){
    return `<div style="padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:12px;color:var(--text2)">
      <input type="hidden" name="${namePrefix}" value="owner">
      👤 ${ownerName} <span style="font-size:10px;color:var(--text3)">(Brand Owner)</span>
    </div>`;
  }
  if(!hasOwner&&hasCoOwner){
    return `<div style="padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:12px;color:var(--text2)">
      <input type="hidden" name="${namePrefix}" value="coowner">
      👤 ${coOwnerName} <span style="font-size:10px;color:var(--text3)">(Co-Owner)</span>
    </div>`;
  }
  // Both exist — show radio options
  return `<div style="display:flex;gap:6px">
    <label style="flex:1;display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);cursor:pointer">
      <input type="radio" name="${namePrefix}" value="owner" checked style="accent-color:var(--accent)">
      <div><div style="font-size:12px;font-weight:500">Owner</div><div style="font-size:10px;color:var(--text3)">${ownerName}</div></div>
    </label>
    <label style="flex:1;display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);cursor:pointer">
      <input type="radio" name="${namePrefix}" value="coowner" style="accent-color:var(--accent)">
      <div><div style="font-size:12px;font-weight:500">Co-Owner</div><div style="font-size:10px;color:var(--text3)">${coOwnerName}</div></div>
    </label>
    <label style="flex:1;display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);cursor:pointer">
      <input type="radio" name="${namePrefix}" value="both" style="accent-color:var(--accent)">
      <div style="font-size:12px;font-weight:500">Both</div>
    </label>
  </div>`;
}
function getSelectedRecipient(namePrefix){
  namePrefix=namePrefix||'owner-recipient';
  return document.querySelector(`input[name="${namePrefix}"]:checked`)?.value||document.querySelector(`input[name="${namePrefix}"]`)?.value||'owner';
}

// SAM opens "Send to Owner" modal — choose what to send + who
function openSendToOwnerModal(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const pieces=(camp.contentPieces||[]);
  const owners=MEMBERS.filter(m=>m.active&&['owner','co-owner','coowner','client','brand-owner'].includes(m.role)&&m.brands&&m.brands.some(x=>x==bid));
  if(!owners.length){toast('⚠ No owner assigned to this brand. Assign one in Team settings.','var(--amber)');return;}
  const hasPieces=pieces.length>0;
  const mo=document.createElement('div');mo.id='modal-send-owner';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:520px"><div class="modal-p">
    <div class="mtit">📤 Send to Owner</div>
    <div class="msub">${camp.name} · ${b.name}</div>
    <div style="margin:16px 0 12px">
      <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">What to send</div>
      <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:6px;cursor:pointer">
        <input type="checkbox" id="send-camp-setup" checked style="margin-top:2px;accent-color:var(--accent)">
        <div><div style="font-size:12px;font-weight:600">📋 Campaign setup</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${[camp.T?'T: '+camp.T.substring(0,40):'',camp.E?'E: '+camp.E.substring(0,40):'',camp.outcome?'Outcome: '+camp.outcome.substring(0,40):''].filter(Boolean).join(' · ')||'T, E, Objective, Outcome, Creative plan'}</div></div>
      </label>
      ${hasPieces?`<label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);cursor:pointer">
        <input type="checkbox" id="send-all-pieces" style="margin-top:2px;accent-color:var(--accent)">
        <div><div style="font-size:12px;font-weight:600">📄 All content pieces (${pieces.length})</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${pieces.map(p=>p.topic||p.creativeStyle||'Untitled').slice(0,4).join(' · ')}${pieces.length>4?' +more':''}</div></div>
      </label>`:''}
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Send to</div>
      ${buildOwnerRecipientUI(bid)}
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-send-owner').remove()">Cancel</button>
      <button class="mbtn ok" onclick="confirmSendToOwner('${bid}',${ci})">📤 Send now</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function confirmSendToOwner(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const sendCamp=document.getElementById('send-camp-setup')?.checked;
  const sendPieces=document.getElementById('send-all-pieces')?.checked;
  const recipient=getSelectedRecipient('owner-recipient');
  if(!sendCamp&&!sendPieces){toast('⚠ Select at least one item to send','var(--amber)');return;}
  const now=new Date().toISOString();
  if(sendCamp){
    camp.sentToOwner=true;camp.sentToOwnerBy=CU.name;camp.sentToOwnerAt=now;
    camp.sentToOwnerRecipient=recipient;camp.ownerStatus='pending';
  }
  if(sendPieces){
    (camp.contentPieces||[]).forEach(p=>{
      if(p.copyDir||p.copy||p.topic){
        p.status='pending';p.sentToOwnerBy=CU.name;p.sentToOwnerAt=now;
      }
    });
  }
  addNotification('pending',`Campaign "${camp.name}" sent to owner for review`,bid,null,null);
  persist();buildWsMonthly(b);buildApprovals();
  document.getElementById('modal-send-owner')?.remove();
  toast(`📤 Sent to ${recipient==='both'?'owner & co-owner':recipient}`,'var(--amber)');
}

// Owner approves campaign setup
function approveCampaignByOwner(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const comment=(document.getElementById('camp-owner-comment-'+bid+'-'+ci)||{}).value||'';
  camp.ownerStatus='approved';camp.ownerApprovedBy=CU.name;camp.ownerApprovedAt=new Date().toISOString();
  if(comment){if(!camp.ownerComments)camp.ownerComments=[];camp.ownerComments.push({text:comment,by:CU.name,at:new Date().toISOString(),type:'approval'});}
  addNotification('approved',`Campaign "${camp.name}" approved by ${CU.name}`,bid,null,null);
  persist();buildApprovals();
  toast('✅ Campaign setup approved','var(--green)');
}

// Owner requests changes on campaign
function requestCampaignChanges(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const comment=(document.getElementById('camp-owner-comment-'+bid+'-'+ci)||{}).value||'';
  if(!comment.trim()){toast('⚠ Add a comment explaining what needs to change','var(--amber)');return;}
  camp.ownerStatus='changes';
  if(!camp.ownerComments)camp.ownerComments=[];
  camp.ownerComments.push({text:comment,by:CU.name,at:new Date().toISOString(),type:'changes'});
  addNotification('changes',`Campaign "${camp.name}" — changes requested: ${comment.substring(0,60)}`,bid,null,null);
  persist();buildApprovals();buildDashboard&&buildDashboard();
  toast('❌ Changes requested — SAM notified','var(--red)');
}

// Owner comments on approved piece (no edit — comment only)
function ownerCommentOnPiece(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci]?.contentPieces[pi];if(!p)return;
  const el=document.getElementById(`owner-post-comment-${bid}-${ci}-${pi}`);
  const comment=el?.value?.trim()||'';
  if(!comment){toast('⚠ Add a comment first','var(--amber)');return;}
  if(!p.ownerPostComments)p.ownerPostComments=[];
  p.ownerPostComments.push({text:comment,by:CU.name,at:new Date().toISOString()});
  addNotification('comment',`Owner commented on "${p.topic}": ${comment.substring(0,60)}`,bid,ci,pi);
  persist();buildApprovals();
  if(el)el.value='';
  toast('💬 Comment sent to SAM','var(--accent)');
}

// SAM edits brief after owner approval → task resets to To Do + notifies assignee
function samEditApprovedBrief(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci]?.contentPieces[pi];if(!p)return;
  const mo=document.createElement('div');mo.id='modal-edit-approved';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:460px"><div class="modal-p">
    <div class="mtit">✏ Edit approved brief</div>
    <div class="msub">${p.topic||'Content piece'}</div>
    <div style="padding:10px 12px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);font-size:12px;color:var(--amber);margin-bottom:14px">⚠ Editing will reset the task to <b>To Do</b> and notify the assignee to restart.</div>
    <label class="flbl">Comment / reason for change *</label>
    <textarea class="ftxt" id="edit-approved-comment" style="min-height:64px" placeholder="e.g. Owner requested friendlier tone, updated copy accordingly..."></textarea>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-edit-approved').remove()">Cancel</button>
      <button class="mbtn ok" onclick="confirmSamEditApproved('${bid}',${ci},${pi})">Edit brief →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
  setTimeout(()=>document.getElementById('edit-approved-comment')?.focus(),100);
}

function confirmSamEditApproved(bid,ci,pi){
  const comment=document.getElementById('edit-approved-comment')?.value?.trim();
  if(!comment){toast('⚠ Comment is required','var(--amber)');return;}
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci]?.contentPieces[pi];if(!p)return;
  // Reset piece to brief stage
  p.status='brief';p.publishStatus='';
  if(!p.feedbackHistory)p.feedbackHistory=[];
  p.feedbackHistory.push({round:(p.feedbackHistory.length+1),comment:`[SAM edit] ${comment}`,by:CU.name,at:new Date().toISOString(),status:'edit'});
  // Reset linked task to To Do and notify assignee
  const linkedTask=TASKS.find(t=>t.brandId==b.id&&(String(t.contentPieceRef?.bid)===String(bid)&&t.contentPieceRef?.ci===ci&&t.contentPieceRef?.pi===pi||String(p.taskId)===String(t.id)));
  if(linkedTask){
    const prevStage=linkedTask.stage;linkedTask.stage='todo';linkedTask.specStage='todo';
    if(linkedTask.briefData)linkedTask.briefData={...linkedTask.briefData,copyDir:p.copyDir,copy:p.copy,caption:p.caption,hashtags:p.hashtags};
    const assignee=MEMBERS.find(m=>m.id==linkedTask.assigneeId);
    addNotification('changes',`Brief updated for "${linkedTask.title}" by ${CU.name} — please review and restart: ${comment.substring(0,60)}`,b.id,null,null);
    if(assignee)toast(`🔔 ${assignee.name} notified — task reset to To Do`,'var(--amber)');
    syncPieceStatus(linkedTask);
  }
  persist();buildWsMonthly(b);buildWsContent&&buildWsContent(b);buildTaskViews();
  document.getElementById('modal-edit-approved')?.remove();
  toast('✏ Brief updated — task reset to To Do','var(--amber)');
}

// ══════════════════════════════════════════
// OWNER DASHBOARD (replaces buildApprovals for owner role)
// ══════════════════════════════════════════
function buildOwnerDashboard(){
  if(!CU)return;
  const el=document.getElementById('screen-approvals');if(!el)return;
  const myBrandsIds=((MEMBERS.find(m=>m.id==CU.id)||{}).brands||CU.brands||[]);
  const myBrands=BRANDS.filter(b=>!b.archived&&(!myBrandsIds.length||myBrandsIds.some(id=>id==b.id)));
  const now=new Date();const h=now.getHours();
  const thisMonth=now.toISOString().substring(0,7);

  // Greeting
  const gEl=document.getElementById('owner-greeting');
  if(gEl){const g=h<12?'Good morning':h<17?'Good afternoon':'Good evening';gEl.textContent=g+', '+CU.name.split(' ')[0]+' 👋';}

  // Count stats
  let pendingCount=0,approvedCount=0,activeCamps=0;
  myBrands.forEach(b=>{
    if(b.campaigns){b.campaigns.forEach(c=>{
      if(c.status==='active')activeCamps++;
      if(c.ownerStatus==='pending')pendingCount++;
      (c.contentPieces||[]).forEach(p=>{
        if(p.status==='pending')pendingCount++;
        if(p.status==='approved'&&(p.approvedAt||'').startsWith(thisMonth))approvedCount++;
      });
    });}
  });
  const spEl=document.getElementById('owner-stat-pending');const saEl=document.getElementById('owner-stat-approved');const scEl=document.getElementById('owner-stat-campaigns');
  if(spEl)spEl.textContent=pendingCount;if(saEl)saEl.textContent=approvedCount;if(scEl)scEl.textContent=activeCamps;
  const nb=document.getElementById('nb-approvals');if(nb)nb.textContent=pendingCount||'';
  const sub=document.getElementById('approvals-subtitle');
  if(sub)sub.textContent=pendingCount?`${pendingCount} item${pendingCount!==1?'s':''} need your review`:'All caught up — nothing pending';

  // Build HTML
  let pendingHtml='';let activeHtml='';let historyHtml='';

  myBrands.forEach(b=>{
    const bColor=b.color||'var(--accent)';

    // ── PENDING ITEMS ──
    let bPending='';

    // Campaign setup pending
    (b.campaigns||[]).forEach((camp,ci)=>{
      if(!camp.sentToOwner||camp.ownerStatus!=='pending')return;
      bPending+=buildOwnerCampaignCard(b,camp,ci,true);
    });

    // Content pieces pending
    const pendingPieces=[];
    (b.campaigns||[]).forEach((camp,ci)=>{
      (camp.contentPieces||[]).forEach((p,pi)=>{
        if(p.status==='pending')pendingPieces.push({p,pi,ci,camp});
      });
    });
    if(pendingPieces.length){
      bPending+=pendingPieces.map(({p,pi,ci,camp})=>buildOwnerPieceCard(b,camp,ci,pi,p,true)).join('');
    }

    if(bPending){
      pendingHtml+=`<div style="margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="width:10px;height:10px;border-radius:50%;background:${bColor};display:inline-block;flex-shrink:0"></span>
          <span style="font-size:14px;font-weight:700">${b.name}</span>
          <span style="font-size:11px;color:var(--amber);background:var(--ambg);padding:2px 8px;border-radius:9px;border:.5px solid var(--amborder)">⏳ Needs review</span>
        </div>
        ${bPending}
      </div>`;
    }

    // ── ACTIVE CAMPAIGNS ──
    const activeCampaigns=(b.campaigns||[]).filter((c,ci)=>c.status==='active'&&(!c.sentToOwner||c.ownerStatus!=='pending'));
    if(activeCampaigns.length){
      activeHtml+=`<div style="margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="width:10px;height:10px;border-radius:50%;background:${bColor};display:inline-block;flex-shrink:0"></span>
          <span style="font-size:14px;font-weight:700">${b.name}</span>
        </div>
        ${activeCampaigns.map((camp,_)=>{
          const ci=(b.campaigns||[]).indexOf(camp);
          return buildOwnerCampaignCard(b,camp,ci,false);
        }).join('')}
      </div>`;
    }

    // ── HISTORY ──
    const histPieces=[];
    (b.campaigns||[]).forEach((camp,ci)=>{
      (camp.contentPieces||[]).forEach((p,pi)=>{
        if(p.status==='approved'&&(p.publishStatus==='scheduled'||p.publishStatus==='published'))
          histPieces.push({p,pi,ci,camp,b});
      });
    });
    if(histPieces.length){
      historyHtml+=`<div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;color:var(--text2);margin-bottom:6px;display:flex;align-items:center;gap:6px">
          <span style="width:8px;height:8px;border-radius:50%;background:${bColor};display:inline-block"></span>${b.name}
        </div>
        ${histPieces.map(({p,pi,ci,camp})=>`
          <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:5px">
            <span style="font-size:14px">${p.publishStatus==='published'?'📢':'🗓'}</span>
            <div style="flex:1"><div style="font-size:12px;font-weight:500">${p.topic||'Untitled'}</div>
              <div style="font-size:10px;color:var(--text3)">${camp.name}${p.platform?' · '+p.platform:''}${p.postDate?' · '+p.postDate:''}</div>
            </div>
            <span style="font-size:10px;padding:2px 8px;border-radius:9px;background:${p.publishStatus==='published'?'var(--gnbg)':'var(--acbg)'};color:${p.publishStatus==='published'?'var(--green)':'var(--accent2)'};border:.5px solid ${p.publishStatus==='published'?'var(--gnb)':'var(--acb)'}">${p.publishStatus==='published'?'📢 Published':'🗓 Scheduled'}</span>
          </div>`).join('')}
      </div>`;
    }
  });

  const pendingEl=document.getElementById('approvals-pending');
  const doneEl=document.getElementById('approvals-done');
  if(!pendingEl)return;

  // Empty state
  if(!pendingHtml&&!activeHtml){
    pendingEl.innerHTML=`<div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--r);padding:28px;text-align:center;margin-bottom:16px">
      <div style="font-size:28px;margin-bottom:8px">✅</div>
      <div style="font-size:14px;font-weight:600;color:var(--green)">All caught up!</div>
      <div style="font-size:12px;color:var(--green);margin-top:4px">No pending approvals right now</div>
    </div>`;
    if(doneEl)doneEl.innerHTML=historyHtml?`<div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px">📢 Published & Scheduled</div>${historyHtml}`:'';
    return;
  }

  pendingEl.innerHTML=(pendingHtml?`<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:var(--amber);display:inline-block"></span>Pending your review</div>${pendingHtml}`:'')
    +(activeHtml?`<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:12px;margin-top:${pendingHtml?'24px':'0'};display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:var(--green);display:inline-block"></span>Active campaigns</div>${activeHtml}`:'');

  if(doneEl)doneEl.innerHTML=historyHtml?`<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:var(--teal);display:inline-block"></span>Published & Scheduled</div>${historyHtml}`:'';
}

// Build campaign context card for owner
function buildOwnerCampaignCard(b,camp,ci,isPending){
  const mediums=Array.isArray(camp.M)?camp.M.join(', '):(camp.M||'');
  const creatives=Array.isArray(camp.C)?camp.C.join(', '):(camp.C||'');
  const statusBg=camp.status==='active'?'var(--gnbg)':camp.status==='planning'?'var(--ambg)':'var(--bg3)';
  const statusCol=camp.status==='active'?'var(--green)':camp.status==='planning'?'var(--amber)':'var(--text3)';
  const statusBorder=camp.status==='active'?'var(--gnb)':camp.status==='planning'?'var(--amborder)':'var(--border)';
  const statusLabel=camp.status==='active'?'🟢 Active':camp.status==='planning'?'📋 Planning':camp.status==='paused'?'⏸ Paused':'✅ Complete';
  // Only pieces actually sent to owner
  const ownerPieces=(camp.contentPieces||[]).map((p,pi)=>({p,pi})).filter(({p})=>p.status==='pending'||(p.sentToOwnerAt&&(p.status==='approved'||p.status==='changes')));
  const pendingPieces=ownerPieces.filter(({p})=>p.status==='pending');
  const commentHistory=(camp.ownerComments||[]).map(c=>
    `<div style="font-size:11px;padding:6px 8px;background:${c.type==='changes'?'var(--rbg)':c.type==='approval'?'var(--gnbg)':'var(--bg3)'};border-radius:var(--rsm);margin-bottom:4px">
      <span style="color:${c.type==='changes'?'var(--red)':c.type==='approval'?'var(--green)':'var(--text2)'};font-weight:600">${c.by}</span>
      <span style="color:var(--text3);font-size:10px"> · ${new Date(c.at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</span>
      <div style="color:var(--text2);margin-top:2px">${c.text}</div>
    </div>`).join('');
  const campType=camp.po||camp.budgetType||'';
  const typeHtml=campType?`<div style="padding:8px 10px;background:var(--bg3);border-radius:var(--rsm)">
    <div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Type</div>
    <div style="font-size:12px;color:var(--text)">${campType==='organic'?'🌱 Organic':'⚡ Inorganic'}${camp.budgetAmt?` <span style="color:var(--text3);margin-left:6px">${camp.currency||'₹'}${Number(camp.budgetAmt).toLocaleString('en-IN')}</span>`:''}</div>
  </div>`:'';
  return`<div style="background:var(--bg2);border:1.5px solid ${isPending?'var(--amborder)':'var(--border)'};border-radius:var(--r);margin-bottom:12px;overflow:hidden">
    <div style="padding:14px 16px 12px;border-bottom:.5px solid var(--border)">
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
        <div style="font-size:18px">🎯</div>
        <div style="flex:1">
          <div style="font-size:16px;font-weight:700">${camp.name}</div>
          ${camp.objective?`<div style="font-size:11px;color:var(--text3);margin-top:2px">${camp.objective}</div>`:''}
        </div>
        <span style="font-size:11px;padding:4px 12px;border-radius:9px;background:${statusBg};color:${statusCol};border:.5px solid ${statusBorder};flex-shrink:0;font-weight:600">${statusLabel}</span>
      </div>
      ${camp.outcome?`<div style="padding:10px 12px;background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);margin-bottom:12px">
        <div style="font-size:9px;font-weight:700;color:var(--accent2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:4px">📌 Outcome Statement</div>
        <div style="font-size:12px;color:var(--text);line-height:1.55">${camp.outcome}</div>
      </div>`:''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        ${camp.T?`<div style="padding:8px 10px;background:var(--bg3);border-radius:var(--rsm)"><div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">T — Target audience</div><div style="font-size:12px;color:var(--text)">${camp.T}</div></div>`:''}
        ${camp.E?`<div style="padding:8px 10px;background:var(--bg3);border-radius:var(--rsm)"><div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">E — Elevator pitch</div><div style="font-size:12px;color:var(--text);line-height:1.4">${camp.E}</div></div>`:''}
        ${typeHtml}
        ${camp.objective?`<div style="padding:8px 10px;background:var(--bg3);border-radius:var(--rsm)"><div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Objective</div><div style="font-size:12px;color:var(--text)">${camp.objective}</div></div>`:''}
      </div>
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        ${(camp.campFocus||[]).map(f=>`<span style="font-size:10px;padding:2px 9px;background:var(--acbg);color:var(--accent2);border:.5px solid var(--acb);border-radius:9px;font-weight:600">${f}</span>`).join('')}
        ${mediums?`<span style="font-size:10px;color:var(--text2);padding:2px 9px;background:var(--bg3);border:.5px solid var(--border);border-radius:9px">M: ${mediums}</span>`:''}
        ${creatives?`<span style="font-size:10px;color:var(--text2);padding:2px 9px;background:var(--bg3);border:.5px solid var(--border);border-radius:9px">C: ${creatives}</span>`:''}
      </div>
    </div>
    ${commentHistory?`<div style="padding:10px 14px;border-bottom:.5px solid var(--border);background:var(--bg3)">
      <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Comments</div>
      ${commentHistory}
    </div>`:''}
    ${isPending?`<div style="padding:12px 14px;background:var(--ambg);border-bottom:.5px solid var(--amborder)">
      <div style="font-size:12px;color:var(--amber);font-weight:600;margin-bottom:8px">⏳ This campaign setup needs your approval</div>
      <textarea id="camp-owner-comment-${b.id}-${ci}" class="ftxt" style="min-height:56px;font-size:12px;margin-bottom:8px" placeholder="Comment (optional for approval, required for changes)..."></textarea>
      <div style="display:flex;gap:8px">
        <button class="btn" style="flex:1;background:var(--gnbg);border-color:var(--gnb);color:var(--green);font-size:13px;padding:10px;font-weight:700" onclick="approveCampaignByOwner('${b.id}',${ci})">✅ Approve campaign</button>
        <button class="btn" style="flex:1;background:var(--rbg);border-color:var(--rborder);color:var(--red);font-size:13px;padding:10px;font-weight:700" onclick="requestCampaignChanges('${b.id}',${ci})">❌ Request changes</button>
      </div>
    </div>`:`<div style="padding:10px 14px;border-bottom:.5px solid var(--border)">
      <textarea id="camp-owner-comment-${b.id}-${ci}" class="ftxt" style="min-height:40px;font-size:11px;margin-bottom:6px" placeholder="💬 Comment on this campaign..."></textarea>
      <button class="btn btn-sm" onclick="ownerCommentCampaign('${b.id}',${ci})">💬 Send comment</button>
    </div>`}
    ${ownerPieces.length?`<div style="padding:10px 14px">
      <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Content pieces (${ownerPieces.length}) · ${pendingPieces.length} pending</div>
      ${ownerPieces.map(({p,pi})=>buildOwnerPieceCard(b,camp,ci,pi,p,p.status==='pending')).join('')}
    </div>`:''}
  </div>`;
}

function buildOwnerPieceCard(b,camp,ci,pi,p,isPending){
  const SICONS={Video:'🎬',Reel:'🎬','Static image':'🖼',Carousel:'🎠',Article:'📝',Blog:'📝',Infographic:'📊',Story:'⭕'};
  const icon=SICONS[p.creativeStyle]||'📄';
  const sc=isPending?'var(--amber)':p.status==='approved'?'var(--green)':'var(--red)';
  const sl=isPending?'⏳ Pending':p.status==='approved'?'✅ Approved':'❌ Changes';
  const postComments=(p.ownerPostComments||[]);

  return`<div style="padding:12px;background:${isPending?'var(--ambg)':'var(--bg3)'};border:.5px solid ${isPending?'var(--amborder)':'var(--border)'};border-radius:var(--rsm);margin-bottom:8px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      <span style="font-size:16px">${icon}</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600">${p.topic||'Untitled'}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:1px">${camp.name}${p.platform?' · '+p.platform:''}${p.creativeStyle?' · '+p.creativeStyle:''}</div>
      </div>
      <span style="font-size:10px;padding:2px 8px;border-radius:9px;color:${sc};background:${sc}18;border:.5px solid ${sc}44;font-weight:600">${sl}</span>
    </div>
    ${p.copy||p.copyDir||p.caption?`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:8px;font-size:11px">
      ${p.copyDir?`<div style="margin-bottom:5px"><span style="color:var(--text3);font-weight:600">Direction: </span><span style="color:var(--text2)">${p.copyDir}</span></div>`:''}
      ${p.copy?`<div style="margin-bottom:5px"><span style="color:var(--text3);font-weight:600">Copy: </span><span style="color:var(--text2)">${p.copy}</span></div>`:''}
      ${p.caption?`<div style="margin-bottom:5px"><span style="color:var(--text3);font-weight:600">Caption: </span><span style="color:var(--text2)">${p.caption}</span></div>`:''}
      ${p.hashtags?`<div><span style="color:var(--text3);font-weight:600">Hashtags: </span><span style="color:var(--accent2)">${p.hashtags}</span></div>`:''}
    </div>`:''}
    ${p.visualIdea?`<div style="font-size:11px;color:var(--text2);margin-bottom:8px"><span style="color:var(--text3);font-weight:600">Visual: </span>${p.visualIdea}</div>`:''}
    ${(p.postDate||p.briefDue)?`<div style="display:flex;gap:8px;flex-wrap:wrap;font-size:10px;color:var(--text3);margin-bottom:8px">
      ${p.briefDue?`<span>📋 Brief: <b style="color:var(--text2)">${p.briefDue}</b></span>`:''}
      ${p.postDate?`<span>📤 Post: <b style="color:var(--text2)">${p.postDate}</b></span>`:''}
    </div>`:''}
    ${p.feedbackHistory&&p.feedbackHistory.length?`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px;margin-bottom:8px">
      <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px">Previous feedback</div>
      ${p.feedbackHistory.map(h=>`<div style="font-size:11px;color:var(--text2);padding:2px 0">${h.by}: ${h.comment}</div>`).join('')}
    </div>`:''}
    ${postComments.length?`<div style="margin-bottom:8px">${postComments.map(c=>`<div style="font-size:11px;padding:5px 8px;background:var(--acbg);border-left:2px solid var(--accent2);border-radius:0 var(--rsm) var(--rsm) 0;margin-bottom:3px"><span style="color:var(--accent2);font-weight:600">${c.by}: </span>${c.text}</div>`).join('')}</div>`:''}
    ${isPending?`<div style="display:flex;gap:8px;margin-bottom:8px">
      <button class="btn" style="flex:1;background:var(--gnbg);border-color:var(--gnb);color:var(--green);padding:9px;font-weight:600" onclick="approveByOwner('${b.id}',${ci},${pi})">✅ Approve</button>
      <button class="btn" style="flex:1;background:var(--rbg);border-color:var(--rborder);color:var(--red);padding:9px;font-weight:600" onclick="requestChanges('${b.id}',${ci},${pi})">❌ Request changes</button>
    </div>
    <textarea id="owner-comment-${b.id}-${ci}-${pi}" class="ftxt" style="min-height:42px;font-size:11px" placeholder="Comment (optional for approval, required for changes)..."></textarea>`
    :p.status==='approved'?`<div style="margin-top:4px">
      <textarea id="owner-post-comment-${b.id}-${ci}-${pi}" class="ftxt" style="min-height:36px;font-size:11px;margin-bottom:6px" placeholder="💬 Comment on this approved piece..."></textarea>
      <button class="btn btn-sm" onclick="ownerCommentOnPiece('${b.id}',${ci},${pi})">Send comment</button>
    </div>`:''}
  </div>`;
}

// Owner comments on an active campaign (not approval, just a note)
function ownerCommentCampaign(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const el=document.getElementById('camp-owner-comment-'+bid+'-'+ci);
  const comment=el?.value?.trim()||'';
  if(!comment){toast('⚠ Add a comment','var(--amber)');return;}
  if(!camp.ownerComments)camp.ownerComments=[];
  camp.ownerComments.push({text:comment,by:CU.name,at:new Date().toISOString(),type:'comment'});
  addNotification('comment',`Owner commented on campaign "${camp.name}": ${comment.substring(0,60)}`,bid,null,null);
  persist();buildApprovals();
  if(el)el.value='';
  toast('💬 Comment sent to SAM','var(--accent)');
}

function buildApprovals(){
  if(!CU)return;
  if(['owner','coowner','client','brand-owner','co-owner'].includes(CU.role)){buildOwnerDashboard();return;}
}

// Collapse/expand an approval card
function toggleApCard(cardId){
  const body=document.getElementById(cardId+'-body');
  const arrow=document.getElementById(cardId+'-arrow');
  const toggle=document.getElementById(cardId+'-toggle');
  if(!body)return;
  const isOpen=body.style.display!=='none';
  body.style.display=isOpen?'none':'block';
  if(arrow)arrow.style.transform=isOpen?'rotate(-90deg)':'rotate(0deg)';
  if(toggle)toggle.textContent=isOpen?'+':'−';
}

function filterApprovals(btn,brandId){
  document.querySelectorAll('.apf-btn').forEach(function(b){
    b.style.background='var(--bg3)';b.style.color='var(--text2)';b.style.borderColor='var(--border)';
  });
  btn.style.background='var(--accent)';btn.style.color='#fff';btn.style.borderColor='var(--acb)';
  const filterVal=String(brandId);
  document.querySelectorAll('.ap-brand').forEach(function(el){
    const elBrand=String(el.dataset.brandId||'');
    el.style.display=(filterVal==='all'||elBrand===filterVal)?'block':'none';
  });
}


function setApprovalsFilter(btn){
  const brandId=btn.getAttribute('data-bid');
  const filterEl=document.getElementById('approvals-filter');
  if(filterEl)filterEl.setAttribute('data-active',brandId);
  buildApprovals();
}



function bmApproveCPDirect(){
  const b=BRANDS.find(x=>x.id==CCPBid);if(!b){toast('⚠ Brand not found','var(--red)');return;}
  const camp=b.campaigns[CCPCampIdx];if(!camp){toast('⚠ Campaign not found','var(--red)');return;}
  const p=camp.contentPieces[CCPPieceIdx];if(!p){toast('⚠ Piece not found','var(--red)');return;}
  p.status='approved';
  p.approvedBy=CU.name;
  p.approvedAt=new Date().toISOString();
  p.publishStatus='ready';
  // Snapshot files (deduplicated) so Publishing Queue shows only current versions
  const seen=new Set();
  p.ownerSpecFiles=[...(p.specFiles||[])].reverse().filter(f=>{
    if(seen.has(f.name))return false;seen.add(f.name);return true;
  }).reverse();
  addNotification('approved',`"${p.topic}" approved by ${CU.name} — ready to publish`,CCPBid,CCPCampIdx,CCPPieceIdx);
  persist();
  document.getElementById('modal-cp').remove();
  buildWsContent(b);buildWsMonthly(b);updatePubQueueBadge(b);
  buildTaskViews();
  // Navigate to Publishing Queue if on this brand's workspace
  if(CBid==CCPBid){
    const pqTab=document.querySelector('.wstab:nth-child(6)');
    showWsPanel('pubqueue',pqTab);
  }
  toast(`✅ "${p.topic}" approved — check Publishing Queue`,'var(--green)');
}

function bmSendCPToOwner(){
  const b=BRANDS.find(x=>x.id==CCPBid);if(!b)return;
  const p=b.campaigns[CCPCampIdx].contentPieces[CCPPieceIdx];
  p.status='pending';
  p.sentToOwnerAt=new Date().toISOString();
  p.sentToOwnerBy=CU.name;
  // Snapshot the current files — deduplicate by name, keeping the latest version of each file
  const seen=new Set();
  p.ownerSpecFiles=[...(p.specFiles||[])].reverse().filter(f=>{
    if(seen.has(f.name))return false;
    seen.add(f.name);return true;
  }).reverse();
  addNotification('pending',`"${p.topic}" sent for your approval`,CCPBid,CCPCampIdx,CCPPieceIdx);
  persist();
  document.getElementById('modal-cp').remove();
  buildWsContent(b);
  toast('📤 Sent to owner for approval','var(--amber)');
}

function bmRequestCPChanges(){
  // Legacy — now handled by inline textarea in the modal
  const box=document.getElementById('bm-cp-changes-box');
  if(box){box.style.display='block';document.getElementById('bm-cp-changes-input')?.focus();}
}

function bmRequestCPChangesConfirm(){
  const b=BRANDS.find(x=>x.id==CCPBid);if(!b)return;
  const camp=b.campaigns[CCPCampIdx];if(!camp)return;
  const p=camp.contentPieces[CCPPieceIdx];if(!p)return;
  const inp=document.getElementById('bm-cp-changes-input');
  const reason=inp?inp.value.trim():'';
  if(!reason){toast('⚠ Describe what needs to change','var(--amber)');return;}
  p.status='changes';
  p.ownerComment=reason;
  p.changesBy=CU.name;
  if(!p.feedbackHistory)p.feedbackHistory=[];
  p.feedbackHistory.push({round:p.feedbackHistory.length+1,comment:reason,by:CU.name,at:new Date().toISOString(),status:'changes'});
  addNotification('changes',`"${p.topic}" needs changes: ${reason.substring(0,50)}`,CCPBid,CCPCampIdx,CCPPieceIdx);
  persist();
  document.getElementById('modal-cp').remove();
  buildWsContent(b);buildMyWork&&buildMyWork();
  toast('🔄 Changes requested — specialist notified','var(--red)');
}

function approveByOwner(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci].contentPieces[pi];
  const comment=document.getElementById('owner-comment-'+bid+'-'+ci+'-'+pi)?.value||'';
  if(!p.feedbackHistory)p.feedbackHistory=[];
  if(comment){
    p.feedbackHistory.push({round:p.feedbackHistory.length+1,comment:comment,by:CU.name,at:new Date().toISOString(),status:'approved'});
  }
  p.status='approved';
  p.publishStatus='ready';
  p.ownerComment=comment;
  p.approvedBy=CU.name;
  p.approvedAt=new Date().toISOString();
  addNotification('approved','"'+p.topic+'" approved by '+CU.name+' — ready to publish',bid,ci,pi);
  persist();buildApprovals();
  const brand=BRANDS.find(x=>x.id==bid);
  if(brand){buildWsContent(brand);if(CBid==bid){buildWsPubQueue(brand);updatePubQueueBadge(brand);}}
  toast('✅ Piece approved — added to Publishing Queue','var(--green)');
}

// Update the Publishing Queue tab badge with count of ready posts
function updatePubQueueBadge(b){
  const badge=document.getElementById('ws-pubqueue-badge');if(!badge)return;
  if(!b){badge.style.display='none';return;}
  const ready=(b.campaigns||[]).reduce((s,c)=>s+(c.contentPieces||[]).filter(p=>p.publishStatus==='ready'||(!p.publishStatus&&p.status==='approved')).length,0);
  if(ready>0){badge.textContent=ready;badge.style.display='';}
  else{badge.style.display='none';}
}

function requestChanges(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci].contentPieces[pi];
  const comment=document.getElementById('owner-comment-'+bid+'-'+ci+'-'+pi)?.value||'';
  if(!comment.trim()){toast('⚠ Add a comment explaining what needs to change','var(--amber)');return;}
  if(!p.feedbackHistory)p.feedbackHistory=[];
  p.feedbackHistory.push({round:p.feedbackHistory.length+1,comment:comment,by:CU.name,at:new Date().toISOString(),status:'changes'});
  p.status='changes';p.ownerComment=comment;
  addNotification('changes','"'+p.topic+'" needs changes: '+comment.substring(0,60),bid,ci,pi);
  persist();buildApprovals();buildDashboard&&buildDashboard();
  if(CBid==bid){const brand=BRANDS.find(x=>x.id==bid);if(brand)buildWsMonthly(brand);}
  toast('❌ Changes requested — BM notified','var(--red)');
}

function toggleTheme(){
  const isLight=document.body.classList.toggle('light');
  localStorage.setItem('mos-theme',isLight?'light':'dark');
  const btn=document.getElementById('theme-btn');
  if(btn)btn.textContent=isLight?'☀️':'🌙';
}
function applyTheme(){
  const saved=localStorage.getItem('mos-theme');
  const isLight=saved?saved==='light':true;
  document.body.classList.toggle('light',isLight);
  const btn=document.getElementById('theme-btn');
  if(btn)btn.textContent=isLight?'☀️':'🌙';
  if(!saved)localStorage.setItem('mos-theme','light');
}

// ── DEADLINE NOTIFICATIONS ──
function checkDeadlines(){
  if(!CU||!TASKS)return;
  const today=new Date();today.setHours(0,0,0,0);
  const tomorrow=new Date(today);tomorrow.setDate(tomorrow.getDate()+1);
  const todayStr=today.toISOString().split('T')[0];
  const tomorrowStr=tomorrow.toISOString().split('T')[0];

  // Which tasks to check — specialists see own tasks; BM/SAM see all their brands
  const tasksToCheck=TASKS.filter(t=>{
    if(!t.due||['completed','approved'].includes(t.stage))return false;
    if(isSpec(CU))return t.assigneeId==CU.id;
    if(isBM(CU))return CU.brands&&CU.brands.includes(t.brandId);
    return true; // SAM sees all
  });

  // Avoid duplicate notifications — check what we already sent today
  const alreadySentKey='mos-deadline-sent-'+todayStr;
  let alreadySent=[];
  try{alreadySent=JSON.parse(localStorage.getItem(alreadySentKey)||'[]');}catch(e){}

  let newNotifs=[];
  let overdueCount=0,todayCount=0,tomorrowCount=0;

  tasksToCheck.forEach(t=>{
    const dueDate=new Date(t.due);dueDate.setHours(0,0,0,0);
    const b=BRANDS.find(x=>x.id===t.brandId);
    const brandName=b?b.name:'';
    const assignee=MEMBERS.find(m=>m.id===t.assigneeId);
    const assigneeName=assignee?assignee.name:'';

    if(dueDate<today){
      // Overdue
      const key='overdue-'+t.id;
      if(!alreadySent.includes(key)){
        const daysLate=Math.floor((today-dueDate)/(1000*60*60*24));
        newNotifs.push({
          id:Date.now()+Math.random(),
          type:'overdue',
          message:`⚠ "${t.title}" is ${daysLate} day${daysLate>1?'s':''} overdue${brandName?' — '+brandName:''}${assigneeName&&!isSpec(CU)?' ('+assigneeName+')':''}`,
          bid:t.brandId,ci:null,pi:null,
          read:false,
          createdAt:new Date().toISOString()
        });
        alreadySent.push(key);
        overdueCount++;
      }
    } else if(t.due===todayStr){
      // Due today
      const key='today-'+t.id;
      if(!alreadySent.includes(key)){
        newNotifs.push({
          id:Date.now()+Math.random(),
          type:'due-today',
          message:`🕐 "${t.title}" is due today${brandName?' — '+brandName:''}${assigneeName&&!isSpec(CU)?' ('+assigneeName+')':''}`,
          bid:t.brandId,ci:null,pi:null,
          read:false,
          createdAt:new Date().toISOString()
        });
        alreadySent.push(key);
        todayCount++;
      }
    } else if(t.due===tomorrowStr){
      // Due tomorrow
      const key='tomorrow-'+t.id;
      if(!alreadySent.includes(key)){
        newNotifs.push({
          id:Date.now()+Math.random(),
          type:'due-tomorrow',
          message:`📅 "${t.title}" is due tomorrow${brandName?' — '+brandName:''}${assigneeName&&!isSpec(CU)?' ('+assigneeName+')':''}`,
          bid:t.brandId,ci:null,pi:null,
          read:false,
          createdAt:new Date().toISOString()
        });
        alreadySent.push(key);
        tomorrowCount++;
      }
    }
  });

  if(newNotifs.length){
    // Prepend to notifications (newest first)
    NOTIFICATIONS=newNotifs.concat(NOTIFICATIONS||[]);
    if(NOTIFICATIONS.length>100)NOTIFICATIONS=NOTIFICATIONS.slice(0,100);
    // Save sent keys so we don't repeat today
    try{localStorage.setItem(alreadySentKey,JSON.stringify(alreadySent));}catch(e){}
    persist();
    updateNotificationBadge();

    // Show a summary toast for urgent items
    if(overdueCount>0||todayCount>0){
      const parts=[];
      if(overdueCount)parts.push(`${overdueCount} overdue`);
      if(todayCount)parts.push(`${todayCount} due today`);
      setTimeout(()=>toast(`⚠ ${parts.join(', ')} — check notifications`,'var(--red)'),800);
    }
  }
}

// Run deadline check on login + every hour
function startDeadlineMonitor(){
  checkDeadlines();
  // Clear any previous interval
  if(window._deadlineInterval)clearInterval(window._deadlineInterval);
  window._deadlineInterval=setInterval(checkDeadlines,60*60*1000);
}

function addNotification(type,message,bid,ci,pi){
  if(!NOTIFICATIONS)NOTIFICATIONS=[];
  NOTIFICATIONS.unshift({id:Date.now(),type,message,bid,ci,pi,read:false,createdAt:new Date().toISOString()});
  if(NOTIFICATIONS.length>50)NOTIFICATIONS=NOTIFICATIONS.slice(0,50);
  persist();updateNotificationBadge();setTimeout(updateAllBadges,50);
}

function updateNotificationBadge(){
  if(!NOTIFICATIONS)return;
  const unread=NOTIFICATIONS.filter(n=>!n.read).length;
  const badge=document.getElementById('notif-badge');
  if(badge){badge.textContent=unread||'';badge.style.display=unread?'':'none';}
}

function openNotifications(){
  if(!NOTIFICATIONS)NOTIFICATIONS=[];
  NOTIFICATIONS.forEach(n=>n.read=true);
  persist();updateNotificationBadge();
  const ex=document.getElementById('notif-panel');if(ex){ex.remove();return;}
  const panel=document.createElement('div');
  panel.id='notif-panel';
  panel.style.cssText='position:fixed;top:50px;right:16px;width:340px;max-height:400px;overflow-y:auto;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:12px;z-index:1000;box-shadow:0 4px 20px #0008';
  const notifHeader='<div style="font-size:13px;font-weight:600;margin-bottom:10px;display:flex;justify-content:space-between">Notifications <button onclick="document.getElementById(&quot;notif-panel&quot;).remove()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px">×</button></div>';
  const typeStyles={
    approved:{icon:'✅',color:'var(--green)',label:'Approved'},
    changes:{icon:'❌',color:'var(--red)',label:'Changes requested'},
    pending:{icon:'📤',color:'var(--amber)',label:'Pending approval'},
    overdue:{icon:'⚠',color:'var(--red)',label:'Overdue'},
    'due-today':{icon:'🕐',color:'var(--amber)',label:'Due today'},
    'due-tomorrow':{icon:'📅',color:'var(--blue)',label:'Due tomorrow'},
    'deadline-ext':{icon:'⏰',color:'var(--amber)',label:'Deadline extension request'},
  };
  panel.innerHTML=notifHeader
    +(NOTIFICATIONS.length?NOTIFICATIONS.slice(0,25).map(n=>{
      const s=typeStyles[n.type]||{icon:'🔔',color:'var(--accent2)',label:n.type||'Notification'};
      // Determine click action — try to find the exact task/piece
      let clickAction='';let clickHint='';
      if(n.type==='deadline-ext'&&n.ci){
        // ci holds taskId for deadline-ext
        clickAction=`document.getElementById('notif-panel').remove();showScreen('tasks',null);setTimeout(()=>openTaskDetail(${n.ci}),100)`;
        clickHint='→ Open task';
      } else if(n.bid!=null&&n.ci!=null&&n.pi!=null){
        // Content piece level — find linked task first
        const linkedTask=TASKS.find(t=>t.contentPieceRef&&String(t.contentPieceRef.bid)===String(n.bid)&&t.contentPieceRef.ci==n.ci&&t.contentPieceRef.pi==n.pi);
        if(linkedTask){
          clickAction=`document.getElementById('notif-panel').remove();showScreen('tasks',null);setTimeout(()=>openTaskDetail(${linkedTask.id}),100)`;
          clickHint='→ Open task';
        } else {
          // No task — open the content piece brief directly
          clickAction=`document.getElementById('notif-panel').remove();openBrand(${n.bid});setTimeout(()=>{const mt=Array.from(document.querySelectorAll('.wstab')).find(t=>t.textContent.trim().startsWith('Monthly'));if(mt)showWsPanel('monthly',mt);setTimeout(()=>openContentPiece(${n.bid},${n.ci},${n.pi}),200);},150)`;
          clickHint='→ Open brief';
        }
      } else if(n.bid!=null&&n.ci!=null){
        // Campaign or task level — find task by id (ci might be taskId)
        const taskById=TASKS.find(t=>t.id==n.ci);
        if(taskById){
          clickAction=`document.getElementById('notif-panel').remove();showScreen('tasks',null);setTimeout(()=>openTaskDetail(${taskById.id}),100)`;
          clickHint='→ Open task';
        } else {
          // Campaign level — go to monthly plan
          clickAction=`document.getElementById('notif-panel').remove();openBrandMonthly(${n.bid})`;
          clickHint='→ Monthly Plan';
        }
      } else if(n.bid!=null){
        // Brand level only — go to monthly plan
        clickAction=`document.getElementById('notif-panel').remove();openBrandMonthly(${n.bid})`;
        clickHint='→ Monthly Plan';
      }
      const clickable=!!clickAction;
      return`<div style="padding:8px 10px;background:var(--bg3);border:.5px solid ${clickable?s.color+'44':'var(--border)'};border-radius:var(--rsm);margin-bottom:6px;font-size:11px${clickable?';cursor:pointer;transition:background .15s':''}${clickable?';hover:opacity:.8':''}" ${clickable?`onclick="${clickAction}" onmouseover="this.style.background='var(--bg4)'" onmouseout="this.style.background='var(--bg3)'"`:''}>`
        +`<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px"><span style="color:${s.color};font-weight:600">${s.icon} ${s.label}</span>${clickable?`<span style="font-size:10px;color:${s.color};margin-left:auto;opacity:.8">${clickHint}</span>`:''}</div>`
        +`<div style="color:var(--text2);line-height:1.4">${n.message}</div>`
        +`<div style="color:var(--text3);font-size:10px;margin-top:4px">${new Date(n.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>`
        +'</div>';
    }).join('')
    :'<div style="font-size:11px;color:var(--text3);text-align:center;padding:20px">No notifications yet</div>');
  document.body.appendChild(panel);
  setTimeout(()=>{document.addEventListener('click',function h(e){if(!panel.contains(e.target)&&e.target.id!=='notif-btn'){panel.remove();document.removeEventListener('click',h);}});},100);
}


function buildMyWork(){
  if(!isSpec(CU))return;

  // ── Collect all work items for this specialist ──
  const items=[]; // unified list of {id, type, stage, brand, title, ...}

  BRANDS.forEach(b=>{
    const isAssignedBrand=isSAM(CU)||isBM(CU)||isSpec(CU)||!CU.brands||!CU.brands.length||CU.brands.some(x=>x==b.id);

      // Content pieces — only from assigned brands AND only when plan is active
      if(isAssignedBrand){
      (b.campaigns||[]).forEach((camp,ci)=>{
        (camp.contentPieces||[]).forEach((p,pi)=>{
          if(p.assigneeId!=CU.id)return;
          // SAMs see all their assigned pieces. Specialists only see pieces when plan is active or piece already started
          const planIsActive=Object.values(b.g7Plans||{}).some(pl=>pl.status==='active');
          const alreadyStarted=['inprod','inprogress','review','pending','approved','done','changes'].includes(p.status);
          if(!canManage(CU)&&!planIsActive&&!alreadyStarted)return;
          // Map piece status to kanban stage
          let stage='todo';
          if(p.status==='inprod'||p.status==='inprogress')stage='inprogress';
          else if(p.status==='review'||p.status==='pending')stage='review';
          else if(p.status==='approved'||p.status==='done')stage='completed';
          else if(p.status==='changes')stage='todo';
          else if(p.status==='brief'||p.status==='notstarted'||!p.status)stage='todo';
          items.push({
            id:`cp-${b.id}-${ci}-${pi}`,
            type:'piece',
            stage,
            blocked:p.blocked||false,
            blockedReason:p.blockedReason||'',
            brand:b,brandId:b.id,ci,pi,camp,p,
            title:p.topic||'Untitled piece',
            due:p.postDate||p.due||'',
            changesComment:p.status==='changes'?p.ownerComment:'',
          });
        });
      });
      } // end isAssignedBrand

      // Standalone G1/G2/G3 per-deliverable briefs — show ALL assigned to this specialist
      Object.values(b.g7Plans||{}).forEach(plan=>{
        const planIsActive=plan.status==='active';
        [0,1,2].forEach(i=>{
          const act=plan.activities[i];if(!act||!act.active)return;
          const delivBriefs=act.deliverableBriefs||{};
          Object.entries(delivBriefs).forEach(([delivName,bd])=>{
            if(bd.assigneeId!=CU.id&&act.assigneeId!=CU.id)return;
            // Show if plan is active OR deliverable already has a status
            const alreadyStarted=bd.status==='owner-approved'||bd.status==='approved'||bd.status==='owner-changes';
            if(!planIsActive&&!alreadyStarted)return;
            const dKey=delivName.replace(/[^a-zA-Z0-9]/g,'_');
            const id=`sa-${b.id}-${i}-${dKey}`;
            if(items.find(x=>x.id===id))return;
            let stage='todo';
            if(bd.specStage==='inprogress')stage='inprogress';
            else if(bd.specStage==='review')stage='review';
            else if(bd.specStage==='completed')stage='completed';
            items.push({
              id,type:'standalone',stage,
              blocked:false,blockedReason:'',
              brand:b,brandId:b.id,actIdx:i,act,plan,
              delivName,bd,
              title:`${['G1','G2','G3'][i]} — ${delivName}`,
              due:bd.endDate||act.endDate||'',
              changesComment:bd.status==='owner-changes'?bd.ownerComment||'':'',
            });
          });
          // Legacy whole-activity (old data without deliverableBriefs)
          if(!Object.keys(act.deliverableBriefs||{}).length&&act.assigneeId==CU.id){
            if(act.status==='owner-approved'||act.status==='approved'){
              const id=`sa-${b.id}-${i}`;
              if(!items.find(x=>x.id===id)){
                let stage='todo';
                if(act.specStage==='inprogress')stage='inprogress';
                else if(act.specStage==='review')stage='review';
                else if(act.specStage==='completed')stage='completed';
                items.push({id,type:'standalone',stage,blocked:false,blockedReason:'',brand:b,brandId:b.id,actIdx:i,act,plan,title:['G1 — Brand guidelines','G2 — Website','G3 — SEO'][i],due:act.endDate||'',changesComment:act.specChangesComment||''});
              }
            }
          }
        });
      });

      // Regular tasks + deliverable tasks — show ALL assigned to this specialist
      TASKS.filter(t=>t.assigneeId==CU.id&&t.brandId==b.id).forEach(t=>{
        let stage='todo';
        if(t.stage==='approved'||t.stage==='completed'||t.specStage==='completed')stage='completed';
        else if(t.specStage==='inprogress')stage='inprogress';
        else if(t.specStage==='review')stage='review';
        items.push({
          id:`task-${t.id}`,
          type:'task',
          stage,
          blocked:t.blocked||false,
          blockedReason:t.blockedReason||'',
          brand:b,brandId:b.id,task:t,
          title:t.title,
          due:t.due||'',
          changesComment:t.specStage==='todo'&&t.ownerComment?t.ownerComment:(t.bmChangesRequested&&t.specStage!=='completed'?t.bmChangesRequested:''),
        });
      });
  }); // end BRANDS.forEach

  // Also collect deliverable tasks from ANY brand (specialist assigned to task on brand they're not a member of)
  TASKS.filter(t=>t.assigneeId==CU.id&&t.deliverableRef&&!items.find(x=>x.id==='task-'+t.id)).forEach(t=>{
    const b=BRANDS.find(x=>x.id==t.brandId);if(!b)return;
    let stage='todo';
    if(t.stage==='approved'||t.stage==='completed'||t.specStage==='completed')stage='completed';
    else if(t.specStage==='inprogress')stage='inprogress';
    else if(t.specStage==='review')stage='review';
    items.push({
      id:`task-${t.id}`,type:'task',stage,
      blocked:t.blocked||false,blockedReason:t.blockedReason||'',
      brand:b,brandId:b.id,task:t,
      title:t.title,due:t.due||'',changesComment:'',
    });
  });

  // Populate brand filter
  const brandSel=document.getElementById('mw-brand-filter');
  if(brandSel){
    const brands=[...new Set(items.map(x=>x.brandId))].map(id=>BRANDS.find(b=>b.id==id)).filter(Boolean);
    brandSel.innerHTML='<option value="">All brands</option>'+brands.map(b=>`<option value="${b.id}">${b.name}</option>`).join('');
  }

  // Store items globally for filtering
  window._mwItems=items;
  renderMyWorkKanban(items);
}

function filterMyWork(){
  const q=(document.getElementById('mw-search')?.value||'').toLowerCase();
  const bid=document.getElementById('mw-brand-filter')?.value||'';
  const items=(window._mwItems||[]).filter(x=>{
    if(bid&&x.brandId!=bid)return false;
    if(q&&!x.title.toLowerCase().includes(q)&&!x.brand.name.toLowerCase().includes(q))return false;
    return true;
  });
  renderMyWorkKanban(items);
}

function renderMyWorkKanban(items){
  const cols={todo:[],inprogress:[],review:[],completed:[]};
  items.forEach(item=>{ if(cols[item.stage])cols[item.stage].push(item); });

  const today=new Date().toISOString().split('T')[0];

  function fmtTime(ms){
    if(!ms)return'0m';
    const h=Math.floor(ms/3600000);
    const m=Math.floor((ms%3600000)/60000);
    return h?`${h}h ${m}m`:`${m}m`;
  }

  function getTotalTime(item){
    const sessions=getMWTimeSessions(item.id);
    const logged=sessions.reduce((s,x)=>s+(x.end?x.end-x.start:0),0);
    const running=getMWRunning(item.id);
    return logged+(running?Date.now()-running:0);
  }

  function renderCard(item){
    const isRunning=!!getMWRunning(item.id);
    const totalMs=getTotalTime(item);
    const isLate=item.due&&item.due<today&&item.stage!=='completed';
    const typeIcon={piece:'📄',standalone:'📋',task:'◻'}[item.type];
    const colBorder=item.blocked?'var(--rborder)':item.changesComment?'var(--rborder)':isRunning?'var(--blue)':'var(--border)';
    // Brief peek — first 80 chars of notes/copyDir
    const peekText=(item.notes||item.copyDir||'').trim();
    const peek=peekText?peekText.substring(0,80)+(peekText.length>80?'…':''):'';

    return`<div class="mw-card" data-id="${item.id}" style="background:var(--bg2);border:.5px solid ${colBorder};border-radius:var(--rsm);padding:10px;cursor:pointer;transition:all .15s" onclick="openMWDetail('${item.id}')">
      <!-- Title row -->
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px">
        <span style="font-size:12px;flex-shrink:0;margin-top:1px">${typeIcon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;line-height:1.3">${item.title}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:1px">${item.brand.name}</div>
        </div>
        ${item.blocked?`<span style="font-size:9px;padding:1px 5px;background:var(--rbg);color:var(--red);border-radius:3px;flex-shrink:0">BLOCKED</span>`:''}
        ${item.type==='task'&&(item.task.comments||[]).some(c=>c.authorId!==CU.id&&(!c.readBy||!c.readBy.includes(CU.id)))?`<span style="font-size:9px;padding:1px 5px;background:var(--acbg);color:var(--accent2);border-radius:3px;flex-shrink:0;border:.5px solid var(--acb)">💬</span>`:''}
      </div>
      <!-- Changes feedback -->
      ${item.changesComment?`<div style="font-size:10px;color:var(--red);padding:4px 6px;background:var(--rbg);border-radius:3px;margin-bottom:5px;line-height:1.4">❌ ${item.changesComment.substring(0,70)}${item.changesComment.length>70?'...':''}</div>`:''}
      <!-- Brief peek -->
      ${peek&&!item.changesComment?`<div class="brief-peek">${peek}</div>`:''}
      <!-- Meta row -->
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:4px">
        ${item.due?`<span style="font-size:10px;color:${isLate?'var(--red)':'var(--text3)'}">${isLate?'⚠ ':'📅 '}${item.due}</span>`:''}
        ${isRunning?`<span id="mw-timer-${item.id}" class="timer-live" style="font-size:10px;color:var(--blue);padding:1px 6px;background:var(--bbg);border-radius:3px;border:.5px solid rgba(91,174,247,.3)">⏱ ${fmtTime(totalMs)}</span>`:
          totalMs>0?`<span style="font-size:10px;color:var(--text3);padding:1px 6px;background:var(--bg3);border-radius:3px">🕐 ${fmtTime(totalMs)}</span>`:''}
        <div style="flex:1"></div>
        ${item.stage==='todo'?`<button onclick="event.stopPropagation();mwStart('${item.id}')" style="background:var(--accent);border:none;border-radius:var(--rsm);padding:3px 10px;font-family:var(--font);font-size:10px;font-weight:600;color:#fff;cursor:pointer">▶ Start</button>`:''}
        ${item.stage==='inprogress'&&!isRunning&&!getMWTimeSessions(item.id).length?`<button onclick="event.stopPropagation();mwStartTimer('${item.id}')" style="background:var(--accent);border:none;border-radius:var(--rsm);padding:3px 10px;font-family:var(--font);font-size:10px;font-weight:600;color:#fff;cursor:pointer">▶ Start</button>`:''}
        ${item.stage==='inprogress'&&isRunning?`<button onclick="event.stopPropagation();mwPause('${item.id}')" style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:3px 8px;font-family:var(--font);font-size:10px;color:var(--amber);cursor:pointer">⏸ Pause</button>`:''}
        ${item.stage==='inprogress'&&!isRunning&&getMWTimeSessions(item.id).length?`<button onclick="event.stopPropagation();mwResume('${item.id}')" style="background:var(--bbg);border:.5px solid rgba(91,174,247,.35);border-radius:var(--rsm);padding:3px 8px;font-family:var(--font);font-size:10px;color:var(--blue);cursor:pointer">▶ Resume</button>`:''}
        ${item.stage==='inprogress'&&(isRunning||getMWTimeSessions(item.id).length)?`<button onclick="event.stopPropagation();mwStop('${item.id}')" style="background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);padding:3px 8px;font-family:var(--font);font-size:10px;color:var(--red);cursor:pointer">⏹ Stop</button>`:''}
      </div>
    </div>`;
  }

  ['todo','inprogress','review','completed'].forEach(stage=>{
    const col=document.getElementById('mw-col-'+stage);
    const count=document.getElementById('mw-count-'+stage);
    if(col)col.innerHTML=cols[stage].length?cols[stage].map(renderCard).join(''):`<div style="text-align:center;padding:24px 12px;color:var(--text3);font-size:11px;opacity:.5">${stage==='todo'?'No tasks yet':stage==='inprogress'?'Nothing in progress':stage==='review'?'Nothing in review':'Nothing completed'}</div>`;
    if(count)count.textContent=cols[stage].length||'';
  });

  // Update nav badge — count todo + inprogress
  const badge=document.getElementById('nb-mywork');
  if(badge){const active=items.filter(x=>x.stage==='todo'||x.stage==='inprogress').length;badge.textContent=active||'';}

  // Update subtitle
  const sub=document.getElementById('mywork-subtitle');
  if(sub){
    const total=items.length;
    const active=items.filter(x=>x.stage==='inprogress').length;
    sub.textContent=`${total} tasks · ${active} in progress`;
  }

  // Live timer tick — updates only timer spans every second
  clearInterval(window._mwTick);
  const runningItems=items.filter(x=>getMWRunning(x.id));
  if(runningItems.length){
    window._mwTick=setInterval(()=>{
      runningItems.forEach(item=>{
        const el=document.getElementById('mw-timer-'+item.id);
        if(el){
          const runStart=getMWRunning(item.id);
          const sessions=getMWTimeSessions(item.id);
          const pastMs=sessions.reduce((s,s2)=>s+(s2.end-s2.start),0);
          const currentMs=runStart?Date.now()-runStart:0;
          el.textContent='⏱ '+fmtTime(pastMs+currentMs);
        }
      });
    },1000);
  }
}

// ── Time tracking helpers ──
function getMWTimeSessions(id){
  try{return JSON.parse(localStorage.getItem('mw-sessions-'+id)||'[]');}catch{return[];}
}
function saveMWTimeSessions(id,sessions){
  localStorage.setItem('mw-sessions-'+id,JSON.stringify(sessions));
}
function getMWRunning(id){
  const v=localStorage.getItem('mw-running-'+id);
  return v?parseInt(v):null;
}
function setMWRunning(id,ts){
  if(ts)localStorage.setItem('mw-running-'+id,ts);
  else localStorage.removeItem('mw-running-'+id);
}
function mwStartTimer(id){
  setMWRunning(id,Date.now());
  buildMyWork();
  toast('⏱ Timer started','var(--blue)');
}
function mwStart(id){
  // Move item to inprogress
  mwSetStage(id,'inprogress');
  setMWRunning(id,Date.now());
  buildMyWork();
  toast('⏱ Timer started','var(--blue)');
}
function mwPause(id){
  const start=getMWRunning(id);
  if(!start)return;
  const sessions=getMWTimeSessions(id);
  sessions.push({start,end:Date.now()});
  saveMWTimeSessions(id,sessions);
  setMWRunning(id,null);
  buildMyWork();
  toast('⏸ Timer paused','var(--amber)');
}
function mwResume(id){
  setMWRunning(id,Date.now());
  buildMyWork();
  toast('▶ Timer resumed','var(--blue)');
}
function mwStop(id){
  // Finalise any running session
  const runningStart=getMWRunning(id);
  if(runningStart){
    const sessions=getMWTimeSessions(id);
    sessions.push({start:runningStart,end:Date.now()});
    saveMWTimeSessions(id,sessions);
    setMWRunning(id,null);
  }
  // Mark as stopped — stays in inprogress but timer is done
  const item=findMWItem(id);
  if(item){
    if(item.type==='task'){item.task.timerStopped=true;persist();}
    else if(item.type==='piece'){item.p.timerStopped=true;persist();}
    else if(item.type==='standalone'){item.act.timerStopped=true;persist();}
  }
  closeMWDetail();
  buildMyWork();
  toast('⏹ Timer stopped — time recorded','var(--green)');
}
function mwSetStage(id,stage){
  const item=findMWItem(id);if(!item)return;
  if(item.type==='piece'){
    const p=item.p;
    // todo=brief, inprogress=inprod, review=review (submitted to BM), completed=done
    const stageMap={todo:'brief',inprogress:'inprod',review:'review',completed:'done'};
    p.status=stageMap[stage]||stage;
    persist();
  } else if(item.type==='standalone'){
    if(item.delivName&&item.bd){
      item.bd.specStage=stage;
    } else {
      item.act.specStage=stage;
    }
    persist();
  } else if(item.type==='task'){
    item.task.specStage=stage;
    // Also update main task stage so BM/SAM Kanban sees it
    const mainStageMap={todo:'todo',inprogress:'inprogress',review:'review',completed:'completed'};
    item.task.stage=mainStageMap[stage]||item.task.stage;
    persist();buildTaskViews();
  }
}
function findMWItem(id){
  return(window._mwItems||[]).find(x=>x.id===id);
}

// ── Submit to BM ──
function mwSubmitToBM(id,noteInputId){
  const note=noteInputId?document.getElementById(noteInputId)?.value?.trim():'';

  // Auto-stop timer
  const runningStart=getMWRunning(id);
  if(runningStart){
    const sessions=getMWTimeSessions(id);
    sessions.push({start:runningStart,end:Date.now()});
    saveMWTimeSessions(id,sessions);
    setMWRunning(id,null);
  }

  // Handle regular tasks directly from TASKS array
  if(id.startsWith('task-')){
    const tid=parseInt(id.replace('task-',''));
    const t=TASKS.find(x=>x.id==tid);
    if(!t){toast('⚠ Task not found','var(--red)');return;}
    t.stage='review';
    t.specStage='review';
    if(note)t.completionNote=note;
    const b=BRANDS.find(x=>x.id==t.brandId);
    addNotification('review',`"${t.title}" submitted for review by ${CU.name}${note?' — '+note.substring(0,40):''}`,t.brandId,t.id,null);
    persist();buildTaskViews();buildMyWork();
    closeMWDetail();
    const _emojis=['🎉','🚀','⭐','✨'];toast(_emojis[Math.floor(Math.random()*4)]+' Submitted! BM will review soon','var(--green)',3200);
    return;
  }

  // Handle via item for pieces and standalone
  const item=findMWItem(id);
  if(!item){toast('⚠ Item not found — please refresh','var(--amber)');return;}

  if(note){
    if(item.type==='piece')item.p.completionNote=note;
    else if(item.type==='standalone')item.act.completionNote=note;
  }

  mwSetStage(id,'review');

  const b=BRANDS.find(x=>x.id==item.brandId);
  const reviewerId=b?b.bmId:null;
  const reviewer=reviewerId?MEMBERS.find(m=>m.id==reviewerId):null;

  addNotification('review',`"${item.title}" submitted for review by ${CU.name}${reviewer?' → '+reviewer.name:''}${note?' — '+note.substring(0,40):''}`,item.brandId,null,null);

  // Standalone — create real task so BM sees it in Kanban
  if(item.type==='standalone'){
    const act=item.act;const bd=act.briefData||{};
    const gLabel=['G1 — Brand guidelines','G2 — Website','G3 — SEO'][item.actIdx];
    const existingTask=TASKS.find(t=>t.standaloneRef===id);
    if(existingTask){
      existingTask.stage='review';existingTask.specStage='review';
      if(note)existingTask.completionNote=note;
    } else {
      TASKS.push({
        id:Date.now(),title:gLabel+' — '+item.brand.name,
        brandId:item.brandId,g7:'G'+(item.actIdx+1),
        assigneeId:CU.id,createdById:reviewerId||null,
        stage:'review',specStage:'review',
        priority:bd.priority?bd.priority.toLowerCase():'medium',
        due:act.endDate||'',notes:bd.notes||'',completionNote:note||'',
        standaloneRef:id,files:[],specFiles:act.specFiles||[],
        comments:[],createdAt:new Date().toISOString()
      });
    }
    buildTaskViews();
  }

  persist();closeMWDetail();buildMyWork();
  const _emojis=['🎉','🚀','⭐','✨'];toast(_emojis[Math.floor(Math.random()*4)]+' Submitted! BM will review soon','var(--green)',3200);
}

// ── Block/unblock ──
function mwToggleBlock(id,reason){
  const item=findMWItem(id);if(!item)return;
  if(item.type==='piece'){item.p.blocked=!item.p.blocked;if(reason)item.p.blockedReason=reason;persist();}
  else if(item.type==='standalone'){item.act.specBlocked=!item.act.specBlocked;if(reason)item.act.specBlockedReason=reason;persist();}
  else if(item.type==='task'){item.task.blocked=!item.task.blocked;if(reason)item.task.blockedReason=reason;persist();}
  buildMyWork();
}

// ── Detail panel ──
function openMWDetail(id){
  const item=findMWItem(id);if(!item)return;
  const overlay=document.getElementById('mw-detail-overlay');
  const panel=document.getElementById('mw-detail-panel');
  if(!overlay||!panel)return;

  const sessions=getMWTimeSessions(id);
  const isRunning=getMWRunning(id);
  const totalMs=sessions.reduce((s,x)=>s+(x.end-x.start),0)+(isRunning?Date.now()-getMWRunning(id):0);

  function fmtTime(ms){if(!ms)return'0m';const h=Math.floor(ms/3600000);const m=Math.floor((ms%3600000)/60000);return h?`${h}h ${m}m`:`${m}m`;}
  function fmtTs(ts){return new Date(ts).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});}

  // Brief content
  let briefHtml='';
  if(item.type==='piece'){
    const p=item.p;
    briefHtml=`
      <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">📋 Brief</div>
        ${[['Platform',p.platform||((p.platforms||[]).join(', '))||'—'],['Creative style',p.creativeStyle||'—'],['Post date',p.postDate||'—']].map(([l,v])=>`<div style="display:flex;gap:8px;padding:4px 0;border-bottom:.5px solid var(--border)"><span style="font-size:11px;color:var(--text3);width:100px;flex-shrink:0">${l}</span><span style="font-size:11px;color:var(--text2)">${v}</span></div>`).join('')}
        ${p.targeting?`<div style="display:flex;gap:8px;padding:4px 0;border-bottom:.5px solid var(--border)"><span style="font-size:11px;color:var(--text3);width:100px;flex-shrink:0">Target</span><span style="font-size:11px;color:var(--text2)">${p.targeting}</span></div>`:''}
        ${p.elevator?`<div style="display:flex;gap:8px;padding:4px 0;border-bottom:.5px solid var(--border)"><span style="font-size:11px;color:var(--text3);width:100px;flex-shrink:0">Pitch</span><span style="font-size:11px;color:var(--text2)">${p.elevator}</span></div>`:''}
        ${p.copyDir?`<div style="margin-top:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Copy direction</div><div style="font-size:11px;color:var(--text2);line-height:1.5;padding:6px 8px;background:var(--bg2);border-radius:var(--rsm)">${p.copyDir}</div></div>`:''}
        ${p.copy?`<div style="margin-top:8px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px"><span style="font-size:10px;color:var(--text3)">Copy (final)</span><button onclick="navigator.clipboard.writeText('${(p.copy||'').replace(/'/g,"\\'")}');toast('Copied','var(--green)')" style="font-size:9px;padding:1px 7px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button></div><div style="font-size:11px;color:var(--text2);line-height:1.5;white-space:pre-wrap;padding:6px 8px;background:var(--bg2);border-radius:var(--rsm)">${p.copy}</div></div>`:''}
        ${p.caption?`<div style="margin-top:8px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px"><span style="font-size:10px;color:var(--text3)">Caption</span><button onclick="navigator.clipboard.writeText('${(p.caption||'').replace(/'/g,"\\'")}');toast('Copied','var(--green)')" style="font-size:9px;padding:1px 7px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button></div><div style="font-size:11px;color:var(--text2);padding:6px 8px;background:var(--bg2);border-radius:var(--rsm)">${p.caption}</div></div>`:''}
        ${p.hashtags?`<div style="margin-top:8px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px"><span style="font-size:10px;color:var(--text3)">Hashtags</span><button onclick="navigator.clipboard.writeText('${(p.hashtags||'').replace(/'/g,"\\'")}');toast('Copied','var(--green)')" style="font-size:9px;padding:1px 7px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button></div><div style="font-size:11px;color:var(--accent2);padding:6px 8px;background:var(--bg2);border-radius:var(--rsm)">${p.hashtags}</div></div>`:''}
        ${p.visualIdea?`<div style="margin-top:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Visual idea</div><div style="font-size:11px;color:var(--text2);padding:6px 8px;background:var(--bg2);border-radius:var(--rsm)">${p.visualIdea}</div></div>`:''}
        ${p.attachments&&p.attachments.length?`<div style="margin-top:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">Reference files</div>${p.attachments.map(a=>`<span style="font-size:10px;padding:2px 7px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);margin-right:4px">📎 ${a.name}</span>`).join('')}</div>`:''}
        ${!p.copyDir&&!p.copy&&!p.caption&&!p.visualIdea&&!p.targeting?`<div style="font-size:11px;color:var(--text3);font-style:italic;margin-top:6px">Brief not filled by BM yet</div>`:''}
      </div>`;
  } else if(item.type==='standalone'){
    const act=item.act;const bd=act.briefData||{};
    const gFields=item.actIdx===0?[['Deliverables',(bd.deliverables||[]).join(', ')||'—']]:
                  item.actIdx===1?[['Work type',(bd.workTypes||[]).join(', ')||'—'],['Pages/URLs',bd.pages||'—'],['Priority',bd.priority||'—']]:
                  [['SEO focus',(bd.seoFocus||[]).join(', ')||'—'],['Keywords',bd.keywords||'—'],['Target pages',bd.targetPages||'—']];
    briefHtml=`
      <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Brief</div>
        ${gFields.map(([l,v])=>`<div style="display:flex;gap:8px;padding:4px 0;border-bottom:.5px solid var(--border)"><span style="font-size:11px;color:var(--text3);width:110px;flex-shrink:0">${l}</span><span style="font-size:11px;color:var(--text2)">${v}</span></div>`).join('')}
        ${bd.notes?`<div style="margin-top:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Instructions</div><div style="font-size:11px;color:var(--text2);line-height:1.5">${bd.notes}</div></div>`:''}
        ${(bd.files||[]).length?`<div style="margin-top:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">Attachments</div>${bd.files.map(f=>`<span style="font-size:10px;padding:2px 7px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);margin-right:4px">📎 ${f.name} <span style="color:var(--text3)">${f.size}</span></span>`).join('')}</div>`:''}
      </div>`;
  } else if(item.type==='task'){
    const t=item.task;
    briefHtml=`
      <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Task details</div>
        ${[['G7 activity',t.g7||'—'],['Priority',t.priority||'—'],['Due date',t.due||'—']].map(([l,v])=>`<div style="display:flex;gap:8px;padding:4px 0;border-bottom:.5px solid var(--border)"><span style="font-size:11px;color:var(--text3);width:100px;flex-shrink:0">${l}</span><span style="font-size:11px;color:var(--text2)">${v}</span></div>`).join('')}
        ${t.notes||t.desc?`<div style="margin-top:8px"><div style="font-size:10px;color:var(--text3);margin-bottom:3px">Notes</div><div style="font-size:11px;color:var(--text2);line-height:1.5">${t.notes||t.desc||''}</div></div>`:''}
      </div>`;
  }

  // Time tracker section
  const timerHtml=`
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em">Time tracker</div>
        <div style="font-size:13px;font-weight:600;color:${isRunning?'var(--blue)':'var(--text2)'}">${isRunning?'⏱ Running — ':'🕐 Total: '}${fmtTime(totalMs)}</div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:${sessions.length?'10px':'0'}">
        ${item.stage==='todo'?`<button class="btn btn-p btn-sm" onclick="closeMWDetail();mwStart('${id}')">▶ Start</button>`:''}
        ${item.stage==='inprogress'&&!isRunning&&!sessions.length?`<button class="btn btn-p btn-sm" onclick="mwStartTimer('${id}');openMWDetail('${id}')">▶ Start timer</button>`:''}
        ${item.stage==='inprogress'&&isRunning?`<button class="btn btn-sm" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="mwPause('${id}');openMWDetail('${id}')">⏸ Pause</button>`:''}
        ${item.stage==='inprogress'&&!isRunning&&sessions.length?`<button class="btn btn-sm" style="background:var(--bbg);border-color:rgba(91,174,247,.35);color:var(--blue)" onclick="mwResume('${id}');openMWDetail('${id}')">▶ Resume</button>`:''}
        ${item.stage==='inprogress'&&(isRunning||sessions.length)?`<button class="btn btn-sm" style="background:var(--rbg);border-color:var(--rborder);color:var(--red)" onclick="mwStop('${id}')">⏹ Stop</button>`:''}
      </div>
      ${sessions.length?`<div style="border-top:.5px solid var(--border);padding-top:8px">
        <div style="font-size:10px;color:var(--text3);margin-bottom:6px">Session history</div>
        ${sessions.map((s,si)=>{
          const dur=s.end&&s.start?(s.end-s.start):0;
          return`<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);padding:3px 0;border-bottom:.5px solid var(--border)">
            <span>Session ${si+1} · ${fmtTs(s.start)}</span>
            <span style="color:${dur>0?'var(--text2)':'var(--red)'}">${dur>0?fmtTime(dur):'in progress'}</span>
          </div>`;
        }).join('')}
      </div>`:''}
    </div>`;

  // Changes feedback
  const changesHtml=item.changesComment?`<div style="background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);padding:10px;margin-bottom:12px"><div style="font-size:10px;font-weight:600;color:var(--red);margin-bottom:4px">❌ Changes requested</div><div style="font-size:12px;color:var(--text2);line-height:1.5">${item.changesComment}</div></div>`:'';

  // Action buttons
  let actionsHtml='';
  const fileInputId=`mw-file-${id.replace(/[^a-z0-9]/gi,'_')}`;

  // Comment thread — all item types
  let itemComments=[];
  if(item.type==='task')itemComments=item.task.comments||[];
  else if(item.type==='piece')itemComments=item.p.comments||[];
  else if(item.type==='standalone'){
    if(item.bd)itemComments=item.bd.comments||[];
    else if(item.act)itemComments=item.act.comments||[];
  }
  const commentThreadHtml=`
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">💬 Messages with BM/SAM</div>
      <div id="mw-comments-${id.replace(/[^a-z0-9]/gi,'_')}" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
        ${itemComments.length?itemComments.map(c=>{
          const isMe=c.authorId===CU.id;
          return`<div style="display:flex;flex-direction:column;align-items:${isMe?'flex-end':'flex-start'};gap:2px">
            <div style="font-size:10px;color:var(--text3);padding:0 4px">${isMe?'You':c.author} · ${new Date(c.at).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
            <div style="max-width:85%;padding:7px 10px;border-radius:${isMe?'10px 10px 3px 10px':'10px 10px 10px 3px'};background:${isMe?'var(--accent)':'var(--bg2)'};color:${isMe?'#fff':'var(--text)'};font-size:12px;line-height:1.4;border:.5px solid ${isMe?'transparent':'var(--border)'}">${c.text}</div>
          </div>`;
        }).join(''):'<div style="font-size:11px;color:var(--text3);text-align:center;padding:8px">No messages yet</div>'}
      </div>
      <div style="display:flex;gap:6px">
        <textarea id="mw-comment-input-${id.replace(/[^a-z0-9]/gi,'_')}" class="ftxt" placeholder="Ask a question or add a note..." style="min-height:36px;max-height:72px;flex:1;font-size:11px;resize:none"></textarea>
        <button class="btn btn-p btn-sm" style="align-self:flex-end;flex-shrink:0" onclick="addMWComment('${id}','mw-comment-input-${id.replace(/[^a-z0-9]/gi,'_')}')">Send</button>
      </div>
    </div>`;

  if(item.stage==='inprogress'){
    actionsHtml=`
      <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Submit to BM</div>
        <div style="margin-bottom:10px">
          <div style="font-size:11px;color:var(--text2);margin-bottom:5px">Completion note <span style="color:var(--text3)">(optional)</span></div>
          <textarea id="mw-done-note-${id.replace(/[^a-z0-9]/gi,'_')}" class="ftxt" placeholder="e.g. Done — used alternate layout as discussed, links updated" style="min-height:52px;font-size:11px"></textarea>
        </div>
        <div style="margin-bottom:10px">
          <div style="font-size:11px;color:var(--text2);margin-bottom:5px">Attach deliverable <span style="color:var(--text3)">(optional)</span></div>
          <div id="${fileInputId}-preview" style="margin-bottom:6px"></div>
          <label style="display:inline-flex;align-items:center;gap:5px;padding:5px 10px;background:var(--bg2);border:.5px solid var(--border2);border-radius:var(--rsm);font-size:11px;color:var(--text2);cursor:pointer" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border2)'">📎 Attach file<input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip,.ppt,.pptx" style="display:none" onchange="mwAttachFile('${id}','${fileInputId}-preview',this)"></label>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-p" onclick="mwSubmitToBM('${id}','mw-done-note-${id.replace(/[^a-z0-9]/gi,'_')}')">✅ Mark done &amp; submit to BM</button>
          <button class="btn btn-sm" style="background:var(--rbg);border-color:var(--rborder);color:var(--red)" onclick="mwBlockPrompt('${id}')">🚫 Flag as blocked</button>
        </div>
      </div>`;
  }

  panel.innerHTML=`
    <div style="padding:20px 24px 16px;border-bottom:.5px solid var(--border);display:flex;align-items:flex-start;gap:10px">
      <div style="flex:1">
        <div style="font-size:15px;font-weight:600;line-height:1.3;margin-bottom:4px">${item.title}</div>
        <div style="font-size:11px;color:var(--text3)">${item.brand.name}${item.due?' · Due: '+item.due:''}</div>
      </div>
      <button onclick="closeMWDetail()" style="background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;padding:0;line-height:1;flex-shrink:0">×</button>
    </div>
    <div style="padding:16px 24px 20px">
      ${changesHtml}
      ${briefHtml}
      ${timerHtml}
      ${commentThreadHtml}
      ${actionsHtml}
    </div>`;

  overlay.style.display='block';
}

function addMWComment(id,inputId){
  const input=document.getElementById(inputId);
  const text=input?.value?.trim();
  if(!text){toast('⚠ Type a message first','var(--amber)');return;}
  const item=findMWItem(id);if(!item)return;
  const comment={
    id:Date.now(),text,
    author:CU.name,authorId:CU.id,role:CU.role,
    at:new Date().toISOString(),readBy:[CU.id]
  };
  // Save to correct data structure
  if(item.type==='task'){
    if(!item.task.comments)item.task.comments=[];
    item.task.comments.push(comment);
  } else if(item.type==='piece'){
    if(!item.p.comments)item.p.comments=[];
    item.p.comments.push(comment);
  } else if(item.type==='standalone'){
    if(item.bd){
      if(!item.bd.comments)item.bd.comments=[];
      item.bd.comments.push(comment);
    } else if(item.act){
      if(!item.act.comments)item.act.comments=[];
      item.act.comments.push(comment);
    }
  }
  addNotification('comment',`💬 ${CU.name}: ${text.substring(0,50)}`,item.brandId,null,null);
  persist();
  input.value='';
  openMWDetail(id);
  toast('✓ Message sent','var(--teal)');
}

function closeMWDetail(){
  const overlay=document.getElementById('mw-detail-overlay');
  if(overlay)overlay.style.display='none';
}

function mwAttachFile(id,previewId,input){
  const item=findMWItem(id);if(!item)return;
  const rawFiles=Array.from(input.files);
  // 2MB per file limit so base64 fits in localStorage
  const MAX=2*1024*1024;
  const oversized=rawFiles.filter(f=>f.size>MAX);
  if(oversized.length){toast(`⚠ "${oversized[0].name}" too large (max 2MB)`,'var(--amber)');return;}
  let remaining=rawFiles.length;
  const collected=[];
  rawFiles.forEach(f=>{
    const r=new FileReader();
    r.onload=function(){
      collected.push({
        name:f.name,
        size:f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB',
        type:f.type||'application/octet-stream',
        date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'}),
        data:r.result
      });
      remaining--;
      if(remaining===0){
        // Save all once everything is read
        if(item.type==='piece'){if(!item.p.specFiles)item.p.specFiles=[];item.p.specFiles.push(...collected);}
        else if(item.type==='standalone'){if(!item.act.specFiles)item.act.specFiles=[];item.act.specFiles.push(...collected);}
        else if(item.type==='task'){if(!item.task.specFiles)item.task.specFiles=[];item.task.specFiles.push(...collected);}
        try{persist();}catch(err){toast('⚠ Storage full — remove old files','var(--red)');return;}
        const prev=document.getElementById(previewId);
        if(prev)prev.innerHTML=collected.map(f=>`<span style="font-size:10px;padding:2px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);margin-right:4px;display:inline-block;margin-bottom:4px">📎 ${f.name}</span>`).join('');
        toast(`✓ ${collected.length} file${collected.length>1?'s':''} attached`,'var(--green)');
      }
    };
    r.onerror=function(){toast(`⚠ Couldn't read "${f.name}"`,'var(--red)');remaining--;};
    r.readAsDataURL(f);
  });
  input.value='';
}

function mwBlockPrompt(id){
  const reason=prompt('Reason for blocking (will notify BM):');
  if(reason===null)return;
  mwToggleBlock(id,reason||'Blocked');
  // Notify BM
  const item=findMWItem(id);
  if(item)addNotification('blocked',`"${item.title}" blocked by ${CU.name}: ${reason}`,item.brandId,null,null);
  closeMWDetail();
  toast('🚫 Flagged as blocked — BM notified','var(--red)');
}



function updateSpecTaskStage(tid,stage){
  const t=TASKS.find(x=>x.id==tid);
  if(!t)return;
  t.stage=stage;
  persist();buildMyWork();buildTaskViews();
  const labels={inprogress:'In progress',review:'Sent for review',completed:'Done ✓'};
  toast(labels[stage]||stage,'var(--green)');
}

function markSpecialistDone(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b)return;
  b.campaigns[ci].contentPieces[pi].status='done';
  persist();buildMyWork();
  toast('✓ Marked as done','var(--green)');
}

function markSpecialistInProgress(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b)return;
  b.campaigns[ci].contentPieces[pi].status='inprod';
  persist();buildMyWork();
  toast('▶ Marked as in progress','var(--blue)');
}


function syncBrandOwners(){
  // For every owner-role member with brands assigned, ensure b.clientMemberId is set
  MEMBERS.forEach(m=>{
    if(!['owner','coowner','client','brand-owner'].includes(m.role))return;
    if(!m.brands||!m.brands.length)return;
    m.brands.forEach(bid=>{
      const b=BRANDS.find(x=>x.id==bid);
      if(!b)return;
      if(!b.clientMemberId){
        b.clientMemberId=m.id;
        b.clientName=m.name;
      }
    });
  });
}


function doLogin(){
  const u=document.getElementById('lu').value.trim().toLowerCase();
  const p=document.getElementById('lp').value.trim();
  const m=MEMBERS.find(x=>x.username.trim().toLowerCase()===u&&x.password.trim()===p&&x.active);
  if(m){loginAs(m);}
  else{
    // Show debug info in the error element
    const match=MEMBERS.find(x=>x.username.trim().toLowerCase()===u);
    const el=document.getElementById('lerr');
    if(match){
      el.innerHTML=`Wrong password for "${u}". Stored: <b>${match.password}</b> | You typed: <b>${p}</b>`;
    } else {
      const names=MEMBERS.filter(x=>x.active).map(x=>x.username).join(', ');
      el.innerHTML=`Username "${u}" not found. Active users: ${names}`;
    }
    el.style.display='block';
  }
}
function hardReset(){
  try{localStorage.clear();}catch(e){}
  location.reload();
}
function quickLogin(u,p){
  // Always find from SEED_MEMBERS so stale localStorage can't block login
  const seed=SEED_MEMBERS.find(x=>x.username===u);
  if(!seed){alert('User not found: '+u);return;}
  // Ensure MEMBERS has this user
  let m=MEMBERS.find(x=>x.username===u&&x.active);
  if(!m){
    // Restore seed member
    MEMBERS=MEMBERS.filter(x=>x.username!==u);
    MEMBERS.push(JSON.parse(JSON.stringify(seed)));
    m=MEMBERS.find(x=>x.username===u);
  }
  document.getElementById('lu').value=u;
  document.getElementById('lp').value=p;
  loginAs(m);
}
function loginAs(m){
  if(!m){toast('⚠ User not found','var(--red)');return;}
  // Always use fresh data from MEMBERS array
  const freshMember=MEMBERS.find(x=>x.id==m.id)||m;
  CU=freshMember;
  document.getElementById('login-screen').style.display='none';
  document.getElementById('app').style.display='block';
  setupUser();
  const isOwner=['owner','coowner','client','brand-owner'].includes(CU.role);
  const isSpecialist=CU.role==='specialist';
  // Show correct screen using ONLY classList (CSS handles display)
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.navi').forEach(n=>n.classList.remove('active'));
  if(isOwner){
    document.getElementById('screen-approvals').classList.add('active');
    document.querySelector('.nb-approvals-nav').classList.add('active');
    const bc=document.getElementById('topbar-bc');if(bc)bc.innerHTML='<div class="ptitle">Approvals</div>';
    const pb=document.getElementById('primary-btn');if(pb)pb.style.display='none';
    buildTeamList();
    setTimeout(()=>buildApprovals(),100);
  } else if(isSpecialist){
    // Route specialists to Tasks screen with "Mine" filter — My Work screen retired
    CTaskFilter='mine';
    document.getElementById('screen-tasks').classList.add('active');
    const taskNav=document.querySelector('.navi[onclick*="screen\',\'tasks"]')||document.querySelector('.navi[onclick*="tasks"]');
    if(taskNav)taskNav.classList.add('active');
    const bc=document.getElementById('topbar-bc');if(bc)bc.innerHTML='<div class="ptitle">Tasks</div>';
    buildTeamList();
    buildTaskViews();
    // Highlight the "Mine" filter tab
    setTimeout(()=>{document.querySelectorAll('.tf').forEach(el=>{el.classList.toggle('active',el.textContent.trim()==='Mine');});},100);
  } else {
    document.getElementById('screen-dashboard').classList.add('active');
    if(document.querySelector('.navi'))document.querySelector('.navi').classList.add('active');
    buildDashboard();buildBrandsGrid();buildTeamList();buildTaskViews();
  }
  setTimeout(updateAllBadges,300);
  setTimeout(startDeadlineMonitor,600); // check deadlines after UI settles
}
document.getElementById('lp').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
document.getElementById('lu').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
function setupUser(){
  const av=document.getElementById('sb-av');
  av.textContent=CU.initials;av.style.background=CU.bg;av.style.color=CU.color;
  document.getElementById('sb-nm').textContent=CU.name;
  // Role line: Super Admin / SAM show just role; Specialists show their title; Owners show role
  const roleDisplay = isSuperAdmin(CU)?'Super Admin':
    CU.role==='sam'?'SAM':
    isSpec(CU)?(CU.title||'Specialist'):
    isBrandOwner(CU)?'Owner — Brand Stakeholder':
    roleLabel(CU.role);
  document.getElementById('sb-rl').textContent=roleDisplay;

  const isSA=isSuperAdmin(CU);
  const isSam=CU.role==='sam';
  const isSpecialist=isSpec(CU);
  const isOwner=isBrandOwner(CU);

  // Admin nav section (Team, Reports, Settings, Lookups)
  document.getElementById('admin-nav').style.display=isSA?'block':'none';
  if(!canManage(CU))document.getElementById('admin-stat')?.style.setProperty('display','none');

  // Nav items by role
  // Brands — Super admin & SAM see brands; specialist & owner don't
  document.querySelectorAll('.nb-brands-nav').forEach(el=>el.style.display=(isSA||isSam)?'flex':'none');
  // Playbook — hide for all except super admin & SAM
  document.querySelectorAll('.nb-playbook-nav').forEach(el=>el.style.display=(isSA||isSam)?'flex':'none');
  // Campaigns — super admin & SAM only
  document.querySelectorAll('.nb-campaigns-nav').forEach(el=>el.style.display=(isSA||isSam)?'flex':'none');
  // Productivity — super admin & SAM only
  document.querySelectorAll('.nb-productivity-nav').forEach(el=>el.style.display=canManage(CU)?'flex':'none');
  // Lookups — super admin only
  document.querySelectorAll('.nb-lookups-nav').forEach(el=>el.style.display=isSA?'flex':'none');
  // Approvals — brand owner only
  document.querySelectorAll('.nb-approvals-nav').forEach(el=>el.style.display=isOwner?'flex':'none');
  // My Assets + My Brand — brand owner only
  document.querySelectorAll('.nb-myassets-nav').forEach(el=>el.style.display=isOwner?'flex':'none');
  document.querySelectorAll('.nb-mybrand-nav').forEach(el=>el.style.display=isOwner?'flex':'none');
  // Refresh owner asset badge
  if(isOwner&&typeof refreshMyAssetsBadge==='function')refreshMyAssetsBadge();
  // Tasks nav — super admin, SAM, specialist
  document.querySelectorAll('.nb-tasks-nav').forEach(el=>el.style.display=isOwner?'none':'flex');
  // Assets — everyone except brand owner (they see own brand assets inside workspace)
  document.querySelectorAll('.nb-assets-nav').forEach(el=>el.style.display=isOwner?'none':'flex');
  // Reports — super admin, SAM, specialist (own activity)
  document.querySelectorAll('.nb-reports-nav').forEach(el=>el.style.display=isOwner?'none':'flex');
  // My Work — super admin, SAM (always), specialist (always)
  document.querySelectorAll('.nb-mywork-nav').forEach(el=>el.style.display=(isSA||isSam||isSpecialist)?'flex':'none');
  // Dashboard — hide for specialist and owner
  document.querySelectorAll('.nb-dashboard-nav').forEach(el=>el.style.display=(isSpecialist||isOwner)?'none':'flex');
  // Primary action button — hide for specialist and owner
  const primaryBtn=document.getElementById('primary-btn');
  if(primaryBtn)primaryBtn.style.display=(isSpecialist||isOwner)?'none':'';
  document.querySelectorAll('.spec-hide').forEach(el=>el.style.display=isSpecialist?'none':'');

  // Greeting
  const hr=new Date().getHours(),g=hr<12?'morning':hr<17?'afternoon':'evening';
  const greetH=document.getElementById('greet-h');
  if(greetH)greetH.textContent=`Good ${g}, ${CU.name.split(' ')[0]} 👋`;
  const greetS=document.getElementById('greet-s');
  if(greetS)greetS.textContent=
    isSA?'Agency overview — full access':
    isSam?'Here\'s your brands for today':
    isOwner?'Here\'s what needs your approval':
    'Here\'s your tasks for today';

  // Auto-navigate based on role
  if(isOwner){
    showScreen('approvals',document.querySelector('.nb-approvals-nav'));
    buildApprovals();
  } else if(isSpecialist){
    showScreen('mywork',document.querySelector('.nb-mywork-nav'));
    buildMyWork();
  }
}
function doLogout(){closeModal();CU=null;CBid=null;document.getElementById('app').style.display='none';document.getElementById('login-screen').style.display='flex';document.getElementById('lu').value='';document.getElementById('lp').value='';document.getElementById('lerr').style.display='none';buildDemoList();}

// ══════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════
function buildDashboard(){
  const active=BRANDS.filter(b=>!b.archived);
  document.getElementById('dash-bc').textContent=active.length;
  document.getElementById('nb-brands').textContent=active.length;
  const myTasks=CU?TASKS.filter(t=>t.assigneeId===CU.id&&t.stage!=='completed'):TASKS;
  const inReview=TASKS.filter(t=>t.stage==='review').length;
  document.getElementById('dash-tc').textContent=myTasks.length;
  document.getElementById('dash-rc').textContent=inReview;
  document.getElementById('dash-mcount').textContent=MEMBERS.filter(m=>m.active).length;
  document.getElementById('nb-team').textContent=MEMBERS.filter(m=>m.active).length;
  const today=new Date().toISOString().split('T')[0];
  const dueToday=myTasks.filter(t=>t.due===today).length;
  document.getElementById('dash-ts').textContent=dueToday?`${dueToday} due today`:'All on track';
  updateTaskBadge();

  // ── Role-specific Focus Strip ──
  const focusEl=document.getElementById('dash-focus');
  if(focusEl&&CU){
    let chips=[];
    if(isSpec(CU)){
      const mwItems=window._mwItems||[];
      const inProg=mwItems.filter(x=>x.stage==='inprogress').length;
      const todo=mwItems.filter(x=>x.stage==='todo').length;
      const overdue=myTasks.filter(t=>t.due&&t.due<today).length;
      if(inProg)chips.push({icon:'⚡',label:`${inProg} in progress`,color:'var(--blue)',bg:'var(--bbg)',action:"showScreen('tasks',null)"});
      if(todo)chips.push({icon:'📋',label:`${todo} to start`,color:'var(--text2)',bg:'var(--bg3)',action:"showScreen('tasks',null)"});
      if(overdue)chips.push({icon:'⚠',label:`${overdue} overdue`,color:'var(--red)',bg:'var(--rbg)',action:"showScreen('tasks',null)"});
      if(!chips.length)chips.push({icon:'🎉',label:'All clear — great work today!',color:'var(--green)',bg:'var(--gnbg)',action:''});
    } else if(isBrandOwner(CU)){
      let pending=0;
      BRANDS.forEach(b=>{if(!CU.brands||!CU.brands.some(x=>x==b.id))return;(b.campaigns||[]).forEach(c=>{(c.contentPieces||[]).forEach(p=>{if(p.status==='pending')pending++;});});});
      if(pending)chips.push({icon:'✋',label:`${pending} pending your approval`,color:'var(--amber)',bg:'var(--ambg)',action:"showScreen('approvals',document.querySelector('.nb-approvals-nav'));buildApprovals()"});
      else chips.push({icon:'✅',label:'Nothing pending — all approved!',color:'var(--green)',bg:'var(--gnbg)',action:''});
    } else {
      // SAM / Super Admin
      const brandIds=isSuperAdmin(CU)?BRANDS.map(b=>b.id):(CU.brands||[]);
      const review=TASKS.filter(t=>t.stage==='review'&&brandIds.some(id=>id==t.brandId)).length;
      let pendingOwner=0;let ownerChanges=0;let firstChangeBid=null;
      BRANDS.filter(b=>brandIds.some(id=>id==b.id)).forEach(b=>{
        (b.campaigns||[]).forEach(c=>{
          (c.contentPieces||[]).forEach(p=>{if(p.status==='pending')pendingOwner++;if(p.status==='changes'){ownerChanges++;if(!firstChangeBid)firstChangeBid=b.id;}});
          if(c.ownerStatus==='changes'){ownerChanges++;if(!firstChangeBid)firstChangeBid=b.id;}
        });
      });
      const overdueTasks=TASKS.filter(t=>t.due&&t.due<today&&!['completed','approved'].includes(t.stage)&&brandIds.includes(t.brandId)).length;
      if(ownerChanges)chips.push({icon:'❌',label:`${ownerChanges} owner change request${ownerChanges>1?'s':''}`,color:'var(--red)',bg:'var(--rbg)',action:firstChangeBid?`openBrandMonthly(${firstChangeBid})`:"document.getElementById('dash-owner-feedback')?.scrollIntoView({behavior:'smooth'})"});
      if(review)chips.push({icon:'👁',label:`${review} need your review`,color:'var(--amber)',bg:'var(--ambg)',action:"showScreen('tasks',null);filterTasks('review',null)"});
      if(pendingOwner)chips.push({icon:'📤',label:`${pendingOwner} pending owner`,color:'var(--blue)',bg:'var(--bbg)',action:''});
      if(overdueTasks)chips.push({icon:'⚠',label:`${overdueTasks} overdue`,color:'var(--red)',bg:'var(--rbg)',action:"showScreen('tasks',null)"});
      if(!chips.length)chips.push({icon:'✅',label:'All on track — nothing urgent',color:'var(--green)',bg:'var(--gnbg)',action:''});
    }
    const greeting=isSpec(CU)?'Your workload today':isBrandOwner(CU)?'Pending your review':isBM(CU)?'What needs your attention':'Agency overview';
    focusEl.innerHTML=`<div style="font-size:10px;color:var(--text3);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:.07em">${greeting}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${chips.map(c=>`<div class="focus-chip" style="color:${c.color};background:${c.bg};border-color:${c.color}44" ${c.action?`onclick="${c.action}"`:''}">${c.icon} ${c.label}</div>`).join('')}</div>`;
  }

  document.getElementById('dash-tasks-list').innerHTML=myTasks.slice(0,5).map(t=>{
    const s=STAGES[t.stage];const b=BRANDS.find(x=>x.id===t.brandId);
    return`<div class="ti" onclick="openTaskDetail('${t.id}')" style="cursor:pointer"><div style="flex:1"><div class="ttx">${t.title}</div><div class="tmt">${t.g7||''} · ${b?b.name:''}</div></div><span class="badge" style="background:${s.bg};color:${s.color};border:.5px solid ${s.border};font-size:9px">${s.label}</span><div class="tdu ${t.due<today&&t.stage!=='completed'?'late':''}">${fmtDate(t.due)}</div></div>`;
  }).join('')||`<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No open tasks</div><div class="empty-state-sub">Tasks assigned to you appear here</div></div>`;
  document.getElementById('dash-brands-list').innerHTML=active.slice(0,5).map(b=>{
    const openT=TASKS.filter(t=>t.brandId===b.id&&!['completed','approved'].includes(t.stage)).length;
    const delayed=TASKS.filter(t=>t.brandId===b.id&&!['completed','approved'].includes(t.stage)&&t.due&&t.due<today).length;
    const activeCamps=(b.campaigns||[]).filter(c=>c.status==='active').length;
    return`<div class="bi" onclick="openBrand(${b.id})">
      <div class="bdt" style="background:${b.color}"></div>
      <div class="bnm">${b.name}</div>
            <div class="bind" style="padding-right:12px">${b.industry}</div>
      <div style="display:flex;gap:12px;align-items:center;flex-shrink:0">
        <span style="font-size:11px;color:var(--text3);white-space:nowrap"><b style="color:var(--text2)">${activeCamps}</b> active</span>
        <span style="font-size:11px;color:var(--text3);white-space:nowrap"><b style="color:var(--text2)">${openT}</b> tasks</span>
        ${delayed?`<span style="font-size:11px;color:var(--red);font-weight:600;white-space:nowrap">⚠ ${delayed} delay</span>`:'<span style="font-size:11px;color:var(--green);white-space:nowrap">✓ on track</span>'}
      </div>
    </div>`;
  }).join('')||`<div class="empty-state"><div class="empty-state-icon">🏢</div><div class="empty-state-sub">No brands yet — add one to get started</div></div>`;
  document.getElementById('dash-activity').innerHTML=ACTIVITIES.map(a=>`<div class="aci"><div class="acav" style="background:${a.bg};color:${a.c}">${a.u}</div><div><div class="actx">${a.txt}</div><div class="acti">${a.time}</div></div></div>`).join('');
  const campEl=document.getElementById('dash-campaigns-list');
  if(campEl)campEl.innerHTML=buildCampaignsDashSection();

  // ── Owner Feedback Panel ──
  const fbEl=document.getElementById('dash-owner-feedback');
  if(fbEl&&canManage(CU)){
    const brandIds=isSuperAdmin(CU)?BRANDS.map(b=>b.id):(CU.brands||[]);
    const items=[];
    BRANDS.filter(b=>brandIds.some(id=>id==b.id)&&!b.archived).forEach(b=>{
      (b.campaigns||[]).forEach((camp,ci)=>{
        // Campaign-level changes
        if(camp.ownerStatus==='changes'){
          const latestComment=(camp.ownerComments||[]).filter(c=>c.type==='changes').pop();
          items.push({type:'campaign',brand:b,camp,ci,comment:latestComment?.text||'',by:latestComment?.by||'Owner',at:latestComment?.at||''});
        }
        // Content piece changes
        (camp.contentPieces||[]).forEach((p,pi)=>{
          if(p.status==='changes'&&p.sentToOwnerAt){
            items.push({type:'piece',brand:b,camp,ci,pi,p,comment:p.ownerComment||'',by:p.approvedBy||'Owner',at:p.submittedAt||''});
          }
        });
      });
    });
    if(items.length){
      fbEl.style.display='';
      fbEl.innerHTML=`<div style="font-size:13px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--red);display:inline-block"></span>
        Owner change requests <span style="font-size:11px;background:var(--rbg);color:var(--red);padding:2px 8px;border-radius:9px;font-weight:600">${items.length}</span>
      </div>
      ${items.map(item=>`<div style="background:var(--bg2);border:.5px solid var(--rborder);border-left:3px solid var(--red);border-radius:var(--rsm);padding:12px 14px;margin-bottom:8px;cursor:pointer" onclick="${item.type==='campaign'?`openBrand(${item.brand.id})`:`openBrand(${item.brand.id})`}">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
          <span style="font-size:11px;padding:1px 7px;background:${item.brand.color}18;color:${item.brand.color};border:.5px solid ${item.brand.color}44;border-radius:9px;font-weight:600">${item.brand.name}</span>
          <span style="font-size:11px;font-weight:600">${item.type==='campaign'?'📋 Campaign: '+item.camp.name:'📄 '+item.p.topic}</span>
          <span style="font-size:10px;color:var(--red);margin-left:auto">❌ Changes requested</span>
        </div>
        ${item.comment?`<div style="font-size:12px;color:var(--text);padding:7px 10px;background:var(--rbg);border-radius:var(--rsm);line-height:1.5">"${item.comment}"</div>`:''}
        <div style="font-size:10px;color:var(--text3);margin-top:6px">From: ${item.by}${item.at?' · '+new Date(item.at).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):''}</div>
      </div>`).join('')}`;
    } else {
      fbEl.style.display='none';
    }
  }
}
function updateAllBadges(){
  if(!CU)return;
  // Notification badge
  updateNotificationBadge();
  // Tasks badge
  updateTaskBadge();
  // Approvals badge (for owners)
  if(isBrandOwner(CU)){
    let pending=0;
    BRANDS.forEach(b=>{
      if(!CU.brands||!CU.brands.some(x=>x==b.id))return;
      (b.campaigns||[]).forEach(camp=>{
        (camp.contentPieces||[]).forEach(p=>{if(p.status==='pending')pending++;});
      });
      Object.values(b.g7Plans||{}).forEach(plan=>{
        Object.values(plan.activities||[]).forEach(act=>{
          if(!act)return;
          Object.values(act.deliverableBriefs||{}).forEach(bd=>{if(bd.status==='owner-pending')pending++;});
          if(act.status==='owner-pending')pending++;
        });
      });
      TASKS.filter(t=>t.brandId==b.id&&t.sentToOwner&&t.stage!=='approved'&&t.stage!=='completed').forEach(()=>pending++);
    });
    const badge=document.getElementById('nb-approvals');
    if(badge){badge.textContent=pending||'';badge.style.display=pending?'':'none';}
  }
  // My Work badge (for specialists)
  if(isSpec(CU)){
    const badge=document.getElementById('nb-mywork');
    if(badge){
      const active=(window._mwItems||[]).filter(x=>x.stage==='todo'||x.stage==='inprogress').length;
      badge.textContent=active||'';
    }
  }
}
function updateTaskBadge(){const open=TASKS.filter(t=>CU&&t.assigneeId==CU.id&&t.stage!=='completed').length;const badge=document.getElementById('nb-tasks');if(badge)badge.textContent=open||'';}
function g7pct(b){if(!b)return 0;const plan=b.g7Plan&&b.g7Plan.activities?b.g7Plan.activities:b.g7||[];return Math.round(plan.filter(a=>a&&a.done).length/7*100);}
function fmtDate(d){if(!d)return '—';const dt=new Date(d+'T00:00:00');return dt.toLocaleDateString('en-IN',{day:'numeric',month:'short'});}

// ══════════════════════════════════════════
// TASKS — CORE
// ══════════════════════════════════════════
function getFilteredTasks(){
  let tasks=[...TASKS];
  if(isSAM(CU)){/* SAM sees all */}
  else if(isBM(CU)){
    tasks=tasks.filter(t=>
      t.assigneeId==CU.id||
      t.createdById==CU.id||
      (CU.brands&&CU.brands.some(bid=>bid==t.brandId))
    );
  }
  else{tasks=tasks.filter(t=>t.assigneeId==CU.id);}

  // BM/SAM — also add content pieces in 'review' as virtual tasks
  if(CU&&(isBM(CU)||isSAM(CU))){
    BRANDS.forEach(b=>{
      if(isBM(CU)&&CU.brands&&CU.brands.length&&!CU.brands.some(x=>x==b.id))return;
      (b.campaigns||[]).forEach((camp,ci)=>{
        (camp.contentPieces||[]).forEach((p,pi)=>{
          if(p.status!=='review')return;
          tasks.push({
            _virtual:true,_bid:b.id,_ci:ci,_pi:pi,_p:p,_b:b,_camp:camp,
            id:`cp-review-${b.id}-${ci}-${pi}`,
            title:(p.topic||'Untitled'),
            brandId:b.id,brandName:b.name,
            stage:'review',specStage:'review',
            assigneeId:p.assigneeId,priority:'medium',
            due:p.postDate||'',g7:'Content piece',
            notes:p.completionNote||'',
            files:[],specFiles:p.specFiles||[],
            createdAt:p.lastEditedAt||new Date().toISOString(),
          });
        });
      });
    });
  }

  if(CTaskFilter==='mine')tasks=tasks.filter(t=>t.assigneeId==CU.id);
  else if(CTaskFilter==='high')tasks=tasks.filter(t=>t.priority==='high');
  else if(CTaskFilter==='review')tasks=tasks.filter(t=>t.stage==='review');
  else if(CTaskFilter==='overdue'){const today=new Date().toISOString().split('T')[0];tasks=tasks.filter(t=>t.due&&t.due<today&&t.stage!=='completed');}
  // Brand filter
  if(CTaskBrandFilter)tasks=tasks.filter(t=>String(t.brandId)===String(CTaskBrandFilter));
  // Sort by priority: high → medium → low
  const priOrder={high:0,medium:1,low:2};
  tasks.sort((a,b)=>(priOrder[a.priority]??1)-(priOrder[b.priority]??1));
  return tasks;
}

function setView(v){
  CTaskView=v;
  document.getElementById('vt-kanban').classList.toggle('active',v==='kanban');
  document.getElementById('vt-list').classList.toggle('active',v==='list');
  document.getElementById('task-view-kanban').style.display=v==='kanban'?'block':'none';
  document.getElementById('task-view-list').style.display=v==='list'?'block':'none';
}

function filterTasks(f,el){
  document.querySelectorAll('.tf').forEach(t=>t.classList.remove('active'));
  if(el)el.classList.add('active');
  CTaskFilter=f;buildTaskViews();
}

function buildTaskViews(){
  // Populate brand filter dropdown
  const bSel=document.getElementById('task-brand-filter');
  if(bSel){
    const visibleBrands=BRANDS.filter(b=>!b.archived&&(canManage(CU)||!CU.brands||CU.brands.some(id=>id==b.id)));
    const cur=bSel.value;
    bSel.innerHTML='<option value="">All brands</option>'+visibleBrands.map(b=>`<option value="${b.id}" ${String(b.id)===String(CTaskBrandFilter)?'selected':''}>${b.name}</option>`).join('');
  }
  buildKanban();buildListView();updateTaskBadge();
}

function debugTasks(){
  console.log('=== CU ===',CU?.name, CU?.role, 'brands:',CU?.brands);
  console.log('=== ALL TASKS ===');
  TASKS.forEach(t=>console.log(`id:${t.id} stage:${t.stage} specStage:${t.specStage} brandId:${t.brandId} assigneeId:${t.assigneeId} createdById:${t.createdById} title:${t.title}`));
  console.log('=== FILTERED FOR BM ===');
  const filtered=TASKS.filter(t=>t.assigneeId==CU.id||t.createdById==CU.id||(CU.brands&&CU.brands.some(bid=>bid==t.brandId)));
  filtered.forEach(t=>console.log(`✓ ${t.title} stage:${t.stage}`));
  alert(`Total tasks: ${TASKS.length}\nFiltered for ${CU.name}: ${filtered.length}\nIn review: ${filtered.filter(t=>t.stage==='review').length}\n\nCheck browser console for details`);
}

// ── KANBAN ──
function buildKanban(){
  const tasks=getFilteredTasks();
  document.getElementById('kanban-board').innerHTML=STAGE_ORDER.map(stageKey=>{
    const s=STAGES[stageKey];
    const stageTasks=tasks.filter(t=>t.stage===stageKey);
    return`<div class="kb-col"
      ondragover="event.preventDefault();this.classList.add('drag-over')"
      ondragleave="this.classList.remove('drag-over')"
      ondrop="kanbanDrop(event,'${stageKey}');this.classList.remove('drag-over')">
      <div class="kb-col-hdr">
        <div class="kb-stage-dot" style="background:${s.color}"></div>
        <div class="kb-stage-name">${s.label}</div>
        <div class="kb-count" style="background:${s.bg};color:${s.color}">${stageTasks.length}</div>
      </div>
      <div class="kb-cards">
        ${stageTasks.length?stageTasks.map(t=>{
          const b=BRANDS.find(x=>x.id===t.brandId);
          const assignee=MEMBERS.find(x=>x.id===t.assigneeId);
          const pri=PRI_CFG[t.priority]||PRI_CFG.medium;
          const today=new Date().toISOString().split('T')[0];
          const late=t.due&&t.due<today&&t.stage!=='completed';
          const notePeek=(t.notes||'').trim().substring(0,75);
          const isAssignee=CU&&t.assigneeId==CU.id;
          return`<div class="kb-card" ${canManage(CU)?'draggable="true"':''}
            ondragstart="kanbanDragStart(event,'${t.id}')"
            ondragend="this.classList.remove('dragging')"
            onclick="openTaskDetail('${t.id}')"
            style="${canManage(CU)?'':'cursor:pointer'}">
            <div class="kb-card-title">${t.title}</div>
            ${notePeek?`<div class="brief-peek">${notePeek}${notePeek.length===75?'…':''}</div>`:''}
            <div style="margin:4px 0 6px">
              <span style="font-size:10px;font-weight:600;color:${b?b.color:'var(--accent2)'};background:${b?b.color+'18':'var(--abg)'};padding:2px 8px;border-radius:9px;border:.5px solid ${b?b.color+'44':'var(--acb)'}">${b?b.name:'—'}</span>
              ${t.g7?`<span style="font-size:10px;color:var(--text3);margin-left:4px">${t.g7}</span>`:''}
            </div>
            <div class="kb-card-meta">
              <span class="badge ${pri.cls}" style="font-size:9px">${pri.label}</span>
              ${t.due?`<span style="font-size:9px;color:${late?'var(--red)':'var(--text3)'};font-weight:${late?'600':'400'}">${late?'⚠ ':' ⏰ '}${fmtDate(t.due)}</span>`:''}
              ${assignee?`<span style="font-size:9px;background:${assignee.bg};color:${assignee.color};padding:1px 5px;border-radius:8px">${assignee.initials}</span>`:''}
              ${(t.comments||[]).length?`<span style="font-size:9px;color:var(--text3)">💬${t.comments.length}</span>`:''}
              ${t.specFiles&&t.specFiles.length?`<span style="font-size:9px;color:var(--text3)">📎${t.specFiles.length}</span>`:''}
              ${canManage(CU)&&(t.deadlineRequests||[]).some(r=>r.status==='pending')?`<span style="font-size:9px;color:var(--amber);font-weight:700" title="Pending deadline extension request">⏰</span>`:''}
            </div>
            ${isAssignee&&stageKey==='todo'?`<button onclick="event.stopPropagation();startTask('${t.id}')" style="margin-top:6px;width:100%;padding:5px;background:var(--accent);border:none;border-radius:var(--rsm);color:#fff;font-family:var(--font);font-size:11px;font-weight:600;cursor:pointer">▶ Start</button>`:''}
            ${isAssignee&&stageKey==='inprogress'?`<button onclick="event.stopPropagation();submitTask('${t.id}')" style="margin-top:6px;width:100%;padding:5px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);color:var(--amber);font-family:var(--font);font-size:11px;font-weight:600;cursor:pointer">✓ Submit for review</button>`:''}
          </div>`;
        }).join(''):`<div class="empty-state" style="padding:20px 12px">
          <div class="empty-state-icon">${s.label==='To Do'?'📋':s.label==='In Progress'?'⚡':s.label==='Review'?'👁':s.label==='Approved'?'✅':'○'}</div>
          <div class="empty-state-sub">No ${s.label.toLowerCase()} tasks</div>
        </div>`}
      </div>
      ${canManage(CU)?`<button class="kb-add" onclick="openAddTask('${stageKey}')">+ Add task</button>`:''}
    </div>`;
  }).join('');
}

function startTask(id){
  const t=TASKS.find(x=>x.id==id);if(!t)return;
  t.stage='inprogress';t.specStage='inprogress';
  syncPieceStatus(t);
  persist();buildTaskViews();buildDashboard();
  toast('⚡ Started — good luck!','var(--accent)');
}
function submitTask(id){
  // Open submit modal instead of submitting directly
  const t=TASKS.find(x=>x.id==id);if(!t)return;
  const ex=document.getElementById('modal-submit-task');if(ex)ex.remove();
  const mo=document.createElement('div');mo.id='modal-submit-task';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:480px"><div class="modal-p">
    <div class="mtit">✓ Submit for review</div>
    <div class="msub">${t.title}</div>
    <div style="margin-bottom:12px">
      <label class="flbl">Time taken</label>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="display:flex;align-items:center;gap:4px">
          <input class="finp" id="submit-time-h" type="number" min="0" max="99" placeholder="0" style="width:64px;font-size:16px;font-weight:600;text-align:center;font-family:var(--mono,monospace)" oninput="updateTimeLabel()"/>
          <span style="font-size:12px;color:var(--text3)">hrs</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px">
          <input class="finp" id="submit-time-m" type="number" min="0" max="59" placeholder="0" style="width:64px;font-size:16px;font-weight:600;text-align:center;font-family:var(--mono,monospace)" oninput="updateTimeLabel()"/>
          <span style="font-size:12px;color:var(--text3)">min</span>
        </div>
        <span style="font-size:12px;color:var(--accent2);font-weight:500" id="submit-time-label"></span>
      </div>
    </div>
    <div style="margin-bottom:12px">
      <label class="flbl">Completion note</label>
      <textarea class="ftxt" id="submit-note" style="min-height:60px" placeholder="What did you complete? Any notes for the reviewer..."></textarea>
    </div>
    <div style="margin-bottom:12px">
      <label class="flbl">File path / URL <span style="color:var(--text3);font-weight:400">(Google Drive, server path, Figma, etc.)</span></label>
      <div id="submit-paths">
        <div style="display:flex;gap:6px;margin-bottom:6px">
          <input class="finp" id="submit-path-0" placeholder="https://drive.google.com/... or /server/path/file.png" style="flex:1;font-size:12px"/>
          <input class="finp" id="submit-path-label-0" placeholder="Label" style="width:100px;font-size:12px"/>
        </div>
      </div>
      <button onclick="addSubmitPathRow()" style="font-size:11px;padding:3px 10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">+ Add another path</button>
    </div>
    <div style="margin-bottom:14px">
      <label class="flbl">Upload files <span style="color:var(--text3);font-weight:400">(optional)</span></label>
      <label style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:12px;color:var(--text2);cursor:pointer" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
        📎 Choose files
        <input type="file" multiple id="submit-files" style="display:none" onchange="updateSubmitFileList(this)">
      </label>
      <div id="submit-file-list" style="margin-top:6px;font-size:11px;color:var(--text3)"></div>
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-submit-task').remove()">Cancel</button>
      <button class="mbtn ok" onclick="confirmSubmitTask(${id})">Submit for review →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
  setTimeout(()=>document.getElementById('submit-note')?.focus(),100);
}

let _submitPathCount=1;
function updateTimeLabel(){
  const hrs=parseInt(document.getElementById('submit-time-h')?.value)||0;
  const mins=parseInt(document.getElementById('submit-time-m')?.value)||0;
  const lbl=document.getElementById('submit-time-label');
  if(!lbl)return;
  if(hrs||mins){
    const hStr=hrs?hrs+' hr'+(hrs!==1?'s':''):'';
    const mStr=mins?mins+' min':'';
    lbl.textContent='= '+(hStr+(hrs&&mins?' ':'')+mStr);
  }else lbl.textContent='';
}
function validateTimeInput(el){updateTimeLabel();}

function addSubmitPathRow(){
  const container=document.getElementById('submit-paths');if(!container)return;
  const row=document.createElement('div');row.style.cssText='display:flex;gap:6px;margin-bottom:6px';
  row.innerHTML=`<input class="finp" id="submit-path-${_submitPathCount}" placeholder="https://... or /path/to/file" style="flex:1;font-size:12px"/>
    <input class="finp" id="submit-path-label-${_submitPathCount}" placeholder="Label" style="width:100px;font-size:12px"/>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:16px;padding:0 4px">×</button>`;
  container.appendChild(row);
  _submitPathCount++;
}

function updateSubmitFileList(input){
  const el=document.getElementById('submit-file-list');if(!el)return;
  el.innerHTML=[...input.files].map(f=>`<div>📎 ${f.name} <span style="color:var(--text3)">${f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB'}</span></div>`).join('');
}

function confirmSubmitTask(id){
  const t=TASKS.find(x=>x.id==id);if(!t)return;
  const note=(document.getElementById('submit-note')?.value||'').trim();
  const hrs=parseInt(document.getElementById('submit-time-h')?.value)||0;
  const mins=parseInt(document.getElementById('submit-time-m')?.value)||0;
  if(hrs||mins){
    const formatted=`${String(hrs).padStart(2,'0')}.${String(mins).padStart(2,'0')}`;
    t.timeLogged={hours:hrs,minutes:mins,formatted,loggedAt:new Date().toISOString(),loggedBy:CU?.name};
  }
  // Collect file paths
  const paths=[];
  let i=0;
  while(document.getElementById('submit-path-'+i)){
    const url=(document.getElementById('submit-path-'+i)?.value||'').trim();
    const label=(document.getElementById('submit-path-label-'+i)?.value||'').trim();
    if(url)paths.push({url,label:label||url.split('/').pop()||'File',addedAt:new Date().toISOString(),addedBy:CU?.name});
    i++;
  }
  if(note)t.completionNote=note;
  if(paths.length){if(!t.filePaths)t.filePaths=[];t.filePaths.push(...paths);}
  // Handle uploaded files
  const fileInput=document.getElementById('submit-files');
  if(fileInput&&fileInput.files.length){
    if(!t.specFiles)t.specFiles=[];
    [...fileInput.files].forEach(file=>{
      const sizeFmt=file.size>1048576?(file.size/1048576).toFixed(1)+' MB':(file.size/1024).toFixed(0)+' KB';
      const reader=new FileReader();
      reader.onload=e=>{
        t.specFiles.push({name:file.name,size:sizeFmt,type:file.type,data:e.target.result,addedAt:new Date().toISOString()});
        persist();
      };
      reader.readAsDataURL(file);
    });
  }
  // Auto-log time to brand's Time tab if time was entered
  if(hrs||mins){
    const brand=BRANDS.find(x=>x.id==t.brandId);
    if(brand){
      if(!brand.timeLogs)brand.timeLogs=[];
      const today2=new Date().toISOString().split('T')[0];
      brand.timeLogs.push({
        id:'tl-task-'+t.id,
        memberId:CU?.id,
        brandId:t.brandId,
        date:today2,
        month:today2.substring(0,7),
        hours:hrs,minutes:mins,
        activity:'Task work',
        notes:t.title,
        source:'task',
        taskId:t.id,
        loggedAt:new Date().toISOString()
      });
    }
  }
  syncPieceStatus(t);
  if(!t.comments)t.comments=[];
  t.comments.push({id:Date.now(),authorId:CU?.id,authorName:CU?.name,text:`✓ Submitted for review${note?' — '+note:''}`,createdAt:new Date().toISOString(),readBy:[CU?.id]});
  addNotification('review',`"${t.title}" submitted for review by ${CU?.name||'Specialist'}`,t.brandId,t.id,null);
  persist();buildTaskViews();buildDashboard();
  document.getElementById('modal-submit-task')?.remove();
  _submitPathCount=1;
  const emojis=['🎉','🚀','⭐','✨'];
  toast(emojis[Math.floor(Math.random()*4)]+' Submitted for review!','var(--green)');
}
function kanbanDragStart(e,id){
  // Specialists don't drag on the Tasks kanban — they use My Work
  if(isSpec(CU)){e.preventDefault();return;}
  // Virtual cp-review tasks are managed via the CP modal, not dragging
  if(String(id).startsWith('cp-'))  {e.preventDefault();return;}
  e.dataTransfer.setData('kanban-task-id',String(id));
  e.currentTarget.classList.add('dragging');
}
function kanbanDrop(e,targetStage){
  e.preventDefault();
  if(isSpec(CU))return; // specialists can't drag
  const id=parseInt(e.dataTransfer.getData('kanban-task-id'));
  if(!id||isNaN(id))return;
  const t=TASKS.find(x=>x.id===id);
  if(!t||t.stage===targetStage)return;

  // Workflow guardrails — prevent nonsensical jumps
  const order=['todo','inprogress','review','approved','onhold','completed','remark'];
  const from=order.indexOf(t.stage);
  const to=order.indexOf(targetStage);

  // Prevent dragging BACKWARDS past review (only SAM can override)
  if(to<from&&from>=order.indexOf('review')&&!isSAM(CU)){
    toast('⚠ Cannot move backwards past Review — use Request changes instead','var(--amber)',3000);
    return;
  }
  // Prevent jumping straight to Approved from Todo/In Progress (must go through Review)
  if(targetStage==='approved'&&['todo','inprogress'].includes(t.stage)&&!isSAM(CU)){
    toast('⚠ Task must go through Review before Approved','var(--amber)',3000);
    return;
  }

  t.stage=targetStage;
  if(targetStage==='completed')t.specStage='completed';
  persist();buildTaskViews();buildDashboard();
  toast(`Moved to ${STAGES[targetStage].label}`,'var(--accent)');
}

// ── LIST VIEW ──
function buildListView(){
  const tasks=getFilteredTasks();
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('task-list-body').innerHTML=tasks.length?tasks.map(t=>{
    const s=STAGES[t.stage];const b=BRANDS.find(x=>x.id===t.brandId);
    const assignee=MEMBERS.find(x=>x.id===t.assigneeId);const pri=PRI_CFG[t.priority]||PRI_CFG.medium;
    const late=t.due&&t.due<today&&t.stage!=='completed';
    return`<div class="task-list-row" onclick="openTaskDetail('${t.id}')">
      <div><div class="tl-name">${t.title}</div><div class="tl-brand">${b?b.name:'—'} ${t.g7?'· '+t.g7:''}</div></div>
      <div><span class="badge" style="background:${s.bg};color:${s.color};border:.5px solid ${s.border};font-size:9px">${s.label}</span></div>
      <div><span class="badge ${pri.cls}" style="font-size:9px">${pri.label}</span></div>
      <div class="tl-cell">${b?b.name:'—'}</div>
      <div class="tl-cell tl-due ${late?'late':''}">${fmtDate(t.due)}</div>
      <div>${assignee?`<span style="font-size:10px;background:${assignee.bg};color:${assignee.color};padding:2px 6px;border-radius:8px">${assignee.initials}</span>`:'—'}</div>
      <div><div class="score-dots">${[1,2,3,4,5].map(i=>`<div class="sdot ${t.score>=i?'filled':''}"></div>`).join('')}</div></div>
    </div>`;
  }).join(''):'<div style="text-align:center;padding:32px;color:var(--text3);font-size:13px">No tasks found</div>';
}

// ── ADD TASK ──
function openAddTask(stage){
  CEditTaskId=null;
  document.getElementById('task-modal-title').textContent='New task';
  document.getElementById('task-modal-sub').textContent='Fill in task details';
  document.getElementById('task-save-btn').textContent='Create task →';
  document.getElementById('tk-title').value='';
  document.getElementById('tk-notes').value='';
  document.getElementById('tk-challenges').value='';
  document.getElementById('tk-due').value='';
  document.getElementById('tk-priority').value='medium';
  document.getElementById('tk-stage').value=stage||'todo';
  document.getElementById('tk-g7').value='';
  // populate brand dropdown
  const bd=document.getElementById('tk-brand');
  bd.innerHTML=BRANDS.filter(b=>!b.archived).map(b=>`<option value="${b.id}">${b.name}</option>`).join('');
  // populate assignee — SAMs + specialists who have access to this brand
  const ad=document.getElementById('tk-assign');
  let assignable;
  if(isSpec(CU)){
    assignable=MEMBERS.filter(m=>m.id===CU.id);
  } else {
    // SAM/Super-Admin: see themselves + all specialists on this brand
    const brandId=parseInt(document.getElementById('tk-brand')?.value)||0;
    assignable=MEMBERS.filter(m=>m.active&&(
      m.id===CU.id ||
      m.role==='specialist' ||
      (canManage(m)&&m.brands&&m.brands.includes(brandId))
    ));
  }
  ad.innerHTML=assignable.map(m=>`<option value="${m.id}" ${m.id===CU.id?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  // populate campaigns
  updateCampaignDropdown();
  openModal('add-task');
}
function updateCampaignDropdown(){
  const bid=parseInt(document.getElementById('tk-brand').value);
  const b=BRANDS.find(x=>x.id===bid);
  const cd=document.getElementById('tk-campaign');
  cd.innerHTML='<option value="">— None —</option>'+(b?b.campaigns.map((c,i)=>`<option value="${i}">${c.name}</option>`).join(''):'');
}
document.addEventListener('change',e=>{
  if(e.target.id==='tk-brand')updateCampaignDropdown();
  // Handle data-action selects in buildCampRowsSection
  const sel=e.target.closest('[data-action]');
  if(sel){
    const action=sel.dataset.action;const bid=sel.dataset.bid;const ci=parseInt(sel.dataset.ci);const ri=parseInt(sel.dataset.ri);
    const b=bid?BRANDS.find(x=>x.id==bid):null;if(!b)return;
    if(!b.campaigns[ci]||!b.campaigns[ci].campRows[ri])return;
    if(action==='campFmt'){b.campaigns[ci].campRows[ri].format=sel.value;persist();}
    else if(action==='campQty'){b.campaigns[ci].campRows[ri].qty=parseInt(sel.value)||1;persist();}
    else if(action==='campAssign'){b.campaigns[ci].campRows[ri].assigneeId=parseInt(sel.value)||null;persist();}
  }
});

function saveTask(){
  const title=document.getElementById('tk-title').value.trim();
  if(!title){toast('⚠ Task title required','var(--amber)');return;}
  const task={id:CEditTaskId||Date.now(),title,brandId:parseInt(document.getElementById('tk-brand').value),g7:document.getElementById('tk-g7').value,assigneeId:parseInt(document.getElementById('tk-assign').value),priority:document.getElementById('tk-priority').value,stage:document.getElementById('tk-stage').value,due:document.getElementById('tk-due').value,notes:document.getElementById('tk-notes').value,challenges:document.getElementById('tk-challenges').value,remarks:'',score:0,files:[],campaignId:document.getElementById('tk-campaign').value||null,createdAt:new Date().toISOString().split('T')[0],createdById:CU?CU.id:null};
  if(CEditTaskId){const idx=TASKS.findIndex(t=>t.id===CEditTaskId);if(idx>-1)TASKS[idx]={...TASKS[idx],...task};}
  else TASKS.push(task);
  closeModal();buildTaskViews();buildDashboard();
  toast(CEditTaskId?'✓ Task updated':'✓ Task created','var(--green)');
}

// ── TASK DETAIL ──
function openTaskDetail(id){
  // Handle virtual content piece review tasks
  if(typeof id==='string'&&id.startsWith('cp-review-')){
    const parts=id.replace('cp-review-','').split('-');
    const bid=parseInt(parts[0]),ci=parseInt(parts[1]),pi=parseInt(parts[2]);
    openContentPiece(bid,ci,pi);
    return;
  }
  // Normalize numeric-string IDs (passed quoted from HTML onclick) back to numbers
  if(typeof id==='string'&&/^\d+$/.test(id))id=parseInt(id,10);
  CEditTaskId=id;const t=TASKS.find(x=>x.id===id);if(!t)return;
  const b=BRANDS.find(x=>x.id===t.brandId);const assignee=MEMBERS.find(x=>x.id===t.assigneeId);const s=STAGES[t.stage];const pri=PRI_CFG[t.priority]||PRI_CFG.medium;const today=new Date().toISOString().split('T')[0];
  document.getElementById('td-title').textContent=t.title;
  document.getElementById('td-meta').innerHTML=`<span class="badge" style="background:${s.bg};color:${s.color};border:.5px solid ${s.border}">${s.label}</span><span class="badge ${pri.cls}">${pri.label}</span>${b?`<span class="badge bgr">${b.name}</span>`:''}${t.g7?`<span class="badge bgr">${t.g7}</span>`:''}`;
  // stage select — SAM can change, specialist sees it read-only
  const stageEl=document.getElementById('td-stage');
  if(stageEl){
    stageEl.innerHTML=STAGE_ORDER.map(sk=>`<option value="${sk}" ${sk===t.stage?'selected':''}>${STAGES[sk].label}</option>`).join('');
    stageEl.disabled=!canManage(CU);
  }
  document.getElementById('td-assignee').textContent=assignee?assignee.name:'Unassigned';
  const late=t.due&&t.due<today&&t.stage!=='completed';
  document.getElementById('td-due').innerHTML=t.due?`<span style="color:${late?'var(--red)':'var(--text)'}">${fmtDate(t.due)}${late?' (overdue)':''}</span>`:'—';
  document.getElementById('td-priority').innerHTML=`<span class="badge ${pri.cls}">${pri.label}</span>`;
  // score
  document.getElementById('td-score-input').innerHTML=[1,2,3,4,5].map(i=>`<div class="score-star ${t.score>=i?'on':''}" onclick="setScore(${id},${i})">${i<=t.score?'★':'☆'}</div>`).join('')+`<span style="font-size:12px;color:var(--text2);margin-left:4px">${t.score>0?t.score+'/5':'Not rated'}</span>`;
  const notesEl=document.getElementById('td-notes-edit');
  const challengesEl=document.getElementById('td-challenges-edit');
  if(notesEl){notesEl.value=t.notes||'';notesEl.readOnly=isSpec(CU);}
  if(challengesEl){challengesEl.value=t.challenges||'';challengesEl.readOnly=false;}
  const remarksEl=document.getElementById('td-remarks-edit');if(remarksEl)remarksEl.value=t.remarks||'';
  renderTaskFiles(t);
  // Show brief — works for ALL roles (SAM + specialist)
  const briefSection=document.getElementById('td-brief-section');
  const briefContent=document.getElementById('td-brief-content');
  if(briefSection&&briefContent){
    // Priority 1: briefData snapshot on task (new tasks)
    let bd=t.briefData?{...t.briefData}:null;

    // Priority 2: live lookup via taskId / contentPieceRef
    if(!bd){
      let lp=null,lc=null;
      for(const br of BRANDS){for(const c of(br.campaigns||[])){for(const p of(c.contentPieces||[])){if(String(p.taskId)===String(t.id)){lp=p;lc=c;break;}}}if(lp)break;}
      if(!lp&&t.contentPieceRef){
        const br2=BRANDS.find(x=>String(x.id)===String(t.contentPieceRef.bid));
        if(br2){lc=br2.campaigns[t.contentPieceRef.ci];lp=lc&&lc.contentPieces[t.contentPieceRef.pi];}
      }
      if(lp)bd={T:lc&&lc.T,E:lc&&lc.E,platform:lp.platform,creativeStyle:lp.creativeStyle,copyDir:lp.copyDir,copy:lp.copy,caption:lp.caption,hashtags:lp.hashtags,visualIdea:lp.visualIdea};
    }

    // Priority 3: parse task notes (always works — generatePieceTask writes it there)
    if(!bd&&t.notes&&t.notes.trim()){
      const parsed={};
      t.notes.split('\n').forEach(line=>{
        const m=line.match(/^(Platform|Format|Direction|Copy):\s*(.+)/);
        if(m){const k=m[1].toLowerCase();parsed[k==='format'?'creativeStyle':k==='direction'?'copyDir':k]=m[2];}
      });
      if(parsed.platform||parsed.creativeStyle||parsed.copyDir||parsed.copy)bd=parsed;
    }

    if(bd){
      briefSection.style.display='block';
      const fields=[
        ['T — Target audience',bd.T],['E — Elevator pitch',bd.E],
        ['Platform',bd.platform],['Creative style',bd.creativeStyle],
        ['Copy direction',bd.copyDir],['Copy',bd.copy],
        ['Caption',bd.caption],['Hashtags',bd.hashtags],['Visual idea',bd.visualIdea],
      ].filter(([,v])=>v&&String(v).trim());
      briefContent.innerHTML=fields.length
        ?fields.map(([lbl,val])=>`<div style="margin-bottom:8px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:3px">${lbl}</div><div style="font-size:12px;color:var(--text);background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px 10px;line-height:1.5;white-space:pre-wrap">${String(val)}</div></div>`).join('')
        :`<div style="padding:8px;background:var(--bg3);border-radius:var(--rsm);font-size:11px;color:var(--text3)">Brief details not filled yet.</div>`;
    }else{
      briefSection.style.display='none';
    }
  }

  // Deadline extension — show to assignee (any role)
  // Milestone dates from linked brief
  const msEl=document.getElementById('td-milestones');
  const msContent=document.getElementById('td-milestone-content');
  if(msEl&&msContent){
    const bd=t.briefData||null;
    let lp=null;
    if(!bd){BRANDS.forEach(br=>(br.campaigns||[]).forEach(c=>(c.contentPieces||[]).forEach(p=>{if(String(p.taskId)===String(t.id))lp=p;})));}
    const src=lp||bd||{};
    const milestones=[
      ['📋 Brief due',src.briefDue],['✅ Brief approval',src.briefApprovalDue||src.briefApproval],
      ['🎨 Design ready',(bd&&bd.designDate)||src.designDate],['✅ Final approval',(bd&&bd.approvalDate)||src.approvalDate],
      ['📤 Post / delivery',src.postDate],
    ].filter(([,v])=>v&&String(v).trim());
    if(milestones.length){
      msEl.style.display='';
      msContent.innerHTML=milestones.map(([lbl,val])=>`<div style="padding:8px 10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm)"><div style="font-size:10px;color:var(--text3);margin-bottom:2px">${lbl}</div><div style="font-size:12px;font-weight:500;color:var(--text)">${fmtDate(val)}</div></div>`).join('');
    }else msEl.style.display='none';
  }
  // Deadline extension button — show to assignee (any role)
  const extBtn=document.getElementById('td-deadline-ext-btn');
  if(extBtn)extBtn.style.display=(CU&&t.assigneeId==CU.id)?'':'none';
  // Reassign button — show to SAMs always
  const reassignBtn=document.getElementById('td-inline-reassign-btn');
  if(reassignBtn)reassignBtn.style.display=canManage(CU)?'':'none';
  // SAM: show pending deadline extension requests
  const drEl=document.getElementById('td-deadline-requests');
  if(drEl){
    const pending=(t.deadlineRequests||[]).filter(r=>r.status==='pending');
    if(pending.length&&canManage(CU)){
      drEl.style.display='block';
      drEl.innerHTML=`<div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:12px;margin-bottom:10px">
        <div style="font-size:11px;font-weight:700;color:var(--amber);margin-bottom:8px">📅 Deadline extension request</div>
        ${pending.map(r=>{
          const ri=t.deadlineRequests.indexOf(r);
          return`<div style="padding:8px;background:var(--bg2);border-radius:var(--rsm)">
            <div style="font-size:12px;font-weight:500">${r.name} → new date: <b>${r.proposedDate}</b></div>
            <div style="font-size:11px;color:var(--text2);margin:4px 0;font-style:italic">"${r.reason}"</div>
            <div style="display:flex;gap:6px;margin-top:6px">
              <button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="approveDeadlineExtension(${t.id},${ri})">✓ Approve</button>
              <button class="btn btn-sm" style="background:var(--rbg);border-color:var(--rborder);color:var(--red)" onclick="rejectDeadlineExtension(${t.id},${ri})">✗ Decline</button>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }else drEl.style.display='none';
  }
  const bmActionsEl=document.getElementById('td-bm-actions');
  if(bmActionsEl){
    bmActionsEl.style.display=(t.stage==='review'&&(isBM(CU)||isSAM(CU)))?'block':'none';
  }
  // Reset the "Request changes" inline box every time the modal opens
  const changesBox=document.getElementById('td-bm-changes-box');
  if(changesBox)changesBox.style.display='none';
  // Show completion note if present
  const noteEl=document.getElementById('td-completion-note');
  if(noteEl){
    let html='';
    if(t.timeLogged&&(t.timeLogged.hours||t.timeLogged.minutes)){
      const tl=t.timeLogged;
      html+=`<div style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:var(--acbg);border:.5px solid var(--acb);border-radius:9px;margin-bottom:8px">
        <span style="font-size:12px">⏱</span>
        <span style="font-size:12px;font-weight:600;color:var(--accent2)">${tl.hours?tl.hours+'h ':''} ${tl.minutes?tl.minutes+'m':''}</span>
        <span style="font-size:10px;color:var(--text3)">by ${tl.loggedBy||'Specialist'}</span>
      </div>`;
    }
    if(t.completionNote)html+=`<div style="font-size:10px;font-weight:600;color:var(--teal);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">✅ Specialist note</div><div style="font-size:12px;color:var(--text2);line-height:1.5;margin-bottom:${(t.filePaths&&t.filePaths.length)?'10px':'0'}">${t.completionNote}</div>`;
    if(t.filePaths&&t.filePaths.length){
      html+=`<div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">📁 File paths / Links</div>`;
      html+=t.filePaths.map(fp=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg4);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:4px">
        <span style="font-size:14px">${fp.url.startsWith('http')?'🔗':'📂'}</span>
        <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500">${fp.label||'File'}</div>
          <div style="font-size:10px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fp.url}</div></div>
        ${fp.url.startsWith('http')?`<a href="${fp.url}" target="_blank" rel="noopener" style="font-size:10px;padding:2px 8px;background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);color:var(--accent2);text-decoration:none;flex-shrink:0">Open →</a>`:`<button onclick="navigator.clipboard.writeText('${fp.url}');toast('Path copied','var(--green)')" style="font-size:10px;padding:2px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy path</button>`}
      </div>`).join('');
    }
    noteEl.style.display=(t.completionNote||(t.filePaths&&t.filePaths.length))?'block':'none';
    if(html)noteEl.innerHTML=html;
  }
  renderTaskComments(t);
  // Mark comments as read for current user
  if(t.comments)t.comments.forEach(c=>{if(!c.readBy)c.readBy=[];if(!c.readBy.includes(CU.id))c.readBy.push(CU.id);});
  persist();
  // Specialist deliverables (files uploaded via My Work)
  const specFilesEl=document.getElementById('td-spec-files');
  if(specFilesEl){
    const sf=t.specFiles||[];
    specFilesEl.innerHTML=sf.length
      ?sf.map((f,i)=>{
        const icon=getFileIcon(f.name);
        const hasData=!!f.data;
        const cursor=hasData?'cursor:pointer':'';
        const click=hasData?`onclick="openAttachment('taskSpec',${t.id},${i})"`:'';
        const hint=hasData?'<span style="font-size:9px;color:var(--accent);margin-left:6px">› click to open</span>':'<span style="font-size:9px;color:var(--text3);margin-left:6px">(no preview)</span>';
        return`<div class="file-att" style="${cursor}" ${click}><div class="fa-icon">${icon}</div><div style="flex:1"><div class="fa-nm">${f.name}${hint}</div><div class="fa-meta">${f.size||''}</div></div></div>`;
      }).join('')
      :'<div style="font-size:11px;color:var(--text3);padding:4px 0">No deliverables uploaded yet</div>';
  }
  // Time tracker log
  const timeEl=document.getElementById('td-time-log');
  if(timeEl){
    const sessions=getMWTimeSessions('task-'+t.id);
    const runningStart=getMWRunning('task-'+t.id);
    const loggedMs=sessions.reduce((s,x)=>s+(x.end&&x.start?(x.end-x.start):0),0);
    const runningMs=runningStart?Date.now()-runningStart:0;
    const totalMs=loggedMs+runningMs;
    function fmtMs(ms){if(!ms||ms<0)return'0m';const h=Math.floor(ms/3600000);const m=Math.floor((ms%3600000)/60000);const s=Math.floor((ms%60000)/1000);return h?`${h}h ${m}m`:m?`${m}m ${s}s`:`${s}s`;}
    function fmtTs(ts){return new Date(ts).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});}
    timeEl.innerHTML=`<div style="font-size:13px;font-weight:600;color:${runningStart?'var(--blue)':'var(--text2)'};margin-bottom:8px">${runningStart?'⏱ Running — ':'🕐 Total: '}<b>${fmtMs(totalMs)}</b></div>`
      +(sessions.length
        ?`<div style="display:flex;flex-direction:column;gap:4px">${sessions.map((s,i)=>{
            const dur=s.end&&s.start?(s.end-s.start):0;
            return`<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text3);padding:3px 0;border-bottom:.5px solid var(--border)">
              <span>Session ${i+1} · ${fmtTs(s.start)}</span>
              <span style="color:${dur>0?'var(--text2)':'var(--red)'};font-weight:500">${dur>0?fmtMs(dur):'incomplete'}</span>
            </div>`;
          }).join('')}${runningStart?`<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--blue);padding:3px 0"><span>Current session · ${fmtTs(runningStart)}</span><span style="font-weight:500">⏱ ${fmtMs(runningMs)}</span></div>`:''}</div>`
        :(totalMs>0?'':`<div style="font-size:11px;color:var(--text3)">No time logged yet</div>`)
      );
  }
  openModal('task-detail');
}

// Sync linked content piece status when task stage changes
function syncPieceStatus(t){
  if(!t)return;
  const stageToStatus={todo:'inprod',inprogress:'inprod',review:'review',approved:'approved',completed:'approved',onhold:'inprod',remark:'inprod'};
  const newPieceStatus=stageToStatus[t.stage]||'inprod';
  // Find linked content piece
  let lp=null;
  BRANDS.forEach(br=>(br.campaigns||[]).forEach(c=>(c.contentPieces||[]).forEach(p=>{if(String(p.taskId)===String(t.id))lp=p;})));
  if(!lp&&t.contentPieceRef){const br2=BRANDS.find(x=>String(x.id)===String(t.contentPieceRef.bid));if(br2){lp=(br2.campaigns[t.contentPieceRef.ci]||{contentPieces:[]}).contentPieces[t.contentPieceRef.pi];}}
  if(lp&&lp.status!==newPieceStatus){lp.status=newPieceStatus;persist();}
}
function updateTaskStage(val){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  t.stage=val;
  syncPieceStatus(t);
  persist();
  buildTaskViews();buildDashboard();
  // Refresh the header meta badge in the open modal
  const s=STAGES[val];const b=BRANDS.find(x=>x.id===t.brandId);const pri=PRI_CFG[t.priority]||PRI_CFG.medium;
  const metaEl=document.getElementById('td-meta');
  if(metaEl)metaEl.innerHTML=`<span class="badge" style="background:${s.bg};color:${s.color};border:.5px solid ${s.border}">${s.label}</span><span class="badge ${pri.cls}">${pri.label}</span>${b?`<span class="badge bgr">${b.name}</span>`:''}${t.g7?`<span class="badge bgr">${t.g7}</span>`:''}`;
  toast(`Stage → ${s.label}`,'var(--accent)');
}
function updateTaskField(field,val){const t=TASKS.find(x=>x.id===CEditTaskId);if(t)t[field]=val;}
function setScore(id,score){const t=TASKS.find(x=>x.id===id);if(!t)return;t.score=score;document.getElementById('td-score-input').innerHTML=[1,2,3,4,5].map(i=>`<div class="score-star ${score>=i?'on':''}" onclick="setScore(${id},${i})">${i<=score?'★':'☆'}</div>`).join('')+`<span style="font-size:12px;color:var(--text2);margin-left:4px">${score}/5</span>`;buildTaskViews();}
function ownerApproveTask(tid){
  const t=TASKS.find(x=>x.id==tid);if(!t)return;
  t.stage='approved';
  t.specStage='completed';
  t.ownerApprovedBy=CU.name;
  t.ownerApprovedAt=new Date().toISOString();
  addNotification('approved',`"${t.title}" approved by ${CU.name}`,t.brandId,t.id,null);
  persist();buildApprovals();buildTaskViews();
  toast('✅ Task approved','var(--green)');
}

function ownerRejectTask(tid){
  const t=TASKS.find(x=>x.id==tid);if(!t)return;
  const comment=document.getElementById('sa-comment-task-'+tid)?.value?.trim();
  if(!comment){toast('⚠ Add a comment explaining what needs to change','var(--amber)');return;}
  t.stage='review';
  t.specStage='todo';
  t.ownerComment=comment;
  t.sentToOwner=false;
  addNotification('changes',`"${t.title}" needs changes: ${comment.substring(0,60)}`,t.brandId,t.id,null);
  persist();buildApprovals();buildTaskViews();
  toast('❌ Changes requested — specialist notified','var(--red)');
}

function openInlineReassign(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  const box=document.getElementById('td-inline-reassign-box');
  const sel=document.getElementById('td-inline-reassign-select');
  if(!box||!sel)return;
  // Populate with all active members except current assignee
  sel.innerHTML=MEMBERS.filter(m=>m.active&&m.id!==t.assigneeId)
    .map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');
  box.style.display='block';
  sel.focus();
}
function confirmInlineReassign(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  const newId=parseInt(document.getElementById('td-inline-reassign-select')?.value);
  const comment=document.getElementById('td-inline-reassign-comment')?.value?.trim();
  if(!newId){toast('⚠ Select a team member','var(--amber)');return;}
  const prevAssignee=MEMBERS.find(m=>m.id===t.assigneeId);
  const newAssignee=MEMBERS.find(m=>m.id===newId);
  t.assigneeId=newId;
  t.stage='todo';
  t.specStage='todo';
  if(!t.comments)t.comments=[];
  const msg=`👤 Reassigned from ${prevAssignee?prevAssignee.name:'Unassigned'} to ${newAssignee?newAssignee.name:'—'}${comment?' — '+comment:''}`;
  t.comments.push({id:Date.now(),authorId:CU?.id,authorName:CU?.name,text:msg,createdAt:new Date().toISOString(),readBy:[CU?.id]});
  addNotification('pending',`Task "${t.title}" assigned to you by ${CU?.name}`,t.brandId,t.id,null);
  persist();
  document.getElementById('td-inline-reassign-box').style.display='none';
  document.getElementById('td-inline-reassign-comment').value='';
  openTaskDetail(CEditTaskId);buildTaskViews();
  toast(`✓ Reassigned to ${newAssignee?newAssignee.name:'—'}`,'var(--green)');
}
function openDeadlineExtension(){
  const box=document.getElementById('td-deadline-ext-box');
  const t=TASKS.find(x=>x.id===CEditTaskId);
  if(box){
    box.style.display='block';
    const dateEl=document.getElementById('td-ext-date');
    if(dateEl&&t&&t.due)dateEl.value=t.due;
    document.getElementById('td-ext-reason')?.focus();
  }
}
function submitDeadlineExtension(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  const newDate=document.getElementById('td-ext-date')?.value;
  const reason=document.getElementById('td-ext-reason')?.value?.trim();
  if(!newDate){toast('⚠ Select a proposed new date','var(--amber)');return;}
  if(!reason){toast('⚠ Add a reason for the extension','var(--amber)');return;}
  if(!t.deadlineRequests)t.deadlineRequests=[];
  t.deadlineRequests.push({requestedBy:CU?.id,name:CU?.name,proposedDate:newDate,reason,requestedAt:new Date().toISOString(),status:'pending'});
  addNotification('deadline-ext',`📅 "${t.title}" — ${CU?.name} requests extension to ${newDate}: "${reason.substring(0,60)}"`,t.brandId,t.id,null);
  persist();
  document.getElementById('td-deadline-ext-box').style.display='none';
  document.getElementById('td-ext-reason').value='';
  toast('✓ Extension request sent to SAM','var(--green)');
  // Refresh to show pending request
  openTaskDetail(CEditTaskId);
}
function approveDeadlineExtension(taskId,reqIdx){
  const t=TASKS.find(x=>x.id==taskId);if(!t||!t.deadlineRequests)return;
  const req=t.deadlineRequests[reqIdx];if(!req)return;
  req.status='approved';req.approvedBy=CU?.name;req.approvedAt=new Date().toISOString();
  t.due=req.proposedDate; // update actual due date
  persist();openTaskDetail(taskId);buildTaskViews();
  toast(`✓ Extension approved — new deadline: ${req.proposedDate}`,'var(--green)');
}
function rejectDeadlineExtension(taskId,reqIdx){
  const t=TASKS.find(x=>x.id==taskId);if(!t||!t.deadlineRequests)return;
  t.deadlineRequests[reqIdx].status='rejected';t.deadlineRequests[reqIdx].rejectedBy=CU?.name;
  persist();openTaskDetail(taskId);
  toast('Extension request declined','var(--amber)');
}
function bmApproveTaskDirect(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  t.stage='approved';t.specStage='completed';
  t.bmApprovedBy=CU.name;t.bmApprovedAt=new Date().toISOString();
  syncPieceStatus(t);
  addNotification('approved',`"${t.title}" approved by ${CU.name}`,t.brandId,t.id,null);
  persist();buildTaskViews();buildDashboard();
  closeModal();toast('✅ Task approved','var(--green)');
}

// SAM reassigns a task to a different member (self → specialist or specialist → self)
function openReassignTask(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  const box=document.getElementById('td-reassign-box');
  const sel=document.getElementById('td-reassign-select');
  if(!box||!sel)return;
  // Build options: SAMs + specialists, exclude current assignee
  const opts=MEMBERS.filter(m=>m.active&&canBeAssigned(m)&&m.id!==t.assigneeId);
  sel.innerHTML=opts.map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');
  if(!opts.length){toast('No other members to reassign to','var(--amber)');return;}
  box.style.display='block';
}

function confirmReassignTask(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  const sel=document.getElementById('td-reassign-select');
  const newId=sel?parseInt(sel.value):null;
  if(!newId){toast('⚠ Select a member','var(--amber)');return;}
  const prev=MEMBERS.find(m=>m.id===t.assigneeId);
  const next=MEMBERS.find(m=>m.id===newId);
  if(!next)return;
  t.assigneeId=newId;
  t.stage='todo';
  t.specStage='todo';
  // Leave a comment trail
  if(!t.comments)t.comments=[];
  t.comments.push({
    id:Date.now(),authorId:CU.id,authorName:CU.name,
    text:`🔀 Reassigned from ${prev?prev.name:'unknown'} to ${next.name}`,
    createdAt:new Date().toISOString(),readBy:[CU.id]
  });
  addNotification('pending',`"${t.title}" reassigned to you by ${CU.name}`,t.brandId,t.id,null);
  persist();buildTaskViews();buildDashboard();
  // Refresh My Work nav visibility
  const samHasTasks2=canManage(CU)&&TASKS.some(x=>x.assigneeId===CU.id&&x.stage!=='completed');
  const samHasPieces2=canManage(CU)&&BRANDS.some(b=>(b.campaigns||[]).some(c=>(c.contentPieces||[]).some(p=>p.assigneeId==CU.id&&!['approved','scheduled','published'].includes(p.status))));
  document.querySelectorAll('.nb-mywork-nav').forEach(el=>el.style.display=(isSpec(CU)||samHasTasks2||samHasPieces2)?'flex':'none');
  closeModal();
  toast(`👤 Reassigned to ${next.name}`,'var(--accent)');
}

function bmSendTaskToOwner(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  t.stage='review';
  t.sentToOwner=true;
  t.sentToOwnerAt=new Date().toISOString();
  t.sentToOwnerBy=CU.name;
  // Notify via notification system
  addNotification('pending',`"${t.title}" sent for owner approval by ${CU.name}`,t.brandId,t.id,null);
  persist();buildTaskViews();
  closeModal();
  toast('📤 Sent to owner for approval','var(--amber)');
}

// BM Request changes — opens the inline text box
function bmRequestChanges(){
  const box=document.getElementById('td-bm-changes-box');
  if(!box)return;
  box.style.display='block';
  const inp=document.getElementById('td-bm-changes-input');
  if(inp){inp.value='';inp.focus();}
}

// BM Request changes — confirm and send back to specialist
function bmRequestChangesConfirm(){
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  const inp=document.getElementById('td-bm-changes-input');
  const reason=inp?inp.value.trim():'';
  if(!reason){toast('⚠ Please describe what needs to change','var(--amber)');return;}
  // Send back to specialist's In Progress
  t.stage='inprogress';
  t.specStage='inprogress';
  t.sentToOwner=false;
  t.bmChangesRequested=reason;
  t.bmChangesRequestedBy=CU.name;
  t.bmChangesRequestedAt=new Date().toISOString();
  // Also drop it into the comment thread so the specialist sees it in context
  if(!t.comments)t.comments=[];
  t.comments.push({
    id:Date.now(),
    authorId:CU.id,
    authorName:CU.name,
    text:'🔄 Changes requested: '+reason,
    createdAt:new Date().toISOString(),
    readBy:[CU.id]
  });
  addNotification('changes',`"${t.title}" — changes requested: ${reason.substring(0,60)}`,t.brandId,t.id,null);
  persist();buildTaskViews();buildDashboard();buildMyWork&&buildMyWork();
  closeModal();
  toast('🔄 Sent back to specialist with feedback','var(--red)');
}

function renderTaskComments(t){
  const el=document.getElementById('td-comments');if(!el)return;
  const comments=t.comments||[];
  if(!comments.length){el.innerHTML='<div style="font-size:11px;color:var(--text3);text-align:center;padding:8px">No messages yet — start the conversation</div>';return;}
  el.innerHTML=comments.map(c=>{
    const isMe=c.authorId===CU.id;
    const unread=!c.readBy||!c.readBy.includes(CU.id);
    return`<div style="display:flex;flex-direction:column;align-items:${isMe?'flex-end':'flex-start'};gap:2px">
      <div style="font-size:10px;color:var(--text3);padding:0 4px">${isMe?'You':c.author} · ${new Date(c.at).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
      <div style="max-width:85%;padding:8px 10px;border-radius:${isMe?'10px 10px 3px 10px':'10px 10px 10px 3px'};background:${isMe?'var(--accent)':'var(--bg3)'};color:${isMe?'#fff':'var(--text)'};font-size:12px;line-height:1.4;border:.5px solid ${isMe?'transparent':'var(--border)'};${unread&&!isMe?'border-color:var(--accent2)':''}">${c.text}</div>
    </div>`;
  }).join('');
  // Scroll to bottom
  el.scrollTop=el.scrollHeight;
}

function addTaskComment(){
  const input=document.getElementById('td-comment-input');
  const text=input?.value?.trim();
  if(!text){toast('⚠ Type a message first','var(--amber)');return;}
  const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
  if(!t.comments)t.comments=[];
  const comment={
    id:Date.now(),
    text,
    author:CU.name,
    authorId:CU.id,
    role:CU.role,
    at:new Date().toISOString(),
    readBy:[CU.id]
  };
  t.comments.push(comment);
  // Notify the other party
  const assignee=MEMBERS.find(m=>m.id===t.assigneeId);
  const notifTarget=isSpec(CU)?'BM/SAM':assignee?assignee.name:'specialist';
  addNotification('comment',`💬 ${CU.name} commented on "${t.title}": ${text.substring(0,50)}`,t.brandId,null,null);
  persist();
  renderTaskComments(t);
  input.value='';
  // Update unread badge
  updateTaskCommentBadges();
  toast('✓ Message sent','var(--teal)');
}

function updateTaskCommentBadges(){
  // Update task list unread indicators
  if(!CU)return;
  const unreadTasks=TASKS.filter(t=>(t.comments||[]).some(c=>c.authorId!==CU.id&&(!c.readBy||!c.readBy.includes(CU.id))));
  const badge=document.getElementById('nb-tasks');
  if(badge)badge.textContent=unreadTasks.length||TASKS.filter(t=>CU&&t.assigneeId===CU.id&&t.stage!=='completed').length||'';
}

function saveTaskDetail(){buildTaskViews();buildDashboard();persist();closeModal();toast('✓ Task saved','var(--green)');}
function deleteCurrentTask(){TASKS=TASKS.filter(t=>t.id!==CEditTaskId);persist();closeModal();buildTaskViews();buildDashboard();toast('Task deleted','var(--red)');}

// Task files
function handleTaskFile(e){
  const files=Array.from(e.target.files);
  files.forEach(f=>{
    const t=TASKS.find(x=>x.id===CEditTaskId);if(!t)return;
    if(f.size>2*1024*1024){toast(`⚠ "${f.name}" too large (max 2MB)`,'var(--amber)');return;}
    const r=new FileReader();
    r.onload=function(){
      t.files=t.files||[];
      t.files.push({
        name:f.name,
        size:fmtSize(f.size),
        type:f.type||'application/octet-stream',
        date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'}),
        data:r.result
      });
      try{persist();}catch(err){toast('⚠ Storage full — remove old files','var(--red)');return;}
      renderTaskFiles(t);
      toast(`✓ "${f.name}" attached`,'var(--green)');
    };
    r.onerror=function(){toast(`⚠ Couldn't read "${f.name}"`,'var(--red)');};
    r.readAsDataURL(f);
  });
  e.target.value='';
}
function renderTaskFiles(t){
  const el=document.getElementById('td-files');if(!el)return;
  el.innerHTML=(t.files&&t.files.length)
    ?t.files.map((f,i)=>{
      const icon=getFileIcon(f.name);
      const hasData=!!f.data;
      const cursor=hasData?'cursor:pointer':'';
      const click=hasData?`onclick="openAttachment('task',${t.id},${i})"`:'';
      const hint=hasData?'<span style="font-size:9px;color:var(--accent);margin-left:6px">› click to open</span>':'<span style="font-size:9px;color:var(--text3);margin-left:6px">(no preview — legacy file)</span>';
      return`<div class="file-att" style="${cursor}" ${click}><div class="fa-icon">${icon}</div><div style="flex:1"><div class="fa-nm">${f.name}${hint}</div><div class="fa-meta">${f.size} · ${f.date||''}</div></div><button style="background:none;border:none;color:var(--red);cursor:pointer;margin-left:auto;font-size:12px" onclick="event.stopPropagation();removeTaskFile(${t.id},${i})">✕</button></div>`;
    }).join('')
    :'<div style="font-size:11px;color:var(--text3);padding:6px 0">No files attached yet</div>';
}

function getFileIcon(name){
  if(!name)return'📎';
  const n=name.toLowerCase();
  if(/\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(n))return'🖼';
  if(/\.pdf$/i.test(n))return'📕';
  if(/\.docx?$/i.test(n))return'📄';
  if(/\.(xlsx?|csv|tsv)$/i.test(n))return'📊';
  if(/\.(pptx?|key)$/i.test(n))return'📊';
  if(/\.(mp4|mov|avi|webm|mkv)$/i.test(n))return'🎬';
  if(/\.(mp3|wav|ogg|m4a)$/i.test(n))return'🎵';
  if(/\.(zip|rar|7z|tar|gz)$/i.test(n))return'🗜';
  if(/\.(txt|md|log)$/i.test(n))return'📝';
  return'📎';
}

// Open a file attached to a task or content piece's specFiles
// scope: 'task' | 'taskSpec'   a: taskId   b: file index
function openAttachment(scope,a,b){
  let f=null;
  if(scope==='task'){
    const t=TASKS.find(x=>x.id===a);if(!t||!t.files||!t.files[b])return;
    f=t.files[b];
  } else if(scope==='taskSpec'){
    const t=TASKS.find(x=>x.id===a);if(!t||!t.specFiles||!t.specFiles[b])return;
    f=t.specFiles[b];
  }
  previewFile(f);
}

// Open a content piece specialist-deliverable file
// ownerMode=true → index into ownerSpecFiles (what was sent to owner), false → specFiles (all uploads)
function openCPAttachment(bid,ci,pi,idx,ownerMode){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=(b.campaigns||[])[ci];if(!camp)return;
  const p=(camp.contentPieces||[])[pi];if(!p)return;
  const arr=ownerMode&&p.ownerSpecFiles?p.ownerSpecFiles:(p.specFiles||[]);
  const f=arr[idx];if(!f)return;
  previewFile(f);
}

// Preview or download a file object {name, type, data}
function previewFile(f){
  if(!f){toast('⚠ File not found','var(--red)');return;}
  if(!f.data){toast('⚠ No preview data for this file (uploaded before file-preview support)','var(--amber)');return;}
  const isImage=/^image/i.test(f.type||'')||/\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(f.name);
  const isPdf=/^application\/pdf/i.test(f.type||'')||/\.pdf$/i.test(f.name);
  const isText=/^text/i.test(f.type||'')||/\.(txt|md)$/i.test(f.name);
  if(isImage||isPdf||isText){
    const w=window.open();
    if(!w){toast('⚠ Pop-up blocked — downloading instead','var(--amber)');downloadDataUrl(f.data,f.name);return;}
    if(isImage){
      w.document.write(`<html><head><title>${f.name}</title><style>body{margin:0;background:#1a1a2e;display:flex;align-items:center;justify-content:center;min-height:100vh}img{max-width:95vw;max-height:95vh;box-shadow:0 4px 20px rgba(0,0,0,.4);border-radius:4px}</style></head><body><img src="${f.data}" alt="${f.name}"/></body></html>`);
    } else {
      w.location.href=f.data;
    }
  } else {
    downloadDataUrl(f.data,f.name);
  }
}

function downloadDataUrl(dataUrl,filename){
  const a=document.createElement('a');
  a.href=dataUrl;
  a.download=filename||'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function removeTaskFile(tid,idx){const t=TASKS.find(x=>x.id===tid);if(t){t.files.splice(idx,1);renderTaskFiles(t);toast('File removed','var(--red)');}}

// ══════════════════════════════════════════
// BRANDS
// ══════════════════════════════════════════
function getBrandList(){
  let base;
  if(CBrandFilter==='archived'){base=BRANDS.filter(b=>b.archived);}
  else{base=BRANDS.filter(b=>!b.archived&&(CBrandFilter==='all'||b.type===CBrandFilter));}
  if(isSAM(CU))return base;
  if(!CU||!CU.brands)return [];
  return base.filter(b=>CU.brands.includes(b.id));
}
function buildBrandsGrid(list){
  const brands=list||getBrandList();const isAdmin=isSAM(CU);const isBMUser=isBM(CU);
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('brands-grid').innerHTML=brands.length?brands.map(b=>{
    const openTasks=TASKS.filter(t=>t.brandId===b.id&&!['completed','approved'].includes(t.stage)).length;
    const delayedTasks=TASKS.filter(t=>t.brandId===b.id&&!['completed','approved'].includes(t.stage)&&t.due&&t.due<today).length;
    const activeCamps=(b.campaigns||[]).filter(c=>c.status==='active').length;
    // Team members assigned to this brand
    const brandTeam=MEMBERS.filter(m=>m.active&&m.brands&&m.brands.some(x=>x==b.id)).slice(0,5);
    const isSuperAdmin=CU&&CU.role==='super-admin';
    return`<div class="bcard ${b.archived?'arch':''}">
      <!-- Header -->
      <div class="bch" onclick="openBrand(${b.id})" style="cursor:pointer">
        <div class="blogo" style="background:${b.color}22;color:${b.color}">${b.name.substring(0,2).toUpperCase()}</div>
        <div style="flex:1;min-width:0">
          <div class="bcnm">${b.name}</div>
          <div class="bcin">${b.industry}</div>
        </div>
      </div>
      <!-- Stats -->
      <div class="bcst" onclick="openBrand(${b.id})" style="cursor:pointer;margin-top:12px">
        <div class="bcstat">
          <div class="bcsv" style="color:${b.color}">${activeCamps}</div>
          <div class="bcsl">Active campaigns</div>
        </div>
        <div class="bcstat">
          <div class="bcsv" style="color:${b.color}">${openTasks}</div>
          <div class="bcsl">Tasks</div>
        </div>
        <div class="bcstat">
          <div class="bcsv" style="color:${delayedTasks>0?'var(--red)':b.color}">${delayedTasks}</div>
          <div class="bcsl" style="color:${delayedTasks>0?'var(--red)':''}">Delayed</div>
        </div>
      </div>
      <!-- Team avatars -->
      ${brandTeam.length?`<div style="display:flex;align-items:center;gap:4px;margin-top:10px;padding-top:10px;border-top:.5px solid var(--border)">
        ${brandTeam.map(m=>`<div title="${m.name}" style="width:26px;height:26px;border-radius:50%;background:${m.bg||b.color+'22'};color:${m.color||b.color};font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:.5px solid ${m.color||b.color}44">${m.initials||m.name.substring(0,2).toUpperCase()}</div>`).join('')}
        ${MEMBERS.filter(m=>m.active&&m.brands&&m.brands.some(x=>x==b.id)).length>5?`<span style="font-size:10px;color:var(--text3)">+${MEMBERS.filter(m=>m.active&&m.brands&&m.brands.some(x=>x==b.id)).length-5}</span>`:''}
        <div style="flex:1"></div>
        <button class="btn btn-sm" onclick="event.stopPropagation();openBrandMonthly(${b.id})" style="font-size:10px;padding:3px 8px">📅 Monthly Plan</button>
      </div>`:`<div style="margin-top:10px;padding-top:10px;border-top:.5px solid var(--border);display:flex;justify-content:flex-end">
        <button class="btn btn-sm" onclick="event.stopPropagation();openBrandMonthly(${b.id})" style="font-size:10px;padding:3px 8px">📅 Monthly Plan</button>
      </div>`}
      <!-- Actions — Edit for SAM, full controls for super-admin only -->
      <div class="bca" style="margin-top:8px">
        ${isAdmin?`<div class="bcab" onclick="openEditBrand(${b.id})">✏ Edit</div>`:''}
        ${isSuperAdmin?`<div class="bcab" onclick="openTransfer(${b.id})">↗ Transfer</div>`:''}
        ${isSuperAdmin?`<div class="bcab" onclick="openArchive(${b.id})">${b.archived?'↩ Restore':'📦 Archive'}</div>`:''}
        ${isSuperAdmin?`<div class="bcab d" onclick="openDeleteBrand(${b.id})">🗑 Delete</div>`:''}
      </div>
    </div>`;
  }).join(''):'<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text3);font-size:13px">No brands found</div>';
}
function filterBrands(t,el){document.querySelectorAll('.ftab').forEach(x=>x.classList.remove('active'));if(el)el.classList.add('active');CBrandFilter=t;buildBrandsGrid();}
function searchBrands(v){buildBrandsGrid(getBrandList().filter(b=>b.name.toLowerCase().includes(v.toLowerCase())||b.industry.toLowerCase().includes(v.toLowerCase())));}
function openAddBrandModal(){
  const sams=MEMBERS.filter(m=>m.active&&canManage(m));
  const allOpts='<option value="">Optional</option>'+MEMBERS.filter(m=>m.active&&canBeAssigned(m)).map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');
  const ownerOpts=MEMBERS.filter(m=>m.active).map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');
  document.getElementById('nb-primary-sam').innerHTML='<option value="">Select SAM</option>'+sams.map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');
  document.getElementById('nb-secondary-sam').innerHTML=allOpts;
  document.getElementById('nb-seo-owner').innerHTML=allOpts;
  document.getElementById('nb-creative-owner').innerHTML=allOpts;
  document.getElementById('nb-video-owner').innerHTML=allOpts;
  document.getElementById('nb-biz-manager').innerHTML=allOpts;
  document.getElementById('nb-owner-member').innerHTML=ownerOpts;
  document.getElementById('nb-co-owner-member').innerHTML=ownerOpts;
  document.getElementById('nb-brand-owner-type').value='none';
  document.getElementById('nb-co-owner-type').value='none';
  document.getElementById('nb-owner-member-wrap').style.display='none';
  document.getElementById('nb-co-owner-member-wrap').style.display='none';
  document.getElementById('nb-owner-new-wrap').style.display='none';
  ['nb-name','nb-industry','nb-client-name','nb-client-email','nb-client-user','nb-client-pass'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  CNewMemberBrands=[];
  openModal('add-brand');
}

function toggleOwnerFields(){
  const t=document.getElementById('nb-brand-owner-type').value;
  document.getElementById('nb-owner-member-wrap').style.display=t==='existing'?'block':'none';
  document.getElementById('nb-owner-new-wrap').style.display=t==='new'?'block':'none';
  if(t==='new'){
    const existingUser=document.getElementById('nb-client-user').value;
    if(!existingUser){
      const base=(document.getElementById('nb-name').value||'client').toLowerCase().replace(/[^a-z0-9]/g,'').substring(0,8)||'client';
      const user=base+(Math.floor(Math.random()*900)+100);
      const pass='pass'+(Math.floor(Math.random()*9000)+1000);
      document.getElementById('nb-client-user').value=user;
      document.getElementById('nb-client-pass').value=pass;
    }
  }
}

// Co-owner toggle
function toggleCoOwnerFields(){
  const t=document.getElementById('nb-co-owner-type').value;
  document.getElementById('nb-co-owner-member-wrap').style.display=t==='existing'?'block':'none';
}

function saveBrand(){
  const n=document.getElementById('nb-name').value.trim();
  const ind=document.getElementById('nb-industry').value.trim();
  if(!n||!ind){toast('⚠ Name and industry required','var(--amber)');return;}
  const primarySamVal=document.getElementById('nb-primary-sam').value;
  if(!primarySamVal){toast('⚠ Primary SAM is required','var(--amber)');return;}
  const primarySamId=parseInt(primarySamVal);
  const ownerType=document.getElementById('nb-brand-owner-type').value;

  // Validate new client credentials if creating
  let cname='',cemail='',cuser='',cpass='';
  if(ownerType==='new'){
    cname=document.getElementById('nb-client-name').value.trim();
    cemail=document.getElementById('nb-client-email').value.trim();
    cuser=document.getElementById('nb-client-user').value.trim().toLowerCase();
    cpass=document.getElementById('nb-client-pass').value.trim();
    if(!cname||!cemail){toast('⚠ Client name and email required','var(--amber)');return;}
    if(!cuser||!cpass){toast('⚠ Username and password required','var(--amber)');return;}
  }

  // Read all optional team fields
  const getOptId=id=>{const v=document.getElementById(id)?.value;return v?parseInt(v):null;};
  const secondarySamId=getOptId('nb-secondary-sam');
  const seoOwnerId=getOptId('nb-seo-owner');
  const creativeOwnerId=getOptId('nb-creative-owner');
  const videoOwnerId=getOptId('nb-video-owner');
  const bizManagerId=getOptId('nb-biz-manager');

  // Co-owner
  const coOwnerType=document.getElementById('nb-co-owner-type').value;
  const coOwnerId=coOwnerType==='existing'?getOptId('nb-co-owner-member'):null;

  // Generate a colour from the brand name
  const colors=['#7c6af7','#4eca8b','#5baef7','#f5a623','#f55c5c','#2dd4bf','#a78bfa','#f472b6'];
  const color=colors[BRANDS.length%colors.length];

  const newBrandId=Date.now();
  const nb={
    id:newBrandId,name:n,industry:ind,type:'client',color,desc:'',
    g7:[{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]},{done:false,status:'notstarted',startDate:'',endDate:'',assigneeId:null,notes:'',taskIds:[]}],
    g7Plan:{month:'',status:'draft',submittedAt:'',approvedAt:'',planComments:[],activities:Array(7).fill(null).map(()=>({active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted'}))},
    campaigns:[],assets:[],
    pim:{P:{facts:'',sources:'',insights:''},I:{story:'',tone:'',keywords:''},M:{testimonials:'',results:'',proof:''}},
    pimStatus:'draft',archived:false,
    // Team roles
    bmId:primarySamId,ownerId:primarySamId,
    primarySamId,secondarySamId,seoOwnerId,creativeOwnerId,videoOwnerId,bizManagerId,
    coOwnerId,
    clientName:'',clientEmail:'',clientMemberId:null,
    pimFeedback:[],campFeedback:{}
  };
  BRANDS.push(nb);

  // Grant brand access to all assigned team members
  [primarySamId,secondarySamId,seoOwnerId,creativeOwnerId,videoOwnerId,bizManagerId].filter(Boolean).forEach(mid=>{
    const m=MEMBERS.find(x=>x.id===mid);if(m&&!m.brands.includes(newBrandId))m.brands.push(newBrandId);
  });

  // ── Handle client access ──
  let clientMemberId=null;
  if(ownerType==='existing'){
    clientMemberId=parseInt(document.getElementById('nb-owner-member').value);
    const sm=MEMBERS.find(m=>m.id===clientMemberId);
    if(sm){
      nb.clientName=sm.name;
      if(!sm.brands.includes(newBrandId))sm.brands.push(newBrandId);
      // Ensure role is an owner role
      if(!['owner','coowner','client','brand-owner'].includes(sm.role))sm.role='owner';
    }
  }else if(ownerType==='new'){
    const ini=cname.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
    const newMemberId=newBrandId+1;
    MEMBERS.push({
      id:newMemberId,name:cname,initials:ini,
      role:'brand-owner',title:'Brand Owner',
      color:'#2dd4bf',bg:'#2dd4bf22',
      username:cuser,password:cpass,
      active:true,brands:[newBrandId]
    });
    clientMemberId=newMemberId;
    nb.clientName=cname;nb.clientEmail=cemail;nb.clientMemberId=newMemberId;
    buildTeamList();buildDemoList();
  }
  if(clientMemberId){nb.clientMemberId=clientMemberId;}
  // Grant co-owner access
  if(coOwnerId){const cm=MEMBERS.find(m=>m.id===coOwnerId);if(cm&&!cm.brands.includes(newBrandId))cm.brands.push(newBrandId);}

  persist();closeModal();buildBrandsGrid();buildDashboard();
  ['nb-name','nb-industry'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  if(ownerType==='new'){showCredentials(cuser,cpass,cname);}
  else{toast(`✓ Brand "${n}" created`,'var(--green)');}
}
function openEditBrand(id){
  CEditBid=parseInt(id)||id;
  const b=BRANDS.find(x=>x.id==CEditBid);
  if(!b)return;
  document.getElementById('edit-brand-sub').textContent=`Editing: ${b.name}`;
  document.getElementById('eb-name').value=b.name;
  document.getElementById('eb-industry').value=b.industry;

  const sams=MEMBERS.filter(m=>m.active&&canManage(m));
  const allOpts='<option value="">Optional</option>'+MEMBERS.filter(m=>m.active&&canBeAssigned(m)).map(m=>`<option value="${m.id}" >${m.name} (${roleLabel(m.role)})</option>`).join('');
  const mkSamOpts=(selId)=>sams.map(m=>`<option value="${m.id}" ${m.id===selId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  const mkAllOpts=(selId)=>'<option value="">Optional</option>'+MEMBERS.filter(m=>m.active&&canBeAssigned(m)).map(m=>`<option value="${m.id}" ${m.id===selId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  const mkOwnerOpts=(selId)=>'<option value="">None</option>'+MEMBERS.filter(m=>m.active).map(m=>`<option value="${m.id}" ${m.id===selId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');

  // SAM dropdowns
  document.getElementById('eb-bm').innerHTML=mkSamOpts(b.primarySamId||b.bmId||b.ownerId);
  document.getElementById('eb-secondary-sam').innerHTML=mkAllOpts(b.secondarySamId);
  document.getElementById('eb-seo-owner').innerHTML=mkAllOpts(b.seoOwnerId);
  document.getElementById('eb-creative-owner').innerHTML=mkAllOpts(b.creativeOwnerId);
  document.getElementById('eb-video-owner').innerHTML=mkAllOpts(b.videoOwnerId);
  document.getElementById('eb-biz-manager').innerHTML=mkAllOpts(b.bizManagerId);

  // Ownership dropdowns — Brand Owner and Co-Owner
  document.getElementById('eb-co-owner').innerHTML=mkOwnerOpts(b.clientMemberId||b.ownerId);
  document.getElementById('eb-co-owner2').innerHTML=mkOwnerOpts(b.coOwnerId);

  // Client login section
  const clientEl=document.getElementById('eb-current-client');
  if(b.clientMemberId){
    const cm=MEMBERS.find(m=>m.id===b.clientMemberId);
    if(cm){clientEl.innerHTML=`<div style="display:flex;align-items:center;gap:9px;background:var(--bg4);border:.5px solid var(--border);border-radius:var(--rsm);padding:9px 12px"><div style="width:28px;height:28px;border-radius:50%;background:${cm.bg};color:${cm.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">${cm.initials}</div><div style="flex:1"><div style="font-size:12px;font-weight:500">${cm.name}</div><div style="font-size:10px;color:var(--text3)">${cm.username} · ${roleLabel(cm.role)}</div></div><span class="badge bg">Active access</span></div>`;}
  }else if(b.clientName){
    clientEl.innerHTML=`<div style="background:var(--bg4);border:.5px solid var(--border);border-radius:var(--rsm);padding:9px 12px;font-size:12px"><span style="font-weight:500">${b.clientName}</span> <span style="color:var(--text3)">${b.clientEmail}</span> <span class="badge bgr" style="margin-left:6px">External</span></div>`;
  }else{
    const ownerMember=MEMBERS.find(m=>isBrandOwner(m)&&m.brands&&m.brands.some(x=>x==b.id));
    if(ownerMember){
      clientEl.innerHTML=`<div style="display:flex;align-items:center;gap:9px;background:var(--bg4);border:.5px solid var(--border);border-radius:var(--rsm);padding:9px 12px"><div style="width:28px;height:28px;border-radius:50%;background:${ownerMember.bg};color:${ownerMember.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">${ownerMember.initials}</div><div style="flex:1"><div style="font-size:12px;font-weight:500">${ownerMember.name}</div><div style="font-size:10px;color:var(--text3)">${ownerMember.username} · ${roleLabel(ownerMember.role)}</div></div><span class="badge bg">Active access</span></div>`;
      b.clientMemberId=ownerMember.id;b.clientName=ownerMember.name;
    }else{clientEl.innerHTML=`<div style="font-size:12px;color:var(--text3);padding:6px 0">No client login assigned yet</div>`;}
  }
  document.getElementById('eb-owner-member').innerHTML=MEMBERS.filter(m=>m.active).map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');
  document.getElementById('eb-owner-action').value='keep';
  document.getElementById('eb-owner-member-wrap').style.display='none';
  document.getElementById('eb-owner-new-wrap').style.display='none';
  openModal('edit-brand');
}

function toggleEditOwnerFields(){
  const t=document.getElementById('eb-owner-action').value;
  document.getElementById('eb-owner-member-wrap').style.display=t==='existing'?'':'none';
  document.getElementById('eb-owner-new-wrap').style.display=t==='new'?'':'none';
  if(t==='new'){
    // Only generate if not already filled
    const existingUser=document.getElementById('eb-client-user').value;
    if(!existingUser){
      const base=(document.getElementById('eb-name').value||'client').toLowerCase().replace(/[^a-z0-9]/g,'').substring(0,8)||'client';
      const user=base+(Math.floor(Math.random()*900)+100);
      const pass='pass'+(Math.floor(Math.random()*9000)+1000);
      document.getElementById('eb-client-user').value=user;
      document.getElementById('eb-client-pass').value=pass;
    }
  }
}

function updateBrand(){
  const b=BRANDS.find(x=>x.id==CEditBid);
  if(!b){toast('⚠ Brand not found','var(--red)');closeModal();return;}
  b.name=document.getElementById('eb-name').value.trim()||b.name;
  b.industry=document.getElementById('eb-industry').value.trim()||b.industry;
  b.type=document.getElementById('eb-type').value;
  b.color=document.getElementById('eb-color').value;
  b.desc=document.getElementById('eb-desc').value;
  // Update SAM (Primary)
  const ebBmVal=document.getElementById('eb-bm').value;
  const newBmId=ebBmVal?parseInt(ebBmVal):null;
  if(newBmId&&newBmId!==b.bmId){
    if(b.bmId){const oldBm=MEMBERS.find(m=>m.id===b.bmId);if(oldBm){oldBm.brands=oldBm.brands.filter(x=>x!==b.id);}}
    b.bmId=newBmId;b.ownerId=newBmId;b.primarySamId=newBmId;
    const newBm=MEMBERS.find(m=>m.id===newBmId);if(newBm&&!newBm.brands.includes(b.id))newBm.brands.push(b.id);
  }
  // Save all optional team roles and grant brand access
  const getOptVal=elId=>{const v=document.getElementById(elId)?.value;return v?parseInt(v):null;};
  const saveRole=(field,elId)=>{
    const newId=getOptVal(elId);
    if(newId!==b[field]){
      if(b[field]){const old=MEMBERS.find(m=>m.id===b[field]);if(old)old.brands=old.brands.filter(x=>x!==b.id);}
      b[field]=newId||null;
      if(newId){const nm=MEMBERS.find(m=>m.id===newId);if(nm&&!nm.brands.includes(b.id))nm.brands.push(b.id);}
    }
  };
  saveRole('secondarySamId','eb-secondary-sam');
  saveRole('seoOwnerId','eb-seo-owner');
  saveRole('creativeOwnerId','eb-creative-owner');
  saveRole('videoOwnerId','eb-video-owner');
  saveRole('bizManagerId','eb-biz-manager');
  // Brand Owner (primary client)
  const newOwnerId=getOptVal('eb-co-owner');
  if(newOwnerId&&newOwnerId!==b.clientMemberId){
    if(b.clientMemberId){const o=MEMBERS.find(m=>m.id===b.clientMemberId);if(o)o.brands=o.brands.filter(x=>x!==b.id);}
    b.clientMemberId=newOwnerId;
    const om=MEMBERS.find(m=>m.id===newOwnerId);if(om){b.clientName=om.name;if(!om.brands.includes(b.id))om.brands.push(b.id);}
  }
  // Co-owner
  const newCoId=getOptVal('eb-co-owner2');
  if(newCoId!==b.coOwnerId){
    if(b.coOwnerId){const old=MEMBERS.find(m=>m.id===b.coOwnerId);if(old)old.brands=old.brands.filter(x=>x!==b.id);}
    b.coOwnerId=newCoId||null;
    if(newCoId){const cm=MEMBERS.find(m=>m.id===newCoId);if(cm&&!cm.brands.includes(b.id))cm.brands.push(b.id);}
  }
  // Handle client access change
  const action=document.getElementById('eb-owner-action').value;
  if(action==='remove'){
    // Revoke access from old client
    if(b.clientMemberId){const cm=MEMBERS.find(m=>m.id===b.clientMemberId);if(cm)cm.brands=cm.brands.filter(x=>x!==b.id);}
    b.clientMemberId=null;b.clientName='';b.clientEmail='';
    toast('✓ Client access removed','var(--amber)');
  }else if(action==='existing'){
    const selId=parseInt(document.getElementById('eb-owner-member').value);
    // Revoke old client
    if(b.clientMemberId&&b.clientMemberId!==selId){const cm=MEMBERS.find(m=>m.id===b.clientMemberId);if(cm)cm.brands=cm.brands.filter(x=>x!==b.id);}
    b.clientMemberId=selId;
    const sm=MEMBERS.find(m=>m.id===selId);
    if(sm){b.clientName=sm.name;b.clientEmail='';if(!sm.brands.includes(b.id))sm.brands.push(b.id);}
    toast(`✓ "${sm?sm.name:'Member'}" now has client access to ${b.name}`,'var(--green)');
  }else if(action==='new'){
    const cname=document.getElementById('eb-client-name').value.trim();
    const cemail=document.getElementById('eb-client-email').value.trim();
    const cuser=document.getElementById('eb-client-user').value.trim().toLowerCase();
    const cpass=document.getElementById('eb-client-pass').value.trim();
    if(!cname||!cemail){toast('⚠ Client name and email required','var(--amber)');return;}
    if(!cuser){toast('⚠ Username required','var(--amber)');return;}
    if(!cpass){toast('⚠ Password required','var(--amber)');return;}
    // Revoke old client
    if(b.clientMemberId){const cm=MEMBERS.find(m=>m.id===b.clientMemberId);if(cm)cm.brands=cm.brands.filter(x=>x!==b.id);}
    const ini=cname.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
    const newId=Date.now()+1;
    MEMBERS.push({id:newId,name:cname,initials:ini,role:'brand-owner',title:'Brand Owner',color:'#2dd4bf',bg:'#2dd4bf22',username:cuser,password:cpass,active:true,brands:[b.id]});
    b.clientMemberId=newId;b.clientName=cname;b.clientEmail=cemail;
    persist();
    buildTeamList();buildDemoList();
    closeModal();buildBrandsGrid();buildDashboard();
    if(CBid==CEditBid)openBrand(CEditBid);
    showCredentials(cuser,cpass,cname);
    return;
  }
  persist();closeModal();buildBrandsGrid();buildDashboard();
  if(CBid==CEditBid)openBrand(CEditBid);
  if(action==='keep')toast(`✓ "${b.name}" updated`,'var(--green)');
}
function openDeleteBrand(id){CEditBid=id;const b=BRANDS.find(x=>x.id===id);document.getElementById('del-brand-sub').textContent=`Delete "${b.name}" permanently?`;openModal('delete-brand');}
function confirmDeleteBrand(){const b=BRANDS.find(x=>x.id==CEditBid);const nm=b.name;BRANDS=BRANDS.filter(x=>x.id!==CEditBid);if(CBid===CEditBid){CBid=null;showScreen('brands',null);}persist();closeModal();buildBrandsGrid();buildDashboard();toast(`🗑 "${nm}" deleted`,'var(--red)');}
function openArchive(id){CEditBid=id;const b=BRANDS.find(x=>x.id===id);document.getElementById('arch-title').textContent=b.archived?`Restore "${b.name}"?`:`Archive "${b.name}"?`;document.getElementById('arch-sub').textContent=b.archived?'Brand will be restored to active.':'Brand will be hidden but all data preserved.';openModal('archive-brand');}
function confirmArchive(){const b=BRANDS.find(x=>x.id==CEditBid);b.archived=!b.archived;persist();closeModal();buildBrandsGrid();buildDashboard();toast(b.archived?`📦 "${b.name}" archived`:`↩ "${b.name}" restored`,b.archived?'var(--amber)':'var(--green)');}
function openTransfer(id){CEditBid=id;const b=BRANDS.find(x=>x.id===id);document.getElementById('transfer-sub').textContent=`Transfer: ${b.name}`;document.getElementById('transfer-to').innerHTML=MEMBERS.filter(m=>m.active&&m.id!==b.ownerId).map(m=>`<option value="${m.id}">${m.name}</option>`).join('');openModal('transfer-brand');}
function confirmTransfer(){const b=BRANDS.find(x=>x.id==CEditBid);const nm=MEMBERS.find(m=>m.id===parseInt(document.getElementById('transfer-to').value));b.ownerId=nm.id;if(!nm.brands.includes(b.id))nm.brands.push(b.id);closeModal();buildBrandsGrid();toast(`↗ "${b.name}" → ${nm.name}`,'var(--green)');}

// ══════════════════════════════════════════
// WORKSPACE
// ══════════════════════════════════════════
// Opens brand workspace and immediately switches to Monthly Plan tab
function openBrandMonthly(bid){
  openBrand(bid);
  setTimeout(()=>{
    const tabs=document.querySelectorAll('.wstab');
    // Monthly Plan is typically the 3rd tab (index 2)
    let monthlyTab=null;
    tabs.forEach(t=>{if(t.textContent.trim().startsWith('Monthly'))monthlyTab=t;});
    if(monthlyTab)showWsPanel('monthly',monthlyTab);
  },150);
}
function openBrand(id){
  CBid=id;
  const b=BRANDS.find(x=>x.id===id);
  if(!b)return;
  const today=new Date().toISOString().split('T')[0];
  const openT=TASKS.filter(t=>t.brandId===id&&!['completed','approved'].includes(t.stage)).length;
  const delayed=TASKS.filter(t=>t.brandId===id&&!['completed','approved'].includes(t.stage)&&t.due&&t.due<today).length;
  const activeCamps=(b.campaigns||[]).filter(c=>c.status==='active').length;
  const primarySam=b.primarySamId?MEMBERS.find(m=>m.id===b.primarySamId):null;
  const knStatus=b.pimStatus==='client-approved'?'✓ Brand Knowledge approved':b.pimStatus==='approved'?'✓ Brand Knowledge approved':'Brand Knowledge: Draft';
  const knBadge=b.pimStatus==='approved'||b.pimStatus==='client-approved'?'bg':'ba';
  document.getElementById('ws-header').innerHTML=`
    <div class="wslogo" style="background:${b.color}22;color:${b.color}">${b.name.substring(0,2).toUpperCase()}</div>
    <div class="wsinf">
      <div class="wsnm">${b.name}</div>
    </div>
    <div style="display:flex;gap:8px">
      ${canManage(CU)?`<button class="tbtn" onclick="openEditBrand(${b.id})">✏ Edit</button>`:''}
      <button class="tbtn" onclick="goBack()">← Back</button>
    </div>`;
document.getElementById('topbar-bc').innerHTML=`<div class="bc"><span class="bcl" onclick="goBack()">Brands</span><span style="color:var(--text3)">/</span><span class="bcc">${b.name}</span></div>`;
document.getElementById('primary-btn').textContent='';
document.getElementById('primary-btn').style.display='none';
buildWsOverview(b);buildWsPIM(b);buildWsMonthly(b);buildWsContent(b);buildWsAssets(b);updatePubQueueBadge(b);
document.querySelectorAll('.wstab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.wstab')[0].classList.add('active');
document.querySelectorAll('.wsp').forEach(p=>p.classList.remove('active'));document.getElementById('ws-overview').classList.add('active');
showScreen('workspace',null);}
function goBack(){showScreen('brands',null);document.getElementById('topbar-bc').innerHTML='<div class="ptitle">Brands</div>';document.getElementById('primary-btn').textContent='+ Add brand';document.getElementById('primary-btn').style.display='';}
function showWsPanel(id,el){document.querySelectorAll('.wstab').forEach(t=>t.classList.remove('active'));if(el)el.classList.add('active');document.querySelectorAll('.wsp').forEach(p=>p.classList.remove('active'));document.getElementById('ws-'+id).classList.add('active');if(id==='pubqueue'){const b=BRANDS.find(x=>x.id===CBid);if(b)buildWsPubQueue(b);}if(id==='time'){const b=BRANDS.find(x=>x.id===CBid);if(b)buildWsTime(b);}}
function buildWsOverview(b){
  const today=new Date().toISOString().split('T')[0];
  const openT=TASKS.filter(t=>t.brandId===b.id&&!['completed','approved'].includes(t.stage)).length;
  const delayed=TASKS.filter(t=>t.brandId===b.id&&!['completed','approved'].includes(t.stage)&&t.due&&t.due<today).length;
  const activeCamps=(b.campaigns||[]).filter(c=>c.status==='active').length;
  // Owner remarks summary (across all sections except BK fields, which surface in PIM tab)
  const ownerRemarks=[];
  const br=b.brandRemarks||{};
  ['name','industry','color','logo','description','overall'].forEach(k=>{
    (Array.isArray(br[k])?br[k]:[]).forEach(r=>ownerRemarks.push({section:k,...r}));
  });
  ownerRemarks.sort((a,b2)=>(b2.at||'').localeCompare(a.at||''));
  const remarkLabel={name:'Brand name',industry:'Industry',color:'Brand color',logo:'Brand logo',description:'Description',overall:'Overall'};
  const ownerRemarksHtml=ownerRemarks.length?`
    <div class="card" style="margin-bottom:14px;border-color:var(--amborder)">
      <div class="ch" style="background:var(--ambg)"><div class="ct" style="color:var(--amber)">💬 ${ownerRemarks.length} owner remark${ownerRemarks.length===1?'':'s'} on this brand</div></div>
      <div class="cb" style="display:flex;flex-direction:column;gap:8px">
        ${ownerRemarks.map(r=>`<div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:9px 12px">
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--amber);font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">
            <span>${remarkLabel[r.section]||r.section}</span>
            <span style="color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">${escHtml(fmtRemarkDate(r.at))} · ${escHtml(r.author||'Owner')}</span>
          </div>
          <div style="font-size:12px;line-height:1.5;color:var(--text)">${escHtml(r.text)}</div>
        </div>`).join('')}
      </div>
    </div>`:'';
  const bkStatus=b.pimStatus==='client-approved'||b.pimStatus==='approved'?'Approved':'Draft';
  const bk=b.brandKnowledge||{};
  const bkFilled=['overview','guidelines','toneOfVoice','positioning'].filter(f=>bk[f]&&bk[f].trim()).length;
  const bkLabels=['Brand Overview','Guidelines & Principles','Tone of Voice','Positioning'];
  document.getElementById('ws-overview').innerHTML=`
    ${ownerRemarksHtml}
    <div class="g4" style="margin-bottom:14px">
      <div class="sc"><div class="sl">Active campaigns</div><div class="sv" style="color:${b.color}">${activeCamps}</div></div>
      <div class="sc"><div class="sl">Open tasks</div><div class="sv" style="color:${b.color}">${openT}</div></div>
      <div class="sc"><div class="sl">Delayed tasks</div><div class="sv" style="color:${delayed>0?'var(--red)':b.color}">${delayed}</div></div>
      <div class="sc"><div class="sl">Brand Knowledge</div><div class="sv" style="font-size:14px;color:${bkStatus==='Approved'?'var(--green)':'var(--amber)'}">${bkStatus}</div></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="ch"><div class="ct">📖 Brand Knowledge</div><div class="ca" onclick="showWsPanel('pim',document.querySelectorAll('.wstab')[1])">Edit →</div></div>
        <div class="cb">
          ${['overview','guidelines','toneOfVoice','positioning'].map((f,i)=>{
            const val=bk[f]||'';
            return`<div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:.5px solid var(--border)${i===3?';border:none':''}">
              <div style="width:16px;height:16px;border-radius:50%;background:${val?'var(--green)':'var(--bg4)'};display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;flex-shrink:0;margin-top:1px">${val?'✓':''}</div>
              <div style="flex:1;min-width:0"><div style="font-size:12px">${bkLabels[i]}</div>
              ${val?`<div style="font-size:10px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${val.substring(0,55)}${val.length>55?'…':''}</div>`:'<div style="font-size:10px;color:var(--text3);font-style:italic">Not filled</div>'}</div>
            </div>`;
          }).join('')}
          <div style="margin-top:8px"><div class="g7pb"><div class="g7pbf" style="width:${bkFilled*25}%"></div></div>
          <div style="font-size:10px;color:var(--text3);margin-top:3px">${bkFilled}/4 sections filled</div></div>
        </div>
      </div>
      <div class="card">
        <div class="ch"><div class="ct">Recent campaigns</div><div class="ca" onclick="showWsPanel('monthly',document.querySelectorAll('.wstab')[2])">All →</div></div>
        <div class="cb">${b.campaigns.length?b.campaigns.slice(-4).map(c=>`<div class="camp-item"><div style="width:8px;height:8px;border-radius:50%;background:${b.color};flex-shrink:0"></div><div style="flex:1"><div style="font-size:12px;font-weight:500">${c.name}</div><div style="font-size:10px;color:var(--text2)">${Array.isArray(c.M)?c.M.join(', '):(c.M||'')}</div></div><div class="badge ${c.status==='active'?'bg':c.status==='planning'?'ba':'bgr'}">${c.status}</div></div>`).join(''):'<div style="text-align:center;padding:16px;color:var(--text3);font-size:12px">No campaigns yet</div>'}</div>
      </div>
    </div>
  `;
}
function buildWsPIM(b){
  const bk=b.brandKnowledge||{};
  const feedbackHtml=(b.pimFeedback||[]).length
    ?'<div style="margin-top:14px;padding-top:12px;border-top:.5px solid var(--border)"><div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Feedback</div>'
      +b.pimFeedback.map(f=>'<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:9px 12px;margin-bottom:6px;font-size:12px"><span style="font-weight:500;color:var(--teal)">'+f.author+'</span><span style="color:var(--text3);margin:0 6px">·</span>'+f.text+'</div>').join('')+'</div>':'' ;

  const statusBadge=b.pimStatus==='client-approved'
    ?`<span class="badge bg">✓ Client approved</span>`
    :b.pimStatus==='approved'?`<span class="badge bg">✓ Approved</span>`
    :`<span class="badge ba">Draft</span>`;

  const canEdit=canManage(CU);
  const fieldRemarks = (b.brandRemarks||{});
  const mkField=(fieldKey,label,placeholder)=>{
    const sectionRemarks = Array.isArray(fieldRemarks[fieldKey]) ? fieldRemarks[fieldKey] : [];
    const remarksHtml = sectionRemarks.length ? `<div style="margin-top:10px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:8px 10px;display:flex;flex-direction:column;gap:6px">
      <div style="font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--amber)">💬 ${sectionRemarks.length} owner remark${sectionRemarks.length===1?'':'s'}</div>
      ${sectionRemarks.map(r=>`<div style="font-size:11px;line-height:1.45;color:var(--text)"><span style="font-weight:600;color:var(--amber)">${escHtml(r.author||'Owner')}</span><span style="color:var(--text3);margin:0 6px">·</span><span style="color:var(--text3)">${escHtml(fmtRemarkDate(r.at))}</span><div style="margin-top:3px">${escHtml(r.text)}</div></div>`).join('')}
    </div>` : '';
    return `<div style="background:var(--bg2);border:.5px solid var(--border2);border-radius:var(--r);padding:16px 18px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text2);margin-bottom:10px;display:flex;justify-content:space-between;align-items:center">
        <span>${label}</span>
        ${sectionRemarks.length?`<span class="badge ba" style="font-size:9px">💬 ${sectionRemarks.length}</span>`:''}
      </div>
      <textarea class="ftxt" id="bk-${fieldKey}"
        style="min-height:120px;resize:vertical;font-size:13px;color:var(--text);background:transparent;border-color:var(--border);border-radius:8px"
        placeholder="${placeholder}"
        ${canEdit?`oninput="updBrandKnowledge(${b.id},'${fieldKey}',this.value)"`:'readonly'}
      >${bk[fieldKey]||''}</textarea>
      ${remarksHtml}
    </div>`;
  };

  document.getElementById('ws-pim').innerHTML=`
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--abg);color:var(--accent2);display:flex;align-items:center;justify-content:center;font-size:18px">📖</div>
        <div>
          <div style="font-size:16px;font-weight:600">Brand Knowledge</div>
          <div style="font-size:12px;color:var(--text3)">Strategic context and brand guidelines for ${b.name}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        ${statusBadge}
        ${canEdit?`<button class="btn btn-p" onclick="saveBrandKnowledge(${b.id})">Save</button>`:''}
      </div>
    </div>

    <!-- 2×2 Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
      ${mkField('overview','Brand Overview','Provide a high-level summary of the brand — who they are, what they do, and their market position...')}
      ${mkField('guidelines','Brand Guidelines & Principles','Key brand guidelines, visual rules, do\'s and don\'ts, design system notes...')}
      ${mkField('toneOfVoice','Brand Tone of Voice','Describe the brand\'s tone — e.g. professional, conversational, bold, friendly. Include examples...')}
      ${mkField('positioning','Brand Positioning','Define the brand\'s market positioning, unique value proposition, target audience, and competitive differentiation...')}
    </div>

    <!-- Actions -->
    <div class="factions">
      ${isSAM(CU)?`<button class="btn" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="approvePIM(${b.id})">✓ Approve</button>`:''}
      ${isBrandOwner(CU)?`<button class="btn" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="clientApprovePIM(${b.id})">✓ Approve as client</button><button class="btn btn-s" onclick="openPIMFeedback(${b.id})">💬 Add feedback</button>`:''}
    </div>
    ${feedbackHtml}
  `;
}

function updBrandKnowledge(bid,field,val){
  const b=BRANDS.find(x=>x.id===bid);
  if(!b)return;
  if(!b.brandKnowledge)b.brandKnowledge={};
  b.brandKnowledge[field]=val;
}

function saveBrandKnowledge(bid){
  const b=BRANDS.find(x=>x.id===bid);
  if(!b)return;
  if(!b.brandKnowledge)b.brandKnowledge={};
  ['overview','guidelines','toneOfVoice','positioning'].forEach(f=>{
    const el=document.getElementById('bk-'+f);
    if(el)b.brandKnowledge[f]=el.value;
  });
  persist();
  toast('✓ Brand Knowledge saved','var(--green)');
}

function clientApprovePIM(bid){const b=BRANDS.find(x=>x.id===bid);b.pimStatus='client-approved';persist();buildWsPIM(b);buildWsOverview(b);buildBrandsGrid();toast('✓ Brand Knowledge approved','var(--green)');}
function openPIMFeedback(bid){const t=prompt('Enter your feedback on the PIM brief:');if(!t)return;const b=BRANDS.find(x=>x.id===bid);b.pimFeedback=b.pimFeedback||[];b.pimFeedback.push({author:CU.name,text:t,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'})});buildWsPIM(b);toast('✓ Feedback added','var(--teal)');}
function approvePIM(bid){const b=BRANDS.find(x=>x.id===bid);b.pimStatus='approved';persist();buildWsPIM(b);buildWsOverview(b);buildBrandsGrid();toast('✓ Brand Knowledge approved','var(--green)');}
function mkPIM(k,ico,t,s,b,c,fields){return`<div class="pims"><div class="pimh" onclick="togglePIM('${k}')"><div class="pimico" style="background:${c}22;color:${c}">${ico}</div><div><div class="pimt">${t}</div><div class="pims2">${s}</div></div><div class="pimar" id="pa-${k}">▸</div></div><div class="pimb" id="pb-${k}">${fields.map(f=>`<div class="form-row full" style="margin-bottom:10px"><div class="fg2"><label class="flbl">${f.lbl}</label><textarea class="ftxt" id="pim-${k}-${f.k}" placeholder="${f.ph}" oninput="updPIM(${b.id},'${k}','${f.k}',this.value)">${b.pim[k][f.k]||''}</textarea></div></div>`).join('')}</div></div>`;}
function togglePIM(k){const b=document.getElementById('pb-'+k),a=document.getElementById('pa-'+k);if(!b)return;const o=b.classList.toggle('open');if(a)a.textContent=o?'▾':'▸';}
function updPIM(bid,s,f,v){const b=BRANDS.find(x=>x.id===bid);if(b)b.pim[s][f]=v;}
function approvePIM(bid){const b=BRANDS.find(x=>x.id===bid);b.pimStatus='approved';persist();buildWsPIM(b);buildWsOverview(b);buildBrandsGrid();toast('✓ Brand Knowledge approved','var(--green)');}
function clientApproveCamp(bid,ci){const b=BRANDS.find(x=>x.id===bid);b.campaigns[ci].clientApproved=true;buildWsMonthly(b);toast('✓ Campaign approved as client','var(--green)');}
function addCampFeedback(bid,ci){const t=prompt('Your feedback on this campaign:');if(!t)return;const b=BRANDS.find(x=>x.id===bid);b.campFeedback=b.campFeedback||{};b.campFeedback[ci]=b.campFeedback[ci]||[];b.campFeedback[ci].push({author:CU.name,text:t});buildWsMonthly(b);toast('✓ Feedback added','var(--teal)');}
function showCD(l,bid,ci){const b=BRANDS.find(x=>x.id===bid),c=b.campaigns[ci],el=document.getElementById(`cd-${bid}-${ci}`);if(!el)return;if(el.dataset.open===l){el.innerHTML='';el.dataset.open='';return;}el.dataset.open=l;const lb={T:'Target audience',E:'Elevator pitch',M:'Medium',C:'Creative style',A:'Analysis & KPIs'};let val=c[l];if(Array.isArray(val))val=val.join(', ');el.innerHTML=`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px"><div style="font-size:11px;color:var(--text3);margin-bottom:6px">${lb[l]}</div><div style="font-size:13px;color:${val?'var(--text)':'var(--text3)'}">${val||'Not filled yet'}</div></div>`;}

// ══════════════════════════════════════════
// CAMPAIGN WIZARD (5-step)
// ══════════════════════════════════════════

const CAMPAIGN_LIBRARY=[
  'Brand Awareness','Brand Recall','Brand Positioning','Brand Launch',
  'Product Launch','New Feature Launch','Product Demo Campaign',
  'Lead Generation','Performance Marketing','Conversion Campaign',
  'Blog Content Series','Thought Leadership','SEO Content Push',
  'Social Media Growth','Community Building','Influencer Campaign',
  'Seasonal Campaign','Festive Campaign','Year-end Campaign',
  'Customer Retention','Customer Success Stories','Loyalty Campaign',
  'Event Promotion','Webinar Series','Conference Campaign',
  'Email Marketing','Newsletter Campaign','Drip Campaign',
  'Partnership Campaign','Collaboration Campaign','Co-brand Campaign',
  'PR & Media','Awards & Recognition','Crisis Communication',
  'Employee Advocacy','Internal Campaign','Employer Branding',
  'Sales Promotion','Discount Campaign','Flash Sale',
];

const WIZARD_STEPS=[
  {id:1,label:'Campaign Setup'},
  {id:2,label:'Campaign Details'},
  {id:3,label:'Creative & Plan'},
];

const PLATFORMS=['LinkedIn','Instagram','Facebook','Google Ads','YouTube','Twitter/X','WhatsApp','Email','SEO/Blog','PR/Media','Events','OOH/Print'];
const CREATIVES=['Video','Reel / Short','Static image','Carousel','Article / Blog','Infographic','Story','Podcast'];
const OBJECTIVES=['Brand Awareness','Lead Generation','Product Launch','Customer Retention','Community Building','Sales & Conversion','Thought Leadership','Event Promotion'];

let CWizard={open:false,step:1,bid:null,month:null,
  data:{name:'',nameMode:'library',budgetType:'organic',currency:'INR ₹',budget:'',campType:'monthly',
    campFocus:[],rows:[],outcome:'',startDate:'',T:'',E:'',objective:'Brand Awareness',M:[],C:[],status:'planning',notes:''}};

function openCampaignWizard(bid){
  if(CWizard.open){wizardClose();return;}
  const b=BRANDS.find(x=>x.id===bid||x.id==bid);
  if(!b)return;
  const mk=CG7Month||(new Date().toISOString().substring(0,7));
  CWizard={open:true,step:1,bid:b.id,month:mk,
    data:{name:'',nameMode:'library',budgetType:'organic',currency:'INR ₹',budget:'',campType:'monthly',
      campFocus:[],rows:[],outcome:'',startDate:'',T:'',E:'',objective:'Brand Awareness',M:[],C:[],status:'planning',notes:''}};
  const el=document.createElement('div');
  el.id='campaign-wizard';el.className='wiz-overlay';
  el.onclick=()=>wizardClose(); // click backdrop to close
  el.innerHTML=wizardHTML();
  document.body.appendChild(el);
  renderWizardStep();
  document.getElementById('wiz-lib-search')?.focus();
}

function wizardClose(){
  const el=document.getElementById('campaign-wizard');
  if(el)el.remove();
  CWizard.open=false;
}

function wizardHTML(){
  const b=BRANDS.find(x=>x.id==CWizard.bid);
  const mk=CWizard.month;
  const monthLabel=mk?new Date(mk+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'}):mk;
  return`<div class="wiz-container" onclick="event.stopPropagation()">
    <div class="wiz-head">
      <button class="wiz-back-btn" onclick="wizardClose()">←</button>
      <div>
        <div class="wiz-title">New Campaign</div>
        <div class="wiz-subtitle" id="wiz-subtitle">Step 1 of 3 — Campaign Setup</div>
      </div>
    </div>
    <div class="wiz-steps" id="wiz-steps"></div>
    <div class="wiz-body" id="wiz-body"></div>
    <div class="wiz-footer">
      <button class="btn btn-s" id="wiz-back-btn" onclick="wizardNav(-1)" style="min-width:80px">← Back</button>
      <div style="font-size:11px;color:var(--text3)" id="wiz-progress"></div>
      <button class="btn btn-p" id="wiz-next-btn" onclick="wizardNav(1)" style="min-width:120px">Next →</button>
    </div>
  </div>`;
}

function renderWizardStep(){
  const s=CWizard.step;
  const b=BRANDS.find(x=>x.id==CWizard.bid);
  const mk=CWizard.month;
  const totalSteps=WIZARD_STEPS.length;

  // Step bar
  const stepsEl=document.getElementById('wiz-steps');
  if(stepsEl) stepsEl.innerHTML=WIZARD_STEPS.map((ws,i)=>`
    ${i>0?`<div class="wiz-connector ${s>ws.id?'done':''}"></div>`:''}
    <div class="wiz-step">
      <div class="wiz-step-num ${s===ws.id?'active':s>ws.id?'done':'pending'}">${s>ws.id?'✓':ws.id}</div>
      <div class="wiz-step-lbl ${s===ws.id?'active':s>ws.id?'done':'pending'}">${ws.label}</div>
    </div>`).join('');

  const sub=document.getElementById('wiz-subtitle');
  if(sub)sub.textContent=`Step ${s} of ${totalSteps} — ${WIZARD_STEPS[s-1].label}`;

  const backBtn=document.getElementById('wiz-back-btn');
  const nextBtn=document.getElementById('wiz-next-btn');
  const prog=document.getElementById('wiz-progress');
  if(backBtn)backBtn.style.visibility=s===1?'hidden':'visible';
  if(nextBtn)nextBtn.textContent=s===3?(CWizard.editMode?'✅ Update campaign':'🚀 Launch campaign'):'Next →';
  if(prog)prog.textContent=`${s} / ${totalSteps}`;

  const body=document.getElementById('wiz-body');
  if(!body)return;

  if(s===1) body.innerHTML=wizardStep1(b,mk);
  else if(s===2) body.innerHTML=wizardStep2();
  else if(s===3) body.innerHTML=wizardStep3merged();

  if(s===1) bindStep1();
}

function wizardStep1(b,mk){
  const monthLabel=mk?new Date(mk+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'}):mk;
  return`
    <div class="wiz-section-title">Campaign Setup</div>
    <div class="wiz-section-sub" style="margin-bottom:14px">Define the what, when, and how of this campaign.</div>

    <!-- Row 1: Brand + Month + Name in one tight row -->
    <div style="display:grid;grid-template-columns:140px 150px 1fr${CWizard.editMode?' 120px':''}; gap:10px;margin-bottom:12px">
      <div>
        <label class="flbl">Brand</label>
        <div style="padding:8px 10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:12px;color:var(--text2);font-weight:500">${b?b.name:'—'}</div>
      </div>
      <div>
        <label class="flbl">Month *</label>
        <input type="month" value="${mk}" onchange="CWizard.month=this.value;renderWizardStep()"
          style="width:100%;padding:7px 10px;background:var(--bg2);border:1.5px solid var(--accent);border-radius:var(--rsm);font-family:var(--font);font-size:12px;font-weight:600;color:var(--accent2);cursor:pointer;outline:none"/>
      </div>
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
          <label class="flbl" style="margin:0">Campaign Name *</label>
          <div class="mode-toggle">
            <button class="mode-btn ${CWizard.data.nameMode==='library'?'active':''}" onclick="setWizNameMode('library')">Library</button>
            <button class="mode-btn ${CWizard.data.nameMode==='custom'?'active':''}" onclick="setWizNameMode('custom')">Custom</button>
          </div>
        </div>
        ${CWizard.data.nameMode==='library'?`
          <select class="fsel" id="wiz-lib-select" style="font-size:12px" onchange="wizSelectLib(this.value)">
            <option value="">— Select —</option>
            ${(LOOKUPS.campaignLibrary||[]).map(n=>`<option value="${n==='Other'||n==='other'?'__other__':n}" ${CWizard.data.name===n?'selected':''}>${n}</option>`).join('')}
          </select>`
        :`<input class="finp" id="wiz-custom-name" placeholder="e.g. Brand recall Q2..." value="${CWizard.data.name}" oninput="CWizard.data.name=this.value" style="font-size:12px"/>`}
      </div>
      ${CWizard.editMode?`<div>
        <label class="flbl">Status</label>
        <select class="fsel" style="font-size:12px" onchange="CWizard.data.status=this.value">
          <option value="planning" ${CWizard.data.status==='planning'?'selected':''}>📋 Planning</option>
          <option value="active" ${CWizard.data.status==='active'?'selected':''}>🟢 Active</option>
          <option value="paused" ${CWizard.data.status==='paused'?'selected':''}>⏸ Paused</option>
          <option value="complete" ${CWizard.data.status==='complete'?'selected':''}>✅ Complete</option>
        </select>
      </div>`:''}
    </div>
    ${CWizard.data.name?`<div style="font-size:11px;color:var(--green);margin-bottom:10px">✓ ${CWizard.data.name}</div>`:''}

    <!-- Row 2: Type + Budget + Focus in one row -->
    <div style="display:grid;grid-template-columns:auto auto 1fr;gap:16px;align-items:start;margin-bottom:12px">
      <div>
        <label class="flbl">Type</label>
        <div style="display:flex;gap:6px">
          ${[['organic','🌱 Organic'],['inorganic','⚡ Inorganic']].map(([v,l])=>`<button onclick="CWizard.data.budgetType='${v}';renderWizardStep()" style="padding:7px 12px;font-size:11px;font-weight:600;border:1.5px solid ${CWizard.data.budgetType===v?'var(--accent)':'var(--border)'};background:${CWizard.data.budgetType===v?'var(--abg)':'var(--bg3)'};color:${CWizard.data.budgetType===v?'var(--accent2)':'var(--text3)'};border-radius:var(--rsm);cursor:pointer;font-family:var(--font);white-space:nowrap">${l}</button>`).join('')}
        </div>
        ${CWizard.data.budgetType==='inorganic'?`<div style="display:flex;gap:6px;margin-top:6px">
          <select class="fsel" style="font-size:11px;width:90px" onchange="CWizard.data.currency=this.value">
            ${(LOOKUPS.currencies||['INR ₹','USD $','EUR €','GBP £','AED د.إ','SGD S$']).map(c=>`<option value="${c}" ${CWizard.data.currency===c?'selected':''}>${c}</option>`).join('')}
          </select>
          <input class="finp" type="number" placeholder="Budget" value="${CWizard.data.budget||''}" oninput="CWizard.data.budget=this.value" style="font-size:11px;flex:1" min="0"/>
        </div>`:''}
      </div>
      <div>
        <label class="flbl">Campaign Focus</label>
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          ${['P','I','M','A','B','MSE'].map(k=>{
            const sel=(CWizard.data.campFocus||[]).includes(k);
            return`<div onclick="wizToggleFocus('${k}')" style="display:flex;align-items:center;gap:4px;padding:5px 10px;border-radius:20px;cursor:pointer;border:1.5px solid ${sel?'var(--accent)':'var(--border)'};background:${sel?'var(--abg)':'var(--bg3)'};user-select:none;transition:all .15s">
              <div style="width:12px;height:12px;border-radius:3px;border:1.5px solid ${sel?'var(--accent)':'var(--border2)'};background:${sel?'var(--accent)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0">${sel?'<span style="color:#fff;font-size:8px;font-weight:700">✓</span>':''}</div>
              <span style="font-size:11px;font-weight:600;color:${sel?'var(--accent2)':'var(--text2)'}">${k}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Outcome Statement -->
    <div>
      <label class="flbl" style="display:flex;align-items:center;gap:6px">
        Outcome Statement *
        ${!CWizard.data.outcome?'<span style="font-size:10px;padding:2px 8px;background:var(--ambg);color:var(--amber);border-radius:9px;font-weight:600">Required</span>':''}
      </label>
      <textarea class="ftxt" style="min-height:68px;font-size:13px" placeholder="e.g. Increase LinkedIn follower engagement by 25% and generate 50 qualified leads by end of Q2 2026..."
        oninput="CWizard.data.outcome=this.value">${CWizard.data.outcome||''}</textarea>
      <div style="font-size:11px;color:var(--text3);margin-top:4px">💡 Please define a measurable and quantifiable business outcome.</div>
    </div>`;
}

function wizardStep2(){
  return`
    <div class="wiz-section-title">Campaign Details</div>
    <div class="wiz-section-sub">Define your target, message, and objective for this campaign.</div>
    <div style="margin-bottom:14px">
      <label class="flbl">T — Target audience *</label>
      <textarea class="ftxt" id="wiz-T" style="min-height:70px;font-size:13px" placeholder="Who is this campaign targeting? e.g. C-suite executives in automotive industry" oninput="CWizard.data.T=this.value">${CWizard.data.T}</textarea>
    </div>
    <div style="margin-bottom:14px">
      <label class="flbl">E — Elevator pitch *</label>
      <textarea class="ftxt" id="wiz-E" style="min-height:70px;font-size:13px" placeholder="1–2 sentence value proposition. What are we saying and why should they care?" oninput="CWizard.data.E=this.value">${CWizard.data.E}</textarea>
    </div>
    <div>
      <label class="flbl">Campaign objective</label>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
        ${OBJECTIVES.map(o=>`<div onclick="CWizard.data.objective='${o}';renderWizardStep()" style="padding:7px 14px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;border:1.5px solid ${CWizard.data.objective===o?'var(--accent)':'var(--border)'};background:${CWizard.data.objective===o?'var(--abg)':'var(--bg3)'};color:${CWizard.data.objective===o?'var(--accent2)':'var(--text2)'};transition:all .15s">${o}</div>`).join('')}
      </div>
    </div>`;
}

function wizardStep3merged(){
  if(!CWizard.data.rows||!CWizard.data.rows.length){
    CWizard.data.rows=[{platforms:[PLATFORMS[0]],format:CREATIVES[0],qty:1,pieceDataArray:[{}]}];
  }
  const rows=CWizard.data.rows;
  rows.forEach(r=>{
    if(!r.platforms)r.platforms=r.platform?[r.platform]:[];
    if(!r.format)r.format=CREATIVES[0];
    const qty=parseInt(r.qty)||1;
    if(!r.pieceDataArray)r.pieceDataArray=[];
    while(r.pieceDataArray.length<qty)r.pieceDataArray.push({});
    r.pieceDataArray.length=qty;
  });
  const total=rows.reduce((s,r)=>s+(parseInt(r.qty)||0),0);
  const filledTotal=rows.reduce((s,r)=>s+(r.pieceDataArray||[]).filter(p=>p&&(p.topic||p.copyDir||p.copy)).length,0);
  return`
    <div class="wiz-section-title">Creative & Content Plan</div>
    <div class="wiz-section-sub">Plan all rows first, then add briefs per piece. You can also save the plan and add briefs later.</div>
    <div style="border:.5px solid var(--border);border-radius:var(--r);margin-bottom:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr 70px 1fr 28px;gap:6px;background:var(--bg3);padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);border-radius:var(--r) var(--r) 0 0">
        <div>Medium</div><div>Creative Style</div><div style="text-align:center">Qty</div><div>Brief</div><div></div>
      </div>
      ${rows.map((r,i)=>{
        const qty=parseInt(r.qty)||1;
        const arr=r.pieceDataArray||[];
        const filledCount=arr.filter(p=>p&&(p.topic||p.copyDir||p.copy)).length;
        const platLabel=(r.platforms&&r.platforms.length)?r.platforms.join(', '):'Select medium...';
        const filledBadges=Array.from({length:filledCount},(_,pi)=>
          `<button onclick="openWizardBrief(${i},${pi})" title="Edit piece ${pi+1}" style="padding:3px 9px;font-size:11px;font-weight:600;border:1.5px solid var(--accent);background:var(--abg);color:var(--accent2);border-radius:20px;cursor:pointer;font-family:var(--font)">✓${qty>1?' '+(pi+1):''}</button>`
        ).join('');
        const addBtn=filledCount<qty
          ?`<button onclick="openWizardBrief(${i},${filledCount})" style="padding:4px 12px;font-size:11px;font-weight:600;border:1.5px solid var(--border);background:var(--bg3);color:var(--text2);border-radius:20px;cursor:pointer;font-family:var(--font)">📝 Add brief</button>`
          :'';
        return`<div style="border-top:.5px solid var(--border);padding:8px 12px;position:relative">
          <div style="display:grid;grid-template-columns:1fr 1fr 70px 1fr 28px;align-items:center;gap:6px">
            <!-- Custom multi-select dropdown -->
            <div style="position:relative">
              <button id="plat-btn-${i}" onclick="togglePlatDrop(${i})"
                style="width:100%;padding:8px 10px;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--rsm);font-family:var(--font);font-size:12px;color:var(--text);cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:4px">
                <span id="plat-summary-${i}" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${platLabel}</span>
                <span style="color:var(--text3);font-size:10px;flex-shrink:0">▾</span>
              </button>
              <div id="plat-drop-${i}" style="display:none;position:absolute;top:calc(100% + 4px);left:0;min-width:100%;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);z-index:100;box-shadow:0 4px 16px rgba(0,0,0,.15);max-height:220px;overflow-y:auto">
                ${PLATFORMS.map(p=>`
                <label style="display:flex;align-items:center;gap:8px;padding:7px 12px;cursor:pointer;font-size:12px;border-bottom:.5px solid var(--border);transition:background .1s" onmouseover="this.style.background='var(--abg)'" onmouseout="this.style.background=''">
                  <input type="checkbox" ${(r.platforms||[]).includes(p)?'checked':''} style="accent-color:var(--accent);width:14px;height:14px;cursor:pointer"
                    onchange="wizTogglePlatform(${i},'${p}',this)">
                  <span>${p}</span>
                </label>`).join('')}
              </div>
            </div>
            <select class="fsel" style="font-size:12px" onchange="CWizard.data.rows[${i}].format=this.value">
              ${CREATIVES.map(f=>`<option value="${f}" ${r.format===f?'selected':''}>${f}</option>`).join('')}
            </select>
            <input type="number" min="1" max="20" value="${qty}"
              style="width:56px;padding:6px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-family:var(--font);font-size:13px;font-weight:600;text-align:center;color:var(--text);outline:none"
              onchange="wizUpdateQty(${i},parseInt(this.value)||1)"/>
            <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">${filledBadges}${addBtn}</div>
            <button onclick="CWizard.data.rows.splice(${i},1);renderWizardStep()"
              style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:18px;padding:0;text-align:center;line-height:1">×</button>
          </div>
        </div>`;
      }).join('')}
      <div style="border-top:.5px solid var(--border);padding:8px 12px;border-radius:0 0 var(--r) var(--r)">
        <button onclick="CWizard.data.rows.push({platforms:[PLATFORMS[0]],format:CREATIVES[0],qty:1,pieceDataArray:[{}]});renderWizardStep()"
          style="background:none;border:none;color:var(--accent2);font-family:var(--font);font-size:12px;font-weight:600;cursor:pointer;padding:4px 0">+ Add row</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <div style="font-size:11px;color:var(--text3)">
        ${total} piece${total!==1?'s':''} planned${filledTotal?` · <span style="color:var(--green);font-weight:500">${filledTotal} brief${filledTotal!==1?'s':''} filled</span>`:''}
      </div>
      <button onclick="saveWizardPlanOnly()" style="font-size:11px;font-weight:500;padding:5px 14px;border:.5px solid var(--border);background:var(--bg3);color:var(--text2);border-radius:var(--rsm);cursor:pointer;font-family:var(--font)">💾 Save plan — add briefs later</button>
    </div>`;
}

// Helper: toggle platform dropdown
function togglePlatDrop(idx){
  // Close all other dropdowns first
  document.querySelectorAll('[id^="plat-drop-"]').forEach(d=>{if(d.id!=='plat-drop-'+idx)d.style.display='none';});
  const drop=document.getElementById('plat-drop-'+idx);
  if(drop)drop.style.display=drop.style.display==='none'?'block':'none';
}
function wizTogglePlatform(rowIdx,plat,cb){
  const r=CWizard.data.rows[rowIdx];if(!r)return;
  if(!r.platforms)r.platforms=[];
  const idx=r.platforms.indexOf(plat);
  if(cb.checked&&idx===-1)r.platforms.push(plat);
  if(!cb.checked&&idx>-1)r.platforms.splice(idx,1);
  const summary=document.getElementById('plat-summary-'+rowIdx);
  if(summary)summary.textContent=r.platforms.length?r.platforms.join(', '):'Select medium...';
}
// Close platform dropdowns on outside click
document.addEventListener('click',function(e){
  if(!e.target.closest('[id^="plat-drop-"],[id^="plat-btn-"]')){
    document.querySelectorAll('[id^="plat-drop-"]').forEach(d=>d.style.display='none');
  }
});
// Save plan without requiring briefs (SAM can add briefs later from campaign)
function saveWizardPlanOnly(){
  saveWizardCampaign(true);
}


function wizUpdateQty(idx,n){
  n=Math.max(1,Math.min(20,n));
  CWizard.data.rows[idx].qty=n;
  const arr=CWizard.data.rows[idx].pieceDataArray;
  while(arr.length<n)arr.push({});
  arr.length=n;
  renderWizardStep();
}

function wizardStep4(){
  const platforms=CWizard.data.M||[];
  const formats=CWizard.data.C||[];
  if(!platforms.length||!formats.length){
    return`<div class="wiz-section-title">Content Planning</div>
    <div class="wiz-section-sub">Plan how many content pieces per platform and format.</div>
    <div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:12px 14px;font-size:12px;color:var(--amber)">
      ⚠ Go back to Step 3 and select at least one platform and one creative format first.
    </div>`;
  }
  if(!CWizard.data.rows||!CWizard.data.rows.length){
    CWizard.data.rows=[{platforms:[platforms[0]],format:formats[0],qty:1,pieceDataArray:[{}]}];
  }
  const rows=CWizard.data.rows;
  // Sync all pieceDataArrays to current qty
  rows.forEach(r=>{
    if(!r.platforms)r.platforms=r.platform?[r.platform]:[platforms[0]]; // migrate old data
    const qty=parseInt(r.qty)||1;
    if(!r.pieceDataArray)r.pieceDataArray=[];
    while(r.pieceDataArray.length<qty)r.pieceDataArray.push({});
    r.pieceDataArray.length=qty;
  });
  const totalPieces=rows.reduce((s,r)=>s+(parseInt(r.qty)||0),0);
  const filledBriefs=rows.reduce((s,r)=>s+(r.pieceDataArray||[]).filter(p=>p&&(p.topic||p.copyDir||p.copy)).length,0);
  return`
    <div class="wiz-section-title">Content Planning</div>
    <div class="wiz-section-sub">Select platforms, format and quantity. Hold Ctrl / Cmd to select multiple platforms.</div>
    <div style="border:.5px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:12px">
      <div style="background:var(--bg3);padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);display:grid;grid-template-columns:1fr 1fr 60px 1fr 28px;gap:8px">
        <div>Platform(s)</div><div>Creative format</div><div style="text-align:center">Qty</div><div>Briefs</div><div></div>
      </div>
      ${rows.map((r,i)=>{
        const qty=parseInt(r.qty)||1;
        const rowPlats=r.platforms||[];
        const briefBtns=Array.from({length:qty},(_,pi)=>{
          const pd=r.pieceDataArray[pi]||{};
          const filled=!!(pd.topic||pd.copyDir||pd.copy);
          const label=qty===1?'Add brief':`Piece ${pi+1}`;
          return`<button onclick="openWizardBrief(${i},${pi})"
            style="padding:4px 10px;font-size:11px;font-weight:600;border:1.5px solid ${filled?'var(--accent)':'var(--border)'};background:${filled?'var(--abg)':'var(--bg3)'};color:${filled?'var(--accent2)':'var(--text2)'};border-radius:20px;cursor:pointer;font-family:var(--font);white-space:nowrap">
            ${filled?'✓':'📝'} ${label}
          </button>`;
        }).join('');
        return`<div style="border-top:.5px solid var(--border)">
          <div style="display:grid;grid-template-columns:1fr 1fr 60px 1fr 28px;align-items:center;padding:8px 12px;gap:6px">
            <select multiple
              style="width:100%;padding:4px 8px;background:var(--bg2);border:1.5px solid ${!rowPlats.length?'var(--red)':'var(--border)'};border-radius:var(--rsm);font-family:var(--font);font-size:12px;color:var(--text);outline:none;resize:none"
              size="${Math.min(platforms.length,4)}"
              onchange="CWizard.data.rows[${i}].platforms=Array.from(this.selectedOptions).map(o=>o.value);renderWizardStep()">
              ${platforms.map(p=>`<option value="${p}" ${rowPlats.includes(p)?'selected':''}>${p}</option>`).join('')}
            </select>
            <select class="fsel" style="font-size:12px" onchange="CWizard.data.rows[${i}].format=this.value">
              ${formats.map(f=>`<option value="${f}" ${r.format===f?'selected':''}>${f}</option>`).join('')}
            </select>
            <input type="number" min="1" max="20" value="${qty}"
              style="width:50px;padding:6px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-family:var(--font);font-size:13px;font-weight:600;text-align:center;color:var(--text);outline:none"
              onchange="const n=Math.max(1,Math.min(20,parseInt(this.value)||1));CWizard.data.rows[${i}].qty=n;while(CWizard.data.rows[${i}].pieceDataArray.length<n)CWizard.data.rows[${i}].pieceDataArray.push({});CWizard.data.rows[${i}].pieceDataArray.length=n;renderWizardStep()"/>
            <div style="display:flex;gap:5px;flex-wrap:wrap">${briefBtns}</div>
            <button onclick="CWizard.data.rows.splice(${i},1);renderWizardStep()"
              style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:0;text-align:center">×</button>
          </div>
          ${rowPlats.length?`<div style="padding:0 12px 8px;font-size:10px;color:var(--accent2)">✓ ${rowPlats.join(' · ')}</div>`:'<div style="padding:0 12px 8px;font-size:10px;color:var(--red)">⚠ Select at least one platform</div>'}
        </div>`;
      }).join('')}
      <div style="border-top:.5px solid var(--border);padding:8px 12px">
        <button onclick="CWizard.data.rows.push({platforms:['${platforms[0]}'],format:'${formats[0]}',qty:1,pieceDataArray:[{}]});renderWizardStep()"
          style="background:none;border:none;color:var(--accent2);font-family:var(--font);font-size:12px;font-weight:600;cursor:pointer;padding:4px 0">+ Add row</button>
      </div>
    </div>
    <div style="font-size:11px;color:var(--text3)">
      Total: <b style="color:var(--text)">${totalPieces}</b> pieces ·
      <span style="color:var(--green);font-weight:500">${filledBriefs} brief${filledBriefs!==1?'s':''} filled</span>
    </div>
  `;
}

function wizardStep5(b,mk){
  const monthLabel=mk?new Date(mk+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'}):mk;
  const d=CWizard.data;
  return`
    <div class="wiz-section-title">Review & Launch</div>
    <div class="wiz-section-sub">Everything looks good? Launch the campaign to start adding content pieces.</div>
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:16px">
      <div class="review-row"><div class="review-lbl">Brand</div><div class="review-val">${b?b.name:'—'}</div></div>
      <div class="review-row"><div class="review-lbl">Month</div><div class="review-val">${monthLabel}</div></div>
      <div class="review-row"><div class="review-lbl">Campaign name</div><div class="review-val"><b>${d.name||'—'}</b></div></div>
      ${d.outcome?`<div class="review-row"><div class="review-lbl">Outcome statement</div><div class="review-val">${d.outcome}</div></div>`:''}
      <div class="review-row"><div class="review-lbl">Type of campaign</div><div class="review-val">${d.budgetType==='inorganic'?`⚡ Inorganic${d.budget?` · 💰 ${d.currency} ${Number(d.budget).toLocaleString('en-IN')}`:''}` :'🌱 Organic'}</div></div>
      ${(d.campFocus||[]).length?`<div class="review-row"><div class="review-lbl">Campaign focus</div><div class="review-val">${d.campFocus.join(' · ')}</div></div>`:''}
      <div class="review-row"><div class="review-lbl">Objective</div><div class="review-val">${d.objective}</div></div>
      <div class="review-row"><div class="review-lbl">Target audience</div><div class="review-val">${d.T||'<span style="color:var(--text3)">Not set</span>'}</div></div>
      <div class="review-row"><div class="review-lbl">Elevator pitch</div><div class="review-val">${d.E||'<span style="color:var(--text3)">Not set</span>'}</div></div>
      <div class="review-row"><div class="review-lbl">Platforms</div><div class="review-val">${d.M.length?d.M.join(', '):'<span style="color:var(--text3)">None</span>'}</div></div>
      <div class="review-row"><div class="review-lbl">Creative formats</div><div class="review-val">${d.C.length?d.C.join(', '):'<span style="color:var(--text3)">None</span>'}</div></div>
      ${(d.rows||[]).length?`<div class="review-row"><div class="review-lbl">Content plan</div><div class="review-val">${d.rows.map(r=>`<div style="padding:2px 0">${r.platform} · ${r.format} · <b>${r.qty}</b> piece${r.qty>1?'s':''}</div>`).join('')}<div style="color:var(--teal);font-size:11px;margin-top:3px;font-weight:500">Total: ${d.rows.reduce((s,r)=>s+(parseInt(r.qty)||0),0)} pieces</div></div></div>`:''}
      ${d.startDate?`<div class="review-row"><div class="review-lbl">Start date</div><div class="review-val">${d.startDate}</div></div>`:''}
    </div>
    <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:12px 14px;font-size:12px;color:var(--green)">
      🚀 After launching you can add content pieces from the Monthly Plan tab.
    </div>`;
}

// Wizard interactions
function wizToggleRowPlat(rowIdx,plat){const r=CWizard.data.rows[rowIdx];if(!r)return;if(!r.platforms)r.platforms=[];const i=r.platforms.indexOf(plat);if(i>-1)r.platforms.splice(i,1);else r.platforms.push(plat);renderWizardStep();}
function wizToggleFocus(k){
  if(!CWizard.data.campFocus)CWizard.data.campFocus=[];
  const i=CWizard.data.campFocus.indexOf(k);
  if(i>-1)CWizard.data.campFocus.splice(i,1);else CWizard.data.campFocus.push(k);
  renderWizardStep();
}
function setWizNameMode(mode){CWizard.data.nameMode=mode;if(mode==='custom'&&CWizard.data.libFilter)CWizard.data.libFilter='';renderWizardStep();setTimeout(()=>document.getElementById('wiz-custom-name')?.focus(),50);}
function wizLibSearch(v){CWizard.data.libFilter=v;const list=document.querySelector('.lib-list');if(!list)return;const filtered=CAMPAIGN_LIBRARY.filter(n=>!v||n.toLowerCase().includes(v.toLowerCase()));list.innerHTML=filtered.map(n=>`<div class="lib-item ${CWizard.data.name===n?'selected':''}" onclick="wizSelectLib('${n.replace(/'/g,"\\'")}')"><span style="color:${CWizard.data.name===n?'var(--accent)':'var(--text3)'}">${CWizard.data.name===n?'✓':'◎'}</span> ${n}</div>`).join('')||'<div style="padding:12px;font-size:12px;color:var(--text3);text-align:center">No matches — switch to Custom</div>';}
function wizSelectLib(n){
  if(n==='__other__'){
    setWizNameMode('custom');
    CWizard.data.name='';
    setTimeout(()=>document.getElementById('wiz-custom-name')?.focus(),80);
    return;
  }
  CWizard.data._otherMode=false;
  CWizard.data.name=n;
  renderWizardStep();
}
function wizTogglePlat(p){const i=CWizard.data.M.indexOf(p);if(i>-1)CWizard.data.M.splice(i,1);else CWizard.data.M.push(p);renderWizardStep();}
function wizToggleCre(c){const i=CWizard.data.C.indexOf(c);if(i>-1)CWizard.data.C.splice(i,1);else CWizard.data.C.push(c);renderWizardStep();}
function bindStep1(){}
function bindChips(){}

function wizardNav(dir){
  const s=CWizard.step;
  if(dir===1){
    if(s===1&&!CWizard.data.name){toast('⚠ Select or enter a campaign name','var(--amber)');return;}
    if(s===1&&!(CWizard.data.outcome||'').trim()){toast('⚠ Outcome Statement is required','var(--amber)');return;}
    if(s===2&&!CWizard.data.T){toast('⚠ Target audience is required','var(--amber)');return;}
    if(s===3){
      if(!CWizard.data.rows.length){toast('⚠ Add at least one content row','var(--amber)');return;}
      const invalid=CWizard.data.rows.find(r=>!(r.platforms||[]).length);
      if(invalid){toast('⚠ Each row needs at least one platform selected','var(--amber)');return;}
    }
    if(s===3){saveWizardCampaign();return;}
  }
  CWizard.step=Math.max(1,Math.min(3,s+dir));
  renderWizardStep();
  document.getElementById('wiz-body')?.scrollTo(0,0);
}

function saveWizardCampaign(planOnly){
  const b=BRANDS.find(x=>x.id==CWizard.bid);if(!b)return;
  const d=CWizard.data;
  const allPlatforms=[...new Set((d.rows||[]).flatMap(r=>r.platforms&&r.platforms.length?r.platforms:[r.platform||''].filter(Boolean)))];
  const allFormats=[...new Set((d.rows||[]).map(r=>r.format).filter(Boolean))];

  if(CWizard.editMode&&CWizard.editCi!==undefined){
    // ── EDIT MODE: update existing campaign in-place ──
    const camp=b.campaigns[CWizard.editCi];if(!camp)return;
    camp.name=d.name;camp.outcome=d.outcome||'';
    camp.po=d.budgetType;camp.budgetType=d.budgetType;
    camp.budgetAmt=d.budgetType==='inorganic'?d.budget:'';
    camp.currency=d.budgetType==='inorganic'?d.currency:'';
    camp.campFocus=d.campFocus||[];
    camp.T=d.T;camp.E=d.E;
    camp.objective=d.objective||d.A||camp.objective;
    camp.M=allPlatforms.length?allPlatforms:camp.M;
    camp.C=allFormats.length?allFormats:camp.C;
    camp.campTypes=d.campTypes||camp.campTypes||[];
    camp.notes=d.notes||'';
    if(d.status)camp.status=d.status; // update status from wizard
    // Append any new content pieces from Step 3 rows
    if(!camp.contentPieces)camp.contentPieces=[];
    (d.rows||[]).forEach(r=>{
      const qty=parseInt(r.qty)||1;
      const plat=(r.platforms&&r.platforms.length)?r.platforms.join(', '):(r.platform||'');
      for(let q=0;q<qty;q++){
        const pd=(r.pieceDataArray&&r.pieceDataArray[q])||{};
        camp.contentPieces.push({
          topic:pd.topic||(plat+' '+r.format+(qty>1?' '+(q+1):''))||'',
          platform:plat,platforms:r.platforms||[r.platform].filter(Boolean),
          creativeStyle:r.format,status:'brief',publishStatus:'',
          briefDue:pd.briefDue||'',briefApprovalDue:pd.briefApprovalDue||'',
          designDate:pd.designDate||'',postDate:pd.postDate||'',
          assigneeId:pd.assigneeId||(canManage(CU)?CU.id:(b.primarySamId||CU.id)),
          copyDir:pd.copyDir||'',copy:pd.copy||'',
          caption:pd.caption||'',hashtags:pd.hashtags||'',visualIdea:pd.visualIdea||'',
          specFiles:[],ownerSpecFiles:[],feedbackHistory:[],attachments:[],aiSuggestions:pd.aiSuggestions||{}
        });
      }
    });
    persist();wizardClose();
    buildWsMonthly(b);buildWsContent(b);buildWsOverview(b);buildBrandsGrid();buildDashboard();
    toast(`✅ Campaign "${d.name}" updated`,'var(--green)');
    return;
  }

  // ── CREATE MODE: push new campaign ──
  const camp={
    name:d.name,outcome:d.outcome||'',po:d.budgetType,
    budget:d.budgetType==='inorganic'?d.budget:'',
    currency:d.budgetType==='inorganic'?d.currency:'',
    campFocus:d.campFocus||[],
    T:d.T,E:d.E,M:allPlatforms,C:allFormats,A:d.objective,
    start:d.startDate,status:'planning',monthly:true,
    contentPieces:[],monthlyRows:{},focusAreas:[],
    g7Link:'',clientApproved:false,notes:d.notes||''
  };
  (d.rows||[]).forEach(r=>{
    const qty=parseInt(r.qty)||1;
    const plat=(r.platforms&&r.platforms.length)?r.platforms.join(', '):(r.platform||'');
    for(let q=0;q<qty;q++){
      const pd=(r.pieceDataArray&&r.pieceDataArray[q])||{};
      camp.contentPieces.push({
        topic:pd.topic||(plat+' '+r.format+(qty>1?' '+(q+1):''))||'',
        platform:plat,platforms:r.platforms||[r.platform].filter(Boolean),
        creativeStyle:r.format,status:'brief',publishStatus:'',
        briefDue:pd.briefDue||'',briefApprovalDue:pd.briefApprovalDue||'',
        designDate:pd.designDate||'',postDate:pd.postDate||'',
        assigneeId:pd.assigneeId||(canManage(CU)?CU.id:(b.primarySamId||CU.id)),
        copyDir:pd.copyDir||'',copy:pd.copy||'',
        caption:pd.caption||'',hashtags:pd.hashtags||'',
        visualIdea:pd.visualIdea||'',
        specFiles:[],ownerSpecFiles:[],feedbackHistory:[],attachments:[],
        aiSuggestions:pd.aiSuggestions||{}
      });
    }
  });
  b.campaigns.push(camp);
  persist();wizardClose();
  buildWsMonthly(b);buildWsContent(b);buildWsOverview(b);buildBrandsGrid();
  toast(planOnly?`💾 Plan saved — open the campaign to add briefs`:`🎯 Campaign "${d.name}" created!`,'var(--green)');
}

// Replace original openAddCampaign to use wizard
function openAddCampaign(bid){
  CNewCampOpen=false;
  openCampaignWizard(bid);
}

const CP_STATUS={
  brief:{label:'Brief',col:'var(--text3)'},
  inprod:{label:'In production',col:'var(--blue)'},
  review:{label:'Submitted to BM',col:'var(--accent2)'},
  pending:{label:'Pending owner approval',col:'var(--amber)'},
  changes:{label:'Changes requested',col:'var(--red)'},
  approved:{label:'Approved',col:'var(--green)'},
  scheduled:{label:'Scheduled',col:'var(--teal)'},
  published:{label:'Published',col:'var(--teal)'},
  done:{label:'Done',col:'var(--teal)'}
};
const PLATFORM_ICONS={'LinkedIn':'💼','Instagram':'📸','Facebook':'👥','Google Ads':'🔍','YouTube':'▶','Twitter/X':'🐦','WhatsApp':'💬','Email':'📧','SEO/Blog':'📝','PR/Media':'📰','Events':'🎪','OOH/Print':'🖼'};
let CCPBid=null,CCPCampIdx=null,CCPPieceIdx=null;

// ── RENDER CAMPAIGN CARD: add content pieces section ──
function renderCampPieces(b,ci){
  const camp=b.campaigns[ci];
  if(!camp.contentPieces)camp.contentPieces=[];
  const pieces=camp.contentPieces;
  const canEdit=!!(CU&&canManage(CU));
  const isClient=!!(CU&&isBrandOwner(CU));
  const approvedCount=pieces.filter(p=>p.status==='approved'||p.status==='inprod'||p.status==='done').length;

  const pieceRows=pieces.map((p,pi)=>{
    const st=CP_STATUS[p.status]||CP_STATUS.brief;
    const icon=PLATFORM_ICONS[p.platform]||'📄';
    const STYLE_ICONS={'Video':'🎬','Reel / Short':'🎬','Static image':'🖼','Carousel':'🎠','Article / Blog':'📝','Infographic':'📊','Story':'⭕','Podcast':'🎙'};
    const styleIcon=STYLE_ICONS[p.creativeStyle]||'';
    const assignee=p.assigneeId?MEMBERS.find(m=>m.id===p.assigneeId):null;
    const locked=isClient&&(p.status==='approved'||p.status==='inprod'||p.status==='done');
    return`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:.5px solid var(--border)">
      <span style="font-size:13px;flex-shrink:0">${icon}</span>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px">
          <div style="font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.topic||'Untitled piece'}</div>
          ${p.creativeStyle?`<span style="font-size:9px;padding:1px 6px;border-radius:9px;background:var(--bg4);color:var(--text3);border:.5px solid var(--border);white-space:nowrap">${styleIcon} ${p.creativeStyle}</span>`:''}
        </div>
        <div style="font-size:10px;color:var(--text3)">${p.platform||'—'} ${p.due?' · '+p.due:''} ${assignee?' · '+assignee.name:''}</div>
      </div>
      <span style="font-size:10px;padding:2px 8px;border-radius:9px;color:${st.col};border:.5px solid ${st.col};white-space:nowrap">${st.label}</span>
      ${(canEdit||(!locked&&isClient))?`<button style="background:none;border:none;color:var(--accent2);cursor:pointer;font-size:11px;padding:2px 6px" onclick="openContentPiece(${b.id},${ci},${pi})">✏</button>`:''}
      ${canEdit?`<button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:11px" onclick="deleteContentPiece(${b.id},${ci},${pi})">✕</button>`:''}
    </div>`;
  }).join('');

  return`<div style="margin-top:12px;border-top:.5px solid var(--border);padding-top:12px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="font-size:11px;font-weight:500;color:var(--text2)">📋 Content pieces ${pieces.length?`<span style="color:var(--text3)">(${approvedCount}/${pieces.length} approved)</span>`:''}
      </div>
      ${canEdit?`<button class="btn btn-sm" style="background:var(--acbg);border-color:var(--acb);color:var(--accent2)" onclick="openContentPiece(${b.id},${ci},-1)">+ Add piece</button>`:''}
    </div>
    ${pieceRows||`<div style="font-size:11px;color:var(--text3);text-align:center;padding:10px 0">No content pieces yet${canEdit?' — click + Add piece to start':''}</div>`}
  </div>`;
}

function deleteContentPiece(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].contentPieces.splice(pi,1);
  persist();buildWsMonthly(b);buildWsContent(b);
}

// ── CONTENT PIECE MODAL ──
// ── WIZARD BRIEF MODAL ──
let _wizBriefIdx=null,_wizPieceIdx=0;
function openWizardBrief(rowIdx,pieceIdx){
  pieceIdx=pieceIdx||0;
  const row=CWizard.data.rows[rowIdx];if(!row)return;
  if(!row.pieceDataArray)row.pieceDataArray=[{}];
  if(!row.pieceDataArray[pieceIdx])row.pieceDataArray[pieceIdx]={};
  _wizBriefIdx=rowIdx;_wizPieceIdx=pieceIdx;
  const p=row.pieceDataArray[pieceIdx];
  const qty=parseInt(row.qty)||1;
  const specOpts=MEMBERS.filter(m=>m.active&&canBeAssigned(m)).map(m=>`<option value="${m.id}" ${m.id==p.assigneeId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  const aiSugg=p.aiSuggestions||{};
  const ex=document.getElementById('modal-wiz-brief');if(ex)ex.remove();
  const mo=document.createElement('div');mo.id='modal-wiz-brief';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-height:90vh;overflow-y:auto"><div class="modal-p">
    <div class="mtit">Content Brief${qty>1?` — Piece ${pieceIdx+1} of ${qty}`:''}</div>
    <div class="msub" style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
      ${(row.platforms||[row.platform||'']).map(p=>`<span class="badge bb">${p}</span>`).join('')}
      <span class="badge bgr">${row.format}</span>
      ${qty>1?`<span class="badge ba">${pieceIdx+1} / ${qty}</span>`:''}
    </div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Topic / angle *</label><input class="finp" id="wb-topic" value="${p.topic||''}" placeholder="e.g. Q2 highlights — investor angle"></div>
      <div class="fg2"><label class="flbl">Assigned to</label><select class="fsel" id="wb-assign"><option value="">Unassigned</option>${specOpts}</select></div>
    </div>
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Milestone dates</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <div style="flex:1;min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">📋 Brief due</label><input class="finp" type="date" id="wb-brief-date" value="${p.briefDue||''}" style="font-size:11px"></div>
        <div style="flex:1;min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">✅ Brief approval</label><input class="finp" type="date" id="wb-brief-approval" value="${p.briefApprovalDue||''}" style="font-size:11px"></div>
        <div style="flex:1;min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">🎨 Design ready</label><input class="finp" type="date" id="wb-design-date" value="${p.designDate||''}" style="font-size:11px"></div>
        <div style="flex:1;min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">📤 Post date</label><input class="finp" type="date" id="wb-post-date" value="${p.postDate||''}" style="font-size:11px" onchange="if(this.value){const d=calcMilestonesFromPost(this.value);const be=document.getElementById('wb-brief-date');const ba=document.getElementById('wb-brief-approval');const de=document.getElementById('wb-design-date');if(be)be.value=d.briefDue;if(ba)ba.value=d.briefApproval;if(de)de.value=d.designDue;}"></div>
      </div>
    </div>
    <!-- AI Assist -->
    <div style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);padding:14px;margin-bottom:12px">
      <div style="font-size:12px;font-weight:600;color:var(--accent2);margin-bottom:10px">✨ AI Assist</div>
      <div style="display:flex;gap:12px;margin-bottom:10px;flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="wai-copy" checked style="accent-color:var(--accent)"> Copy</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="wai-caption" checked style="accent-color:var(--accent)"> Caption</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="wai-hashtags" checked style="accent-color:var(--accent)"> Hashtags</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="wai-visual" style="accent-color:var(--accent)"> Visual idea</label>
      </div>
      <button class="btn btn-p" id="wai-gen-btn" onclick="generateWizardBriefAI()">✨ Generate with Claude →</button>
      <div id="wai-status" style="font-size:11px;color:var(--text3);margin-top:6px;display:none">Generating...</div>
      <div id="wai-suggestions" style="${Object.keys(aiSugg).length?'':'display:none'}">
        ${aiSugg.copy?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Copy suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px;white-space:pre-wrap">${aiSugg.copy}</div><button class="btn btn-sm btn-p" style="margin-top:6px" onclick="useWizSuggestion('copy')">Use ✓</button></div>`:''}
        ${aiSugg.caption?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Caption</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${aiSugg.caption}</div><button class="btn btn-sm btn-p" style="margin-top:6px" onclick="useWizSuggestion('caption')">Use ✓</button></div>`:''}
        ${aiSugg.hashtags?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Hashtags</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${aiSugg.hashtags}</div><button class="btn btn-sm btn-p" style="margin-top:6px" onclick="useWizSuggestion('hashtags')">Use ✓</button></div>`:''}
        ${aiSugg.visualIdea?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Visual idea</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${aiSugg.visualIdea}</div><button class="btn btn-sm btn-p" style="margin-top:6px" onclick="useWizSuggestion('visualIdea')">Use ✓</button></div>`:''}
      </div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Copy direction / brief</label><textarea class="ftxt" id="wb-copydir" style="min-height:70px" placeholder="Direction, tone, angle, key points...">${p.copyDir||''}</textarea></div></div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Copy (final)</label><textarea class="ftxt" id="wb-copy" style="min-height:70px" placeholder="Full post copy...">${p.copy||''}</textarea></div></div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Caption</label><textarea class="ftxt" id="wb-caption" style="min-height:46px" placeholder="Short caption...">${p.caption||''}</textarea></div>
      <div class="fg2"><label class="flbl">Hashtags</label><input class="finp" id="wb-hashtags" value="${p.hashtags||''}" placeholder="#Brand #Industry..."></div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Visual idea</label><textarea class="ftxt" id="wb-visual" style="min-height:60px" placeholder="Describe the visual concept, mood, references...">${p.visualIdea||''}</textarea></div></div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-wiz-brief').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveWizardBrief()">Save brief →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}
function saveWizardBrief(){
  const ri=_wizBriefIdx,pi=_wizPieceIdx||0;
  if(ri===null&&ri!==0)return;
  const row=CWizard.data.rows[ri];if(!row)return;
  if(!row.pieceDataArray)row.pieceDataArray=[{}];
  while(row.pieceDataArray.length<=pi)row.pieceDataArray.push({});
  const g=id=>document.getElementById(id)?.value||'';
  const pd=row.pieceDataArray[pi];
  pd.topic=g('wb-topic');
  const wbAssign=document.getElementById('wb-assign')?.value;
  const b=BRANDS.find(x=>x.id==CWizard.bid);
  pd.assigneeId=wbAssign?parseInt(wbAssign):(canManage(CU)?CU.id:(b&&b.primarySamId)||CU.id);
  pd.briefDue=g('wb-brief-date');pd.briefApprovalDue=g('wb-brief-approval');
  pd.designDate=g('wb-design-date');pd.postDate=g('wb-post-date');
  pd.copyDir=g('wb-copydir');pd.copy=g('wb-copy');
  pd.caption=g('wb-caption');pd.hashtags=g('wb-hashtags');
  pd.visualIdea=g('wb-visual');
  if(!pd.aiSuggestions)pd.aiSuggestions={};
  document.getElementById('modal-wiz-brief').remove();
  renderWizardStep();toast('✓ Brief saved','var(--green)');
}
async function generateWizardBriefAI(){
  const ri=_wizBriefIdx,pi=_wizPieceIdx||0;
  if(ri===null&&ri!==0)return;
  const row=CWizard.data.rows[ri];if(!row)return;
  const b=BRANDS.find(x=>x.id==CWizard.bid);if(!b)return;
  const bk=b.brandKnowledge||{};
  const wants=[];
  if(document.getElementById('wai-copy')?.checked)wants.push('Copy (full platform-appropriate post)');
  if(document.getElementById('wai-caption')?.checked)wants.push('Caption (under 150 characters)');
  if(document.getElementById('wai-hashtags')?.checked)wants.push('Hashtags (5-8 tags)');
  if(document.getElementById('wai-visual')?.checked)wants.push('Visual idea (2-3 sentences)');
  if(!wants.length){toast('Select at least one option','var(--amber)');return;}
  const btn=document.getElementById('wai-gen-btn');const st=document.getElementById('wai-status');
  if(btn)btn.disabled=true;if(st){st.style.display='block';st.textContent='Generating...';}
  const topic=document.getElementById('wb-topic')?.value||'';
  const copyDir=document.getElementById('wb-copydir')?.value||'';
  const prompt=`You are a social media expert. Generate content for ${b.name} on ${row.platform}.
Brand: ${bk.overview||b.name}. Tone: ${bk.toneOfVoice||'professional'}. Positioning: ${bk.positioning||''}
Campaign: "${CWizard.data.name}" — Objective: ${CWizard.data.objective}. Target: ${CWizard.data.T||''}. Message: ${CWizard.data.E||''}
Format: ${row.format}. Topic: ${topic}. Direction: ${copyDir}
Generate ONLY: ${wants.join(', ')}.
Return valid JSON only — keys: copy, caption, hashtags, visualIdea. No markdown. No preamble.`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
    const data=await res.json();
    const txt=(data.content||[]).map(x=>x.text||'').join('');
    const parsed=JSON.parse(txt.replace(/```json|```/g,'').trim());
    if(!row.pieceDataArray)row.pieceDataArray=[{}];
    while(row.pieceDataArray.length<=pi)row.pieceDataArray.push({});
    if(!row.pieceDataArray[pi])row.pieceDataArray[pi]={};
    row.pieceDataArray[pi].aiSuggestions=parsed;
    openWizardBrief(ri,pi);
  }catch(e){toast('⚠ AI generation failed','var(--amber)');if(btn)btn.disabled=false;if(st)st.style.display='none';}
}
function useWizSuggestion(field){
  const ri=_wizBriefIdx,pi=_wizPieceIdx||0;
  if(ri===null&&ri!==0)return;
  const row=CWizard.data.rows[ri];if(!row||!row.pieceDataArray||!row.pieceDataArray[pi])return;
  const val=row.pieceDataArray[pi].aiSuggestions?.[field]||'';
  const map={copy:'wb-copy',caption:'wb-caption',hashtags:'wb-hashtags',visualIdea:'wb-visual'};
  const el=document.getElementById(map[field]);if(el){el.value=val;row.pieceDataArray[pi][field]=val;}
  toast('✓ Applied','var(--green)');
}

function openContentPiece(bid,ci,pi){
  CCPBid=bid;CCPCampIdx=ci;CCPPieceIdx=pi;
  const b=BRANDS.find(x=>x.id==bid);
  const camp=b.campaigns[ci];
  if(!camp.contentPieces)camp.contentPieces=[];
  const isNew=pi===-1;
  const p=isNew?{topic:'',platform:'',due:'',assigneeId:null,copyDir:'',visualIdea:'',copy:'',caption:'',hashtags:'',status:'brief',comment:'',taskId:null,tOverride:'',eOverride:'',toneOverride:'',aiSuggestions:{}}:camp.contentPieces[pi];
  const isClient=isBrandOwner(CU);
  const locked=isClient&&(p.status==='approved'||p.status==='inprod'||p.status==='done');
  const canEdit=canManage(CU)||(!locked&&isClient);
  const canAI=canManage(CU)||(!locked&&isClient);
  const meds=Array.isArray(camp.M)?camp.M:[camp.M].filter(Boolean);
  const cres=Array.isArray(camp.C)?camp.C:[camp.C].filter(Boolean);
  const platOpts=meds.map(m=>`<option value="${m}" ${p.platform===m?'selected':''}>${m}</option>`).join('');
  const specs=MEMBERS.filter(m=>m.active);
  const specOpts=specs.map(m=>`<option value="${m.id}" ${m.id===p.assigneeId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  const aiSugg=p.aiSuggestions||{};

  const ex=document.getElementById('modal-cp');if(ex)ex.remove();
  const mo=document.createElement('div');mo.id='modal-cp';mo.className='moverlay open';
  // Reset changes box on fresh open (handled by re-render, but clear residual state)
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-height:90vh;overflow-y:auto"><div class="modal-p">
    <div class="mtit">${isNew?'New content piece':'Edit content piece'}</div>
    <div class="msub">${camp.name}</div>
    ${['approved','scheduled','published'].includes(p.status)&&!isNew?`
    <div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:10px 14px;margin-bottom:10px">
      <div style="font-size:12px;font-weight:600;color:var(--amber);margin-bottom:6px">⚠ This piece is ${p.status}. Editing requires a comment.</div>
      <textarea id="edit-approved-comment" class="ftxt" style="min-height:44px;font-size:12px" placeholder="Explain what changed and why... (required to save)"></textarea>
    </div>`:''}

    <div class="form-row">
      <div class="fg2"><label class="flbl">Topic / angle *</label><input class="finp" id="cp-topic" value="${p.topic}" placeholder="e.g. Q2 results — investor focus" ${!canEdit?'disabled':''}></div>
      <div class="fg2"><label class="flbl">Platform</label><div style="padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:12px;color:var(--text2)">${p.platform||'—'}</div><input type="hidden" id="cp-platform" value="${p.platform||''}"></div>
    </div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Creative style</label><div style="padding:8px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:12px;color:var(--text2)">${p.creativeStyle||'—'}</div><input type="hidden" id="cp-style" value="${p.creativeStyle||''}"></div>
      <div class="fg2"><label class="flbl">Assigned to</label><select class="fsel" id="cp-assign" ${!canEdit?'disabled':''}><option value="">Unassigned</option>${specOpts}</select></div>
    </div>
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Milestone dates</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <div style="flex:1;min-width:120px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">📋 Brief due</label><input class="finp" type="date" id="cp-brief-date" value="${p.briefDue||p.due||''}" ${!canEdit?'disabled':''} style="font-size:11px"></div>
        <div style="flex:1;min-width:120px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">✅ Brief approval</label><input class="finp" type="date" id="cp-brief-approval-date" value="${p.briefApprovalDue||''}" ${!canEdit?'disabled':''} style="font-size:11px"></div>
        <div style="flex:1;min-width:120px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">🎨 Design ready by</label><input class="finp" type="date" id="cp-design-date" value="${p.designDate||p.designDue||''}" ${!canEdit?'disabled':''} style="font-size:11px"></div>
        <div style="flex:1;min-width:120px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">✅ Final approval by</label><input class="finp" type="date" id="cp-approval-date" value="${p.approvalDate||p.approvalDue||''}" ${!canEdit?'disabled':''} style="font-size:11px"></div>
        <div style="flex:1;min-width:120px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">📤 Post / delivery</label><input class="finp" type="date" id="cp-post-date" value="${p.postDate||''}" ${!canEdit?'disabled':''} style="font-size:11px" onchange="if(this.value){const d=calcMilestonesFromPost(this.value);const bd=document.getElementById('cp-brief-date');const bad=document.getElementById('cp-brief-approval-date');const dd=document.getElementById('cp-design-date');const ad=document.getElementById('cp-approval-date');if(bd)bd.value=d.briefDue;if(bad)bad.value=d.briefApproval;if(dd)dd.value=d.designDue;if(ad)ad.value=d.approvalDue;}renderBriefCal(this.value,'${CCPBid}',${CCPCampIdx},${CCPPieceIdx});"></div>
      </div>
      <!-- Mini scheduling calendar -->
      <div id="brief-cal-wrap" style="margin-top:10px;display:block">
        <div style="font-size:10px;color:var(--text3);margin-bottom:5px">📅 Click a day to set post date — other pieces shown, ⚠ = platform clash</div>
        <div id="brief-cal" style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px"></div>
      </div>
    </div>

    ${canManage(CU)?`
    <details style="margin-bottom:12px">
      <summary style="font-size:11px;color:var(--accent2);cursor:pointer;padding:6px 0;user-select:none">+ Customize context for this piece (if different from brand PIM / campaign)</summary>
      <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-top:8px">
        <div style="font-size:10px;color:var(--text3);margin-bottom:8px">Leave blank to use brand PIM + campaign T+E automatically</div>
        <div class="form-row"><div class="fg2"><label class="flbl">Tone override</label><input class="finp" id="cp-tone" value="${p.toneOverride||''}" placeholder="e.g. More casual than usual"></div><div class="fg2"><label class="flbl">Target override (T)</label><input class="finp" id="cp-t" value="${p.tOverride||''}" placeholder="e.g. HR Managers only"></div></div>
        <div class="form-row full"><div class="fg2"><label class="flbl">Message override (E)</label><input class="finp" id="cp-e" value="${p.eOverride||''}" placeholder="e.g. Focus on cost savings not features"></div></div>
      </div>
    </details>`:''}

    ${canAI?`
    <div style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);padding:14px;margin-bottom:12px">
      <div style="font-size:12px;font-weight:600;color:var(--accent2);margin-bottom:10px">✨ AI Assist</div>
      <div style="display:flex;gap:12px;margin-bottom:10px;flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="ai-copy" checked style="accent-color:var(--accent)"> Copy</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="ai-caption" checked style="accent-color:var(--accent)"> Caption</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="ai-hashtags" checked style="accent-color:var(--accent)"> Hashtags</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" id="ai-visual" style="accent-color:var(--accent)"> Visual idea</label>
      </div>
      <button class="btn btn-p" id="ai-gen-btn" onclick="generateCPContent(${bid},${ci})">✨ Generate with Claude →</button>
      <div id="ai-status" style="font-size:11px;color:var(--text3);margin-top:6px;display:none">Generating...</div>

      <div id="ai-suggestions" style="${Object.keys(aiSugg).length?'':'display:none'}">
        ${aiSugg.copy?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Copy suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px;white-space:pre-wrap">${aiSugg.copy}</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPSuggestion('copy')">Use ✓</button><div style="flex:1;display:flex;gap:6px"><input class="finp" id="refine-copy" placeholder="Refine: make it shorter..." style="font-size:11px"><button class="btn btn-sm" onclick="refineCPContent(${bid},${ci},'copy')">→</button></div></div></div>`:''}
        ${aiSugg.caption?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Caption suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${aiSugg.caption}</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPSuggestion('caption')">Use ✓</button><div style="flex:1;display:flex;gap:6px"><input class="finp" id="refine-caption" placeholder="Refine..." style="font-size:11px"><button class="btn btn-sm" onclick="refineCPContent(${bid},${ci},'caption')">→</button></div></div></div>`:''}
        ${aiSugg.hashtags?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Hashtags suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${aiSugg.hashtags}</div><div style="margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPSuggestion('hashtags')">Use ✓</button></div></div>`:''}
        ${aiSugg.visualIdea?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Visual idea suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${aiSugg.visualIdea}</div><div style="margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPSuggestion('visualIdea')">Use ✓</button></div></div>`:''}
      </div>
    </div>`:''}

    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:11px;font-weight:600;color:var(--accent2);text-transform:uppercase;letter-spacing:.05em">📋 Campaign brief reference</div>
        <span style="font-size:10px;color:var(--text3)">Auto-filled from campaign</span>
      </div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">T — Target audience</label><textarea class="ftxt" id="cp-targeting" style="min-height:46px;font-size:11px" placeholder="Who is this campaign targeting?" ${!canEdit?'disabled':''}>${p.targeting||camp.T||''}</textarea></div>
        <div class="fg2"><label class="flbl">E — Elevator pitch</label><textarea class="ftxt" id="cp-elevator" style="min-height:46px;font-size:11px" placeholder="1–2 sentence value proposition" ${!canEdit?'disabled':''}>${p.elevator||camp.E||''}</textarea></div>
      </div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">Keywords <span style="font-size:10px;color:var(--text3);font-weight:400">SEO / DM</span></label><input class="finp" id="cp-keywords" style="font-size:11px" value="${p.keywords||''}" placeholder="e.g. fleet management, automotive digital..." ${!canEdit?'disabled':''}></div>
        <div class="fg2"><label class="flbl">Campaign</label><input class="finp" id="cp-campname" style="font-size:11px" value="${p.campName||camp.name||''}" readonly style="background:var(--bg2);color:var(--text3)"></div>
      </div>
    </div>

    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:500;color:var(--text2);margin-bottom:10px">Saved content</div>
      <div class="form-row full"><div class="fg2"><label class="flbl">Copy direction / brief</label><textarea class="ftxt" id="cp-copydir" style="min-height:70px" placeholder="e.g. Data-led, formal tone, highlight 3 key stats..." ${!canEdit?'disabled':''}>${p.copyDir||''}</textarea></div></div>
      <div class="form-row full"><div class="fg2"><label class="flbl">Copy (final)</label><textarea class="ftxt" id="cp-copy" style="min-height:66px" placeholder="Full post copy..." ${!canEdit?'disabled':''}>${p.copy||''}</textarea></div></div>
      <div class="form-row"><div class="fg2"><label class="flbl">Caption</label><textarea class="ftxt" id="cp-caption" style="min-height:46px" placeholder="Short caption..." ${!canEdit?'disabled':''}>${p.caption||''}</textarea></div><div class="fg2"><label class="flbl">Hashtags</label><input class="finp" id="cp-hashtags" value="${p.hashtags||''}" placeholder="#Brand #Industry..." ${!canEdit?'disabled':''}></div></div>
      <div class="form-row full"><div class="fg2"><label class="flbl">Visual idea</label><textarea class="ftxt" id="cp-visual" style="min-height:70px" placeholder="Describe the visual concept..." ${!canEdit?'disabled':''}>${p.visualIdea||''}</textarea></div></div>
      <div class="form-row full"><div class="fg2">
        <label class="flbl">Reference files <span style="font-size:10px;color:var(--text3);font-weight:400">(doc, jpg, pdf, xls)</span></label>
        ${p.attachments&&p.attachments.length?`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">${p.attachments.map((a,ai)=>`<div style="display:flex;align-items:center;gap:5px;padding:3px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);font-size:11px">${a.data?`<a href="${a.data}" download="${a.name}" style="color:var(--accent2);text-decoration:none">📎 ${a.name}</a>`:`<span>📎 ${a.name}</span>`}${canEdit?`<button onclick="removeCPAttachment(${ai})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;padding:0 4px">×</button>`:''}</div>`).join('')}</div>`:''}
        ${canEdit?`<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><input type="file" id="cp-file-input" accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.xls,.xlsx,.ppt,.pptx" multiple style="display:none" onchange="handleCPFileUpload(this)"><button class="btn btn-sm" onclick="document.getElementById('cp-file-input').click()">📎 Attach file</button><button class="btn btn-sm" style="background:var(--acbg);border-color:var(--acb);color:var(--accent2)" onclick="openAssetPicker()">🗂 Insert from Assets</button><span style="font-size:10px;color:var(--text3)">Stored as name reference</span></div>`:''}
      </div></div>
    </div>

    <div class="form-row">
      <div class="fg2"><label class="flbl">Status</label><select class="fsel" id="cp-status" ${!canEdit?'disabled':''}>
        ${Object.entries(CP_STATUS).map(([k,v])=>`<option value="${k}" ${p.status===k?'selected':''}>${v.label}</option>`).join('')}
      </select></div>
      ${isClient?`<div class="fg2"><label class="flbl">Your comment</label><input class="finp" id="cp-comment" value="${p.comment||''}" placeholder="Add a comment for the team..."></div>`:''}
    </div>

    ${isClient&&!locked?`<button class="btn btn-p" style="width:100%;margin-bottom:12px;background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="approveCPPiece()">✓ Approve this piece</button>`:''}

    ${(isBM(CU)||isSAM(CU))&&p.status==='review'?`
    <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:600;color:var(--green);margin-bottom:10px">BM Review — specialist submitted this piece</div>
      ${p.completionNote?`<div style="font-size:11px;color:var(--text2);padding:6px 8px;background:var(--bg3);border-radius:var(--rsm);margin-bottom:10px">💬 Specialist note: ${p.completionNote}</div>`:''}
      ${(p.specFiles||[]).length?`<div style="margin-bottom:10px;display:flex;flex-wrap:wrap;gap:6px">${p.specFiles.map((f,fi)=>{
        const hasData=!!f.data;
        const icon=getFileIcon(f.name);
        const baseStyle='font-size:10px;padding:3px 10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);display:inline-flex;align-items:center;gap:5px';
        const interactStyle=hasData?baseStyle+';cursor:pointer;transition:border-color .15s':baseStyle+';opacity:.7';
        const click=hasData?`onclick="openCPAttachment(${b.id},${ci},${pi},${fi})"`:'';
        const hover=hasData?`onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'"`:'';
        const hint=hasData?'<span style="font-size:9px;color:var(--accent2);margin-left:2px">› open</span>':'<span style="font-size:9px;color:var(--text3);margin-left:2px">(no preview)</span>';
        return`<span style="${interactStyle}" ${click} ${hover}>${icon} ${f.name} ${hint}</span>`;
      }).join('')}</div>`:''}
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="bmApproveCPDirect()">✅ Approve & add to queue</button>
        <button class="btn" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="bmSendCPToOwner()">📤 Send to owner for approval</button>
        <button class="btn" style="background:var(--rbg);border-color:var(--rborder);color:var(--red)" onclick="document.getElementById('bm-cp-changes-box').style.display='block';document.getElementById('bm-cp-changes-input').focus()">❌ Request changes</button>
      </div>
      <div id="bm-cp-changes-box" style="display:none;margin-top:10px">
        <textarea id="bm-cp-changes-input" class="ftxt" placeholder="What needs to change? (specialist will see this)" style="min-height:60px;font-size:12px"></textarea>
        <div style="display:flex;gap:6px;margin-top:6px">
          <button class="btn btn-p btn-sm" onclick="bmRequestCPChangesConfirm()">Send back to specialist</button>
          <button class="btn btn-s btn-sm" onclick="document.getElementById('bm-cp-changes-box').style.display='none'">Cancel</button>
        </div>
      </div>
    </div>`:''}

    ${(isBM(CU)||isSAM(CU))&&p.status==='pending'?`
    <div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:10px 12px;margin-bottom:12px">
      <span style="font-size:11px;color:var(--amber)">⏳ Sent to owner — awaiting approval</span>
    </div>`:''}

    ${(isBM(CU)||isSAM(CU))&&(p.status==='approved'||p.publishStatus==='ready'||p.publishStatus==='scheduled'||p.publishStatus==='published')?`
    <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:10px 12px;margin-bottom:12px">
      <span style="font-size:11px;color:var(--green)">✅ Approved — in Publishing Queue</span>
    </div>`:''}


    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-cp').remove()">Cancel</button>
      ${canEdit?`<button class="mbtn ok" onclick="saveContentPiece()">Save piece →</button>`:''}
      ${canEdit&&!isNew&&['brief','approved'].includes(p.status)&&!p.taskId&&(p.copyDir||p.copy||p.topic)?`<button class="mbtn" style="background:var(--gnbg);border:.5px solid var(--gnb);color:var(--green);font-weight:600" onclick="saveContentPiece();setTimeout(()=>generatePieceTask(${bid},${ci},${pi}),200)">🚀 Save & generate task</button>`:''}
    </div>
  </div></div>`;
  document.body.appendChild(mo);
  setTimeout(function(){renderBriefCal(p.postDate||'',bid,ci,pi);},100);
}


function runAIAssist(){
  const b=BRANDS.find(x=>x.id==CCPBid);
  if(!b)return;
  const camp=b.campaigns[CCPCampIdx];
  const isNew=CCPPieceIdx===-1;
  const p=isNew?{}:(camp.contentPieces[CCPCampIdx]||{});
  const topic=document.getElementById('cp-topic')?.value||'';
  const platform=document.getElementById('cp-platform')?.value||'LinkedIn';
  const style=document.getElementById('cp-style')?.value||'';
  const copyDir=document.getElementById('cp-copydir')?.value||'';
  if(!topic){toast('⚠ Add a topic first','var(--amber)');return;}
  const btn=document.querySelector('button[onclick="runAIAssist()"]');
  if(btn){btn.textContent='Generating...';btn.disabled=true;}
  const plan=getG7Plan(b,CG7Month);
  const pimFocus=plan.pimFocus||'I';
  const pimDesc=PIM_FOCUS[pimFocus]?.desc||'';
  const prompt=`You are a B2B marketing expert. Generate content for:

BRAND: ${b.name}
CAMPAIGN: ${camp.name}
PIM FOCUS: ${pimFocus} — ${pimDesc}
PLATFORM: ${platform}
CREATIVE STYLE: ${style||'Not specified'}
TOPIC: ${topic}
COPY DIRECTION: ${copyDir||'Not specified'}
T (Target): ${camp.T||'Not specified'}
E (Elevator): ${camp.E||'Not specified'}

Generate ONLY the following, labelled exactly:
COPY: [the main body copy, platform-appropriate length]
CAPTION: [social media caption with hook]
HASHTAGS: [5-8 relevant hashtags]
VISUAL: [visual concept description]`;

  fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})
  }).then(r=>r.json()).then(data=>{
    const text=data.content?.[0]?.text||'';
    const copy=(text.match(/COPY:\s*([\s\S]*?)(?=CAPTION:|HASHTAGS:|VISUAL:|$)/i)||[])[1]?.trim()||'';
    const caption=(text.match(/CAPTION:\s*([\s\S]*?)(?=COPY:|HASHTAGS:|VISUAL:|$)/i)||[])[1]?.trim()||'';
    const hashtags=(text.match(/HASHTAGS:\s*([\s\S]*?)(?=COPY:|CAPTION:|VISUAL:|$)/i)||[])[1]?.trim()||'';
    const visual=(text.match(/VISUAL:\s*([\s\S]*?)(?=COPY:|CAPTION:|HASHTAGS:|$)/i)||[])[1]?.trim()||'';
    // Store suggestion
    const piece=CCPPieceIdx===-1?null:camp.contentPieces[CCPPieceIdx];
    if(piece){if(!piece.aiSuggestions)piece.aiSuggestions={};piece.aiSuggestions={copy,caption,hashtags,visual};persist();}
    // Fill fields
    if(copy){const el=document.getElementById('cp-copy');if(el)el.value=copy;}
    if(caption){const el=document.getElementById('cp-caption');if(el)el.value=caption;}
    if(hashtags){const el=document.getElementById('cp-hashtags');if(el)el.value=hashtags;}
    if(visual){const el=document.getElementById('cp-visual');if(el)el.value=visual;}
    if(btn){btn.textContent='✨ Generate with Claude';btn.disabled=false;}
    toast('✓ AI content generated — review and edit below','var(--green)');
  }).catch(err=>{
    if(btn){btn.textContent='✨ Generate with Claude';btn.disabled=false;}
    toast('AI error: '+err.message,'var(--red)');
  });
}

function applyAISuggestion(){
  const b=BRANDS.find(x=>x.id==CCPBid);
  const camp=b.campaigns[CCPCampIdx];
  const p=camp.contentPieces[CCPPieceIdx];
  if(!p||!p.aiSuggestions)return;
  const s=p.aiSuggestions;
  if(s.copy){const el=document.getElementById('cp-copy');if(el)el.value=s.copy;}
  if(s.caption){const el=document.getElementById('cp-caption');if(el)el.value=s.caption;}
  if(s.hashtags){const el=document.getElementById('cp-hashtags');if(el)el.value=s.hashtags;}
  if(s.visual){const el=document.getElementById('cp-visual');if(el)el.value=s.visual;}
  toast('✓ AI suggestion applied','var(--green)');
}

function handleCPFileUpload(input){
  if(!input.files||!input.files.length)return;
  const b=BRANDS.find(x=>x.id==CCPBid);if(!b)return;
  const p=b.campaigns[CCPCampIdx].contentPieces[CCPPieceIdx];
  if(!p.attachments)p.attachments=[];
  const files=Array.from(input.files);
  let loaded=0;
  files.forEach(f=>{
    if(f.size>5*1024*1024){toast('⚠ '+f.name+' is too large (max 5MB)','var(--amber)');loaded++;if(loaded===files.length){input.value='';openContentPiece(CCPBid,CCPCampIdx,CCPPieceIdx);}return;}
    const reader=new FileReader();
    reader.onload=function(e){
      p.attachments.push({name:f.name,size:f.size,type:f.type,data:e.target.result,addedAt:new Date().toISOString()});
      loaded++;
      if(loaded===files.length){
        persist();
        toast('✓ '+files.length+' file'+(files.length>1?'s':'')+' attached','var(--green)');
        input.value='';
        openContentPiece(CCPBid,CCPCampIdx,CCPPieceIdx);
      }
    };
    reader.readAsDataURL(f);
  });
}

function removeCPAttachment(ai){
  const b=BRANDS.find(x=>x.id==CCPBid);if(!b)return;
  const p=b.campaigns[CCPCampIdx].contentPieces[CCPPieceIdx];
  if(!p.attachments)return;
  const name=p.attachments[ai].name;
  p.attachments.splice(ai,1);
  persist();
  openContentPiece(CCPBid,CCPCampIdx,CCPPieceIdx);
  toast('Removed: '+name,'var(--amber)');
}


function saveMilestoneBuffers(){
  if(!LOOKUPS.milestoneBuffers)LOOKUPS.milestoneBuffers={};
  ['briefToApproval','approvalToDesign','designToFinal','finalToPost'].forEach(function(key){
    const el=document.getElementById('buf-'+key);
    if(el)LOOKUPS.milestoneBuffers[key]=parseInt(el.value)||3;
  });
  persist();
  toast('✓ Milestone buffers saved','var(--green)');
}

function calcMilestonesFromPost(postDate){
  const mb=LOOKUPS.milestoneBuffers||{briefToApproval:3,approvalToDesign:5,designToFinal:5,finalToPost:2};
  function subDays(d,n){const r=new Date(d+'T12:00:00');r.setDate(r.getDate()-n);return r.toISOString().split('T')[0];}
  const finalApproval=subDays(postDate,mb.finalToPost);
  const designReady=subDays(finalApproval,mb.designToFinal);
  const briefApproval=subDays(designReady,mb.approvalToDesign);
  const briefDue=subDays(briefApproval,mb.briefToApproval);
  return{briefDue,briefApproval,designDue:designReady,approvalDue:finalApproval,postDate};
}

function setPostDateAndCalc(bid,ci,pi,postDate){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci].contentPieces[pi];if(!p)return;
  if(postDate){
    const dates=calcMilestonesFromPost(postDate);
    p.postDate=dates.postDate;
    p.briefDue=dates.briefDue;
    p.briefApprovalDue=dates.briefApproval;
    p.designDue=dates.designDue;
    p.approvalDue=dates.approvalDue;
  } else {
    p.postDate='';
  }
  persist();
  if(CBid==bid)buildWsContent(b);
  toast('✓ Post date set — milestones calculated','var(--green)');
}

function clearDayPanel(){
  const p=document.getElementById('day-detail-panel');
  if(p)p.innerHTML='';
}

function showDayPieces(bid,dateStr){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const panel=document.getElementById('day-detail-panel');if(!panel)return;
  const allPieces=[];
  b.campaigns.forEach((camp,ci)=>{
    (camp.contentPieces||[]).forEach((p,pi)=>{if(p.postDate===dateStr)allPieces.push({p,ci,pi,camp});});
  });
  const SICONS={'Video':'🎬','Reel / Short':'🎬','Static image':'🖼','Carousel':'🎠','Article / Blog':'📝','Infographic':'📊','Story':'⭕','Podcast':'🎙'};
  const ST_COL={brief:'#9ca3af',inprod:'#3b82f6',review:'#f59e0b',pending:'#f59e0b',changes:'#ef4444',approved:'#22c55e',scheduled:'#14b8a6',published:'#14b8a6'};
  const ST_LBL={brief:'Brief',inprod:'In Prod',review:'Review',pending:'Pending',changes:'Changes',approved:'Approved',scheduled:'Scheduled',published:'Published'};
  const dateLabel=new Date(dateStr+'T12:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
  let html=`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:600">📅 ${dateLabel}</div>
      <button onclick="document.getElementById('day-detail-panel').innerHTML=''" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:18px;line-height:1">×</button>
    </div>`;
  if(allPieces.length){
    allPieces.forEach(({p,ci,pi,camp})=>{
      const col=ST_COL[p.publishStatus||p.status]||'#9ca3af';
      const lbl=ST_LBL[p.publishStatus||p.status]||p.status;
      const assignee=p.assigneeId?MEMBERS.find(m=>m.id===p.assigneeId):null;
      html+=`<div style="padding:10px 12px;background:var(--bg3);border:.5px solid var(--border);border-left:3px solid ${col};border-radius:var(--rsm);margin-bottom:6px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:14px">${SICONS[p.creativeStyle]||'📄'}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.topic||'Untitled'}</div>
            <div style="font-size:10px;color:var(--text3);margin-top:1px">${camp.name}${p.platform?' · '+p.platform:''}${assignee?' · '+assignee.name:''}</div>
          </div>
          <span style="font-size:10px;padding:2px 8px;border-radius:9px;color:${col};background:${col}18;border:.5px solid ${col}44;flex-shrink:0;font-weight:600">${lbl}</span>
          <button onclick="openContentPiece(${b.id},${ci},${pi})" style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);color:var(--accent2);cursor:pointer;font-size:10px;padding:3px 8px;font-family:var(--font)">✏ Edit</button>
          <button onclick="setPostDateAndCalc(${b.id},${ci},${pi},'')" style="background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);color:var(--red);cursor:pointer;font-size:10px;padding:3px 6px;font-family:var(--font)" title="Remove from this date">✕</button>
        </div>
        ${p.copy?`<div style="font-size:11px;color:var(--text2);margin-top:6px;padding:6px 8px;background:var(--bg2);border-radius:var(--rsm);line-height:1.4">${p.copy.substring(0,120)}${p.copy.length>120?'…':''}</div>`:''}
      </div>`;
    });
  } else {
    html+=`<div style="font-size:11px;color:var(--text3);text-align:center;padding:16px">No posts scheduled for this day</div>`;
  }
  html+='</div>';
  panel.innerHTML=html;
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}


function saveContentPiece(){
  const b=BRANDS.find(x=>x.id==CCPBid);
  const camp=b.campaigns[CCPCampIdx];
  if(!camp.contentPieces)camp.contentPieces=[];
  const isNew=CCPPieceIdx===-1;
  const p=isNew?{}:camp.contentPieces[CCPPieceIdx];
  p.topic=document.getElementById('cp-topic').value.trim();
  if(!p.topic){toast('⚠ Topic required','var(--amber)');return;}
  // Require comment when editing an approved piece
  if(['approved','scheduled','published'].includes(p.status)){
    const editComment=document.getElementById('edit-approved-comment')?.value?.trim();
    if(!editComment){toast('⚠ Add a comment explaining your changes','var(--amber)');document.getElementById('edit-approved-comment')?.focus();return;}
    if(!p.feedbackHistory)p.feedbackHistory=[];
    p.feedbackHistory.push({round:(p.feedbackHistory.length+1),comment:`[SAM edit] ${editComment}`,by:CU?CU.name:'SAM',at:new Date().toISOString(),status:'edited'});
    // Move back to brief stage after edit so it can be re-reviewed
    p.status='brief';
    p.publishStatus='';
  }
  p.platform=document.getElementById('cp-platform').value;
  p.creativeStyle=document.getElementById('cp-style')?.value||'';
  p.due=document.getElementById('cp-due')?.value||p.due||'';
  p.designDate=document.getElementById('cp-design-date')?.value||p.designDate||'';
  p.approvalDate=document.getElementById('cp-approval-date')?.value||p.approvalDate||'';
  p.briefDue=document.getElementById('cp-brief-date')?.value||p.briefDue||'';
  p.briefApprovalDue=document.getElementById('cp-brief-approval-date')?.value||p.briefApprovalDue||'';
  p.designDue=document.getElementById('cp-design-date')?.value||p.designDue||'';
  p.approvalDue=document.getElementById('cp-approval-date')?.value||p.approvalDue||'';
  p.briefDue=document.getElementById('cp-brief-date')?.value||p.briefDue||'';
  p.briefApprovalDue=document.getElementById('cp-brief-approval-date')?.value||p.briefApprovalDue||'';
  p.designDue=document.getElementById('cp-design-date')?.value||p.designDue||'';
  p.approvalDue=document.getElementById('cp-approval-date')?.value||p.approvalDue||'';
  p.postDate=document.getElementById('cp-post-date')?.value||p.postDate||'';
  // attachments are saved directly on add/remove, no action needed here
  p.designDate=document.getElementById('cp-design-date')?.value||p.designDate||'';
  p.approvalDate=document.getElementById('cp-approval-date')?.value||p.approvalDate||'';
  p.briefDue=document.getElementById('cp-brief-date')?.value||p.briefDue||'';
  p.briefApprovalDue=document.getElementById('cp-brief-approval-date')?.value||p.briefApprovalDue||'';
  p.designDue=document.getElementById('cp-design-date')?.value||p.designDue||'';
  p.approvalDue=document.getElementById('cp-approval-date')?.value||p.approvalDue||'';
  p.briefDue=document.getElementById('cp-brief-date')?.value||p.briefDue||'';
  p.briefApprovalDue=document.getElementById('cp-brief-approval-date')?.value||p.briefApprovalDue||'';
  p.designDue=document.getElementById('cp-design-date')?.value||p.designDue||'';
  p.approvalDue=document.getElementById('cp-approval-date')?.value||p.approvalDue||'';
  p.postDate=document.getElementById('cp-post-date')?.value||p.postDate||'';
  // attachments are saved directly on add/remove, no action needed here
  const av=document.getElementById('cp-assign').value;
  if(av){
    p.assigneeId=parseInt(av);
  } else {
    // Auto-assign to current SAM, or brand's primary SAM, or CU
    const b2=BRANDS.find(x=>x.id==CCPBid);
    const defaultId=canManage(CU)?CU.id:(b2&&b2.primarySamId)||CU.id;
    p.assigneeId=p.assigneeId||defaultId;
  }
  p.copyDir=document.getElementById('cp-copydir').value;
  p.copy=document.getElementById('cp-copy').value;
  p.caption=document.getElementById('cp-caption').value;
  p.hashtags=document.getElementById('cp-hashtags').value;
  p.visualIdea=document.getElementById('cp-visual').value;
  // TEMC fields
  p.targeting=document.getElementById('cp-targeting')?.value||p.targeting||'';
  p.elevator=document.getElementById('cp-elevator')?.value||p.elevator||'';
  p.campName=document.getElementById('cp-campname')?.value||p.campName||'';
  p.keywords=document.getElementById('cp-keywords')?.value||p.keywords||'';
  p.status=document.getElementById('cp-status').value;
  // Guard: never downgrade an already-approved/published piece via the dropdown save
  if((p.publishStatus==='ready'||p.publishStatus==='scheduled'||p.publishStatus==='published')&&
     !['approved','scheduled','published','done'].includes(p.status)){
    p.status='approved';
  }
  const commentEl=document.getElementById('cp-comment');if(commentEl)p.comment=commentEl.value;
  const toneEl=document.getElementById('cp-tone');if(toneEl)p.toneOverride=toneEl.value;
  const tEl=document.getElementById('cp-t');if(tEl)p.tOverride=tEl.value;
  const eEl=document.getElementById('cp-e');if(eEl)p.eOverride=eEl.value;
  if(!p.aiSuggestions)p.aiSuggestions={};
  if(isNew){p.id=Date.now();camp.contentPieces.push(p);}
  document.getElementById('modal-cp').remove();
  persist();buildWsMonthly(b);buildWsContent(b);
  toast(`✓ Content piece "${p.topic}" saved`,'var(--green)');
}

function approveCPPiece(){
  const b=BRANDS.find(x=>x.id==CCPBid);
  const camp=b.campaigns[CCPCampIdx];
  const p=camp.contentPieces[CCPPieceIdx];
  p.status='approved';
  const commentEl=document.getElementById('cp-comment');if(commentEl&&commentEl.value)p.comment=commentEl.value;
  document.getElementById('modal-cp').remove();
  persist();buildWsMonthly(b);buildWsContent(b);
  toast(`✓ "${p.topic}" approved`,'var(--green)');
}

// ── AI ASSIST ──
async function generateCPContent(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);
  const camp=b.campaigns[ci];
  const topic=document.getElementById('cp-topic').value.trim();
  const platform=document.getElementById('cp-platform').value;
  if(!topic){toast('⚠ Enter a topic first','var(--amber)');return;}

  const wantCopy=document.getElementById('ai-copy')?.checked;
  const wantCaption=document.getElementById('ai-caption')?.checked;
  const wantHashtags=document.getElementById('ai-hashtags')?.checked;
  const wantVisual=document.getElementById('ai-visual')?.checked;
  if(!wantCopy&&!wantCaption&&!wantHashtags&&!wantVisual){toast('⚠ Select at least one thing to generate','var(--amber)');return;}

  // Context — brand PIM + campaign T+E + overrides
  const toneOverride=document.getElementById('cp-tone')?.value||'';
  const tOverride=document.getElementById('cp-t')?.value||'';
  const eOverride=document.getElementById('cp-e')?.value||'';
  const bk=b.brandKnowledge||{};
  const tone=toneOverride||bk.toneOfVoice||'professional';
  const story=bk.overview?`Brand overview: ${bk.overview}`:'';
  const keywords=bk.positioning?`Brand positioning: ${bk.positioning}`:'';
  const insights=bk.guidelines?`Brand guidelines: ${bk.guidelines}`:'';
  const target=tOverride||camp.T||'';
  const elevator=eOverride||camp.E||'';
  const meds=Array.isArray(camp.M)?camp.M.join(', '):(camp.M||'');

  const wantList=[];
  if(wantCopy)wantList.push('Copy (full platform-appropriate post, follow tone strictly)');
  if(wantCaption)wantList.push('Caption (punchy, under 150 characters)');
  if(wantHashtags)wantList.push('Hashtags (5-8 tags, mix broad and niche, no spaces)');
  if(wantVisual)wantList.push('Visual idea (2-3 sentences describing the creative concept)');

  const prompt=`You are a marketing content writer for ${b.name}, a ${b.industry} brand.

BRAND CONTEXT:
${story}
${keywords}
${insights}
Tone of voice: ${tone}

CAMPAIGN CONTEXT:
Target audience: ${target||'General professional audience'}
Key message: ${elevator||'Brand awareness and credibility'}
Platforms: ${meds}

CONTENT PIECE:
Platform: ${platform||'LinkedIn'}
Creative style: ${document.getElementById('cp-style')?.value||'Not specified'}
Topic / angle: ${topic}

Generate ONLY the following, labelled exactly as shown:
${wantList.map((w,i)=>`${i+1}. ${w}`).join(' | ')}

Format your response as JSON only, with keys: copy, caption, hashtags, visualIdea. Only include keys for what was requested. No markdown, no explanation.`;

  const btn=document.getElementById('ai-gen-btn');
  const status=document.getElementById('ai-status');
  if(btn)btn.disabled=true;
  if(status){status.style.display='block';status.textContent='Generating with Claude...';}

  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})
    });
    const data=await resp.json();
    const text=data.content&&data.content[0]?data.content[0].text:'';
    const clean=text.replace(/```json|```/g,'').trim();
    const parsed=JSON.parse(clean);

    // Store suggestions on the piece
    const p=CCPPieceIdx===-1?null:camp.contentPieces[CCPPieceIdx];
    const sugg={};
    if(parsed.copy)sugg.copy=parsed.copy;
    if(parsed.caption)sugg.caption=parsed.caption;
    if(parsed.hashtags)sugg.hashtags=parsed.hashtags;
    if(parsed.visualIdea)sugg.visualIdea=parsed.visualIdea;

    // Show suggestions in modal
    const sugDiv=document.getElementById('ai-suggestions');
    if(sugDiv){
      sugDiv.style.display='block';
      sugDiv.innerHTML=(sugg.copy?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Copy suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px;white-space:pre-wrap">${sugg.copy}</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPField('cp-copy','${encodeURIComponent(sugg.copy)}')">Use ✓</button><div style="flex:1;display:flex;gap:6px"><input class="finp" id="refine-copy" placeholder="Refine: make it shorter..." style="font-size:11px"><button class="btn btn-sm" onclick="refineCPContent(${bid},${ci},'copy','${encodeURIComponent(sugg.copy)}')">→</button></div></div></div>`:'')+
      (sugg.caption?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Caption suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${sugg.caption}</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPField('cp-caption','${encodeURIComponent(sugg.caption)}')">Use ✓</button><div style="flex:1;display:flex;gap:6px"><input class="finp" id="refine-caption" placeholder="Refine..." style="font-size:11px"><button class="btn btn-sm" onclick="refineCPContent(${bid},${ci},'caption','${encodeURIComponent(sugg.caption)}')">→</button></div></div></div>`:'')+
      (sugg.hashtags?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Hashtags suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${sugg.hashtags}</div><div style="margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPField('cp-hashtags','${encodeURIComponent(sugg.hashtags)}')">Use ✓</button></div></div>`:'')+
      (sugg.visualIdea?`<div style="margin-top:10px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Visual idea suggestion</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;font-size:12px">${sugg.visualIdea}</div><div style="margin-top:6px"><button class="btn btn-sm btn-p" onclick="useCPField('cp-visual','${encodeURIComponent(sugg.visualIdea)}')">Use ✓</button></div></div>`:'');
    }
    if(status){status.style.display='none';}
  }catch(err){
    if(status){status.textContent='Error generating — check API or try again';status.style.color='var(--red)';}
    console.error('AI error:',err);
  }
  if(btn)btn.disabled=false;
}

function useCPField(fieldId,encoded){
  const el=document.getElementById(fieldId);
  if(el)el.value=decodeURIComponent(encoded);
}

async function refineCPContent(bid,ci,field,currentEncoded){
  const refineEl=document.getElementById('refine-'+field);
  const instruction=refineEl?refineEl.value.trim():'';
  if(!instruction){toast('⚠ Enter a refinement instruction','var(--amber)');return;}
  const current=decodeURIComponent(currentEncoded||'');
  const prompt=`Refine this ${field} based on the instruction.

Current:
${current}

Instruction: ${instruction}

Return only the refined ${field} text, no labels or explanation.`;
  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:500,messages:[{role:'user',content:prompt}]})});
    const data=await resp.json();
    const text=data.content&&data.content[0]?data.content[0].text.trim():'';
    const fieldMap={copy:'cp-copy',caption:'cp-caption',hashtags:'cp-hashtags',visualIdea:'cp-visual'};
    const el=document.getElementById(fieldMap[field]||'cp-'+field);
    if(el)el.value=text;
    toast('✓ Refined','var(--teal)');
  }catch(e){toast('Error refining','var(--red)');}
}

// ── CONTENT PLAN TAB ──
function buildWsContent(b){
  const el=document.getElementById('ws-content');if(!el)return;
  const canEdit=!!(CU&&canManage(CU));
  const SICONS={'Video':'🎬','Reel / Short':'🎬','Static image':'🖼','Carousel':'🎠','Article / Blog':'📝','Infographic':'📊','Story':'⭕','Podcast':'🎙'};
  const ST_COL={brief:'#9ca3af',inprod:'#3b82f6',review:'#f59e0b',pending:'#f59e0b',changes:'#ef4444',approved:'#22c55e',scheduled:'#14b8a6',published:'#14b8a6'};
  const ST_BG={brief:'var(--bg3)',inprod:'var(--bbg)',review:'var(--ambg)',pending:'var(--ambg)',changes:'var(--rbg)',approved:'var(--gnbg)',scheduled:'var(--tlbg)',published:'var(--tlbg)'};
  const ST_LBL={brief:'Brief',inprod:'In Prod',review:'Review',pending:'Pending',changes:'Changes',approved:'Approved',scheduled:'Scheduled',published:'Published'};

  const allPieces=[];
  b.campaigns.forEach((camp,ci)=>{
    (camp.contentPieces||[]).forEach((p,pi)=>{
      allPieces.push({p,ci,pi,camp});
    });
  });

  const mk=getBrandMonth(b.id)||CG7Month;
  const monthStart=new Date(mk+'-01');
  const daysInMonth=new Date(monthStart.getFullYear(),monthStart.getMonth()+1,0).getDate();
  const firstDay=monthStart.getDay();
  const monthLabel=monthStart.toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  const today=new Date().toISOString().split('T')[0];

  const byDate={};
  allPieces.forEach(e=>{const d=e.p.postDate||'';if(!byDate[d])byDate[d]=[];byDate[d].push(e);});

  const unscheduled=allPieces.filter(e=>!e.p.postDate);
  const scheduled=allPieces.filter(e=>!!e.p.postDate);
  const approvedCount=allPieces.filter(e=>e.p.status==='approved'||e.p.publishStatus==='published').length;

  // Stats bar
  const statuses=['brief','inprod','review','pending','approved','scheduled','published'];
  const statusCounts={};
  statuses.forEach(s=>statusCounts[s]=allPieces.filter(e=>e.p.status===s||e.p.publishStatus===s).length);

  // Unscheduled list
  var unschedHtml='';
  if(unscheduled.length){
    unschedHtml=`<div style="background:var(--bg2);border:.5px solid var(--amborder);border-radius:var(--r);padding:12px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;color:var(--amber);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">⏰ Unscheduled (${unscheduled.length})</div>`;
    unscheduled.forEach(e=>{
      const p=e.p;const col=ST_COL[p.status]||'#9ca3af';const bg=ST_BG[p.status]||'var(--bg3)';
      unschedHtml+=`<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:.5px solid var(--border)">
        <span style="font-size:14px">${SICONS[p.creativeStyle]||'📄'}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.topic||'Untitled'}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:1px">${e.camp.name}${p.platform?' · '+p.platform:''}</div>
        </div>
        <span style="font-size:10px;padding:2px 7px;border-radius:9px;background:${bg};color:${col};border:.5px solid ${col}44;flex-shrink:0">${ST_LBL[p.status]||p.status}</span>
        <input type="date" data-bid="${b.id}" data-ci="${e.ci}" data-pi="${e.pi}" value="${p.postDate||''}" onchange="setPostDateAndCalc(this.dataset.bid,this.dataset.ci,this.dataset.pi,this.value)" style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 8px;font-family:var(--font);font-size:11px;color:var(--text);cursor:pointer;flex-shrink:0">
      </div>`;
    });
    unschedHtml+='</div>';
  }

  // Calendar
  var calHtml=`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:4px">`;
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>{
    calHtml+=`<div style="text-align:center;font-size:10px;font-weight:600;color:var(--text3);padding:5px 0">${d}</div>`;
  });
  for(var i=0;i<firstDay;i++) calHtml+='<div style="min-height:80px"></div>';
  for(var day=1;day<=daysInMonth;day++){
    const dateStr=mk+'-'+String(day).padStart(2,'0');
    const pieces=byDate[dateStr]||[];
    const isToday=dateStr===today;
    const isPast=dateStr<today;
    // Detect platform clashes
    const dayPlats=[];let hasClash=false;
    pieces.forEach(e=>{const plats=e.p.platforms&&e.p.platforms.length?e.p.platforms:[e.p.platform||''];plats.filter(Boolean).forEach(pl=>{if(dayPlats.includes(pl))hasClash=true;dayPlats.push(pl);});});
    const cellBg=hasClash?'var(--rbg)':pieces.length?'var(--acbg)':isToday?'var(--bg3)':'var(--bg2)';
    const cellBdr=hasClash?'var(--rborder)':pieces.length?'var(--acb)':isToday?'var(--accent)':'var(--border)';
    calHtml+=`<div style="min-height:80px;background:${cellBg};border:.5px solid ${cellBdr};border-radius:var(--rsm);padding:4px 5px;cursor:${pieces.length?'pointer':'default'};transition:border-color .15s" ${pieces.length?`onclick="showDayPieces('${b.id}','${dateStr}')" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='${cellBdr}'"`:''}>
      <div style="font-size:10px;font-weight:${isToday?'700':'500'};color:${isToday?'var(--accent)':isPast&&!pieces.length?'var(--text3)':'var(--text2)'};margin-bottom:3px">${day}</div>`;
    pieces.slice(0,3).forEach(e=>{
      const col=ST_COL[e.p.publishStatus||e.p.status]||'#9ca3af';
      calHtml+=`<div style="font-size:9px;color:${col};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:1px 3px;background:${col}18;border-radius:3px;margin-bottom:2px;line-height:1.4" title="${e.p.topic} · ${e.camp.name}">${SICONS[e.p.creativeStyle]||'📄'} ${(e.p.topic||'').substring(0,14)}</div>`;
    });
    if(pieces.length>3) calHtml+=`<div style="font-size:9px;color:var(--text3)">+${pieces.length-3} more</div>`;
    if(hasClash) calHtml+=`<div style="font-size:9px;color:var(--red);font-weight:600">⚠ clash</div>`;
    calHtml+='</div>';
  }
  calHtml+='</div>';

  // Status legend
  const legendHtml=`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
    ${statuses.filter(s=>statusCounts[s]>0).map(s=>`<div style="display:flex;align-items:center;gap:4px">
      <span style="width:8px;height:8px;border-radius:50%;background:${ST_COL[s]};flex-shrink:0"></span>
      <span style="font-size:10px;color:var(--text3)">${ST_LBL[s]} (${statusCounts[s]})</span>
    </div>`).join('')}
  </div>`;

  el.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-size:15px;font-weight:600">Scheduling — ${b.name}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${monthLabel} · <b>${scheduled.length}</b> scheduled · <b>${unscheduled.length}</b> unscheduled · <b style="color:var(--green)">${approvedCount}</b> approved · Set post date → milestones auto-calculate</div>
      </div>
      <button class="btn btn-sm" onclick="showWsPanel('monthly',document.querySelectorAll('.wstab')[2])">← Monthly Plan</button>
    </div>
    ${legendHtml}
    ${unschedHtml}
    <div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:8px">📅 ${monthLabel}</div>
    ${calHtml}
    <div id="day-detail-panel" style="margin-top:12px"></div>
  `;
}



function updatePieceStatus(bid,ci,pi,status){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].contentPieces[pi].status=status;
  persist();buildWsContent(b);buildWsMonthly(b);
  toast(`✓ Status updated to ${CP_STATUS[status]?.label||status}`,'var(--green)');
}

function quickApprovePiece(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].contentPieces[pi].status='approved';
  persist();buildWsContent(b);buildWsMonthly(b);
  toast('✓ Piece approved','var(--green)');
}

// ── GENERATE TASKS FROM APPROVED PIECES ──
function generateTasksFromPieces(bid){
  const b=BRANDS.find(x=>x.id===bid);
  let created=0;
  b.campaigns.forEach((camp,ci)=>{
    if(!camp.contentPieces)return;
    camp.contentPieces.forEach((p,pi)=>{
      if(p.status!=='approved'||p.taskId)return;
      const gLabel=camp.g7Link||'';
      const newTask={
        id:Date.now()+created,
        title:p.topic,
        brandId:b.id,
        g7:gLabel,
        assigneeId:p.assigneeId||CU.id,
        priority:'medium',
        stage:'todo',
        due:p.due||'',
        notes:[p.copyDir?'Brief: '+p.copyDir:'',p.copy?'Copy: '+p.copy:'',p.caption?'Caption: '+p.caption:'',p.hashtags?'Hashtags: '+p.hashtags:''].filter(Boolean).join(' | '),
        challenges:'',remarks:'',score:0,files:[],
        campaignId:camp.name,
        createdAt:new Date().toISOString().split('T')[0]
      };
      TASKS.push(newTask);
      p.taskId=newTask.id;
      p.status='inprod';
      created++;
    });
  });
  persist();buildWsContent(b);buildTaskViews();buildDashboard();
  toast(`⚡ ${created} task${created!==1?'s':''} created from approved pieces`,'var(--green)');
}

// ── IMPORT / EXPORT ──
function downloadCPTemplate(bid){
  const b=BRANDS.find(x=>x.id===bid);
  const header='Campaign Name,Topic / Angle,Platform,Due Date,Assigned To,Copy Direction,Visual Idea,G Activity';
  const example=b.campaigns.length?
    `${b.campaigns[0].name},Example post — brand story,LinkedIn,2026-06-10,priya,Data-led tone highlight 3 stats,Infographic with brand colours,G6`:'';
  const csv=[header,example].join('\n')
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`${b.name.replace(/\s+/g,'_')}_Content_Plan_Template.csv`;
  a.click();
  toast('✓ Template downloaded','var(--green)');
}

function importContentPlan(event,bid){
  const file=event.target.files[0];if(!file)return;
  const b=BRANDS.find(x=>x.id===bid);
  const reader=new FileReader();
  reader.onload=function(e){
    const lines=e.target.result.trim().split('\n');
    if(lines.length<2){toast('⚠ File must have header + at least one row','var(--amber)');return;}
    const headers=lines[0].split(',').map(h=>h.trim().toLowerCase().replace(/[^a-z0-9]/g,'_'));
    const col=name=>headers.findIndex(h=>h.includes(name));
    let imported=0;
    lines.slice(1).forEach(line=>{
      const vals=line.split(',').map(v=>v.trim().replace(/^"|"$/g,''));
      const campName=vals[col('campaign')]||'';
      const topic=vals[col('topic')]||vals[col('angle')]||'';
      if(!topic)return;
      // Find or note the campaign
      let campIdx=b.campaigns.findIndex(cp=>cp.name.toLowerCase()===campName.toLowerCase());
      if(campIdx===-1&&campName){
        // Create a placeholder campaign
        b.campaigns.push({name:campName,po:'organic',T:'',E:'',M:[],C:[],A:'',start:'',status:'planning',contentPieces:[],g7Link:'',clientApproved:false});
        campIdx=b.campaigns.length-1;
      }
      if(campIdx===-1)return;
      if(!b.campaigns[campIdx].contentPieces)b.campaigns[campIdx].contentPieces=[];
      const assignee=vals[col('assigned')]?MEMBERS.find(m=>m.name.toLowerCase().includes(vals[col('assigned')].toLowerCase())||m.username===vals[col('assigned')]):null;
      b.campaigns[campIdx].contentPieces.push({
        id:Date.now()+imported,
        topic,
        platform:vals[col('platform')]||'',
        due:vals[col('due')]||vals[col('date')]||'',
        assigneeId:assignee?assignee.id:null,
        copyDir:vals[col('copy')]||vals[col('direction')]||'',
        visualIdea:vals[col('visual')]||'',
        copy:'',caption:'',hashtags:'',
        status:'brief',comment:'',taskId:null,
        tOverride:'',eOverride:'',toneOverride:'',
        aiSuggestions:{},
        g7:vals[col('g7')]||vals[col('activity')]||''
      });
      imported++;
    });
    persist();buildWsMonthly(b);buildWsContent(b);
    toast(`✓ ${imported} content pieces imported`,'var(--green)');
  };
  reader.readAsText(file);
  event.target.value='';
}
function setCampType(v){
  document.getElementById('camp-monthly-btn').className='po-btn'+(v==='monthly'?' both-on':'');
  document.getElementById('camp-ongoing-btn').className='po-btn'+(v==='ongoing'?' both-on':'');
  document.getElementById('camp-monthly-btn').dataset.val=v;
  document.getElementById('camp-type-note').textContent=v==='monthly'?'Fresh campaign for this month only':'Ongoing — carries across months (e.g. always-on LinkedIn)';
}

// ── Modal focus area helpers ──
let CModalFAs=[]; // temp focus areas while modal is open

function addModalFA(){
  CModalFAs.push({name:'',T:'',rows:[]});
  renderModalFAs();
}

function removeModalFA(fi){
  CModalFAs.splice(fi,1);
  renderModalFAs();
}

function renderModalFAs(){
  const el=document.getElementById('camp-fa-list');if(!el){console.warn('camp-fa-list not found');return;}
  if(!CModalFAs.length){el.innerHTML='';return;}
  el.innerHTML=CModalFAs.map((fa,fi)=>`
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:6px">
      <div style="display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <div class="form-row" style="margin-bottom:6px">
            <div class="fg2"><label class="flbl" style="font-size:10px">Focus area name</label><input class="finp" value="${fa.name}" placeholder="e.g. AF-X, DES, Brand..." style="font-size:11px" oninput="CModalFAs[${fi}].name=this.value"></div>
            <div class="fg2"><label class="flbl" style="font-size:10px">T — Target audience</label><input class="finp" value="${fa.T}" placeholder="Who is this targeting?" style="font-size:11px" oninput="CModalFAs[${fi}].T=this.value"></div>
          </div>
        </div>
        <button onclick="removeModalFA(${fi})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:4px;flex-shrink:0">✕</button>
      </div>
    </div>`).join('');
}



function toggleICFFARows(cb,rowsId){
  var rows=document.getElementById(rowsId);
  if(!rows)return;
  rows.style.display=cb.checked?'block':'none';
  if(cb.checked){
    var faId=cb.value.replace(/[^a-zA-Z0-9]/g,'_');
    updateICFFAQty(faId,cb.value);
  }
}

function updateICFFAQty(faId,faName){
  var allCbs=document.querySelectorAll('input[name="icf-cre"]');
  var selCres=[];
  allCbs.forEach(function(x){if(x.checked)selCres.push(x.value);});
  var qtyDiv=document.getElementById('icf-fa-qty-'+faId);
  if(!qtyDiv)return;
  if(!selCres.length){
    qtyDiv.innerHTML='<span style="font-size:11px;color:var(--text3);font-style:italic">Select C styles above first</span>';
    return;
  }
  var existing={};
  qtyDiv.querySelectorAll('input[type=number]').forEach(function(inp){existing[inp.id]=inp.value;});
  var html='';
  selCres.forEach(function(cre){
    var qid='icf-fa-qty-'+faId+'-'+cre.replace(/[^a-zA-Z0-9]/g,'_');
    var val=existing[qid]||'1';
    html+='<div style="display:flex;align-items:center;gap:5px;padding:3px 8px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm)"><span style="font-size:11px">'+cre+'</span><input type="number" min="0" max="20" value="'+val+'" id="'+qid+'" style="width:40px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:2px 4px;font-family:var(--font);font-size:11px;color:var(--text);text-align:center"></div>';
  });
  qtyDiv.innerHTML=html;
}


function icfAddFA(){
  const list=document.getElementById('icf-fa-list');if(!list)return;
  const fi=list.children.length;
  const row=document.createElement('div');
  row.style.cssText='display:flex;gap:6px;align-items:center;padding:4px 0';
  row.innerHTML='<input class="finp" placeholder="Focus area name (e.g. AF-X, DES)" style="flex:1;font-size:11px" id="icf-fa-name-'+fi+'">'
    +'<button onclick="this.parentNode.remove()" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:16px;padding:0 4px">×</button>';
  list.appendChild(row);
}

function saveInlineCampaign(bid){
  const b=BRANDS.find(x=>x.id==bid);
  const n=document.getElementById('icf-name')?.value.trim();
  if(!n){toast('⚠ Campaign name required','var(--amber)');return;}
  const meds=[...document.querySelectorAll('input[name="icf-med"]:checked')].map(x=>x.value);
  const cres=[...document.querySelectorAll('input[name="icf-cre"]:checked')].map(x=>x.value);
  const type=document.getElementById('icf-type')?.value||'monthly';
  const po=document.getElementById('icf-po')?.value||'organic';
  const currency=document.getElementById('icf-currency')?.value||'₹';
  const budgetAmt=document.getElementById('icf-budget')?.value||'';
  const T=document.getElementById('icf-T')?.value||'';
  const E=document.getElementById('icf-E')?.value||'';
  const objVal=document.getElementById('icf-obj')?.value||'';
  const objOther=document.getElementById('icf-obj-other')?.value||'';
  const objective=objVal==='Other'?objOther:objVal;
  const campTypes=[];
  if(document.getElementById('icf-type-a')?.checked)campTypes.push('A');
  if(document.getElementById('icf-type-b')?.checked)campTypes.push('B');
  if(document.getElementById('icf-type-mse')?.checked)campTypes.push('MSE');
  const fas=[];
  // Collect all qty inputs grouped by focus area
  const faMap={};
  document.querySelectorAll('input[name="icf-fa-qty"]').forEach(inp=>{
    const faName=inp.getAttribute('data-fa');
    const cre=inp.getAttribute('data-cre');
    const qty=parseInt(inp.value)||0;
    if(faName&&cre&&qty>0){
      if(!faMap[faName])faMap[faName]=[];
      faMap[faName].push({format:cre,qty:qty,platforms:[],platform:'',assigneeId:null});
    }
  });
  // Only include focus areas that are checked AND have qty>0
  document.querySelectorAll('input[name="icf-fa"]:checked').forEach(cb=>{
    const faName=cb.value;
    // Expand rows by qty into individual piece rows
    const expandedFARows=(faMap[faName]||[]).reduce((acc,r)=>{
      const qty=r.qty||1;
      for(let q=0;q<qty;q++) acc.push({format:r.format,qty:1,platforms:[],platform:'',assigneeId:null,pieceNum:qty>1?q+1:null});
      return acc;
    }, []);
    fas.push({name:faName,T:'',startDate:'',endDate:'',notes:'',rows:expandedFARows});
  });
  // Also include unchecked FAs that have qty>0 (in case checkbox missed)
  Object.keys(faMap).forEach(faName=>{
    if(!fas.find(f=>f.name===faName)){
      // Expand rows by qty into individual piece rows
      const expandedFARows=(faMap[faName]||[]).reduce((acc,r)=>{
        const qty=r.qty||1;
        for(let q=0;q<qty;q++) acc.push({format:r.format,qty:1,platforms:[],platform:'',assigneeId:null,pieceNum:qty>1?q+1:null});
        return acc;
      }, []);
      fas.push({name:faName,T:'',startDate:'',endDate:'',notes:'',rows:expandedFARows});
    }
  });
  b.campaigns.push({name:n,po,T,E,M:meds,C:cres,A:'',objective,campTypes,currency,budgetAmt,start:'',status:'planning',
    monthly:type==='monthly',contentPieces:[],monthlyRows:{},focusAreas:fas,g7Link:'',clientApproved:false});
  CNewCampOpen=false;
  persist();buildWsMonthly(b);buildWsContent(b);buildWsOverview(b);buildBrandsGrid();
  toast(`✓ Campaign "${n}" created`,'var(--green)');
}

function saveCampaign(){
  const b=BRANDS.find(x=>x.id==CCampBid),n=document.getElementById('camp-name').value.trim();
  if(!n){toast('⚠ Campaign name required','var(--amber)');return;}
  if(!CampMeds.length){toast('⚠ Select at least one medium','var(--amber)');return;}
  if(!CampCres.length){toast('⚠ Select at least one creative format','var(--amber)');return;}
  const po=document.getElementById('po-paid').dataset.val||'organic';
  let status=document.getElementById('camp-status').value;
  if(status==='active'&&!isSAM(CU)){status='planning';toast('Saved as Planning — SAM approval needed to activate','var(--amber)');}
  const campType=document.getElementById('camp-monthly-btn')?.dataset.val||'monthly';
  // Clean up focus areas — remove empty names
  const fas=CModalFAs.filter(fa=>fa.name.trim()).map(fa=>({...fa,name:fa.name.trim(),T:fa.T.trim(),rows:[]}));
  b.campaigns.push({
    name:n,po:po,
    T:document.getElementById('camp-T').value,
    E:document.getElementById('camp-E').value,
    M:CampMeds.slice(),C:CampCres.slice(),A:'',
    start:document.getElementById('camp-start').value,
    status,monthly:campType==='monthly',
    contentPieces:[],monthlyRows:{},
    focusAreas:fas,
    g7Link:'',clientApproved:false
  });
  persist();closeModal();buildWsMonthly(b);buildWsContent(b);buildWsOverview(b);buildBrandsGrid();
  toast(`✓ Campaign "${n}" created with ${fas.length} focus area${fas.length!==1?'s':''}`,'var(--green)');
}
function setPO(v){const pp=document.getElementById('po-paid'),po=document.getElementById('po-organic'),pb=document.getElementById('po-both');pp.className='po-btn';po.className='po-btn';pb.className='po-btn';if(v==='paid')pp.className='po-btn paid-on';else if(v==='organic')po.className='po-btn organic-on';else pb.className='po-btn both-on';document.getElementById('po-paid').dataset.val=v;}
var CampMeds=[];
function resetMeds(){CampMeds=[];document.querySelectorAll('.med-opt').forEach(o=>o.classList.remove('sel'));renderMedChips();document.getElementById('med-opts').classList.remove('open');}
function toggleMedOpts(){document.getElementById('med-opts').classList.toggle('open');}
function togMed(v,e){e.stopPropagation();const i=CampMeds.indexOf(v);if(i>-1)CampMeds.splice(i,1);else CampMeds.push(v);document.querySelectorAll('.med-opt').forEach(o=>{if(o.textContent===v)o.classList.toggle('sel',CampMeds.includes(v));});renderMedChips();}
function renderMedChips(){const w=document.getElementById('med-chips');if(!CampMeds.length){w.innerHTML='<span class="med-ph">Click to select platforms...</span>';return;}w.innerHTML=CampMeds.map(m=>`<div class="med-chip" onclick="rmMed('${m}',event)">${m} ×</div>`).join('');}
function rmMed(v,e){e.stopPropagation();CampMeds=CampMeds.filter(x=>x!==v);document.querySelectorAll('.med-opt').forEach(o=>{if(o.textContent===v)o.classList.remove('sel');});renderMedChips();}
var CampCres=[];
function resetCres(){CampCres=[];document.querySelectorAll('.cre-opt:not(.other)').forEach(o=>o.classList.remove('sel'));renderCreChips();document.getElementById('cre-opts').classList.remove('open');document.getElementById('other-wrap').classList.remove('open');document.getElementById('other-inp').value='';}
function toggleCreOpts(){document.getElementById('cre-opts').classList.toggle('open');}
function togCre(v,e){e.stopPropagation();const i=CampCres.indexOf(v);if(i>-1)CampCres.splice(i,1);else CampCres.push(v);document.querySelectorAll('.cre-opt:not(.other)').forEach(o=>{if(o.textContent===v)o.classList.toggle('sel',CampCres.includes(v));});renderCreChips();}
function showOtherInp(e){e.stopPropagation();document.getElementById('other-wrap').classList.add('open');document.getElementById('other-inp').focus();}
function addOtherCre(){const v=document.getElementById('other-inp').value.trim();if(!v)return;if(!CampCres.includes(v))CampCres.push(v);document.getElementById('other-inp').value='';document.getElementById('other-wrap').classList.remove('open');renderCreChips();toast(`✓ "${v}" added`,'var(--teal)');}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement===document.getElementById('other-inp'))addOtherCre();});
function renderCreChips(){const w=document.getElementById('cre-chips');if(!CampCres.length){w.innerHTML='<span class="cre-ph">Click to select creative formats...</span>';return;}w.innerHTML=CampCres.map(c=>`<div class="cre-chip" onclick="rmCre('${c.replace(/'/g,"\\'")}',event)">${c} ×</div>`).join('');}
function rmCre(v,e){e.stopPropagation();CampCres=CampCres.filter(x=>x!==v);document.querySelectorAll('.cre-opt:not(.other)').forEach(o=>{if(o.textContent===v)o.classList.remove('sel');});renderCreChips();}
document.addEventListener('click',function(e){const mo=document.getElementById('med-opts');if(mo&&!e.target.closest('#med-chips')&&!e.target.closest('#med-opts'))mo.classList.remove('open');const co=document.getElementById('cre-opts');if(co&&!e.target.closest('#cre-chips')&&!e.target.closest('#cre-opts')&&!e.target.closest('#other-wrap'))co.classList.remove('open');});

// Global data-action handler for buildCampRowsSection buttons
document.addEventListener('click',function(e){
  const btn=e.target.closest('[data-action]');if(!btn)return;
  const action=btn.dataset.action;
  const bid=btn.dataset.bid;const ci=parseInt(btn.dataset.ci);const ri=parseInt(btn.dataset.ri);
  const pi=parseInt(btn.dataset.pi);const mk=btn.dataset.mk;
  const b=bid?BRANDS.find(x=>x.id==bid):null;
  if(!b&&bid)return;
  if(action==='addRow'){addCampRow(bid,ci);}
  else if(action==='campDel'){removeCampRow(bid,ci,ri);persist();buildWsMonthly(b);}
  else if(action==='campGen'){generateCampRow(bid,ci,ri,mk);}
  else if(action==='genAll'){generateAllCampRows(bid,ci,mk);}
  else if(action==='openPiece'){openContentPiece(b.id,ci,pi);}
  else if(action==='delPiece'){
    const plan=getG7Plan(b,CG7Month);
    const planStatus=plan.status||'draft';
    if((planStatus==='approved'||planStatus==='active')&&!isSAM(CU)){
      toast('⚠ Plan is approved — only SAM can delete content pieces','var(--amber)');return;
    }
    if(confirm('Remove this content piece?')){b.campaigns[ci].contentPieces.splice(pi,1);persist();buildWsMonthly(b);buildWsContent(b);toast('Piece removed','var(--amber)');}
  }
  else if(action==='genTask'){generatePieceTask(bid,ci,pi);}
  else if(action==='submitPiece'){submitPieceForApproval(bid,ci,pi);}
  else if(action==='campFmt'){const v=btn.value||e.target.value;if(b&&b.campaigns[ci]&&b.campaigns[ci].campRows[ri])b.campaigns[ci].campRows[ri].format=v;persist();}
  else if(action==='campQty'){const v=parseInt(btn.value||e.target.value)||1;if(b&&b.campaigns[ci]&&b.campaigns[ci].campRows[ri])b.campaigns[ci].campRows[ri].qty=v;persist();}
  else if(action==='campAssign'){const v=parseInt(btn.value||e.target.value)||null;if(b&&b.campaigns[ci]&&b.campaigns[ci].campRows[ri])b.campaigns[ci].campRows[ri].assigneeId=v;persist();}
  else if(action==='campPlat'){toggleCampRowPlatPicker(bid,ci,ri,btn);}
});
function checkCampStatus(sel){
  const note=document.getElementById('camp-approve-note');
  if(sel.value==='active'&&!isSAM(CU)){
    note.style.display='block';
    sel.value='planning';
  }else{note.style.display='none';}
}

function delCamp(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  const planStatus=plan.status||'draft';
  if((planStatus==='approved'||planStatus==='active')&&!isSAM(CU)){
    toast('⚠ Plan is approved — only SAM can delete campaigns','var(--amber)');return;
  }
  if(!confirm('Delete this campaign?'))return;
  b.campaigns.splice(ci,1);persist();buildWsMonthly(b);buildWsOverview(b);buildBrandsGrid();
  toast('Campaign deleted','var(--red)');
}
// ══ G7 SUB-TASK TEMPLATES ══
// Pre-filled campaign mediums when G activity generates a campaign
const G7_CAMP_MEDIUMS={
  3:['Email','LinkedIn','WhatsApp'],                           // G4 Newsletter
  4:['LinkedIn','Instagram','Facebook','Twitter/X','YouTube'], // G5 Social Media
  5:['LinkedIn','PR/Media','SEO/Blog','Email'],                // G6 PR & Articles
  6:['LinkedIn','Instagram','Email','WhatsApp']                // G7 Events
};
const G7_CAMP_CREATIVE={
  3:['Article / Blog','Static image'],
  4:['Static image','Video','Reel / Short','Carousel','Story'],
  5:['Article / Blog','Static image','Video'],
  6:['Video','Static image','Reel / Short','Carousel']
};
// G activities that generate campaigns (not G1/G2/G3 — infrastructure)
const G7_CAMP_IDX=[3,4,5,6];

const G7_TASKS={
  0:['Brand audit & positioning review','Define brand voice & tone','Create / update logo package','Typography & colour palette guide','Sales kit / pitch deck','Brand architecture document'],
  1:['Website content audit','Define pages to update / add','Write / update page copy','Design revisions','SEO on-page updates','Test & publish'],
  2:['Keyword research (15–20 B2B terms)','On-page SEO audit','Meta tags & descriptions update','Backlink outreach','Technical SEO check','Monthly analytics report'],
  3:['Content planning & brief','Draft newsletter copy','Design layout','Review & approval','Send & performance tracking'],
  4:['SM content calendar','SM Post — brief & copy','SM Post — design / creative','Video / Reel — script','Video / Reel — shoot & edit','Publish & schedule','Performance analytics'],
  5:['PR topic & angle approval','Draft PR article / blog','Internal review','Distribute to media platforms','Case study brief & draft','Employee advocacy push','Performance tracking'],
  6:['Event brief & objective','Pre-event: teaser posts & mailer','Pre-event: logistics & branding','During: live coverage & content capture','Post-event: recap reel / blog','Post-event: thank you mailer','Impact report']
};
let CG7Bid=null,CG7Idx=null,CG7Month=null,CNewCampOpen=false;
const CG7MonthMap={}; // per-brand month tracker
function getBrandMonth(bid){return CG7MonthMap[bid]||(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'));}
function setBrandMonth(bid,mk){CG7MonthMap[bid]=mk;CG7Month=mk;}

// ══════════════════════════════════════════════
// G7 MONTHLY PLAN — Full new system
// ══════════════════════════════════════════════

function makeEmptyPlan(monthKey){
  return {month:monthKey,status:'draft',submittedAt:'',approvedAt:'',planComments:[],pimFocus:'I',masterCampaign:null,
    activities:Array(7).fill(null).map(()=>({active:false,campaignId:null,startDate:'',endDate:'',
      assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted',qty:{}}))};
}
function getG7Plan(b,monthKey){
  const mk=monthKey||CG7Month||(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'));
  if(!b.g7Plans)b.g7Plans={};
  if(!b.g7Plans[mk])b.g7Plans[mk]=makeEmptyPlan(mk);
  const plan=b.g7Plans[mk];
  // Ensure all fields exist
  if(!plan.activities||plan.activities.length<7)plan.activities=Array(7).fill(null).map(()=>({active:false,campaignId:null,startDate:'',endDate:'',assigneeId:null,notes:'',approved:false,comment:'',taskIds:[],done:false,status:'notstarted',qty:{}}));
  plan.activities.forEach(a=>{if(!a.qty)a.qty={};});
  if(!plan.pimFocus)plan.pimFocus='I';
  if(plan.masterCampaign===undefined)plan.masterCampaign=null;
  if(!plan.planComments)plan.planComments=[];
  if(!plan.monthFocusAreas)plan.monthFocusAreas=[];
  return plan;
}

// ══════════════════════════════════════════════════════
// MONTHLY PLAN TAB — unified campaign + content planning
// ══════════════════════════════════════════════════════

const PIM_FOCUS={
  P:{label:'P — Perception',desc:'Building awareness and brand recognition this month',col:'var(--blue)'},
  I:{label:'I — Influence',desc:'Building story, credibility and trust this month',col:'var(--accent2)'},
  M:{label:'M — Moment of Truth',desc:'Converting — proof, testimonials, results this month',col:'var(--green)'}
};

// FORMAT_OPTIONS and PLATFORM_OPT now use LOOKUPS (dynamic)
function getFmtOptions(){return LOOKUPS.formats||[];}
function getPlatOptions(){return LOOKUPS.platforms||[];}
const PLATFORM_OPT=['LinkedIn','Instagram','Facebook','Twitter/X','YouTube','Email','WhatsApp','SEO/Blog','PR/Media','Google Ads','Events','OOH/Print'];


function buildCampRowsSection(b,camp,ci,mk,canEdit,isClient){
  if(!camp.campRows)camp.campRows=[];
  const specs=MEMBERS.filter(m=>m.active);
  const totalQty=camp.campRows.reduce((s,r)=>s+(r.qty||0),0);
  const bid=b.id;

  const fmtSel=function(ri,val){
    return '<select data-action="campFmt" data-bid="'+bid+'" data-ci="'+ci+'" data-ri="'+ri+'" style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 5px;font-size:11px;color:var(--text);width:100%">'
      +'<option value="">— Format —</option>'
      +getFmtOptions().map(function(f){return '<option value="'+f+'"'+(f===val?' selected':'')+'>'+f+'</option>';}).join('')
      +'</select>';
  };
  const qtySel=function(ri,val){
    return '<input type="number" min="1" max="20" value="'+(val||1)+'" data-action="campQty" data-bid="'+bid+'" data-ci="'+ci+'" data-ri="'+ri+'" style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 5px;font-size:11px;color:var(--text);width:44px;text-align:center">';
  };
  const assignSel=function(ri,val){
    return '<select data-action="campAssign" data-bid="'+bid+'" data-ci="'+ci+'" data-ri="'+ri+'" style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 5px;font-size:11px;color:var(--text);width:100%">'
      +'<option value="">Assign</option>'
      +specs.map(function(m){return '<option value="'+m.id+'"'+(m.id==val?' selected':'')+'>'+m.name+'</option>';}).join('')
      +'</select>';
  };
  const platBtn=function(ri,platforms){
    var disp=(platforms&&platforms.length)?platforms.join(', '):'— Platform —';
    return '<button data-action="campPlat" data-bid="'+bid+'" data-ci="'+ci+'" data-ri="'+ri+'" style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 8px;font-size:11px;color:var(--text);cursor:pointer;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+disp+'</button>';
  };

  var rowsHtml='';
  camp.campRows.forEach(function(row,ri){
    rowsHtml+='<tr style="border-bottom:.5px solid var(--border)">'
      +'<td style="padding:5px 6px">'+fmtSel(ri,row.format)+'</td>'
      +'<td style="padding:5px 6px;text-align:center">'+qtySel(ri,row.qty)+'</td>'
      +'<td style="padding:5px 6px;position:relative;overflow:visible">'+platBtn(ri,row.platforms)+'</td>'
      +'<td style="padding:5px 6px">'+assignSel(ri,row.assigneeId)+'</td>'
      +'<td style="padding:5px 4px;text-align:center"><button data-action="campGen" data-bid="'+bid+'" data-ci="'+ci+'" data-ri="'+ri+'" data-mk="'+mk+'" style="background:var(--accent);border:none;border-radius:var(--rsm);padding:2px 8px;font-size:10px;color:#fff;cursor:pointer">⚡</button></td>'
      +'<td style="padding:5px 4px;text-align:center"><button data-action="campDel" data-bid="'+bid+'" data-ci="'+ci+'" data-ri="'+ri+'" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:13px">✕</button></td>'
      +'</tr>';
  });

  const campPieces=camp.contentPieces.filter(function(p){return !p.focusArea||p.focusArea==='';});
  var piecesHtml='';
  if(campPieces.length){
    const SICONS={'Video':'🎬','Reel':'🎬','Static image':'🖼','Carousel':'🎠','Article':'📝','Blog':'📝','Infographic':'📊','Story':'⭕','Podcast':'🎙'};
    campPieces.forEach(function(p){
      var realPi=camp.contentPieces.indexOf(p);
      var st=CP_STATUS[p.status]||CP_STATUS.brief;
      var sicon=SICONS[p.creativeStyle]||'📄';
      var assignee=p.assigneeId?MEMBERS.find(function(m){return m.id===p.assigneeId;}):null;
      piecesHtml+='<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:6px">'
        +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">'
        +'<span>'+sicon+'</span>'
        +'<div style="font-size:12px;font-weight:500;flex:1">'+p.topic+'</div>'
        +'<span style="font-size:9px;padding:2px 7px;border-radius:9px;color:'+st.col+';border:.5px solid '+st.col+';background:'+st.col+'18">'+st.label+'</span>'
        +(p.platform?'<span style="font-size:10px;color:var(--text3)">'+p.platform+'</span>':'')
        +(assignee?'<span style="font-size:10px;color:var(--text3)">'+assignee.name+'</span>':'')
        +'<button data-action="openPiece" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+realPi+'" style="'+((['approved','scheduled','published'].indexOf(p.status)>-1)?'background:var(--gnbg);border:.5px solid var(--gnb);color:var(--green)':'background:var(--accent);color:#fff')+';border-radius:var(--rsm);padding:2px 10px;font-size:10px;cursor:pointer;font-family:var(--font);font-weight:600;border:.5px solid transparent">✏ '+((['approved','scheduled','published'].indexOf(p.status)>-1)?'Edit':'Fill brief')+'</button>'
        +'<button data-action="delPiece" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+realPi+'" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:0 3px">×</button>'
        +'</div>'
        +(p.status==='brief'&&canEdit?'<button data-action="submitPiece" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+realPi+'" style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:3px 10px;font-size:11px;color:var(--amber);cursor:pointer">📤 Send to owner</button>':'')
        +((p.status==='brief'||p.status==='approved')&&canEdit&&!p.taskId&&(p.copyDir||p.copy||p.topic)?'<button data-action="genTask" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+realPi+'" style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:3px 10px;font-size:11px;color:var(--green);font-weight:600;cursor:pointer">🚀 Generate task</button>':'')
        +(p.taskId?'<span style="font-size:10px;color:var(--green);padding:2px 8px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px">✓ Task generated</span>':'')
        +(p.status==='pending'?'<span style="font-size:11px;color:var(--amber)">⏳ Pending owner approval</span>':'')
        +(['approved','scheduled','published'].indexOf(p.status)>-1?'<span style="font-size:11px;color:var(--green)">✅ '+(p.status==='approved'?'Approved':p.status==='scheduled'?'Scheduled':'Published')+(p.approvedBy?' · '+p.approvedBy:'')+'</span>':'')
        +(p.status==='changes'&&canEdit?'<button data-action="submitPiece" data-bid="'+bid+'" data-ci="'+ci+'" data-pi="'+realPi+'" style="background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);padding:2px 10px;font-size:10px;color:var(--red);cursor:pointer;font-family:var(--font);font-weight:600">📤 Resubmit to owner</button>':'')
        +'</div>'
        +(p.status==='changes'&&p.ownerComment?'<div style="margin-top:6px;padding:8px 10px;background:var(--rbg);border:.5px solid var(--rborder);border-left:3px solid var(--red);border-radius:var(--rsm);font-size:11px;color:var(--text2);line-height:1.5"><span style="font-size:10px;font-weight:700;color:var(--red);display:block;margin-bottom:3px">❌ Owner feedback:</span>'+p.ownerComment+'</div>':'')
        +'</div>';
    });
  }

  return '<div style="margin-top:4px">'
    +'<table style="width:100%;border-collapse:collapse;margin-bottom:8px;overflow:visible">'
    +'<thead><tr style="background:var(--bg4)">'
    +'<th style="padding:4px 6px;text-align:left;font-size:9px;color:var(--text3);font-weight:500">Format</th>'
    +'<th style="padding:4px 6px;text-align:center;font-size:9px;color:var(--text3);font-weight:500;width:50px">Qty</th>'
    +'<th style="padding:4px 6px;text-align:left;font-size:9px;color:var(--text3);font-weight:500">Platform</th>'
    +'<th style="padding:4px 6px;text-align:left;font-size:9px;color:var(--text3);font-weight:500">Assigned</th>'
    +'<th style="width:32px"></th><th style="width:24px"></th>'
    +'</tr></thead>'
    +'<tbody>'+rowsHtml+'</tbody>'
    +'</table>'
    +'<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">'
    +'<button data-action="addRow" data-bid="'+bid+'" data-ci="'+ci+'" style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 10px;font-size:11px;color:var(--text2);cursor:pointer">+ Row</button>'
    +'<button data-action="genAll" data-bid="'+bid+'" data-ci="'+ci+'" data-mk="'+mk+'" '+(camp.campRows.length?'':'disabled ')+' style="background:var(--accent);border:none;border-radius:var(--rsm);padding:3px 10px;font-size:11px;color:#fff;cursor:pointer">⚡ Generate '+(totalQty||'')+(totalQty>0?' piece'+(totalQty!==1?'s':''):'pieces')+'</button>'
    +(campPieces.length?'<span style="font-size:10px;color:var(--teal);padding:2px 8px;background:var(--tlbg);border-radius:9px">✓ '+campPieces.length+' pieces</span>':'')
    +'</div>'
    +(campPieces.length?'<div style="margin-top:10px;border-top:.5px solid var(--border);padding-top:10px"><div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Content briefs — '+campPieces.length+' piece'+(campPieces.length!==1?'s':'')+'</div>'+piecesHtml+'</div>':'')
    +'</div>';
}


function buildWsMonthly(b){
  const el=document.getElementById('ws-monthly');if(!el)return;
  const mk=getBrandMonth(b.id);CG7Month=mk;
  const plan=getG7Plan(b,mk);
  if(!plan.pimFocus)plan.pimFocus='I';
  const now=new Date();
  const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  const canEdit=!!(CU&&canManage(CU));
  const isClient=isBrandOwner(CU);
  const planStatus=plan.status||'draft';
  const statusColors={draft:'var(--text3)',submitted:'var(--amber)',approved:'var(--green)',changes:'var(--red)',active:'var(--teal)'};
  const statusLabels={draft:'● Draft',submitted:'⏳ Submitted',approved:'✅ Owner approved',changes:'❌ Changes requested',active:'⚡ Active'};

  // ── PIM section ──
  const pimHtml=`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:12px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.05em">PIM Focus this month</div>
      <button class="btn btn-sm" onclick="showWsPanel('pim',document.querySelectorAll('.wstab')[1])">Edit Brand Knowledge →</button>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      ${Object.entries(PIM_FOCUS).map(([k,v])=>`<button onclick="setPIMFocus('${b.id}','${k}')" style="flex:1;padding:8px 4px;border:none;font-family:var(--font);font-size:11px;font-weight:500;cursor:pointer;border-radius:var(--rsm);background:${plan.pimFocus===k?v.col+'22':'var(--bg4)'};color:${plan.pimFocus===k?v.col:'var(--text3)'};border:.5px solid ${plan.pimFocus===k?v.col:'transparent'}">${v.label}</button>`).join('')}
    </div>
    <div style="font-size:11px;color:var(--text3);margin-bottom:6px">${(PIM_FOCUS[plan.pimFocus]||PIM_FOCUS.I).desc}</div>
    ${canEdit?`<input class="finp" id="pim-remark-${b.id}" placeholder="Add remark for this month..." value="${plan.pimRemark||''}" style="font-size:11px" onchange="setPIMRemark('${b.id}',this.value)">`:''}
    ${!canEdit&&plan.pimRemark?`<div style="font-size:11px;color:var(--text2);padding:5px 8px;background:var(--bg3);border-radius:var(--rsm)">${plan.pimRemark}</div>`:''}
  </div>`;

  // ── Inline campaign form ──
  const allMeds=getPlatOptions();
  const allCres=getFmtOptions();
  const selC=allCres; // show all creative styles in FA qty (BM sets 0 to skip)
const inlineCampForm=CNewCampOpen?`<div id="inline-camp-form" style="background:var(--bg2);border:1px solid var(--accent2);border-radius:var(--r);padding:16px;margin-bottom:14px">
    <div style="font-size:13px;font-weight:600;margin-bottom:12px;color:var(--accent2)">+ New campaign — ${b.name}</div>
    <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap">
      <div style="flex:2;min-width:160px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Campaign name *</label><input id="icf-name" class="finp" placeholder="e.g. Brand recall, Product launch"></div>
      <div style="min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Type</label><select id="icf-type" class="fsel"><option value="monthly">📅 Monthly</option><option value="ongoing">🔄 Ongoing</option></select></div>
      <div style="min-width:100px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Budget type</label><select id="icf-po" class="fsel"><option value="organic">🌱 Organic</option><option value="paid">💰 Paid</option><option value="both">⚡ Both</option></select></div>
      <div style="min-width:160px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Budget amount</label>
        <div style="display:flex;gap:4px">
          <select id="icf-currency" class="fsel" style="width:70px;flex-shrink:0">
${(LOOKUPS.currencies||['₹','$','€','£','AED','SGD']).map(cur=>`<option value="${cur}">${cur}</option>`).join('')}
          </select>
          <input id="icf-budget" class="finp" type="number" min="0" placeholder="0" style="flex:1">
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Campaign objective</label>
        <select id="icf-obj" class="fsel" onchange="document.getElementById('icf-obj-other').style.display=this.value==='Other'?'block':'none'">
          <option value="">— Select objective —</option>
          <option value="Brand Awareness">Brand Awareness</option>
          <option value="Lead Generation">Lead Generation</option>
          <option value="Product Launch">Product Launch</option>
          <option value="Customer Retention">Customer Retention</option>
          <option value="Thought Leadership">Thought Leadership</option>
          <option value="Event Promotion">Event Promotion</option>
          <option value="Sales Enablement">Sales Enablement</option>
          <option value="Community Building">Community Building</option>
          <option value="Crisis Communication">Crisis Communication</option>
          <option value="Other">Other (specify)</option>
        </select>
        <input id="icf-obj-other" class="finp" placeholder="Specify objective..." style="margin-top:4px;font-size:11px;display:none">
      </div>
      <div style="flex:1;min-width:200px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:5px">Type of campaign</label>
        <div style="display:flex;gap:8px">
          <label style="display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer;padding:5px 12px;border:.5px solid var(--border);border-radius:var(--rsm);background:var(--bg3)"><input type="checkbox" id="icf-type-a" style="accent-color:var(--accent);width:12px;height:12px"> <b>A</b></label>
          <label style="display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer;padding:5px 12px;border:.5px solid var(--border);border-radius:var(--rsm);background:var(--bg3)"><input type="checkbox" id="icf-type-b" style="accent-color:var(--accent);width:12px;height:12px"> <b>B</b></label>
          <label style="display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer;padding:5px 12px;border:.5px solid var(--border);border-radius:var(--rsm);background:var(--bg3)"><input type="checkbox" id="icf-type-mse" style="accent-color:var(--accent);width:12px;height:12px"> <b>MSE</b></label>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">T — Target audience</label><input id="icf-T" class="finp" placeholder="Who is this campaign targeting?"></div>
      <div style="flex:1;min-width:200px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">E — Elevator pitch</label><input id="icf-E" class="finp" placeholder="1-2 sentence value proposition"></div>
    </div>
    <div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:5px">M — Medium</label>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${allMeds.map(m=>`<label style="display:flex;align-items:center;gap:3px;font-size:10px;cursor:pointer;padding:2px 7px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm)"><input type="checkbox" name="icf-med" value="${m}" style="accent-color:var(--accent);width:10px;height:10px"> ${m}</label>`).join('')}</div>
    </div>
    <div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:5px">C — Creative style</label>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${allCres.map(cr=>`<label style="display:flex;align-items:center;gap:3px;font-size:10px;cursor:pointer;padding:2px 7px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm)"><input type="checkbox" name="icf-cre" value="${cr}" onchange="document.querySelectorAll('input[name=icf-fa]:checked').forEach(cb=>updateICFFAQty(cb.value.replace(/[^a-zA-Z0-9]/g,'_'),cb.value))" style="accent-color:var(--accent);width:10px;height:10px"> ${cr}</label>`).join('')}</div>
    </div>

    <div style="margin-bottom:10px">
      <label style="font-size:10px;color:var(--text3);display:block;margin-bottom:5px">Focus areas <span style="color:var(--text3)">(select and set qty per creative style)</span></label>
      ${(plan.monthFocusAreas||[]).length
        ? `<div style="display:flex;flex-direction:column;gap:6px">
          ${(plan.monthFocusAreas||[]).map(fa=>`
            <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:${selC.length?'8px':'0'}">
                <input type="checkbox" name="icf-fa" value="${fa}" style="accent-color:var(--accent);width:13px;height:13px;flex-shrink:0">
                <span style="font-size:12px;font-weight:500">📌 ${fa}</span>
              </div>
              ${selC.length
                ? `<div style="display:flex;flex-wrap:wrap;gap:6px;padding-left:20px">
                  ${selC.map(cre=>`<div style="display:flex;align-items:center;gap:5px;padding:3px 8px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm)">
                    <span style="font-size:11px;color:var(--text2)">${cre}</span>
                    <input type="number" min="0" max="20" value="0" name="icf-fa-qty" data-fa="${fa}" data-cre="${cre}" style="width:40px;background:var(--bg4);border:.5px solid var(--border);border-radius:var(--rsm);padding:2px 4px;font-family:var(--font);font-size:11px;color:var(--text);text-align:center">
                  </div>`).join('')}
                </div>`
                : `<div style="font-size:11px;color:var(--text3);padding-left:20px;font-style:italic">Select C — Creative styles above first</div>`
              }
            </div>`).join('')}
          </div>`
        : `<span style="font-size:11px;color:var(--text3)">No focus areas defined for this month — add them in Step 3 above</span>`
      }
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-p" onclick="saveInlineCampaign(${b.id})">Save campaign →</button>
      <button class="btn btn-s" onclick="CNewCampOpen=false;buildWsMonthly(BRANDS.find(x=>x.id==${b.id}))">Cancel</button>
    </div>
  </div>`:'';

  // ── Campaign cards ──
  const campsHtml=b.campaigns.map((camp,ci)=>{
    if(!camp.contentPieces)camp.contentPieces=[];
    if(!camp.focusAreas)camp.focusAreas=[];
    if(!camp.monthlyRows)camp.monthlyRows={};
    const campPieces=camp.contentPieces.length;
    const campApproved=camp.contentPieces.filter(p=>p.status==='approved'||p.status==='inprod'||p.status==='done').length;

    const fasHtml=camp.focusAreas.map((fa,fi)=>{ if(!fa.name&&!(fa.rows&&fa.rows.length))return ''; 
      if(!fa.rows)fa.rows=[];
      const totalQty=fa.rows.reduce((s,r)=>s+(r.qty||0),0);
      const specs=MEMBERS.filter(m=>m.active&&m.brands&&m.brands.some(x=>x==b.id));

      // Each row is already one piece (expanded on save)
      const rowsHtml=fa.rows.map((row,ri)=>{
        const rPlatDisplay=(row.platforms&&row.platforms.length)?row.platforms.join(', '):'— Platform —';
        const rSpecOpts=MEMBERS.filter(m=>m.active).map(m=>`<option value="${m.id}" ${m.id==row.assigneeId?'selected':''}>${m.name}</option>`).join('');
        return`<tr style="border-bottom:.5px solid var(--border)">
          <td style="padding:5px 6px;font-size:11px;color:var(--text2)">${row.format||'—'}${row.pieceNum?' #'+row.pieceNum:''}</td>
          <td style="padding:5px 6px">
            <div style="position:relative">
              <div onclick="togglePlatPicker('plat-${b.id}-${ci}-${fi}-${ri}')" style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 8px;font-family:var(--font);font-size:11px;color:var(--text);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${rPlatDisplay}</div>
              <div id="plat-${b.id}-${ci}-${fi}-${ri}" style="display:none;position:absolute;top:100%;left:0;z-index:100;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:6px;min-width:160px;box-shadow:0 4px 12px #0006">
                ${getPlatOptions().map(p=>`<label style="display:flex;align-items:center;gap:6px;padding:3px 6px;font-size:11px;cursor:pointer"><input type="checkbox" ${(row.platforms||[]).includes(p)?'checked':''} onchange="toggleFARowPlat('${b.id}',${ci},${fi},${ri},'${p}',this.checked)" style="accent-color:var(--accent);width:11px;height:11px"> ${p}</label>`).join('')}
              </div>
            </div>
          </td>
          <td style="padding:5px 6px"><select style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 5px;font-family:var(--font);font-size:11px;color:var(--text);width:100%" onchange="updateFARow('${b.id}',${ci},${fi},${ri},'assigneeId',parseInt(this.value)||null)"><option value="">Assign</option>${rSpecOpts}</select></td>
          <td style="padding:5px 4px;text-align:center"><button class="btn btn-sm btn-p" style="font-size:10px;padding:2px 8px" onclick="generateFARow('${b.id}',${ci},${fi},${ri},'${mk}')">⚡</button></td>
          <td style="padding:5px 4px;text-align:center"><button onclick="removeFARow('${b.id}',${ci},${fi},${ri})" title="Delete row" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px;padding:0 3px;line-height:1;transition:color .15s" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--text3)'">×</button></td>
        </tr>`;
      }).join('');

      // Pieces for this focus area
      const faPieces=camp.contentPieces.filter(p=>p.focusArea===(fa.name||'')&&(!p.status||p.status!=='scheduled'&&p.status!=='published'));
      const faPiecesHtml=faPieces.length?`<div style="margin-top:8px;border-top:.5px solid var(--border);padding-top:10px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Content briefs — ${faPieces.length} piece${faPieces.length!==1?'s':''}</div>
        ${faPieces.map((p,pIdx)=>{
          const realPi=camp.contentPieces.indexOf(p);
          const st=CP_STATUS[p.status]||CP_STATUS.brief;
          const SICONS={'Video':'🎬','Reel / Short':'🎬','Static image':'🖼','Carousel':'🎠','Article / Blog':'📝','Infographic':'📊','Story':'⭕','Podcast':'🎙'};
          const sicon=SICONS[p.creativeStyle]||'📄';
          const assignee=p.assigneeId?MEMBERS.find(m=>m.id===p.assigneeId):null;
          return`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:6px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
              <span style="font-size:13px">${sicon}</span>
              <div style="font-size:12px;font-weight:500;flex:1">${p.topic}</div>
              <span style="font-size:9px;padding:2px 7px;border-radius:9px;color:${st.col};border:.5px solid ${st.col};background:${st.col}18">${st.label}</span>
              ${p.platform?`<span style="font-size:10px;color:var(--text3)">${p.platform}</span>`:''}
              ${assignee?`<span style="font-size:10px;color:var(--text3)">${assignee.name}</span>`:''}
              ${p.postDate?`<span style="font-size:10px;color:var(--accent2)">📤 ${p.postDate}</span>`:''}
              ${canEdit?`<button class="btn btn-sm btn-p" onclick="openContentPiece(${b.id},${ci},${realPi})" style="${['approved','scheduled','published'].includes(p.status)?'background:var(--gnbg);border-color:var(--gnb);color:var(--green)':''}">
                ${['approved','scheduled','published'].includes(p.status)?'✏ Edit':'✏ Fill brief'}
              </button>`:''}
              ${p.status==='approved'&&canEdit?`<button class="btn btn-sm" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber);font-size:10px" onclick="samEditApprovedBrief(${b.id},${ci},${realPi})" title="Edit brief after approval — task resets to To Do">🔄 Edit brief</button>`:''}
              <button onclick="deleteFAPiece(${b.id},${ci},${realPi})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:0 3px">×</button>
            </div>
            ${p.copy||p.copyDir?`<div style="font-size:11px;color:var(--text2);padding:6px 8px;background:var(--bg3);border-radius:var(--rsm);margin-bottom:6px">${p.copy?p.copy.substring(0,100)+'...':(p.copyDir?'Dir: '+p.copyDir.substring(0,80)+'...':'')}</div>`:''}
            ${p.status==='brief'&&canEdit?`<button class="btn btn-sm" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="submitPieceForApproval(${b.id},${ci},${realPi})">📤 Send to owner</button>`:''}
            ${(p.status==='brief'||p.status==='approved')&&canEdit&&!p.taskId&&(p.copyDir||p.copy||p.topic)?`<button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green);font-weight:600" onclick="generatePieceTask(${b.id},${ci},${realPi})">🚀 Generate task</button>`:''}
            ${p.taskId?`<span style="font-size:10px;color:var(--green);padding:2px 8px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px">✓ Task generated</span>`:''}
            ${p.status==='pending'?`<span style="font-size:11px;color:var(--amber)">⏳ Pending owner approval</span>`:''}
            ${p.status==='changes'?`<div style="margin-top:8px;padding:10px 12px;background:var(--rbg);border:.5px solid var(--rborder);border-left:3px solid var(--red);border-radius:var(--rsm)">
              <div style="font-size:10px;font-weight:700;color:var(--red);margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em">❌ Owner feedback — changes requested</div>
              <div style="font-size:12px;color:var(--text);line-height:1.5;margin-bottom:8px">${p.ownerComment||'No comment provided'}</div>
              ${canEdit?`<button class="btn btn-sm" style="background:var(--rbg);border-color:var(--rborder);color:var(--red)" onclick="submitPieceForApproval(${b.id},${ci},${realPi})">📤 Resubmit to owner</button>`:''}
            </div>`:''}
            ${['approved','scheduled','published'].includes(p.status)?`<span style="font-size:11px;color:var(--green)">✅ ${p.status==='approved'?'Approved':p.status==='scheduled'?'Scheduled':'Published'}${p.approvedBy?' · '+p.approvedBy:''}</span>`:''}
          </div>`;
        }).join('')}
      </div>`:'';

      return`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <input value="${fa.name||''}" placeholder="Focus area name..." style="background:transparent;border:none;border-bottom:1.5px solid ${b.color};font-size:13px;font-weight:600;color:${b.color};font-family:var(--font);padding:2px 4px;min-width:100px;max-width:220px;outline:none" onchange="updateFAName('${b.id}',${ci},${fi},this.value)">
          ${fa.startDate||fa.endDate?`<span style="font-size:10px;color:var(--text3);padding:1px 6px;background:var(--bg4);border-radius:var(--rsm)">${fa.startDate||''}${fa.endDate?' → '+fa.endDate:''}</span>`:''}
          <div style="flex:1"></div>
          ${fa.notes?`<span style="font-size:10px;color:var(--text2);font-style:italic;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fa.notes.substring(0,50)}</span>`:''}
          <button class="btn btn-sm" onclick="editFocusArea('${b.id}',${ci},${fi})">⚙ Details</button>
          <button onclick="removeFocusArea('${b.id}',${ci},${fi})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:18px;padding:0 4px;line-height:1">×</button>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px">
          <thead><tr style="background:var(--bg4)">
            <th style="padding:4px 6px;text-align:left;font-size:9px;color:var(--text3);font-weight:500">Format</th>
            <th style="padding:4px 6px;text-align:left;font-size:9px;color:var(--text3);font-weight:500">Platform</th>
            <th style="padding:4px 6px;text-align:left;font-size:9px;color:var(--text3);font-weight:500">Assigned</th>
            <th style="padding:4px 6px;text-align:center;font-size:9px;color:var(--text3);font-weight:500;width:32px">⚡</th>
            <th style="padding:4px 6px;text-align:center;font-size:9px;color:var(--text3);font-weight:500;width:24px"></th>
          </tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:${faPieces.length?'12px':'0'}">
          <button class="btn btn-sm" onclick="addFARow('${b.id}',${ci},${fi})">+ Row</button>
          <button class="btn btn-sm btn-p" onclick="generateFAPieces('${b.id}',${ci},${fi},'${mk}')" ${!fa.rows.length?'disabled style="opacity:.4;cursor:not-allowed"':''}>⚡ Generate all</button>
        </div>
        ${faPiecesHtml}
      </div>`;
    }).join('');

    return`<div data-camp-id="${ci}" style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);margin-bottom:10px;overflow:visible">
      <div class="camp-header" style="display:flex;align-items:center;gap:8px;padding:12px 14px;cursor:pointer;flex-wrap:wrap" onclick="toggleCampExpand('${b.id}',${ci},this)">
        <span class="camp-arrow" style="font-size:11px;color:var(--text3);flex-shrink:0">▼</span>
        <div style="font-size:13px;font-weight:600">${camp.name}</div>
        <span style="font-size:9px;padding:2px 7px;border-radius:9px;background:${camp.monthly===false?'var(--tlbg)':'var(--acbg)'};color:${camp.monthly===false?'var(--teal)':'var(--accent2)'};border:.5px solid ${camp.monthly===false?'var(--tlborder)':'var(--acb)'}">${camp.monthly===false?'🔄 Ongoing':'📅 Monthly'}</span>
        ${camp.objective?`<span style="font-size:9px;padding:2px 7px;border-radius:9px;background:var(--bg3);color:var(--text2);border:.5px solid var(--border)">🎯 ${camp.objective}</span>`:''}
        ${camp.campTypes&&camp.campTypes.length?camp.campTypes.map(t=>`<span style="font-size:9px;padding:2px 7px;border-radius:9px;background:${t==='A'?'var(--rbg)':t==='B'?'var(--blbg)':'var(--gnbg)'};color:${t==='A'?'var(--red)':t==='B'?'var(--blue)':'var(--green)'};border:.5px solid ${t==='A'?'var(--rborder)':t==='B'?'rgba(91,174,247,.35)':'var(--gnb)'}">${t}</span>`).join(''):''}
        <div class="badge ${camp.status==='active'?'bg':camp.status==='planning'?'ba':camp.status==='paused'?'br':'bgr'}">${camp.status==='active'?'🟢 Active':camp.status==='planning'?'📋 Planning':camp.status==='paused'?'⏸ Paused':'✅ Complete'}</div>
        ${camp.budgetAmt?`<span style="font-size:10px;color:var(--text2);padding:1px 7px;background:var(--bg3);border-radius:9px;border:.5px solid var(--border)">${camp.currency||'₹'}${Number(camp.budgetAmt).toLocaleString('en-IN')}</span>`:''}
        <div style="flex:1"></div>
        ${campPieces?`<span style="font-size:10px;color:var(--text3)">${campApproved}/${campPieces} approved</span>`:''}
        ${canEdit?`<button class="btn btn-sm" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber);font-weight:600" onclick="event.stopPropagation();openSendToOwnerModal('${b.id}',${ci})">📤 Owner</button>`:''}
        ${camp.ownerStatus==='pending'?`<span style="font-size:10px;color:var(--amber);padding:2px 7px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:9px">⏳ Awaiting owner</span>`:''}
        ${camp.ownerStatus==='approved'?`<span style="font-size:10px;color:var(--green);padding:2px 7px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px">✅ Owner approved</span>`:''}
        ${camp.ownerStatus==='changes'?`<span style="font-size:10px;color:var(--red);padding:2px 7px;background:var(--rbg);border:.5px solid var(--rborder);border-radius:9px">❌ Changes requested</span>`:''}
        ${camp.status==='planning'&&canEdit?`<button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green);font-weight:600" onclick="event.stopPropagation();launchCampaign('${b.id}',${ci})">🚀 Launch</button>`:''}
        ${camp.status==='active'&&isSAM(CU)?`<button class="btn btn-sm" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="event.stopPropagation();pauseCampaign('${b.id}',${ci})">⏸ Pause</button>`:''}
        <button class="btn btn-sm" onclick="event.stopPropagation();openEditCampaign('${b.id}',${ci})">✏ Edit</button>
        ${(planStatus==='draft'||planStatus==='submitted'||planStatus==='changes')||isSAM(CU)?`<button onclick="event.stopPropagation();delCamp('${b.id}',${ci})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:16px;padding:0 4px" title="Delete campaign">×</button>`:''}
      </div>
      <div class="camp-body" style="padding:10px 14px 14px;border-top:.5px solid var(--border)">
      ${camp.ownerStatus==='changes'&&camp.ownerComments&&camp.ownerComments.filter(c=>c.type==='changes').length?`<div style="padding:10px 12px;background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);margin-bottom:10px">
        <div style="font-size:10px;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">❌ Owner requested changes</div>
        ${camp.ownerComments.filter(c=>c.type==='changes').map(c=>`<div style="font-size:12px;color:var(--text);margin-bottom:4px">"${c.text}"</div><div style="font-size:10px;color:var(--text3)">${c.by} · ${new Date(c.at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>`).join('')}
      </div>`:''}
      <div style="font-size:11px;color:var(--text2);padding:7px 10px;background:var(--bg3);border-radius:var(--rsm);margin-bottom:10px;display:flex;gap:16px;flex-wrap:wrap">
        <span style="flex-basis:100%"><span style="color:var(--text3)">E:</span> ${camp.E||'<span style="color:var(--red)">Not set</span>'}</span>
        ${camp.M&&camp.M.length?`<span><span style="color:var(--text3)">M:</span> ${(Array.isArray(camp.M)?camp.M:[''+camp.M]).join(', ')}</span>`:''}
      </div>
  ${camp.focusAreas&&camp.focusAreas.filter(fa=>fa.name).length
    ? fasHtml
    : buildCampRowsSection(b,camp,ci,mk,canEdit,isClient)}
    </div>`;
  }).join('');

  // ── Standalone activities G1/G2/G3 ──
  const G1_ITEMS=LOOKUPS.g1Deliverables||['Brand guidelines doc','Sales kit','Pitch deck','Brand architecture','Messaging framework','Visual identity'];
  const G2_ITEMS=LOOKUPS.g2WorkTypes||['New page','Content update','Landing page','Design fix','Technical fix','Performance'];
  const G3_ITEMS=LOOKUPS.g3SeoFocus||['Keyword research','On-page optimisation','Backlink building','Technical audit','Content gap analysis','Local SEO'];
  const G_ITEMS=[G1_ITEMS,G2_ITEMS,G3_ITEMS];
  const G_COLORS=['var(--accent2)','var(--blue)','var(--teal)'];
  const G_BKGS=['var(--acbg)','var(--blbg)','var(--tlbg)'];
  const G_BORDERS=['var(--acb)','rgba(91,174,247,.35)','var(--tlborder)'];
  const G_FIELD=['deliverables','workTypes','seoFocus'];
  const G_TOGGLE=['toggleG1Deliverable','toggleG2WorkType','toggleG3Focus'];
  const specs=MEMBERS.filter(m=>m.active&&(m.role==='specialist'||m.role==='bm'||m.role==='sam'));

  const standaloneIdx=[0,1,2];
  const standaloneRows=standaloneIdx.map(i=>{
    const act=plan.activities[i];
    if(!act.briefData)act.briefData={};
    if(!act.deliverableBriefs)act.deliverableBriefs={};
    const items=G_ITEMS[i];
    const fieldKey=G_FIELD[i];
    const selected=act.briefData[fieldKey]||[];
    const specOpts=specs.map(m=>`<option value="${m.id}">${m.name} (${roleLabel(m.role)})</option>`).join('');

    // Overall activity status from deliverable briefs
    const allBriefs=selected.map(d=>act.deliverableBriefs[d]||{});
    const anyPending=allBriefs.some(bd=>bd.status==='owner-pending');
    const anyApproved=allBriefs.some(bd=>bd.status==='approved'||bd.status==='owner-approved');
    const allDone=selected.length>0&&allBriefs.every(bd=>bd.status==='done'||bd.status==='approved');
    const overallStatusCol=anyPending?'var(--amber)':anyApproved?'var(--green)':'var(--text3)';
    const overallStatusLbl=anyPending?'⏳ In progress':anyApproved?'✅ Active':selected.length?'● Briefing':'Not started';

    // Deliverable checkboxes
    const checkboxes=items.map(item=>`<label onclick="event.stopPropagation()" style="display:flex;align-items:center;gap:4px;font-size:11px;cursor:pointer;padding:3px 8px;background:${selected.includes(item)?G_BKGS[i]:'var(--bg3)'};border:.5px solid ${selected.includes(item)?G_BORDERS[i]:'var(--border)'};border-radius:var(--rsm);color:${selected.includes(item)?G_COLORS[i]:'var(--text2)'}"><input type="checkbox" ${selected.includes(item)?'checked':''} onchange="${G_TOGGLE[i]}('${b.id}',${i},'${item}',this.checked)" style="accent-color:var(--accent);width:11px;height:11px"> ${item}</label>`).join('');

    // Per-deliverable brief cards
    const deliverableCards=selected.map(delivName=>{
      const bd=act.deliverableBriefs[delivName]||{};
      if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
      const dKey=delivName.replace(/[^a-zA-Z0-9]/g,'_');
      const dStatus=bd.status||'notstarted';
      const dStatusCol={notstarted:'var(--text3)',notstarted:'var(--text3)','owner-pending':'var(--amber)','owner-approved':'var(--green)','owner-changes':'var(--red)',approved:'var(--green)',done:'var(--teal)'}[dStatus]||'var(--text3)';
      const dStatusLbl={notstarted:'Not started','owner-pending':'⏳ Pending owner','owner-approved':'✅ Owner approved','owner-changes':'❌ Changes needed',approved:'✅ Active',done:'✓ Done'}[dStatus]||'Not started';
      const dExpanded=bd._expanded||false;
      const dAssignee=MEMBERS.find(m=>m.id==bd.assigneeId);

      // Linked tasks for this deliverable
      const dTasks=TASKS.filter(t=>t.brandId==b.id&&t.deliverableRef===`${b.id}-${i}-${dKey}`);
      const dTasksHtml=dTasks.length?'<div style="margin-bottom:10px">'+dTasks.map(t=>{
        const s=STAGES[t.stage]||{};
        const ta=MEMBERS.find(m=>m.id==t.assigneeId);
        const tid=t.id;
        const bid2=b.id;
        return '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:4px">'
          +'<div style="flex:1;font-size:12px;font-weight:500">'+t.title+'</div>'
          +(ta?'<span style="font-size:10px;color:var(--text3)">'+ta.name+'</span>':'')
          +'<span style="font-size:10px;padding:1px 8px;border-radius:3px;background:'+(s.bg||'var(--bg3)')+';color:'+(s.color||'var(--text3)')+'">'+( s.label||t.stage)+'</span>'
          +'<button onclick="openTaskDetail('+tid+')" style="background:none;border:none;color:var(--accent2);cursor:pointer;font-size:11px;padding:2px 6px" title="Edit task">✏</button>'
          +'<button onclick="deleteDeliverableTask('+tid+','+bid2+')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:2px 4px" title="Delete task">×</button>'
          +'</div>';
      }).join('')+'</div>':'';

      // Files
      const dFiles=bd.files||[];
      const dFilesHtml=dFiles.map((f,fi)=>`<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:3px"><span style="font-size:12px">📎</span><div style="flex:1;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.name}</div><span style="font-size:10px;color:var(--text3)">${f.size}</span><button onclick="removeDeliverableFile('${b.id}',${i},'${delivName}',${fi})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:13px;padding:0" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--text3)'">×</button></div>`).join('');

      const briefForm=!dExpanded?'':(`
        <div style="padding:12px;background:var(--bg2);border:.5px solid var(--border);border-radius:0 0 var(--rsm) var(--rsm);margin-top:-1px">
          <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
            <div style="flex:1;min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Start date</label><input class="finp" type="date" style="font-size:11px" value="${bd.startDate||act.startDate||''}" onchange="setDeliverableField('${b.id}',${i},'${delivName}','startDate',this.value)"></div>
            <div style="flex:1;min-width:110px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">End date</label><input class="finp" type="date" style="font-size:11px" value="${bd.endDate||act.endDate||''}" onchange="setDeliverableField('${b.id}',${i},'${delivName}','endDate',this.value)"></div>
            <div style="flex:1;min-width:130px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Assigned to</label><select class="fsel" style="font-size:11px" onchange="setDeliverableField('${b.id}',${i},'${delivName}','assigneeId',this.value)"><option value="">Assign</option>${specOpts.replace('selected','').replace(`value="${bd.assigneeId}"`,`value="${bd.assigneeId}" selected`)}</select></div>
          </div>
          <div style="margin-bottom:8px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:3px">Instructions</label><textarea class="ftxt" style="min-height:46px;font-size:11px" placeholder="Requirements, references, deliverables..." oninput="setDeliverableField('${b.id}',${i},'${delivName}','notes',this.value)">${bd.notes||''}</textarea></div>
          <div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3);display:block;margin-bottom:5px">Attachments</label>${dFilesHtml}<label style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);font-size:11px;color:var(--text2);cursor:pointer" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border2)'">📎 Attach file<input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.zip" style="display:none" onchange="uploadDeliverableFile('${b.id}',${i},'${delivName}',this)"></label></div>
          ${dTasksHtml}
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button class="btn btn-sm" onclick="setDeliverableField('${b.id}',${i},'${delivName}','_saved',true);persist();toast('✓ Saved','var(--green)')">💾 Save</button>
            ${bd.notes&&dStatus!=='owner-pending'&&dStatus!=='owner-approved'&&dStatus!=='approved'?`
              <button class="btn btn-sm" style="background:var(--ambg);border-color:var(--amborder);color:var(--amber);font-weight:600" onclick="sendDeliverableToOwner('${b.id}',${i},'${delivName}')">📤 Send to owner</button>
              <button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green);font-weight:600" onclick="generateDeliverableTask('${b.id}',${i},'${delivName}')">🚀 Generate task</button>
            `:''}
            ${dStatus==='owner-pending'?`<span style="font-size:11px;color:var(--amber);padding:4px 10px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:9px">⏳ Awaiting owner</span>`:''}
            ${dStatus==='owner-approved'?`<span style="font-size:11px;color:var(--green)">✅ Owner approved</span><button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green);font-weight:600" onclick="generateDeliverableTask('${b.id}',${i},'${delivName}')">🚀 Generate task</button>`:''}
            ${dTasks.length?`<span style="font-size:10px;color:var(--green);padding:2px 8px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px">✓ ${dTasks.length} task${dTasks.length>1?'s':''} generated</span><button class="btn btn-sm btn-p" onclick="addDeliverableTask('${b.id}',${i},'${delivName}')">+ Add another</button>`:''}
            ${!bd.notes&&!dTasks.length?`<span style="font-size:11px;color:var(--text3)">Fill brief above to unlock actions</span>`:''}
          </div>
        </div>`);

      return`<div style="border:.5px solid ${dExpanded?G_BORDERS[i]:'var(--border)'};border-radius:var(--rsm);margin-bottom:6px;overflow:visible">
        <div onclick="toggleDeliverableExpand('${b.id}',${i},'${delivName}')" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--bg3);cursor:pointer;user-select:none">
          <span style="font-size:13px">${dStatus==='approved'||dStatus==='done'?'✅':dStatus==='owner-pending'?'⏳':dStatus==='owner-approved'?'👁':'📋'}</span>
          <div style="flex:1"><div style="font-size:12px;font-weight:500">${delivName}</div>${dAssignee?`<div style="font-size:10px;color:var(--text3)">${dAssignee.name}${bd.endDate?' · Due: '+bd.endDate:''}</div>`:''}</div>
          ${dTasks.length?`<span style="font-size:10px;color:var(--text3)">${dTasks.filter(t=>t.stage==='completed'||t.stage==='approved').length}/${dTasks.length} tasks</span>`:''}
          <span style="font-size:10px;color:${dStatusCol};padding:1px 7px;background:${dStatusCol}18;border:.5px solid ${dStatusCol}44;border-radius:9px">${dStatusLbl}</span>
          <span style="font-size:11px;color:var(--text3)">${dExpanded?'▲':'▼'}</span>
        </div>
        ${briefForm}
      </div>`;
    }).join('');

    return`<div style="border-bottom:.5px solid var(--border)">
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;cursor:pointer" onclick="toggleStandaloneExpand('${b.id}',${i})">
        <input type="checkbox" ${act.active?'checked':''} onchange="toggleG7Active('${b.id}',${i},this.checked);event.stopPropagation()" style="accent-color:var(--accent);width:14px;height:14px;flex-shrink:0" onclick="event.stopPropagation()">
        <div style="width:28px;height:28px;border-radius:7px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0">G${i+1}</div>
        <div style="flex:1"><div style="font-size:12px;font-weight:500">${G7_NAMES[i]}</div>${act.active&&selected.length?`<div style="font-size:10px;color:var(--text3)">${selected.length} deliverable${selected.length>1?'s':''}</div>`:''}</div>
        ${act.active?`<span style="font-size:10px;color:${overallStatusCol}">● ${overallStatusLbl}</span>`:''}
        ${act.active?`<span style="color:var(--text3);font-size:11px">${act.briefData._expanded?'▲':'▼'}</span>`:''}
      </div>
      ${act.active&&act.briefData._expanded?`<div style="margin:0 0 12px 42px">
        <div style="margin-bottom:8px"><div style="display:flex;flex-wrap:wrap;gap:5px">${checkboxes}</div></div>
        ${selected.length?deliverableCards:`<div style="font-size:11px;color:var(--text3);padding:8px 0">Select deliverables above to create briefs</div>`}
      </div>`:''}
    </div>`;
  }).join('');

  // ── Count totals ──
  let totalPlanned=0;
  b.campaigns.forEach(camp=>{
    (camp.focusAreas||[]).forEach(fa=>{(fa.rows||[]).forEach(r=>totalPlanned+=r.qty||0);});
  });
  const totalPieces=b.campaigns.reduce((s,c)=>s+(c.contentPieces||[]).length,0);
  const approvedPieces=b.campaigns.reduce((s,c)=>s+(c.contentPieces||[]).filter(p=>p.status==='approved'||p.status==='inprod'||p.status==='done').length,0);

  // Step completion state
  const monthDone=true; // always done — month is always selected
  const pimDone=!!(plan.pimFocus);
  const campsDone=b.campaigns.length>0;

  el.innerHTML=`
  <!-- Clean top bar: month picker + status + add campaign -->
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
    <input type="month" value="${mk}" onchange="changeG7MonthDirect('${b.id}',this.value)"
      style="padding:6px 12px;background:var(--bg2);border:1.5px solid var(--accent);border-radius:var(--rsm);font-family:var(--font);font-size:13px;font-weight:600;color:var(--accent2);cursor:pointer;outline:none"/>
    <div style="font-size:13px;font-weight:600;color:var(--text)">${monthLabel}</div>
    <span style="font-size:11px;color:${statusColors[planStatus]};padding:3px 10px;background:${statusColors[planStatus]}18;border:.5px solid ${statusColors[planStatus]}44;border-radius:9px">${statusLabels[planStatus]}</span>
    <div style="flex:1"></div>
    ${!CNewCampOpen&&canEdit?`<button class="btn btn-sm btn-p" onclick="openAddCampaign(${b.id})">+ Add campaign</button>`:''}
  </div>

  <!-- Campaign list -->
  <div style="margin-bottom:12px">
    ${inlineCampForm}
    ${b.campaigns.length?campsHtml:`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:32px;text-align:center;color:var(--text3)"><div style="font-size:32px;margin-bottom:8px;opacity:.3">🎯</div><div style="font-size:13px;margin-bottom:4px;color:var(--text2)">No campaigns yet</div><div style="font-size:11px">Click <b>+ Add campaign</b> to get started</div></div>`}
  </div>

  <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:12px">
    <div style="font-size:12px;font-weight:500;color:var(--text2);margin-bottom:10px">Standalone activities <span style="font-size:11px;font-weight:400;color:var(--text3)">(G1, G2, G3 — tasks only)</span></div>
    ${standaloneRows}
  </div>

  <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:12px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:4px"><b>${totalPlanned}</b> planned · <b>${totalPieces}</b> pieces · <b style="color:var(--green)">${approvedPieces}</b> approved</div>
        ${plan.submittedAt?`<div style="font-size:10px;color:var(--text3)">Submitted: ${plan.submittedAt}${plan.approvedBy?' · Approved by: '+plan.approvedBy:''}</div>`:''}
        ${plan.ownerComment?`<div style="font-size:11px;color:var(--red);margin-top:4px">💬 Owner: "${plan.ownerComment}"</div>`:''}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        ${totalPieces?`<button class="btn btn-sm" onclick="showWsPanel('content',document.querySelectorAll('.wstab')[3])">View Calendar →</button>`:''}
        ${canEdit&&(planStatus==='draft'||planStatus==='changes')?`
          <button class="btn btn-p" onclick="submitG7Plan('${b.id}')" style="padding:8px 20px;font-size:13px">
            📤 Submit month for owner approval
          </button>`:''}
        ${planStatus==='submitted'?`
          <span style="font-size:11px;color:var(--amber);padding:5px 12px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:9px">⏳ Awaiting owner approval</span>
          ${canEdit?`<button class="btn btn-sm btn-s" onclick="resetG7Plan('${b.id}')">↩ Recall & edit</button>`:''}
          ${isSAM(CU)?`<button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="approvePlanSAM('${b.id}')">✓ SAM approve</button>`:''}
          `:''}
        ${planStatus==='approved'&&isSAM(CU)?`
          <span style="font-size:11px;color:var(--green);padding:5px 12px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px">✅ Owner approved</span>
          <button class="btn btn-p" onclick="activateG7Plan('${b.id}')" style="padding:8px 20px;font-size:13px;background:var(--green)">
            ⚡ Activate plan → assign to specialists
          </button>`:''}
        ${planStatus==='approved'&&!isSAM(CU)?`
          <span style="font-size:11px;color:var(--green);padding:5px 12px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px">✅ Approved — awaiting SAM activation</span>`:''}
        ${planStatus==='active'?`
          <span style="font-size:11px;color:var(--teal);padding:5px 12px;background:var(--tbg);border:.5px solid rgba(45,212,191,.3);border-radius:9px">⚡ Active — specialists notified</span>
          ${isSAM(CU)?`<button class="btn btn-sm btn-s" onclick="resetG7Plan('${b.id}')">Edit plan</button>`:''}
          `:''}
      </div>
    </div>
  </div>`;
}

function addMonthFA(bid,mk){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,mk);
  const sel=document.getElementById('fa-month-select-'+bid);
  if(!sel||!sel.value){toast('Select a focus area first','var(--amber)');return;}
  if(!plan.monthFocusAreas)plan.monthFocusAreas=[];
  if(plan.monthFocusAreas.includes(sel.value)){toast('Already added','var(--amber)');return;}
  plan.monthFocusAreas.push(sel.value);
  persist();buildWsMonthly(b);
  toast('✓ '+sel.value+' added','var(--green)');
}

function removeMonthFA(bid,mk,fa){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,mk);
  if(!plan.monthFocusAreas)return;
  plan.monthFocusAreas=plan.monthFocusAreas.filter(f=>f!==fa);
  persist();buildWsMonthly(b);
}


function setPIMFocus(bid,focus){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.pimFocus=focus;
  persist();buildWsMonthly(b);
  toast(`PIM focus → ${PIM_FOCUS[focus].label}`,'var(--accent2)');
}

function setPIMRemark(bid,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.pimRemark=val;
  persist();
}

// ── Plan row helpers ──
function addPlanRow(bid,ci,mk){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b.campaigns[ci].monthlyRows)b.campaigns[ci].monthlyRows={};
  if(!b.campaigns[ci].monthlyRows[mk])b.campaigns[ci].monthlyRows[mk]=[];
  b.campaigns[ci].monthlyRows[mk].push({format:'',qty:1,platform:'',assigneeId:null});
  persist();buildWsMonthly(b);
}

function removePlanRow(bid,ci,mk,ri){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].monthlyRows[mk].splice(ri,1);
  persist();buildWsMonthly(b);
}

function updatePlanRow(bid,ci,mk,ri,field,val){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b.campaigns[ci].monthlyRows[mk])return;
  b.campaigns[ci].monthlyRows[mk][ri][field]=val;
  persist();
}

// ── Generate content pieces from plan rows ──
function generatePieces(bid,ci,mk){
  const b=BRANDS.find(x=>x.id==bid);
  const camp=b.campaigns[ci];
  if(!camp.monthlyRows[mk])return;
  const rows=camp.monthlyRows[mk];
  if(!camp.contentPieces)camp.contentPieces=[];
  let created=0;
  const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
  rows.forEach(row=>{
    if(!row.format)return;
    const qty=row.qty||1;
    for(let i=1;i<=qty;i++){
      // Skip if piece already exists for this format+month+index
      const focusTag=row.focus?` [${row.focus}]`:'';
      const existingTitle=`${row.format}${qty>1?' '+i:''}${focusTag} — ${monthLabel}`;
      if(camp.contentPieces.find(p=>p.topic===existingTitle&&p.month===mk))continue;
      camp.contentPieces.push({
        id:Date.now()+created,
        topic:existingTitle,
        platform:row.platform||'',
        creativeStyle:row.format||'',
        g7:row.g||camp.g7Link||'',
        focusArea:row.focus||'',
        month:mk,
        due:'',
        assigneeId:row.assigneeId||null,
        copyDir:'',visualIdea:'',copy:'',caption:'',hashtags:'',
        status:'brief',comment:'',taskId:null,
        tOverride:'',eOverride:'',toneOverride:'',aiSuggestions:{}
      });
      created++;
    }
  });
  persist();buildWsMonthly(b);buildWsContent(b);
  toast(`✓ ${created} content piece${created!==1?'s':''} created in Scheduling`,'var(--green)');
}

// ── Edit campaign T+E inline ──
function launchCampaign(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  if(!isSAM(CU)&&!canManage(CU)){toast('⚠ Only SAM can launch a campaign','var(--amber)');return;}
  camp.status='active';camp.launchedAt=new Date().toISOString();camp.launchedBy=CU.name;
  persist();buildWsMonthly(b);buildBrandsGrid();buildDashboard();
  toast(`🚀 "${camp.name}" is now Active!`,'var(--green)');
}
function pauseCampaign(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  camp.status='paused';persist();buildWsMonthly(b);buildBrandsGrid();
  toast(`⏸ "${camp.name}" paused`,'var(--amber)');
}
function openEditCampaign(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  // Close any open wizard first
  const ex=document.getElementById('campaign-wizard');if(ex)ex.remove();
  // Set CWizard with edit mode BEFORE building the overlay
  CWizard={
    open:true,step:1,bid:b.id,
    month:CG7Month||new Date().toISOString().substring(0,7),
    editMode:true,editCi:ci,
    data:{
      name:camp.name||'',
      nameMode:'custom',
      budgetType:camp.po||camp.budgetType||'organic',
      currency:camp.currency||'INR ₹',
      budget:camp.budgetAmt||'',
      campFocus:Array.isArray(camp.campFocus)?[...camp.campFocus]:[],
      outcome:camp.outcome||'',
      T:camp.T||'',
      E:camp.E||'',
      objective:camp.objective||'Brand Awareness',
      M:Array.isArray(camp.M)?[...camp.M]:[],
      C:Array.isArray(camp.C)?[...camp.C]:[],
      campTypes:camp.campTypes||[],
      rows:[],
      status:camp.status||'planning',
      notes:camp.notes||''
    }
  };
  // Create overlay (wizardHTML reads from CWizard which is now set)
  const el=document.createElement('div');
  el.id='campaign-wizard';el.className='wiz-overlay';
  el.onclick=()=>wizardClose();
  el.innerHTML=wizardHTML().replace('New Campaign','Edit Campaign');
  document.body.appendChild(el);
  renderWizardStep();
}
// Keep backward compat

// ══ FOCUS AREA FUNCTIONS ══
function addFocusArea(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b.campaigns[ci].focusAreas)b.campaigns[ci].focusAreas=[];
  // Add empty focus area directly and rebuild
  b.campaigns[ci].focusAreas.push({name:'',T:'',startDate:'',endDate:'',notes:'',rows:[]});
  persist();buildWsMonthly(b);
  // Focus the new name input after render
  setTimeout(()=>{
    const inputs=document.querySelectorAll('input[placeholder="Focus area name..."]');
    if(inputs.length)inputs[inputs.length-1].focus();
  },50);
}

function saveFocusArea(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);
  const name=document.getElementById('fa-name').value.trim();
  if(!name){toast('⚠ Focus area name required','var(--amber)');return;}
  const T=document.getElementById('fa-T').value.trim();
  if(!b.campaigns[ci].focusAreas)b.campaigns[ci].focusAreas=[];
  const faStart=document.getElementById('fa-start')?.value||'';
  const faEnd=document.getElementById('fa-end')?.value||'';
  const faNotes=document.getElementById('fa-notes')?.value||'';
  b.campaigns[ci].focusAreas.push({name,T:'',startDate:faStart,endDate:faEnd,notes:faNotes,rows:[]});
  document.getElementById('modal-fa').remove();
  persist();buildWsMonthly(b);
  toast(`✓ Focus area "${name}" added`,'var(--green)');
}

function editFocusArea(bid,ci,fi){
  const b=BRANDS.find(x=>x.id==bid);
  const fa=b.campaigns[ci].focusAreas[fi];
  const ex=document.getElementById('modal-fa');if(ex)ex.remove();
  const mo=document.createElement('div');mo.id='modal-fa';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:520px;max-height:90vh;overflow-y:auto"><div class="modal-p">
    <div class="mtit">Edit focus area</div>
    <div class="msub">${b.campaigns[ci].name}</div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Focus area name *</label><input class="finp" id="fa-name" value="${fa.name}"></div></div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Start date</label><input class="finp" type="date" id="fa-start" value="${fa.startDate||''}"></div>
      <div class="fg2"><label class="flbl">End date</label><input class="finp" type="date" id="fa-end" value="${fa.endDate||''}"></div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Instructions / notes</label><textarea class="ftxt" id="fa-notes" style="min-height:60px" placeholder="Content direction, key messages, references...">${fa.notes||''}</textarea></div></div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-fa').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveEditFA('${bid}',${ci},${fi})">Save →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function saveEditFA(bid,ci,fi){
  const b=BRANDS.find(x=>x.id==bid);
  const fa=b.campaigns[ci].focusAreas[fi];
  fa.name=document.getElementById('fa-name').value.trim()||fa.name;
  fa.startDate=document.getElementById('fa-start')?.value||'';
  fa.endDate=document.getElementById('fa-end')?.value||'';
  fa.notes=document.getElementById('fa-notes')?.value||'';
  document.getElementById('modal-fa').remove();
  persist();buildWsMonthly(b);
  toast('✓ Focus area updated','var(--green)');
}

function removeFocusArea(bid,ci,fi){
  if(!confirm('Remove this focus area and all its rows?'))return;
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].focusAreas.splice(fi,1);
  persist();buildWsMonthly(b);
  toast('Focus area removed','var(--amber)');
}

function updateFAName(bid,ci,fi,val){
  const b=BRANDS.find(x=>x.id==bid);
  if(b&&b.campaigns[ci]&&b.campaigns[ci].focusAreas[fi]){
    b.campaigns[ci].focusAreas[fi].name=val.trim()||b.campaigns[ci].focusAreas[fi].name;
    persist();
  }
}

function toggleCampExpand(bid,ci,headerEl){
  const card=headerEl.closest('[data-camp-id]')||headerEl.parentElement;
  const body=card.querySelector('.camp-body');
  const arrow=card.querySelector('.camp-arrow');
  if(!body)return;
  const isExpanded=body.style.display!=='none';
  body.style.display=isExpanded?'none':'block';
  if(arrow)arrow.textContent=isExpanded?'▶':'▼';
  // Save state
  const b=BRANDS.find(x=>x.id==bid);
  if(b&&b.campaigns[ci])b.campaigns[ci]._expanded=!isExpanded;
  persist();
}


function addCampRow(bid,ci){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  if(!b.campaigns[ci].campRows)b.campaigns[ci].campRows=[];
  b.campaigns[ci].campRows.push({format:'',qty:1,platforms:[],platform:'',assigneeId:null});
  persist();buildWsMonthly(b);
}

function toggleCampRowPlatPicker(bid,ci,ri,btn){
  // Use a hidden native select rendered next to button - always works in all browsers
  const existingSelect=document.getElementById(`plat-sel-${bid}-${ci}-${ri}`);
  if(existingSelect){existingSelect.remove();return;}

  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  if(!b.campaigns||!b.campaigns[ci]||!b.campaigns[ci].campRows||!b.campaigns[ci].campRows[ri])return;
  const row=b.campaigns[ci].campRows[ri];
  if(!row.platforms)row.platforms=[];

  const platforms=(LOOKUPS.platforms||['LinkedIn','Instagram','Facebook','Twitter/X','YouTube','Email','WhatsApp','SEO/Blog','Google Ads','PR/Media','Events','OOH/Print']);

  // Build a modal-style picker instead
  document.querySelectorAll('.plat-picker-drop').forEach(d=>d.remove());
  const drop=document.createElement('div');
  drop.className='plat-picker-drop';
  drop.id=`plat-sel-${bid}-${ci}-${ri}`;

  // Insert AFTER the button in the DOM (not body) so it flows naturally
  btn.parentNode.style.position='relative';
  btn.parentNode.appendChild(drop);
  drop.style.cssText=`position:absolute;top:100%;left:0;z-index:9999;background:var(--bg2);border:.5px solid var(--border2);border-radius:var(--rsm);padding:6px;min-width:170px;box-shadow:0 8px 24px rgba(0,0,0,.6);margin-top:2px`;

  drop.innerHTML=platforms.map(pl=>`
    <label style="display:flex;align-items:center;gap:8px;padding:5px 8px;cursor:pointer;border-radius:4px;font-size:12px;color:var(--text)" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background='none'">
      <input type="checkbox" data-plat="${pl}" ${row.platforms.includes(pl)?'checked':''} style="accent-color:var(--accent);width:14px;height:14px;flex-shrink:0">
      ${pl}
    </label>`).join('');

  drop.querySelectorAll('input[type=checkbox]').forEach(cb=>{
    cb.addEventListener('change',function(e){
      e.stopPropagation();
      const plat=this.dataset.plat;
      const b2=BRANDS.find(x=>x.id==bid);if(!b2)return;
      const r=b2.campaigns[ci].campRows[ri];
      if(!r.platforms)r.platforms=[];
      if(this.checked){if(!r.platforms.includes(plat))r.platforms.push(plat);}
      else r.platforms=r.platforms.filter(p=>p!==plat);
      r.platform=r.platforms[0]||'';
      persist();
      btn.textContent=r.platforms.length?r.platforms.join(', '):'— Platform —';
    });
  });

  drop.addEventListener('click',e=>e.stopPropagation());
  setTimeout(()=>document.addEventListener('click',function close(e){
    if(!drop.contains(e.target)&&e.target!==btn){
      drop.remove();
      document.removeEventListener('click',close);
    }
  }),50);
}

function removeCampRow(bid,ci,ri){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  b.campaigns[ci].campRows.splice(ri,1);
  persist();buildWsMonthly(b);
}

function updateCampRow(bid,ci,ri,field,val){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  b.campaigns[ci].campRows[ri][field]=val;
  persist();
}

function toggleCampRowPlat(bid,ci,ri,plat,checked){
  bid=parseInt(bid)||bid;
  ci=parseInt(ci);ri=parseInt(ri);
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  if(!b.campaigns||!b.campaigns[ci])return;
  if(!b.campaigns[ci].campRows||!b.campaigns[ci].campRows[ri])return;
  const row=b.campaigns[ci].campRows[ri];
  if(!row.platforms)row.platforms=[];
  if(checked){if(!row.platforms.includes(plat))row.platforms.push(plat);}
  else row.platforms=row.platforms.filter(p=>p!==plat);
  row.platform=row.platforms[0]||'';
  persist();
  // Update button label without full rebuild
  document.querySelectorAll('[data-action="campPlat"]').forEach(btn=>{
    if(btn.dataset.bid==bid&&parseInt(btn.dataset.ci)===ci&&parseInt(btn.dataset.ri)===ri){
      btn.textContent=row.platforms.length?row.platforms.join(', '):'— Platform —';
    }
  });
}

function generateCampRow(bid,ci,ri,mk){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];
  const row=camp.campRows[ri];
  if(!row){toast('Row not found','var(--red)');return;}
  mk=mk||CG7Month||(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'));
  if(!camp.contentPieces)camp.contentPieces=[];
  const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
  const format=row.format||'Content';
  const platformLabel=row.platforms&&row.platforms.length?row.platforms.join(', '):(row.platform||'');
  const qty=row.qty||1;
  let created=0;
  for(let i=1;i<=qty;i++){
    const existingCount=camp.contentPieces.filter(p=>p.creativeStyle===format&&(!p.focusArea||p.focusArea==='')&&p.month===mk).length;
    const pieceNum=existingCount+1;
    const title=format+' '+pieceNum+' — '+monthLabel;
    if(camp.contentPieces.find(p=>p.topic===title&&p.month===mk))continue;
    camp.contentPieces.push({
      id:Date.now()+created,topic:title,
      platform:platformLabel,platforms:row.platforms||[],
      creativeStyle:format,g7:row.g||'',focusArea:'',month:mk,due:'',
      assigneeId:row.assigneeId||null,
      copyDir:'',visualIdea:'',copy:'',caption:'',hashtags:'',
      status:'brief',comment:'',taskId:null,
      tOverride:camp.T||'',eOverride:'',toneOverride:'',aiSuggestions:{}
    });
    created++;
  }
  persist();buildWsMonthly(b);buildWsContent(b);
  if(created)toast('✓ '+created+' piece'+(created!==1?'s':'')+' created','var(--green)');
  else toast('⚠ Piece already exists for this format','var(--amber)');
}

function generateAllCampRows(bid,ci,mk){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];
  if(!camp.campRows||!camp.campRows.length){toast('⚠ Add rows first','var(--amber)');return;}
  camp.campRows.forEach((row,ri)=>generateCampRow(bid,ci,ri,mk));
}


function addFARow(bid,ci,fi){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b.campaigns[ci].focusAreas[fi].rows)b.campaigns[ci].focusAreas[fi].rows=[];
  b.campaigns[ci].focusAreas[fi].rows.push({format:'',qty:1,g:'',platform:'',assigneeId:null});
  persist();buildWsMonthly(b);
}

function removeFARow(bid,ci,fi,ri){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].focusAreas[fi].rows.splice(ri,1);
  persist();buildWsMonthly(b);
}

function deleteFAPiece(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].contentPieces.splice(pi,1);
  persist();buildWsMonthly(b);
  toast('Piece removed','var(--amber)');
}

function generatePieceTask(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const p=camp.contentPieces[pi];if(!p)return;
  if(p.taskId&&TASKS.find(t=>t.id===p.taskId)){
    toast('⚠ Task already generated for this piece','var(--amber)');return;
  }
  const assignee=MEMBERS.find(m=>m.id==p.assigneeId)||MEMBERS.find(m=>m.id==CU.id);
  // Snapshot the brief + campaign context directly on the task
  const briefData={
    T:camp.T||'',E:camp.E||'',
    platform:p.platform||'',creativeStyle:p.creativeStyle||'',
    copyDir:p.copyDir||'',copy:p.copy||'',
    caption:p.caption||'',hashtags:p.hashtags||'',
    visualIdea:p.visualIdea||'',
  };
  const t={
    id:Date.now(),
    title:p.topic||(p.platform+' '+p.creativeStyle),
    brandId:b.id,
    assigneeId:assignee?assignee.id:CU.id,
    stage:'todo',specStage:'todo',
    priority:'medium',
    due:p.postDate||p.designDate||'',
    notes:[
      p.platform?`Platform: ${p.platform}`:'',
      p.creativeStyle?`Format: ${p.creativeStyle}`:'',
      p.copyDir?`Direction: ${p.copyDir}`:'',
      p.copy?`Copy: ${p.copy.substring(0,200)}`:'',
    ].filter(Boolean).join('\n'),
    g7:'',contentPieceRef:{bid:b.id,ci,pi},briefData,
    files:[],specFiles:[],comments:[],
    score:0,sentToOwner:false,bmChangesRequested:''
  };
  TASKS.push(t);
  p.taskId=t.id;
  p.status='inprod';
  persist();
  buildWsContent(b);buildTaskViews();buildDashboard();
  // Update My Work nav visibility
  const hasPieces=canManage(CU)&&BRANDS.some(b2=>(b2.campaigns||[]).some(c=>(c.contentPieces||[]).some(p2=>p2.assigneeId==CU.id&&!['approved','scheduled','published'].includes(p2.status))));
  document.querySelectorAll('.nb-mywork-nav').forEach(el=>el.style.display=(isSpec(CU)||TASKS.some(x=>x.assigneeId===CU.id&&x.stage!=='completed')||hasPieces)?'flex':'none');
  toast(`🚀 Task generated — assigned to ${assignee?assignee.name:'team'}`,'var(--green)');
}
function submitPieceForApproval(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b){toast('Brand not found','var(--red)');return;}
  const camp=b.campaigns[ci];
  if(!camp||!camp.contentPieces[pi]){toast('Piece not found','var(--red)');return;}
  const p=camp.contentPieces[pi];
  if(!p.copyDir&&!p.copy&&!p.caption&&p.status!=='changes'){
    toast('⚠ Fill the brief first — add copy direction or copy before submitting','var(--amber)');
    return;
  }
  // Show recipient modal
  const recipientUI=buildOwnerRecipientUI(bid,'piece-recipient');
  const isResubmit=p.status==='changes';
  const mo=document.createElement('div');mo.id='modal-piece-owner';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:420px"><div class="modal-p">
    <div class="mtit">📤 ${isResubmit?'Resubmit to Owner':'Send to Owner'}</div>
    <div class="msub">${p.topic||p.creativeStyle||'Content piece'} · ${b.name}</div>
    <div style="margin:16px 0 12px">
      <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Send to</div>
      ${recipientUI}
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-piece-owner').remove()">Cancel</button>
      <button class="mbtn ok" onclick="confirmPieceForApproval('${bid}',${ci},${pi})">📤 ${isResubmit?'Resubmit':'Send now'}</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function confirmPieceForApproval(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];if(!camp)return;
  const p=camp.contentPieces[pi];if(!p)return;
  const recipient=getSelectedRecipient('piece-recipient');
  // Move previous owner comment to history before resubmitting
  if(p.ownerComment){
    if(!p.feedbackHistory)p.feedbackHistory=[];
    p.feedbackHistory.push({round:(p.feedbackHistory.length+1),comment:p.ownerComment,by:p.approvedBy||'Owner',at:new Date().toISOString(),status:'changes'});
    p.ownerComment='';
  }
  p.status='pending';
  p.sentToOwnerAt=new Date().toISOString();
  p.sentToOwnerBy=CU?CU.name:'SAM';
  p.sentToOwnerRecipient=recipient;
  p.submittedBy=CU?CU.name:'SAM';
  addNotification('pending','"'+p.topic+'" sent for approval by '+(CU?CU.name:'SAM'),bid,ci,pi);
  persist();buildWsMonthly(b);buildApprovals();
  document.getElementById('modal-piece-owner')?.remove();
  toast(`📤 Sent to ${recipient==='both'?'owner & co-owner':recipient}`,'var(--amber)');
}

function approvePieceInline(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b){toast('Brand not found','var(--red)');return;}
  b.campaigns[ci].contentPieces[pi].status='approved';
  persist();buildWsMonthly(b);buildWsContent(b);
  toast('✓ Piece approved — now in Scheduling','var(--green)');
}


function togglePlatPicker(id){
  const el=document.getElementById(id);if(!el)return;
  // Close all other pickers first
  document.querySelectorAll('[id^="plat-"]').forEach(p=>{if(p.id!==id)p.style.display='none';});
  el.style.display=el.style.display==='none'?'block':'none';
  // Close on outside click
  if(el.style.display==='block'){
    setTimeout(()=>{
      const handler=e=>{if(!el.contains(e.target)){el.style.display='none';document.removeEventListener('click',handler);}};
      document.addEventListener('click',handler);
    },10);
  }
}

function toggleFARowPlat(bid,ci,fi,ri,plat,checked){
  const b=BRANDS.find(x=>x.id==bid);
  if(!b)return;
  const row=b.campaigns[ci].focusAreas[fi].rows[ri];
  if(!row.platforms)row.platforms=[];
  if(checked){if(!row.platforms.includes(plat))row.platforms.push(plat);}
  else row.platforms=row.platforms.filter(p=>p!==plat);
  // Keep legacy platform field as first selection for backward compat
  row.platform=row.platforms[0]||'';
  persist();buildWsMonthly(b);
}


function updateFARow(bid,ci,fi,ri,field,val){
  const b=BRANDS.find(x=>x.id==bid);
  b.campaigns[ci].focusAreas[fi].rows[ri][field]=val;
  persist();
}

function generateFARow(bid,ci,fi,ri,mk){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const camp=b.campaigns[ci];
  if(!camp||!camp.focusAreas||!camp.focusAreas[fi])return;
  const fa=camp.focusAreas[fi];
  const row=fa.rows[ri];
  if(!row){toast('Row not found','var(--red)');return;}
  if(!row.format){toast('⚠ Select a format first','var(--amber)');return;}
  mk=mk||CG7Month||(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'));
  if(!camp.contentPieces)camp.contentPieces=[];
  const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
  const format=row.format;
  const qty=row.qty||1;
  let created=0;
  for(let i=1;i<=qty;i++){
    const existingCount=camp.contentPieces.filter(p=>p.creativeStyle===format&&p.focusArea===(fa.name||'')&&p.month===mk).length;
    const pieceNum=existingCount+1;
    const title=format+' '+pieceNum+(fa.name?' ['+fa.name+']':'')+' — '+monthLabel;
    if(camp.contentPieces.find(p=>p.topic===title&&p.month===mk))continue;
    camp.contentPieces.push({
      id:Date.now()+created,topic:title,
      platform:(row.platforms&&row.platforms.length)?row.platforms.join(', '):(row.platform||''),
      platforms:row.platforms||[],creativeStyle:format,
      g7:'',focusArea:fa.name||'',month:mk,due:'',
      assigneeId:row.assigneeId||null,
      copyDir:'',visualIdea:'',copy:'',caption:'',hashtags:'',
      status:'brief',comment:'',taskId:null,
      tOverride:camp.T||'',eOverride:'',toneOverride:'',aiSuggestions:{}
    });
    created++;
  }
  persist();buildWsMonthly(b);buildWsContent(b);
  if(created)toast('✓ '+created+' piece'+(created!==1?'s':'')+' created — fill brief to add platform & details','var(--green)');
  else toast('⚠ Pieces already exist for this format','var(--amber)');
}

function generateFAPieces(bid,ci,fi,mk){
  try{
    const b=BRANDS.find(x=>x.id==bid);
    if(!b){toast('Brand not found: '+bid,'var(--red)');return;}
    const camp=b.campaigns[ci];
    if(!camp){toast('Campaign not found: ci='+ci,'var(--red)');return;}
    if(!camp.focusAreas||!camp.focusAreas[fi]){toast('Focus area not found: fi='+fi,'var(--red)');return;}
    const fa=camp.focusAreas[fi];
    mk=mk||CG7Month||(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'));
    if(!fa.rows||!fa.rows.length){toast('⚠ No rows — click + Row first','var(--amber)');return;}
    if(!camp.contentPieces)camp.contentPieces=[];
    const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
    let created=0;
    fa.rows.forEach(row=>{
      const qty=row.qty||1;
      const format=row.format||'Content';
      const platforms=row.platforms&&row.platforms.length?row.platforms:[row.platform||''];
      const platformLabel=platforms.join(', ');
      for(let i=1;i<=qty;i++){
        // Find next available number for this format in this FA this month
        const existingCount=camp.contentPieces.filter(p=>p.creativeStyle===format&&p.focusArea===(fa.name||'')&&p.month===mk).length;
        const pieceNum=existingCount+i;
        const title=format+' '+pieceNum+(fa.name?' ['+fa.name+']':'')+' — '+monthLabel;
        if(camp.contentPieces.find(p=>p.topic===title&&p.month===mk))continue;
        if(true){
          camp.contentPieces.push({
            id:Date.now()+created,
            topic:title,
            platform:platformLabel,
            platforms:platforms,
            creativeStyle:format,
            g7:row.g||'',
            focusArea:fa.name||'',
            month:mk,
            due:'',
            assigneeId:row.assigneeId||null,
            copyDir:'',visualIdea:'',copy:'',caption:'',hashtags:'',
            status:'brief',comment:'',taskId:null,
            tOverride:camp.T||'',eOverride:'',toneOverride:'',aiSuggestions:{}
          });
          created++;
        }
      }
    });
    persist();
    buildWsMonthly(b);
    buildWsContent(b);
    if(created===0){
      toast('⚠ Pieces already exist — go to Scheduling tab to view them','var(--amber)');
    } else {
      toast('✓ '+created+' piece'+(created!==1?'s':'')+' created — check Scheduling tab','var(--green)');
    }
  }catch(err){
    console.error('generateFAPieces error:',err);
    toast('Error: '+err.message,'var(--red)');
  }
}



// ══ STANDALONE ACTIVITY BRIEF FUNCTIONS ══

function toggleStandaloneItem(bid,i,item,checked){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[i];
  if(!act.brief)act.brief={items:[],notes:'',pages:'',keywords:'',targetPages:''};
  if(!act.brief.items)act.brief.items=[];
  if(checked){if(!act.brief.items.includes(item))act.brief.items.push(item);}
  else act.brief.items=act.brief.items.filter(x=>x!==item);
  persist();
}

function setStandaloneBrief(bid,i,field,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[i];
  if(!act.brief)act.brief={items:[],notes:'',pages:'',keywords:'',targetPages:''};
  if(field==='startDate')act.startDate=val;
  else if(field==='endDate')act.endDate=val;
  else act.brief[field]=val;
  persist();
}

function submitStandaloneBrief(bid,i){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[i];
  if(!act.brief||!act.brief.items||!act.brief.items.length){
    toast('⚠ Select at least one item to brief','var(--amber)');return;
  }
  act.briefStatus='briefed';
  persist();buildWsMonthly(b);
  toast('✓ Brief submitted — awaiting SAM approval','var(--amber)');
}

function resetStandaloneBrief(bid,i){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.activities[i].briefStatus='';
  persist();buildWsMonthly(b);
  toast('Brief reset to draft','var(--text2)');
}

function approveStandaloneBrief(bid,i){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[i];
  act.briefStatus='approved';
  // Generate one task per checked item
  const assigneeId=act.assigneeId||null;
  const mk=CG7Month||(new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'));
  const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
  const gName=G7_NAMES[i];
  (act.brief.items||[]).forEach(item=>{
    const taskId=Date.now()+Math.random();
    TASKS.push({
      id:taskId,
      title:`${item} — ${b.name} — ${monthLabel}`,
      brandId:b.id,
      stage:'todo',
      priority:'medium',
      assigneeId,
      g7type:`G${i+1}`,
      due:act.endDate||'',
      notes:act.brief.notes||'',
      files:[],
      createdAt:new Date().toISOString()
    });
  });
  persist();buildWsMonthly(b);
  toast(`✓ Approved — ${(act.brief.items||[]).length} task${(act.brief.items||[]).length!==1?'s':''} generated`,'var(--green)');
}


function setG7Field(bid,idx,field,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.activities[idx][field]=val;
  persist();
}

function setG7BriefField(bid,idx,field,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  if(!plan.activities[idx].briefData)plan.activities[idx].briefData={};
  plan.activities[idx].briefData[field]=val;
  persist();
}

function toggleStandaloneExpand(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.active)return;
  if(!act.briefData)act.briefData={};
  act.briefData._expanded=!act.briefData._expanded;
  persist();buildWsMonthly(b);
}

function toggleG1Deliverable(bid,idx,item,checked){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  if(!plan.activities[idx].briefData)plan.activities[idx].briefData={};
  const bd=plan.activities[idx].briefData;
  if(!bd.deliverables)bd.deliverables=[];
  if(checked){if(!bd.deliverables.includes(item))bd.deliverables.push(item);}
  else bd.deliverables=bd.deliverables.filter(x=>x!==item);
  persist();buildWsMonthly(b);
}

function toggleG2WorkType(bid,idx,item,checked){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  if(!plan.activities[idx].briefData)plan.activities[idx].briefData={};
  const bd=plan.activities[idx].briefData;
  if(!bd.workTypes)bd.workTypes=[];
  if(checked){if(!bd.workTypes.includes(item))bd.workTypes.push(item);}
  else bd.workTypes=bd.workTypes.filter(x=>x!==item);
  persist();buildWsMonthly(b);
}

function toggleG3Focus(bid,idx,item,checked){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  if(!plan.activities[idx].briefData)plan.activities[idx].briefData={};
  const bd=plan.activities[idx].briefData;
  if(!bd.seoFocus)bd.seoFocus=[];
  if(checked){if(!bd.seoFocus.includes(item))bd.seoFocus.push(item);}
  else bd.seoFocus=bd.seoFocus.filter(x=>x!==item);
  persist();buildWsMonthly(b);
}

function saveStandaloneBriefDraft(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  // Only save data — do NOT change status
  persist();buildWsMonthly(b);
  toast(`✓ ${G7_NAMES[idx]} brief saved`,'var(--green)');
}

function saveStandaloneBrief(bid,idx){
  // Legacy — kept for compatibility, same as draft save
  saveStandaloneBriefDraft(bid,idx);
}

function addStandaloneTask(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  const gLabel=['G1 — Brand guidelines','G2 — Website','G3 — SEO'][idx];
  const mo=document.createElement('div');mo.id='modal-sa-task';mo.className='moverlay open';
  const specs=MEMBERS.filter(m=>m.active);
  const specOpts=specs.map(m=>`<option value="${m.id}" ${m.id==act.assigneeId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Add task — ${gLabel}</div>
    <div class="msub">${b.name}</div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Task title *</label><input class="finp" id="sat-title" placeholder="e.g. Create brand colour palette"/></div></div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Assigned to</label><select class="fsel" id="sat-assignee"><option value="">Unassigned</option>${specOpts}</select></div>
      <div class="fg2"><label class="flbl">Priority</label><select class="fsel" id="sat-priority"><option value="high">High</option><option value="medium" selected>Medium</option><option value="low">Low</option></select></div>
    </div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Due date</label><input class="finp" type="date" id="sat-due" value="${act.endDate||''}"/></div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Notes</label><textarea class="ftxt" id="sat-notes" placeholder="Task details..." style="min-height:46px"></textarea></div></div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-sa-task').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveStandaloneTask('${bid}',${idx})">Create task →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
  setTimeout(()=>document.getElementById('sat-title')?.focus(),100);
}

function saveStandaloneTask(bid,idx){
  const title=document.getElementById('sat-title')?.value?.trim();
  if(!title){toast('⚠ Task title required','var(--amber)');return;}
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  const newTask={
    id:Date.now(),
    title,
    brandId:parseInt(bid),
    g7:idx+1,
    assigneeId:parseInt(document.getElementById('sat-assignee').value)||null,
    createdById:CU.id,
    priority:document.getElementById('sat-priority').value,
    stage:'todo',
    due:document.getElementById('sat-due').value,
    notes:document.getElementById('sat-notes').value||'',
    challenges:'',remarks:'',score:0,files:[],comments:[],
    createdAt:new Date().toISOString().split('T')[0]
  };
  TASKS.push(newTask);
  if(!act.taskIds)act.taskIds=[];
  act.taskIds.push(newTask.id);
  // Keep status as approved so more tasks can be added
  if(act.status!=='approved')act.status='approved';
  persist();
  document.getElementById('modal-sa-task').remove();
  buildWsMonthly(b);buildTaskViews();buildDashboard();
  toast(`✓ Task "${title}" created`,'var(--green)');
}

function toggleDeliverableExpand(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.deliverableBriefs)act.deliverableBriefs={};
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  act.deliverableBriefs[delivName]._expanded=!act.deliverableBriefs[delivName]._expanded;
  persist();buildWsMonthly(b);
}

function setDeliverableField(bid,idx,delivName,field,val){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];if(!act)return;
  if(!act.deliverableBriefs)act.deliverableBriefs={};
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  act.deliverableBriefs[delivName][field]=val;
  // Auto-assign to SAM if no assignee set yet
  if(!act.deliverableBriefs[delivName].assigneeId){
    act.deliverableBriefs[delivName].assigneeId=CU?CU.id:(b.primarySamId||null);
  }
  persist();
}

function uploadDeliverableFile(bid,idx,delivName,input){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.deliverableBriefs)act.deliverableBriefs={};
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  const bd=act.deliverableBriefs[delivName];
  if(!bd.files)bd.files=[];
  Array.from(input.files).forEach(f=>{
    bd.files.push({name:f.name,size:f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB',type:f.type});
  });
  input.value='';persist();buildWsMonthly(b);
  toast(`✓ File attached`,'var(--green)');
}

function removeDeliverableFile(bid,idx,delivName,fi){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  act.deliverableBriefs[delivName].files.splice(fi,1);
  persist();buildWsMonthly(b);
}

function submitDeliverableForOwner(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  const bd=act.deliverableBriefs[delivName];
  if(!bd.notes&&!bd.startDate){toast('⚠ Fill in instructions and dates first','var(--amber)');return;}
  bd.status='owner-pending';
  bd.submittedAt=new Date().toISOString();
  addNotification('standalone-pending',`${G7_NAMES[idx]} — ${delivName} submitted for approval — ${b.name}`,b.id,idx,null);
  persist();buildWsMonthly(b);
  toast(`📤 ${delivName} submitted for owner approval`,'var(--amber)');
}

function deleteDeliverableTask(taskId,bid){
  if(!confirm('Delete this task?'))return;
  TASKS=TASKS.filter(t=>t.id!=taskId);
  const b=BRANDS.find(x=>x.id==bid);
  persist();
  if(b)buildWsMonthly(b);
  buildTaskViews();
  toast('Task deleted','var(--red)');
}
function sendDeliverableToOwner(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const gLabel=['G1 — Brand guidelines','G2 — Website','G3 — SEO'][idx]||'G'+(idx+1);
  const recipientUI=buildOwnerRecipientUI(bid,'deliv-recipient');
  const mo=document.createElement('div');mo.id='modal-deliv-owner';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:440px"><div class="modal-p">
    <div class="mtit">📤 Send to Owner</div>
    <div class="msub">${gLabel}: ${delivName} · ${b.name}</div>
    <div style="margin:16px 0 12px">
      <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Send to</div>
      ${recipientUI}
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-deliv-owner').remove()">Cancel</button>
      <button class="mbtn ok" onclick="confirmDeliverableToOwner('${bid}',${idx},'${delivName}')">📤 Send now</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function confirmDeliverableToOwner(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];if(!act)return;
  if(!act.deliverableBriefs)act.deliverableBriefs={};
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  const recipient=getSelectedRecipient('deliv-recipient');
  act.deliverableBriefs[delivName].status='owner-pending';
  act.deliverableBriefs[delivName].sentToOwnerAt=new Date().toISOString();
  act.deliverableBriefs[delivName].sentToOwnerBy=CU?CU.name:'SAM';
  act.deliverableBriefs[delivName].sentToOwnerRecipient=recipient;
  const gLabel=['G1 — Brand guidelines','G2 — Website','G3 — SEO'][idx]||'G'+(idx+1);
  addNotification('pending',`${gLabel}: "${delivName}" sent for your approval`,bid,null,null);
  persist();buildWsMonthly(b);buildApprovals();
  document.getElementById('modal-deliv-owner')?.remove();
  toast(`📤 "${delivName}" sent to ${recipient==='both'?'owner & co-owner':recipient}`,'var(--amber)');
}
function approveDeliverable(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  act.deliverableBriefs[delivName].status='approved';
  act.deliverableBriefs[delivName].approvedAt=new Date().toISOString();
  persist();buildWsMonthly(b);
  toast(`✅ ${delivName} activated`,'var(--green)');
}

function generateDeliverableTask(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];if(!act)return;
  const bd=act.deliverableBriefs[delivName]||{};
  const dKey=delivName.replace(/[^a-zA-Z0-9]/g,'_');
  const gLabel=['G1 — Brand guidelines','G2 — Website','G3 — SEO'][idx]||'G'+(idx+1);
  // Check no task already generated for this deliverable
  const existing=TASKS.filter(t=>t.deliverableRef===`${bid}-${idx}-${dKey}`);
  if(existing.length){toast('⚠ Task already generated for this deliverable','var(--amber)');return;}
  const assigneeId=parseInt(bd.assigneeId)||parseInt(act.assigneeId)||CU.id;
  const assignee=MEMBERS.find(m=>m.id==assigneeId);
  const t={
    id:Date.now(),
    title:`${gLabel} — ${delivName}`,
    brandId:b.id,g7:gLabel,
    assigneeId:assigneeId||CU.id,
    createdById:CU.id,
    stage:'todo',specStage:'todo',
    priority:'medium',
    due:bd.endDate||act.endDate||'',
    notes:bd.notes||'',
    deliverableRef:`${bid}-${idx}-${dKey}`,
    briefData:{
      platform:gLabel,creativeStyle:delivName,
      copyDir:bd.notes||'',
      briefDue:bd.startDate||'',postDate:bd.endDate||act.endDate||''
    },
    files:[],specFiles:[],comments:[],
    score:0,sentToOwner:false,bmChangesRequested:''
  };
  TASKS.push(t);
  persist();buildTaskViews();buildWsMonthly(b);buildDashboard();
  toast(`🚀 Task generated — assigned to ${assignee?assignee.name:'team'}`,'var(--green)');
}
function addDeliverableTask(bid,idx,delivName){
  // Show unchecked deliverables as quick-pick options
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  let act=null;
  Object.values(b.g7Plans||{}).forEach(plan=>{const a=(plan.activities||[])[idx];if(a)act=a;});
  if(!act)return;
  const G1_ITEMS=LOOKUPS.g1Deliverables||['Brand guidelines doc','Sales kit','Pitch deck','Brand architecture','Messaging framework','Visual identity'];
  const G2_ITEMS=LOOKUPS.g2WorkTypes||['New page','Content update','Landing page','Design fix','Technical fix','Performance'];
  const G3_ITEMS=LOOKUPS.g3SeoFocus||['Keyword research','On-page optimisation','Backlink building','Technical audit','Content gap analysis','Local SEO'];
  const allItems=[G1_ITEMS,G2_ITEMS,G3_ITEMS][idx]||[];
  const G_FIELD=['deliverables','workTypes','seoFocus'];
  const selected=(act.briefData||{})[G_FIELD[idx]]||[];
  const G_TOGGLE=['toggleG1Deliverable','toggleG2WorkType','toggleG3SeoFocus'];
  const unchecked=allItems.filter(item=>!selected.includes(item));
  // Remove existing popover
  const ex=document.getElementById('add-deliv-popover');if(ex){ex.remove();return;}
  if(!unchecked.length){toast('All deliverables already selected','var(--amber)');return;}
  const pop=document.createElement('div');
  pop.id='add-deliv-popover';
  pop.style.cssText='position:fixed;z-index:9999;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:10px;box-shadow:0 4px 20px #0006;min-width:220px;max-width:280px';
  pop.innerHTML=`<div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Select deliverable to add</div>`
    +unchecked.map(item=>`<div onclick="document.getElementById('add-deliv-popover').remove();${G_TOGGLE[idx]}('${bid}',${idx},'${item}',true)" style="padding:7px 10px;border-radius:var(--rsm);cursor:pointer;font-size:12px;color:var(--text)" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background=''">${item}</div>`).join('');
  document.body.appendChild(pop);
  // Position near the button
  const btn=event.target.closest('button');
  if(btn){const r=btn.getBoundingClientRect();pop.style.top=(r.bottom+6)+'px';pop.style.left=r.left+'px';}
  // Close on outside click
  setTimeout(()=>{document.addEventListener('click',function h(e){if(!pop.contains(e.target)){pop.remove();document.removeEventListener('click',h);}});},100);
}

function saveDeliverableTask(bid,idx,delivName,dKey){
  const title=document.getElementById('dt-title')?.value?.trim();
  if(!title){toast('⚠ Task title required','var(--amber)');return;}
  const b=BRANDS.find(x=>x.id==bid);
  const newTask={
    id:Date.now(),title,
    brandId:parseInt(bid),
    g7:idx+1,
    deliverableRef:`${bid}-${idx}-${dKey}`,
    assigneeId:parseInt(document.getElementById('dt-assignee').value)||null,
    createdById:CU.id,
    priority:document.getElementById('dt-priority').value,
    stage:'todo',
    due:document.getElementById('dt-due').value,
    notes:document.getElementById('dt-notes').value||'',
    challenges:'',remarks:'',score:0,files:[],comments:[],
    createdAt:new Date().toISOString().split('T')[0]
  };
  TASKS.push(newTask);
  persist();
  document.getElementById('modal-deliv-task').remove();
  buildWsMonthly(b);buildTaskViews();buildDashboard();
  toast(`✓ Task "${title}" created`,'var(--green)');
}

function approveStandaloneBrief(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.activities[idx].status='approved';
  persist();buildWsMonthly(b);
  toast(`✓ ${G7_NAMES[idx]} approved`,'var(--green)');
}

function uploadStandaloneFile(bid,idx,input){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.briefData.files)act.briefData.files=[];
  const count=input.files.length;
  Array.from(input.files).forEach(file=>{
    const sizeFmt=file.size>1048576?(file.size/1048576).toFixed(1)+' MB':(file.size/1024).toFixed(0)+' KB';
    act.briefData.files.push({name:file.name,size:sizeFmt,type:file.type,addedAt:new Date().toISOString()});
  });
  input.value='';
  persist();buildWsMonthly(b);
  toast(`✓ ${count} file${count>1?'s':''} attached`,'var(--green)');
}

function removeStandaloneFile(bid,idx,fi){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.briefData.files)return;
  act.briefData.files.splice(fi,1);
  persist();buildWsMonthly(b);
  toast('Attachment removed','var(--amber)');
}

function submitStandaloneForOwner(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.briefData.notes&&!act.startDate){toast('⚠ Fill in instructions and dates before submitting','var(--amber)');return;}
  act.status='owner-pending';
  act.brandId=b.id; // tag so approvals screen can filter precisely
  act.submittedAt=new Date().toISOString();
  addNotification('standalone-pending',`${G7_NAMES[idx]} brief submitted for approval — ${b.name}`,b.id,idx,null);
  persist();buildWsMonthly(b);
  toast(`📤 ${G7_NAMES[idx]} submitted for owner approval`,'var(--amber)');
}

function approveDeliverableByOwner(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  if(!act.deliverableBriefs)act.deliverableBriefs={};
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  act.deliverableBriefs[delivName].status='owner-approved';
  act.deliverableBriefs[delivName].ownerApprovedBy=CU.name;
  act.deliverableBriefs[delivName].ownerApprovedAt=new Date().toISOString();
  addNotification('standalone-approved',`${delivName} approved by ${CU.name} — ${b.name}`,b.id,idx,null);
  persist();buildApprovals();
  toast(`✅ ${delivName} approved`,'var(--green)');
}

function rejectDeliverableByOwner(bid,idx,delivName){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  const dKey=delivName.replace(/[^a-zA-Z0-9]/g,'_');
  const commentId='sa-comment-'+bid+'-'+idx+'-'+dKey;
  const comment=document.getElementById(commentId)?.value?.trim();
  if(!comment){toast('⚠ Add a comment explaining what needs to change','var(--amber)');return;}
  if(!act.deliverableBriefs)act.deliverableBriefs={};
  if(!act.deliverableBriefs[delivName])act.deliverableBriefs[delivName]={};
  act.deliverableBriefs[delivName].status='owner-changes';
  act.deliverableBriefs[delivName].ownerComment=comment;
  addNotification('standalone-changes',`${delivName} needs changes: ${comment.substring(0,60)} — ${b.name}`,b.id,idx,null);
  persist();buildApprovals();
  toast(`❌ Changes requested`,'var(--red)');
}

function approveStandaloneByOwner(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  act.status='owner-approved';
  act.ownerApprovedAt=new Date().toISOString();
  act.ownerApprovedBy=CU.name;
  addNotification('standalone-approved',`${G7_NAMES[idx]} brief approved by ${CU.name} — ${b.name}`,b.id,idx,null);
  persist();buildApprovals();
  toast(`✅ ${G7_NAMES[idx]} brief approved`,'var(--green)');
}

function rejectStandaloneByOwner(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const comment=document.getElementById('sa-comment-'+bid+'-'+idx)?.value?.trim();
  if(!comment){toast('⚠ Add a comment explaining what needs to change','var(--amber)');return;}
  const act=plan.activities[idx];
  act.status='owner-changes';
  act.ownerComment=comment;
  act.ownerRejectedAt=new Date().toISOString();
  addNotification('standalone-changes',`${G7_NAMES[idx]} brief needs changes: ${comment.substring(0,60)} — ${b.name}`,b.id,idx,null);
  persist();buildApprovals();
  toast(`❌ Changes requested — BM notified`,'var(--red)');
}

function generateStandaloneTasks(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  const bd=act.briefData||{};
  const mk=CG7Month;
  const monthLabel=new Date(mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
  let items=[];
  if(idx===0)items=bd.deliverables||['Brand guidelines work'];
  else if(idx===1)items=(bd.workTypes||['Website work']).map(w=>`${w}${bd.pages?' — '+bd.pages.substring(0,30):''}`);
  else if(idx===2)items=bd.seoFocus||['SEO work'];
  let created=0;
  items.forEach(item=>{
    TASKS.push({
      id:Date.now()+created,brandId:b.id,
      title:`${G7_NAMES[idx]} — ${item} — ${monthLabel}`,
      desc:bd.notes||'',
      stage:'todo',priority:'medium',
      assigneeId:act.assigneeId||null,
      due:act.endDate||'',
      g7:idx+1,files:[],comments:[],createdAt:new Date().toISOString()
    });
    created++;
  });
  act.status='done';act.taskIds=(act.taskIds||[]);
  persist();buildWsMonthly(b);buildDashboard();
  toast(`✓ ${created} task${created!==1?'s':''} created for ${G7_NAMES[idx]}`,'var(--green)');
}

function setG7Assignee(bid,idx,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.activities[idx].assigneeId=val?parseInt(val):null;
  persist();
}

function setG7Date(bid,idx,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  plan.activities[idx].startDate=val;
  plan.activities[idx].endDate=val;
  persist();
}

function changeG7MonthDirect(bid,mk){
  if(!mk)return;
  setBrandMonth(bid,mk);
  CG7Month=mk;
  const b=BRANDS.find(x=>x.id==bid);
  if(b)buildWsMonthly(b);
}
function changeG7Month(bid,dir){
  const d=new Date((getBrandMonth(bid)||new Date().toISOString().slice(0,7))+'-01');
  d.setMonth(d.getMonth()+dir);
  const newMk=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
  setBrandMonth(bid,newMk);
  const b=BRANDS.find(x=>x.id==bid);
  // Don't reset — getG7Plan will create a fresh plan for new month if needed
  buildWsMonthly(b);buildWsContent(b);
}

function buildWsG7(b){
  const now=new Date();
  const monthKey=CG7Month||(now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0'));
  CG7Month=monthKey;
  const plan=getG7Plan(b,CG7Month);
  if(!plan.month)plan.month=monthKey;
  const monthLabel=new Date(monthKey+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  const canEdit=!!(CU&&canManage(CU));
  const isClient=!!(CU&&isBrandOwner(CU));
  const planStatus=plan.status||'draft';
  const statusInfo={
    draft:{col:'var(--text3)',label:'Draft',sub:'SAM/BM is building the monthly plan'},
    submitted:{col:'var(--amber)',label:'Awaiting approval',sub:'Plan submitted — waiting for stakeholder review'},
    approved:{col:'var(--green)',label:'Approved',sub:'Plan approved — tasks have been generated'},
    changes:{col:'var(--red)',label:'Changes requested',sub:'Stakeholder has requested changes — review comments'}
  }[planStatus]||{col:'var(--text3)',label:'Draft',sub:''};

  const activeCount=plan.activities.filter(a=>a.active).length;
  const approvedCount=plan.activities.filter(a=>a.approved).length;
  const doneCount=plan.activities.filter(a=>a.done).length;

  // Plan header
  let headerHtml=`
  <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:14px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
          <div style="font-size:15px;font-weight:600">Monthly G7 Plan — ${b.name}</div>
          <span style="font-size:11px;padding:3px 10px;border-radius:9px;color:${statusInfo.col};border:.5px solid ${statusInfo.col};font-weight:500">${statusInfo.label}</span>
        </div>
        <div style="font-size:12px;color:var(--text2)">${statusInfo.sub}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <button style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:5px 10px;color:var(--text2);font-family:var(--font);font-size:11px;cursor:pointer" onclick="changeG7Month(${b.id},-1)">‹</button>
        <span style="font-size:12px;font-weight:600;min-width:110px;text-align:center">${monthLabel}</span>
        <button style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:5px 10px;color:var(--text2);font-family:var(--font);font-size:11px;cursor:pointer" onclick="changeG7Month(${b.id},1)">›</button>
      </div>
    </div>
    <div style="display:flex;gap:16px;margin-top:12px;padding-top:12px;border-top:.5px solid var(--border);flex-wrap:wrap">
      <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--text)">${activeCount}</div><div style="font-size:10px;color:var(--text3)">Planned</div></div>
      <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--amber)">${approvedCount}</div><div style="font-size:10px;color:var(--text3)">Approved</div></div>
      <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--green)">${doneCount}</div><div style="font-size:10px;color:var(--text3)">Done</div></div>
      <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
        ${canEdit&&planStatus==='draft'?`
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div>
            <label style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:3px">Monthly campaign</label>
            <select class="fsel" id="plan-master-camp" style="min-width:200px" onchange="setMasterCamp(${b.id},this.value)">
              <option value="">— Link existing campaign —</option>
              ${b.campaigns.map(cp=>`<option value="${cp.name}" ${plan.masterCampaign===cp.name?'selected':''}>${cp.name}</option>`).join('')}
            </select>
          </div>
          <div style="font-size:11px;color:var(--text3);max-width:180px">SAM/BM creates the campaign in TEMCA first, then links it here</div>
        </div>
        <button class="btn btn-p" onclick="submitG7Plan(${b.id})">Submit for approval →</button>
      `:''}
        ${canEdit&&(planStatus==='submitted'||planStatus==='approved')?`<button class="btn btn-s" onclick="resetG7Plan(${b.id})">↩ Reset to draft</button>`:''}
        ${canEdit&&planStatus==='approved'?`<button class="btn" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="generateAllG7Tasks(${b.id})">⚡ Generate all tasks</button>`:''}
      </div>
    </div>
    ${plan.masterCampaign&&b.campaigns.find(cp=>cp.name===plan.masterCampaign)?`
    <div style="margin-top:12px;padding-top:10px;border-top:.5px solid var(--border)">
      <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Monthly campaign context</div>
      ${(()=>{const mc=b.campaigns.find(cp=>cp.name===plan.masterCampaign);return`
        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px">
          <span style="background:var(--ambg);border:.5px solid var(--amb);border-radius:var(--rsm);padding:3px 9px;color:var(--amber)">📢 ${mc.name}</span>
          <span style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);padding:3px 9px;color:var(--accent2)">${mc.po==='both'?'⚡ Both':mc.po==='organic'?'🌱 Organic':'💰 Paid'}</span>
          ${mc.T?`<span style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 9px;color:var(--text2)"><b>T:</b> ${mc.T.substring(0,40)}${mc.T.length>40?'...':''}</span>`:''}
          ${mc.E?`<span style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px 9px;color:var(--text2)"><b>E:</b> ${mc.E.substring(0,40)}${mc.E.length>40?'...':''}</span>`:''}
        </div>
      `})()}
    </div>`:''}
    ${plan.planComments&&plan.planComments.length?`<div style="margin-top:12px;padding-top:10px;border-top:.5px solid var(--border)">${plan.planComments.map(cm=>`<div style="font-size:11px;padding:6px 10px;background:var(--bg3);border-radius:var(--rsm);margin-bottom:4px"><span style="font-weight:500;color:var(--teal)">${cm.author}</span><span style="color:var(--text3);margin:0 6px">·</span>${cm.text}</div>`).join('')}</div>`:''}
  </div>`;

  // Activity rows
  let activitiesHtml=G7_NAMES.map((name,i)=>{
    const act=plan.activities[i];
    const isStandalone=(i<3); // G1,G2,G3 — no campaign needed
    const linkedCamp=act.campaignId?b.campaigns.find(cp=>cp.name===act.campaignId):null;
    const campTE=linkedCamp?`<div style="margin-top:6px;display:flex;gap:10px;flex-wrap:wrap">
      ${linkedCamp.T?`<div style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);padding:4px 9px;font-size:11px"><span style="color:var(--text3)">T:</span> ${linkedCamp.T}</div>`:''}
      ${linkedCamp.E?`<div style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);padding:4px 9px;font-size:11px"><span style="color:var(--text3)">E:</span> ${linkedCamp.E}</div>`:''}
    </div>`:'';
    const statusCol=act.done?'var(--green)':act.approved?'var(--teal)':act.active?'var(--blue)':'var(--text3)';
    const statusLabel=act.done?'✓ Done':act.approved?'Approved':act.active?'Planned':'Not included';
    const assignee=act.assigneeId?MEMBERS.find(m=>m.id===act.assigneeId):null;
    const linkedTasks=TASKS.filter(t=>t.brandId===b.id&&t.g7===`G${i+1}`);
    const doneTasks=linkedTasks.filter(t=>t.stage==='completed').length;

    // Stakeholder view — only show active activities with approve/comment
    if(isClient&&!act.active)return'';

    return`<div style="background:var(--bg2);border:.5px solid ${act.approved?'var(--teal)':act.active?'var(--border2)':'var(--border)'};border-radius:var(--r);padding:14px;margin-bottom:9px;opacity:${act.active?1:0.6}">
      <div style="display:flex;align-items:flex-start;gap:12px">
        <div style="width:32px;height:32px;border-radius:8px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">G${i+1}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            ${canEdit&&planStatus==='draft'?`<input type="checkbox" ${act.active?'checked':''} onchange="toggleG7Active(${b.id},${i},this.checked)" style="accent-color:var(--accent);width:14px;height:14px;cursor:pointer"/>`:
              `<div style="width:14px;height:14px;border-radius:3px;background:${act.active?'var(--accent)':'var(--bg4)'};display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff">${act.active?'✓':''}</div>`}
            <div style="font-size:13px;font-weight:600">${name}</div>
            <span style="font-size:10px;padding:2px 8px;border-radius:9px;color:${statusCol};border:.5px solid ${statusCol}">${statusLabel}</span>
            ${act.approved&&!isClient?'<span style="font-size:9px;color:var(--teal)">✓ Stakeholder approved</span>':''}
          </div>
          <div style="font-size:11px;color:var(--text3);margin-bottom:6px">${G7_DESCS[i]}</div>
          ${act.active?`
          <div style="display:flex;gap:10px;flex-wrap:wrap;font-size:11px;color:var(--text2);margin-bottom:6px">
            ${act.startDate?`<span>📅 ${act.startDate}${act.endDate?' → '+act.endDate:''}</span>`:''}
            ${assignee?`<span>👤 ${assignee.name}</span>`:''}
            ${!isStandalone&&linkedCamp?`<span style="color:var(--amber)">📢 ${linkedCamp.name}</span>`:!isStandalone&&!linkedCamp?'<span style="color:var(--text3)">No campaign linked yet</span>':''}
          </div>
          ${campTE}
          ${act.notes?`<div style="font-size:11px;color:var(--text2);padding:6px 9px;background:var(--bg3);border-radius:var(--rsm);margin-top:6px">${act.notes}</div>`:''}
          ${linkedTasks.length?`<div style="display:flex;align-items:center;gap:7px;margin-top:8px"><div style="flex:1;height:4px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="height:100%;width:${Math.round(doneTasks/linkedTasks.length*100)}%;background:var(--green);border-radius:2px"></div></div><span style="font-size:10px;color:var(--text3)">${doneTasks}/${linkedTasks.length} tasks</span></div>`:''}
          ${act.comment?`<div style="font-size:11px;padding:6px 10px;background:var(--rdbg);border:.5px solid var(--rdb);border-radius:var(--rsm);margin-top:6px;color:var(--text2)"><span style="color:var(--red);font-weight:500">Comment:</span> ${act.comment}</div>`:''}
          `:''}
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0;align-items:flex-end">
          ${canEdit&&planStatus==='draft'&&act.active?`<button class="btn btn-sm btn-p" onclick="openG7PlanActivity(${b.id},${i})">⚙ Details</button>`:''}
          ${isClient&&act.active&&!act.approved?`<button class="btn btn-sm" style="background:var(--gnbg);border-color:var(--gnb);color:var(--green)" onclick="approveG7Activity(${b.id},${i})">✓ Approve</button>`:''}
          ${isClient&&act.active?`<button class="btn btn-sm btn-s" onclick="commentG7Activity(${b.id},${i})">💬 Comment</button>`:''}
          ${canEdit&&act.approved&&!act.taskIds.length?`<button class="btn btn-sm" style="background:var(--tlbg);border-color:var(--tlborder);color:var(--teal)" onclick="openG7Tasks(${b.id},${i})">⚡ Tasks</button>`:''}
          ${canEdit&&act.done?`<span style="font-size:10px;color:var(--green)">✓ Done</span>`:''}
        </div>
      </div>
    </div>`;
  }).join('');

  const _g7el=document.getElementById('ws-g7');if(_g7el)_g7el.innerHTML=headerHtml+activitiesHtml;
}

function toggleG7Active(bid,idx,val){
  const b=BRANDS.find(x=>x.id==bid);
  const plan=getG7Plan(b,CG7Month);
  const planStatus=plan.status||'draft';
  // Only allow deactivation if plan is draft/changes or user is SAM
  if(!val&&(planStatus==='approved'||planStatus==='active')&&!isSAM(CU)){
    toast('⚠ Plan is approved — only SAM can remove activities','var(--amber)');
    buildWsMonthly(b);// re-render to reset checkbox
    return;
  }
  plan.activities[idx].active=val;
  if(val){
    if(!plan.activities[idx].briefData)plan.activities[idx].briefData={};
    plan.activities[idx].briefData._expanded=true;
    // Auto-assign to current SAM or brand's primary SAM
    if(!plan.activities[idx].assigneeId){
      plan.activities[idx].assigneeId=CU?CU.id:(b.primarySamId||null);
    }
  }
  persist();buildWsMonthly(b);
}


function setMasterCamp(bid,val){
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  plan.masterCampaign=val||null;
  // Link all G4/G5/G6 activities to this campaign
  if(val){
    plan.activities.forEach((act,i)=>{
      if(i>=3&&i<=5)act.campaignId=val;  // G4, G5, G6
    });
  }
  persist();buildWsG7(b);
  if(val)toast(`✓ Monthly campaign linked — G4/G5/G6 will use "${val}"`,'var(--green)');
}

function approvePlanSAM(bid){
  // SAM can directly approve without owner
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  plan.status='approved';
  plan.approvedAt=new Date().toISOString().split('T')[0];
  plan.approvedBy=CU.name+' (SAM)';
  addNotification('plan-approved',`✅ Monthly plan approved by SAM — ${b.name}`,b.id,null,null);
  persist();buildWsMonthly(b);
  toast('✅ Plan approved by SAM','var(--green)');
}

function togglePieceComment(itemKey){
  const sel=document.getElementById(itemKey+'-status');
  const inp=document.getElementById(itemKey+'-comment');
  if(!sel||!inp)return;
  inp.style.display=sel.value==='changes'?'block':'none';
  if(sel.value==='changes')inp.focus();
}

function submitMonthlyPlanReview(bid,monthKey){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=b.g7Plans[monthKey];if(!plan)return;
  const overallComment=document.getElementById('plan-comment-'+bid+'-'+monthKey)?.value?.trim()||'';

  // Collect per-item feedback
  const itemChanges=[];
  let hasChanges=false;

  // Check content pieces
  (b.campaigns||[]).forEach(function(camp,ci){
    (camp.contentPieces||[]).forEach(function(p,pi){
      const itemKey='piece-'+bid+'-'+ci+'-'+pi;
      const sel=document.getElementById(itemKey+'-status');
      const inp=document.getElementById(itemKey+'-comment');
      if(!sel)return;
      if(sel.value==='changes'){
        const comment=inp?inp.value.trim():'';
        if(!comment){toast('⚠ Add a comment for: '+(p.topic||'piece'),'var(--amber)');return;}
        p.ownerComment=comment;
        p.status='changes';
        hasChanges=true;
        itemChanges.push((p.topic||'piece')+': '+comment);
      }
    });
  });

  // Check deliverables
  Object.values(b.g7Plans[monthKey].activities||[]).forEach(function(act,i){
    if(!act||!act.deliverableBriefs)return;
    Object.entries(act.deliverableBriefs).forEach(function(entry){
      const dName=entry[0];const bd=entry[1];
      const itemKey='deliv-'+bid+'-'+i+'-'+dName.replace(/[^a-z0-9]/gi,'_');
      const sel=document.getElementById(itemKey+'-status');
      const inp=document.getElementById(itemKey+'-comment');
      if(!sel)return;
      if(sel.value==='changes'){
        const comment=inp?inp.value.trim():'';
        if(!comment){toast('⚠ Add a comment for: '+dName,'var(--amber)');return;}
        bd.ownerComment=comment;
        bd.status='owner-changes';
        hasChanges=true;
        itemChanges.push(dName+': '+comment);
      }
    });
  });

  if(hasChanges){
    // Some items need changes — mark plan as changes requested
    plan.status='changes';
    plan.ownerComment=overallComment||(itemChanges.length+' item(s) need changes:\n'+itemChanges.join('\n'));
    plan.changesAt=new Date().toISOString().split('T')[0];
    addNotification('plan-changes','❌ Monthly plan needs changes on '+itemChanges.length+' item(s) — '+b.name,b.id,null,null);
    persist();buildApprovals();
    toast('❌ Changes requested on '+itemChanges.length+' item(s) — BM notified','var(--red)');
  } else {
    // All items approved
    plan.status='approved';
    plan.approvedAt=new Date().toISOString().split('T')[0];
    plan.approvedBy=CU.name;
    plan.ownerComment=overallComment;
    addNotification('plan-approved','✅ Monthly plan approved by '+CU.name+' — '+b.name,b.id,null,null);
    persist();buildApprovals();
    toast('✅ Monthly plan approved — SAM can now activate','var(--green)');
  }
}

function approveMonthlyPlan(bid,monthKey){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=b.g7Plans[monthKey];if(!plan)return;
  plan.status='approved';
  plan.approvedAt=new Date().toISOString().split('T')[0];
  plan.approvedBy=CU.name;
  plan.ownerComment='';
  addNotification('plan-approved',`✅ Monthly plan approved by ${CU.name} — ${b.name}`,b.id,null,null);
  persist();buildApprovals();
  toast(`✅ Monthly plan approved — SAM can now activate`,'var(--green)');
}

function requestPlanChanges(bid,monthKey){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=b.g7Plans[monthKey];if(!plan)return;
  const commentId='plan-comment-'+bid+'-'+monthKey;
  const comment=document.getElementById(commentId)?.value?.trim();
  if(!comment){toast('⚠ Add a comment explaining what needs to change','var(--amber)');return;}
  plan.status='changes';
  plan.ownerComment=comment;
  plan.changesAt=new Date().toISOString().split('T')[0];
  addNotification('plan-changes',`❌ Monthly plan needs changes: ${comment.substring(0,60)} — ${b.name}`,b.id,null,null);
  persist();buildApprovals();
  toast(`❌ Changes requested — BM notified`,'var(--red)');
}

function submitG7Plan(bid){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  const activeActivities=plan.activities.filter(a=>a.active);
  const hasCampaigns=b.campaigns&&b.campaigns.length>0;
  if(!activeActivities.length&&!hasCampaigns){toast('⚠ Add at least one activity or campaign first','var(--amber)');return;}
  plan.status='submitted';
  plan.submittedAt=new Date().toISOString().split('T')[0];
  plan.submittedBy=CU?CU.name:'BM';
  plan.ownerComment='';
  addNotification('plan-submitted',`📤 Monthly plan submitted for approval — ${b.name}`,b.id,null,null);
  persist();buildWsMonthly(b);
  toast('✓ Monthly plan submitted for owner approval','var(--green)');
}

function activateG7Plan(bid){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  plan.status='active';
  plan.activatedAt=new Date().toISOString().split('T')[0];
  plan.activatedBy=CU?CU.name:'SAM';

  const notified=new Set();
  let tasksCreated=0;

  // 1. Standalone deliverables → create TASKS
  const G_LABELS=['G1 — Brand guidelines','G2 — Website','G3 — SEO'];
  plan.activities.forEach((act,i)=>{
    if(!act||!act.active)return;
    Object.entries(act.deliverableBriefs||{}).forEach(([delivName,bd])=>{
      if(!bd.assigneeId)return;
      // Check if task already exists
      const ref=`${b.id}-${i}-${delivName}`;
      const exists=TASKS.find(t=>t.deliverableRef===ref);
      if(exists)return;
      TASKS.push({
        id:Date.now()+tasksCreated,
        title:delivName+' — '+b.name,
        brandId:b.id,
        g7:'G'+(i+1),
        assigneeId:bd.assigneeId,
        createdById:CU?CU.id:1,
        stage:'todo',
        specStage:'todo',
        priority:bd.priority||'medium',
        due:bd.endDate||act.endDate||'',
        notes:bd.notes||'',
        files:[],specFiles:[],comments:[],
        deliverableRef:ref,
        deliverableName:delivName,
        activityIdx:i,
        createdAt:new Date().toISOString()
      });
      tasksCreated++;
      if(!notified.has(bd.assigneeId)){
        addNotification('plan-activated',`⚡ Plan activated — "${delivName}" assigned to you`,b.id,null,null);
        notified.add(bd.assigneeId);
      }
    });
  });

  // 2. Content pieces — they appear in My Work via plan.status='active'
  // Just notify assigned specialists
  (b.campaigns||[]).forEach(camp=>{
    (camp.contentPieces||[]).forEach(p=>{
      if(p.assigneeId&&!notified.has(p.assigneeId)){
        addNotification('plan-activated',`⚡ Plan activated — content pieces ready in My Work`,b.id,null,null);
        notified.add(p.assigneeId);
      }
    });
  });

  persist();buildWsMonthly(b);buildTaskViews();
  toast(`⚡ Plan activated — ${tasksCreated} task${tasksCreated!==1?'s':''} created · ${notified.size} specialist${notified.size!==1?'s':''} notified`,'var(--teal)');
}

function resetG7Plan(bid){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  plan.status='draft';
  persist();buildWsMonthly(b);
  toast('↩ Plan reset to draft','var(--amber)');
}

function approvePlanSAM(bid){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const plan=getG7Plan(b,CG7Month);
  plan.status='approved';plan.approvedAt=new Date().toISOString().split('T')[0];plan.approvedBy=CU?CU.name:'SAM';
  persist();buildWsMonthly(b);
  toast('✓ Plan approved','var(--green)');
}

function openG7PlanActivity(bid,idx){
  CG7Bid=bid;CG7Idx=idx;
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  const specs=MEMBERS.filter(m=>m.active);
  const specOpts=specs.map(m=>`<option value="${m.id}" ${m.id===act.assigneeId?'selected':''}>${m.name} (${roleLabel(m.role)})</option>`).join('');
  const isLinkable=(idx>=3);
  const campOpts=b.campaigns.map(cp=>`<option value="${cp.name}" ${act.campaignId===cp.name?'selected':''}>${cp.name}</option>`).join('');
  const campRow=isLinkable?`<div class="form-row full"><div class="fg2"><label class="flbl">Link to campaign <span style="color:var(--text3);font-weight:400">(T+E pulled from it)</span></label><select class="fsel" id="g7act-camp"><option value="">No campaign yet</option>${campOpts}</select></div></div>`:'';

  // Deliverable quantity rows per G activity
  const qty=act.qty||{};
  let qtyRow='';
  if(idx===3){ // G4 Newsletter
    qtyRow=`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:500;color:var(--text2);margin-bottom:10px">📦 Deliverables this month</div>
      <div class="form-row"><div class="fg2"><label class="flbl">Newsletters to send</label><input class="finp" type="number" min="1" max="4" id="qty-newsletters" value="${qty.newsletters||1}" style="width:100%"/></div><div class="fg2"><label class="flbl">Cadence</label><select class="fsel" id="qty-cadence"><option ${(qty.cadence||'monthly')==='monthly'?'selected':''}>monthly</option><option ${qty.cadence==='bimonthly'?'selected':''}>bimonthly</option></select></div></div>
    </div>`;
  }else if(idx===4){ // G5 Social Media
    qtyRow=`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:500;color:var(--text2);margin-bottom:10px">📦 Deliverables this month</div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">SM posts (all platforms)</label><input class="finp" type="number" min="0" max="20" id="qty-smposts" value="${qty.smposts||4}" style="width:100%"/></div>
        <div class="fg2"><label class="flbl">Videos / Reels</label><input class="finp" type="number" min="0" max="10" id="qty-videos" value="${qty.videos||0}" style="width:100%"/></div>
      </div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">Stories</label><input class="finp" type="number" min="0" max="20" id="qty-stories" value="${qty.stories||0}" style="width:100%"/></div>
        <div class="fg2"><label class="flbl">Carousels</label><input class="finp" type="number" min="0" max="10" id="qty-carousels" value="${qty.carousels||0}" style="width:100%"/></div>
      </div>
      <div style="font-size:11px;color:var(--text3);margin-top:4px">💡 Platform and creative style set per content piece in the campaign</div>
    </div>`;
  }else if(idx===5){ // G6 PR & Articles
    qtyRow=`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:500;color:var(--text2);margin-bottom:10px">📦 Deliverables this month</div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">PR articles</label><input class="finp" type="number" min="0" max="6" id="qty-pr" value="${qty.pr||0}" style="width:100%"/></div>
        <div class="fg2"><label class="flbl">Blogs / thought leadership</label><input class="finp" type="number" min="0" max="6" id="qty-articles" value="${qty.articles||1}" style="width:100%"/></div>
      </div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">Case studies</label><input class="finp" type="number" min="0" max="4" id="qty-cases" value="${qty.cases||0}" style="width:100%"/></div>
        <div class="fg2"><label class="flbl">Media coverage target</label><input class="finp" type="number" min="0" max="10" id="qty-media" value="${qty.media||0}" style="width:100%"/></div>
      </div>
    </div>`;
  }else if(idx===6){ // G7 Events
    qtyRow=`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:500;color:var(--text2);margin-bottom:10px">📦 Deliverables this month</div>
      <div class="form-row">
        <div class="fg2"><label class="flbl">Internal events</label><input class="finp" type="number" min="0" max="6" id="qty-internal-events" value="${qty.internalEvents||0}" style="width:100%"/></div>
        <div class="fg2"><label class="flbl">External events / conferences</label><input class="finp" type="number" min="0" max="6" id="qty-external-events" value="${qty.externalEvents||0}" style="width:100%"/></div>
      </div>
      <div style="font-size:11px;color:var(--text3);margin-top:6px">💡 Each event gets pre/during/post content tasks + an amplification campaign</div>
    </div>`;
  }

  const ex=document.getElementById('modal-g7plan');if(ex)ex.remove();
  const mo=document.createElement('div');mo.id='modal-g7plan';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:700px;max-height:92vh;overflow-y:auto"><div class="modal-p">
    <div class="mtit">G${idx+1} — ${G7_NAMES[idx]}</div>
    <div class="msub">${b.name} · ${new Date(CG7Month+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Start date</label><input class="finp" type="date" id="g7act-start" value="${act.startDate||''}"/></div>
      <div class="fg2"><label class="flbl">End date</label><input class="finp" type="date" id="g7act-end" value="${act.endDate||''}"/></div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Assign to</label><select class="fsel" id="g7act-assign"><option value="">Unassigned</option>${specOpts}</select></div></div>
    ${qtyRow}
    ${campRow}
    <div class="form-row full"><div class="fg2"><label class="flbl">Brief / notes</label><textarea class="ftxt" id="g7act-notes" style="min-height:56px" placeholder="Key messages, output expected...">${act.notes||''}</textarea></div></div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-g7plan').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveG7Activity()">Save →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function saveG7Activity(){
  const b=BRANDS.find(x=>x.id===CG7Bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[CG7Idx];
  act.startDate=document.getElementById('g7act-start').value;
  act.endDate=document.getElementById('g7act-end').value;
  const av=document.getElementById('g7act-assign').value;act.assigneeId=av?parseInt(av):null;
  const campEl=document.getElementById('g7act-camp');if(campEl)act.campaignId=campEl.value||null;
  act.notes=document.getElementById('g7act-notes').value;
  // Save quantities
  act.qty=act.qty||{};
  if(CG7Idx===3){act.qty.newsletters=parseInt(document.getElementById('qty-newsletters')?.value)||1;act.qty.cadence=document.getElementById('qty-cadence')?.value||'monthly';}
  if(CG7Idx===4){act.qty.smposts=parseInt(document.getElementById('qty-smposts')?.value)||4;act.qty.videos=parseInt(document.getElementById('qty-videos')?.value)||0;act.qty.stories=parseInt(document.getElementById('qty-stories')?.value)||0;act.qty.carousels=parseInt(document.getElementById('qty-carousels')?.value)||0;}
  if(CG7Idx===5){act.qty.pr=parseInt(document.getElementById('qty-pr')?.value)||0;act.qty.articles=parseInt(document.getElementById('qty-articles')?.value)||1;act.qty.cases=parseInt(document.getElementById('qty-cases')?.value)||0;act.qty.media=parseInt(document.getElementById('qty-media')?.value)||0;}
  if(CG7Idx===6){act.qty.internalEvents=parseInt(document.getElementById('qty-internal-events')?.value)||0;act.qty.externalEvents=parseInt(document.getElementById('qty-external-events')?.value)||0;}
  document.getElementById('modal-g7plan').remove();
  persist();buildWsG7(b);buildWsG7Cal(b);
  toast(`✓ G${CG7Idx+1} details saved`,'var(--green)');
}

function approveG7Activity(bid,idx){
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  plan.activities[idx].approved=true;
  // Check if all active activities approved
  const active=plan.activities.filter(a=>a.active);
  const allApproved=active.length>0&&active.every(a=>a.approved);
  if(allApproved){
    plan.status='approved';plan.approvedAt=new Date().toISOString().split('T')[0];
    persist();buildWsG7(b);buildWsG7Cal(b);
    toast('✓ All activities approved — SAM will be notified to generate tasks','var(--green)');
  }else{
    persist();buildWsG7(b);
    toast(`✓ G${idx+1} approved`,'var(--teal)');
  }
}

function commentG7Activity(bid,idx){
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  const t=prompt(`Comment on G${idx+1} — ${G7_NAMES[idx]}:`);
  if(!t)return;
  plan.activities[idx].comment=t;
  plan.status='changes';
  persist();buildWsG7(b);
  toast('💬 Comment added — plan marked as changes requested','var(--amber)');
}

function generateAllG7Tasks(bid){
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  const approved=plan.activities.filter(a=>a.approved&&!a.taskIds.length);
  if(!approved.length){toast('No approved activities without tasks yet','var(--amber)');return;}
  let totalCreated=0;
  const monthLabel=new Date(CG7Month+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});

  plan.activities.forEach((act,i)=>{
    if(!act.approved||act.taskIds.length)return;
    const gLabel='G'+(i+1);
    const qty=act.qty||{};
    const due=act.endDate||'';
    const assignee=act.assigneeId||CU.id;
    const taskBase={brandId:b.id,g7:gLabel,assigneeId:assignee,priority:'medium',stage:'todo',due,
      challenges:'',remarks:'',score:0,files:[],createdAt:new Date().toISOString().split('T')[0]};

    let newTasks=[];

    // Use master campaign for G4/G5/G6 tasks
    const masterCamp=plan.masterCampaign?b.campaigns.find(cp=>cp.name===plan.masterCampaign):null;
    const masterCampName=masterCamp?masterCamp.name:null;

    if(i===0){ // G1 Brand guidelines
      newTasks=['Define brand voice & tone','Create logo package','Typography guide','Colour palette','Sales kit / pitch deck']
        .map(t=>({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:t,notes:'G1 — Brand guidelines',campaignId:null}));
    }else if(i===1){ // G2 Website
      newTasks=['Website audit','Sitemap update','Design revisions','Content update','Test & publish']
        .map(t=>({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:t,notes:'G2 — Website',campaignId:null}));
    }else if(i===2){ // G3 SEO
      newTasks=['Keyword research','On-page SEO audit','Meta tags update','Backlink outreach','Analytics report']
        .map(t=>({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:t,notes:'G3 — SEO',campaignId:null}));
    }else if(i===3){ // G4 Newsletter
      const n=qty.newsletters||1;
      for(let x=1;x<=n;x++){
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Newsletter ${n>1?x+' — ':' — '}${monthLabel}`,notes:`G4 — Newsletter · ${qty.cadence||'Monthly'}`,campaignId:masterCampName||act.campaignId||null});
      }
      newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Newsletter design — ${monthLabel}`,notes:'G4 — Design',campaignId:masterCampName||act.campaignId||null});
      if(masterCampName)act.campaignId=masterCampName;
    }else if(i===4){ // G5 Social Media
      const sm=qty.smposts||4;const vids=qty.videos||0;const stories=qty.stories||0;const carousels=qty.carousels||0;
      // SM content calendar
      newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`SM content calendar — ${monthLabel}`,notes:'G5 — Social Media · Planning',campaignId:masterCampName||act.campaignId||null});
      for(let x=1;x<=sm;x++) newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`SM Post ${x} — ${monthLabel}`,notes:'G5 — Social Media · Post',campaignId:masterCampName||act.campaignId||null});
      for(let x=1;x<=vids;x++){
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Video/Reel ${vids>1?x+' — ':' — '}${monthLabel} — Script`,notes:'G5 — Video · Script',campaignId:masterCampName||act.campaignId||null});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Video/Reel ${vids>1?x+' — ':' — '}${monthLabel} — Shoot & edit`,notes:'G5 — Video · Production',campaignId:masterCampName||act.campaignId||null});
      }
      for(let x=1;x<=stories;x++) newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Story ${stories>1?x+' — ':' — '}${monthLabel}`,notes:'G5 — Story',campaignId:masterCampName||act.campaignId||null});
      for(let x=1;x<=carousels;x++) newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Carousel ${carousels>1?x+' — ':' — '}${monthLabel}`,notes:'G5 — Carousel',campaignId:masterCampName||act.campaignId||null});
      if(masterCampName)act.campaignId=masterCampName;
    }else if(i===5){ // G6 PR & Articles
      const pr=qty.pr||0;const ar=qty.articles||1;const cs=qty.cases||0;const med=qty.media||0;
      for(let x=1;x<=pr;x++){
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`PR article${pr>1?' '+x:''} — Topic & brief`,notes:'G6 — PR · Brief',campaignId:masterCampName||act.campaignId||null});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`PR article${pr>1?' '+x:''} — Draft & review`,notes:'G6 — PR · Draft',campaignId:masterCampName||act.campaignId||null});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`PR article${pr>1?' '+x:''} — Distribute`,notes:'G6 — PR · Distribution',campaignId:masterCampName||act.campaignId||null});
        // Amplification campaign per PR
        const ampName=`PR Amplification${pr>1?' '+x:''} — ${monthLabel}`;
        b.campaigns.push({name:ampName,po:'both',T:'',E:'',M:['LinkedIn','PR/Media','Email','WhatsApp','SEO/Blog'],C:['Static image','Article / Blog','Video'],A:'',start:act.startDate||'',status:'planning',g7Link:'G6',contentPieces:[],clientApproved:false});
        if(!act.campaignId)act.campaignId=ampName;
      }
      for(let x=1;x<=ar;x++) newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Blog${ar>1?' '+x:''} — ${monthLabel}`,notes:'G6 — Blog',campaignId:masterCampName||act.campaignId||null});
      for(let x=1;x<=cs;x++) newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Case study${cs>1?' '+x:''} — ${monthLabel}`,notes:'G6 — Case study',campaignId:masterCampName||act.campaignId||null});
      if(med) newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`Media outreach — ${monthLabel}`,notes:'G6 — Media coverage',campaignId:masterCampName||act.campaignId||null});
      if(masterCampName)act.campaignId=masterCampName;
    }else if(i===6){ // G7 Events
      const intEv=qty.internalEvents||0;const extEv=qty.externalEvents||0;
      const allEvents=[...Array(intEv).fill('Internal event'),...Array(extEv).fill('External event')];
      allEvents.forEach((evType,x)=>{
        const evLabel=`${evType}${allEvents.length>1?' '+(x+1):''} — ${monthLabel}`;
        // Event campaign for amplification
        const evCamp=`${evType} Amplification${allEvents.length>1?' '+(x+1):''} — ${monthLabel}`;
        b.campaigns.push({name:evCamp,po:'both',T:'',E:'',M:['LinkedIn','Instagram','Email','WhatsApp'],C:['Video','Static image','Reel / Short','Carousel'],A:'',start:act.startDate||'',status:'planning',g7Link:'G7',contentPieces:[],clientApproved:false});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`${evLabel} — Brief & objective`,notes:'G7 — Event plan',campaignId:evCamp});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`${evLabel} — Pre-buzz posts & mailer`,notes:'G7 — Pre-event',campaignId:evCamp});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`${evLabel} — Logistics & branding`,notes:'G7 — Pre-event',campaignId:null});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`${evLabel} — Live coverage`,notes:'G7 — During event',campaignId:evCamp});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`${evLabel} — Recap reel & blog`,notes:'G7 — Post-event',campaignId:evCamp});
        newTasks.push({...taskBase,id:Date.now()+totalCreated+newTasks.length,title:`${evLabel} — Thank-you mailer & impact report`,notes:'G7 — Post-event',campaignId:null});
        if(!act.campaignId)act.campaignId=evCamp;
      });
    }

    // Push all tasks
    newTasks.forEach(t=>{TASKS.push(t);act.taskIds.push(t.id);totalCreated++;});
    act.status='inprogress';
  });

  persist();buildWsG7(b);buildWsG7Cal(b);buildWsMonthly(b);buildTaskViews();buildDashboard();
  toast(`⚡ ${totalCreated} tasks generated — campaigns auto-created in Campaigns tab`,'var(--green)');
}

// Keep openG7Tasks for individual activity task generation
function openG7Tasks(bid,idx){
  CG7Bid=bid;CG7Idx=idx;
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  const templates=G7_TASKS[idx];
  const ex=document.getElementById('modal-g7tasks');if(ex)ex.remove();
  const mo=document.createElement('div');mo.id='modal-g7tasks';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none;max-width:700px;max-height:92vh;overflow-y:auto"><div class="modal-p">
    <div class="mtit">Generate tasks — G${idx+1}</div>
    <div class="msub">${b.name} · Select tasks to create</div>
    <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px;margin-bottom:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <span style="font-size:11px;font-weight:500;color:var(--text2)">Suggested tasks</span>
        <span style="font-size:11px;color:var(--accent2);cursor:pointer" onclick="document.querySelectorAll('[id^=g7t-]').forEach(e=>e.checked=true)">Select all</span>
      </div>
      ${templates.map((t,ti)=>`<label style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:.5px solid var(--border);cursor:pointer">
        <input type="checkbox" id="g7t-${ti}" checked style="accent-color:var(--accent);width:14px;height:14px"/>
        <span style="font-size:12px">${t}</span>
      </label>`).join('')}
    </div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Due date</label><input class="finp" type="date" id="g7t-due" value="${act.endDate||''}"/></div>
      <div class="fg2"><label class="flbl">Priority</label><select class="fsel" id="g7t-priority"><option value="high">High</option><option value="medium" selected>Medium</option><option value="low">Low</option></select></div>
    </div>
    <div style="margin-bottom:12px">
      <label class="flbl">+ Add custom tasks</label>
      <div id="g7t-custom-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:6px"></div>
      <div style="display:flex;gap:6px">
        <input class="finp" id="g7t-custom-input" placeholder="e.g. Create brand colour palette..." style="font-size:12px" onkeydown="if(event.key==='Enter'){addG7CustomTask();event.preventDefault();}"/>
        <button class="btn btn-sm btn-p" onclick="addG7CustomTask()">+ Add</button>
      </div>
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-g7tasks').remove()">Cancel</button>
      <button class="mbtn ok" onclick="createG7Tasks()">Create tasks →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function addG7CustomTask(){
  const input=document.getElementById('g7t-custom-input');
  const text=input?.value?.trim();
  if(!text)return;
  const list=document.getElementById('g7t-custom-list');if(!list)return;
  const id='g7tc-'+Date.now();
  const div=document.createElement('div');
  div.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--bg3);border:.5px solid var(--acb);border-radius:var(--rsm)';
  div.innerHTML=`<input type="checkbox" id="${id}" checked style="accent-color:var(--accent);width:14px;height:14px;flex-shrink:0"/>
    <span style="font-size:12px;flex:1">${text}</span>
    <button onclick="this.parentNode.remove()" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:0">×</button>`;
  div.dataset.title=text;
  list.appendChild(div);
  input.value='';
  input.focus();
}

function createG7Tasks(){
  const b=BRANDS.find(x=>x.id===CG7Bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[CG7Idx];
  const templates=G7_TASKS[CG7Idx];
  const due=document.getElementById('g7t-due').value;
  const priority=document.getElementById('g7t-priority').value;
  const gLabel='G'+(CG7Idx+1);let created=0;
  const assigneeId=act.assigneeId||CU.id;
  const createdById=CU.id;

  // Suggested tasks (checked)
  templates.forEach((title,i)=>{
    const cb=document.getElementById('g7t-'+i);if(!cb||!cb.checked)return;
    const newTask={id:Date.now()+created,title,brandId:b.id,g7:gLabel,
      assigneeId,createdById,priority,stage:'todo',due,
      notes:'',challenges:'',remarks:'',score:0,files:[],comments:[],
      campaignId:act.campaignId||null,createdAt:new Date().toISOString().split('T')[0]};
    TASKS.push(newTask);act.taskIds=act.taskIds||[];act.taskIds.push(newTask.id);created++;
  });

  // Custom tasks
  document.querySelectorAll('#g7t-custom-list div').forEach(div=>{
    const cb=div.querySelector('input[type=checkbox]');
    if(!cb||!cb.checked)return;
    const title=div.dataset.title;if(!title)return;
    const newTask={id:Date.now()+created,title,brandId:b.id,g7:gLabel,
      assigneeId,createdById,priority,stage:'todo',due,
      notes:'',challenges:'',remarks:'',score:0,files:[],comments:[],
      campaignId:act.campaignId||null,createdAt:new Date().toISOString().split('T')[0]};
    TASKS.push(newTask);act.taskIds=act.taskIds||[];act.taskIds.push(newTask.id);created++;
  });
  // Auto-create campaign for G4-G7
  if(G7_CAMP_IDX.includes(CG7Idx)&&!act.campaignId){
    const monthLabel=new Date(CG7Month+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'});
    const campName=`${G7_NAMES[CG7Idx].split(' ')[0]} Amplification — ${monthLabel}`;
    b.campaigns.push({name:campName,po:'both',T:'',E:'',
      M:G7_CAMP_MEDIUMS[CG7Idx]?G7_CAMP_MEDIUMS[CG7Idx].slice():[],
      C:G7_CAMP_CREATIVE[CG7Idx]?G7_CAMP_CREATIVE[CG7Idx].slice():[],
      A:'',start:act.startDate||'',status:'planning',g7Link:gLabel,clientApproved:false});
    act.campaignId=campName;
  }
  act.status='inprogress';
  document.getElementById('modal-g7tasks').remove();
  persist();buildWsG7(b);buildWsG7Cal(b);buildWsMonthly(b);buildTaskViews();buildDashboard();
  toast(`✓ ${created} tasks created for ${gLabel}`,'var(--green)');
}

function toggleG7Done(bid,idx){
  const b=BRANDS.find(x=>x.id===bid);
  const plan=getG7Plan(b,CG7Month);
  const act=plan.activities[idx];
  act.done=!act.done;act.status=act.done?'done':'inprogress';
  // Sync back to b.g7 for percentage display
  if(b.g7&&b.g7[idx])b.g7[idx].done=act.done;
  persist();buildWsG7(b);buildWsG7Cal(b);buildBrandsGrid();buildWsOverview(b);
  toast(act.done?`✓ G${idx+1} done`:`↩ G${idx+1} reopened`,act.done?'var(--green)':'var(--amber)');
}

function buildWsG7Cal(b){
  // ws-g7cal panel removed
  const now=new Date();
  const monthKey=CG7Month||(now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0'));
  CG7Month=monthKey;
  const [yr,mo]=monthKey.split('-').map(Number);
  const daysInMonth=new Date(yr,mo,0).getDate();
  const monthLabel=new Date(yr,mo-1,1).toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  const today=now.toISOString().split('T')[0];
  const dayHeaders=Array.from({length:daysInMonth},(_,i)=>{const d=i+1;const ds=`${yr}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;return`<div style="text-align:center;font-size:9px;color:${ds===today?'var(--accent2)':'var(--text3)'};font-weight:${ds===today?700:400};min-width:18px;flex:1">${d}</div>`;}).join('');
  const rows=G7_NAMES.map((name,i)=>{
    const plan2=getG7Plan(b,CG7Month);const act=plan2.activities[i]||{};
    const col=act.done?'var(--green)':act.status==='inprogress'?'var(--blue)':act.status==='overdue'?'var(--red)':'var(--bg4)';
    const cells=Array.from({length:daysInMonth},(_,di)=>{
      const d=di+1;const ds=`${yr}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const inRange=act.startDate&&act.endDate&&ds>=act.startDate&&ds<=act.endDate;
      const isStart=act.startDate&&ds===act.startDate;const isEnd=act.endDate&&ds===act.endDate;
      const isToday=ds===today;
      return`<div style="min-width:18px;flex:1;height:22px;background:${inRange?col:'transparent'};border-radius:${isStart?'4px 0 0 4px':isEnd?'0 4px 4px 0':'0'};${isToday?'outline:1.5px solid var(--accent2);outline-offset:-1px':''}"></div>`;
    }).join('');
    const linkedTasks=TASKS.filter(t=>t.brandId===b.id&&t.g7===`G${i+1}`);
    const doneTasks=linkedTasks.filter(t=>t.stage==='completed').length;
    return`<div style="display:flex;align-items:center;margin-bottom:6px;gap:0"><div style="width:120px;flex-shrink:0;display:flex;align-items:center;gap:5px;padding-right:8px;cursor:pointer" onclick="openG7Plan(${b.id},${i})"><div style="width:20px;height:20px;border-radius:5px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0">G${i+1}</div><div style="font-size:10px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1">${name.split(/[\+&]/)[0].trim()}</div></div><div style="flex:1;display:flex;cursor:pointer" onclick="openG7Plan(${b.id},${i})" title="${name}${act.startDate?' · '+act.startDate+' → '+(act.endDate||''):''}">${cells}</div><div style="width:50px;flex-shrink:0;text-align:right;font-size:10px;color:${col};padding-left:6px">${linkedTasks.length?doneTasks+'/'+linkedTasks.length:act.done?'✓':'—'}</div></div>`;
  }).join('');
  el.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px"><div style="font-size:15px;font-weight:600">G7 Calendar — ${b.name}</div><div style="display:flex;align-items:center;gap:8px"><button style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:5px 9px;color:var(--text2);font-family:var(--font);font-size:11px;cursor:pointer" onclick="changeG7Month(${b.id},-1)">‹ Prev</button><span style="font-size:12px;font-weight:500;min-width:110px;text-align:center">${monthLabel}</span><button style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:5px 9px;color:var(--text2);font-family:var(--font);font-size:11px;cursor:pointer" onclick="changeG7Month(${b.id},1)">Next ›</button></div></div><div style="display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap">${[['var(--blue)','In progress'],['var(--green)','Done'],['var(--red)','Overdue'],['var(--bg4)','Not started']].map(([cl,lb])=>`<div style="display:flex;align-items:center;gap:5px"><div style="width:12px;height:12px;border-radius:3px;background:${cl}"></div><span style="font-size:10px;color:var(--text2)">${lb}</span></div>`).join('')}</div><div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;overflow-x:auto"><div style="display:flex;margin-bottom:8px;padding-left:120px;padding-right:50px">${dayHeaders}</div><div style="margin-bottom:10px;border-bottom:.5px solid var(--border);padding-bottom:8px"><span style="font-size:10px;color:var(--accent2)">◆ Today: ${today}</span></div>${rows}</div><div style="font-size:11px;color:var(--text3);margin-top:10px;text-align:center">Click any row to plan that activity</div>`;
}
// ═══ INTEGRATIONS ═══════════════════════════════════════
function buildIntegrationsList(){
  const list=document.getElementById('integrations-list');
  const empty=document.getElementById('integrations-empty');
  if(!list)return;
  if(!INTEGRATIONS.length){list.innerHTML='';if(empty)empty.style.display='block';return;}
  if(empty)empty.style.display='none';
  list.innerHTML=INTEGRATIONS.map((ig,i)=>`
    <div class="strow" style="align-items:center">
      <div style="display:flex;align-items:center;gap:10px;flex:1">
        <span style="font-size:20px">${ig.icon||'🔌'}</span>
        <div>
          <div style="font-size:13px;font-weight:500">${ig.name}</div>
          <div style="font-size:11px;color:var(--text3)">${ig.type||'Custom'} · ${ig.apiUrl?ig.apiUrl.replace(/^https?:\/\//,'').substring(0,40)+'...':'No URL'}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <span class="badge ${ig.active?'bg':'bgr'}">${ig.active?'Active':'Inactive'}</span>
        <button class="tbtn" onclick="toggleIntegration(${i})">${ig.active?'Disable':'Enable'}</button>
        <button class="tbtn" onclick="editIntegration(${i})">Edit</button>
        <button class="tbtn" style="color:var(--red)" onclick="deleteIntegration(${i})">Remove</button>
      </div>
    </div>`).join('');
}

function openAddIntegration(editIdx){
  const ig=editIdx!==undefined?INTEGRATIONS[editIdx]:{};
  const mo=document.createElement('div');mo.id='modal-integration';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">${editIdx!==undefined?'Edit':'Add'} integration</div>
    <div class="msub">Connect a publishing or scheduling tool</div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Tool name *</label><input class="finp" id="ig-name" placeholder="e.g. Postiz, Buffer, Hootsuite" value="${ig.name||''}"/></div>
      <div class="fg2"><label class="flbl">Type</label><select class="fsel" id="ig-type">
        <option value="scheduler" ${ig.type==='scheduler'?'selected':''}>Social scheduler</option>
        <option value="webhook" ${ig.type==='webhook'?'selected':''}>Webhook</option>
        <option value="cms" ${ig.type==='cms'?'selected':''}>CMS</option>
        <option value="custom" ${ig.type==='custom'?'selected':''}>Custom API</option>
      </select></div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">API Base URL</label><input class="finp" id="ig-url" placeholder="e.g. https://api.postiz.com/public/v1 or https://api.bufferapp.com/1" value="${ig.apiUrl||''}"/></div></div>
    <div class="form-row full"><div class="fg2"><label class="flbl">API Key / Token</label><input class="finp" id="ig-key" type="password" placeholder="Paste your API key or Bearer token" value="${ig.apiKey||''}"/></div></div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Webhook URL <span style="color:var(--text3)">(optional — fired when post is approved)</span></label><input class="finp" id="ig-webhook" placeholder="https://hooks.make.com/..." value="${ig.webhookUrl||''}"/></div></div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Notes</label><textarea class="ftxt" id="ig-notes" placeholder="e.g. Used for AutoDrive brand, LinkedIn + Instagram only" style="min-height:46px">${ig.notes||''}</textarea></div></div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-integration').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveIntegration(${editIdx!==undefined?editIdx:'undefined'})">Save integration →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
  setTimeout(()=>document.getElementById('ig-name')?.focus(),100);
}

function saveIntegration(editIdx){
  const name=document.getElementById('ig-name').value.trim();
  if(!name){toast('⚠ Name required','var(--amber)');return;}
  const ig={
    id:editIdx!==undefined?INTEGRATIONS[editIdx].id:Date.now(),
    name,
    type:document.getElementById('ig-type').value,
    apiUrl:document.getElementById('ig-url').value.trim(),
    apiKey:document.getElementById('ig-key').value.trim(),
    webhookUrl:document.getElementById('ig-webhook').value.trim(),
    notes:document.getElementById('ig-notes').value.trim(),
    active:true,
    icon:document.getElementById('ig-type').value==='scheduler'?'📅':document.getElementById('ig-type').value==='webhook'?'🔗':'🔌',
    createdAt:new Date().toISOString()
  };
  if(editIdx!==undefined)INTEGRATIONS[editIdx]=ig;
  else INTEGRATIONS.push(ig);
  persist();
  document.getElementById('modal-integration').remove();
  buildIntegrationsList();
  toast(`✓ Integration "${name}" saved`,'var(--green)');
}

function editIntegration(i){openAddIntegration(i);}
function toggleIntegration(i){INTEGRATIONS[i].active=!INTEGRATIONS[i].active;persist();buildIntegrationsList();toast(`Integration ${INTEGRATIONS[i].active?'enabled':'disabled'}`,'var(--amber)');}
function deleteIntegration(i){if(!confirm(`Remove ${INTEGRATIONS[i].name}?`))return;INTEGRATIONS.splice(i,1);persist();buildIntegrationsList();}

// ═══ PUBLISHING QUEUE ═══════════════════════════════════════
function buildWsPubQueue(b){
  const el=document.getElementById('ws-pubqueue');if(!el)return;
  const queue=[];
  (b.campaigns||[]).forEach((camp,ci)=>{
    (camp.contentPieces||[]).forEach((p,pi)=>{
      if(p.status==='approved'||p.publishStatus==='ready'||p.publishStatus==='scheduled'||p.publishStatus==='published'||p.publishStatus==='error'){
        queue.push({p,pi,ci,camp,b});
      }
    });
  });

  const statusBadge=(p)=>{
    if(p.publishStatus==='published')return`<span style="font-size:10px;padding:2px 8px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:9px;color:var(--green)">✅ Published</span>`;
    if(p.publishStatus==='scheduled')return`<span style="font-size:10px;padding:2px 8px;background:var(--bbg);border:.5px solid rgba(91,174,247,.35);border-radius:9px;color:var(--blue)">📅 Scheduled</span>`;
    if(p.publishStatus==='error')return`<span style="font-size:10px;padding:2px 8px;background:var(--rbg);border:.5px solid var(--rborder);border-radius:9px;color:var(--red)">❌ Error</span>`;
    return`<span style="font-size:10px;padding:2px 8px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:9px;color:var(--amber)">⏳ Ready</span>`;
  };
  const platformIcon=(pl)=>({LinkedIn:'💼',Instagram:'📸',Facebook:'👥',Twitter:'🐦','Twitter/X':'🐦',YouTube:'▶️',TikTok:'🎵',Email:'✉️',WhatsApp:'💬'})[pl]||'📱';
  const activeIntegrations=INTEGRATIONS.filter(ig=>ig.active);

  el.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-size:15px;font-weight:600">Publishing Queue — ${b.name}</div>
        <div style="font-size:12px;color:var(--text3)">${queue.length} post${queue.length!==1?'s':''} · ${queue.filter(x=>x.p.publishStatus==='scheduled').length} scheduled · ${queue.filter(x=>x.p.publishStatus==='published').length} published</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${queue.length?`<button class="btn btn-sm" onclick="exportQueueCSV(${b.id})">⬇ Export CSV</button>`:''}
        ${queue.filter(x=>x.p.publishStatus==='ready'||!x.p.publishStatus).length&&activeIntegrations.length?`<button class="btn btn-sm btn-p" onclick="scheduleAllPosts(${b.id})">📤 Schedule all ready</button>`:''}
      </div>
    </div>
    ${!activeIntegrations.length?`<div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:10px 14px;font-size:12px;color:var(--amber);margin-bottom:14px">⚠ No integrations connected — <button onclick="showScreen('settings',null)" style="background:none;border:none;color:var(--accent2);cursor:pointer;font-family:var(--font);font-size:12px;text-decoration:underline">add one in Settings →</button></div>`:''}
    ${!queue.length
      ?`<div style="text-align:center;padding:60px 20px"><div style="font-size:40px;margin-bottom:12px;opacity:.3">📤</div><div style="font-size:14px;color:var(--text2)">No approved posts yet</div><div style="font-size:12px;color:var(--text3);margin-top:4px">Approve content pieces to add them here</div></div>`
      :`<div style="display:flex;flex-direction:column;gap:10px">
        ${queue.map(({p,pi,ci,camp})=>{
          const pl=p.platform||(p.platforms||[])[0]||'';
          const specFiles=p.ownerSpecFiles||p.specFiles||[];
          const attachments=p.attachments||[];
          const isPublished=p.publishStatus==='published';
          const isScheduled=p.publishStatus==='scheduled';

          // Copy-all helper
          const allContent=[p.copy,p.caption,p.hashtags].filter(Boolean).join('\n\n');
          const safeAllContent=allContent.replace(/'/g,"\\'").replace(/\n/g,'\\n');

          return`<div style="background:var(--bg2);border:.5px solid ${isPublished?'var(--gnb)':isScheduled?'rgba(91,174,247,.35)':'var(--border)'};border-radius:var(--r);padding:14px">
            <!-- Header -->
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap">
              <span style="font-size:18px">${platformIcon(pl)}</span>
              <div style="flex:1;min-width:0">
                <div style="font-size:13px;font-weight:600">${p.topic||'Untitled'}</div>
                <div style="font-size:10px;color:var(--text3)">${camp.name}${pl?' · '+pl:''}${p.creativeStyle?' · '+p.creativeStyle:''}${p.postDate?' · 📅 '+p.postDate:''}</div>
              </div>
              ${statusBadge(p)}
            </div>

            <!-- TEMC reference -->
            ${(p.targeting||p.elevator||p.keywords||camp.T||camp.E)?`<div style="background:var(--bg3);border-radius:var(--rsm);padding:8px 10px;margin-bottom:10px;display:flex;gap:12px;flex-wrap:wrap">
              ${(p.targeting||camp.T)?`<div style="min-width:0"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em">T — Target</div><div style="font-size:11px;color:var(--text2)">${p.targeting||camp.T}</div></div>`:''}
              ${(p.elevator||camp.E)?`<div style="min-width:0;flex:1"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em">E — Pitch</div><div style="font-size:11px;color:var(--text2)">${p.elevator||camp.E}</div></div>`:''}
              ${p.keywords?`<div style="min-width:0"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em">Keywords</div><div style="font-size:11px;color:var(--text2)">${p.keywords}</div></div>`:''}
            </div>`:''}

            <!-- Content — always visible -->
            <div style="border:.5px solid var(--border);border-radius:var(--rsm);overflow:hidden;margin-bottom:10px">
              <!-- Copy -->
              <div style="padding:8px 10px;border-bottom:.5px solid var(--border)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Copy</span>
                  ${p.copy?`<button onclick="navigator.clipboard.writeText('${(p.copy||'').replace(/'/g,"\\'")}');toast('Copied','var(--green)')" style="font-size:9px;padding:1px 7px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button>`:''}
                </div>
                <div style="font-size:12px;color:${p.copy?'var(--text2)':'var(--text3)'};line-height:1.5;${p.copy?'white-space:pre-wrap;max-height:80px;overflow-y:auto':'font-style:italic'}">${p.copy||'— not filled in'}</div>
              </div>
              <!-- Caption -->
              <div style="padding:8px 10px;border-bottom:.5px solid var(--border)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Caption</span>
                  ${p.caption?`<button onclick="navigator.clipboard.writeText('${(p.caption||'').replace(/'/g,"\\'")}');toast('Copied','var(--green)')" style="font-size:9px;padding:1px 7px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button>`:''}
                </div>
                <div style="font-size:12px;color:${p.caption?'var(--text2)':'var(--text3)'};${p.caption?'':'font-style:italic'}">${p.caption||'— not filled in'}</div>
              </div>
              <!-- Hashtags -->
              <div style="padding:8px 10px">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Hashtags</span>
                  ${p.hashtags?`<button onclick="navigator.clipboard.writeText('${(p.hashtags||'').replace(/'/g,"\\'")}');toast('Copied','var(--green)')" style="font-size:9px;padding:1px 7px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button>`:''}
                </div>
                <div style="font-size:12px;color:${p.hashtags?'var(--accent2)':'var(--text3)'};${p.hashtags?'':'font-style:italic'}">${p.hashtags||'— not filled in'}</div>
              </div>
            </div>

            <!-- Design files from specialist -->
            ${specFiles.length?`<div style="margin-bottom:10px"><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px">🎨 Design files</div><div style="display:flex;flex-wrap:wrap;gap:5px">${specFiles.map((f,fi)=>{
              const hasData=!!f.data;
              const cursor=hasData?'cursor:pointer':'opacity:.7';
              const click=hasData?`onclick="openCPAttachment(${b.id},${ci},${pi},${fi},true)"`:'';
              const hover=hasData?`onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--acb)'"`:'';
              return`<div style="display:flex;align-items:center;gap:5px;padding:4px 10px;background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);${cursor};transition:border-color .15s" ${click} ${hover}><span style="font-size:11px">${getFileIcon(f.name)}</span><span style="font-size:11px;color:var(--accent2)">${f.name}</span>${f.size?`<span style="font-size:9px;color:var(--text3)">${f.size}</span>`:''}${hasData?'<span style="font-size:9px;color:var(--accent2);margin-left:2px">›</span>':''}</div>`;
            }).join('')}</div></div>`:''}

            <!-- Reference attachments -->
            ${attachments.length?`<div style="margin-bottom:10px"><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px">📎 References</div><div style="display:flex;flex-wrap:wrap;gap:5px">${attachments.map(a=>`<span style="font-size:10px;padding:3px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2)">📎 ${a.name}</span>`).join('')}</div></div>`:''}
            <!-- File paths from specialist task submission -->
            ${(()=>{const linkedTask=TASKS.find(t=>String(p.taskId)===String(t.id)||(t.contentPieceRef&&String(t.contentPieceRef.bid)===String(b.id)&&t.contentPieceRef.ci===ci&&t.contentPieceRef.pi===pi));const paths=linkedTask&&linkedTask.filePaths&&linkedTask.filePaths.length?linkedTask.filePaths:[];return paths.length?`<div style="margin-bottom:10px"><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px">📁 File paths / Links</div>${paths.map(fp=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:4px"><span>${fp.url.startsWith('http')?'🔗':'📂'}</span><div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500">${fp.label||'File'}</div><div style="font-size:10px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fp.url}</div></div>${fp.url.startsWith('http')?`<a href="${fp.url}" target="_blank" rel="noopener" style="font-size:11px;padding:4px 10px;background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--rsm);color:var(--accent2);text-decoration:none">Open →</a>`:`<button onclick="navigator.clipboard.writeText('${fp.url}');toast('Path copied','var(--green)')" style="font-size:10px;padding:3px 8px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy</button>`}</div>`).join('')}</div>`:'';})()}
            <!-- Actions -->
            <div style="display:flex;gap:6px;flex-wrap:wrap;padding-top:10px;border-top:.5px solid var(--border);align-items:center">
              <button onclick="downloadPost(${b.id},${ci},${pi})" style="font-size:11px;padding:5px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">⬇ Download</button>
              ${allContent?`<button onclick="navigator.clipboard.writeText('${safeAllContent}');toast('📋 All content copied','var(--green)')" style="font-size:11px;padding:5px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)">📋 Copy all</button>`:''}
              ${!isPublished&&!isScheduled?`<button onclick="markPublishStatus(${b.id},${ci},${pi},'scheduled')" style="font-size:11px;padding:5px 12px;background:var(--bbg);border:.5px solid rgba(91,174,247,.35);border-radius:var(--rsm);color:var(--blue);cursor:pointer;font-family:var(--font)">📅 Mark scheduled</button>`:''}
              ${!isPublished?`<button onclick="markPublishStatus(${b.id},${ci},${pi},'published')" style="font-size:11px;padding:5px 12px;background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);color:var(--green);cursor:pointer;font-family:var(--font)">✅ Mark published</button>`:`<span style="font-size:11px;color:var(--green)">✅ Published${p.publishedAt?' · '+new Date(p.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):''}</span>`}
              ${isPublished?`<button onclick="markPublishStatus(${b.id},${ci},${pi},'ready')" style="font-size:11px;padding:5px 12px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text3);cursor:pointer;font-family:var(--font)">↩ Undo</button>`:''}
              ${activeIntegrations.length
                ?`<div style="display:flex;align-items:center;gap:6px;margin-left:auto">
                    <select id="pub-channel-${b.id}-${ci}-${pi}" style="font-size:11px;padding:4px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);font-family:var(--font)">
                      ${activeIntegrations.map(ig=>`<option value="${ig.id}">${ig.name}</option>`).join('')}
                    </select>
                    ${!isPublished?`<button onclick="publishViaIntegration(${b.id},${ci},${pi})" style="font-size:11px;padding:5px 14px;background:var(--accent);border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font);font-weight:600">📤 Send</button>`:''}
                  </div>`
                :`<div style="margin-left:auto;display:flex;align-items:center;gap:6px">
                    <span style="font-size:10px;color:var(--text3);font-style:italic">No integration —</span>
                    <button onclick="showScreen('settings',null)" style="font-size:10px;padding:3px 8px;background:none;border:.5px solid var(--border);border-radius:var(--rsm);color:var(--accent2);cursor:pointer;font-family:var(--font)">Connect →</button>
                  </div>`}
            </div>
          </div>`;
        }).join('')}
      </div>`}`;
}

function copyPostContent(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  const p=b.campaigns[ci].contentPieces[pi];
  const content=[p.topic,p.copy,p.caption,p.hashtags].filter(Boolean).join('\n\n');
  navigator.clipboard.writeText(content).then(()=>toast('📋 Copied to clipboard','var(--green)')).catch(()=>toast('⚠ Copy failed','var(--amber)'));
}

function downloadPost(bid,ci,pi){
  const b=BRANDS.find(x=>x.id==bid);
  const p=b.campaigns[ci].contentPieces[pi];
  const lines=[
    `Brand: ${b.name}`,
    `Topic: ${p.topic||''}`,
    `Platform: ${p.platform||''}`,
    `Post date: ${p.postDate||''}`,
    ``,
    `=== COPY ===`,
    p.copy||'',
    ``,
    `=== CAPTION ===`,
    p.caption||'',
    ``,
    `=== HASHTAGS ===`,
    p.hashtags||'',
    ``,
    `=== VISUAL IDEA ===`,
    p.visualIdea||''
  ];
  const blob=new Blob([lines.join('\n')],{type:'text/plain'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`${b.name}_${(p.topic||'post').replace(/\s+/g,'_')}_${p.postDate||'draft'}.txt`;
  a.click();
  toast('⬇ Post downloaded','var(--green)');
}

function sendToIntegration(bid,ci,pi,igId){
  const b=BRANDS.find(x=>x.id==bid);
  const p=b.campaigns[ci].contentPieces[pi];
  const ig=INTEGRATIONS.find(x=>x.id==igId);
  if(!ig){toast('⚠ Integration not found','var(--red)');return;}

  const payload={
    brand:b.name,
    topic:p.topic,
    content:[p.copy,p.caption,p.hashtags].filter(Boolean).join('\n\n'),
    platform:p.platform||(p.platforms||[])[0]||'',
    postDate:p.postDate,
    hashtags:p.hashtags,
    source:'MarketingOS'
  };

  // Try webhook first
  if(ig.webhookUrl){
    fetch(ig.webhookUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      .then(r=>{
        p.publishStatus='scheduled';
        p.scheduledVia=ig.name;
        p.scheduledAt=new Date().toISOString();
        persist();buildWsPubQueue(b);updatePubQueueBadge(b);
        toast(`📤 Sent to ${ig.name} via webhook`,'var(--green)');
      })
      .catch(()=>{
        showIntegrationPayload(payload,ig);
      });
  } else if(ig.apiUrl&&ig.apiKey){
    showIntegrationPayload(payload,ig);
  } else {
    showIntegrationPayload(payload,ig);
  }
}

// Called by the per-card 📤 Publish button — reads the channel dropdown then fires sendToIntegration
function publishViaIntegration(bid,ci,pi){
  const sel=document.getElementById('pub-channel-'+bid+'-'+ci+'-'+pi);
  const igId=sel?sel.value:null;
  if(!igId){toast('⚠ Select a channel first','var(--amber)');return;}
  sendToIntegration(bid,ci,pi,igId);
}

function showIntegrationPayload(payload,ig){
  const mo=document.createElement('div');mo.id='modal-ig-payload';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Send to ${ig.name}</div>
    <div class="msub">${ig.apiUrl||ig.webhookUrl||'No URL configured'}</div>
    <div style="margin-bottom:12px">
      <div style="font-size:10px;color:var(--text3);margin-bottom:5px;text-transform:uppercase;letter-spacing:.05em">Post payload (JSON)</div>
      <textarea class="ftxt" style="font-family:var(--mono);font-size:11px;min-height:160px" readonly>${JSON.stringify(payload,null,2)}</textarea>
    </div>
    <div style="font-size:11px;color:var(--text3);margin-bottom:12px">Copy this payload and paste it into ${ig.name}, or set up a webhook URL in Settings → Integrations to send automatically.</div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-ig-payload').remove()">Close</button>
      <button class="mbtn ok" onclick="navigator.clipboard.writeText(JSON.stringify(${JSON.stringify(payload)},null,2));toast('Copied','var(--green)')">📋 Copy JSON</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function markPublishStatus(bid,ci,pi,status){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const p=b.campaigns[ci].contentPieces[pi];if(!p)return;
  p.publishStatus=status;
  if(status==='published')p.publishedAt=new Date().toISOString();
  if(status==='scheduled')p.scheduledAt=new Date().toISOString();
  if(status==='ready'){p.publishedAt='';p.scheduledAt='';}
  persist();buildWsPubQueue(b);updatePubQueueBadge(b);
  toast(status==='published'?'✅ Marked as published':status==='scheduled'?'📅 Marked as scheduled':'↩ Reset to ready','var(--green)');
}

function scheduleAllPosts(bid){
  const b=BRANDS.find(x=>x.id==bid);
  const ig=INTEGRATIONS.find(x=>x.active);
  if(!ig){toast('No active integrations','var(--amber)');return;}
  const ready=[];
  (b.campaigns||[]).forEach((camp,ci)=>{
    (camp.contentPieces||[]).forEach((p,pi)=>{
      if((p.status==='approved'||p.status==='inprod')&&!p.publishStatus){
        ready.push({p,ci,pi});
      }
    });
  });
  if(!ready.length){toast('No ready posts to schedule','var(--amber)');return;}
  ready.forEach(({p,ci,pi})=>sendToIntegration(bid,ci,pi,ig.id));
  toast(`📤 Sending ${ready.length} posts to ${ig.name}`,'var(--green)');
}

function exportQueueCSV(bid){
  const b=BRANDS.find(x=>x.id==bid);
  const rows=[['Brand','Campaign','Topic','Platform','Post Date','Copy','Caption','Hashtags','Status']];
  (b.campaigns||[]).forEach(camp=>{
    (camp.contentPieces||[]).forEach(p=>{
      if(p.status==='approved'||p.status==='inprod'||p.status==='done'||p.publishStatus){
        rows.push([
          b.name,camp.name,p.topic||'',
          p.platform||(p.platforms||[]).join('/')||'',
          p.postDate||'',
          (p.copy||'').replace(/,/g,';').replace(/\n/g,' '),
          (p.caption||'').replace(/,/g,';').replace(/\n/g,' '),
          (p.hashtags||'').replace(/,/g,';'),
          p.publishStatus||'ready'
        ]);
      }
    });
  });
  const csv=rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`${b.name}_publishing_queue_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  toast('⬇ CSV exported','var(--green)');
}

// ═══ BRAND TIME TRACKING ════════════════════════════════
function fmtMs(ms){if(!ms||ms<=0)return'0m';const h=Math.floor(ms/3600000);const m=Math.floor((ms%3600000)/60000);return h?`${h}h ${m}m`:`${m}m`;}
function fmtHM(h,m){return h?`${h}h ${m||0}m`:`${m||0}m`;}
function logMinsToMs(h,m){return((parseInt(h)||0)*60+(parseInt(m)||0))*60000;}

function getBrandHours(brandId, monthKey){
  const b=BRANDS.find(x=>x.id==brandId);if(!b)return{total:0,byMember:{},byActivity:{}};
  const [year,month]=monthKey.split('-').map(Number);
  const start=new Date(year,month-1,1).getTime();
  const end=new Date(year,month,0,23,59,59).getTime();

  let totalMs=0;
  const byMember={};
  const byActivity={};

  // 1. Specialist time from localStorage (task sessions)
  TASKS.filter(t=>t.brandId==brandId).forEach(t=>{
    const sessions=getMWTimeSessions('task-'+t.id);
    sessions.forEach(s=>{
      if(!s.start||!s.end)return;
      if(s.start<start||s.start>end)return;
      const dur=s.end-s.start;
      totalMs+=dur;
      const assignee=MEMBERS.find(m=>m.id==t.assigneeId);
      const key=t.assigneeId||-1;
      byMember[key]=(byMember[key]||0)+dur;
      const act=t.g7?`G${t.g7} task`:'Task execution';
      byActivity[act]=(byActivity[act]||0)+dur;
    });
    // Also check standalone session refs
    const saId=`sa-${brandId}-${t.g7-1}`;
    const saSessions=getMWTimeSessions(saId);
    saSessions.forEach(s=>{
      if(!s.start||!s.end)return;
      if(s.start<start||s.start>end)return;
      const dur=s.end-s.start;
      totalMs+=dur;
      const key=t.assigneeId||-1;
      byMember[key]=(byMember[key]||0)+dur;
    });
  });

  // 2. SAM/BM manual time logs + task-submission logs (from timeLogs array)
  (b.timeLogs||[]).filter(tl=>tl.month===monthKey).forEach(tl=>{
    // Skip task-source entries that might duplicate localStorage sessions
    const ms=logMinsToMs(tl.hours,tl.minutes);
    totalMs+=ms;
    byMember[tl.memberId]=(byMember[tl.memberId]||0)+ms;
    byActivity[tl.activity]=(byActivity[tl.activity]||0)+ms;
  });

  // 3. Task submission time (t.timeLogged) not already in timeLogs
  TASKS.filter(t=>t.brandId==brandId&&t.timeLogged&&!b.timeLogs?.find(tl=>tl.taskId==t.id)).forEach(t=>{
    const tl=t.timeLogged;
    const logDate=tl.loggedAt?tl.loggedAt.substring(0,7):monthKey;
    if(logDate!==monthKey)return;
    const ms=logMinsToMs(tl.hours,tl.minutes);
    totalMs+=ms;
    byMember[t.assigneeId||-1]=(byMember[t.assigneeId||-1]||0)+ms;
    byActivity['Task work']=(byActivity['Task work']||0)+ms;
  });

  return{total:totalMs,byMember,byActivity};
}

function buildWsTime(b){
  if(!b.timeLogs)b.timeLogs=[];
  const el=document.getElementById('ws-time');if(!el)return;
  const canLog=isSAM(CU)||isBM(CU);

  // Month selector
  const months=[];
  const now=new Date();
  for(let i=5;i>=0;i--){
    const d=new Date(now.getFullYear(),now.getMonth()-i,1);
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const label=d.toLocaleDateString('en-IN',{month:'long',year:'numeric'});
    months.push({key,label});
  }
  const selMonth=window._timeMonth||months[months.length-1].key;
  window._timeMonth=selMonth;

  const hrs=getBrandHours(b.id,selMonth);
  const monthLogs=(b.timeLogs||[]).filter(tl=>tl.month===selMonth).sort((a,z)=>z.date.localeCompare(a.date));

  // By member breakdown
  const memberRows=Object.entries(hrs.byMember).map(([mid,ms])=>{
    const m=MEMBERS.find(x=>x.id==mid);
    return{name:m?m.name:'Unknown',initials:m?m.initials:'?',color:m?m.color:'var(--text3)',bg:m?m.bg:'var(--bg3)',role:m?roleLabel(m.role):'',ms};
  }).sort((a,z)=>z.ms-a.ms);

  // By activity breakdown
  const actRows=Object.entries(hrs.byActivity).sort((a,z)=>z[1]-a[1]);

  el.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-size:15px;font-weight:600">Time tracking — ${b.name}</div>
        <div style="font-size:12px;color:var(--text3)">⚡ Task submissions + ✍ SAM/BM manual logs</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <select class="fsel" id="time-month-sel" style="width:160px" onchange="window._timeMonth=this.value;buildWsTime(BRANDS.find(x=>x.id==${b.id}))">
          ${months.map(m=>`<option value="${m.key}" ${m.key===selMonth?'selected':''}>${m.label}</option>`).join('')}
        </select>
        ${canLog?`<button class="btn btn-p" onclick="openLogTime(${b.id})">+ Log time</button>`:''}
      </div>
    </div>

    <!-- Total banner -->
    <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:16px 20px;margin-bottom:14px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">
      <div style="flex:1">
        <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Total hours this month</div>
        <div style="font-size:28px;font-weight:700;color:${b.color}">${fmtMs(hrs.total)}</div>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--blue)">${memberRows.length}</div><div style="font-size:10px;color:var(--text3)">Members</div></div>
        <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--blue)">${monthLogs.filter(tl=>tl.source==='task').length}</div><div style="font-size:10px;color:var(--text3)">⚡ Task logs</div></div>
        <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--teal)">${monthLogs.filter(tl=>!tl.source).length}</div><div style="font-size:10px;color:var(--text3)">✍ Manual logs</div></div>
        <div style="text-align:center"><div style="font-size:18px;font-weight:600;color:var(--green)">${actRows.length}</div><div style="font-size:10px;color:var(--text3)">Activities</div></div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <!-- By member -->
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px">
        <div style="font-size:12px;font-weight:600;margin-bottom:12px">👥 By team member</div>
        ${memberRows.length?memberRows.map(m=>`
          <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:.5px solid var(--border)">
            <div style="width:28px;height:28px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0">${m.initials}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:500">${m.name}</div>
              <div style="font-size:10px;color:var(--text3)">${m.role}</div>
              <div style="height:4px;background:var(--bg4);border-radius:2px;margin-top:4px;overflow:hidden"><div style="height:100%;width:${hrs.total?Math.round(m.ms/hrs.total*100):0}%;background:${m.color};border-radius:2px"></div></div>
            </div>
            <div style="font-size:13px;font-weight:600;color:${m.color};flex-shrink:0">${fmtMs(m.ms)}</div>
          </div>`).join('')
        :'<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">No time logged yet</div>'}
      </div>
      <!-- By activity -->
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px">
        <div style="font-size:12px;font-weight:600;margin-bottom:12px">📋 By activity type</div>
        ${actRows.length?actRows.map(([act,ms])=>`
          <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:.5px solid var(--border)">
            <div style="flex:1;min-width:0">
              <div style="font-size:12px">${act}</div>
              <div style="height:4px;background:var(--bg4);border-radius:2px;margin-top:4px;overflow:hidden"><div style="height:100%;width:${hrs.total?Math.round(ms/hrs.total*100):0}%;background:var(--accent);border-radius:2px"></div></div>
            </div>
            <div style="font-size:13px;font-weight:600;color:var(--accent2);flex-shrink:0">${fmtMs(ms)}</div>
          </div>`).join('')
        :'<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">No activities logged yet</div>'}
      </div>
    </div>

    <!-- Log entries table -->
    <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div style="font-size:12px;font-weight:600">📝 Time log entries</div>
        <div style="font-size:11px;color:var(--text3)">${monthLogs.length} entries</div>
      </div>
      ${monthLogs.length?`
        <div style="display:grid;grid-template-columns:90px 70px 1fr 130px 70px 40px;gap:0;font-size:10px;color:var(--text3);padding:4px 0;border-bottom:.5px solid var(--border);text-transform:uppercase;letter-spacing:.05em">
          <span>Date</span><span>Duration</span><span>Activity / Notes</span><span>Member</span><span>Source</span><span></span>
        </div>
        ${monthLogs.map((tl,i)=>{
          const m=MEMBERS.find(x=>x.id==tl.memberId);
          const ms=logMinsToMs(tl.hours,tl.minutes);
          const isTask=tl.source==='task';
          return`<div style="display:grid;grid-template-columns:90px 70px 1fr 130px 70px 40px;gap:0;padding:9px 0;border-bottom:.5px solid var(--border);align-items:center">
            <span style="font-size:11px;color:var(--text3)">${tl.date}</span>
            <span style="font-size:13px;font-weight:700;color:var(--accent2)">${fmtHM(tl.hours,tl.minutes)}</span>
            <div>
              <div style="font-size:12px;font-weight:500">${tl.activity}</div>
              ${tl.notes?`<div style="font-size:10px;color:var(--text3);margin-top:1px">${tl.notes}</div>`:''}
            </div>
            <div style="display:flex;align-items:center;gap:5px">
              ${m?`<div style="width:20px;height:20px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;flex-shrink:0">${m.initials}</div><span style="font-size:11px;color:var(--text2)">${m.name}</span>`:'<span style="font-size:11px;color:var(--text3)">—</span>'}
            </div>
            <span style="font-size:9px;padding:2px 6px;border-radius:9px;font-weight:600;${isTask?'background:var(--bbg);color:var(--blue);border:.5px solid rgba(91,174,247,.3)':'background:var(--bg3);color:var(--text3);border:.5px solid var(--border)'}">${isTask?'⚡ Task':'✍ Manual'}</span>
            ${canLog&&(tl.memberId===CU?.id||isSAM(CU))?`<button onclick="deleteTimeLog(${b.id},'${tl.id}')" style="font-size:10px;padding:2px 6px;background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);color:var(--red);cursor:pointer;font-family:var(--font)">🗑</button>`:'<span></span>'}
          </div>`;
        }).join('')}`
      :`<div style="text-align:center;padding:24px;color:var(--text3);font-size:12px">
          <div style="font-size:28px;margin-bottom:8px;opacity:.3">⏱</div>
          No entries for this month<br>
          <span style="font-size:11px">Specialists log time when submitting tasks · SAM logs client calls & activities via "+ Log time"</span>
        </div>`}
    </div>`;
}

function openLogTime(bid){
  const b=BRANDS.find(x=>x.id==bid);
  const acts=LOOKUPS.timeActivities||['Strategy','Briefing','Client call','Campaign planning','Content review','Reporting','Other'];
  const today=new Date().toISOString().split('T')[0];
  const mo=document.createElement('div');mo.id='modal-log-time';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Log time — ${b.name}</div>
    <div class="msub">Manually log your hours for this brand</div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Date *</label><input class="finp" type="date" id="tl-date" value="${today}"/></div>
      <div class="fg2"><label class="flbl">Duration *</label>
        <div style="display:flex;gap:6px;align-items:center">
          <input class="finp" type="number" id="tl-hours" min="0" max="24" placeholder="0" style="width:60px;text-align:center"/> <span style="color:var(--text3);font-size:12px">h</span>
          <input class="finp" type="number" id="tl-minutes" min="0" max="59" placeholder="0" style="width:60px;text-align:center"/> <span style="color:var(--text3);font-size:12px">m</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Activity type *</label><select class="fsel" id="tl-activity"><option value="">Select activity</option>${acts.map(a=>`<option value="${a}">${a}</option>`).join('')}</select></div>
    </div>
    <div class="form-row full"><div class="fg2"><label class="flbl">Notes <span style="color:var(--text3)">(optional)</span></label><textarea class="ftxt" id="tl-notes" placeholder="e.g. Monthly planning session, client review call..." style="min-height:52px"></textarea></div></div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-log-time').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveTimeLog(${bid})">Save log →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
  setTimeout(()=>document.getElementById('tl-hours')?.focus(),100);
}

function saveTimeLog(bid){
  const h=parseInt(document.getElementById('tl-hours').value)||0;
  const m=parseInt(document.getElementById('tl-minutes').value)||0;
  const activity=document.getElementById('tl-activity').value;
  const date=document.getElementById('tl-date').value;
  if(!activity){toast('⚠ Select an activity type','var(--amber)');return;}
  if(!date){toast('⚠ Select a date','var(--amber)');return;}
  if(!h&&!m){toast('⚠ Enter hours or minutes','var(--amber)');return;}
  const b=BRANDS.find(x=>x.id==bid);
  if(!b.timeLogs)b.timeLogs=[];
  const month=date.substring(0,7);
  b.timeLogs.push({
    id:'tl-'+Date.now(),
    memberId:CU.id,
    brandId:bid,
    date,month,
    hours:h,minutes:m,
    activity,
    notes:document.getElementById('tl-notes').value.trim(),
    loggedAt:new Date().toISOString()
  });
  persist();
  document.getElementById('modal-log-time').remove();
  window._timeMonth=month;
  buildWsTime(b);
  toast(`✓ ${fmtHM(h,m)} logged for ${b.name}`,'var(--green)');
}

function deleteTimeLog(bid,tlId){
  const b=BRANDS.find(x=>x.id==bid);
  b.timeLogs=b.timeLogs.filter(tl=>tl.id!==tlId);
  persist();buildWsTime(b);
  toast('Time log removed','var(--amber)');
}

function buildWsAssets(b){
  CAssetBid=b.id;
  if(!b.assets)b.assets=[];
  const categories=['All','Brand Backbone',...(LOOKUPS.formats||[]),'Other'];
  const canDelete=isSAM(CU)||isBM(CU);
  const canUpload=isSAM(CU)||isBM(CU)||isSpec(CU);
  const CACat=window._assetCat||'All';

  const filtered=CACat==='All'?b.assets:b.assets.filter(a=>a.category===CACat);

  // Category tabs
  const tabsHtml=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
    ${categories.map(c=>`<button onclick="setAssetCat('${c}',${b.id})" style="padding:4px 12px;border-radius:9px;font-size:11px;font-weight:500;cursor:pointer;background:${CACat===c?'var(--accent)':'var(--bg3)'};color:${CACat===c?'#fff':'var(--text2)'};border:.5px solid ${CACat===c?'var(--acb)':'var(--border)'}">${c}${c!=='All'?` <span style="opacity:.6">(${b.assets.filter(a=>a.category===c).length})</span>`:` <span style="opacity:.6">(${b.assets.length})</span>`}</button>`).join('')}
  </div>`;

  // Asset grid
  const gridHtml=filtered.length?`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">
    ${filtered.map((asset,ai)=>{
      const realIdx=b.assets.indexOf(asset);
      const ext=(asset.ext||asset.name||'').split('.').pop().toLowerCase();
      const isLink=!!asset.url;
      const icon=isLink?'🔗':['png','jpg','jpeg','gif','webp','svg'].includes(ext)?'🖼':['pdf'].includes(ext)?'📕':['doc','docx'].includes(ext)?'📄':['ppt','pptx'].includes(ext)?'📊':['xls','xlsx','csv'].includes(ext)?'📊':['mp4','mov','avi'].includes(ext)?'🎬':['zip','rar'].includes(ext)?'🗜':'📎';
      const accentColor=ext==='pdf'?'#e55':/doc|docx/.test(ext)?'#4a9eff':/ppt|pptx/.test(ext)?'#f5a623':/xls|xlsx|csv/.test(ext)?'#4eca8b':/mp4|mov/.test(ext)?'#b060ff':asset.category==='Brand Backbone'?'var(--accent)':'var(--text3)';
      const uploader=MEMBERS.find(m=>m.id==asset.uploadedBy);
      let domain='';
      if(isLink&&asset.url){
        try{
          const u=asset.url.startsWith('http')?asset.url:'https://'+asset.url;
          domain=new URL(u).hostname.replace('www.','');
        }catch(e){domain=asset.url.replace(/^https?:\/\//,'').split('/')[0].substring(0,25);}
      }
      const remarkCount = Array.isArray(asset.remarks) ? asset.remarks.length : 0;
      const remarkBadge = remarkCount ? `<span title="${remarkCount} owner remark${remarkCount===1?'':'s'}" style="position:absolute;top:4px;right:4px;background:var(--ambg);border:.5px solid var(--amborder);color:var(--amber);font-size:9px;font-weight:700;padding:2px 6px;border-radius:9px;z-index:2">💬 ${remarkCount}</span>` : '';
      const remarksList = remarkCount ? `<div style="background:var(--ambg);border-top:.5px solid var(--amborder);padding:6px 8px;display:flex;flex-direction:column;gap:4px;max-height:80px;overflow-y:auto">
        ${asset.remarks.map(r=>`<div style="font-size:10px;line-height:1.4;color:var(--text)"><span style="font-weight:600;color:var(--amber)">${(r.author||'Owner').replace(/[&<>]/g,'')}</span>: ${(r.text||'').replace(/[&<>]/g,'')}</div>`).join('')}
      </div>` : '';
      return`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);overflow:hidden;position:relative;transition:border-color .15s;cursor:pointer" onmouseover="this.querySelector('.ws-asset-actions').style.opacity='1';this.style.borderColor='var(--accent)'" onmouseout="this.querySelector('.ws-asset-actions').style.opacity='0';this.style.borderColor='var(--border)'">
        <div style="height:64px;display:flex;align-items:center;justify-content:center;font-size:28px;background:${accentColor}12;border-bottom:.5px solid var(--border);position:relative">
          ${icon}
          ${remarkBadge}
          ${isLink?`<span style="position:absolute;bottom:3px;right:5px;font-size:9px;color:var(--text3);background:var(--bg2);padding:1px 4px;border-radius:3px;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${domain}</span>`:''}
        </div>
        <div style="padding:7px 8px">
          <div style="font-size:11px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${asset.name}">${asset.name}</div>
          <div style="font-size:9px;color:var(--text3)">${isLink?domain:asset.size||ext.toUpperCase()}</div>
        </div>
        ${remarksList}
        <div class="ws-asset-actions" style="position:absolute;inset:0;background:rgba(10,10,20,.92);display:flex;flex-direction:column;padding:10px 10px 8px;opacity:0;transition:opacity .15s;border-radius:var(--rsm);backdrop-filter:blur(2px)">
          <div style="flex:1;margin-bottom:8px">
            <div style="font-size:10px;font-weight:600;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:5px">${asset.name}</div>
            ${isLink?`<div style="font-size:9px;color:rgba(255,255,255,.6);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">🔗 ${domain}</div>`:''}
            ${!isLink&&asset.size?`<div style="font-size:9px;color:rgba(255,255,255,.6);margin-bottom:2px">📦 ${asset.size}</div>`:''}
            ${uploader?`<div style="font-size:9px;color:rgba(255,255,255,.6);margin-bottom:2px">👤 ${uploader.name}</div>`:''}
            ${asset.date?`<div style="font-size:9px;color:rgba(255,255,255,.6);margin-bottom:2px">📅 ${asset.date}</div>`:''}
            ${asset.desc?`<div style="font-size:9px;color:rgba(255,255,255,.5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${asset.desc}">💬 ${asset.desc}</div>`:''}
          </div>
          <div style="display:flex;gap:4px">
            ${isLink?`<a href="${asset.url}" target="_blank" style="flex:1;font-size:10px;padding:4px 0;background:var(--accent);border-radius:var(--rsm);color:#fff;text-decoration:none;font-family:var(--font);text-align:center">🔗 Open</a>`:`<button onclick="downloadAsset(${b.id},${realIdx})" style="flex:1;font-size:10px;padding:4px 0;background:#4a9eff;border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font)">⬇ Download</button>`}
            ${canDelete?`<button onclick="confirmDeleteAssetWs(${b.id},${realIdx},'${asset.name.replace(/'/g,"\\'")}');" style="font-size:10px;padding:4px 7px;background:#e55;border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font)">🗑</button>`:''}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`:`<div style="text-align:center;padding:40px 20px;color:var(--text3)"><div style="font-size:32px;margin-bottom:8px;opacity:.4">📁</div><div style="font-size:13px;color:var(--text2)">No assets in ${CACat==='All'?'this brand':CACat} yet</div><div style="font-size:11px;margin-top:4px">${canUpload?'Upload a template or add a link below':'Ask your BM to upload assets'}</div></div>`;

  document.getElementById('ws-assets').innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-size:15px;font-weight:600">Asset library — ${b.name}</div>
        <div style="font-size:12px;color:var(--text3)">${b.assets.length} asset${b.assets.length!==1?'s':''} · Templates, brand files &amp; links</div>
      </div>
      ${canUpload?`<button class="btn btn-p" onclick="openUploadAsset(${b.id})">+ Upload / Add link</button>`:''}
    </div>
    ${tabsHtml}
    ${gridHtml}`;
}

function buildGlobalAssets(){
  const el=document.getElementById('global-assets-body');if(!el)return;
  const brandSel=document.getElementById('global-asset-brand');
  const searchEl=document.getElementById('global-asset-search');
  const catEl=document.getElementById('global-asset-cat');
  const myBrands=BRANDS.filter(b=>!CU||isSAM(CU)||(CU.brands&&CU.brands.some(x=>x==b.id)));

  // Populate dropdowns once
  if(brandSel&&brandSel.children.length<=1)
    brandSel.innerHTML='<option value="">All brands</option>'+myBrands.map(b=>`<option value="${b.id}">${b.name}</option>`).join('');
  if(catEl&&catEl.children.length<=1){
    const allCats=['Brand Backbone',...(LOOKUPS.formats||[]),'Other'].filter((v,i,a)=>a.indexOf(v)===i);
    catEl.innerHTML='<option value="">All categories</option>'+allCats.map(c=>`<option value="${c}">${c}</option>`).join('');
  }

  const filterBid=brandSel?parseInt(brandSel.value)||null:null;
  const filterCat=catEl?catEl.value:'';
  const searchQ=searchEl?searchEl.value.toLowerCase().trim():'';
  const brands=filterBid?myBrands.filter(b=>b.id==filterBid):myBrands;
  const canDelete=isSAM(CU)||isBM(CU);
  const canUpload=isSAM(CU)||isBM(CU)||isSpec(CU);
  if(!window._brandAssetExpanded)window._brandAssetExpanded={};

  let totalAssets=0;

  const brandHtml=brands.map(b=>{
    if(!b.assets)b.assets=[];
    let assets=b.assets;
    if(filterCat)assets=assets.filter(a=>a.category===filterCat);
    if(searchQ)assets=assets.filter(a=>(a.name||'').toLowerCase().includes(searchQ)||(a.category||'').toLowerCase().includes(searchQ)||(a.desc||'').toLowerCase().includes(searchQ));
    if(!assets.length)return'';
    totalAssets+=assets.length;

    if(window._brandAssetExpanded[b.id]===undefined)window._brandAssetExpanded[b.id]=true;
    const isExpanded=window._brandAssetExpanded[b.id];

    // Group by category
    const groups={};
    assets.forEach(a=>{const c=a.category||'Uncategorised';if(!groups[c])groups[c]=[];groups[c].push(a);});
    const sortedCats=Object.keys(groups).sort((a,b)=>a==='Brand Backbone'?-1:b==='Brand Backbone'?1:a.localeCompare(b));

    const categoriesHtml=!isExpanded?'':sortedCats.map(cat=>{
      const catAssets=groups[cat];
      const isBB=cat==='Brand Backbone';
      const catIcon=isBB?'🎨':cat.toLowerCase().includes('video')?'🎬':cat.toLowerCase().includes('static')||cat.toLowerCase().includes('image')?'🖼':cat.toLowerCase().includes('article')||cat.toLowerCase().includes('blog')?'📝':cat.toLowerCase().includes('newsletter')||cat.toLowerCase().includes('email')?'✉️':'📎';
      return`<div style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:.5px solid var(--border);margin-bottom:8px">
          <span>${catIcon}</span>
          <span style="font-size:11px;font-weight:600;color:${isBB?'var(--accent2)':'var(--text2)'};text-transform:uppercase;letter-spacing:.05em">${cat}</span>
          <span style="font-size:10px;color:var(--text3);background:var(--bg3);padding:1px 7px;border-radius:9px;border:.5px solid var(--border)">${catAssets.length}</span>
          ${canUpload?`<button onclick="event.stopPropagation();window._assetCat='${cat}';openUploadAsset(${b.id})" style="margin-left:auto;font-size:10px;padding:2px 8px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">+ Add</button>`:''}
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">
          ${catAssets.map(asset=>{
            const realIdx=b.assets.indexOf(asset);
            const ext=(asset.ext||asset.name||'').split('.').pop().toLowerCase();
            const isLink=!!asset.url;
            const icon=isLink?'🔗':['png','jpg','jpeg','gif','webp','svg'].includes(ext)?'🖼':['pdf'].includes(ext)?'📕':['doc','docx'].includes(ext)?'📄':['ppt','pptx'].includes(ext)?'📊':['xls','xlsx','csv'].includes(ext)?'📊':['mp4','mov','avi'].includes(ext)?'🎬':['zip','rar'].includes(ext)?'🗜':'📎';
            const accentColor=isBB?'var(--accent)':ext==='pdf'?'#e55':/doc|docx/.test(ext)?'#4a9eff':/ppt|pptx/.test(ext)?'#f5a623':/xls|xlsx|csv/.test(ext)?'#4eca8b':/mp4|mov/.test(ext)?'#b060ff':'var(--text3)';
            const uploader=MEMBERS.find(m=>m.id==asset.uploadedBy);
            // Extract domain from URL for display
            let domain='';
            if(isLink&&asset.url){
              try{
                const u=asset.url.startsWith('http')?asset.url:'https://'+asset.url;
                domain=new URL(u).hostname.replace('www.','');
              }catch(e){domain=asset.url.replace(/^https?:\/\//,'').split('/')[0].substring(0,25);}
            }
            return`<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);overflow:hidden;transition:all .15s;position:relative;cursor:pointer" onmouseover="this.querySelector('.asset-actions').style.opacity='1';this.style.borderColor='var(--accent)'" onmouseout="this.querySelector('.asset-actions').style.opacity='0';this.style.borderColor='var(--border)'">
              <!-- Icon area -->
              <div style="height:60px;display:flex;align-items:center;justify-content:center;font-size:26px;background:${accentColor}12;border-bottom:.5px solid var(--border);position:relative">
                ${icon}
                ${isLink?`<span style="position:absolute;bottom:3px;right:5px;font-size:9px;color:var(--text3);background:var(--bg3);padding:1px 4px;border-radius:3px;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${domain}</span>`:''}
              </div>
              <!-- Name -->
              <div style="padding:7px 8px">
                <div style="font-size:11px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${asset.name}">${asset.name}</div>
                <div style="font-size:9px;color:var(--text3)">${isLink?domain:asset.size||ext.toUpperCase()}</div>
              </div>
              <!-- Hover overlay — properties + actions -->
              <div class="asset-actions" style="position:absolute;inset:0;background:rgba(10,10,20,.92);display:flex;flex-direction:column;padding:10px 10px 8px;opacity:0;transition:opacity .15s;border-radius:var(--rsm);backdrop-filter:blur(2px)">
                <!-- Properties -->
                <div style="flex:1;margin-bottom:8px">
                  <div style="font-size:10px;font-weight:600;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:5px">${asset.name}</div>
                  ${isLink?`<div style="font-size:9px;color:rgba(255,255,255,.6);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">🔗 ${domain}</div>`:''}
                  ${!isLink&&asset.size?`<div style="font-size:9px;color:rgba(255,255,255,.6);margin-bottom:2px">📦 ${asset.size}</div>`:''}
                  ${uploader?`<div style="font-size:9px;color:rgba(255,255,255,.6);margin-bottom:2px">👤 ${uploader.name}</div>`:''}
                  ${asset.date?`<div style="font-size:9px;color:rgba(255,255,255,.6);margin-bottom:2px">📅 ${asset.date}</div>`:''}
                  ${asset.desc?`<div style="font-size:9px;color:rgba(255,255,255,.5);margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${asset.desc}">💬 ${asset.desc}</div>`:''}
                </div>
                <!-- Actions -->
                <div style="display:flex;gap:4px">
                  ${isLink?`<a href="${asset.url}" target="_blank" style="flex:1;font-size:10px;padding:4px 0;background:var(--accent);border-radius:var(--rsm);color:#fff;text-decoration:none;font-family:var(--font);text-align:center">🔗 Open</a>`:`<button onclick="downloadAsset(${b.id},${realIdx})" style="flex:1;font-size:10px;padding:4px 0;background:#4a9eff;border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font)">⬇</button>`}
                  ${canDelete?`<button onclick="confirmDeleteAsset(${b.id},${realIdx},'${asset.name.replace(/'/g,"\\'")}');" style="font-size:10px;padding:4px 7px;background:#e55;border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font)">🗑</button>`:''}
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>`;
    }).join('');

    return`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);margin-bottom:10px;overflow:hidden">
      <div onclick="window._brandAssetExpanded[${b.id}]=!window._brandAssetExpanded[${b.id}];buildGlobalAssets()" style="display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer;background:var(--bg3);border-bottom:${isExpanded?'.5px solid var(--border)':'none'};user-select:none">
        <div style="width:34px;height:34px;border-radius:8px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${(b.initials||b.name.substring(0,2)).toUpperCase()}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600">${b.name}</div>
          <div style="font-size:11px;color:var(--text3)">${assets.length} file${assets.length!==1?'s':''} · ${sortedCats.length} categor${sortedCats.length!==1?'ies':'y'}</div>
        </div>
        ${canUpload?`<button onclick="event.stopPropagation();window._assetCat='Brand Backbone';openUploadAsset(${b.id})" style="font-size:11px;padding:5px 12px;background:var(--accent);border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font)">+ Upload</button>`:''}
        <span style="color:var(--text3);font-size:11px;margin-left:4px">${isExpanded?'▲':'▼'}</span>
      </div>
      ${isExpanded?`<div style="padding:14px 16px">${categoriesHtml}</div>`:''}
    </div>`;
  }).join('');

  const summary=`<div style="font-size:11px;color:var(--text3);margin-bottom:14px">${totalAssets} asset${totalAssets!==1?'s':''} across ${brands.filter(b=>(b.assets||[]).length).length} brand${brands.filter(b=>(b.assets||[]).length).length!==1?'s':''}</div>`;
  const emptyHtml=`<div style="text-align:center;padding:60px 20px"><div style="font-size:48px;margin-bottom:12px;opacity:.3">📁</div><div style="font-size:14px;color:var(--text2)">No assets found</div><div style="font-size:12px;color:var(--text3);margin-top:4px">${searchQ?'Try a different search':'Upload templates via any brand workspace → Assets tab'}</div></div>`;
  el.innerHTML=summary+(brandHtml.trim()||emptyHtml);
}

function setAssetCat(cat,bid){
  window._assetCat=cat;
  const b=BRANDS.find(x=>x.id==bid);
  buildWsAssets(b);
}

function openUploadAsset(bid){
  const b=BRANDS.find(x=>x.id==bid);
  const cats=['Brand Backbone','Static image','Carousel','Video','GIF','Reel','Short video','Article','Blog','Newsletter','Emailer','Presentation','Logo','Brand kit','Other',...(LOOKUPS.formats||[])].filter((v,i,a)=>a.indexOf(v)===i);
  const mo=document.createElement('div');mo.id='modal-upload-asset';mo.className='moverlay open';
  const currentCat=window._assetCat&&window._assetCat!=='All'?window._assetCat:'Brand Backbone';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Upload asset / Add link</div>
    <div class="msub">${b.name}</div>
    <!-- Toggle -->
    <div style="display:flex;gap:0;margin-bottom:14px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:3px">
      <button id="ua-tab-file" onclick="toggleUploadTab('file')" style="flex:1;padding:5px;border:none;border-radius:var(--rsm);font-family:var(--font);font-size:12px;cursor:pointer;background:var(--accent);color:#fff">📎 Upload file</button>
      <button id="ua-tab-link" onclick="toggleUploadTab('link')" style="flex:1;padding:5px;border:none;border-radius:var(--rsm);font-family:var(--font);font-size:12px;cursor:pointer;background:transparent;color:var(--text2)">🔗 Add URL / link</button>
    </div>
    <div id="ua-file-section">
      <div class="form-row full"><div class="fg2"><label class="flbl">Choose file</label><input class="finp" type="file" id="ua-file" accept="*/*" onchange="previewUploadFile(this)"/></div></div>
      <div id="ua-file-preview" style="font-size:11px;color:var(--text3);margin-bottom:8px"></div>
    </div>
    <div id="ua-link-section" style="display:none">
      <div class="form-row full"><div class="fg2"><label class="flbl">URL / Link *</label><input class="finp" id="ua-url" placeholder="https://figma.com/file/... or Google Drive link"/></div></div>
      <div class="form-row full"><div class="fg2"><label class="flbl">Display name *</label><input class="finp" id="ua-linkname" placeholder="e.g. Instagram post template — Figma"/></div></div>
    </div>
    <div class="form-row">
      <div class="fg2"><label class="flbl">Category *</label><select class="fsel" id="ua-cat"><option value="">Select category</option>${cats.map(c=>`<option value="${c}" ${c===currentCat?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="fg2"><label class="flbl">Description</label><input class="finp" id="ua-desc" placeholder="Optional description..."/></div>
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-upload-asset').remove()">Cancel</button>
      <button class="mbtn ok" onclick="saveAsset(${bid})">Save asset →</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function toggleUploadTab(tab){
  document.getElementById('ua-file-section').style.display=tab==='file'?'block':'none';
  document.getElementById('ua-link-section').style.display=tab==='link'?'block':'none';
  document.getElementById('ua-tab-file').style.background=tab==='file'?'var(--accent)':'transparent';
  document.getElementById('ua-tab-file').style.color=tab==='file'?'#fff':'var(--text2)';
  document.getElementById('ua-tab-link').style.background=tab==='link'?'var(--accent)':'transparent';
  document.getElementById('ua-tab-link').style.color=tab==='link'?'#fff':'var(--text2)';
}

function previewUploadFile(input){
  const f=input.files[0];if(!f)return;
  const prev=document.getElementById('ua-file-preview');
  if(prev)prev.textContent=`📎 ${f.name} · ${f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB'}`;
  // Auto-fill name suggestion for link name field
  const ln=document.getElementById('ua-linkname');
  if(ln&&!ln.value)ln.value=f.name;
}

function saveAsset(bid){
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  const isLink=document.getElementById('ua-link-section').style.display!=='none';
  const cat=document.getElementById('ua-cat').value;
  if(!cat){toast('⚠ Select a category','var(--amber)');return;}
  if(!b.assets)b.assets=[];

  let asset;
  if(isLink){
    const url=document.getElementById('ua-url').value.trim();
    const name=document.getElementById('ua-linkname').value.trim();
    if(!url||!name){toast('⚠ URL and name required','var(--amber)');return;}
    asset={id:Date.now(),name,url,category:cat,desc:document.getElementById('ua-desc').value.trim(),uploadedBy:CU.id,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),type:'link'};
  } else {
    const fileInput=document.getElementById('ua-file');
    if(!fileInput.files.length){toast('⚠ Choose a file','var(--amber)');return;}
    const f=fileInput.files[0];
    const sizeFmt=f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB';
    asset={id:Date.now(),name:f.name,size:sizeFmt,category:cat,desc:document.getElementById('ua-desc').value.trim(),uploadedBy:CU.id,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),type:'file',ext:f.name.split('.').pop().toLowerCase()};
  }
  b.assets.push(asset);
  persist();
  document.getElementById('modal-upload-asset').remove();
  buildWsAssets(b);
  toast(`✓ Asset "${asset.name}" saved`,'var(--green)');
}

function openAssetPicker(){
  // Find current brand from context
  const bid=CWsBid||CAssetBid;
  const b=BRANDS.find(x=>x.id==bid);
  if(!b||!b.assets||!b.assets.length){toast('No assets uploaded for this brand yet','var(--amber)');return;}
  const cats=['All',...new Set(b.assets.map(a=>a.category).filter(Boolean))];
  let filterCat='All';

  function renderPicker(){
    const filtered=filterCat==='All'?b.assets:b.assets.filter(a=>a.category===filterCat);
    const mo=document.getElementById('modal-asset-picker');
    if(!mo)return;
    document.getElementById('ap-grid').innerHTML=filtered.map((asset,i)=>{
      const realIdx=b.assets.indexOf(asset);
      const icon=asset.url?'🔗':['png','jpg','jpeg','gif','webp','svg'].includes(asset.ext||'')?'🖼':['pdf'].includes(asset.ext||'')?'📕':['doc','docx'].includes(asset.ext||'')?'📄':'📎';
      return`<div onclick="insertAssetToBrief(${bid},${realIdx})" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='var(--accent)';this.style.background='var(--acbg)'" onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--bg2)'">
        <span style="font-size:18px">${icon}</span>
        <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${asset.name}</div><div style="font-size:10px;color:var(--text3)">${asset.category||''}${asset.size?' · '+asset.size:''}</div></div>
        <span style="font-size:10px;color:var(--accent2)">Insert →</span>
      </div>`;
    }).join('');
  }

  const mo=document.createElement('div');mo.id='modal-asset-picker';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal md" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Insert from Assets — ${b.name}</div>
    <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px">
      ${cats.map(c=>`<button onclick="window._apCat='${c}';document.querySelectorAll('.ap-cat-btn').forEach(x=>x.style.background='var(--bg3)');this.style.background='var(--accent)';this.style.color='#fff';${filterCat}='${c}'" style="padding:3px 10px;border-radius:9px;font-size:11px;cursor:pointer;background:${c==='All'?'var(--accent)':'var(--bg3)'};color:${c==='All'?'#fff':'var(--text2)'};border:.5px solid var(--border)" class="ap-cat-btn">${c}</button>`).join('')}
    </div>
    <div id="ap-grid" style="display:flex;flex-direction:column;gap:6px;max-height:300px;overflow-y:auto"></div>
    <div class="macts"><button class="mbtn c" onclick="document.getElementById('modal-asset-picker').remove()">Close</button></div>
  </div></div>`;
  document.body.appendChild(mo);
  renderPicker();
}

function insertAssetToBrief(bid,idx){
  const b=BRANDS.find(x=>x.id==bid);
  const asset=b.assets[idx];if(!asset)return;
  // Add to current content piece attachments
  if(!CPiece)return;
  if(!CPiece.attachments)CPiece.attachments=[];
  CPiece.attachments.push({
    name:asset.name,
    url:asset.url||null,
    size:asset.size||'',
    type:'asset-ref',
    assetId:asset.id,
    addedAt:new Date().toISOString()
  });
  persist();
  document.getElementById('modal-asset-picker').remove();
  buildCPBrief(CWsBid,CCampIdx,CPieceIdx);
  toast(`✓ "${asset.name}" inserted into brief`,'var(--green)');
}

function confirmDeleteAsset(bid,idx,name){
  const mo=document.createElement('div');mo.id='modal-del-asset';mo.className='moverlay open';
  mo.innerHTML=`<div class="modal sm" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Delete asset?</div>
    <div class="msub">${name}</div>
    <div style="background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);padding:10px 12px;margin:12px 0;font-size:12px;color:var(--text2)">⚠ This will permanently remove <b>${name}</b> from the asset library. This cannot be undone.</div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-del-asset').remove()">Cancel</button>
      <button class="mbtn d" onclick="document.getElementById('modal-del-asset').remove();delAsset(${bid},${idx});buildGlobalAssets();">Delete permanently</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function confirmDeleteAssetWs(bid,idx,name){
  const mo=document.createElement('div');mo.id='modal-del-asset-ws';mo.className='moverlay open';
  const b=BRANDS.find(x=>x.id==bid);
  mo.innerHTML=`<div class="modal sm" style="display:block;position:relative;margin:auto;top:auto;transform:none"><div class="modal-p">
    <div class="mtit">Delete asset?</div>
    <div class="msub">${name}</div>
    <div style="background:var(--rbg);border:.5px solid var(--rborder);border-radius:var(--rsm);padding:10px 12px;margin:12px 0;font-size:12px;color:var(--text2)">⚠ This will permanently remove <b>${name}</b> from the asset library. This cannot be undone.</div>
    <div class="macts">
      <button class="mbtn c" onclick="document.getElementById('modal-del-asset-ws').remove()">Cancel</button>
      <button class="mbtn d" onclick="document.getElementById('modal-del-asset-ws').remove();delAsset(${bid},${idx});buildWsAssets(BRANDS.find(x=>x.id==${bid}));">Delete permanently</button>
    </div>
  </div></div>`;
  document.body.appendChild(mo);
}

function downloadAsset(bid,idx){
  toast('📥 Download will work once connected to file storage','var(--amber)');
}

function delAsset(bid,idx){
  if(!isSAM(CU)&&!isBM(CU)){toast('⚠ Only SAM/BM can delete assets','var(--amber)');return;}
  const b=BRANDS.find(x=>x.id==bid);
  const name=b.assets[idx]?.name||'Asset';
  b.assets.splice(idx,1);
  persist();buildWsAssets(b);
  toast(`🗑 "${name}" removed`,'var(--red)');
}
function rndrAssets(b,f){const a=f==='all'?b.assets:b.assets.filter(x=>x.type===f);if(!a.length)return`<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--text3);font-size:12px">No assets yet</div>`;return a.map((x,i)=>`<div class="aitem"><div class="aiico" style="background:${aCl(x.ft)}22">${aEm(x.ft)}</div><div class="ainm">${x.name}</div><div class="aimt">${x.size} · ${x.date}</div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px"><div class="badge ${aBdg(x.type)}">${x.type}</div><button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:11px" onclick="delAsset(${b.id},${i})">✕</button></div></div>`).join('');}
function filtAssets(t,el,bid){const b=BRANDS.find(x=>x.id===bid);el.closest('.aftabs').querySelectorAll('.aftab').forEach(x=>x.classList.remove('active'));el.classList.add('active');document.getElementById('ag-'+bid).innerHTML=rndrAssets(b,t);}
function aCl(ft){return{image:'#7c6af7',pdf:'#f55c5c',doc:'#5baef7',ppt:'#f5a623',xls:'#4eca8b'}[ft]||'#888';}
function aEm(ft){return{image:'🖼',pdf:'📄',doc:'📝',ppt:'📊',xls:'📈'}[ft]||'📁';}
function aBdg(t){return{brand:'bp',creative:'bb',doc:'bgr',report:'bg'}[t]||'bgr';}
function handleFileUpload(e){Array.from(e.target.files).forEach(f=>addAsset(f,CAssetBid));e.target.value='';}
function handleDrop(e,bid){e.preventDefault();e.currentTarget.classList.remove('drag');CAssetBid=bid;Array.from(e.dataTransfer.files).forEach(f=>addAsset(f,bid));}
function addAsset(file,bid){const b=BRANDS.find(x=>x.id===bid);if(!b)return;if(file.size>4*1024*1024){toast('⚠ File too large','var(--amber)');return;}const ext=file.name.split('.').pop().toLowerCase();const fm={png:'image',jpg:'image',jpeg:'image',gif:'image',webp:'image',pdf:'pdf',doc:'doc',docx:'doc',ppt:'ppt',pptx:'ppt',xls:'xls',xlsx:'xls'};const ft=fm[ext]||'doc';const cm={image:'creative',pdf:'doc',doc:'doc',ppt:'doc',xls:'report'};b.assets.push({name:file.name,ft,type:cm[ft]||'doc',size:fmtSize(file.size),date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'})});buildWsAssets(b);buildWsOverview(b);toast(`✓ "${file.name}" uploaded`,'var(--green)');}
function delAsset(bid,idx){const b=BRANDS.find(x=>x.id===bid);b.assets.splice(idx,1);buildWsAssets(b);buildWsOverview(b);toast('Asset removed','var(--red)');}
function fmtSize(b){if(b<1024)return b+'B';if(b<1048576)return Math.round(b/1024)+'KB';return(b/1048576).toFixed(1)+'MB';}

// ══════════════════════════════════════════
// TEAM MANAGEMENT
// ══════════════════════════════════════════
function buildTeamList(){const ac=MEMBERS.filter(m=>m.active),in2=MEMBERS.filter(m=>!m.active);document.getElementById('team-count').textContent=`· ${ac.length} active${in2.length?`, ${in2.length} inactive`:''}`;document.getElementById('nb-team').textContent=ac.length;document.getElementById('dash-mcount').textContent=ac.length;document.getElementById('team-list').innerHTML=[...ac,...in2].map(m=>`<div class="mrow ${!m.active?'inact':''}"><div class="mrav" style="background:${m.bg};color:${m.color}">${m.initials}</div><div class="mrinfo"><div class="mrname">${m.name} ${!m.active?'<span class="badge br" style="font-size:9px">Inactive</span>':''}</div><div class="mrmeta">${m.username} · ${m.title} · ${m.brands.filter(bid=>BRANDS.find(b=>b.id===bid&&!b.archived)).length} brands</div></div><div class="badge ${roleBadgeCls(m.role)}" style="margin-right:8px">${roleLabel(m.role)}</div><div class="mrstats"><div class="mrstat"><div class="mrsv" style="color:${m.color}">${TASKS.filter(t=>t.assigneeId===m.id&&t.stage!=='completed').length}</div><div class="mrsl">Tasks</div></div></div><div class="mracts"><div class="icobtn" onclick="openEditMember(${m.id})" title="Edit">✏</div><div class="icobtn" onclick="openResetPass(${m.id})" title="Reset password">🔑</div><div class="icobtn" onclick="openDeactivate(${m.id})">${m.active?'⏸':'▶'}</div>${m.id!==CU.id?`<div class="icobtn d" onclick="openDeleteMember(${m.id})">🗑</div>`:'<div style="width:30px"></div>'}</div></div>`).join('');}
function openAddMemberModal(){CNewMemberBrands=[];['nm-name','nm-title','nm-user','nm-pass'].forEach(id=>document.getElementById(id).value='');document.getElementById('nm-color').value='#7c6af7';document.getElementById('new-member-brands').innerHTML=BRANDS.filter(b=>!b.archived).map(b=>`<div class="bai" id="nmb-${b.id}" onclick="togNMB(${b.id})"><div class="baidot" style="background:${b.color}"></div><div class="bainm">${b.name}</div><div class="baick"></div></div>`).join('');openModal('add-member');}
function togNMB(bid){const el=document.getElementById('nmb-'+bid);el.classList.toggle('sel');if(CNewMemberBrands.includes(bid))CNewMemberBrands=CNewMemberBrands.filter(x=>x!==bid);else CNewMemberBrands.push(bid);el.querySelector('.baick').textContent=el.classList.contains('sel')?'✓':'';}
function saveMember(){const n=document.getElementById('nm-name').value.trim(),u=document.getElementById('nm-user').value.trim().toLowerCase(),p=document.getElementById('nm-pass').value;if(!n||!u||!p){toast('⚠ Name, username, password required','var(--amber)');return;}if(p.length<6){toast('⚠ Password min 6 chars','var(--amber)');return;}if(MEMBERS.find(m=>m.username===u)){toast('⚠ Username taken','var(--amber)');return;}const c=document.getElementById('nm-color').value,ini=n.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();const nm={id:Date.now(),name:n,initials:ini,role:document.getElementById('nm-role').value,title:document.getElementById('nm-title').value||'Team Member',color:c,bg:c+'22',username:u,password:p,active:true,brands:CNewMemberBrands};MEMBERS.push(nm);syncBrandOwners();persist();closeModal();buildTeamList();buildDemoList();toast(`✓ Account created for ${n}`,'var(--green)');}
function openEditMember(mid){CEditMid=mid;const m=MEMBERS.find(x=>x.id===mid);CEditMemberBrands=[...m.brands];document.getElementById('edit-member-sub').textContent=`Editing: ${m.name}`;document.getElementById('em-name').value=m.name;document.getElementById('em-title').value=m.title;document.getElementById('em-user').value=m.username;document.getElementById('em-role').value=m.role;document.getElementById('edit-member-brands').innerHTML=BRANDS.filter(b=>!b.archived).map(b=>`<div class="bai ${m.brands.includes(b.id)?'sel':''}" id="emb-${b.id}" onclick="togEMB(${b.id})"><div class="baidot" style="background:${b.color}"></div><div class="bainm">${b.name}</div><div class="baick">${m.brands.includes(b.id)?'✓':''}</div></div>`).join('');openModal('edit-member');}
function togEMB(bid){const el=document.getElementById('emb-'+bid);el.classList.toggle('sel');if(CEditMemberBrands.includes(bid))CEditMemberBrands=CEditMemberBrands.filter(x=>x!==bid);else CEditMemberBrands.push(bid);el.querySelector('.baick').textContent=el.classList.contains('sel')?'✓':'';}
function updateMember(){const m=MEMBERS.find(x=>x.id===CEditMid);m.name=document.getElementById('em-name').value.trim()||m.name;m.title=document.getElementById('em-title').value.trim()||m.title;m.role=document.getElementById('em-role').value;m.brands=CEditMemberBrands;m.initials=m.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();syncBrandOwners();persist();closeModal();buildTeamList();if(CU.id===m.id){CU={...CU,...m};setupUser();}toast(`✓ ${m.name} updated`,'var(--green)');}
function openResetPass(mid){CEditMid=mid;const m=MEMBERS.find(x=>x.id===mid);document.getElementById('reset-pass-sub').textContent=`Reset password for ${m.name}`;document.getElementById('rp-pass').value='';document.getElementById('rp-confirm').value='';openModal('reset-pass');}
function confirmResetPass(){const p=document.getElementById('rp-pass').value,c=document.getElementById('rp-confirm').value;if(p.length<6){toast('⚠ Min 6 chars','var(--amber)');return;}if(p!==c){toast('⚠ Passwords do not match','var(--amber)');return;}const m=MEMBERS.find(x=>x.id===CEditMid);m.password=p;closeModal();toast(`✓ Password reset for ${m.name}`,'var(--green)');}
function openDeactivate(mid){CEditMid=mid;const m=MEMBERS.find(x=>x.id===mid);document.getElementById('deact-title').textContent=m.active?`Deactivate ${m.name}?`:`Activate ${m.name}?`;document.getElementById('deact-sub').textContent=m.active?'Member loses access but data is preserved.':'Member will be able to log in again.';openModal('deactivate-member');}
function confirmDeactivate(){const m=MEMBERS.find(x=>x.id===CEditMid);m.active=!m.active;persist();closeModal();buildTeamList();buildDemoList();toast(m.active?`▶ ${m.name} activated`:`⏸ ${m.name} deactivated`,m.active?'var(--green)':'var(--amber)');}
function openDeleteMember(mid){CEditMid=mid;const m=MEMBERS.find(x=>x.id===mid);document.getElementById('del-member-sub').textContent=`Delete "${m.name}" permanently?`;openModal('delete-member');}
function confirmDeleteMember(){const m=MEMBERS.find(x=>x.id===CEditMid),n=m.name;MEMBERS=MEMBERS.filter(x=>x.id!==CEditMid);persist();closeModal();buildTeamList();buildDemoList();toast(`🗑 ${n} deleted`,'var(--red)');}

// ══════════════════════════════════════════
// NAV
// ══════════════════════════════════════════
const ST={dashboard:'Dashboard',brands:'Brands',workspace:'Brand workspace',playbook:'Playbook',tasks:'Tasks',campaigns:'Campaigns',assets:'Assets',team:'Team',productivity:'Productivity',reports:'Monthly Reports',settings:'Settings',lookups:'Lookups',approvals:'Approvals',mywork:'My Work'};
const PB={dashboard:'',brands:'',workspace:'',playbook:'',tasks:'',campaigns:'',assets:'',team:'',productivity:'',reports:'',settings:'',lookups:'',approvals:'',mywork:''};
function showScreen(id,navEl){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const scr=document.getElementById('screen-'+id);if(scr)scr.classList.add('active');document.querySelectorAll('.navi').forEach(n=>n.classList.remove('active'));if(navEl)navEl.classList.add('active');if(id!=='workspace'){const bc=document.getElementById('topbar-bc');const pb=document.getElementById('primary-btn');if(bc)bc.innerHTML=`<div class="ptitle">${ST[id]||id}</div>`;if(pb)pb.textContent=PB[id]||'';}if(id==='productivity')buildProductivity();if(id==='reports')initReports();if(id==='approvals'&&CU)buildApprovals();if(id==='mywork'&&CU)buildMyWork();if(id==='assets'&&CU)buildGlobalAssets();if(id==='settings')buildIntegrationsList();if(id==='campaigns')buildCampaignsScreen();}

function buildCampaignsScreen(){
  const el=document.getElementById('campaigns-screen-body');if(!el)return;
  const searchQ=(document.getElementById('camp-search')?.value||'').toLowerCase().trim();
  const filterBid=parseInt(document.getElementById('camp-brand-filter')?.value)||null;
  const filterMonth=document.getElementById('camp-month-filter')?.value||'';
  const filterStatus=window._campStatusFilter||'';
  const today=new Date().toISOString().split('T')[0];
  const myBrands=BRANDS.filter(b=>!b.archived&&(!CU||isSAM(CU)||(CU.brands&&CU.brands.some(x=>x==b.id))));

  // Populate brand dropdown once
  const brandSel=document.getElementById('camp-brand-filter');
  if(brandSel&&brandSel.children.length<=1)
    brandSel.innerHTML='<option value="">All brands</option>'+myBrands.map(b=>`<option value="${b.id}">${b.name}</option>`).join('');

  // Set default to current month on first load
  const monthSel=document.getElementById('camp-month-filter');
  if(monthSel&&!monthSel.dataset.initialized){
    monthSel.dataset.initialized='true';
    const now=new Date();
    monthSel.value=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  }

  // Collect all campaigns with status
  let allCamps=[];
  myBrands.forEach(b=>{
    (b.campaigns||[]).forEach((camp,ci)=>{
      // Use actual camp.status — map to screen's 3-state system
      let status='planned';
      if(camp.status==='active')status='active';
      else if(camp.status==='complete'||camp.status==='completed')status='completed';
      else if(camp.status==='paused')status='active'; // paused shown in active group
      const pieces=camp.contentPieces||[];
      const approved=pieces.filter(p=>p.status==='approved'||p.publishStatus==='published').length;
      const tasks=TASKS.filter(t=>t.brandId==b.id&&(t.contentPieceRef?.bid==b.id||t.brandId==b.id));
      const doneTasks=tasks.filter(t=>t.stage==='completed'||t.stage==='approved').length;
      allCamps.push({b,camp,ci,pieces,approved,tasks,doneTasks,status});
    });
  });

  // Count per status for chips
  const counts={all:allCamps.length,active:allCamps.filter(x=>x.status==='active').length,planned:allCamps.filter(x=>x.status==='planned').length,completed:allCamps.filter(x=>x.status==='completed').length};

  // Status chips
  const chipsEl=document.getElementById('camp-status-chips');
  if(chipsEl){
    const chips=[
      {key:'',label:'All',count:counts.all,color:'var(--accent2)',bg:'var(--acbg)',border:'var(--acb)'},
      {key:'active',label:'● Active',count:counts.active,color:'var(--green)',bg:'var(--gnbg)',border:'var(--gnb)'},
      {key:'planned',label:'○ Planned',count:counts.planned,color:'var(--blue)',bg:'var(--bbg)',border:'rgba(91,174,247,.35)'},
      {key:'completed',label:'✓ Completed',count:counts.completed,color:'var(--text3)',bg:'var(--bg3)',border:'var(--border)'},
    ];
    chipsEl.innerHTML=chips.map(c=>{
      const active=filterStatus===c.key;
      return`<button onclick="window._campStatusFilter='${c.key}';buildCampaignsScreen()" style="padding:5px 14px;border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;border:.5px solid ${active?c.border:'var(--border)'};background:${active?c.bg:'var(--bg2)'};color:${active?c.color:'var(--text2)'};font-family:var(--font);transition:all .15s">${c.label} <span style="font-size:11px;opacity:.7">${c.count}</span></button>`;
    }).join('');
  }

  // Apply filters
  let filtered=allCamps;
  if(filterStatus)filtered=filtered.filter(x=>x.status===filterStatus);
  if(filterBid)filtered=filtered.filter(x=>x.b.id==filterBid);
  if(filterMonth)filtered=filtered.filter(x=>{
    const start=(x.camp.startDate||'').substring(0,7);
    const end=(x.camp.endDate||'').substring(0,7);
    if(!start&&!end)return true; // no dates = always show
    if(start&&end)return filterMonth>=start&&filterMonth<=end;
    if(start)return filterMonth>=start;
    if(end)return filterMonth<=end;
    return true;
  });
  if(searchQ)filtered=filtered.filter(x=>(x.camp.name||'').toLowerCase().includes(searchQ)||(x.b.name||'').toLowerCase().includes(searchQ)||(x.camp.objective||'').toLowerCase().includes(searchQ));

  const statusColor={active:'var(--green)',planned:'var(--blue)',completed:'var(--text3)'};
  const statusBg={active:'var(--gnbg)',planned:'var(--bbg)',completed:'var(--bg3)'};
  const statusBorder={active:'var(--gnb)',planned:'rgba(91,174,247,.35)',completed:'var(--border)'};

  if(!filtered.length){
    el.innerHTML=`<div style="text-align:center;padding:60px 20px"><div style="font-size:48px;margin-bottom:12px;opacity:.3">🎯</div><div style="font-size:14px;color:var(--text2)">No campaigns found</div><div style="font-size:12px;color:var(--text3);margin-top:4px">Try adjusting your filters or create campaigns in a brand workspace</div></div>`;
    return;
  }

  // Summary stats
  const totalPieces=filtered.reduce((s,x)=>s+x.pieces.length,0);
  const approvedPieces=filtered.reduce((s,x)=>s+x.approved,0);
  const totalTasks=filtered.reduce((s,x)=>s+x.tasks.length,0);
  const doneTasks=filtered.reduce((s,x)=>s+x.doneTasks,0);

  // Group by brand
  const brandGroups={};
  filtered.forEach(x=>{
    if(!brandGroups[x.b.id])brandGroups[x.b.id]={b:x.b,camps:[]};
    brandGroups[x.b.id].camps.push(x);
  });

  el.innerHTML=`
    <!-- Summary -->
    <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap">
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px 16px;text-align:center;min-width:80px">
        <div style="font-size:20px;font-weight:700;color:var(--accent2)">${filtered.length}</div>
        <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Campaigns</div>
      </div>
      <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:10px 16px;text-align:center;min-width:80px">
        <div style="font-size:20px;font-weight:700;color:var(--green)">${filtered.filter(x=>x.status==='active').length}</div>
        <div style="font-size:10px;color:var(--green);text-transform:uppercase;letter-spacing:.04em">Active</div>
      </div>
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px 16px;text-align:center;min-width:80px">
        <div style="font-size:20px;font-weight:700;color:var(--teal)">${approvedPieces}/${totalPieces}</div>
        <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Posts approved</div>
      </div>
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px 16px;text-align:center;min-width:80px">
        <div style="font-size:20px;font-weight:700;color:var(--blue)">${doneTasks}/${totalTasks}</div>
        <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Tasks done</div>
      </div>
    </div>

    <!-- Campaign cards grouped by brand -->
    ${Object.values(brandGroups).map(({b,camps})=>`
      <div style="margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:30px;height:30px;border-radius:8px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${(b.initials||b.name.substring(0,2)).toUpperCase()}</div>
          <div style="font-size:14px;font-weight:600">${b.name}</div>
          <span style="font-size:11px;color:var(--text3)">${camps.length} campaign${camps.length!==1?'s':''}</span>
          <button onclick="openBrandWs(${b.id})" style="margin-left:auto;font-size:11px;padding:3px 10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);color:var(--text2);cursor:pointer;font-family:var(--font)" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">Open workspace →</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">
          ${camps.map(({camp,ci,pieces,approved,tasks,doneTasks,status})=>{
            const total=pieces.length;
            const pct=total?Math.round(approved/total*100):0;
            const taskPct=tasks.length?Math.round(doneTasks/tasks.length*100):0;
            return`<div onclick="openCampaignFromList(${b.id},${ci})" style="background:var(--bg2);border:.5px solid ${statusBorder[status]};border-radius:var(--r);padding:14px;cursor:pointer;transition:all .15s" onmouseover="this.style.background='var(--bg3)';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='var(--bg2)';this.style.transform='none'">
              <!-- Brand tag + status -->
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                <span style="font-size:10px;padding:2px 7px;background:${b.color}18;color:${b.color};border-radius:4px;font-weight:600">${b.name}</span>
                <span style="font-size:10px;padding:2px 8px;border-radius:9px;background:${statusBg[status]};color:${statusColor[status]};border:.5px solid ${statusBorder[status]}">${status==='active'?'● Active':status==='planned'?'○ Planned':'✓ Done'}</span>
              </div>
              <!-- Campaign name -->
              <div style="font-size:13px;font-weight:600;margin-bottom:4px">${camp.name||'Unnamed campaign'}</div>
              <!-- Objective + dates -->
              ${camp.objective?`<div style="font-size:11px;color:var(--text3);margin-bottom:4px">🎯 ${camp.objective}</div>`:''}
              ${camp.startDate||camp.endDate?`<div style="font-size:10px;color:var(--text3);margin-bottom:8px">📅 ${camp.startDate||'?'} → ${camp.endDate||'?'}</div>`:''}
              <!-- Content progress -->
              ${total?`<div style="margin-bottom:6px">
                <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-bottom:3px"><span>Content</span><span>${approved}/${total} approved</span></div>
                <div style="height:3px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${b.color};border-radius:2px"></div></div>
              </div>`:''}
              <!-- Task progress -->
              ${tasks.length?`<div style="margin-bottom:8px">
                <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-bottom:3px"><span>Tasks</span><span>${doneTasks}/${tasks.length} done</span></div>
                <div style="height:3px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="height:100%;width:${taskPct}%;background:var(--teal);border-radius:2px"></div></div>
              </div>`:''}
              <!-- Footer -->
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
                <div style="display:flex;gap:8px;font-size:10px;color:var(--text3)">
                  ${camp.budget?`<span>💰 ${camp.budget}</span>`:''}
                  ${(camp.platforms||[]).length?`<span>📱 ${(camp.platforms||[]).slice(0,2).join(', ')}</span>`:''}
                </div>
                <span style="font-size:10px;color:var(--accent2)">Open →</span>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`).join('')}`;
}

function openCampaignFromList(bid,ci){
  // Open brand workspace → Monthly Plan tab → scroll to campaign
  const b=BRANDS.find(x=>x.id==bid);if(!b)return;
  CBid=bid;
  openBrand(bid);
  // Switch to monthly plan tab after workspace loads
  setTimeout(()=>{
    const tabs=document.querySelectorAll('.wstab');
    tabs.forEach(t=>{if(t.textContent.includes('Monthly'))t.click();});
    // Scroll to campaign after tab switch
    setTimeout(()=>{
      const campEl=document.getElementById(`camp-${bid}-${ci}`)||document.querySelector(`[data-camp-idx="${ci}"]`);
      if(campEl)campEl.scrollIntoView({behavior:'smooth',block:'start'});
      // Expand the campaign if collapsed
      if(b.campaigns&&b.campaigns[ci]){
        b.campaigns[ci]._expanded=true;
        persist();buildWsMonthly(b);
      }
    },400);
  },300);
}

function buildCampaignsDashSection(){
  // For dashboard — compact view
  const myBrands=BRANDS.filter(b=>!b.archived&&(!CU||isSAM(CU)||(CU.brands&&CU.brands.some(x=>x==b.id))));
  const today=new Date().toISOString().split('T')[0];
  let allCamps=[];
  myBrands.forEach(b=>{
    (b.campaigns||[]).forEach((camp,ci)=>{
      let status='planned';
      if(camp.endDate&&camp.endDate<today)status='completed';
      else if(camp.startDate&&camp.startDate<=today)status='active';
      if(status==='completed')return;// skip completed in dashboard
      const pieces=camp.contentPieces||[];
      const approved=pieces.filter(p=>p.status==='approved').length;
      allCamps.push({b,camp,ci,pieces,approved,status});
    });
  });
  if(!allCamps.length)return`<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">No active campaigns — create one in any brand workspace</div>`;
  return allCamps.slice(0,6).map(({b,camp,pieces,approved,status})=>{
    const total=pieces.length;
    const pct=total?Math.round(approved/total*100):0;
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:.5px solid var(--border)">
      <div style="width:8px;height:8px;border-radius:50%;background:${status==='active'?'var(--green)':'var(--blue)'};flex-shrink:0"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${camp.name}</div>
        <div style="font-size:10px;color:var(--text3)">${b.name}${camp.endDate?' · ends '+camp.endDate:''}</div>
        <div style="height:3px;background:var(--bg4);border-radius:2px;margin-top:4px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${b.color};border-radius:2px"></div></div>
      </div>
      <div style="font-size:11px;color:var(--text3);flex-shrink:0">${approved}/${total}</div>
    </div>`;
  }).join('')+(allCamps.length>6?`<div style="font-size:11px;color:var(--accent2);text-align:center;padding:8px;cursor:pointer" onclick="showScreen('campaigns',null)">View all ${allCamps.length} campaigns →</div>`:'');
}

function buildProductivity(){
  const isAdmin=isSAM(CU);
  const today=new Date().toISOString().split('T')[0];

  // Scope tasks and brands by role
  const myTasks=isAdmin?TASKS:isBM(CU)?TASKS.filter(t=>t.assigneeId===CU.id||(CU.brands&&BRANDS.find(b=>b.id===t.brandId&&CU.brands.includes(b.id)))):TASKS.filter(t=>t.assigneeId===CU.id);
  const activeBrands=BRANDS.filter(b=>!b.archived);
  const myBrands=isAdmin?activeBrands:activeBrands.filter(b=>CU.brands&&CU.brands.includes(b.id));

  // Update title
  document.getElementById('prod-title').textContent=isAdmin?'Productivity overview':'My productivity';
  document.getElementById('prod-sub').textContent=isAdmin?'Team performance across tasks, quality and G7':'Your tasks, quality scores and brand progress';

  // ── SUMMARY STATS ──
  const done=myTasks.filter(t=>t.stage==='completed').length;
  const open=myTasks.filter(t=>t.stage!=='completed').length;
  const overdue=myTasks.filter(t=>t.due&&t.due<today&&t.stage!=='completed').length;
  const scored=myTasks.filter(t=>t.score>0);
  const avgScore=scored.length?(scored.reduce((a,t)=>a+t.score,0)/scored.length).toFixed(1):'—';
  const totalCamps=myBrands.reduce((a,b)=>a+b.campaigns.length,0);
  document.getElementById('prod-stats').innerHTML=`
    <div class="sc"><div class="sl">Tasks done</div><div class="sv" style="color:var(--green)">${done}</div><div class="sch pos">Completed</div></div>
    <div class="sc"><div class="sl">Open tasks</div><div class="sv">${open}</div><div class="sch" style="color:var(--amber)">${overdue} overdue</div></div>
    <div class="sc"><div class="sl">Avg quality</div><div class="sv" style="color:var(--accent2)">${avgScore}${avgScore!=='—'?'<span style="font-size:13px">/5</span>':''}</div><div class="sch neu">${scored.length} scored</div></div>
    <div class="sc"><div class="sl">Campaigns</div><div class="sv" style="color:var(--blue)">${totalCamps}</div><div class="sch neu">Across ${myBrands.length} brands</div></div>`;

  // ── MEMBER TASK COMPLETION (admin: all members | member: just self) ──
  document.getElementById('prod-member-title').textContent=isAdmin?'Team task completion':'My task completion';
  const members=isAdmin?MEMBERS.filter(m=>m.active):[CU];
  let mhtml='';
  members.forEach(m=>{
    const mt=TASKS.filter(t=>t.assigneeId===m.id);
    const mc=mt.filter(t=>t.stage==='completed').length;
    const mo=mt.filter(t=>t.stage!=='completed').length;
    const pct=mt.length?Math.round(mc/mt.length*100):0;
    mhtml+=`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:.5px solid var(--border)">
      <div style="width:28px;height:28px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0">${m.initials}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:500;margin-bottom:3px">${m.name}</div>
        <div style="height:5px;background:var(--bg4);border-radius:3px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${m.color};border-radius:3px;transition:width .5s"></div></div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:13px;font-weight:600;color:${m.color}">${pct}%</div>
        <div style="font-size:10px;color:var(--text3)">${mc}/${mt.length} done</div>
      </div>
      <span class="badge ${mo>0?'ba':'bg'}">${mo} open</span>
    </div>`;
  });
  document.getElementById('prod-member-list').innerHTML=mhtml||'<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No data</div>';

  // ── QUALITY SCORES ──
  document.getElementById('prod-quality-title').textContent=isAdmin?'Quality scores by member':'My quality scores';
  let qhtml='';
  members.forEach(m=>{
    const scored2=TASKS.filter(t=>t.assigneeId===m.id&&t.score>0);
    const avg=scored2.length?(scored2.reduce((a,t)=>a+t.score,0)/scored2.length).toFixed(1):'—';
    const stars=avg!=='—'?'★'.repeat(Math.round(avg))+'☆'.repeat(5-Math.round(avg)):'☆☆☆☆☆';
    qhtml+=`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:.5px solid var(--border)">
      <div style="width:28px;height:28px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0">${m.initials}</div>
      <div style="flex:1"><div style="font-size:12px;font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--amber);letter-spacing:1px">${stars}</div></div>
      <div style="text-align:right"><div style="font-size:15px;font-weight:600;color:var(--accent2)">${avg}${avg!=='—'?'<span style="font-size:11px;color:var(--text3)">/5</span>':''}</div><div style="font-size:10px;color:var(--text3)">${scored2.length} tasks</div></div>
    </div>`;
  });
  document.getElementById('prod-quality-list').innerHTML=qhtml||'<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No scored tasks yet</div>';

  // ── G7 PROGRESS ──
  let g7html='';
  myBrands.slice(0,6).forEach(b=>{
    const pct=Math.round(b.g7.filter(a=>a.done).length/7*100);
    g7html+=`<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:.5px solid var(--border)">
      <div style="width:26px;height:26px;border-radius:6px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">${b.name.substring(0,2).toUpperCase()}</div>
      <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${b.name}</div>
      <div style="height:4px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${b.color};border-radius:2px;transition:width .5s"></div></div></div>
      <div style="font-size:12px;font-weight:600;color:${b.color};flex-shrink:0">${pct}%</div>
    </div>`;
  });
  document.getElementById('prod-g7-list').innerHTML=g7html||'<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No brands</div>';

  // ── BRAND WORKLOAD ──
  document.getElementById('prod-workload-title').textContent=isAdmin?'Brand workload':'My brand workload';
  let whtml='';
  myBrands.slice(0,6).forEach(b=>{
    const bt=TASKS.filter(t=>t.bId===b.id||t.brandId===b.id);
    const bo=bt.filter(t=>t.stage!=='completed').length;
    const bc=bt.filter(t=>t.stage==='completed').length;
    whtml+=`<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:.5px solid var(--border)">
      <div style="width:26px;height:26px;border-radius:6px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">${b.name.substring(0,2).toUpperCase()}</div>
      <div style="flex:1"><div style="font-size:12px;font-weight:500">${b.name}</div><div style="font-size:10px;color:var(--text3)">${bt.length} tasks · ${b.campaigns.length} campaigns</div></div>
      <div style="display:flex;gap:4px">
        <span class="badge ba">${bo} open</span>
        <span class="badge bg">${bc} done</span>
      </div>
    </div>`;
  });
  document.getElementById('prod-workload-list').innerHTML=whtml||'<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No brands</div>';

  // ── OVERDUE TASKS ──
  const overdueList=myTasks.filter(t=>t.due&&t.due<today&&t.stage!=='completed').sort((a,b)=>a.due.localeCompare(b.due));
  let ohtml='';
  if(overdueList.length){
    overdueList.slice(0,6).forEach(t=>{
      const b=BRANDS.find(x=>x.id===(t.bId||t.brandId));
      const m=MEMBERS.find(x=>x.id===(t.aId||t.assigneeId));
      const days=Math.floor((new Date(today)-new Date(t.due))/(1000*60*60*24));
      ohtml+=`<div class="ti" onclick="openTaskDetail('${t.id}')" style="cursor:pointer">
        <div style="flex:1"><div class="ttx">${t.title}</div><div class="tmt">${b?b.name:'—'} · ${t.g7||''}</div></div>
        <span class="badge br">${days}d overdue</span>
        ${m?`<div style="width:22px;height:22px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600">${m.initials}</div>`:''}
      </div>`;
    });
  }else{ohtml='<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">🎉 No overdue tasks!</div>';}
  document.getElementById('prod-overdue-list').innerHTML=ohtml;

  // ── CAMPAIGN SUMMARY ──
  let chtml='';
  const allCamps=myBrands.flatMap(b=>b.campaigns.map(c=>({...c,brandName:b.name,brandColor:b.color})));
  if(allCamps.length){
    const byStatus={planning:0,active:0,paused:0,complete:0};
    allCamps.forEach(c=>{if(byStatus[c.status]!==undefined)byStatus[c.status]++;});
    chtml+=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:18px;font-weight:600;color:var(--green)">${byStatus.active}</div><div style="font-size:10px;color:var(--text3)">Active</div></div>
      <div style="background:var(--ambg);border:.5px solid var(--amb);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:18px;font-weight:600;color:var(--amber)">${byStatus.planning}</div><div style="font-size:10px;color:var(--text3)">Planning</div></div>
      <div style="background:var(--rdbg);border:.5px solid var(--rdb);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:18px;font-weight:600;color:var(--red)">${byStatus.paused}</div><div style="font-size:10px;color:var(--text3)">Paused</div></div>
      <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:18px;font-weight:600;color:var(--text2)">${byStatus.complete}</div><div style="font-size:10px;color:var(--text3)">Complete</div></div>
    </div>`;
    allCamps.slice(0,4).forEach(c=>{
      const po=c.po==='organic'?'🌱':c.po==='both'?'⚡':'💰';
      chtml+=`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--border)">
        <div style="width:7px;height:7px;border-radius:50%;background:${c.brandColor};flex-shrink:0"></div>
        <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${po} ${c.name}</div><div style="font-size:10px;color:var(--text3)">${c.brandName}</div></div>
        <span class="badge ${c.status==='active'?'bg':c.status==='planning'?'ba':'bgr'}">${c.status}</span>
      </div>`;
    });
  }else{chtml='<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No campaigns yet</div>';}
  document.getElementById('prod-camp-list').innerHTML=chtml;
}
function handlePrimary(){const id=document.querySelector('.screen.active').id.replace('screen-','');if(id==='brands'||id==='dashboard')openAddBrandModal();else if(id==='workspace'&&CBid){/*campaign added from Monthly Plan tab*/}else if(id==='team')openAddMemberModal();else if(id==='tasks')openAddTask();else toast('🚧 Coming in next phase','var(--accent)');}

// MODALS
function openModal(id){document.querySelectorAll('.modal').forEach(m=>m.style.display='none');document.getElementById('modal-'+id).style.display='block';document.getElementById('modal-overlay').classList.add('open');}
function closeModal(){document.getElementById('modal-overlay').classList.remove('open');}
function closeModalOutside(e){if(e.target===document.getElementById('modal-overlay'))closeModal();}

function toggleSection(id){
  const el=document.getElementById(id);if(!el)return;
  const isOpen=el.style.display!=='none'&&el.style.display!=='';
  el.style.display=isOpen?'none':'block';
  // Flip the ▼/▲ on the trigger link
  const trigger=document.querySelector(`[onclick*="toggleSection('${id}')"]`);
  if(trigger)trigger.innerHTML=trigger.innerHTML.replace(isOpen?'▲':'▼',isOpen?'▼':'▲');
}

function importCSV(event,platform,key){
  const file=event.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    const lines=e.target.result.trim().split('\n').filter(l=>l.trim());
    if(lines.length<2){toast('CSV must have a header row + at least one data row','var(--amber)');return;}
    // Sum numeric columns across all data rows (skip header)
    const headers=lines[0].split(',').map(h=>h.trim().toLowerCase().replace(/[^a-z0-9]/g,'_'));
    const rows=lines.slice(1).map(l=>l.split(',').map(v=>v.trim().replace(/['"]/g,'')));

    function sumCol(name){
      const idx=headers.findIndex(h=>h.includes(name));
      if(idx<0)return null;
      const vals=rows.map(r=>parseFloat((r[idx]||'0').replace(/[%,]/g,''))).filter(v=>!isNaN(v));
      return vals.length?vals.reduce((a,b)=>a+b,0):null;
    }
    function avgCol(name){
      const idx=headers.findIndex(h=>h.includes(name));
      if(idx<0)return null;
      const vals=rows.map(r=>parseFloat((r[idx]||'0').replace(/[%,]/g,''))).filter(v=>!isNaN(v));
      return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):null;
    }
    function lastCol(name){
      const idx=headers.findIndex(h=>h.includes(name));
      if(idx<0)return null;
      const last=rows[rows.length-1];
      return last&&last[idx]?last[idx]:null;
    }

    const d=REPORT_DATA[key];
    if(!d)return;
    let filled=0;

    if(platform==='linkedin'){
      if(sumCol('impression')!==null){d.li_impressions=sumCol('impression').toLocaleString();filled++;}
      if(avgCol('engagement')!==null){d.li_engagement=avgCol('engagement')+'%';filled++;}
      if(sumCol('click')!==null){d.li_clicks=sumCol('click').toLocaleString();filled++;}
      const fol=lastCol('follower');if(fol){d.li_followers=fol;filled++;}
    }else if(platform==='instagram'){
      if(sumCol('reach')!==null){d.ig_reach=sumCol('reach').toLocaleString();filled++;}
      if(sumCol('like')!==null){d.ig_likes=sumCol('like').toLocaleString();filled++;}
      if(sumCol('save')!==null){d.ig_saves=sumCol('save').toLocaleString();filled++;}
      if(sumCol('story')!==null){d.ig_story_views=sumCol('story').toLocaleString();filled++;}
      const fol=lastCol('follower');if(fol){d.ig_followers=fol;filled++;}
    }else if(platform==='facebook'){
      if(sumCol('reach')!==null){d.fb_reach=sumCol('reach').toLocaleString();filled++;}
      if(sumCol('reaction')!==null){d.fb_reactions=sumCol('reaction').toLocaleString();filled++;}
      if(sumCol('share')!==null){d.fb_shares=sumCol('share').toLocaleString();filled++;}
      const fol=lastCol('follower');if(fol){d.fb_followers=fol;filled++;}
    }else if(platform==='ga'){
      if(sumCol('session')!==null){d.ga_sessions=sumCol('session').toLocaleString();filled++;}
      if(sumCol('user')!==null){d.ga_users=sumCol('user').toLocaleString();filled++;}
      if(avgCol('bounce')!==null){d.ga_bounce=avgCol('bounce')+'%';filled++;}
      const dur=lastCol('duration');if(dur){d.ga_duration=dur;filled++;}
    }else if(platform==='gsc'){
      if(sumCol('click')!==null){d.gsc_clicks=sumCol('click').toLocaleString();filled++;}
      if(sumCol('impression')!==null){d.gsc_impressions=sumCol('impression').toLocaleString();filled++;}
      if(avgCol('ctr')!==null){d.gsc_ctr=avgCol('ctr')+'%';filled++;}
      if(avgCol('position')!==null){d.gsc_position=avgCol('position');filled++;}
    }

    if(filled>0){
      buildReports();
      toast('✓ '+filled+' fields imported from '+file.name,'var(--green)');
    }else{
      toast('⚠ Could not match columns. Check CSV format.','var(--amber)');
    }
  };
  reader.readAsText(file);
  event.target.value='';
}



function regenCreds(prefix){
  const nameEl=document.getElementById(prefix+'-client-name');
  const base=nameEl&&nameEl.value?nameEl.value.trim().toLowerCase().replace(/[^a-z0-9]/g,'').substring(0,8):'client';
  const user=base+(Math.floor(Math.random()*900)+100);
  const pass='pass'+(Math.floor(Math.random()*9000)+1000);
  document.getElementById(prefix+'-client-user').value=user;
  document.getElementById(prefix+'-client-pass').value=pass;
}
function showCredentials(user,pass,name){
  // Remove existing creds modal if any
  const existing=document.getElementById('modal-creds');
  if(existing)existing.remove();
  const m=document.createElement('div');
  m.id='modal-creds';
  m.className='moverlay open';
  m.innerHTML=`<div class="modal sm" style="display:block;position:relative;margin:auto;top:auto;transform:none">
    <div class="modal-p">
      <div class="mtit">✓ Client login created</div>
      <div class="msub">Share these credentials with ${name} to log in</div>
      <div style="background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);padding:16px;margin:14px 0">
        <div style="margin-bottom:12px">
          <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px">Username</div>
          <div style="font-size:16px;font-weight:600;color:var(--accent2);font-family:var(--mono)">${user}</div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px">Password</div>
          <div style="font-size:16px;font-weight:600;color:var(--green);font-family:var(--mono)">${pass}</div>
        </div>
      </div>
      <div style="background:var(--ambg);border:.5px solid var(--amb);border-radius:var(--rsm);padding:9px 12px;font-size:11px;color:var(--amber);margin-bottom:14px">📋 Copy these now — they won't be shown again</div>
      <div class="macts">
        <button class="mbtn c" onclick="navigator.clipboard&&navigator.clipboard.writeText('Username: ${user}\nPassword: ${pass}').then(()=>toast('✓ Copied to clipboard','var(--green)'))">Copy both</button>
        <button class="mbtn ok" onclick="document.getElementById('modal-creds').remove()">Done →</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(m);
}
// TOAST
function toast(msg,color,dur){const t=document.getElementById('toastEl');document.getElementById('tmsg').textContent=msg;document.getElementById('tdot').style.background=color||'var(--accent)';t.classList.add('show');if(toastTimer)clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),dur||2800);}

// ══════════════════════════════════════
// PHASE 5 — MONTHLY REPORTS
// ══════════════════════════════════════

// Report data store: keyed by "brandId-YYYY-MM"
var REPORT_DATA={};

function getMonths(){
  const months=[];
  const now=new Date();
  for(let i=0;i<6;i++){
    const d=new Date(now.getFullYear(),now.getMonth()-i,1);
    const key=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
    const label=d.toLocaleDateString('en-IN',{month:'long',year:'numeric'});
    months.push({key,label});
  }
  return months;
}

function initReports(){
  // Specialist gets own activity report — not brand reports
  if(isSpec(CU)){
    buildSpecialistReport();
    return;
  }

  const months=getMonths();
  const mSel=document.getElementById('rep-month');
  mSel.innerHTML=months.map((m,i)=>`<option value="${m.key}" ${i===0?'selected':''}>${m.label}</option>`).join('');

  // Brand dropdown — Super Admin sees all, SAM sees only assigned brands
  const bSel=document.getElementById('rep-brand');
  const allActive=BRANDS.filter(b=>!b.archived);
  const ab=isSuperAdmin(CU)?allActive:allActive.filter(b=>CU&&CU.brands&&CU.brands.some(x=>x==b.id));
  if(!ab.length){
    document.getElementById('rep-content').innerHTML='<div style="text-align:center;padding:40px;color:var(--text3)">No brands assigned to you yet.</div>';
    bSel.innerHTML='<option>No brands</option>';
    return;
  }
  bSel.innerHTML=ab.map((b,i)=>`<option value="${b.id}" ${i===0?'selected':''}>${b.name}</option>`).join('');

  buildReports();
}

function buildSpecialistReport(){
  const el=document.getElementById('rep-content');
  if(!el||!CU)return;
  // Hide brand/month selectors — specialist has own view
  document.getElementById('rep-month').parentElement.style.display='none';
  const today=new Date().toISOString().split('T')[0];
  const thisMonth=today.substring(0,7);
  const myTasks=TASKS.filter(t=>t.assigneeId===CU.id);
  const months=getMonths();

  // Aggregate by month
  const monthStats=months.slice(-3).reverse().map(m=>{
    const mTasks=myTasks.filter(t=>t.updatedAt&&t.updatedAt.startsWith(m.key)||t.due&&t.due.startsWith(m.key));
    const done=mTasks.filter(t=>t.stage==='completed'||t.stage==='approved').length;
    const scored=mTasks.filter(t=>t.score>0);
    const avgQ=scored.length?(scored.reduce((a,t)=>a+t.score,0)/scored.length).toFixed(1):'—';
    const timeLogs=[];
    BRANDS.forEach(b=>(b.timeLogs||[]).filter(tl=>tl.memberId==CU.id&&tl.month===m.key).forEach(tl=>timeLogs.push(tl)));
    const totalMs=timeLogs.reduce((a,tl)=>a+logMinsToMs(tl.hours,tl.minutes),0);
    return{...m,done,open:mTasks.filter(t=>!['completed','approved'].includes(t.stage)).length,avgQ,totalMs};
  });

  // Current month tasks
  const curTasks=myTasks.filter(t=>t.due&&t.due.startsWith(thisMonth)||t.createdAt&&t.createdAt.startsWith(thisMonth));
  const completed=curTasks.filter(t=>['completed','approved'].includes(t.stage));
  const inProg=curTasks.filter(t=>t.stage==='inprogress');
  const review=curTasks.filter(t=>t.stage==='review');
  const overdue=myTasks.filter(t=>t.due&&t.due<today&&!['completed','approved'].includes(t.stage));
  const scored=myTasks.filter(t=>t.score>0);
  const avgQ=scored.length?(scored.reduce((a,t)=>a+t.score,0)/scored.length).toFixed(1):'—';

  // Time this month
  const myTimeLogs=[];
  BRANDS.forEach(b=>(b.timeLogs||[]).filter(tl=>tl.memberId==CU.id&&tl.month===thisMonth).forEach(tl=>myTimeLogs.push({...tl,brandName:b.name})));
  const totalTimeMs=myTimeLogs.reduce((a,tl)=>a+logMinsToMs(tl.hours,tl.minutes),0);

  el.innerHTML=`
    <div style="background:linear-gradient(135deg,${CU.color}22,${CU.color}08);border:.5px solid ${CU.color}44;border-radius:var(--r);padding:18px;margin-bottom:14px;display:flex;align-items:center;gap:14px">
      <div style="width:44px;height:44px;border-radius:50%;background:${CU.bg};color:${CU.color};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0">${CU.initials}</div>
      <div><div style="font-size:16px;font-weight:600">${CU.name} — My Activity Report</div>
        <div style="font-size:12px;color:var(--text2);margin-top:2px">${roleLabel(CU.role)} · ${CU.title||''} · ${new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</div></div>
    </div>
    <!-- Summary stats -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
      <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--r);padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:700;color:var(--green)">${completed.length}</div>
        <div style="font-size:11px;color:var(--green);margin-top:2px">Completed this month</div>
      </div>
      <div style="background:var(--bbg);border:.5px solid rgba(91,174,247,.35);border-radius:var(--r);padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:700;color:var(--blue)">${inProg.length+review.length}</div>
        <div style="font-size:11px;color:var(--blue);margin-top:2px">In progress / review</div>
      </div>
      <div style="background:var(--acbg);border:.5px solid var(--acb);border-radius:var(--r);padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:700;color:var(--accent2)">${avgQ}<span style="font-size:13px">/5</span></div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">Avg quality score</div>
      </div>
      <div style="background:${overdue.length?'var(--rbg)':'var(--bg2)'};border:.5px solid ${overdue.length?'var(--rborder)':'var(--border)'};border-radius:var(--r);padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:700;color:${overdue.length?'var(--red)':'var(--text2)'}">${overdue.length}</div>
        <div style="font-size:11px;color:${overdue.length?'var(--red)':'var(--text3)'};margin-top:2px">Overdue tasks</div>
      </div>
    </div>
    <!-- 3-month trend -->
    <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:600;margin-bottom:12px">📈 3-month trend</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
        ${monthStats.map(m=>`<div style="background:var(--bg3);border-radius:var(--rsm);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:6px;font-weight:600">${m.label}</div>
          <div style="font-size:18px;font-weight:700;color:var(--green)">${m.done}</div>
          <div style="font-size:10px;color:var(--text3)">completed</div>
          <div style="margin-top:6px;font-size:11px;color:var(--accent2)">⭐ ${m.avgQ}</div>
          ${m.totalMs?`<div style="font-size:10px;color:var(--teal);margin-top:2px">⏱ ${fmtMs(m.totalMs)}</div>`:''}
        </div>`).join('')}
      </div>
    </div>
    <!-- Tasks list -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px">
        <div style="font-size:12px;font-weight:600;margin-bottom:10px">✅ Completed tasks this month (${completed.length})</div>
        ${completed.length?completed.map(t=>{const b=BRANDS.find(x=>x.id==t.brandId);const s=t.score?'⭐'.repeat(t.score):'';
          return`<div style="padding:7px 0;border-bottom:.5px solid var(--border)">
            <div style="font-size:12px;font-weight:500">${t.title}</div>
            <div style="font-size:10px;color:var(--text3);margin-top:2px">${b?b.name:''} ${s?'· '+s:''} ${t.timeLogged?'· ⏱ '+fmtHM(t.timeLogged.hours,t.timeLogged.minutes):''}</div>
          </div>`}).join('')
        :'<div style="font-size:12px;color:var(--text3);padding:6px 0">No completed tasks this month</div>'}
      </div>
      <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px">
        <div style="font-size:12px;font-weight:600;margin-bottom:10px">⏳ Active tasks (${inProg.length+review.length})</div>
        ${[...inProg,...review].map(t=>{const b=BRANDS.find(x=>x.id==t.brandId);const s=STAGES[t.stage];
          return`<div style="padding:7px 0;border-bottom:.5px solid var(--border);display:flex;align-items:center;gap:8px">
            <div style="flex:1"><div style="font-size:12px;font-weight:500">${t.title}</div>
              <div style="font-size:10px;color:var(--text3)">${b?b.name:''} · Due ${t.due||'—'}</div></div>
            <span style="font-size:10px;padding:2px 6px;border-radius:9px;background:${s.bg};color:${s.color};border:.5px solid ${s.border};flex-shrink:0">${s.label}</span>
          </div>`}).join('')||'<div style="font-size:12px;color:var(--text3)">No active tasks</div>'}
        ${overdue.length?`<div style="margin-top:10px"><div style="font-size:11px;font-weight:600;color:var(--red);margin-bottom:6px">⚠ Overdue (${overdue.length})</div>
          ${overdue.map(t=>`<div style="padding:5px 0;border-bottom:.5px solid var(--border);font-size:12px;color:var(--red)">${t.title} · Due ${t.due}</div>`).join('')}</div>`:''}
      </div>
    </div>
    <!-- Time logged -->
    ${totalTimeMs?`<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:600;margin-bottom:10px">⏱ Time logged this month — <span style="color:var(--accent2)">${fmtMs(totalTimeMs)}</span></div>
      ${myTimeLogs.map(tl=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:.5px solid var(--border);font-size:12px">
        <span style="color:var(--text3);width:80px;flex-shrink:0">${tl.date}</span>
        <span style="font-weight:600;color:var(--accent2);width:55px;flex-shrink:0">${fmtHM(tl.hours,tl.minutes)}</span>
        <span style="flex:1">${tl.activity} ${tl.notes?'· <span style="color:var(--text3)">'+tl.notes+'</span>':''}</span>
        <span style="font-size:10px;color:var(--text3)">${tl.brandName||''}</span>
      </div>`).join('')}
    </div>`:''}
    <!-- Print -->
    <div style="text-align:right;padding:8px 0">
      <button onclick="window.print()" style="padding:8px 20px;background:var(--accent);border:none;border-radius:var(--rsm);color:#fff;cursor:pointer;font-family:var(--font);font-size:12px;font-weight:600">🖨 Print / Save PDF</button>
    </div>`;
}

function getRepKey(){
  const month=document.getElementById('rep-month').value;
  const bId=document.getElementById('rep-brand').value;
  return bId+'-'+month;
}

function getRepData(){
  const key=getRepKey();
  const bId=parseInt(document.getElementById('rep-brand').value);
  const month=document.getElementById('rep-month').value;
  const b=BRANDS.find(x=>x.id===bId);
  if(!b)return null;

  // Auto-generate defaults from app data if no manual data yet
  if(!REPORT_DATA[key]){
    const bTasks=TASKS.filter(t=>(t.brandId||t.bId)===bId);
    const done=bTasks.filter(t=>t.stage==='completed').length;
    const scored=bTasks.filter(t=>t.score>0);
    const avgQ=scored.length?(scored.reduce((a,t)=>a+t.score,0)/scored.length).toFixed(1):'0';
    const camps=b.campaigns||[];
    const activeCamps=camps.filter(c=>c.status==='active').length;
    const g7pct=Math.round(b.g7.filter(a=>a.done).length/7*100);
    const meds=[...new Set(camps.flatMap(c=>Array.isArray(c.M)?c.M:[c.M]).filter(Boolean))];

    REPORT_DATA[key]={
      // SMM — overall
      smm_posts:'',smm_reach:'',smm_engagement:'',smm_followers:'',smm_platforms:meds.join(', '),smm_notes:'',
      // SMM — per platform
      li_impressions:'',li_followers:'',li_engagement:'',li_clicks:'',
      ig_reach:'',ig_likes:'',ig_saves:'',ig_story_views:'',ig_followers:'',
      fb_reach:'',fb_reactions:'',fb_shares:'',fb_followers:'',
      // SEO — Google Analytics
      ga_sessions:'',ga_users:'',ga_bounce:'',ga_duration:'',
      // SEO — Google Search Console
      gsc_clicks:'',gsc_impressions:'',gsc_ctr:'',gsc_position:'',
      // SEO — overall
      seo_keywords:'',seo_traffic:'',seo_rankings:'',seo_backlinks:'',seo_notes:'',
      // Brand health
      bh_g7:g7pct,bh_pim:b.pimStatus||b.pimOk?'Approved':'Draft',bh_score:'',bh_notes:'',
      // Campaign
      camp_active:activeCamps,camp_total:camps.length,camp_reach:'',camp_conversions:'',camp_notes:'',
      // Team output
      team_tasks_done:done,team_tasks_open:bTasks.filter(t=>t.stage!=='completed').length,team_quality:avgQ,team_notes:''
    };
  }
  return {key,b,month,d:REPORT_DATA[key]};
}

function saveField(key,field,val){
  if(!REPORT_DATA[key])return;
  REPORT_DATA[key][field]=val;
  persist();
}

function buildReports(){
  const r=getRepData();
  if(!r){document.getElementById('rep-content').innerHTML='<div style="text-align:center;padding:40px;color:var(--text3)">Select a brand to view report</div>';return;}
  const {key,b,month,d}=r;
  const monthLabel=document.getElementById('rep-month').options[document.getElementById('rep-month').selectedIndex].text;

  document.getElementById('rep-content').innerHTML=`
  <!-- Report header -->
  <div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:18px;margin-bottom:14px;display:flex;align-items:center;gap:14px">
    <div style="width:44px;height:44px;border-radius:10px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0">${b.name.substring(0,2).toUpperCase()}</div>
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600">${b.name} &mdash; ${monthLabel}</div>
      <div style="font-size:12px;color:var(--text2);margin-top:2px">${b.industry} &middot; Auto-generated report</div>
    </div>
    <span class="badge bgr">${b.industry}</span>
  </div>

  <!-- Summary row -->
  <div class="stats-row" style="margin-bottom:14px">
    <div class="sc"><div class="sl">G7 completion</div><div class="sv" style="color:${b.color}">${d.bh_g7}%</div><div class="sch neu">Brand health</div></div>
    <div class="sc"><div class="sl">Tasks done</div><div class="sv" style="color:var(--green)">${d.team_tasks_done}</div><div class="sch" style="color:var(--amber)">${d.team_tasks_open} open</div></div>
    <div class="sc"><div class="sl">Avg quality</div><div class="sv" style="color:var(--accent2)">${d.team_quality}<span style="font-size:13px">/5</span></div><div class="sch neu">Reviewed tasks</div></div>
    <div class="sc"><div class="sl">Campaigns</div><div class="sv" style="color:var(--blue)">${d.camp_active}</div><div class="sch neu">${d.camp_total} total</div></div>
  </div>

  <div class="g2" style="margin-bottom:14px">
    <!-- SMM overall -->
    <div class="card">
      <div class="ch"><div class="ct">&#128226; SMM performance</div><div class="ca" onclick="toggleSection('smm-detail-${key}')">Per platform &#9660;</div></div>
      <div class="cb">
        ${repRow(key,'smm_posts','Total posts published',d.smm_posts,'e.g. 12')}
        ${repRow(key,'smm_reach','Combined reach',d.smm_reach,'e.g. 45,000')}
        ${repRow(key,'smm_engagement','Avg engagement rate',d.smm_engagement,'e.g. 4.2%')}
        ${repRow(key,'smm_followers','Net follower growth',d.smm_followers,'e.g. +320')}
        ${repRow(key,'smm_platforms','Platforms used',d.smm_platforms,'e.g. LinkedIn, Instagram')}
        ${repTextarea(key,'smm_notes','Notes / highlights',d.smm_notes)}
      </div>
      <!-- Per-platform breakdown -->
      <div id="smm-detail-${key}" style="display:none;border-top:.5px solid var(--border)">
        <!-- LinkedIn -->
        <div style="padding:12px 15px;border-bottom:.5px solid var(--border)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div style="font-size:12px;font-weight:600;color:var(--blue)">&#128101; LinkedIn Pages</div>
            <label style="font-size:11px;color:var(--accent2);cursor:pointer;display:flex;align-items:center;gap:5px">
              <input type="file" accept=".csv" style="display:none" onchange="importCSV(event,'linkedin','${key}')"/>
              &#8593; Import CSV
            </label>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-bottom:8px;background:var(--bg3);padding:6px 8px;border-radius:var(--rsm)">CSV columns expected: <span style="color:var(--text2);font-family:var(--mono)">Date, Impressions, Followers, Engagement Rate, Clicks</span></div>
          ${repRow(key,'li_impressions','Impressions',d.li_impressions,'e.g. 18,000')}
          ${repRow(key,'li_followers','Follower growth',d.li_followers,'e.g. +145')}
          ${repRow(key,'li_engagement','Engagement rate',d.li_engagement,'e.g. 3.8%')}
          ${repRow(key,'li_clicks','Link clicks',d.li_clicks,'e.g. 420')}
        </div>
        <!-- Instagram -->
        <div style="padding:12px 15px;border-bottom:.5px solid var(--border)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div style="font-size:12px;font-weight:600;color:var(--pk,#f472b6)">&#128247; Instagram Insights</div>
            <label style="font-size:11px;color:var(--accent2);cursor:pointer;display:flex;align-items:center;gap:5px">
              <input type="file" accept=".csv" style="display:none" onchange="importCSV(event,'instagram','${key}')"/>
              &#8593; Import CSV
            </label>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-bottom:8px;background:var(--bg3);padding:6px 8px;border-radius:var(--rsm)">CSV columns expected: <span style="color:var(--text2);font-family:var(--mono)">Date, Reach, Likes, Saves, Story Views, Followers</span></div>
          ${repRow(key,'ig_reach','Reach',d.ig_reach,'e.g. 22,000')}
          ${repRow(key,'ig_likes','Likes',d.ig_likes,'e.g. 1,240')}
          ${repRow(key,'ig_saves','Saves',d.ig_saves,'e.g. 380')}
          ${repRow(key,'ig_story_views','Story views',d.ig_story_views,'e.g. 5,600')}
          ${repRow(key,'ig_followers','Follower growth',d.ig_followers,'e.g. +210')}
        </div>
        <!-- Facebook -->
        <div style="padding:12px 15px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div style="font-size:12px;font-weight:600;color:var(--accent2)">&#128172; Facebook Pages</div>
            <label style="font-size:11px;color:var(--accent2);cursor:pointer;display:flex;align-items:center;gap:5px">
              <input type="file" accept=".csv" style="display:none" onchange="importCSV(event,'facebook','${key}')"/>
              &#8593; Import CSV
            </label>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-bottom:8px;background:var(--bg3);padding:6px 8px;border-radius:var(--rsm)">CSV columns expected: <span style="color:var(--text2);font-family:var(--mono)">Date, Reach, Reactions, Shares, Followers</span></div>
          ${repRow(key,'fb_reach','Reach',d.fb_reach,'e.g. 14,000')}
          ${repRow(key,'fb_reactions','Reactions',d.fb_reactions,'e.g. 890')}
          ${repRow(key,'fb_shares','Shares',d.fb_shares,'e.g. 120')}
          ${repRow(key,'fb_followers','Follower growth',d.fb_followers,'e.g. +75')}
        </div>
      </div>
    </div>
    <!-- SEO -->
    <div class="card">
      <div class="ch"><div class="ct">&#128269; SEO metrics</div><div class="ca" onclick="toggleSection('seo-detail-${key}')">Per tool &#9660;</div></div>
      <div class="cb">
        ${repRow(key,'seo_keywords','Keywords tracked',d.seo_keywords,'e.g. 24')}
        ${repRow(key,'seo_traffic','Organic traffic',d.seo_traffic,'e.g. 8,200')}
        ${repRow(key,'seo_rankings','Top 10 rankings',d.seo_rankings,'e.g. 6')}
        ${repRow(key,'seo_backlinks','New backlinks',d.seo_backlinks,'e.g. 14')}
        ${repTextarea(key,'seo_notes','Notes / highlights',d.seo_notes)}
      </div>
      <!-- Per-tool breakdown -->
      <div id="seo-detail-${key}" style="display:none;border-top:.5px solid var(--border)">
        <!-- Google Analytics -->
        <div style="padding:12px 15px;border-bottom:.5px solid var(--border)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div style="font-size:12px;font-weight:600;color:var(--amber)">&#128200; Google Analytics</div>
            <label style="font-size:11px;color:var(--accent2);cursor:pointer;display:flex;align-items:center;gap:5px">
              <input type="file" accept=".csv" style="display:none" onchange="importCSV(event,'ga','${key}')"/>
              &#8593; Import CSV
            </label>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-bottom:8px;background:var(--bg3);padding:6px 8px;border-radius:var(--rsm)">CSV columns expected: <span style="color:var(--text2);font-family:var(--mono)">Date, Sessions, Users, Bounce Rate, Avg Session Duration</span></div>
          ${repRow(key,'ga_sessions','Sessions',d.ga_sessions,'e.g. 12,400')}
          ${repRow(key,'ga_users','Users',d.ga_users,'e.g. 8,900')}
          ${repRow(key,'ga_bounce','Bounce rate',d.ga_bounce,'e.g. 42%')}
          ${repRow(key,'ga_duration','Avg session duration',d.ga_duration,'e.g. 2m 14s')}
        </div>
        <!-- Google Search Console -->
        <div style="padding:12px 15px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div style="font-size:12px;font-weight:600;color:var(--green)">&#128270; Google Search Console</div>
            <label style="font-size:11px;color:var(--accent2);cursor:pointer;display:flex;align-items:center;gap:5px">
              <input type="file" accept=".csv" style="display:none" onchange="importCSV(event,'gsc','${key}')"/>
              &#8593; Import CSV
            </label>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-bottom:8px;background:var(--bg3);padding:6px 8px;border-radius:var(--rsm)">CSV columns expected: <span style="color:var(--text2);font-family:var(--mono)">Date, Clicks, Impressions, CTR, Avg Position</span></div>
          ${repRow(key,'gsc_clicks','Total clicks',d.gsc_clicks,'e.g. 3,200')}
          ${repRow(key,'gsc_impressions','Total impressions',d.gsc_impressions,'e.g. 84,000')}
          ${repRow(key,'gsc_ctr','Click-through rate',d.gsc_ctr,'e.g. 3.8%')}
          ${repRow(key,'gsc_position','Avg position',d.gsc_position,'e.g. 14.2')}
        </div>
      </div>
    </div>
  </div>

  <div class="g2" style="margin-bottom:14px">
    <!-- Brand health -->
    <div class="card">
      <div class="ch"><div class="ct">&#10024; Brand health</div></div>
      <div class="cb">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:.5px solid var(--border)">
          <span style="font-size:12px;color:var(--text2)">G7 completion</span>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:80px;height:5px;background:var(--bg4);border-radius:3px;overflow:hidden"><div style="height:100%;width:${d.bh_g7}%;background:${b.color};border-radius:3px"></div></div>
            <span style="font-size:12px;font-weight:600;color:${b.color}">${d.bh_g7}%</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:.5px solid var(--border)">
          <span style="font-size:12px;color:var(--text2)">Brand Knowledge</span>
          <span class="badge ${d.bh_pim==='Approved'||d.bh_pim==='approved'?'bg':'ba'}">${d.bh_pim}</span>
        </div>
        ${repRow(key,'bh_score','Brand health score',d.bh_score,'e.g. 78/100')}
        ${repTextarea(key,'bh_notes','Notes',d.bh_notes)}
      </div>
    </div>
    <!-- Campaign performance -->
    <div class="card">
      <div class="ch"><div class="ct">&#127919; Campaign performance</div></div>
      <div class="cb">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:.5px solid var(--border)">
          <span style="font-size:12px;color:var(--text2)">Active campaigns</span>
          <span style="font-size:13px;font-weight:600;color:var(--blue)">${d.camp_active} / ${d.camp_total}</span>
        </div>
        ${repRow(key,'camp_reach','Total campaign reach',d.camp_reach,'e.g. 120,000')}
        ${repRow(key,'camp_conversions','Conversions / leads',d.camp_conversions,'e.g. 340')}
        ${repTextarea(key,'camp_notes','Notes / highlights',d.camp_notes)}
        <div style="margin-top:10px">
          <div style="font-size:11px;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Campaign list</div>
          ${b.campaigns.length?b.campaigns.map(c=>{
            const po=c.po==='organic'?'🌱':c.po==='both'?'⚡':'💰';
            return`<div style="display:flex;align-items:center;gap:7px;padding:5px 0;border-bottom:.5px solid var(--border)"><span style="font-size:11px">${po}</span><div style="flex:1;font-size:12px">${c.name}</div><span class="badge ${c.status==='active'?'bg':c.status==='planning'?'ba':'bgr'}">${c.status}</span></div>`;
          }).join(''):'<div style="font-size:12px;color:var(--text3);padding:6px 0">No campaigns this month</div>'}
        </div>
      </div>
    </div>
  </div>

  <!-- Team output -->
  <div class="card" style="margin-bottom:14px">
    <div class="ch"><div class="ct">&#128202; Content published — ${monthLabel}</div></div>
    <div class="cb">
      ${(()=>{
        const allPieces=[];
        (b.campaigns||[]).forEach((camp,ci)=>{(camp.contentPieces||[]).forEach((p,pi)=>{allPieces.push({p,camp,ci,pi});});});
        const monthPieces=allPieces.filter(({p})=>p.postDate&&p.postDate.startsWith(month));
        const published=allPieces.filter(({p})=>p.publishStatus==='published').length;
        const scheduled=allPieces.filter(({p})=>p.publishStatus==='scheduled').length;
        const ready=allPieces.filter(({p})=>p.publishStatus==='ready'||(p.status==='approved'&&!p.publishStatus)).length;
        const inProd=allPieces.filter(({p})=>p.status==='inprod'||p.status==='review'||p.status==='pending').length;
        const byPlatform={};
        monthPieces.forEach(({p})=>{const pl=p.platform||'Other';if(!byPlatform[pl])byPlatform[pl]={total:0,approved:0,published:0};byPlatform[pl].total++;if(p.status==='approved'||p.publishStatus)byPlatform[pl].approved++;if(p.publishStatus==='published')byPlatform[pl].published++;});
        const PICONS={LinkedIn:'💼',Instagram:'📸',Facebook:'👥',YouTube:'▶️',TikTok:'🎵','Twitter/X':'🐦','SEO/Blog':'📝',Email:'✉️'};
        const platRows=Object.entries(byPlatform).map(([pl,s])=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:.5px solid var(--border)"><span style="font-size:16px">${PICONS[pl]||'📱'}</span><span style="font-size:12px;flex:1">${pl}</span><span style="font-size:11px;color:var(--text3)">${s.total} piece${s.total!==1?'s':''}</span><span class="badge bg" style="font-size:10px">${s.approved} approved</span>${s.published?`<span class="badge" style="background:var(--tbg);color:var(--teal);border:.5px solid rgba(45,212,191,.25);font-size:10px">${s.published} published</span>`:''}</div>`).join('');
        return`
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
          <div style="background:var(--gnbg);border:.5px solid var(--gnb);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:20px;font-weight:700;color:var(--green)">${published}</div><div style="font-size:10px;color:var(--green);margin-top:2px">Published</div></div>
          <div style="background:var(--bbg);border:.5px solid rgba(91,174,247,.35);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:20px;font-weight:700;color:var(--blue)">${scheduled}</div><div style="font-size:10px;color:var(--blue);margin-top:2px">Scheduled</div></div>
          <div style="background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:20px;font-weight:700;color:var(--amber)">${ready}</div><div style="font-size:10px;color:var(--amber);margin-top:2px">Ready to publish</div></div>
          <div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px;text-align:center"><div style="font-size:20px;font-weight:700;color:var(--text2)">${inProd}</div><div style="font-size:10px;color:var(--text3);margin-top:2px">In production</div></div>
        </div>
        ${monthPieces.length?`<div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">By platform — ${monthLabel}</div>${platRows}`:'<div style="font-size:12px;color:var(--text3);padding:4px 0">No pieces with post dates set for this month</div>'}
        ${published?`<div style="margin-top:12px"><div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Published posts</div>${allPieces.filter(({p})=>p.publishStatus==='published').map(({p,camp})=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--border)"><span style="font-size:14px">${PICONS[p.platform]||'📱'}</span><div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500">${p.topic||'Untitled'}</div><div style="font-size:10px;color:var(--text3)">${camp.name}${p.postDate?' · '+p.postDate:''}${p.approvedBy?' · by '+p.approvedBy:''}</div></div><span class="badge bg" style="font-size:10px">✅ Published</span></div>`).join('')}</div>`:''}`;
      })()}
    </div>
  </div>

  <!-- Team output -->
  <div class="card" style="margin-bottom:14px">
    <div class="ch"><div class="ct">&#128101; Team output</div></div>
    <div class="cb">
      <div class="g2">
        <div>
          ${repRow(key,'team_tasks_done','Tasks completed',d.team_tasks_done,'auto')}
          ${repRow(key,'team_tasks_open','Tasks still open',d.team_tasks_open,'auto')}
          ${repRow(key,'team_quality','Avg quality score',d.team_quality,'auto')}
        </div>
        <div>
          ${repTextarea(key,'team_notes','Team notes / blockers',d.team_notes,'Enter any notes...')}
        </div>
      </div>
      <div style="margin-top:12px">
        <div style="font-size:11px;color:var(--text3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Tasks breakdown</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${['todo','inprogress','review','approved','onhold','completed','remark'].map(s=>{
            const cnt=TASKS.filter(t=>(t.brandId||t.bId)===b.id&&t.stage===s).length;
            const sc=STAGES[s];
            return`<div style="background:${sc.bg};border:.5px solid ${sc.border};border-radius:var(--rsm);padding:7px 12px;text-align:center"><div style="font-size:14px;font-weight:600;color:${sc.color}">${cnt}</div><div style="font-size:10px;color:${sc.color};opacity:.8">${sc.label}</div></div>`;
          }).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- ⏱ Time tracking — INTERNAL ONLY -->
  <div class="card" style="margin-bottom:14px;border-color:var(--accent)">
    <div class="ch" style="background:var(--acbg)">
      <div class="ct" style="color:var(--accent2)">⏱ Time investment — ${monthLabel} <span style="font-size:10px;background:var(--ambg);color:var(--amber);border:.5px solid var(--amborder);padding:1px 7px;border-radius:9px;margin-left:6px">Internal only</span></div>
    </div>
    <div class="cb">
      ${(()=>{
        const hrs=getBrandHours(b.id, key);
        if(!hrs.total) return`<div style="text-align:center;padding:20px;color:var(--text3);font-size:12px">No time logged for this month — log time via Brand workspace → ⏱ Time tab</div>`;

        // By member
        const memberRows=Object.entries(hrs.byMember).map(([mid,ms])=>{
          const m=MEMBERS.find(x=>x.id==mid);
          return{name:m?m.name:'Unknown',initials:m?m.initials:'?',color:m?m.color:'var(--text3)',bg:m?m.bg:'var(--bg3)',role:m?roleLabel(m.role):'',ms};
        }).sort((a,z)=>z.ms-a.ms);

        // By activity
        const actRows=Object.entries(hrs.byActivity).sort((a,z)=>z[1]-a[1]);

        return`
        <!-- Total -->
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:.5px solid var(--border);margin-bottom:12px;flex-wrap:wrap">
          <div style="font-size:24px;font-weight:700;color:${b.color}">${fmtMs(hrs.total)}</div>
          <div style="font-size:12px;color:var(--text3)">total invested in ${b.name} this month</div>
        </div>
        <div class="g2" style="margin-bottom:12px">
          <!-- By member -->
          <div>
            <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">By team member</div>
            ${memberRows.map(m=>`
              <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--border)">
                <div style="width:24px;height:24px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;flex-shrink:0">${m.initials}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:11px;font-weight:500">${m.name} <span style="color:var(--text3);font-weight:400">${m.role?'· '+m.role:''}</span></div>
                  <div style="height:3px;background:var(--bg4);border-radius:2px;margin-top:3px;overflow:hidden"><div style="height:100%;width:${hrs.total?Math.round(m.ms/hrs.total*100):0}%;background:${m.color};border-radius:2px"></div></div>
                </div>
                <div style="font-size:12px;font-weight:600;color:${m.color};flex-shrink:0">${fmtMs(m.ms)}</div>
                <div style="font-size:10px;color:var(--text3);flex-shrink:0">${hrs.total?Math.round(m.ms/hrs.total*100):0}%</div>
              </div>`).join('')}
          </div>
          <!-- By activity -->
          <div>
            <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">By activity type</div>
            ${actRows.map(([act,ms])=>`
              <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--border)">
                <div style="flex:1;min-width:0">
                  <div style="font-size:11px;">${act}</div>
                  <div style="height:3px;background:var(--bg4);border-radius:2px;margin-top:3px;overflow:hidden"><div style="height:100%;width:${hrs.total?Math.round(ms/hrs.total*100):0}%;background:var(--accent);border-radius:2px"></div></div>
                </div>
                <div style="font-size:12px;font-weight:600;color:var(--accent2);flex-shrink:0">${fmtMs(ms)}</div>
                <div style="font-size:10px;color:var(--text3);flex-shrink:0">${hrs.total?Math.round(ms/hrs.total*100):0}%</div>
              </div>`).join('')}
          </div>
        </div>
        <!-- Detailed log -->
        <div>
          <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Detailed log entries</div>
          ${(b.timeLogs||[]).filter(tl=>tl.month===key).sort((a,z)=>z.date.localeCompare(a.date)).map(tl=>{
            const m=MEMBERS.find(x=>x.id==tl.memberId);
            const ms=logMinsToMs(tl.hours,tl.minutes);
            return`<div style="display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:.5px solid var(--border);font-size:11px">
              <span style="color:var(--text3);width:80px;flex-shrink:0">${tl.date}</span>
              <span style="font-weight:600;color:var(--accent2);width:55px;flex-shrink:0">${fmtMs(ms)}</span>
              <span style="flex:1">${tl.activity}${tl.notes?' — <span style="color:var(--text3)">'+tl.notes+'</span>':''}</span>
              ${m?`<div style="display:flex;align-items:center;gap:4px;flex-shrink:0"><div style="width:18px;height:18px;border-radius:50%;background:${m.bg};color:${m.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700">${m.initials}</div><span style="color:var(--text3)">${m.name}</span></div>`:''}
            </div>`;
          }).join('')}
          <!-- Specialist tracked time note -->
          <div style="font-size:10px;color:var(--text3);margin-top:8px;padding:6px 8px;background:var(--bg3);border-radius:var(--rsm)">
            ℹ Specialist time is auto-tracked via My Work time tracker. SAM/BM time is manually logged via Brand workspace → ⏱ Time tab.
          </div>
        </div>`;
      })()}
    </div>
  </div>`;
}

function repRow(key,field,label,val,ph){
  return`<div style="display:flex;align-items:center;padding:7px 0;border-bottom:.5px solid var(--border);gap:10px">
    <span style="font-size:12px;color:var(--text2);flex:1">${label}</span>
    <input class="finp" value="${val||''}" placeholder="${ph||''}" oninput="saveField('${key}','${field}',this.value)" style="width:160px;padding:5px 8px;font-size:12px;background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);color:var(--text);outline:none;font-family:var(--font)" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border2)'"/>
  </div>`;
}

function repTextarea(key,field,label,val,ph){
  return`<div style="padding:8px 0">
    <div style="font-size:11px;color:var(--text3);margin-bottom:5px">${label}</div>
    <textarea oninput="saveField('${key}','${field}',this.value)" placeholder="${ph||'Add notes...'}" style="width:100%;background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);padding:8px 10px;color:var(--text);font-family:var(--font);font-size:12px;outline:none;resize:vertical;min-height:58px;line-height:1.5" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border2)'">${val||''}</textarea>
  </div>`;
}

function exportReport(){
  const r=getRepData();
  if(!r){toast('No report to export','var(--amber)');return;}
  const {b,d,key}=r;
  const monthLabel=document.getElementById('rep-month').options[document.getElementById('rep-month').selectedIndex].text;
  const hrs=getBrandHours(b.id,key);

  // Build clean print HTML
  const memberRows=Object.entries(hrs.byMember).map(([mid,ms])=>{
    const m=MEMBERS.find(x=>x.id==mid);
    return`<tr><td>${m?m.name:'Unknown'}</td><td>${m?roleLabel(m.role):''}</td><td>${fmtMs(ms)}</td><td>${hrs.total?Math.round(ms/hrs.total*100):0}%</td></tr>`;
  }).join('');

  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <title>${b.name} — ${monthLabel} Report</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:system-ui,sans-serif;font-size:12px;color:#111;background:#fff;padding:32px;}
    h1{font-size:22px;font-weight:700;margin-bottom:4px;}
    h2{font-size:14px;font-weight:600;margin:20px 0 8px;padding-bottom:4px;border-bottom:2px solid #111;}
    h3{font-size:12px;font-weight:600;margin:12px 0 6px;color:#444;}
    .meta{font-size:11px;color:#666;margin-bottom:24px;}
    .summary{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;}
    .stat{background:#f5f5f5;border-radius:6px;padding:12px;text-align:center;}
    .stat-val{font-size:20px;font-weight:700;color:#111;}
    .stat-lbl{font-size:10px;color:#666;margin-top:2px;text-transform:uppercase;}
    .row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee;font-size:11px;}
    .row span:first-child{color:#444;}
    .row span:last-child{font-weight:500;}
    table{width:100%;border-collapse:collapse;margin-top:6px;}
    th{background:#f0f0f0;padding:6px 8px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.05em;}
    td{padding:6px 8px;border-bottom:1px solid #eee;font-size:11px;}
    .section{margin-bottom:20px;}
    .badge{display:inline-block;padding:2px 8px;border-radius:9px;font-size:10px;background:#e8f5e9;color:#2e7d32;}
    .internal{background:#fff3e0;border:1px solid #ffcc02;border-radius:6px;padding:12px;margin-top:20px;}
    .internal-title{font-size:11px;font-weight:600;color:#e65100;margin-bottom:8px;}
    .prog{height:4px;background:#eee;border-radius:2px;overflow:hidden;margin-top:3px;}
    .prog-fill{height:100%;background:#7c6af7;border-radius:2px;}
    @media print{body{padding:16px;}@page{margin:16mm;}}
  </style></head><body>

  <!-- Header -->
  <h1>${b.name}</h1>
  <div class="meta">${monthLabel} · ${b.industry} · Generated ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>

  <!-- Summary stats -->
  <div class="summary">
    <div class="stat"><div class="stat-val" style="color:${b.color}">${d.bh_g7}%</div><div class="stat-lbl">G7 completion</div></div>
    <div class="stat"><div class="stat-val" style="color:#2e7d32">${d.team_tasks_done}</div><div class="stat-lbl">Tasks done</div></div>
    <div class="stat"><div class="stat-val">${d.team_quality}<span style="font-size:12px">/5</span></div><div class="stat-lbl">Avg quality</div></div>
    <div class="stat"><div class="stat-val" style="color:#1565c0">${d.camp_active}</div><div class="stat-lbl">Active campaigns</div></div>
  </div>

  <!-- SMM -->
  <h2>📣 SMM Performance</h2>
  <div class="section">
    <div class="row"><span>Posts published</span><span>${d.smm_posts||'—'}</span></div>
    <div class="row"><span>Total reach</span><span>${d.smm_reach||'—'}</span></div>
    <div class="row"><span>Avg engagement rate</span><span>${d.smm_engagement||'—'}</span></div>
    <div class="row"><span>Follower growth</span><span>${d.smm_followers||'—'}</span></div>
    <div class="row"><span>Platforms</span><span>${d.smm_platforms||'—'}</span></div>
    ${d.smm_notes?`<div style="margin-top:8px;padding:8px;background:#f9f9f9;border-radius:4px;font-size:11px;color:#444">${d.smm_notes}</div>`:''}
  </div>

  <!-- SEO -->
  <h2>🔍 SEO Metrics</h2>
  <div class="section">
    <div class="row"><span>Keywords tracked</span><span>${d.seo_keywords||'—'}</span></div>
    <div class="row"><span>Organic traffic</span><span>${d.seo_traffic||'—'}</span></div>
    <div class="row"><span>Top 10 rankings</span><span>${d.seo_rankings||'—'}</span></div>
    <div class="row"><span>New backlinks</span><span>${d.seo_backlinks||'—'}</span></div>
    ${d.seo_notes?`<div style="margin-top:8px;padding:8px;background:#f9f9f9;border-radius:4px;font-size:11px;color:#444">${d.seo_notes}</div>`:''}
  </div>

  <!-- Brand health + Campaigns -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div>
      <h2>✨ Brand Health</h2>
      <div class="row"><span>G7 completion</span><span>${d.bh_g7}%</span></div>
      <div class="row"><span>Brand Knowledge</span><span class="badge">${d.bh_pim}</span></div>
      <div class="row"><span>Brand health score</span><span>${d.bh_score||'—'}</span></div>
    </div>
    <div>
      <h2>🎯 Campaigns</h2>
      <div class="row"><span>Active campaigns</span><span>${d.camp_active} / ${d.camp_total}</span></div>
      <div class="row"><span>Campaign reach</span><span>${d.camp_reach||'—'}</span></div>
      <div class="row"><span>Conversions / leads</span><span>${d.camp_conversions||'—'}</span></div>
    </div>
  </div>

  <!-- Team output -->
  <!-- Content published -->
  ${(()=>{
    const allPieces=[];
    (b.campaigns||[]).forEach(camp=>{(camp.contentPieces||[]).forEach(p=>{allPieces.push({p,camp});});});
    const published=allPieces.filter(({p})=>p.publishStatus==='published');
    const scheduled=allPieces.filter(({p})=>p.publishStatus==='scheduled').length;
    const ready=allPieces.filter(({p})=>p.publishStatus==='ready'||(p.status==='approved'&&!p.publishStatus)).length;
    return`<h2>📊 Content Published</h2>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">
      <div class="stat"><div class="stat-val" style="color:#2e7d32">${published.length}</div><div class="stat-lbl">Published</div></div>
      <div class="stat"><div class="stat-val" style="color:#1565c0">${scheduled}</div><div class="stat-lbl">Scheduled</div></div>
      <div class="stat"><div class="stat-val" style="color:#e65100">${ready}</div><div class="stat-lbl">Ready</div></div>
      <div class="stat"><div class="stat-val">${allPieces.length}</div><div class="stat-lbl">Total pieces</div></div>
    </div>
    ${published.length?`<table><thead><tr><th>Platform</th><th>Topic</th><th>Campaign</th><th>Post date</th><th>Approved by</th></tr></thead><tbody>
    ${published.map(({p,camp})=>`<tr><td>${p.platform||'—'}</td><td>${p.topic||'—'}</td><td>${camp.name}</td><td>${p.postDate||'—'}</td><td>${p.approvedBy||'—'}</td></tr>`).join('')}
    </tbody></table>`:'<div style="color:#666;font-size:11px">No published posts yet</div>'}`;
  })()}

  <!-- Team output -->
  <h2>👥 Team Output</h2>
  <div class="section">
    <div class="row"><span>Tasks completed</span><span>${d.team_tasks_done}</span></div>
    <div class="row"><span>Tasks open</span><span>${d.team_tasks_open}</span></div>
    <div class="row"><span>Avg quality score</span><span>${d.team_quality}/5</span></div>
    ${d.team_notes?`<div style="margin-top:8px;padding:8px;background:#f9f9f9;border-radius:4px;font-size:11px;color:#444">${d.team_notes}</div>`:''}
  </div>

  <!-- Time investment — internal only -->
  ${hrs.total?`<div class="internal">
    <div class="internal-title">⏱ Time Investment — INTERNAL ONLY (not for client)</div>
    <div class="row"><span>Total hours this month</span><span style="font-weight:700;font-size:14px">${fmtMs(hrs.total)}</span></div>
    ${memberRows?`<h3>By team member</h3><table><thead><tr><th>Name</th><th>Role</th><th>Hours</th><th>%</th></tr></thead><tbody>${memberRows}</tbody></table>`:''}
  </div>`:''}

  <div style="margin-top:32px;padding-top:12px;border-top:1px solid #eee;font-size:10px;color:#aaa;text-align:center">
    Generated by MarketingOS · ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})} · Confidential
  </div>
  <script>window.onload=function(){window.print();}<\/script>
  </body></html>`;

  const win=window.open('','_blank');
  if(!win){toast('⚠ Allow popups to export PDF','var(--amber)');return;}
  win.document.write(html);
  win.document.close();
  toast('📄 Report opened — use browser Print → Save as PDF','var(--green)');
}

// ══════════════════════════════════════════
// OWNER — MY ASSETS + MY BRAND (read-only with remarks)
// ══════════════════════════════════════════

function ownerBrand(){
  if(!CU) return null;
  // Primary: brand whose clientMemberId or coOwnerId points at CU
  let b = BRANDS.find(x => x.clientMemberId === CU.id || x.coOwnerId === CU.id);
  if(b) return b;
  // Fallback: first non-archived brand in CU.brands
  if(Array.isArray(CU.brands) && CU.brands.length){
    b = CU.brands.map(id => BRANDS.find(x => x.id === id)).find(Boolean);
    if(b) return b;
  }
  // Last resort: first non-archived brand (safety net so the screen never crashes)
  return BRANDS.find(x => !x.archived) || null;
}

function escHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function fmtRemarkDate(iso){
  if(!iso) return '';
  try { return new Date(iso).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }
  catch(e){ return iso; }
}

function ensureRemarkShape(b){
  if(!b) return;
  if(!Array.isArray(b.assets)) b.assets=[];
  b.assets.forEach(a=>{ if(!Array.isArray(a.remarks)) a.remarks=[]; });
  if(!b.brandRemarks || typeof b.brandRemarks!=='object'){
    b.brandRemarks = { name:[], color:[], logo:[], description:[], industry:[], overall:[], overview:[], guidelines:[], toneOfVoice:[], positioning:[] };
  } else {
    ['name','color','logo','description','industry','overall','overview','guidelines','toneOfVoice','positioning']
      .forEach(k => { if(!Array.isArray(b.brandRemarks[k])) b.brandRemarks[k]=[]; });
  }
}

function refreshMyAssetsBadge(){
  const badge = document.getElementById('nb-myassets');
  if(!badge) return;
  const b = ownerBrand();
  const n = b && Array.isArray(b.assets) ? b.assets.length : 0;
  if(n>0){ badge.textContent = n; badge.style.display=''; }
  else { badge.style.display='none'; }
}

// ── BUILD MY ASSETS ────────────────────────
function buildMyAssets(){
  const root = document.getElementById('myassets-body');
  if(!root) return;
  const b = ownerBrand();
  if(!b){
    root.innerHTML = `<div class="empty-state"><div class="empty-state-icon">◈</div><div class="empty-state-title">No brand assigned yet</div><div class="empty-state-sub">An admin will assign you a brand workspace shortly.</div></div>`;
    return;
  }
  ensureRemarkShape(b);

  const q = (window._myAssetsSearch||'').toLowerCase().trim();
  const cat = window._myAssetsCat || 'All';
  const categories = ['All', 'Brand Backbone', ...(LOOKUPS.formats||[]), 'Other'].filter((v,i,a)=>a.indexOf(v)===i);

  let assets = b.assets.slice();
  if(cat !== 'All') assets = assets.filter(a => a.category === cat);
  if(q) assets = assets.filter(a => (a.name||'').toLowerCase().includes(q) || (a.desc||'').toLowerCase().includes(q));

  const header = `
    <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:18px;flex-wrap:wrap">
      <div style="width:44px;height:44px;border-radius:10px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;flex-shrink:0">${b.name.charAt(0)}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:20px;font-weight:700;letter-spacing:-.02em">${escHtml(b.name)} — Assets</div>
        <div style="font-size:12px;color:var(--text3);margin-top:2px">Assets uploaded by your account team · view-only · leave remarks on anything that needs changes</div>
      </div>
      <span class="badge bp">🔒 Read-only</span>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <input class="sinp" id="myassets-search" placeholder="🔍 Search assets..." style="flex:1;min-width:200px" oninput="window._myAssetsSearch=this.value;buildMyAssets()" value="${escHtml(window._myAssetsSearch||'')}"/>
    </div>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px">
      ${categories.map(c=>{
        const count = c==='All' ? b.assets.length : b.assets.filter(x=>x.category===c).length;
        const active = cat === c;
        const safeCat = String(c).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
        return `<button onclick="window._myAssetsCat='${safeCat}';buildMyAssets()" style="padding:5px 12px;border-radius:14px;font-size:11px;font-weight:500;cursor:pointer;background:${active?'var(--accent)':'var(--bg3)'};color:${active?'#fff':'var(--text2)'};border:.5px solid ${active?'var(--acb)':'var(--border)'}">${escHtml(c)} <span style="opacity:.6">(${count})</span></button>`;
      }).join('')}
    </div>`;

  const gridHtml = assets.length ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px">${assets.map(asset => renderMyAssetCard(b, asset)).join('')}</div>`
    : `<div class="empty-state"><div class="empty-state-icon">📁</div><div class="empty-state-title">${q||cat!=='All' ? 'No assets match' : 'No assets yet'}</div><div class="empty-state-sub">${q||cat!=='All' ? 'Try clearing the search or category filter.' : 'Once your account team uploads brand files, they\'ll show up here.'}</div></div>`;

  root.innerHTML = header + gridHtml;
}

function renderMyAssetCard(b, asset){
  const realIdx = b.assets.indexOf(asset);
  const ext = (asset.ext||asset.name||'').split('.').pop().toLowerCase();
  const isLink = !!asset.url;
  const icon = isLink?'🔗':['png','jpg','jpeg','gif','webp','svg'].includes(ext)?'🖼':['pdf'].includes(ext)?'📕':['doc','docx'].includes(ext)?'📄':['ppt','pptx'].includes(ext)?'📊':['xls','xlsx','csv'].includes(ext)?'📊':['mp4','mov','avi'].includes(ext)?'🎬':['zip','rar'].includes(ext)?'🗜':'📎';
  const accentColor = ext==='pdf'?'#e55':/doc|docx/.test(ext)?'#4a9eff':/ppt|pptx/.test(ext)?'#f5a623':/xls|xlsx|csv/.test(ext)?'#4eca8b':/mp4|mov/.test(ext)?'#b060ff':asset.category==='Brand Backbone'?'var(--accent)':'var(--text3)';
  const uploader = asset.uploadedBy ? MEMBERS.find(m => m.id == asset.uploadedBy) : null;
  const remarks = Array.isArray(asset.remarks) ? asset.remarks : [];
  const editing = window._myAssetRemarkEditing === realIdx;
  const downloadOrOpen = isLink
    ? `<a href="${escHtml(asset.url)}" target="_blank" rel="noopener" class="btn btn-s" style="flex:1;text-align:center;font-size:11px;padding:6px">🔗 Open</a>`
    : `<button class="btn btn-s" style="flex:1;font-size:11px;padding:6px" onclick="downloadAsset(${b.id},${realIdx})">⬇ Download</button>`;

  return `<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column">
    <div style="height:96px;display:flex;align-items:center;justify-content:center;font-size:38px;background:${accentColor}12;border-bottom:.5px solid var(--border)">${icon}</div>
    <div style="padding:12px 14px;flex:1;display:flex;flex-direction:column;gap:6px">
      <div style="font-size:13px;font-weight:600;line-height:1.3;word-break:break-word">${escHtml(asset.name||'Untitled')}</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;font-size:10px;color:var(--text3)">
        ${asset.category?`<span class="badge bgr">${escHtml(asset.category)}</span>`:''}
        ${asset.size?`<span>📦 ${escHtml(asset.size)}</span>`:''}
        ${asset.date?`<span>📅 ${escHtml(asset.date)}</span>`:''}
      </div>
      ${uploader ? `<div style="font-size:10px;color:var(--text3)">👤 ${escHtml(uploader.name)}</div>` : ''}
      ${asset.desc ? `<div style="font-size:11px;color:var(--text2);line-height:1.5">${escHtml(asset.desc)}</div>` : ''}
      ${remarks.length ? `<div style="margin-top:6px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:8px 10px;display:flex;flex-direction:column;gap:6px">
        ${remarks.map(r => `<div style="font-size:11px;line-height:1.45;color:var(--text)"><span style="font-weight:600;color:var(--amber)">💬 ${escHtml(r.author||'Owner')}</span><span style="color:var(--text3);margin:0 6px">·</span><span style="color:var(--text3)">${escHtml(fmtRemarkDate(r.at))}</span><div style="margin-top:3px">${escHtml(r.text)}</div></div>`).join('')}
      </div>` : ''}
      ${editing ? `<div style="margin-top:6px;background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);padding:10px;display:flex;flex-direction:column;gap:8px">
        <textarea id="myassets-remark-input-${realIdx}" class="ftxt" style="min-height:60px;font-size:12px" placeholder="Tell the account team what needs to change…" autofocus></textarea>
        <div style="display:flex;gap:6px;justify-content:flex-end">
          <button class="btn btn-s" style="font-size:11px;padding:5px 10px" onclick="cancelMyAssetRemark()">Cancel</button>
          <button class="btn btn-p" style="font-size:11px;padding:5px 10px" onclick="submitMyAssetRemark(${b.id},${realIdx})">Submit remark</button>
        </div>
      </div>` : ''}
      <div style="display:flex;gap:6px;margin-top:auto;padding-top:8px">
        ${downloadOrOpen}
        ${editing?'':`<button class="btn btn-s" style="font-size:11px;padding:6px 10px;background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="openMyAssetRemark(${realIdx})">💬 ${remarks.length?'Add another':'Add remark'}</button>`}
      </div>
    </div>
  </div>`;
}

function openMyAssetRemark(idx){ window._myAssetRemarkEditing = idx; buildMyAssets(); setTimeout(()=>{ const el=document.getElementById('myassets-remark-input-'+idx); if(el) el.focus(); },0); }
function cancelMyAssetRemark(){ window._myAssetRemarkEditing = null; buildMyAssets(); }
function submitMyAssetRemark(bid, idx){
  const el = document.getElementById('myassets-remark-input-'+idx);
  const text = (el && el.value || '').trim();
  if(!text){ toast('Remark cannot be empty','var(--amber)'); return; }
  const b = BRANDS.find(x => x.id === bid);
  if(!b || !b.assets || !b.assets[idx]) return;
  if(!Array.isArray(b.assets[idx].remarks)) b.assets[idx].remarks = [];
  b.assets[idx].remarks.push({
    author: CU ? CU.name : 'Owner',
    authorId: CU ? CU.id : null,
    text,
    at: new Date().toISOString()
  });
  window._myAssetRemarkEditing = null;
  persist();
  buildMyAssets();
  toast('✓ Remark added','var(--green)');
  // Cross-update: SAM's brand workspace assets view if open
  if(typeof buildWsAssets === 'function' && CAssetBid === b.id) buildWsAssets(b);
}

// ── BUILD MY BRAND ────────────────────────
function buildMyBrand(){
  const root = document.getElementById('mybrand-body');
  if(!root) return;
  const b = ownerBrand();
  if(!b){
    root.innerHTML = `<div class="empty-state"><div class="empty-state-icon">◈</div><div class="empty-state-title">No brand assigned yet</div><div class="empty-state-sub">An admin will assign you a brand workspace shortly.</div></div>`;
    return;
  }
  ensureRemarkShape(b);

  const lastUpdated = b.updatedAt || b.lastUpdated || '';
  const bk = b.brandKnowledge || {};
  const bkLabels = { overview:'Brand Overview', guidelines:'Guidelines & Principles', toneOfVoice:'Tone of Voice', positioning:'Positioning' };
  const bkStatus = (b.pimStatus==='client-approved'||b.pimStatus==='approved')?'Approved':'Draft';

  // Workspace stats (mirrors SAM's buildWsOverview top row)
  const today = new Date().toISOString().split('T')[0];
  const openTasks = TASKS.filter(t => t.brandId === b.id && !['completed','approved'].includes(t.stage)).length;
  const delayedTasks = TASKS.filter(t => t.brandId === b.id && !['completed','approved'].includes(t.stage) && t.due && t.due < today).length;
  const activeCampaigns = (b.campaigns||[]).filter(c => c.status === 'active').length;

  const header = `
    <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:20px;flex-wrap:wrap">
      <div style="width:64px;height:64px;border-radius:14px;background:${b.color}22;color:${b.color};display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;flex-shrink:0">${b.name.charAt(0)}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:22px;font-weight:700;letter-spacing:-.02em">${escHtml(b.name)}</div>
        <div style="font-size:12px;color:var(--text3);margin-top:2px">Your brand workspace · view-only · leave remarks on anything that needs changes</div>
        ${lastUpdated?`<div style="font-size:11px;color:var(--text3);margin-top:4px">Last updated ${escHtml(fmtRemarkDate(lastUpdated))}</div>`:''}
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="badge bp">🔒 Read-only</span>
        <button class="btn btn-s" style="font-size:11px;padding:6px 12px;background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="openMyBrandRemark('overall')">💬 Add overall remark</button>
      </div>
    </div>`;

  // Stats row + any pending overall-remark editor / list
  const overallRemarks = (b.brandRemarks?.overall || []);
  const overviewCard = `
    <div class="g4" style="margin-bottom:14px">
      <div class="sc"><div class="sl">Active campaigns</div><div class="sv" style="color:${b.color}">${activeCampaigns}</div></div>
      <div class="sc"><div class="sl">Open tasks</div><div class="sv" style="color:${b.color}">${openTasks}</div></div>
      <div class="sc"><div class="sl">Delayed tasks</div><div class="sv" style="color:${delayedTasks>0?'var(--red)':b.color}">${delayedTasks}</div></div>
      <div class="sc"><div class="sl">Brand Knowledge</div><div class="sv" style="font-size:14px;color:${bkStatus==='Approved'?'var(--green)':'var(--amber)'}">${bkStatus}</div></div>
    </div>
    ${overallRemarks.length ? `<div class="card" style="margin-bottom:14px;border-color:var(--amborder)">
      <div class="ch" style="background:var(--ambg)"><div class="ct" style="color:var(--amber)">💬 Your overall remarks (${overallRemarks.length})</div></div>
      <div class="cb">${renderSectionRemarks(b, 'overall')}</div>
    </div>` : ''}
    ${renderRemarkEditor(b, 'overall')}`;

  const bkCard = `
    <div class="card">
      <div class="ch"><div class="ct">📖 Brand Knowledge</div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="badge ${bkStatus==='Approved'?'bg':'ba'}">${bkStatus}</span>
          ${b.pimStatus==='approved' && b.pimStatus!=='client-approved' ? `<button class="btn btn-p" style="font-size:11px;padding:5px 10px" onclick="clientApprovePIM(${b.id})">✓ Approve as client</button>` : ''}
        </div>
      </div>
      <div class="cb" style="display:flex;flex-direction:column;gap:14px">
        ${['overview','guidelines','toneOfVoice','positioning'].map(k => {
          const v = bk[k] || '';
          return `<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:14px 16px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div style="font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text2)">${escHtml(bkLabels[k])} <span style="margin-left:6px;font-size:10px;color:var(--text3)">🔒</span></div>
              <button class="btn btn-s" style="font-size:10px;padding:3px 9px;background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="openMyBrandRemark('${k}')">💬 Remark</button>
            </div>
            <div style="font-size:13px;color:${v?'var(--text)':'var(--text3)'};line-height:1.55;white-space:pre-wrap;${v?'':'font-style:italic'}">${v?escHtml(v):'Not filled yet by your account team.'}</div>
            ${renderSectionRemarks(b, k)}
            ${renderRemarkEditor(b, k)}
          </div>`;
        }).join('')}
      </div>
    </div>`;

  root.innerHTML = header + overviewCard + bkCard;
}

function renderMyBrandRow(b, s){
  const editing = window._myBrandRemarkEditing === s.key;
  let display;
  if(s.isColor){
    display = `<div style="display:flex;align-items:center;gap:10px"><div style="width:32px;height:32px;border-radius:8px;background:${s.value};border:.5px solid var(--border2)"></div><span style="font-family:var(--mono);font-size:13px;color:var(--text2)">${escHtml(s.value||'—')}</span></div>`;
  } else if(s.isLogo){
    display = s.value
      ? `<img src="${escHtml(s.value)}" alt="${escHtml(b.name)} logo" style="max-height:48px;max-width:140px;border-radius:6px;background:var(--bg3);padding:4px;object-fit:contain"/>`
      : `<div style="font-size:13px;color:var(--text3);font-style:italic">No logo uploaded</div>`;
  } else {
    display = `<div style="font-size:13px;color:${s.value?'var(--text)':'var(--text3)'};line-height:1.55;white-space:pre-wrap;${s.value?'':'font-style:italic'}">${s.value?escHtml(s.value):'Not set'}</div>`;
  }
  return `<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:12px 14px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
      <div style="font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text2)">${escHtml(s.label)} <span style="margin-left:6px;font-size:10px;color:var(--text3)">🔒</span></div>
      <button class="btn btn-s" style="font-size:10px;padding:3px 9px;background:var(--ambg);border-color:var(--amborder);color:var(--amber)" onclick="openMyBrandRemark('${s.key}')">💬</button>
    </div>
    ${display}
    ${renderSectionRemarks(b, s.key)}
    ${renderRemarkEditor(b, s.key)}
  </div>`;
}

function renderSectionRemarks(b, section){
  const list = (b.brandRemarks && b.brandRemarks[section]) || [];
  if(!list.length) return '';
  return `<div style="margin-top:10px;background:var(--ambg);border:.5px solid var(--amborder);border-radius:var(--rsm);padding:8px 10px;display:flex;flex-direction:column;gap:6px">
    ${list.map(r => `<div style="font-size:11px;line-height:1.45;color:var(--text)">
      <span style="font-weight:600;color:var(--amber)">💬 ${escHtml(r.author||'Owner')}</span>
      <span style="color:var(--text3);margin:0 6px">·</span>
      <span style="color:var(--text3)">${escHtml(fmtRemarkDate(r.at))}</span>
      <div style="margin-top:3px">${escHtml(r.text)}</div>
    </div>`).join('')}
  </div>`;
}

function renderRemarkEditor(b, section){
  if(window._myBrandRemarkEditing !== section) return '';
  return `<div style="margin-top:10px;background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);padding:10px;display:flex;flex-direction:column;gap:8px">
    <textarea id="mybrand-remark-input-${section}" class="ftxt" style="min-height:60px;font-size:12px" placeholder="Tell the account team what needs to change…" autofocus></textarea>
    <div style="display:flex;gap:6px;justify-content:flex-end">
      <button class="btn btn-s" style="font-size:11px;padding:5px 10px" onclick="cancelMyBrandRemark()">Cancel</button>
      <button class="btn btn-p" style="font-size:11px;padding:5px 10px" onclick="submitMyBrandRemark(${b.id},'${section}')">Submit remark</button>
    </div>
  </div>`;
}

function openMyBrandRemark(section){ window._myBrandRemarkEditing = section; buildMyBrand(); setTimeout(()=>{ const el=document.getElementById('mybrand-remark-input-'+section); if(el) el.focus(); },0); }
function cancelMyBrandRemark(){ window._myBrandRemarkEditing = null; buildMyBrand(); }
function submitMyBrandRemark(bid, section){
  const el = document.getElementById('mybrand-remark-input-'+section);
  const text = (el && el.value || '').trim();
  if(!text){ toast('Remark cannot be empty','var(--amber)'); return; }
  const b = BRANDS.find(x => x.id === bid);
  if(!b) return;
  ensureRemarkShape(b);
  b.brandRemarks[section].push({
    author: CU ? CU.name : 'Owner',
    authorId: CU ? CU.id : null,
    text,
    at: new Date().toISOString()
  });
  window._myBrandRemarkEditing = null;
  persist();
  buildMyBrand();
  toast('✓ Remark added','var(--green)');
  // Cross-update: SAM's brand workspace if open
  if(typeof buildWsPIM === 'function' && CBid === b.id) buildWsPIM(b);
  if(typeof buildWsOverview === 'function' && CBid === b.id) buildWsOverview(b);
}

// ══════════════════════════════════════════
// PROMPT REPOSITORY
// ══════════════════════════════════════════
const PROMPT_PREVIEW_THRESHOLD = 200;

function relativeTime(iso){
  if(!iso) return '';
  const t = new Date(iso).getTime();
  if(isNaN(t)) return '';
  const diff = Date.now() - t;
  const min = 60*1000, hr = 60*min, day = 24*hr;
  if(diff < min) return 'just now';
  if(diff < hr)  return Math.floor(diff/min) + 'm ago';
  if(diff < day) return Math.floor(diff/hr)  + 'h ago';
  if(diff < 30*day) return Math.floor(diff/day) + 'd ago';
  return new Date(iso).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
}

function findCategory(catId){ return PROMPT_CATEGORIES.find(c => c.id === catId); }

function filteredPrompts(){
  const q = (CPromptSearch||'').toLowerCase().trim();
  return PROMPTS.filter(p => {
    if(CPromptCat !== 'all' && p.categoryId !== CPromptCat) return false;
    if(!q) return true;
    return ['title','description','content'].some(k => (p[k]||'').toLowerCase().includes(q))
      || (Array.isArray(p.tags) && p.tags.some(t => (t||'').toLowerCase().includes(q)));
  });
}

function buildPrompts(){
  const headerEl  = document.getElementById('prompts-header');
  const toolbarEl = document.getElementById('prompts-toolbar');
  const gridEl    = document.getElementById('prompts-grid');
  if(!headerEl || !toolbarEl || !gridEl) return;

  const isAdmin = isSuperAdmin(CU);
  const total = PROMPTS.length;

  headerEl.innerHTML = `
    <div>
      <div style="font-size:20px;font-weight:700;letter-spacing:-.02em">💡 Prompt Repository</div>
      <div style="font-size:12px;color:var(--text3);margin-top:2px">${total} prompt${total===1?'':'s'} · shared across your workspace · all roles can contribute</div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${isAdmin?`<button class="tbtn" onclick="openCategoryManager()">⚙ Manage categories</button>`:''}
      <button class="tbtn p" onclick="openAddPrompt()">+ Add prompt</button>
    </div>`;

  // Category tabs
  const counts = { all: PROMPTS.length };
  PROMPT_CATEGORIES.forEach(c => { counts[c.id] = PROMPTS.filter(p => p.categoryId === c.id).length; });

  const chips = [{ id:'all', icon:'🗂', name:'All' }, ...PROMPT_CATEGORIES].map(c => {
    const active = CPromptCat === c.id;
    return `<button onclick="setPromptCat('${c.id}')" style="padding:6px 12px;border-radius:16px;font-size:12px;font-weight:500;cursor:pointer;background:${active?'var(--accent)':'var(--bg3)'};color:${active?'#fff':'var(--text2)'};border:.5px solid ${active?'var(--acb)':'var(--border)'};display:inline-flex;align-items:center;gap:6px">${c.icon||''} ${escHtml(c.name)} <span style="opacity:.7;font-size:10px;font-weight:600">${counts[c.id]||0}</span></button>`;
  }).join('');

  toolbarEl.innerHTML = `
    <div style="display:flex;gap:6px;flex-wrap:wrap">${chips}</div>
    <div style="position:relative;max-width:520px">
      <input class="sinp" id="prompts-search" style="width:100%;padding-left:34px" placeholder="Search by title, description, content or tag…" value="${escHtml(CPromptSearch||'')}" oninput="onPromptSearch(this.value)"/>
      <span style="position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--text3);pointer-events:none">🔍</span>
    </div>`;

  const list = filteredPrompts();
  if(list.length === 0){
    const emptyMsg = CPromptSearch
      ? { title: 'No prompts match your search.', sub: 'Try a different keyword or clear the search.' }
      : CPromptCat !== 'all'
        ? { title: 'No prompts in this category yet.', sub: 'Click "+ Add prompt" to seed it.' }
        : { title: 'No prompts yet. Be the first to add one! 🚀', sub: 'Share a useful prompt with your team.' };
    gridEl.innerHTML = `<div class="empty-state"><div class="empty-state-icon">💡</div><div class="empty-state-title">${emptyMsg.title}</div><div class="empty-state-sub">${emptyMsg.sub}</div></div>`;
  } else {
    gridEl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">${list.map(p => renderPromptCard(p)).join('')}</div>`;
  }

  // Update sidebar badge
  const badge = document.getElementById('nb-prompts');
  if(badge){ badge.textContent = PROMPTS.length; badge.style.display = PROMPTS.length ? '' : 'none'; }
}

function renderPromptCard(p){
  const cat = findCategory(p.categoryId) || { icon:'🗂', name:'Uncategorized' };
  const creator = MEMBERS.find(m => m.id == p.createdBy);
  const initials = creator ? (creator.initials || creator.name?.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()) : '••';
  const tags = Array.isArray(p.tags) ? p.tags.slice(0,3) : [];
  const overflow = (p.tags||[]).length - tags.length;
  const isLong = (p.content||'').length > PROMPT_PREVIEW_THRESHOLD;
  const hasAttachments = Array.isArray(p.attachments) && p.attachments.length > 0;
  const showAsView = isLong || hasAttachments;
  const isOwnerOfPrompt = CU && p.createdBy && CU.id == p.createdBy;
  const preview = (p.content||'').slice(0, 100);
  const previewSuffix = (p.content||'').length > 100 ? '…' : '';

  return `<div style="background:var(--bg2);border:.5px solid var(--border);border-radius:var(--r);padding:14px 16px;display:flex;flex-direction:column;gap:8px;transition:border-color .15s,transform .15s;cursor:default" onmouseover="this.style.borderColor='var(--border2)';this.style.transform='translateY(-1px)'" onmouseout="this.style.borderColor='var(--border)';this.style.transform='translateY(0)'">
    <div style="display:flex;align-items:flex-start;gap:8px;justify-content:space-between">
      <span class="badge bgr" style="display:inline-flex;align-items:center;gap:4px">${cat.icon} ${escHtml(cat.name)}</span>
      <span style="font-size:10px;color:var(--text3)">${escHtml(relativeTime(p.createdAt))}</span>
    </div>
    <div style="font-size:14px;font-weight:600;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${escHtml(p.title)}</div>
    ${p.description?`<div style="font-size:12px;color:var(--text2);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${escHtml(p.description)}</div>`:''}
    <div style="font-family:var(--mono);font-size:11px;color:var(--text3);background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px 10px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${escHtml(preview)}${previewSuffix}</div>
    ${tags.length?`<div style="display:flex;flex-wrap:wrap;gap:4px">${tags.map(t=>`<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:var(--bg3);border:.5px solid var(--border);color:var(--text2)">#${escHtml(t)}</span>`).join('')}${overflow>0?`<span style="font-size:10px;padding:2px 6px;color:var(--text3)">+${overflow}</span>`:''}</div>`:''}
    ${(Array.isArray(p.attachments)&&p.attachments.length)?`<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center">
      <span style="font-size:10px;color:var(--text3);font-weight:600">📎 ${p.attachments.length}</span>
      ${p.attachments.slice(0,3).map(a=>`<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:var(--bg3);border:.5px solid var(--border);color:var(--text2);display:inline-flex;align-items:center;gap:3px;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escHtml(a.name||'')}">${attachIcon(a.name||a.mime_type)} ${escHtml((a.name||'').slice(0,18))}${(a.name||'').length>18?'…':''}</span>`).join('')}
      ${p.attachments.length>3?`<span style="font-size:10px;color:var(--text3)">+${p.attachments.length-3}</span>`:''}
    </div>`:''}
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:4px">
      <div style="display:flex;align-items:center;gap:6px;min-width:0">
        <div class="uav" style="width:22px;height:22px;font-size:9px;background:${creator?.bg||'var(--acbg)'};color:${creator?.color||'var(--accent2)'};flex-shrink:0">${initials}</div>
        <span style="font-size:11px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(creator?.name || 'Unknown')}</span>
      </div>
      <div style="display:flex;gap:4px;flex-shrink:0">
        <button class="tbtn" style="font-size:11px;padding:4px 10px" title="${showAsView?'View full prompt':'Copy to clipboard'}" onclick="handlePromptCopy('${p.id}')">${showAsView?'👁 View':'📋 Copy'}</button>
        ${isOwnerOfPrompt?`<button class="tbtn" style="font-size:11px;padding:4px 8px" title="Edit" onclick="openEditPrompt('${p.id}')">✎</button>`:''}
        ${isOwnerOfPrompt?`<button class="tbtn d" style="font-size:11px;padding:4px 8px" title="Delete" onclick="openDeletePrompt('${p.id}')">🗑</button>`:''}
      </div>
    </div>
  </div>`;
}

function setPromptCat(catId){ CPromptCat = catId; buildPrompts(); }

function onPromptSearch(value){
  clearTimeout(_promptSearchTimer);
  _promptSearchTimer = setTimeout(() => {
    CPromptSearch = value;
    buildPrompts();
    // Keep input focused after redraw
    const el = document.getElementById('prompts-search');
    if(el){ el.focus(); el.setSelectionRange(value.length, value.length); }
  }, 300);
}

// ── Copy / View flow ──────────────────────
function handlePromptCopy(pid){
  const p = PROMPTS.find(x => x.id === pid);
  if(!p) return;
  const hasAttachments = Array.isArray(p.attachments) && p.attachments.length > 0;
  const isLong = (p.content||'').length > PROMPT_PREVIEW_THRESHOLD;
  if(!isLong && !hasAttachments) copyPromptContent(p);
  else openPromptView(pid);
}

function copyPromptContent(p, opts){
  const text = p.content || '';
  const finish = (ok) => {
    if(ok) toast('Prompt copied to clipboard! ✓', 'var(--green)');
    else   toast('Could not copy to clipboard', 'var(--red)');
    if(opts && opts.afterCopy) opts.afterCopy(ok);
  };
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(()=>finish(true)).catch(()=>finish(false));
  } else {
    try{
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta); finish(ok);
    }catch(e){ finish(false); }
  }
}

function openPromptView(pid){
  const p = PROMPTS.find(x => x.id === pid);
  if(!p) return;
  const cat = findCategory(p.categoryId) || { icon:'🗂', name:'Uncategorized' };
  const creator = MEMBERS.find(m => m.id == p.createdBy);
  const tags = Array.isArray(p.tags) ? p.tags : [];
  const attachments = Array.isArray(p.attachments) ? p.attachments : [];
  const canDeleteAttach = !!(CU && p.createdBy && CU.id == p.createdBy);
  const attachmentsHtml = attachments.length ? `<div style="margin-top:14px">
    <div style="font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">📎 Attachments (${attachments.length})</div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${attachments.map(a => {
        const url = getAttachmentUrl(a.file_path);
        return `<div style="display:flex;align-items:center;gap:10px;background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:8px 12px">
          <span style="font-size:18px">${attachIcon(a.name||a.mime_type)}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escHtml(a.name||'')}">${escHtml(a.name||'(untitled)')}</div>
            <div style="font-size:10px;color:var(--text3)">${escHtml(fmtBytes(a.file_size))}${a.uploaded_at?` · ${escHtml(relativeTime(a.uploaded_at))}`:''}</div>
          </div>
          ${url?`<a href="${escHtml(url)}" target="_blank" rel="noopener" class="tbtn" style="font-size:11px;padding:4px 10px;text-decoration:none">⬇ Download</a>`:`<span style="font-size:10px;color:var(--text3)">no URL</span>`}
          ${canDeleteAttach?`<button class="tbtn d" style="font-size:11px;padding:4px 8px" title="Delete attachment" onclick="deletePromptAttachment('${p.id}','${a.id}')">🗑</button>`:''}
        </div>`;
      }).join('')}
    </div>
  </div>` : '';

  document.getElementById('modal-prompt-view-body').innerHTML = `
    <div class="mtit" style="margin-bottom:8px">${escHtml(p.title)}</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
      <span class="badge bgr">${cat.icon} ${escHtml(cat.name)}</span>
      ${tags.map(t=>`<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:var(--bg3);border:.5px solid var(--border);color:var(--text2)">#${escHtml(t)}</span>`).join('')}
    </div>
    ${p.description?`<div style="font-size:13px;color:var(--text2);line-height:1.5;margin-bottom:12px">${escHtml(p.description)}</div>`:''}
    <pre style="background:var(--bg3);border:.5px solid var(--border2);border-radius:var(--rsm);padding:14px 16px;max-height:40vh;overflow:auto;font-family:var(--mono);font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-word;color:var(--text)">${escHtml(p.content||'')}</pre>
    ${attachmentsHtml}
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text3);margin-top:14px">
      <span>by ${escHtml(creator?.name || 'Unknown')}</span>
      <span>${escHtml(relativeTime(p.createdAt))}</span>
    </div>
    <div class="macts">
      <button class="mbtn c" onclick="closeModal()">Close</button>
      <button class="mbtn ok" id="prompt-view-copy" onclick="copyFromViewModal('${pid}')">📋 Copy prompt</button>
    </div>`;
  openModal('prompt-view');
}

async function deletePromptAttachment(promptId, attId){
  const p = PROMPTS.find(x => x.id === promptId);
  if(!p) return;
  if(!(CU && p.createdBy == CU.id)){ toast('Only the prompt creator can delete attachments','var(--amber)'); return; }
  const att = (p.attachments||[]).find(a => a.id === attId);
  if(!att) return;
  if(!confirm(`Delete attachment "${att.name}"? This cannot be undone.`)) return;
  const r = await deleteAttachmentFromStorage(att.file_path);
  if(!r.ok){ toast('Could not delete from storage — keeping the record','var(--amber)'); return; }
  p.attachments = (p.attachments||[]).filter(a => a.id !== attId);
  persist();
  openPromptView(promptId); // refresh modal
  buildPrompts();
  toast('Attachment deleted','var(--red)');
}

function copyFromViewModal(pid){
  const p = PROMPTS.find(x => x.id === pid);
  if(!p) return;
  copyPromptContent(p, {
    afterCopy: (ok) => {
      if(!ok) return;
      const btn = document.getElementById('prompt-view-copy');
      if(btn){ btn.textContent = '✓ Copied'; btn.disabled = true; }
      setTimeout(()=>closeModal(), 1000);
    }
  });
}

// ── Add / Edit prompt ─────────────────────
function openAddPrompt(){
  CEditPromptId = null;
  document.getElementById('prompt-edit-title').textContent = 'Add prompt';
  document.getElementById('pe-submit').textContent = 'Save prompt';
  document.getElementById('pe-id').value = '';
  document.getElementById('pe-title').value = '';
  document.getElementById('pe-desc').value = '';
  document.getElementById('pe-content').value = '';
  document.getElementById('pe-tags').value = '';
  document.getElementById('pe-title-count').textContent = '0 / 100';
  document.getElementById('pe-desc-count').textContent = '0 / 200';
  populateCategoryDropdown();
  resetAttachState();
  openModal('prompt-edit');
  setTimeout(()=>{ document.getElementById('pe-title')?.focus(); wirePromptDropzone(); renderPromptAttachmentList(); }, 80);
}

function openEditPrompt(pid){
  const p = PROMPTS.find(x => x.id === pid);
  if(!p){ toast('Prompt not found','var(--red)'); return; }
  if(!(CU && p.createdBy == CU.id)){ toast('You can only edit prompts you created','var(--amber)'); return; }
  CEditPromptId = pid;
  document.getElementById('prompt-edit-title').textContent = 'Edit prompt';
  document.getElementById('pe-submit').textContent = 'Save changes';
  document.getElementById('pe-id').value = pid;
  document.getElementById('pe-title').value = p.title || '';
  document.getElementById('pe-desc').value = p.description || '';
  document.getElementById('pe-content').value = p.content || '';
  document.getElementById('pe-tags').value = (p.tags||[]).join(', ');
  document.getElementById('pe-title-count').textContent = (p.title||'').length + ' / 100';
  document.getElementById('pe-desc-count').textContent  = (p.description||'').length + ' / 200';
  populateCategoryDropdown(p.categoryId);
  resetAttachState();
  _peAttachState.existing = Array.isArray(p.attachments) ? p.attachments.map(a => ({...a})) : [];
  openModal('prompt-edit');
  setTimeout(()=>{ wirePromptDropzone(); renderPromptAttachmentList(); }, 80);
}

function populateCategoryDropdown(selectedId){
  const sel = document.getElementById('pe-category');
  if(!sel) return;
  sel.innerHTML = '<option value="">— Select category —</option>' + PROMPT_CATEGORIES.map(c => `<option value="${escHtml(c.id)}"${selectedId===c.id?' selected':''}>${c.icon||''} ${escHtml(c.name)}</option>`).join('');
}

async function savePrompt(){
  const title = (document.getElementById('pe-title').value || '').trim();
  const categoryId = document.getElementById('pe-category').value;
  const description = (document.getElementById('pe-desc').value || '').trim();
  const content = (document.getElementById('pe-content').value || '').trim();
  const tagsRaw = (document.getElementById('pe-tags').value || '').trim();

  if(title.length < 3){ toast('Title must be at least 3 characters','var(--amber)'); return; }
  if(title.length > 100){ toast('Title must be 100 characters or fewer','var(--amber)'); return; }
  if(!categoryId){ toast('Please pick a category','var(--amber)'); return; }
  if(content.length < 10){ toast('Prompt content must be at least 10 characters','var(--amber)'); return; }

  let tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  if(tags.length > 5){ toast('Max 5 tags','var(--amber)'); return; }
  if(tags.some(t => t.length > 20)){ toast('Each tag must be 20 characters or fewer','var(--amber)'); return; }

  // Lock the submit button while uploads run
  const submitBtn = document.getElementById('pe-submit');
  if(submitBtn){ submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; }

  const now = new Date().toISOString();
  let p;

  if(CEditPromptId){
    p = PROMPTS.find(x => x.id === CEditPromptId);
    if(!p){ toast('Prompt not found','var(--red)'); if(submitBtn) submitBtn.disabled = false; return; }
    Object.assign(p, { title, description, content, tags, categoryId, updatedAt: now });
  } else {
    p = {
      id: 'p-' + Math.random().toString(36).slice(2,10),
      workspaceId: 1, categoryId, title, description, content, tags,
      attachments: [],
      createdBy: CU ? CU.id : null,
      createdAt: now, updatedAt: now,
    };
    PROMPTS.unshift(p);
  }
  if(!Array.isArray(p.attachments)) p.attachments = [];

  // ── Apply existing attachment removals (storage + metadata)
  let removedCount = 0, removeErrors = 0;
  for(const removeId of _peAttachState.removed){
    const att = p.attachments.find(a => a.id === removeId);
    if(!att) continue;
    if(submitBtn) submitBtn.textContent = 'Removing files…';
    const r = await deleteAttachmentFromStorage(att.file_path);
    if(r.ok){ removedCount++; p.attachments = p.attachments.filter(a => a.id !== removeId); }
    else { removeErrors++; }
  }

  // ── Upload pending attachments
  let uploadedCount = 0, uploadErrors = 0;
  for(let i = 0; i < _peAttachState.pending.length; i++){
    const pending = _peAttachState.pending[i];
    if(pending.status === 'done') continue;
    if(submitBtn) submitBtn.textContent = `Uploading ${i+1}/${_peAttachState.pending.length}…`;
    const r = await uploadPendingAttachment(p.id, pending);
    if(r.ok && r.attachment){
      p.attachments.push(r.attachment);
      uploadedCount++;
    } else {
      uploadErrors++;
    }
  }

  persist();

  // ── Summary toast
  const wasEdit = !!CEditPromptId;
  CEditPromptId = null;
  if(uploadErrors > 0 || removeErrors > 0){
    const msg = uploadErrors > 0
      ? `Prompt saved but ${uploadErrors} attachment${uploadErrors===1?'':'s'} failed to upload`
      : `Prompt saved — ${removeErrors} attachment${removeErrors===1?'':'s'} couldn't be deleted`;
    toast('⚠ ' + msg, 'var(--amber)');
  } else if(uploadedCount > 0){
    toast(`Prompt saved with ${uploadedCount} attachment${uploadedCount===1?'':'s'} ✓`, 'var(--green)');
  } else if(wasEdit){
    toast('✓ Prompt updated', 'var(--green)');
  } else {
    toast('Prompt added successfully! ✓', 'var(--green)');
  }

  if(submitBtn){ submitBtn.disabled = false; if(submitBtn.dataset.label) submitBtn.textContent = submitBtn.dataset.label; }

  closeModal();
  buildPrompts();
}

// ── Delete prompt ─────────────────────────
function openDeletePrompt(pid){
  const p = PROMPTS.find(x => x.id === pid);
  if(!p) return;
  if(!(CU && p.createdBy == CU.id)){ toast('You can only delete prompts you created','var(--amber)'); return; }
  CDelPromptId = pid;
  document.getElementById('prompt-delete-sub').textContent = `"${p.title}" will be permanently removed. This cannot be undone.`;
  openModal('prompt-delete');
}

async function confirmDeletePrompt(){
  if(!CDelPromptId) return;
  const idx = PROMPTS.findIndex(x => x.id === CDelPromptId);
  if(idx < 0){ CDelPromptId = null; closeModal(); return; }
  const p = PROMPTS[idx];
  const attachments = Array.isArray(p.attachments) ? p.attachments : [];
  // Best-effort storage cleanup for any attached files
  if(_sb && attachments.length){
    try {
      const paths = attachments.map(a => a.file_path).filter(Boolean);
      if(paths.length) await _sb.storage.from(PROMPT_ATTACH_BUCKET).remove(paths);
    } catch(e) { /* ignore — DB row still removed */ }
  }
  PROMPTS.splice(idx, 1);
  CDelPromptId = null;
  persist();
  closeModal();
  buildPrompts();
  toast('Prompt deleted','var(--red)');
}

// ── Category manager (super-admin) ────────
function openCategoryManager(){
  if(!isSuperAdmin(CU)){ toast('Only admins can manage categories','var(--amber)'); return; }
  document.getElementById('pcat-new-icon').value = '';
  document.getElementById('pcat-new-name').value = '';
  document.getElementById('pcat-new-desc').value = '';
  renderCategoryList();
  openModal('prompt-categories');
}

function renderCategoryList(){
  const el = document.getElementById('pcat-list');
  if(!el) return;
  if(PROMPT_CATEGORIES.length === 0){
    el.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:14px;text-align:center;background:var(--bg3);border-radius:var(--rsm)">No categories yet. Add one below.</div>';
    return;
  }
  el.innerHTML = PROMPT_CATEGORIES.map(c => {
    const used = PROMPTS.filter(p => p.categoryId === c.id).length;
    const editing = window._editingCatId === c.id;
    if(editing){
      return `<div style="background:var(--bg3);border:.5px solid var(--accent);border-radius:var(--rsm);padding:10px 12px;margin-bottom:6px;display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;gap:6px">
          <input class="finp" id="pcat-edit-icon-${c.id}" maxlength="4" style="width:60px" value="${escHtml(c.icon||'')}"/>
          <input class="finp" id="pcat-edit-name-${c.id}" style="flex:1" value="${escHtml(c.name)}"/>
        </div>
        <input class="finp" id="pcat-edit-desc-${c.id}" placeholder="Description (optional)" value="${escHtml(c.description||'')}"/>
        <div style="display:flex;gap:6px;justify-content:flex-end">
          <button class="mbtn c" style="font-size:11px;padding:4px 10px" onclick="window._editingCatId=null;renderCategoryList()">Cancel</button>
          <button class="mbtn ok" style="font-size:11px;padding:4px 10px" onclick="saveEditCategory('${c.id}')">Save</button>
        </div>
      </div>`;
    }
    return `<div style="background:var(--bg3);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px 12px;margin-bottom:6px;display:flex;align-items:center;gap:10px">
      <div style="font-size:18px;flex-shrink:0">${c.icon||'🗂'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600">${escHtml(c.name)}</div>
        <div style="font-size:11px;color:var(--text3)">${used} prompt${used===1?'':'s'}${c.description?` · ${escHtml(c.description)}`:''}</div>
      </div>
      <button class="tbtn" style="font-size:11px;padding:4px 9px" onclick="startEditCategory('${c.id}')">✎ Edit</button>
      <button class="tbtn d" style="font-size:11px;padding:4px 9px" title="${used>0?used+' prompt(s) — delete or move them first':'Delete category'}" ${used>0?'disabled style="opacity:.35;cursor:not-allowed;font-size:11px;padding:4px 9px"':''} onclick="deletePromptCategory('${c.id}')">🗑</button>
    </div>`;
  }).join('');
}

function addPromptCategory(){
  if(!isSuperAdmin(CU)) return;
  const name = (document.getElementById('pcat-new-name').value || '').trim();
  const icon = (document.getElementById('pcat-new-icon').value || '').trim() || '🗂';
  const description = (document.getElementById('pcat-new-desc').value || '').trim();
  if(name.length < 2){ toast('Category name required','var(--amber)'); return; }
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const exists = PROMPT_CATEGORIES.some(c => c.slug === slug || c.name.toLowerCase() === name.toLowerCase());
  if(exists){ toast('A category with this name already exists','var(--amber)'); return; }
  PROMPT_CATEGORIES.push({ id: 'c-' + Math.random().toString(36).slice(2,9), slug, name, icon, description });
  document.getElementById('pcat-new-icon').value = '';
  document.getElementById('pcat-new-name').value = '';
  document.getElementById('pcat-new-desc').value = '';
  persist();
  renderCategoryList();
  buildPrompts();
  toast('✓ Category added','var(--green)');
}

function startEditCategory(catId){ window._editingCatId = catId; renderCategoryList(); }

function saveEditCategory(catId){
  if(!isSuperAdmin(CU)) return;
  const c = PROMPT_CATEGORIES.find(x => x.id === catId);
  if(!c) return;
  const name = (document.getElementById('pcat-edit-name-'+catId).value || '').trim();
  const icon = (document.getElementById('pcat-edit-icon-'+catId).value || '').trim() || '🗂';
  const description = (document.getElementById('pcat-edit-desc-'+catId).value || '').trim();
  if(name.length < 2){ toast('Name required','var(--amber)'); return; }
  c.name = name; c.icon = icon; c.description = description;
  c.slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  window._editingCatId = null;
  persist();
  renderCategoryList();
  buildPrompts();
  toast('✓ Category updated','var(--green)');
}

function deletePromptCategory(catId){
  if(!isSuperAdmin(CU)) return;
  const used = PROMPTS.filter(p => p.categoryId === catId).length;
  if(used > 0){ toast(`${used} prompt(s) exist in this category. Delete or move them first.`,'var(--amber)'); return; }
  const idx = PROMPT_CATEGORIES.findIndex(x => x.id === catId);
  if(idx < 0) return;
  PROMPT_CATEGORIES.splice(idx, 1);
  if(CPromptCat === catId) CPromptCat = 'all';
  persist();
  renderCategoryList();
  buildPrompts();
  toast('Category deleted','var(--red)');
}

// ══════════════════════════════════════════
// PROMPT ATTACHMENTS (Supabase Storage)
// ══════════════════════════════════════════
const PROMPT_ATTACH_BUCKET = 'prompt-attachments';
const PROMPT_ATTACH_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const PROMPT_ATTACH_ALLOWED_EXT = ['pdf','doc','docx','xls','xlsx','ppt','pptx'];

let _peAttachState = { pending: [], existing: [], removed: [] }; // current edit-modal session

function fmtBytes(n){
  if(!n && n!==0) return '';
  if(n < 1024) return n + ' B';
  if(n < 1024*1024) return (n/1024).toFixed(1) + ' KB';
  return (n/(1024*1024)).toFixed(1) + ' MB';
}

function attachIcon(extOrMime){
  const ext = String(extOrMime||'').toLowerCase().split('.').pop().split('/').pop();
  if(['pdf','doc','docx'].includes(ext) || /pdf|word|msword/.test(ext)) return '📄';
  if(['xls','xlsx','csv'].includes(ext) || /excel|sheet/.test(ext)) return '📊';
  if(['ppt','pptx'].includes(ext) || /presentation|powerpoint/.test(ext)) return '📑';
  return '📎';
}

function isAllowedAttachment(file){
  const ext = (file.name||'').split('.').pop().toLowerCase();
  return PROMPT_ATTACH_ALLOWED_EXT.includes(ext);
}

function getAttachmentUrl(filePath){
  if(!_sb || !filePath) return '';
  try {
    const { data } = _sb.storage.from(PROMPT_ATTACH_BUCKET).getPublicUrl(filePath);
    return data?.publicUrl || '';
  } catch(e) { return ''; }
}

function resetAttachState(){ _peAttachState = { pending: [], existing: [], removed: [] }; }

function addPendingFiles(fileList){
  const files = Array.from(fileList || []);
  let rejected = 0;
  files.forEach(f => {
    if(!isAllowedAttachment(f)){ rejected++; return; }
    if(f.size > PROMPT_ATTACH_MAX_BYTES){ rejected++; return; }
    _peAttachState.pending.push({
      uid: 'u-' + Math.random().toString(36).slice(2,10),
      file: f,
      name: f.name,
      size: f.size,
      mimeType: f.type,
      status: 'queued', // queued | uploading | done | failed
      progress: 0,
      error: null,
    });
  });
  if(rejected){
    toast(`${rejected} file(s) skipped — only PDF/DOC/XLS/PPT up to 10 MB allowed`, 'var(--amber)');
  }
  renderPromptAttachmentList();
}

function removePendingFile(uid){
  _peAttachState.pending = _peAttachState.pending.filter(p => p.uid !== uid);
  renderPromptAttachmentList();
}

function markExistingAttachmentRemoved(attId){
  const att = _peAttachState.existing.find(a => a.id === attId);
  if(!att) return;
  if(!_peAttachState.removed.includes(attId)) _peAttachState.removed.push(attId);
  renderPromptAttachmentList();
}

function undoRemoveExisting(attId){
  _peAttachState.removed = _peAttachState.removed.filter(id => id !== attId);
  renderPromptAttachmentList();
}

function renderPromptAttachmentList(){
  const el = document.getElementById('pe-attachments');
  if(!el) return;
  const rows = [];

  // Existing (in edit mode), with strike-through if marked removed
  _peAttachState.existing.forEach(a => {
    const isRemoved = _peAttachState.removed.includes(a.id);
    rows.push(`<div style="display:flex;align-items:center;gap:8px;background:var(--bg3);border:.5px solid ${isRemoved?'var(--rborder)':'var(--border)'};border-radius:var(--rsm);padding:7px 10px;${isRemoved?'opacity:.55':''}">
      <span style="font-size:16px">${attachIcon(a.name||a.mimeType)}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:500;${isRemoved?'text-decoration:line-through':''};overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escHtml(a.name||'')}">${escHtml(a.name||'(untitled)')}</div>
        <div style="font-size:10px;color:var(--text3)">${escHtml(fmtBytes(a.size))} · existing</div>
      </div>
      ${isRemoved
        ? `<button class="tbtn" style="font-size:10px;padding:3px 8px" onclick="undoRemoveExisting('${a.id}')">↶ Undo</button>`
        : `<button class="tbtn d" style="font-size:10px;padding:3px 8px" title="Remove on save" onclick="markExistingAttachmentRemoved('${a.id}')">✕</button>`}
    </div>`);
  });

  // Pending (new uploads queued)
  _peAttachState.pending.forEach(p => {
    const isErr = p.status === 'failed';
    const isDone = p.status === 'done';
    const isUp = p.status === 'uploading';
    const barColor = isErr ? 'var(--red)' : (isDone ? 'var(--green)' : 'var(--accent)');
    const statusLine = isErr ? `<span style="color:var(--red)">⚠ ${escHtml(p.error||'failed')}</span>` :
                       isDone ? `<span style="color:var(--green)">✓ uploaded</span>` :
                       isUp   ? `<span style="color:var(--accent2)">uploading… ${p.progress}%</span>` :
                                `<span style="color:var(--text3)">queued</span>`;
    rows.push(`<div style="display:flex;align-items:center;gap:8px;background:var(--bg3);border:.5px solid ${isErr?'var(--rborder)':(isDone?'var(--gborder)':'var(--border)')};border-radius:var(--rsm);padding:7px 10px">
      <span style="font-size:16px">${attachIcon(p.name||p.mimeType)}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escHtml(p.name)}">${escHtml(p.name)}</div>
        <div style="font-size:10px;color:var(--text3);display:flex;gap:6px"><span>${escHtml(fmtBytes(p.size))}</span><span>·</span>${statusLine}</div>
        ${(isUp||isDone||isErr) ? `<div style="height:3px;background:var(--bg4);border-radius:2px;margin-top:4px;overflow:hidden"><div style="height:100%;width:${p.progress}%;background:${barColor};transition:width .15s"></div></div>` : ''}
      </div>
      ${isUp ? '' : `<button class="tbtn d" style="font-size:10px;padding:3px 8px" title="Remove" onclick="removePendingFile('${p.uid}')">✕</button>`}
    </div>`);
  });

  el.innerHTML = rows.length ? rows.join('') : '';
}

function wirePromptDropzone(){
  const dz = document.getElementById('pe-dropzone');
  const inp = document.getElementById('pe-file-input');
  if(!dz || !inp || dz.dataset.wired) return;
  dz.dataset.wired = '1';
  dz.addEventListener('click', () => inp.click());
  inp.addEventListener('change', (e) => {
    addPendingFiles(e.target.files);
    inp.value = ''; // allow re-selecting the same file later
  });
  ['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, (e) => {
    e.preventDefault(); e.stopPropagation();
    dz.style.borderColor = 'var(--accent)';
    dz.style.background = 'var(--acbg)';
  }));
  ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, (e) => {
    e.preventDefault(); e.stopPropagation();
    dz.style.borderColor = '';
    dz.style.background = '';
  }));
  dz.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if(dt && dt.files && dt.files.length) addPendingFiles(dt.files);
  });
}

async function uploadPendingAttachment(promptId, pending){
  if(!_sb){
    pending.status = 'failed';
    pending.error = 'Storage offline';
    return { ok:false, error:'Storage offline' };
  }
  pending.status = 'uploading';
  pending.progress = 5;
  renderPromptAttachmentList();

  const safeName = (pending.name || 'file').replace(/[^\w.\- ]+/g, '_');
  const filePath = `${promptId}/${Date.now()}_${safeName}`;

  try {
    // supabase-js v2 upload doesn't emit progress events, so we fake a small tick
    const tick = setInterval(() => {
      if(pending.progress < 85){ pending.progress += 5; renderPromptAttachmentList(); }
    }, 120);

    const { error: upErr } = await _sb.storage.from(PROMPT_ATTACH_BUCKET).upload(filePath, pending.file, {
      cacheControl: '3600',
      upsert: false,
      contentType: pending.mimeType || undefined,
    });

    clearInterval(tick);

    if(upErr){
      pending.status = 'failed';
      pending.error = upErr.message || 'Upload failed';
      pending.progress = 0;
      renderPromptAttachmentList();
      return { ok:false, error: pending.error };
    }

    pending.progress = 100;
    pending.status = 'done';
    renderPromptAttachmentList();

    return {
      ok: true,
      attachment: {
        id: 'a-' + Math.random().toString(36).slice(2,10),
        name: pending.name,
        file_path: filePath,
        file_size: pending.size,
        mime_type: pending.mimeType,
        uploaded_by: CU ? CU.id : null,
        uploaded_at: new Date().toISOString(),
      },
    };
  } catch(e) {
    pending.status = 'failed';
    pending.error = e.message || 'Upload failed';
    pending.progress = 0;
    renderPromptAttachmentList();
    return { ok:false, error: pending.error };
  }
}

async function deleteAttachmentFromStorage(filePath){
  if(!_sb || !filePath) return { ok:false };
  try {
    const { error } = await _sb.storage.from(PROMPT_ATTACH_BUCKET).remove([filePath]);
    return { ok: !error, error };
  } catch(e) {
    return { ok:false, error:e };
  }
}

