import { Page, A, H1, TextBox, ChoiceList, Choice, SiteImage, InsetImage } from "./components";
import { Markdown } from "./markdown";
import { ChatLog } from "./chatlog";

export const Faction = ({ city, faction }) => {
  const f = city.findName("faction", faction);
  const people = city.findAll("factionMember", f);
  return <Page
    title={f.name}
    back="#/city"
    background={city.getImage(f, "factionBackgroundImagePrompt")}
    saturated={true}
  >
    <H1>{f.name}</H1>
    <TextBox class="w-1/2">
      <InsetImage src={city.getImage(f, "factionLogoImagePrompt")} />
      <Markdown text={f.attributes.description} />
    </TextBox>
    <ChoiceList intro="Members:">
      {people.map(person => (
        <Choice href={["faction", faction, "person", person.name]}>{person.name} ({person.attributes.type})</Choice>
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
    <TextBox class="w-2/5">
      <InsetImage src={city.getImage(f, "factionLogoImagePrompt")} />
      <Markdown text={p.attributes.description} />
    </TextBox>
    <ChatLog city={city} person={p} object={city.find("factionMemberChat", p)} />
  </Page>;
};
