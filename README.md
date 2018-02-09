# LIRI: A Node Application
LIRI is a node application that Spotifys songs, searches movies, and even displays your tweets!

### Guide
_____

#### Setup
- Clone the repository, or download the ZIP file.
- Change directory to the root of **liri-node-app**. Example: *~/example/liri-node-app* **(this is the root)**.
  - This step is important! **/liri-node-app** should be the last folder displayed in the path.
- In the command line, type **npm install** to install the required dependencies.
- Now you're ready to use LIRI! Type **node liri** in the command line. You will then be presented with the list of available commands.
  - To use the Twitter functionality for your Twitter account, you will also need to obtain **consumer keys and access tokens**. Instructions for that are listed below under **Getting Your Twitter API Keys**.

#### Spotifying Songs
- Use the **up/down arrow keys** to select the **spotify-this-song** command, then hit **enter**.
- Enter a song name! The default song is "The Sign" by Ace of Base.
- The top 3 search results will appear, each with the artist name, song name, preview link, and album name.

#### Searching Movies
- Use the **up/down arrow keys** to select the **movie-this** command, then hit **enter**.
- Enter a movie name! The default movie is *Mr. Nobody*.
- If the movie was found, the title, year, rating, score, country, language(s), and plot will appear in the console.

#### Displaying Your Tweets
- Use the **up/down arrow keys** to select the **my-tweets** command, then hit **enter**.
- The last 20 tweets associated with the provided keys will appear, each with a date and time.

#### Reading From .txt
- LIRI can also read commands directly from the included **random.txt** file!
- In **random.txt**, type one of the commands listed above (no spaces or quotes, just hyphens).
- In **random.txt**, separate the command with a **comma**, then type your song/movie immediately after.
  - Example: *spotify-this-song,"Song/movie name here"*
  - Note that the **my-tweets** command does not need a search query.
- In the command line, type **node liri** to start the app
- Use the **up/down arrow keys** to select the **do-what-it-says** command, then hit **enter**.
- LIRI will then execute the supported command!

#### Getting Your Twitter API Keys
- Step One: Visit https://apps.twitter.com/app/new
- Step Two: Fill out the form with dummy data. Type http://google.com in the Website input. Don't fill out the Callback URL input. Then submit the form.
- Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret.
  - Copy and paste them where the <input here> tags are inside your keys.js file.
- Step Four: At the bottom of the page, click the Create my access token button to get your access token key and secret.
  - Copy the access token key and secret displayed at the bottom of the next screen. Paste them where the <input here> tags are inside your keys.js file.
