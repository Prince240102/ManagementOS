create table if not exists app_state (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
