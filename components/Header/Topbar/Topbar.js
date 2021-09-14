import React, {useState, useEffect} from "react";
import {Container, Grid, Image, Input} from "semantic-ui-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {getRouteMatcher} from "next/dist/next-server/lib/router/utils";

export default function Topbar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>

          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

// crearemos un componente interno del logo

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png " />
      </a>
    </Link>
  );
}

// creamos un componente interno para el buscador

function Search() {
  const [searchStr, setSearchStr] = useState("");
  const [Load, setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (Load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon={{name: "search"}}
      placeholder="BUSCA AQUI TU JUEGO FAVORITO"
      value={router.query.query}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
}
