## Uniform Commerce Starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Uniform Project Setup

1. Clone this repo onto your local machine
2. Create a new project at https://uniform.app. Give it a name and select "Empty Project".
3. Under your team's Security settings, create an API Key with full permissions to Canvas and Context.
4. Copy your API Key, Project ID, and Quick Connect Key. You will add these to your `.env` file (see below) and to the Uniform Chrome extension respectively. It is important to note that once you close the API Key window you will not be able to copy the API or Quick Connect key values again. If you do close the API Key window before copying you will need to go through the API Key creation process again.
5. Navigate to "Settings -> Canvas Settings" under your new Uniform project and add `http://localhost:3000/api/preview?secret=javadrip` into the Preview URL and click "Save". This will allow you to preview your project as you develop.

### Add Uniform Fake Commerce integration

1. Navigate to your project then go to tab `Integrations`.

2. In section `Browse Integrations` chose `Uniform Fake Commerce`.

3. In field `API URL` input your api url, by default:

```
http://localhost:3000
```

4. Click on `Save` button.

### Environment Variables

- `UNIFORM_API_KEY`: your uniform api key
  > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
- `UNIFORM_PROJECT_ID`: your uniform project

### Init and start Uniform Commerce Starter

1. In your terminal, from the project root, run the following command:

```bash
npm i
```

2. In your code editor and rename `.env.example` to `.env` file and add your `UNIFORM_API_KEY` and `UNIFORM_PROJECT_ID` variables
   > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
3. This command pushes all configurations to your new Uniform project. (please add [Uniform npm scripts](https://github.com/uniformdev/commerce-starter#uniform-npm-scripts) to package.json first or use [Uniform CLI](https://docs.uniform.app/getting-started/cli-setup))

```bash
npm run push
```

5. Run the production server:

```bash
npm run build && npm run start
```

or development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Supported features

- Hardcoded top navigation menu with 3 links only (home, beans, coffee makers, product detail)
- Personalized home page Hero
- Beans && Coffee makers pages
- Product detail page
- Local storage based cart functionality
- Visual Canvas & Project Map & Project Map Links
- [Static page generation based on project map canvas API](https://docs.uniform.app/reference/packages/uniformdev-project-map#projectmapclient)
- Canvas components with default Title Parameter and Screenshot for better Visual Canvas experience
- Next SDK for components registration
- Standard context output type (client side personalization)

### Components

- Add to cart
- Call to action (2 variants)
- Container / Section - Two Columns (advanced usage example)
- Featured Products (default / dark variants)
- Hero (2 variants)
- Page (composition component)
- Product Catalog
- Product Description
- Product Image Gallery
- Product Info
- Related Products

### Compositions

- Home page
  - hardcoded top navigation menu
  - hero personalised component
  - call to action
  - featured products (default variant)
  - featured products (dark variant)
  - hardcoded footer
- Coffee-makers Products page
  - hardcoded top navigation menu
  - hero
  - product catalog
  - hardcoded footer
- Beans Products page
  - hardcoded top navigation menu
  - hero
  - product catalog
  - hardcoded footer
- Product Detail
  - hardcoded top navigation menu
  - section - two columns / product info / product image gallery
  - add to cart
  - product description
  - related products
  - hardcoded footer

### Uniform npm scripts

These commands must be added to the package.json scripts if you need to maintain Uniform project manually.

```bash
"pull:canvas": "run-s pull:components pull:compositions",
"pull:compositions": "uniform canvas composition pull ./data/canvas/compositions",
"pull:components": "uniform canvas component pull ./data/canvas/components",
"pull:context": "npm run pull:context:signals",
"pull:context:signals": "uniform context signal pull ./data/context/signals",
"pull:map:def": "uniform prm definition pull ./data/map/def",
"pull:map:nodes": "uniform prm node pull ./data/map/nodes",
"pull:map": "run-s pull:map:def pull:map:nodes",
"push": "run-s push:context publish:context push:map push:canvas",
"push:context": "npm run push:context:signals",
"push:context:signals": "uniform context signal push ./data/context/signals",
"publish:context": "uniform context manifest publish",
"push:canvas": "run-s push:components push:compositions push:compositions:publish",
"push:components": "uniform canvas component push ./data/canvas/components",
"push:compositions": "uniform canvas composition push ./data/canvas/compositions",
"push:compositions:publish": "uniform canvas composition push ./data/canvas/compositions --state published",
"push:map:def": "uniform prm definition push ./data/map/def",
"push:map:nodes": "uniform prm node push ./data/map/nodes",
"push:map": "run-s push:map:def push:map:nodes",
```
