import { React, useEffect, useState } from "react";

function StudentCard() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    setLoading(false);

    //name extraction
    const title = data.results[0].name.title;
    const first = data.results[0].name.first;
    const last = data.results[0].name.last;

    //location extraction
    const city = data.results[0].location.city;
    const country = data.results[0].location.country;

    //avatar extraction
    const avatar = data.results[0].picture.medium;

    //update states
    setName(title + ". " + first + " " + last);
    setLocation(country + "," + city);
    setAvatar(avatar);
  };

  useEffect(() => {
    //side effect code
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  return (
    <>
      {loading === true ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <p className="full-name">Full name: {name}</p>
          <p className="location">Location: {location}</p>
          <div>
            <span>Avatar: </span>
            <img
              className="avatar"
              src={avatar}
              alt="this is profile avatar"
            ></img>
            <button onClick={handleClick}>Next user</button>
          </div>
        </>
      )}
    </>
  );
}

export default StudentCard;
