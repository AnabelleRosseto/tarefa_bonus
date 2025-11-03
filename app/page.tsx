import Redirect from "@/utils/redirect/redirect";
import Image from "next/image";

export default function Home() {
  return (
    <Redirect path="/login" />
  );
}
