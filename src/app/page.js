import Image from "next/image";

export const metadata = {
  title: "Home: Work Manager",
};

export default function Home() {
  return (
    <div className="flex justify-center">
      
      <Image 
        src="/bg.svg" 
        alt="login"
        width={700} // Set a width (adjust as needed)
        height={200} // Set a height (adjust as needed)
        style={{ objectFit: "contain" }} // Optional: Adjust object fit for scaling
        />
    </div>
  );
}
