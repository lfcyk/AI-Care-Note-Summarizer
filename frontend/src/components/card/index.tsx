import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
