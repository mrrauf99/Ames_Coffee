import { menuGroups, winterAddOns, menuFootnotes, type MenuGroup } from "@/data/menu";
import { business } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Rose } from "@/components/ui/Rose";

// The menu is the one thing a visitor actually came for, so it gets the page's
// only piece of real staging: a pale board mounted inside the black hatch,
// laid out the way ames lays out its own printed menu — periwinkle category
// bars, blue prices, roses over the top.

function MenuGroupBlock({ group }: { group: MenuGroup }) {
  return (
    <div>
      <div className="flex items-baseline justify-center gap-2 rounded-full bg-periwinkle px-4 py-1.5">
        <h3 className="font-display text-sm font-semibold lowercase tracking-[0.06em] text-white">
          {group.title}
        </h3>
        {group.note && (
          <span className="text-sm font-semibold text-white/85">{group.note}</span>
        )}
      </div>

      <ul className="mt-5 flex flex-col">
        {group.items.map((item) => (
          <li
            key={item.name}
            className="-mx-3 flex items-baseline gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-denim/[0.06]"
          >
            <div className="min-w-0">
              <p className="font-medium text-ink">{item.name}</p>
              {item.description && (
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              )}
            </div>
            <span
              aria-hidden
              className="h-0 flex-1 -translate-y-1 border-b border-dotted border-denim/25"
            />
            <div className="shrink-0 whitespace-nowrap text-right tabular-nums">
              {item.prices.map((p, i) => (
                <div key={i} className="text-sm">
                  {p.size && <span className="text-text-secondary">{p.size} </span>}
                  <span className="font-semibold text-denim">{p.price}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Menu() {
  const [coffee, iced, signature, juices] = menuGroups;

  return (
    <section id="menu" className="grain relative overflow-hidden bg-kiosk">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="flex justify-center">
          <SectionHeading
            eyebrow="The menu"
            title="Everything on the board"
            description="Straight off the sign in the window. Same names, same prices."
            align="center"
            tone="cream"
          />
        </div>

        <Reveal delay={80} className="mt-12">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-paper px-5 py-9 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:rounded-[2.25rem] sm:px-10 md:px-14 md:py-12">
            {/* The soft shapes printed behind ames' own menu. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-blush opacity-60 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 bottom-8 h-72 w-72 rounded-full bg-butter opacity-70 blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <Rose className="h-10 w-7" flipped />
                  <span className="font-display text-4xl italic leading-none text-ink sm:text-5xl">
                    ames
                  </span>
                  <Rose className="h-10 w-7" />
                </div>
                <p className="mt-4 text-xs font-semibold tracking-[0.24em] text-text-secondary uppercase">
                  Open every day
                </p>
                <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-denim">
                  {business.hoursSummary.map((row) => (
                    <li key={row.label}>
                      {row.label} {row.value}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-x-14">
                <div className="flex flex-col gap-10">
                  <MenuGroupBlock group={coffee} />
                  <MenuGroupBlock group={iced} />

                  <div>
                    <div className="flex items-baseline justify-center gap-2 rounded-full bg-periwinkle px-4 py-1.5">
                      <h3 className="font-display text-sm font-semibold lowercase tracking-[0.06em] text-white">
                        Winter add-ons
                      </h3>
                      <span className="text-sm font-semibold text-white/85">
                        {winterAddOns.price}
                      </span>
                    </div>
                    <ul className="mt-4 flex flex-col gap-1.5 text-sm text-text-secondary">
                      {winterAddOns.items.map((item) => (
                        <li key={item}>+ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-10">
                  <MenuGroupBlock group={signature} />
                  <MenuGroupBlock group={juices} />
                </div>
              </div>

              <p className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-1 border-t border-denim/15 pt-6 text-center text-sm text-text-secondary">
                {menuFootnotes.map((note) => (
                  <span key={note}>{note}</span>
                ))}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
