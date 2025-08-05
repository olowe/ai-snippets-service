import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Snippets" },
    { name: "description", content: "Welcome to AI Snippets!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
