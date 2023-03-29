import { Page, A, H1, H2, TextBox, ChoiceList, Choice } from "./components";
import { Markdown } from "./markdown";

export const Overview = ({ city }) => {
  console.log("desc is", city.find("cityDescription").name);
  const factionDescription = linkMarkdownFactions(city, city.find("factionsDescription").name);
  return <Page title={city.find("cityName").name} back="#/" background={city.properties.cityImage.imageUrl}>
    <H1>{city.title}</H1>
    <ChoiceList class="float-right" intro="Neighborhoods:">
      {city.findAll("neighborhood").map(neighborhood => (
        <Choice href={["neighborhood", neighborhood.name]}>{neighborhood.name}</Choice>
      ))}
    </ChoiceList>
    <TextBox>
      <H2>Introduction</H2>
      <Markdown text={city.find("cityDescription").name} />
    </TextBox>
    <TextBox>
      <H2>Factions</H2>
      <Markdown text={factionDescription} />
    </TextBox>
  </Page >;
}

function linkMarkdownFactions(city, text) {
  const factions = city.findAll("faction");
  const leftover = [];
  let result = text;
  for (const faction of factions) {
    let name = faction.name;
    name = name.replace(/^the\s+/i, "");
    const re = new RegExp(`\\b${name}\\b`, "g");
    let found = false;
    result = result.replace(re, (match) => {
      found = true;
      return `[${match}](#/faction/${encodeURIComponent(faction.name)})`;
    });
    if (!found) {
      leftover.push(faction);
    }
  }
  if (leftover.length) {
    result += "\n\nOther factions:\n";
    result += leftover.map(faction => `* [${faction.name}](#/faction/${encodeURIComponent(faction.name)})`).join("\n");
  }
  console.log("result:", result);
  return result;
}
