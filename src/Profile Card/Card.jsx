import "./Card.css";
 

function Card(probs) {
  return (
    <div className="outer-card">
      <div className="inner-card">
        <div className="img-containor">
          <img
            class="rounded-img"
            src={probs.profileImg}
            alt="img"
            width={200}
            height={200}
          />
        </div>
      </div>

      <div className="my-name">
        <span>{probs.name}</span>
      </div>

      <div className="my-description">
        <span>
         {probs.description}
        </span>
      </div>
    </div>
  );
}

export default Card;
