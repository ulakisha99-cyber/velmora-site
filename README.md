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
I used Claude to help build the site, the AI feature and the one-page plan. I did not use any other paid AI tool.

## What I checked and changed
- Re-ran the plan's figures against analytics.csv (mobile checkout completion, paid social loss, email conversion). They match.
- Tested the stylist with UK and EU delivery, a date that is too soon, a date far away and a £50 budget. It gave dates only from the making and delivery times, and said so when nothing fitted.
- Checked a product page on my phone.
- Used Claude to build the first version of the site, the stylist and the delivery-date helper, and to draft the plan. I then fixed grammar and capitalisation in product text and tidied the product tiles.

## What I would cut or do next
Customer reviews (none exist yet, so none are shown), a Black Friday version of the home page, Lighthouse scores and structured data for AI assistants.

## Credits
Images are free stock photos used with credit. Velmora is fictional. No real brand images or logos are used.
