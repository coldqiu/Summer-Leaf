import Style from "./AlbumCover.less";

export default function AlbumCover({ width, height, children }) {
  return (
    <div className={Style.wrap} style={{ width, height }}>
      <ul className={Style.ul}>
        <li className={Style.li}></li>
        <li className={Style.li}></li>
        <li className={Style.li}></li>
        <li className={Style.li}></li>
      </ul>
      {children}
    </div>
  );
}
