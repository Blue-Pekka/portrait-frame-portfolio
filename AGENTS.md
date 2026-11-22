<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- All portfolio copy and data live in `src/content/` (portfolio.ts, case-studies.ts); components only render it — keeps edits to text in one place.
- Home is one short scrolling page (Hero → Academics → Extracurriculars → Contact) of section components in `src/components/site/`; project case studies stay separate routes at `/work/$slug` so each has its own URL and metadata.
- Scroll motion goes through `useReveal` data attributes (mainly a subtle `data-reveal` fade) and must leave content visible without JS or with reduced motion.
- Colours come only from the tokens in `src/styles.css`; legacy token names (vermilion, violet, electric) are retuned to muted values rather than renamed, so old classes stay calm.
- No 3D/WebGL, intro loader or custom cursor — the site is a quick read for admissions reviewers, so it stays light and plain.
- Contact form inserts straight into `contact_messages` from the browser; RLS allows anonymous insert only, no reads.
