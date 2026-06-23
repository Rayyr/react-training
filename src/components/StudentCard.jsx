import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";

function StudentCard() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
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
      setLoading(false);

      toast.success("User has been brought successfully", {
        onOpen: () => setBlocked(true),
        onClose: () => setBlocked(false),
      });
    } catch (error) {
      toast.error("Sorry an error occured " + error, {
        onOpen: () => setBlocked(true),
        onClose: () => setBlocked(false),
      });
    }
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
      {blocked === true ? null : (
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
      )}
    </>
  );
}

export default StudentCard;
