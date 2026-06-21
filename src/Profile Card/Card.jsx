import "./Card.css";
 

function Card(props) {
  return (
    <div className="outer-card">
      <div className="inner-card">
        <div className="img-containor">
          <img
            className="rounded-img"
            src={props.profileImg}
            alt="img"
           
          />
        </div>
      </div>

      <div className="my-name">
        <span>{props.name}</span>
      </div>

      <div className="my-description">
        <span>
         {props.description}
        </span>
      </div>
    </div>
  );
}

export default Card;
