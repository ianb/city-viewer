import { TextBox, A } from "./components";
import { Markdown } from "./markdown";

export const ChatLog = ({ city, person, object, class: _class }) => {
  if (!object || !object.chatMessages || !object.chatMessages.length) {
    return null;
  }
  return <TextBox class={_class}>
    <p class="text-sm">
      This is a log of an actual chat between a user (<A href="#/about">the author</A>) and this character. Though chat is not enabled on this site, this gives an idea of what kind of chat is possible.
    </p>
    {object.chatMessages.map((message) => <ChatMessage city={city} character={person} message={message} />)}
  </TextBox>
};

const ChatMessage = ({ city, character, message }) => {
  const name = message.role === "user" ? "Player" : character.name;
  const classes = {
    user: "bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 mr-10 shadow-xl",
    assistant: "bg-gray-100 px-4 py-2 rounded-lg ml-10 mb-2 shadow-xl",
  };
  let content = message.content;
  content = content.replace(/^"+(.*)"+[\s\n]*$/gs, (match, inner) => inner);
  return <div class={classes[message.role]}>
    <h3 class="font-bold font-display text-sm">{name}</h3>
    <Markdown text={content} />
  </div>;
};
