## Uniform Commerce Starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's a Starter repository containing a personalized Uniform-powered e-commerce store.

- [Demo](https://uniformcommercestarter.netlify.app/)
- [Docs](https://docs.uniform.app/getting-started/starters#javadrip)

On Uniform, install the Commerce Starter after creating an account then follow the instructions to connect this repository. 
Alternatively, you can start with this repository then push the content to your Uniform project. See the instructions below.

### Uniform Project Setup

1. Clone this repo onto your local machine
2. Create a new project at https://uniform.app. Give it a name and select "Empty Project".
3. Under your team's Security settings, create an API Key with full permissions to Canvas and Context.
4. Copy your API Key, Project ID, and Quick Connect Key. You will add these to your `.env` file (see below) and to the Uniform Chrome extension respectively. It is important to note that once you close the API Key window you're unable to copy the API or Quick Connect key values again. If you do close the API Key window before copying you will need to go through the API Key creation process again.
5. In your new project, navigate to "Settings -> Canvas Settings" and add `http://localhost:3000/api/preview?secret=javadrip` into the Preview URL and click "Save". This aloows you to preview your project as you develop.

### Add Uniform Fake Commerce integration

1. Navigate to your project then go to the `Integrations` menu.

2. Chose and add the `Uniform Fake Commerce` integration.

3. As this integration relies on the local development environment of this project, we set the `API URL` field to http://localhost:3000. You can modify it if you run this project on a different port or domain.

4. Click on `Save` button.

### Environment Variables

- `UNIFORM_API_KEY`: your uniform api key
  > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
- `UNIFORM_PROJECT_ID`: your uniform project

### Start local development

1. In your code editor and rename `.env.example` to `.env` file and add your `UNIFORM_API_KEY` and `UNIFORM_PROJECT_ID` environment variables. The values must correspond to your Uniform project connection details. If you don't have the API key created, head over to your team security section and create one. ⚠️ For this initial setup, this API key needs the Developer role assigned to it.

1. In your terminal, from the project root, install all dependencies with the following command:

    ```bash
    npm install
    ```

1. Run this to push all local content from `./data` to your new Uniform project.

    ```bash
    npm run push
    ```

1. Run the dev  server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The project is connected to your Uniform project. Changes you make an publish on Uniform will reflect in this local project.

### Supported features

- Hardcoded top navigation menu with 3 links only (home, beans, coffee makers, product detail)
- Personalized home page Hero
- Beans && Coffee makers pages
- Product detail page
- Local storage based cart functionality
- Visual Canvas, Project Map & Project Map Links
- [Static page generation based on project map canvas API](https://docs.uniform.app/reference/packages/uniformdev-project-map#projectmapclient)
- Canvas Components with default Title Parameter and Screenshot for better Visual Canvas experience
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
