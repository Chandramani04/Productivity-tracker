# Productivity Tracker Dashboard

A beautiful and functional productivity dashboard with multiple features to help you stay organized and focused.

## Features

- **To-Do List**: Create and manage your daily tasks with descriptions and importance markers
- **Daily Planner**: Plan your day with time-slot scheduling
- **Motivational Quotes**: Get inspired with daily motivational quotes
- **Pomodoro Timer**: Use the Pomodoro technique to boost your productivity
- **Weather Dashboard**: Stay updated with current weather information

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup Instructions

To enable GitHub Pages for your repository:

1. **Navigate to your repository settings**:
   - Go to your repository on GitHub
   - Click on `Settings` (top navigation bar)

2. **Configure GitHub Pages**:
   - In the left sidebar, click on `Pages` (under "Code and automation")
   - Under "Build and deployment":
     - **Source**: Select `GitHub Actions`
   
3. **Enable Actions** (if not already enabled):
   - In the left sidebar, click on `Actions` then `General`
   - Under "Actions permissions", ensure actions are enabled for this repository

4. **Trigger Deployment**:
   - The workflow will automatically run when you push to the `main` branch
   - Or you can manually trigger it:
     - Go to the `Actions` tab in your repository
     - Click on "Deploy to GitHub Pages" workflow
     - Click "Run workflow" button
     - Select the `main` branch and click "Run workflow"

5. **Access Your Site**:
   - Once the workflow completes (usually takes 1-2 minutes), your site will be available at:
   - `https://<your-username>.github.io/<repository-name>/`
   - For this repository: `https://chandramani04.github.io/Productivity-tracker/`
   - You can find the exact URL in the Pages settings or in the workflow deployment output

### Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Checks out your code
- Configures GitHub Pages
- Uploads the site files
- Deploys to GitHub Pages

The workflow runs on:
- Every push to the `main` branch
- Manual trigger via the Actions tab

## Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   cd <repository-name>
   ```
   
   For this repository:
   ```bash
   git clone https://github.com/Chandramani04/Productivity-tracker.git
   cd Productivity-tracker
   ```

2. Open `index.html` in your web browser:
   - You can simply double-click the `index.html` file
   - Or use a local server like Live Server (VS Code extension) for better development experience

## Technologies Used

- HTML5
- CSS3 (with SCSS)
- Vanilla JavaScript
- Remix Icon for icons
- Local Storage for data persistence

## Contributing

Feel free to fork this repository and submit pull requests for any improvements!

## License

This project is open source and available for anyone to use and modify.
