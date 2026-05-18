export const STAGES = {
  todo:       { label: 'To do',       color: 'var(--text3)' },
  inprogress: { label: 'In progress', color: 'var(--blue)'  },
  review:     { label: 'In review',   color: 'var(--amber)' },
  approved:   { label: 'Approved',    color: 'var(--accent)'},
  onhold:     { label: 'On hold',     color: 'var(--red)'   },
  completed:  { label: 'Completed',   color: 'var(--green)' },
  remark:     { label: 'Remark',      color: 'var(--pink)'  },
}

export const STAGE_ORDER = ['todo', 'inprogress', 'review', 'approved', 'onhold', 'completed', 'remark']

export const PRIORITIES = {
  high:   { label: 'High',   cls: 'pri-high', emoji: '🔴' },
  medium: { label: 'Medium', cls: 'pri-med',  emoji: '🟡' },
  low:    { label: 'Low',    cls: 'pri-low',  emoji: '🟢' },
}

export const CAMPAIGN_STATUS = {
  draft:     { label: 'Draft',     cls: 'bgr' },
  active:    { label: 'Active',    cls: 'bg'  },
  paused:    { label: 'Paused',    cls: 'ba'  },
  completed: { label: 'Completed', cls: 'bp'  },
}

export const APPROVAL_STATUS = {
  pending:  { label: 'Pending',  cls: 'ba' },
  approved: { label: 'Approved', cls: 'bg' },
  rejected: { label: 'Rejected', cls: 'br' },
}

export const NAV_ITEMS = {
  workspace: [
    { to: '/',         label: 'Dashboard',  icon: '⊞' },
    { to: '/brands',   label: 'Brands',     icon: '◈' },
  ],
  work: [
    { to: '/tasks',     label: 'Tasks',     icon: '◻' },
    { to: '/campaigns', label: 'Campaigns', icon: '◇' },
    { to: '/assets',    label: 'Assets',    icon: '◁' },
  ],
  owner: [
    { to: '/owner', label: 'Owner', icon: '★' },
  ],
}
