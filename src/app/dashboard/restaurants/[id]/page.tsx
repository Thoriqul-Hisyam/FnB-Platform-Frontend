"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function MenuItemDetailPage() {
  interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
  }

  const { id } = useParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMenuItem = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:3001/menu-items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenuItem(res.data);
      } catch (err) {
        setError("Gagal memuat menu item.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!menuItem)
    return <p className="text-center mt-10">Data tidak ditemukan.</p>;
  console.log(menuItem);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItem.map((item: MenuItem) => (
        <Card key={item.id} className="border shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-violet-700 font-semibold">
              {item.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-800 font-medium">
              Harga:{" "}
              <span className="text-violet-600">
                Rp {item.price.toLocaleString()}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
