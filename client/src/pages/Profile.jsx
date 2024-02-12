import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col">
        <img
          className="self-center rounded-full h-24 w-24 object-cover cursor-pointer mt-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder='username'
          id="username"
          className="border p-3 rounded-lg my-3"
        />
        <input
          type="email"
          placeholder='email'
          id="email"
          className="border p-3 rounded-lg my-3"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg my-3"
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className=" flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
