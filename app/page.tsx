"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [usersImage, setUsersImage] = useState<string[] | null>(null);
  const [maxVisible, setMaxVisible] = useState(0);

  useEffect(() => {

    async function fetchUsers() {
      try {
        const numberOfImages = prompt("how many images do you want ?")  
        const num = prompt("how many images do you want to be visible ?")
        if ( num !=  null) {
          const numberOfImagesToBeShown = parseInt(num, 10);
          setMaxVisible(numberOfImagesToBeShown)
        }
        const response = await fetch(`https://dummyjson.com/users?limit=${numberOfImages}`);
        const users = await response.json();
   
        setUsersImage(users.users.map((user: any) => user.image)); // Update the state with all image URLs
      } catch (error) {
        console.error("Error fetching user data:", error); // Handle errors
      }
    }

    fetchUsers();
  }, []);

  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative flex justify-center items-center -space-x-4">
      {usersImage ? (
          <>
            {usersImage.slice(0, maxVisible).map((avatar, index) => (
              <div
                key={avatar}
                className="relative inline-block h-10 w-10 rounded-full border-2 border-white"
                style={{ marginLeft: index > 0 ? '-0.75rem' : '0', zIndex: maxVisible - index }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <img
                    src={avatar}
                    alt={`User ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
            {usersImage.length - maxVisible > 0 && (
              <div 
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100"
                style={{ marginLeft: '-0.75rem', zIndex: 0 }}
              >
                <span className="text-sm font-medium text-gray-600">
                  +{usersImage.length - maxVisible}
                </span>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
}
