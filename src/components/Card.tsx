import { Post } from "~/types";
import DownloadIcon from "~/assets/download.png";
import { SaveImage } from "~/utils/save-image";

interface CardProps {
  post: Post;
}

function Card({ post }: CardProps) {
  function handleDownloadImage() {
    SaveImage({ id: post.id, photoUrl: post.photo });
  }

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardHover card transition-shadow cursor-grab">
      <img
        src={post.photo}
        alt={post.prompt}
        className="w-full h-auto object-cover rounded-xl"
        loading="lazy"
      />

      <div className="absolute left-0 bottom-0 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 flex flex-col max-h-[94.5%] bg-[#10131f] m-2 p-4 rounded-md transition-all duration-300">
        <p className="text-white text-md overflow-y-auto prompt">
          {post.prompt}
        </p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="rounded-full w-7 h-7 object-cover bg-green-700 flex justify-center items-center text-white text-sx font-bold uppercase">
              {post.name.at(0)}
            </span>

            <p className="text-white text-sm capitalize">{post.name}</p>
          </div>

          <button
            type="button"
            className="bg-transparent hover:opacity-90 focus:opacity-90 focus:ring-1 focus:ring-[#6449ff] focus:outline-none focus:ring-offset-1 focus:ring-offset-bg-[#10131f] rounded-full"
            onClick={handleDownloadImage}
          >
            <img src={DownloadIcon} alt="Download" className="w-6 h-6 invert" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
