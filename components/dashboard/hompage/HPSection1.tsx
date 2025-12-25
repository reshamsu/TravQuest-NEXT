// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { TbPencil } from "react-icons/tb";

// const images = [
//   "/assets/hero/burj-al-arab.jpg",
//   "/assets/hero/dubai-city.jpg",
//   "/assets/hero/dubai-4k.avif",
//   "/assets/hero/burj-khalifa2.jpg",
//   "/assets/hero/burj-al-arab1.jpg",
//   "/assets/hero/burj-khalifa1.jpg",
//   "/assets/hero/bg-burj-khalifa1.jpg",
// ];

// const Section1 = () => {
//   return (
//     <div className="max-w-5xl mx-auto h-full px-8 2xl:px-0 ml-0 md:ml-80 2xl:ml-90">
//       <div className="flex flex-col gap-1 text-gray-700">
//         <h1 className="text-xl font-extrabold mb-10">DASHBOARD</h1>
//         <h2 className="text-xl font-extrabold">Section 1</h2>
//         <p className="text-gray-600 text-sm lg:text-base">
//           Add or Update your homepage content here!
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 lg:pt-6 lg:pb-10">
//         <div className="flex flex-col gap-2 md:gap-4">
//           <div className="relative h-full w-full">
//             <Image
//               src="/assets/hero/sheikh_zayed_grand_mosque.jpg"
//               alt="UAE"
//               width={800}
//               height={800}
//               className="object-cover rounded-3xl"
//             />
//             <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-3xl duration-500" />
//             <div>
//               <Link
//                 href="/dashboard"
//                 className="absolute top-3 right-3 text-sm bg-white flex items-center gap-1 pl-3 py-2 px-4 rounded-2xl border border-gray-200 shadow-lg hover:scale-110 duration-500"
//               >
//                 <TbPencil size={20} /> Edit
//               </Link>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 gap-2 md:gap-4">
//             {images.map((src, i) => (
//               <div
//                 key={i}
//                 className="relative h-[80px] md:h-[120px] rounded-3xl w-full duration-1000 bg-gray-100"
//               >
//                 <Image
//                   src={src}
//                   alt={`Media ${i + 1}`}
//                   fill
//                   className="object-cover rounded-2xl"
//                 />
//                 <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-2xl duration-500" />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col justify-center gap-6 md:p-4 text-gray-700">
//           <div>
//             <h3 className="text-xl font-bold">Update <span className="text-[#f2836f]">Homepage Information</span></h3>
//           </div>

//           <form method="post" className="flex flex-col items-end gap-8">
//             <div className="grid grid-cols-1 gap-8 text-gray-800 w-full">
//               <div className="flex flex-col gap-3 w-full">
//                 <label className="text-teal-600 font-bold text-sm">
//                   Hero Title<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your Hero Title"
//                   className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col gap-3 w-full">
//                 <label className="text-teal-600 font-bold text-sm">
//                   Hero Subtitle
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your Hero Subtitle"
//                   className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="select-none btn-dark-sm btn-dynamic"
//             >
//               Update Info
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Section1;
