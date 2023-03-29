import { Page, A, H1, H2, TextBox, ChoiceList, Choice } from "./components";
import { Markdown } from "./markdown";
import { linkMarkdownObjects } from "./linkmarkdown";

export const Overview = ({ city }) => {
  const factionDescription = linkMarkdownObjects(
    city.find("factionsDescription").name,
    city.findAll("faction"),
    "#/faction"
  );
  const neighborhoodDescription = linkMarkdownObjects(
    city.find("neighborhoodssDescription").name,
    city.findAll("neighborhood"),
    "#/neighborhood"
  );
  return <Page
    title={city.find("cityName").name}
    back="#/"
    background={city.properties.cityImage.imageUrl}
    saturated={true}
  >
    <H1>{city.title}</H1>
    <TextBox class="ld:float-right">
      <H2>Neighborhoods</H2>
      <Markdown text={neighborhoodDescription} />
    </TextBox>
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
