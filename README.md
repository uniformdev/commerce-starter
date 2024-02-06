## Uniform Commerce Starter - deprecated

## ⚠️ Deprecation notice

This starter is no longer maintained. We recommend looking at either [Component Starter Kit page router version](https://github.com/uniformdev/uniform-component-starter-kit) or [app router version](https://github.com/uniformdev/component-starter-kit-next-approuter) instead.

=====

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's a Starter repository containing a personalized Uniform-powered e-commerce store.

- [Demo](https://uniformcommercestarter.netlify.app)
- [Docs](https://docs.uniform.app/docs/get-started/starters/commerce-starter)

On Uniform, install the Commerce Starter after creating an account then follow the instructions to connect this repository.
Alternatively, you can start with this repository then push the content to your Uniform project. See the instructions below.

### Prerequisites

- A Uniform account with the ability to create a new empty project. If you don't have a Uniform account, you can request a trial account [here](https://uniform.dev/try?utm_source=commerce-starter).

### Environment Variables

- `UNIFORM_API_KEY`: your uniform api key
  > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
- `UNIFORM_PROJECT_ID`: your uniform project

### Start demo

1. In your terminal, from the project root, run the following command:

   ```bash
   npm install && npm run build && npm start
   ```

### Setup own project and start locally

1. In your terminal, from the project root, run the following command and follow the instructions:

   ```bash
   npm run cli
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The project is connected to your Uniform project. Changes you make an publish on Uniform will reflect in this local project.

### Manual Uniform Project Setup

1. Clone this repo onto your local machine
2. Create a new project at https://uniform.app. Give it a name and select "Empty Project".
3. Under your team's Security settings, create an API Key with full permissions to Canvas and Context.
4. Copy your API Key, Project ID, and Quick Connect Key. You will add these to your `.env` file (see below) and to the Uniform Chrome extension respectively. It is important to note that once you close the API Key window you're unable to copy the API or Quick Connect key values again. If you do close the API Key window before copying you will need to go through the API Key creation process again.
5. In your new project, navigate to "Settings -> Canvas Settings" and add `http://localhost:3000/api/preview?secret=javadrip` into the Preview URL and click "Save". This allows you to preview your project as you develop.

### Manual Add Uniform Fake Commerce integration

1. Navigate to your project then go to the `Integrations` menu.

2. Chose and add the `Uniform Fake Commerce` integration.

3. As this integration relies on the products read only API, we set the `BASE URL` field to https://uniformcommercestarter.netlify.app. You can modify it if you deploy this project on your own domain.

4. Click on `Save` button.

### Supported features

- Patters and composition defaults based top navigation menu and footer
- Beans && Coffee makers pages
- Product details page / Custom product details page
- Subcategory page
- Shopping Cart page
- Local storage based cart functionality
- Visual Canvas, Project Map & Project Map Links & Dynamic Inputs
- Next SDK for components registration
- Server context output type (server side personalization)

### Components

- Components from Uniform Component Starter Kit
- Shopping Cart Content
- Shopping Cart Icon
- Product Details Page composition component
