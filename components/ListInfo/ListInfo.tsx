import React from "react";
import Image from "next/image";
import "./ListInfo.css";

type ListInfoProps = {
  text: string;
};

export default function ListInfo(props: ListInfoProps) {
  return (
    <li>
      <Image
        src='/images/icon-success.svg'
        alt='icon-success'
        width={20}
        height={20}
      />
      <p>{props.text}</p>
    </li>
  );
}
