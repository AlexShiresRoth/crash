import React from "react";
// import PropTypes from 'prop-types';
import { useState } from "react";
import style from "./Pages.module.scss";
import { useEffect } from "react";
import Image from "next/image";
type Props = {
  images: string[];
};

const Pages = ({ images }: Props) => {
  console.log(images);
  const [currentPages, setCurrent] = useState<number>(0);

  const [max, setMax] = useState<number>(6);

  const [touchStart, setStart] = useState<number>(0);

  const [isMobile, setMobile] = useState<boolean>(window.innerWidth < 760);

  const [pages, setPages] = useState<Array<any>>([]);

  const mp3 = new Audio(
    "https://www.soundjay.com/misc/sounds/page-flip-03.mp3"
  );

  const [pageMax, setPageMax] = useState<number>(6);

  const [pageStart, setStartNum] = useState<number>(0);

  const [isVisible, setVisibility] = useState<boolean>(false);

  const handlePageTurn = (
    current: number,
    ceil: number,
    direction: boolean
  ) => {
    //page turn audio
    mp3.play();
    //determine page numbers for mobile
    handleRangeSet(direction);
    //handle forward swiping max
    if (current > ceil - 1 && direction) return setCurrent(0);
    //handle backs swiping
    if (current < 1 && !direction) return setCurrent(ceil);

    return direction
      ? setCurrent((prevIndex: number) => prevIndex + 1)
      : setCurrent((prevIndex: number) => prevIndex - 1);
  };

  const handleResize = (width: number) => setMobile(width < 760);

  const handleRangeSet = (direction: boolean) => {
    if (!isMobile) return;
    // console.log(currentPages, 'max', max, 'pageMax', pageMax, 'direction', direction ? direction : direction);
    //dont exceed page numbers
    console.log(pageStart);
    if (pageMax > max) setPageMax(max + 1);
    if (pageStart < 0) setStartNum(0);
    //TODO create a better way to handle that isn't hard coded division of
    switch (true) {
      //Backwards logic
      case !direction && currentPages === 0:
        console.log("no direction and 0");
        setStartNum(max - 6);
        setPageMax(max + 1);
        break;
      case !direction && currentPages <= pageStart:
        setStartNum(currentPages - 5);
        setPageMax(currentPages);
        break;
      //forward logic
      case currentPages + 1 > max && direction:
        console.log("current pages max and direction");
        setStartNum(0);
        setPageMax(6);
        break;
      case currentPages + 1 >= pageMax && direction:
        console.log("over pagninated amt");
        setPageMax(currentPages + 7);
        setStartNum(currentPages + 1);
        break;
      default:
        return;
    }
  };

  //determine swipingdirection to change page
  const handleSwipe = (endValue: number) => {
    const difference = Math.abs(touchStart) - Math.abs(endValue);

    if (difference > 70) {
      handlePageTurn(currentPages, max, true);
      return;
    }
    if (difference < -70) {
      handlePageTurn(currentPages, max, false);
      return;
    }
  };

  useEffect(() => {
    if (images) {
      setMax(images.length);
      setPages(images);
    }
  }, [images]);

  useEffect(() => {
    if (isMobile) setVisibility(true);
  }, [isMobile]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("resize", function () {
        handleResize(this.innerWidth);
      });

    return window.removeEventListener("resize", function () {
      handleResize(this.innerWidth);
    });
  }, []);

  const imgsMap = images.map((img: string, index: number) => {
    return (
      <div className={style.image_container} key={index}>
        <Image
          src={img}
          height={"1000px"}
          width={"1000px"}
          alt={"page"}
          quality={50}
        />
      </div>
    );
  });

  return (
    <>
      {isVisible && (
        <div className={style.guide}>
          <h2>Hey</h2>
          <p>You can change pages by swiping left or right on the book</p>
          <button onClick={(e) => setVisibility(false)}>Got it!</button>
        </div>
      )}
      <div className={style.page_numbers}>
        {pages
          .map((page: any, i: number) => {
            return (
              <button
                onClick={() => setCurrent(i)}
                className={
                  style.page_select +
                  ` ${currentPages === i ? style.active : ""}`
                }
                key={i}
              >
                {i + 1}
              </button>
            );
          })
          .slice(pageStart, isMobile ? pageMax : max + 1)}
      </div>
      <div
        className={style.pages_container}
        onTouchStart={(e) => setStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
      >
        <div className={style.back_btn}>
          <button onClick={() => handlePageTurn(currentPages, max, false)}>
            Back
          </button>
        </div>
        <div className={style.pages}>{imgsMap[currentPages]}</div>
        <div className={style.next_btn}>
          <button onClick={() => handlePageTurn(currentPages, max, true)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pages;
