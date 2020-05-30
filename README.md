# Twitch Game Command

A twitch bot that answers to a command **depending on the current game being played**.

![App screenshot](./screenshot.png)

## Running it on your personal computer

- You must first install [node](https://nodejs.org/)
- Download this repository (use the "clone or download" button above).
- Unzip it.
- Open a terminal window inside the folder (how to do that? learn it for [Windows](https://www.addictivetips.com/windows-tips/open-powershell-in-a-specific-location/) or [Mac](https://lifehacker.com/launch-an-os-x-terminal-window-from-a-specific-folder-1466745514))
- Write `npm run build`, ENTER, and wait for it to finish. It may take some time.
- In the `backend` folder, you'll find a file named `.env`. Open it with your notepad. Here, follow the instruction to put all the configuration the bot needs (like your channel name and the bot account).

The installation is done! You can go back to the terminal, write `npm start`, ENTER. Now it's running.

You can head to http://localhost:3000 in your browser to begin writing your own commands.

The bot will be active as long as your terminal window stays open.

## Deploying it to a server

You can clone the repository and follow the instructions above (or provide the config through environment variables) but the preferred way is to use the [docker image](https://hub.docker.com/repository/docker/thomaslule/twitch-game-command).
