# Issuer logos

Drop each issuer's logo here and it appears in the matching certification card
automatically (no code changes). Until a file exists, the card shows a clean
issuer monogram fallback.

- Filename = the `logo` key in `src/data/certifications.ts` (any of these
  extensions, tried in order): `.svg`, `.png`, `.webp`, `.jpg`, `.jpeg`.
- Square, transparent-background logos look best (rendered at 24×24 inside a
  40×40 tile, `object-contain`).

Expected files (13 — the two Anthropic certs share one logo):

| file                     | issuer                        |
|--------------------------|-------------------------------|
| `c:\Users\BeeClick\Downloads\logo_anthropic.png`          | Anthropic                     |
| `c:\Users\BeeClick\Downloads\aws_logo.png`                | Amazon Web Services           |
| `c:\Users\BeeClick\Downloads\datacamp_logo.png`           | DataCamp                      |
| `c:\Users\BeeClick\Downloads\oracle_logo.png`             | Oracle Cloud Infrastructure   |
| `c:\Users\BeeClick\Downloads\hackerrank_logo.png`         | HackerRank                    |
| `c:\Users\BeeClick\Downloads\dubai_world_trade_centre_logo.jpg`               | Dubai World Trade Centre (GITEX) |
| `c:\Users\BeeClick\Downloads\IEEE-Logo.jpg`               | IEEE / IFIP                   |
| `c:\Users\BeeClick\Downloads\taylor_francis_logo.jpg`     | Taylor & Francis Group        |
| `c:\Users\BeeClick\Downloads\BCG_X_logo.jpg`              | BCG X                         |
| `c:\Users\BeeClick\Downloads\deloitte logo.jpg`           | Deloitte                      |
| `c:\Users\BeeClick\Downloads\university-of-london-logo.png`  | University of London          |
| `c:\Users\BeeClick\Downloads\make_logo.png`               | Make (Integromat)             |
| `c:\Users\BeeClick\Desktop\my_portfolio\public\logos\new-bank-of-america-logo_.jpg`    | Bank of America               |

To add a new issuer: set its `logo` key in the certifications data and drop the
matching file here.
