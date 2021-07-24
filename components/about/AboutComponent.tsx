import React from "react";
import PropTypes from "prop-types";
import style from "./AboutComponent.module.scss";
import Image from "next/image";

const AboutComponent = () => {
  return (
    <section className={style.section}>
      <header className={style.header}></header>
      <div className={style.title_box}>
        <h2>BIO</h2>
      </div>
      <div className={style.content}>
        <p>
          The year is 1930. A candle is lit in church to illuminate the choir’s
          sheet music. The candle gets knocked over, the church burns to the
          ground with a woman inside, and along with it a town withers as
          massive sky-blackening storms threaten to swallow the earth whole. The
          inhabitants barely hang onto hope, wondering if the God they’ve been
          praying to has turned its back on them and left them behind... Welcome
          to A Town Named Nowhere.{" "}
        </p>
        <p>
          On first glance, the Dust Bowl might as well be a galaxy away from
          21st-century Long Island, New York. And if this milieu, immortalized
          in the work of John Steinbeck and Woody Guthrie, seems like an
          incongruous setting for an album by a band with post-hardcore roots,
          Crash The Calm is poised to remind us that time and space can only
          contain the imagination as much as one allows. A Town Named Nowhere,
          the Long Island quintet’s new full-length album, transports the
          listener to the drought-stricken Southwest of the 1930s with an
          all-consuming vividness that rivals the scope of an epic period-piece
          film or great literary classic.{" "}
        </p>
        <p>
          Pushing far beyond conventional notions of the “concept album” as we
          know it, Crash The Calm captures timeless, universal struggle—between
          humankind and nature, between people and each other, between the
          individual and one’s own conscience, between grief and
          perseverance—within a musically sumptuous diorama that’s as lavishly
          constructed as the storyline co-founding guitarists Brian Dowling and
          Pat Smith scripted to serve as the music’s foundation.{" "}
        </p>
        <p>
          Over a series of peaks and valleys that do the post-hardcore tradition
          proud while pointing to its future, A Town Named Nowhere centers on
          the conflict between Clifford—husband-survivor of Eleanor, who
          perished in the blaze of St. Catherine’s—and the church
          pastor—Eleanor’s father who is himself no stranger to loss, having
          survived the death of his wife in the Spanish flu epidemic years
          prior.{" "}
        </p>
        <p>
          A self-described “history nerd,” Dowling was inspired by the feeling
          that the “soil that we’d planted underneath our feet had just gone
          dead” when he and Smith found themselves holding the reins after the
          band’s other three members had to part ways in 2018. And, in a bold
          artistic move that gives you a sense of what makes Crash The Calm
          tick, Smith and Dowling responded to the biggest challenge they’d ever
          faced as a band by aiming for an achievement more musically ambitious
          than they’d ever tried.{" "}
        </p>
        <p>
          What better, then, than taking-on one of the biggest catastrophes in
          American history? As if that wasn’t enough, Dowling and Smith decided
          to tell the story from an author’s perspective, with a rich tapestry
          of townspeople all taking turns as narrator at various points
          throughout the songs.
        </p>
        <div className={style.img_container}></div>
        <p>
          Indeed, with A Town Named Nowhere, Crash The Calm hasn{`'`}t merely
          brought a fictitious town to life, but instead created an entire world
          out of sound. The insistent, chiming guitars that close-out “Devils,”
          for example, are as ominous as the visual of church bells ringing out
          across a desolated landscape. The songs, grouped together into three
          “chapters” of the story, cover vast musical terrain, from the mournful
          slow-burn of “The Night St. Catherine’s Fell” to the oddly dour and
          anthemic “My Nowhere,” to the recurring shout-along chorus of “We all
          / we all / come from nothing and nowhere” to the brilliant, unexpected
          twist the band puts on pop-punk at the very end with album closer
          “Past and Present.”{" "}
        </p>
        <p>
          “One of the main themes of the whole album,” Smith explains, ”is
          losing everything and re-growing from nothing, which is where we drew
          this idea of {`‘`}nowhere,{`’`} where everything is destroyed and
          everything is gone. It’s all about the battle to overcome that
          barren-ness and re-growing new life. It was really important to us to
          drive that aspect home.”
        </p>
        <p>
          Adds Dowling: “Life moves on whether you’re onboard or not.
          Eventually, new things just grow around whatever was lost.”{" "}
        </p>
        <p>
          “Of course,” Smith continues, “we went through it as a band first. We
          felt like our whole world was caving in on itself, but then we found
          ourselves in a situation where practically everyone on earth was able
          to relate in this much bigger, more dramatic way, and all of a sudden
          the music made sense on a scale we hadn’t imagined.”
        </p>
        <p>
          “Pandemic aside,” Dowling offers, “there’s always going to be
          something, some kind of upheaval that’s going to make you feel this
          way. I’ve looked a lot at history, which of course has all these
          cycles of destruction, but this happens in everyone’s life. It could
          be something that looks totally ordinary on paper, like a job
          change—if you think about it, it was just the idea of our careers in
          music being over that put us in this really apocalyptic frame of
          mind—or it could be a real-life catastrophe. And if things are getting
          back to normal for you after all the recent upheaval, guess what?
          There’s something else around the corner.”
        </p>
        <p>
          “We don’t say that to be pessimistic,” says Smith. “We say that as a
          reminder that there is still light through the darkness. The world we
          created in A Town Named Nowhere is incredibly bleak, but there’s also
          a ton of beauty in there too. I mean, I can’t imagine the strength
          people had to have to get through the Dust Bowl, how serious they had
          to be about living. That’s incredibly inspiring to us. So we wanted to
          make sure that was all there in the music—the bleakness, the beauty,
          the willpower. I mean, before we faced our biggest challenge as a
          band, we couldn’t have imagined that we would put something out with
          this many colors. It took something like that to bring it out of us.”
        </p>
        <p>
          Imagine the brooding, introspective sprawl of millennial classics like
          Circa Survive’s Juturna or Thrice’s The Alchemy Index crossed with the
          songcraft and grandeur of The Wall and that’ll give you some sense for
          the kind of journey A Town Named Nowhere takes you on. And, since
          we’re not talking about a band that cuts corners here, the album will
          be packaged as a trilogy of EPs, each released separately with its own
          artwork and all adding up to form a handsome showpiece for the
          physical representation of the album in full.{" "}
        </p>
        <p>
          In addition to the visually stunning short film that serves as the
          video for “Devils,” listeners will also be able to take an immersive
          dive into Nowhere via the album’s namesake video game. Built on Epic’s
          Unreal Engine 4, the game will be available for PC/Mac and
          downloadable on Steam and the band’s Website. Enter the town and
          search for various relics of Nowhere before the dust storms engulf
          you; clues from the record help guide the way.
        </p>
        <p style={{ fontStyle: "italic", color: "#66666688" }}>
          We are the soulless ghosts, the ones that remain…
        </p>
      </div>
    </section>
  );
};

AboutComponent.propTypes = {};

export default AboutComponent;
