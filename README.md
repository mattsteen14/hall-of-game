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
    <a href="https://github.com/mattsteen14/hall-of-game">View Demo</a>
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

I like video games & with some recent additions to iOS app store I have been playing more retro games lately. After my last reddit client project and getting more used to working with API I decided to look at video game APIs. I ended up finding [IGDB](https://api-docs.igdb.com/) & the [IGDB API](https://api-docs.igdb.com/). I thought the website was great, an IMDB for games where you can rate games & view top rated lists of games by platform or the all time top 100 games. If you know anything about me then you'd know this ticks a lot of boxes for me. Although that being said I found the interface of the site was not very intuitive. Apart from the top 100 list, it was not very immediate to get to a properly formatted top rated list for each platform. Then because it lists multiple platform releases for games that were later made available on online stores and services like PSN, Nintendo Online & the Wii Virtual console etc it muddied certain platforms top lists. So the top 100 Nintendo Wii games for example includes a lot of Super Nintendo games because of the virtual console service.

Therefore the idea for this app is to utilise the IGDB API to make an IGDB client web app where the main view is the top 10 (or 100) games with filters so you can then see the top games per platform or genre or that are available for each emulation platform. Then when you click or search for a game the view changes to a game details page for each page. I will have to set up numerous filters and be very specific to ensure that online releases, remasters & other non-original releases do not feature in these lists. The API has limitations such as no write operations, you cannot update the data. I was considering including functionality for users to rate games and them to favourites list but I would have to create my own backend for this & it could complicate the existing user ratings. This is maybe something to think about for the future, but for now on the game details page I will include a link to the IGDB page with a note that the user can rate the game there.

<details>
<summary>Project Objectives</summary>

- Integrate IGDB API into the application.

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

### Project Design

As you can see from the wireframe below, the header and nav components will remain constant. In the nav section the rows of filters will be horizontally scrollable and set to the width of the page/view window. The main section will change depending on what list filter the user has selected or if the user has clicked on or searched for a game. The game details view is similar to an IGDB game page but simplified to be single page and just to include the most pertinent information.

### Wireframe

![Hall Of Game wireframe](https://github.com/mattsteen14/hall-of-game/blob/main/public/hall-of-game_wireframe1.png?raw=true)

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
- [ ] Build the components.
- [ ] Add IGDB data.
- [ ] Testing and dubugging.
- [ ] Deploy and publish to the web.
- [ ] Share on Codecademy forums for feedback.
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
