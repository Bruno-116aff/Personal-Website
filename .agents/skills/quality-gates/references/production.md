# Production gate

Check the deployed or production-like build, not only source files:

- all six known routes load directly and after hard refresh;
- generated HTML includes primary copy, title, metadata, canonical and structured data;
- robots.txt, sitemap.xml and 1200x630 share assets resolve;
- HTTPS and required security headers are present on real responses;
- contact form validates, rate-limits, rejects the honeypot and delivers mail;
- analytics events fire once when configured;
- responsive phone/tablet/desktop walkthrough has no overflow;
- no secrets or restricted Case 4 source material exist in bundles or source maps;
- canonical and redirect behavior matches docs/03-site-structure-and-domains.md.

Record unavailable DNS/VPS/account access as external input, not as a guessed PASS.
