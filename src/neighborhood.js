import { Page, A, SiteImage, H1, TextBox, Choice, ChoiceList } from "./components";
import { Markdown } from "./markdown";

export const Neighborhood = ({ city, neighborhood }) => {
  const n = city.findName("neighborhood", neighborhood);
  const buildings = city.findAll("building", n);
  const landmarks = city.findAll("landmark", n);
  return <Page title={n.name} back="#/city" background={city.getImage(n, "neighborhoodImagePrompt")}>
    <H1>{n.name}</H1>
    <TextBox>
      <Markdown text={n.attributes.description} />
    </TextBox>
    <ChoiceList>
      {buildings.map(building => (
        <Choice href={["neighborhood", n.name, "building", building.name]}>{building.name}</Choice>
      ))}
      {landmarks.map(landmark => (
        <Choice href={["neighborhood", n.name, "landmark", landmark.name]}>{landmark.name}</Choice>
      ))}
    </ChoiceList>
  </Page>;
};

export const Building = ({ city, neighborhood, building }) => {
  const n = city.findName("neighborhood", neighborhood);
  const b = city.findName("building", building, n);
  const people = city.findAll("ownerOccupants", b);
  console.log("background is", n, city.getImage(n, "neighborhoodImagePrompt"));
  return <Page title={`${n.name} > ${b.name}`} back={["neighborhood", neighborhood]} background={city.getImage(n, "neighborhoodImagePrompt")}>
    <H1>{b.name}</H1>
    <SiteImage src={city.getImage(b, "buildingImagePrompt")} />
    <SiteImage src={city.getImage(b, "buildingInteriorImagePrompt")} />
    <TextBox>
      <Markdown text={b.attributes.description} />
    </TextBox>
    {people.length > 0 ?
      <ChoiceList intro="You see these people:">
        {people.map(person => {
          return <Choice href={["neighborhood", n.name, "building", b.name, "person", person.name]}>
            {person.name} ({person.attributes.type})
          </Choice>;
        })}
      </ChoiceList>
      : <TextBox>The building lies empty.</TextBox>}
    <ul>
    </ul>
  </Page>;
};

export const BuildingPerson = ({ city, neighborhood, building, person }) => {
  const n = city.findName("neighborhood", neighborhood);
  const b = city.findName("building", building, n);
  const p = city.findName("ownerOccupants", person, b);
  return <Page title={`${b.name} > ${p.name}`} back={["neighborhood", neighborhood, "building", building]} background={city.getImage(b, "buildingImagePrompt")}>
    <H1>{p.name}</H1>
    <SiteImage src={city.getImage(p, "ownerOccupantsImagePrompt")} />
    <TextBox>
      <Markdown text={p.attributes.description} />
    </TextBox>
  </Page>;
};

export const Landmark = ({ city, neighborhood, landmark }) => {
  const n = city.findName("neighborhood", neighborhood);
  const l = city.findName("landmark", landmark, n);
  return <Page title={l.name} back={["neighborhood", neighborhood]} background={city.getImage(n, "neighborhoodImagePrompt")}>
    <H1>{l.name}</H1>
    <SiteImage src={city.getImage(l, "landmarkImagePrompt")} />
    <TextBox>
      <Markdown text={l.attributes.description} />
    </TextBox>
  </Page>;
};
