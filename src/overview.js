import { Page, A, H1, TextBox, ChoiceList, Choice } from "./components";

export const Overview = ({ city }) => {
  return <Page title={city.find("cityName").name} back="#/" background={city.properties.cityImage.imageUrl}>
    <H1>{city.find("cityName").name}</H1>
    <ChoiceList intro="Neighborhoods:">
      {city.findAll("neighborhood").map(neighborhood => (
        <Choice href={["neighborhood", neighborhood.name]}>{neighborhood.name}</Choice>
      ))}
    </ChoiceList>
    <ChoiceList intro="Factions:">
      {city.findAll("faction").map(faction => (
        <Choice href={["faction", faction.name]}>{faction.name}</Choice>
      ))}
    </ChoiceList>
  </Page >;
}
