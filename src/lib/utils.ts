import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  const date = input.split("-");

  const year = date[0];
  const month = parseInt(date[1]!) - 1;
  const day = date[2];

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthName = monthNames[month];

  return `${day} de ${monthName} de ${year}`;
}

export function formatTime(timeString: string): string {
  const formattedTime = new Date(
    "1970-01-01T" + timeString + "Z",
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return formattedTime;
}

export async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");

    const data: { ip: string } = (await response.json()) as { ip: string };

    if (response.ok && data.ip) {
      return data.ip;
    } else {
      throw new Error("Failed to retrieve IP address");
    }
  } catch (error) {
    console.error("Error getting user IP:", error);
    return null;
  }
}
