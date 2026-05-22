import { CircularProgress } from "@mui/material";
import Image from "next/image";

const Preloader = ({ isLoading, data = { data: [] } }) => {
  if (isLoading && !data?.data?.length)
    return (
      <div
        className="flex items-center justify-center"
      >
        <CircularProgress
          style={{ color: "#059669", width: "50px", height: "50px" }}
        />
      </div>
    );

  if (!isLoading && !data?.data?.length)
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-4">
        <Image
          src="/empty.png"
          alt="empty state"
          width={100}
          height={100}
          className="w-34 h-40" />

        <p className="text-center mx-auto max-w-md font-poppins">
          You have not made any query yet, use the filter section above to
          select the states and budget parameters you would like to compare
        </p>
      </div>
    );

  return null;
};

export default Preloader;
