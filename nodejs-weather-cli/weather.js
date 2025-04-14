const axios = require("axios");
const yargs = require("yargs");

const argv = yargs
  .option("city", {
    alias: "c",
    descibe: "City name to fetch weather for",
    type: "string",
    demandOption: true,
  })
  .help().argv;

const getWeather = async (city) => {
  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const response = await axios.get(url);
    const data = response.data;

    const current = data.current_condition[0];
    const tempC = current.temp_C;
    const desc = current.weatherDesc[0].value;

    console.log(`🌤️ Weather for ${city}:`);
    console.log(`Temperature: ${tempC}°C`);
    console.log(`Condition: ${desc}`);
  } catch (err) {
    console.error("Could not fetch weather. Maybe try another city?");
  }
};

getWeather(argv.city);
