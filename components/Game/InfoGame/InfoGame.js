import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
import CarouselScreenshots from "../CarouselScreenshots/CarouselScreenshots";

export default function InfoGame(props) {
  const {game} = props;
  console.log(game);

  return (
    <div className="info-game">
      <ReactPlayer
        className="info-game__video"
        url={game.video}
        controls={true}
      />
      <CarouselScreenshots title={game.title} galeria={game.galeria} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{__html: game.descripcion}} />

        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{moment(game.fecha).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
