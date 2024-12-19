<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<h3 align="center">Hall Of Game</h3>

  <p align="center">
    Codecademy Front End Engineer path - Portfolio Project
    <br />
    <a href="https://github.com/mattsteen14/hall-of-game"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://hall-of-game.netlify.app/">View Site</a>
    ·
    <a href="https://github.com/mattsteen14/hall-of-game/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/mattsteen14/hall-of-game/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This is the final open ended portfolio project on my Codecademy front end engineer path where I am required to build an application using everything I have learnt but it has to be built using React and Redux. Unlike previous projects, what I build is up to me.

Hall of Game is a web application that leverages the [RAWG](https://rawg.io) [API](https://rawg.io/apidocs) to showcase the highest-rated video games based on their Metacritic scores. Users can search for games and filter results by genre, platform, or release year. Each game has a dedicated details page, offering an in-depth view of its key information.

## Features
- Search for video games by title.
- Filter results by genre, platform, or release year.
- View detailed information for each game, including Metacritic score and platforms.

<details>
<summary>Project Objectives</summary>

- Integrate API into the application.

- Create a responsive application that adapts to any device (desktop to mobile).

- Create a responsive application that can be viewed on any modern browser.

- Application accessible at an URL.

- The application will allow users to search for games provided by the API.

- Data can be filtered based on categories that are predefined.

- A detailed view (modal or new page/route) is shown when the user selects an item.

- Utilise animations and transitions when posts are loading.

- Users are able to leave an error state.

- Write unit tests for components using Jest and Enzyme.

- Write end-to-end tests for the application.

</details>

<details>
<summary>Original Project Design</summary>

NB - This project was originally intended for the [IGDB](https://www.igdb.com) API but during development I pivoted to RAWG.

As you can see from the wireframe below, the header and nav components will remain constant. In the nav section the rows of filters will be horizontally scrollable and set to the width of the page/view window. The main section will change depending on what list filter the user has selected or if the user has clicked on or searched for a game. The game details view is similar to an IGDB game page but simplified to be single page and just to include the most pertinent information.

### Wireframe

![Hall Of Game wireframe](https://github.com/mattsteen14/hall-of-game/blob/main/public/hall-of-game_wireframe1.png?raw=true)

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- HTML5
- CSS
- JavaScript
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org)
- [Vite](https://vite.dev)
- [Node.js](https://nodejs.org/en)
- [Visual Studio Code](https://code.visualstudio.com)
- [Axios](https://github.com/axios/axios)
- [React Icons](https://react-icons.github.io/react-icons/)
- [lazysizes](https://github.com/aFarkas/lazysizes)
- [Postman](https://www.postman.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

These are instructions for setting up the project locally. To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following software installed before proceeding:

- **Node.js and npm**: You can install the latest version of npm globally using the following command:

  ```sh
  npm install npm@latest -g
  ```

### Installation

<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->
1. Clone the repository:

   ```sh
   git clone https://github.com/mattsteen14/hall-of-game.git
   ```

2. Navigate into the project directory:

   ```sh
   cd hall-of-game
   ```

3. Install NPM packages:

   ```sh
   npm install
   ```

4. Run app in development mode in local browser:

   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Plan project.
- [x] Wireframe the application.
- [x] Create files and run it locally.
- [x] Version control. Set up on GitHub.
- [x] Build the components.
- [x] Share on Codecademy forums for feedback.
- [x] Add RAWG API data.
- [x] Reconfigure build to new API.
- [x] Mention RAWG on site.
- [x] Populate links in GameDetails.
- [x] Add parent platform icons to minimise & simplify platform column.
- [x] Overhaul design to improve UX & responsivity.
- [x] Add filters to games list.
- [x] Add functionality to navigate between API result pages.
- [x] Improve filtering functionality.
- [x] Optimisation.
- [x] Deploy and publish to the web.
- [ ] Testing and dubugging.
- [ ] Further optimisation for mobiles.
- [ ] Additional features.

See the [open issues](https://github.com/mattsteen14/hall-of-game/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project.

2. Create your Feature Branch:

   ```sh
   git checkout -b feature/AmazingFeature
   ```

3. Commit your Changes:

   ```sh
   git commit -m "Add some AmazingFeature"
   ```

4. Push to the Branch:

   ```sh
   git push origin feature/AmazingFeature
   ```

5. Open a Pull Request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Matt Steen-Brookes - [@mattsteen14](https://twitter.com/mattsteen14) - <mattsteen14@me.com>

Project Link: [https://github.com/mattsteen14/hall-of-game](https://github.com/mattsteen14/hall-of-game)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- [Jak Rhodes-Smith](https://github.com/jakr-s) for helping me with the API.
- [Mo Ashqar](https://github.com/ashqar) for introducing me to Codecademy in the first place.
- [Othneil Drew](https://github.com/othneildrew) for the README template.
- [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/mattsteen14/hall-of-game.svg?style=for-the-badge
[contributors-url]: https://github.com/mattsteen14/hall-of-game/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mattsteen14/hall-of-game.svg?style=for-the-badge
[forks-url]: https://github.com/mattsteen14/hall-of-game/network/members
[stars-shield]: https://img.shields.io/github/stars/mattsteen14/hall-of-game.svg?style=for-the-badge
[stars-url]: https://github.com/mattsteen14/hall-of-game/stargazers
[issues-shield]: https://img.shields.io/github/issues/mattsteen14/hall-of-game.svg?style=for-the-badge
[issues-url]: https://github.com/mattsteen14/hall-of-game/issues
[license-shield]: https://img.shields.io/github/license/mattsteen14/hall-of-game.svg?style=for-the-badge
[license-url]: https://github.com/mattsteen14/hall-of-game/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mattsteen14
