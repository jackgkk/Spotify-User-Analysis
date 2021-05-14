# HOW TO RUN TUNEPER LOCALLY?

- Make sure you cloned main brunch from https://github.com/jackgkk/Spotify-User-Analysis/
- Open a terminal and run `npm install`
- After all the packages installed go to the `client` folder by running `cd client`
- In the client directory run `npm install`
- After the install go back to main directory by running `cd ..`
- open file `src\Controllers\authController.ts`, uncomment 13th line and comment 17th line
- run `npm run dev` to make the development server started
- open `http://localhost:3000/` in your browser

# HOW TO RUN TUNPER GLOBALLY ON A SERVER

- GO TO `http://www.tuneper.com` or `https://tuneper-spotify-tool.herokuapp.com/`

# HOW TO PUSH CHANGES ON A SERVER

- run `heroku login` and login to heroku with credentials
- run `git add -A`
- run `git commit -m 'your message'`
- run `git push heroku main`
