import ImageContainer from "./ImageContainer";
import "./HorizontalScroll.css";
import One from "/images/item 01.png";
import Two from "/images/item 02.png";
import Three from "/images/item 03.png";
import Four from "/images/item 04.png";

const HorizonalScroll = () => {
  return (
    <div>
      <div className="carousel">
        <div className="contentcontainer">
          <div className="images">
            <div className="imageItem">
              <ImageContainer imageSource={One} description={"June 24"} />
            </div>
            <div className="imageItem">
              <ImageContainer imageSource={Two} description={"June 24"} />
            </div>
            <div className="imageItem">
              <ImageContainer imageSource={Three} description={"June 24"} />
            </div>
            <div className="imageItem">
              <ImageContainer imageSource={Four} description={"June 24"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizonalScroll;
