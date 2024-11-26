"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface Hair {
  color: string;
  type: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  username: string;
  email: string;
  gender: string;
  birthDate: string;
  bloodGroup: string;
  eyeColor: string;
  height: number;
  weight: number;
  role: string;
  address: Address;
  company: Company;
  bank: Bank;
  crypto: Crypto;
  hair: Hair;
  phone: string;
  ssn: string;
  university: string;
  image: string;
  ip: string;
  macAddress: string;
  userAgent: string;
  ein: string;
  password: string;
  imageUrl: string; 
}

export default function Home() {


  const [usersImage, setUsersImage] = useState<string[] | null>(null);
  const [maxVisible, setMaxVisible] = useState(0);

  useEffect(() => {

    async function fetchUsers() {
      try {
        const numberOfImages = prompt("how many images do you want to fetch ?")  
        const num = prompt(`how many images do you want to be visible ? this number should be less than ${numberOfImages}`)
        if ( num !=  null) {
          const numberOfImagesToBeShown = parseInt(num, 10);
          setMaxVisible(numberOfImagesToBeShown)
        }
        const response = await fetch(`https://dummyjson.com/users?limit=${numberOfImages}`);
        const users = await response.json();
        console.log(users.users)
        setUsersImage(users.users.map((user: User) => user.image)); 
      } catch (error) {
        console.error("Error fetching user data:", error);
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
            className={`relative inline-block rounded-full border-2 border-white ${
              index === 0 ? '' : '-ml-3'
            }`}
            style={{
              zIndex: index - maxVisible,
              width: '40px',
              height: '40px',
            }}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src={avatar}
                alt={`User ${index + 1}`}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
            ))}
            {usersImage.length - maxVisible > 0 && (
              <div 
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100"
                style={{ marginLeft: '-0.75rem', zIndex: 10 }}
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
