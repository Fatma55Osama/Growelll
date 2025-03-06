import { atom } from "recoil";
import imgplay from "../assets/Image play.png";

import Skaak from "../assets/Image Wrapper.png";
import doctorsimg from "../assets/Image.png";
import book from "../assets/Rectangle 113.png";

export const $active = atom({
  key: "$active",
  default: "Home",
});
export const $eventsState = atom({
  key: "$eventsState",
  default: [
    {
      id: 1,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      img: imgplay,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      img: imgplay,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 6,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
});

export const $booksState = atom({
  key: "$booksState",
  default: [
    {
      id: 1,
      img: book,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      img: book,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      img: book,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      img: book,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      img: book,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 6,
      img: book,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
});

export const $doctorState = atom({
  key: "$doctorState",
  default: [
    {
      id: 1,
      img: doctorsimg,
      name: "Dr: Esraa Nagy",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      img: doctorsimg,
      name: "Dr: Esraa Nagy",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      img: doctorsimg,
      name: "Dr: Esraa Nagy",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      img: doctorsimg,
      name: "Dr: Esraa Nagy",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      img: doctorsimg,
      name: "Dr: Esraa Nagy",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 6,
      img: doctorsimg,
      name: "Dr: Esraa Nagy",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
});
