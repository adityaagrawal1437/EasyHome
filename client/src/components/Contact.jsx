import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.sucess === false) {
          setError(true);
          return;
        }
        setLandlord(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && !error && !loading && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={handleMessage}
            placeholder="Enter your message here..."
            className=" w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95
          "
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
