import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

export function formatNumber(value: string | number): string {
  const numericValue =
    typeof value === "string"
      ? parseInt(value.replace(/[^0-9]/g, ""), 10)
      : value;
  return isNaN(numericValue) ? "" : numericValue.toLocaleString("id-ID");
}

export function formatDateToWIB(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Format date part (DD MMMM YYYY)
    const dateFormatter = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });

    // Format time part (HH:mm)
    const timeFormatter = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    });

    // Get formatted parts and clean up time to remove "pukul"
    const formattedDate = dateFormatter.format(date);
    const formattedTime = timeFormatter.format(date).replace("pukul ", "");

    return `${formattedDate} ${formattedTime} WIB`;
  } catch (error) {
    return "Invalid date";
  }
}

export function getInitials(
  firstName: string | null | undefined,
  lastName: string | null | undefined
): string {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
}
