import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAMFBMVEXk5ueutLfn6eq3vL6rsbTh4+TZ3N3Jzc/Q09Wxt7q9wsTT1tjAxcfe4OLq7O3Dx8qKbjhhAAAD4UlEQVR4nO2b25arIAxAIdxB9P//9qC1nWlPZwpEE2ct9rMPeyUQuQQhBoPBYDAYDAaDwWAwGAyEADDZercUnEs2GwBupXfMxi8q6C9CXJKYubVegTxJqeUTWsuw5CtFFURS+sXyIRutuIrrnOIPmpuqjNeIKsDymvP/VB23ZAFs+F1zU1XsQQX/IZy7abDMpq7C8qbqOU1hqQnnbpr4TMHVexbYYtroyRZT8G2exZRlRoFo9SxVyjCICtUsKvVCr9k6QHdT+mGaOzRXqEXnjsRvIV1oTcH2eUoZMq1o7PSUmnQlBanXs4SUtEQ1/OP/Cynln9SE/ohKSbjhS/0BXX+kZJ69tWlnIQvpjPKUimyQdhfRG2TbEqjef/wA1byfu6v9DbKabxRSdCIStagqWiBaPwNalOgvivnR79CsoMBjPfWfEaX5ibZvk4foJ1GkJ5koetZTTSZ8eRoF/xn0vz7SeArAilKdQOGXeVQLZ2whJTspy8itCNmpzp/Z3PWdjd6hPCpBbUM1maboOhZ/eCrCIx1M7glPdAq5/y9KezPScrf4ElDi+zvoFaW+auodpfSXd6Zr4pNO+Rt9y2faA/zdtCP52tN7FtOKZpIXz8hzD9565aADV1+ZbfNUtJd2T6ZNyWds1IH6mOpgWNt0atqz9rwzNz7VFX4dWZo0ngD3sZdMB3eFPlKwH4KqI3e/2w6I3xr0dEiXaSAVAE69ddVS+Wt1OoNIy9rg/GRZxuaFonmnCFmnvnqxpXJZXE/zBsyzyDalZI2Y54tKrkAxfXCtsbkDxcom75YY1UaMk/NrYOEivkWj5NrF++B8mkv7UPUpr8KMljNYv0Ql9S/d7ZtwUJOzwDVowS5he75QQ/kqRE9eBADy+kigeSuio6d85wCQlp+eXHxUldEZmhUKGBf6LHdXGabz16YA1mEs73GN6dz1Ptip6iFDjeqJMwtMPEZzU5XhpMsRyAck/dlVnXCmC+BxDXlvTeV0dP4hH6+5qR6b/7LXODjr31Sn4+Y/mOksTXnkU6fqQ4Zu1WMucfG9Lp9NpwOOJ9A9mFWmCj1Q4czh+c0UfYQWSTwltk0XyDxxppSehf7sI94v9NB7dI5vbWtE97VG9L8E6jedOkzBUGvKvqtnogL6QnsDD8GP8x3td3uGxbM9+TNtBf1GaPJsuOg6msZnjmwBXX+lDZ58AW0LKU9pepjWB5Rryu+i1TsTXI8gnlAtim22xlK71+ecSiu104k78/V35oxF9Ebl0iQju9fx6FQlyj1Eq585oh4mH0PdYo97LsnKStrfw3ocuk5UsVO3KIULUCU6GFyKfx/mM+wpcPosAAAAAElFTkSuQmCC",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
