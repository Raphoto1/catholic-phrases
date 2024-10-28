//app
import Image from "next/image";
import { Button, Link } from "@chakra-ui/react";
//own

export default function Home() {
  return (
    <div>
      <Button as={Link} href='/list'>
        List
      </Button>
      <Button as={Link} href="/generate">
        Generate
        </Button>
    </div>
  );
}
