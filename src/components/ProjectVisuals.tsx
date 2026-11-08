import type { ReactNode } from 'react'

const Frame = ({ children, label, note }: { children: ReactNode; label: string; note: string }) => (
  <figure className="relative m-0 overflow-hidden rounded-2xl border border-soft/10 bg-navy/70" role="img" aria-label={`${label}: conceptual illustration, not a product screenshot`}>
    <div className="aspect-[16/10] w-full">{children}</div>
    <figcaption className="mono absolute bottom-2 right-3 rounded bg-void/70 px-2 py-0.5 !text-[10px] !text-soft/60">{note} · not a screenshot</figcaption>
  </figure>
)

function ZyntraVisual() {
  const rows = ['University A', 'University B', 'University C']
  const steps = ['Profile', 'Match', 'SOP', 'Apply']
  return (
    <Frame label="ZYNTRA admissions dashboard" note="Conceptual dashboard">
      <div className="grid h-full grid-cols-[18%_1fr] text-[9px] sm:text-[11px]" aria-hidden="true">
        <div className="space-y-2 border-r border-soft/10 bg-void/40 p-2 sm:p-3">
          <div className="h-4 w-4 rounded bg-gradient-to-br from-neon to-electric" />
          {['Home', 'Universities', 'Scholarships', 'SOP', 'Tracker'].map((s, i) => <div key={s} className={`truncate rounded px-1.5 py-1 ${i === 1 ? 'bg-neon/25 text-white' : 'text-soft/50'}`}>{s}</div>)}
        </div>
        <div className="relative space-y-2 p-2 sm:p-3">
          <div className="flex items-center justify-between"><span className="font-display text-xs font-bold sm:text-sm">Recommended for you</span><span className="chip !px-2 !py-0 !text-[9px]">AI match</span></div>
          <div className="grid grid-cols-[1.2fr_1fr] gap-2">
            <div className="space-y-1.5">
              {rows.map((r, i) => (
                <div key={r} className="rounded-lg border border-soft/10 bg-void/50 p-1.5">
                  <div className="flex justify-between"><span>{r}</span><span className="text-electric">Eligible</span></div>
                  <div className="mt-1 h-1 rounded bg-soft/10"><div className="h-1 rounded bg-gradient-to-r from-neon to-electric" style={{ width: `${88 - i * 18}%` }} /></div>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 100 80" className="h-full w-full">
              {[[20, 15], [80, 18], [15, 62], [85, 60], [50, 72]].map(([x, y], i) => <line key={i} x1="50" y1="38" x2={x} y2={y} stroke="#7955FF" strokeOpacity=".5" strokeDasharray="2 2" />)}
              {[[20, 15], [80, 18], [15, 62], [85, 60], [50, 72]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#11142A" stroke="#00CFFF" />)}
              <circle cx="50" cy="38" r="7" fill="#7955FF" /><text x="50" y="40.5" textAnchor="middle" fontSize="6" fill="#fff">You</text>
            </svg>
          </div>
          <div className="flex items-center gap-1">
            {steps.map((s, i) => <span key={s} className={`flex-1 rounded-full border px-1 py-0.5 text-center ${i < 2 ? 'border-electric/60 text-electric' : 'border-soft/15 text-soft/50'}`}>{s}</span>)}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function SimuLoomVisual() {
  const lanes = [34, 62, 90]
  return (
    <Frame label="SimuLoom queue simulation" note="Conceptual simulation">
      <svg viewBox="0 0 200 125" className="h-full w-full" aria-hidden="true">
        <text x="8" y="14" fontSize="7" fill="#00CFFF" fontFamily="monospace">QUEUES</text>
        <text x="132" y="14" fontSize="7" fill="#00CFFF" fontFamily="monospace">COUNTERS</text>
        {lanes.map((y, li) => (
          <g key={y}>
            <line x1="8" y1={y} x2="120" y2={y} stroke="#E9EAF4" strokeOpacity=".12" />
            {[0, 1, 2, 3, 4].slice(0, 5 - li).map((i) => <circle key={i} className="sl-dot" cx={104 - i * 17} cy={y} r="5" fill={i % 2 ? '#7955FF' : '#00CFFF'} style={{ animationDelay: `${i * 0.5 + li * 0.3}s` }} />)}
            <rect x="130" y={y - 10} width="30" height="20" rx="4" fill="#11142A" stroke="#7955FF" />
            <text x="145" y={y + 3} fontSize="7" textAnchor="middle" fill="#E9EAF4" fontFamily="monospace">C{li + 1}</text>
            <path d={`M160 ${y} L176 ${y}`} stroke="#00CFFF" strokeOpacity=".6" markerEnd="url(#a)" />
          </g>
        ))}
        <defs><marker id="a" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0L5 2.5L0 5z" fill="#00CFFF" /></marker></defs>
        <rect x="8" y="98" width="184" height="14" rx="4" fill="#070810" stroke="#E9EAF4" strokeOpacity=".12" />
        <text x="100" y="107.5" fontSize="5.5" textAnchor="middle" fill="#E9EAF4" fillOpacity=".75" fontFamily="monospace">policies: FCFS · priority · aging · fairness-aware</text>
        </svg>
    </Frame>
  )
}

function DastkaarVisual() {
  const items = [
    { n: 'Sofa', d: <path d="M6 34h38v-10a6 6 0 0 0-6-6H12a6 6 0 0 0-6 6zM2 34h46v6H2zM10 40v4M40 40v4" /> },
    { n: 'Chair', d: <path d="M14 8h22v20H14zM12 28h26v6H12zM14 34v10M36 34v10" /> },
    { n: 'Table', d: <path d="M4 18h42v5H4zM10 23v21M40 23v21" /> },
  ]
  return (
    <Frame label="Dastkaar Interiors storefront" note="Conceptual storefront">
      <div className="h-full bg-gradient-to-br from-[#1b1713] to-[#0d0b09] p-2 text-[9px] sm:p-3 sm:text-[11px]" aria-hidden="true">
        <div className="flex items-center justify-between border-b border-[#d9b98a]/20 pb-1.5 text-[#e8d5b5]">
          <span className="font-display text-xs font-bold tracking-wide sm:text-sm">Dastkaar</span>
          <span className="space-x-2 text-[#e8d5b5]/60"><span>Living</span><span>Dining</span><span>Bedroom</span><span>Cart</span></span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {items.map((it, i) => (
            <div key={it.n} className="rounded-lg border border-[#d9b98a]/15 bg-[#2a221a]/70 p-1.5">
              <div className="grid aspect-[4/3] place-items-center rounded bg-[#3a2f23]"><svg viewBox="0 0 50 50" className="h-3/4 fill-none stroke-[#d9b98a]" strokeWidth="1.6" strokeLinejoin="round">{it.d}</svg></div>
              <p className="mt-1 text-[#e8d5b5]">{it.n}</p>
              <p className="text-[#d9b98a]/70">{['Wood', 'Fabric', 'Oak'][i]} · In stock</p>
              <div className="mt-1 rounded bg-[#d9b98a] py-0.5 text-center font-medium text-[#1b1713]">Add to cart</div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[#e8d5b5]/60"><span>Dimensions · Materials · Reviews</span><span>WhatsApp</span></div>
      </div>
    </Frame>
  )
}

export default function ProjectVisual({ slug }: { slug: string }) {
  if (slug === 'zyntra') return <ZyntraVisual />
  if (slug === 'simuloom') return <SimuLoomVisual />
  return <DastkaarVisual />
}
