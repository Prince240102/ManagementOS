-- Auth + core data model for the Next.js app.
-- Keep it intentionally small and evolvable; match legacy flow semantics.

-- ════════════════════════════════════════════════════════════════════════════
-- Users / Sessions
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists users (
  id bigserial primary key,
  email text not null unique,
  password_hash text not null,
  name text not null,
  role text not null,
  title text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_active_idx on users (active);
create index if not exists users_role_idx on users (role);

create table if not exists sessions (
  id text primary key,
  user_id bigint not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists sessions_user_id_idx on sessions (user_id);
create index if not exists sessions_expires_at_idx on sessions (expires_at);

-- ════════════════════════════════════════════════════════════════════════════
-- Brands / Memberships
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists brands (
  id bigserial primary key,
  name text not null,
  initials text not null default '',
  industry text not null default '',
  color text not null default '#7c6af7',
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists brands_archived_idx on brands (archived);

-- A user can be assigned to many brands (SAM/specialist/owner visibility).
create table if not exists brand_memberships (
  brand_id bigint not null references brands(id) on delete cascade,
  user_id bigint not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (brand_id, user_id)
);

create index if not exists brand_memberships_user_id_idx on brand_memberships (user_id);

-- ════════════════════════════════════════════════════════════════════════════
-- Lookups (campaign library, platforms, creative styles, currencies, etc.)
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists lookups (
  key text primary key,
  values jsonb not null,
  updated_at timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════════════════
-- Campaigns / Content Pieces
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists campaigns (
  id bigserial primary key,
  brand_id bigint not null references brands(id) on delete cascade,
  month text not null, -- YYYY-MM (legacy wizard selects month)
  name text not null,
  notes text not null default '',

  status text not null default 'planning',
  -- legacy: organic/inorganic (also used as budget type)
  budget_type text not null default 'organic',
  currency text not null default '',
  budget_amount numeric null,

  objective text not null default '',
  outcome text not null default '',
  t_target_audience text not null default '',
  e_elevator_pitch text not null default '',

  mediums jsonb not null default '[]'::jsonb,
  creative_styles jsonb not null default '[]'::jsonb,
  camp_focus jsonb not null default '[]'::jsonb,

  owner_status text not null default '',
  sent_to_owner boolean not null default false,
  sent_to_owner_at timestamptz null,
  sent_to_owner_by text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_brand_id_idx on campaigns (brand_id);
create index if not exists campaigns_month_idx on campaigns (month);
create index if not exists campaigns_status_idx on campaigns (status);

create table if not exists campaign_owner_comments (
  id bigserial primary key,
  campaign_id bigint not null references campaigns(id) on delete cascade,
  type text not null, -- approval / changes / comment
  by_name text not null,
  text text not null,
  created_at timestamptz not null default now()
);

create index if not exists campaign_owner_comments_campaign_id_idx on campaign_owner_comments (campaign_id);

create table if not exists content_pieces (
  id bigserial primary key,
  campaign_id bigint not null references campaigns(id) on delete cascade,
  topic text not null default '',
  platform text not null default '',
  platforms jsonb not null default '[]'::jsonb,
  creative_style text not null default '',
  status text not null default 'brief',
  publish_status text not null default '',

  brief_due date null,
  brief_approval_due date null,
  design_date date null,
  post_date date null,

  assignee_id bigint null references users(id) on delete set null,

  copy_dir text not null default '',
  copy text not null default '',
  caption text not null default '',
  hashtags text not null default '',
  visual_idea text not null default '',

  owner_comment text not null default '',
  sent_to_owner boolean not null default false,
  sent_to_owner_at timestamptz null,

  ai_suggestions jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_pieces_campaign_id_idx on content_pieces (campaign_id);
create index if not exists content_pieces_assignee_id_idx on content_pieces (assignee_id);
create index if not exists content_pieces_status_idx on content_pieces (status);

-- ════════════════════════════════════════════════════════════════════════════
-- Tasks (generated from pieces + standalone)
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists tasks (
  id bigserial primary key,
  brand_id bigint not null references brands(id) on delete cascade,
  title text not null,
  stage text not null default 'todo',
  due date null,

  assignee_id bigint null references users(id) on delete set null,
  created_by_id bigint null references users(id) on delete set null,

  content_piece_id bigint null references content_pieces(id) on delete set null,

  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_brand_id_idx on tasks (brand_id);
create index if not exists tasks_assignee_id_idx on tasks (assignee_id);
create index if not exists tasks_stage_idx on tasks (stage);
create index if not exists tasks_content_piece_id_idx on tasks (content_piece_id);
