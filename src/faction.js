import { Page, A, H1, TextBox, ChoiceList, Choice, SiteImage } from "./components";
import { Markdown } from "./markdown";

export const Faction = ({ city, faction }) => {
  const f = city.findName("faction", faction);
  const people = city.findAll("factionMember", f);
  return <Page title={f.name} back="#/city" background={city.getImage(f, "factionBackgroundImagePrompt")}>
    <H1>{f.name}</H1>
    <TextBox>
      <Markdown text={f.attributes.description} />
    </TextBox>
    <ChoiceList intro="Members:">
      {people.map(person => (
        <Choice href={["faction", faction, "person", person.name]}>{person.name}</Choice>
      ))}
    </ChoiceList>
  </Page>;
};

export const FactionMember = ({ city, faction, person }) => {
  const f = city.findName("faction", faction);
  const p = city.findName("factionMember", person, f);
  return <Page title={p.name} back={["faction", faction]} background={city.getImage(f, "factionBackgroundImagePrompt")}>
    <H1>{p.name}</H1>
    <SiteImage src={city.getImage(p, "factionMemberImagePrompt")} />
    <TextBox>
      <Markdown text={p.attributes.description} />
    </TextBox>
  </Page>;
};
