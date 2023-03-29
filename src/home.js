import { A, Page, H1, TextBox } from "./components";

export const Home = ({ city }) => {
  console.log("city is", city)
  const color = city.properties.cityHomeImage.textColor || "#000";
  return <Page
    title="Veilvale: a GPT experiment"
    background={city.properties.cityHomeImage.imageUrl}
  >
    <div class="flex flex-col items-center justify-center h-full">
      <H1><a style={`color: ${color}`} href="#/city">Enter: {city.find("cityName").name}</a></H1>
    </div>
  </Page>;
};

export const About = ({ city }) => {
  return <Page title={`About ${city.title}`} back="#/city">
    <div class="flex flex-col items-center justify-center h-full">
      <H1>About {city.title}</H1>
      <TextBox class="w-1/2">
        <p class="my-3">Veilvale is a world building experiment by <A href="https://ianbicking.org">Ian Bicking</A></p>
        <p class="my-3">The text was written by GPT using the ChatGPT gpt-3.5-turbo model and API. The actual coordination was done through <A href="https://llm.ianbicking.org/layercraft">LayerCraft</A>, an application for building imaginative structures. In addition it used a <A href="https://github.com/ianb/llm-garden/blob/main/src/layercraft/citymakerschema.js">city making schema</A> to describe the structure of the city.</p>
        <p class="my-3">The images were all generated by <A href="https://www.midjourney.com/">Midjourney</A> (v5), an AI image generator. The image prompts were created by GPT with additional hand-tuning.</p>
      </TextBox>
    </div>
  </Page>;
};