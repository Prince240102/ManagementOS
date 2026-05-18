-- MarketingOS v8 — Supabase schema
-- Mirrors the tables documented in guide.md §2.

-- Workspaces ----------------------------------------------------
CREATE TABLE IF NOT EXISTS workspaces (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  logo_url   TEXT,
  owner_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id ON workspaces(owner_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_slug     ON workspaces(slug);

-- Brands --------------------------------------------------------
CREATE TABLE IF NOT EXISTS brands (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL,
  color        TEXT DEFAULT '#7c6af7',
  description  TEXT,
  logo_url     TEXT,
  created_by   UUID REFERENCES auth.users(id),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_brands_workspace_id ON brands(workspace_id);

-- Campaigns -----------------------------------------------------
CREATE TABLE IF NOT EXISTS campaigns (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  brand_id     UUID REFERENCES brands(id)     ON DELETE CASCADE,
  name         TEXT NOT NULL,
  description  TEXT,
  status       TEXT DEFAULT 'draft',
  start_date   DATE,
  end_date     DATE,
  budget       DECIMAL(12,2),
  created_by   UUID REFERENCES auth.users(id),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_campaigns_workspace_id ON campaigns(workspace_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_brand_id     ON campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status       ON campaigns(status);

-- Tasks ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  brand_id     UUID REFERENCES brands(id)     ON DELETE SET NULL,
  campaign_id  UUID REFERENCES campaigns(id)  ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  status       TEXT DEFAULT 'todo',
  priority     TEXT DEFAULT 'medium',
  assigned_to  UUID REFERENCES auth.users(id),
  due_date     DATE,
  created_by   UUID REFERENCES auth.users(id),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_tasks_workspace_id ON tasks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tasks_campaign_id  ON tasks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to  ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status       ON tasks(status);

-- Approvals -----------------------------------------------------
CREATE TABLE IF NOT EXISTS approvals (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  item_type    TEXT NOT NULL,
  item_id      UUID NOT NULL,
  status       TEXT DEFAULT 'pending',
  requested_by UUID REFERENCES auth.users(id),
  assigned_to  UUID REFERENCES auth.users(id),
  feedback     TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_approvals_workspace_id  ON approvals(workspace_id);
CREATE INDEX IF NOT EXISTS idx_approvals_item          ON approvals(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status        ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_approvals_assigned_to   ON approvals(assigned_to);

-- Assets --------------------------------------------------------
CREATE TABLE IF NOT EXISTS assets (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  brand_id     UUID REFERENCES brands(id)     ON DELETE SET NULL,
  name         TEXT NOT NULL,
  type         TEXT NOT NULL,
  file_path    TEXT NOT NULL,
  file_size    INTEGER,
  mime_type    TEXT,
  tags         TEXT[],
  uploaded_by  UUID REFERENCES auth.users(id),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_assets_workspace_id ON assets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_assets_brand_id     ON assets(brand_id);
CREATE INDEX IF NOT EXISTS idx_assets_type         ON assets(type);

-- Team members --------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role         TEXT DEFAULT 'member',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(workspace_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_team_members_workspace_id ON team_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id      ON team_members(user_id);

-- Row Level Security --------------------------------------------
ALTER TABLE workspaces   ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands       ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns    ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks        ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals    ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets       ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Example policy: workspaces accessible to owner or team members
DROP POLICY IF EXISTS "Users can view their workspaces" ON workspaces;
CREATE POLICY "Users can view their workspaces" ON workspaces
  FOR SELECT USING (
    auth.uid() = owner_id OR EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.workspace_id = workspaces.id
        AND team_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Owners can update their workspace" ON workspaces;
CREATE POLICY "Owners can update their workspace" ON workspaces
  FOR UPDATE USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Owners can delete their workspace" ON workspaces;
CREATE POLICY "Owners can delete their workspace" ON workspaces
  FOR DELETE USING (auth.uid() = owner_id);
