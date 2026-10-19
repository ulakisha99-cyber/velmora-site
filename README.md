# Velmora: home page, product page and AI stylist

Live site: https://shiny-sprite-c0a9d8.netlify.app/

A concept site for Velmora, a fictional London evening-wear label, built for the GIS Analytics practical assessment.

## What is here
- `index.html`: home page with a stylist that suggests pieces for an occasion
- `product.html`: product page with a "Will it arrive in time?" delivery-date helper
- `products.json`: the 48 products supplied in the brief
- `style.css`, `app.js`: styling and site logic
- One-page plan: Velmora-one-page-plan.pdf

## The AI feature
The stylist and the delivery-date helper only use the products in `products.json` and the lead times in the brand brief (14 to 21 days to make, UK delivery 3 to 5 days, EU 5 to 8 days). When a date cannot be promised or nothing matches the choices, it says so instead of guessing. No API keys are used in the code or on the page.

## How I used AI tools
I used Claude to help build the site, the AI feature and the one-page plan. [Add anything else you used, for example ChatGPT or Cursor, and what for.]

## What I checked and changed
- Checked the plan's numbers against analytics.csv (ad spend per order, break-even, order-by date).
- Tested the AI feature with EU and UK delivery, tight and distant dates, and low budgets.
- Checked the product page on a phone for fabric, fit, sizes, returns and a clear button.
- [Add anything you changed after testing, or write "No changes were needed after testing."]

## What I would cut or do next
Customer reviews (none exist yet, so none are shown), a Black Friday version of the home page, Lighthouse scores and structured data for AI assistants.

## Credits
Images are free stock photos used with credit. Velmora is fictional. No real brand images or logos are used.
