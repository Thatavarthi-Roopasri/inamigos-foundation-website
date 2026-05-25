# 🚀 Deployment Guide: Deploying to Render

This project is configured to build and deploy seamlessly as a **Static Site** on **Render**. Render's Static Sites are free, fast, served over a global CDN, and **never spin down** (unlike Render's free Web Services).

Here is the step-by-step guide to get your website live!

---

## Prerequisites
1. A **GitHub** account.
2. A **Render** account (sign up at [render.com](https://render.com) using your GitHub account).

---

## Step 1: Create a GitHub Repository and Push your Code

You need to put this project on GitHub. If you haven't already initialized git inside your project folder, follow these steps in your command line:

1. Open your terminal/command prompt and navigate to the project directory:
   ```bash
   cd "C:\Users\Roopa\Downloads\web page-20260525T105611Z-3-001\web page"
   ```
2. Initialize a new Git repository:
   ```bash
   git init
   ```
3. Add all files to staging (this includes our newly configured `package.json`, `vite.config.js`, `.gitignore`, and `render.yaml` files):
   ```bash
   git add .
   ```
4. Commit the changes:
   ```bash
   git commit -m "Configure project for Vite build and Render deployment"
   ```
5. Create a new repository on GitHub (keep it public or private).
6. Copy the remote repository URL from GitHub and run:
   ```bash
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy to Render

Once your code is on GitHub, you can deploy it in two ways:

### Option A: Manual Setup (Recommended)
1. Go to your **Render Dashboard** and click **New +** -> **Static Site**.
2. Connect your GitHub account and select your repository.
3. Configure the following settings:
   - **Name**: `inamigos-foundation` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (if your repository root contains `index.html`) or set to `web page` (if your repository root contains the `web page` folder).
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **Create Static Site**.

---

### Option B: Deploy using Blueprint (`render.yaml`)
Render has automatically detected the `render.yaml` blueprint configuration in this repository.
1. Go to your **Render Dashboard** and click **New +** -> **Blueprint**.
2. Connect your repository.
3. Render will parse the `render.yaml` file, automatically configure the build command (`npm install && npm run build`), and publish directory (`dist`).
4. Click **Approve** to deploy your site.

---

## 🛠️ Local Development & Build Commands

If you need to make changes locally and preview them:

* **Install dependencies**:
  ```bash
  npm install
  ```
* **Run local development server** (live reload):
  ```bash
  npm run dev
  ```
* **Test the production build**:
  ```bash
  npm run build
  ```
* **Preview the production build locally**:
  ```bash
  npm run preview
  ```

Your website will be live at a custom sub-domain provided by Render (e.g., `inamigos-foundation.onrender.com`). You can also link your custom domain for free!
