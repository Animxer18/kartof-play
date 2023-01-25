const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: {
    description: "Gives recent animes",
  },
  run: async function () {
    let data = [];
    await fetch("https://gogoanime.consumet.org/recent-release")
      .then((response) => response.json())
      .then((animelist) => {
        for (let index = 0; index < animelist.length; index++) {
          const element = animelist[index];

          data.push({
            animeId: element.episodeId.split("-episode")[0],
            animeTitle: element.animeTitle,
            animeImg: element.animeImg,
            watch_url: "/watch/" + element.episodeId.split("-episode")[0] + "/" + element.episodeNum,
            episodeNum: element.episodeNum,
          });
        }
      });
    return data;
  },
};
