import { useEffect } from "preact/hooks";
import { twMerge } from "tailwind-merge";

export const Page = ({ back, title, background, children }) => {
  useEffect(() => {
    document.title = title || "City";
  }, [title]);
  if (Array.isArray(back)) {
    back = "#/" + back.map(x => encodeURIComponent(x)).join("/");
  }
  let style = "";
  if (background) {
    style = `background-image: url(${background}); background-repeat: no-repeat; background-size: cover;`;
  }
  return <div class="flex flex-col h-full min-h-screen bg-gray-900" style={style}>
    <div class="flex items-center justify-between px-4 py-2 shadow-md" style="background-color: rgba(0, 0, 0, 0.3)">
      {back ?
        <a href={back} class="flex items-center space-x-2 text-blue-500 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 00-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L10.414 10H17a1 1 0 100-2h-6.586l2.293-2.293z" clip-rule="evenodd" />
          </svg>
          <span class="text-xl font-medium">Previous</span>
        </a> : null}
      <h1 class="text-2xl font-semibold text-gray-200">{title || "??"}</h1>
    </div>
    <div class="flex-grow overflow-y-auto p-4 w-full" style="background-color: rgba(255, 255, 255, 0.3)">
      {children}
    </div>
    <footer class="flex items-center justify-center h-16 bg-gray-800 text-white">
      Veilvale by <A class="px-1" href="https://ianbicking.org">Ian Bicking</A> | <A class="px-1" href="/about">About</A>
    </footer>
  </div>
};

export const A = ({ children, href, class: _class, ...props }) => {
  _class = twMerge("text-blue-500 underline hover:text-blue-700", _class);
  if (Array.isArray(href)) {
    href = "#/" + href.map(x => encodeURIComponent(x)).join("/");
  }
  return (
    <a href={href} class={_class} {...props}>
      {children}
    </a>
  );
};

export const SiteImage = ({ src, class: _class, ...props }) => {
  if (!src) {
    return null;
  }
  _class = twMerge("block w-full m-2 rounded-lg", _class);
  return (
    <div class="float-right w-1/2 clear-both">
      <img src={src} class={_class} {...props} />
    </div>
  );
};

export const H1 = ({ children, class: _class, ...props }) => {
  _class = twMerge("text-2xl font-semibold text-gray-200", _class);
  return <h1 class={_class} {...props}>{children}</h1>;
};

export const TextBox = ({ children, class: _class, ...props }) => {
  _class = twMerge("text-gray-900 bg-gray-200 w-1/3 p-3 rounded m-4 leading-relaxed", _class);
  return <div class={_class} {...props}>{children}</div>;
};

export const ChoiceList = ({ children, intro, class: _class, ...props }) => {
  _class = twMerge("bg-gray-200 m-4 rounded w-1/3 p-2", _class);
  return <div class={_class} {...props}>
    <div>{intro}</div>
    <ul class="block">{children}</ul>
  </div>;
};

export const Choice = ({ children, href, class: _class, ...props }) => {
  console.log("choice children", children);
  _class = twMerge("m-2 p-2 hover:bg-gray-300", _class);
  if (Array.isArray(href)) {
    href = "#/" + href.map(x => encodeURIComponent(x)).join("/");
  }
  return (
    <li class="list-none m-4">
      <a href={href} class={_class} {...props}>{children}</a>
    </li>
  );
};
