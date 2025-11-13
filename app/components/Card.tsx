import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  image,
  icon,
  href,
  onClick,
  className = "",
  children,
}: CardProps) {
  const cardContent = (
    <div
      className={`
        flex flex-col
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        rounded-lg
        p-6
        transition-all duration-200
        hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700
        max-w-md w-full
        ${onClick || href ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Image or Icon */}
      {(image || icon) && (
        <div className="mb-4 flex items-center justify-center">
          {image ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
              {icon}
            </div>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          {description}
        </p>
      )}

      {/* Children content */}
      {children && <div className="mt-auto">{children}</div>}
    </div>
  );

  // If href is provided, wrap in Link
  if (href) {
    return (
      <Link href={href} className="inline-block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
