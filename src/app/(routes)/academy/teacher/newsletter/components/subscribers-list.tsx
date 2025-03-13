// src/app/newsletter/components/subscribers-list.tsx
"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

type Subscriber = {
  id: string;
  email: string;
  createdAt: string;
};

export function SubscribersList() {
  const {
    data: subscribers,
    isLoading,
    refetch,
  } = api.brevo.getSubscribers.useQuery();
  const deleteSubscriber = api.brevo.deleteSubscriber.useMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = async (id: string, email: string) => {
    const isConfirmed = window.confirm(
      `¿Seguro que deseas eliminar ${email} de la lista de suscriptores?`,
    );

    if (isConfirmed) {
      try {
        await deleteSubscriber.mutateAsync({ id });
        await refetch(); // Refrescar la lista después de eliminar
      } catch (error) {
        alert("Error al eliminar el suscriptor.");
      }
    }
  };

  if (isLoading) return <p>Cargando suscriptores...</p>;

  if (!subscribers) {
    return <p>No se encontraron suscriptores.</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubscribers = subscribers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-lg font-semibold">Suscriptores</h2>
      <table className="mt-2 min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Fecha de suscripción</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentSubscribers.map((subscriber) => (
            <tr key={subscriber.id} className="border-t">
              <td className="px-4 py-2">{subscriber.email}</td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(subscriber.id, subscriber.email)}
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        {Array.from(
          { length: Math.ceil(subscribers.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 rounded px-3 py-1 ${
                currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
